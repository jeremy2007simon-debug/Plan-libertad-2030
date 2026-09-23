/**
 * POST /api/chat — el asistente de SJ Wheels.
 *
 * Devuelve SSE: el texto sale token a token y el cliente ve que algo pasa
 * mientras el modelo piensa o consulta una herramienta.
 *
 * Es un bucle manual en lugar del tool runner del SDK porque el transporte es
 * propio: cada delta hay que reenviarlo al navegador según llega, y entre
 * vuelta y vuelta se emiten avisos de «estoy mirando el catálogo» para que la
 * espera no parezca un cuelgue.
 *
 * El modelo no ve ningún dato del cliente más allá de lo que él mismo
 * escribe, y no hay estado en el servidor: el historial viaja en cada
 * petición, como en cualquier chat sin sesión.
 */
import Anthropic from '@anthropic-ai/sdk';
import { HERRAMIENTAS, ejecutar } from '../src/herramientas.ts';
import { SISTEMA } from '../src/sistema.ts';

const MODELO = 'claude-opus-5';
const MAX_VUELTAS = 6;
const MAX_MENSAJES = 40;
const MAX_CARACTERES = 4000;

const cliente = new Anthropic();

interface Peticion {
  mensajes?: Array<{ rol: 'user' | 'assistant'; texto: string }>;
}

export const config = { runtime: 'nodejs' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors() });
  if (req.method !== 'POST') {
    return new Response('Usa POST.', { status: 405, headers: cors() });
  }

  let cuerpo: Peticion;
  try {
    cuerpo = (await req.json()) as Peticion;
  } catch {
    return new Response('JSON no válido.', { status: 400, headers: cors() });
  }

  const entrada = (cuerpo.mensajes ?? []).slice(-MAX_MENSAJES);
  if (!entrada.length) return new Response('Sin mensajes.', { status: 400, headers: cors() });

  const mensajes: Anthropic.Beta.BetaMessageParam[] = entrada.map((m) => ({
    role: m.rol === 'assistant' ? 'assistant' : 'user',
    content: String(m.texto ?? '').slice(0, MAX_CARACTERES),
  }));
  if (mensajes[0]?.role !== 'user') {
    return new Response('La conversación tiene que empezar por el cliente.', {
      status: 400, headers: cors(),
    });
  }

  const codificador = new TextEncoder();
  const flujo = new ReadableStream({
    async start(control) {
      const enviar = (tipo: string, datos: unknown) => {
        control.enqueue(codificador.encode(`event: ${tipo}\ndata: ${JSON.stringify(datos)}\n\n`));
      };

      try {
        for (let vuelta = 0; vuelta < MAX_VUELTAS; vuelta++) {
          const stream = cliente.beta.messages.stream({
            model: MODELO,
            max_tokens: 4096,
            // La conversación de un cliente no necesita razonamiento profundo: el trabajo
            // difícil lo hace el motor determinista. Effort medio mantiene el cuidado en cómo
            // se redacta —que aquí es lo que puede salir caro— sin pagar de más.
            output_config: { effort: 'medium' },
            // El sistema es estable y largo; se cachea para no pagarlo en cada mensaje.
            system: [{ type: 'text', text: SISTEMA, cache_control: { type: 'ephemeral' } }],
            tools: HERRAMIENTAS,
            messages: mensajes,
            // Opus 5 puede declinar una petición con stop_reason "refusal". Con los fallbacks
            // del servidor la respuesta la atiende otro modelo en lugar de dejar al cliente
            // mirando un chat en blanco.
            betas: ['server-side-fallback-2026-07-01'],
            fallbacks: 'default',
          });

          stream.on('text', (delta) => enviar('texto', delta));

          const respuesta = await stream.finalMessage();

          if (respuesta.stop_reason === 'refusal') {
            enviar('aviso', 'No puedo ayudarte con eso. Escríbenos por el formulario.');
            break;
          }
          if (respuesta.stop_reason === 'pause_turn') {
            mensajes.push({ role: 'assistant', content: respuesta.content });
            continue;
          }
          if (respuesta.stop_reason !== 'tool_use') break;

          const llamadas = respuesta.content.filter(
            (b): b is Anthropic.Beta.BetaToolUseBlock => b.type === 'tool_use',
          );
          mensajes.push({ role: 'assistant', content: respuesta.content });

          const resultados: Anthropic.Beta.BetaToolResultBlockParam[] = [];
          for (const llamada of llamadas) {
            enviar('herramienta', llamada.name);
            let salida: string;
            try {
              salida = await ejecutar(llamada.name, llamada.input);
            } catch (error) {
              salida = JSON.stringify({
                error: error instanceof Error ? error.message : 'fallo de la herramienta',
              });
            }
            resultados.push({ type: 'tool_result', tool_use_id: llamada.id, content: salida });
          }
          // Todos los tool_result van en UN solo mensaje: repartirlos entre varios le enseña
          // al modelo a dejar de pedir herramientas en paralelo.
          mensajes.push({ role: 'user', content: resultados });
        }
      } catch (error) {
        // Los tipos del SDK distinguen lo que se reintenta de lo que no.
        if (error instanceof Anthropic.RateLimitError) {
          enviar('aviso', 'Hay mucha gente preguntando ahora mismo. Inténtalo en un momento.');
        } else if (error instanceof Anthropic.AuthenticationError) {
          console.error('Credencial de Anthropic no válida:', error.message);
          enviar('aviso', 'El asistente no está disponible. Escríbenos por el formulario.');
        } else if (error instanceof Anthropic.APIError) {
          console.error(`Error de la API (${error.status}):`, error.message);
          enviar('aviso', 'Se me ha cortado la respuesta. ¿Lo intentamos otra vez?');
        } else {
          console.error('Fallo inesperado del asistente:', error);
          enviar('aviso', 'Algo ha fallado por mi parte. Escríbenos por el formulario.');
        }
      } finally {
        enviar('fin', true);
        control.close();
      }
    },
  });

  return new Response(flujo, {
    headers: {
      ...cors(),
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

function cors(): Record<string, string> {
  // El escaparate de Shopify vive en otro dominio que el backend.
  const permitido = process.env.SJW_ORIGEN ?? '*';
  return {
    'Access-Control-Allow-Origin': permitido,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}
