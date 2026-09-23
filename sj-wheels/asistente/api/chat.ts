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
 * La firma es la de Node (IncomingMessage/ServerResponse) y no la de la API
 * web, porque es la que entrega este entorno: `req.headers` es un objeto
 * plano, no hay `req.json()` y la respuesta se escribe, no se devuelve.
 *
 * El modelo no ve ningún dato del cliente más allá de lo que él mismo
 * escribe, y no hay estado en el servidor: el historial viaja en cada
 * petición, como en cualquier chat sin sesión.
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import Anthropic from '@anthropic-ai/sdk';
import { HERRAMIENTAS, ejecutar } from '../src/herramientas.js';
import { SISTEMA } from '../src/sistema.js';
import { dentroDelLimite, ipDe } from '../src/limite.js';
import { paraReenviar } from '../src/mensajes.js';

const MODELO = 'claude-opus-5';
const MAX_VUELTAS = 6;
const MAX_MENSAJES = 40;
const MAX_CARACTERES = 4000;
const MAX_CUERPO = 256 * 1024;

/**
 * Una clave de organización que no está asignada a un workspace no sabe a qué
 * presupuesto cargar la conversación y la API la rechaza con un 400. Se
 * resuelve de dos maneras: con una clave creada dentro de un workspace, o
 * diciéndole cuál en una cabecera. SJW_WORKSPACE cubre la segunda; si no está
 * puesta no se manda nada y la clave decide por sí sola.
 */
const espacio = process.env.SJW_WORKSPACE?.trim();
const cliente = new Anthropic(
  espacio ? { defaultHeaders: { 'anthropic-workspace-id': espacio } } : {},
);

interface Peticion {
  mensajes?: Array<{ rol: 'user' | 'assistant'; texto: string }>;
}

/** Lo que añade el puente de Vercel por encima del IncomingMessage pelado. */
type PeticionEntrante = IncomingMessage & { body?: unknown };

export const config = { runtime: 'nodejs' };

export default async function handler(
  req: PeticionEntrante,
  res: ServerResponse,
): Promise<void> {
  if (req.method === 'OPTIONS') return corta(res, 204, '');
  if (req.method !== 'POST') return corta(res, 405, 'Usa POST.');

  // El endpoint es publico por necesidad y cada conversacion cuesta dinero.
  if (!dentroDelLimite(ipDe(req.headers))) {
    return corta(res, 429, 'Demasiadas peticiones. Espera un minuto.', { 'Retry-After': '60' });
  }

  let cuerpo: Peticion;
  try {
    cuerpo = await leeCuerpo(req);
  } catch (error) {
    const mensaje = error instanceof Error && error.message === 'cuerpo-largo'
      ? 'La petición es demasiado grande.'
      : 'JSON no válido.';
    return corta(res, 400, mensaje);
  }

  const entrada = (cuerpo.mensajes ?? []).slice(-MAX_MENSAJES);
  if (!entrada.length) return corta(res, 400, 'Sin mensajes.');

  const mensajes: Anthropic.Beta.BetaMessageParam[] = entrada.map((m) => ({
    role: m.rol === 'assistant' ? 'assistant' : 'user',
    content: String(m.texto ?? '').slice(0, MAX_CARACTERES),
  }));
  if (mensajes[0]?.role !== 'user') {
    return corta(res, 400, 'La conversación tiene que empezar por el cliente.');
  }

  res.writeHead(200, {
    ...cors(),
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    // Sin esto algunos proxys acumulan la respuesta entera y el streaming se pierde.
    'X-Accel-Buffering': 'no',
  });

  const enviar = (tipo: string, datos: unknown) => {
    res.write(`event: ${tipo}\ndata: ${JSON.stringify(datos)}\n\n`);
  };

  // Si el cliente cierra la pestaña a mitad, no tiene sentido seguir pagando vueltas.
  let abortada = false;
  res.on('close', () => { abortada = true; });

  // El modelo suele anunciar lo que va a consultar antes de pedir la herramienta
  // y seguir escribiendo después. Son dos respuestas distintas y se pegarían una
  // a otra —«…por el comprobador.He pasado tus datos…»—, así que se separan.
  let yaHaEscrito = false;

  try {
    for (let vuelta = 0; vuelta < MAX_VUELTAS && !abortada; vuelta++) {
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

      stream.on('text', (delta) => {
        if (!yaHaEscrito && vuelta > 0) enviar('texto', '\n\n');
        yaHaEscrito = true;
        enviar('texto', delta);
      });

      const respuesta = await stream.finalMessage();

      if (respuesta.stop_reason === 'refusal') {
        enviar('aviso', 'No puedo ayudarte con eso. Escríbenos por el formulario.');
        break;
      }
      if (respuesta.stop_reason === 'pause_turn') {
        mensajes.push({ role: 'assistant', content: paraReenviar(respuesta.content) });
        continue;
      }
      if (respuesta.stop_reason !== 'tool_use') break;

      const llamadas = respuesta.content.filter(
        (b): b is Anthropic.Beta.BetaToolUseBlock => b.type === 'tool_use',
      );
      mensajes.push({ role: 'assistant', content: paraReenviar(respuesta.content) });

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
      yaHaEscrito = false;
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
    res.end();
  }
}

/**
 * El cuerpo de la petición.
 *
 * El puente de Vercel suele dejarlo ya parseado en `req.body`, pero no siempre
 * —depende del content-type que mande el navegador—, así que si no está se lee
 * del flujo. Con tope: el endpoint es público.
 */
async function leeCuerpo(req: PeticionEntrante): Promise<Peticion> {
  if (req.body && typeof req.body === 'object') return req.body as Peticion;
  if (typeof req.body === 'string') return JSON.parse(req.body) as Peticion;

  let crudo = '';
  for await (const trozo of req) {
    crudo += trozo;
    if (crudo.length > MAX_CUERPO) throw new Error('cuerpo-largo');
  }
  return JSON.parse(crudo) as Peticion;
}

function corta(
  res: ServerResponse,
  estado: number,
  texto: string,
  extra: Record<string, string> = {},
): void {
  res.writeHead(estado, { ...cors(), 'Content-Type': 'text/plain; charset=utf-8', ...extra });
  res.end(texto);
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
