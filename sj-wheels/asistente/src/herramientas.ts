/**
 * Las herramientas del asistente.
 *
 * El reparto de papeles es el punto entero de este diseño: el modelo
 * conversa, entiende lo que pide el cliente y decide qué preguntar; las
 * decisiones que se pueden equivocar caras —¿esta llanta encaja en este
 * coche?, ¿qué dice la política de envíos?— las toma código determinista y
 * el modelo solo las cuenta. Un modelo no puede alucinar una compatibilidad
 * que nunca calcula.
 *
 * Todas las herramientas van con strict: true, así que los argumentos llegan
 * validados contra el esquema.
 */
import type Anthropic from '@anthropic-ai/sdk';
import { buscar, comoLlanta, porSku, todasLasVariantes, catalogo, normalizaAnclaje } from './catalogo.ts';
import { motor, vehiculoDelCliente } from './motor.ts';
import { leerPagina, PAGINAS, type Tema } from './paginas.ts';

const numeroOpcional = { type: ['number', 'null'] } as const;
const textoOpcional = { type: ['string', 'null'] } as const;

export const HERRAMIENTAS: Anthropic.Beta.BetaTool[] = [
  {
    name: 'buscar_llantas',
    description:
      'Busca referencias del catálogo por sus medidas. Devuelve SKU, diseño, medida, anclaje, ET, ' +
      'buje, acabado y enlace. No devuelve precios: todas están bajo consulta. Úsala cuando el ' +
      'cliente pida llantas de una medida, un anclaje o un diseño concretos.',
    strict: true,
    input_schema: {
      type: 'object',
      properties: {
        anclaje: { ...textoOpcional, description: 'PCD, por ejemplo "5x112".' },
        diametro: { ...numeroOpcional, description: 'Diámetro exacto en pulgadas.' },
        diametroMin: numeroOpcional,
        diametroMax: numeroOpcional,
        anchuraMin: numeroOpcional,
        anchuraMax: numeroOpcional,
        etMin: numeroOpcional,
        etMax: numeroOpcional,
        buje: { ...numeroOpcional, description: 'Buje central en mm.' },
        acabado: { ...textoOpcional, description: 'Código de acabado del proveedor, por ejemplo "MB".' },
        diseno: { ...textoOpcional, description: 'Código de diseño, por ejemplo "SJW-048".' },
      },
      required: ['anclaje', 'diametro', 'diametroMin', 'diametroMax', 'anchuraMin', 'anchuraMax',
                 'etMin', 'etMax', 'buje', 'acabado', 'diseno'],
      additionalProperties: false,
    },
  },
  {
    name: 'comprobar_compatibilidad',
    description:
      'Comprueba las medidas de un vehículo contra el catálogo con el motor de SJ Wheels. ' +
      'Devuelve dos listas: "descartadas" (las medidas NO encajan; esto sí es una respuesta en ' +
      'firme) y "candidatas" (las medidas no la rechazan, pero SJ Wheels tiene que confirmarlas). ' +
      'Nunca devuelve "compatible": eso requiere una verificación que hoy no existe en la tienda. ' +
      'Necesita al menos el anclaje. Úsala siempre antes de sugerir una llanta para un coche.',
    strict: true,
    input_schema: {
      type: 'object',
      properties: {
        anclaje: { type: 'string', description: 'PCD del vehículo, por ejemplo "5x120". Obligatorio.' },
        buje: { ...numeroOpcional, description: 'Buje central del vehículo en mm.' },
        diametros: {
          type: ['array', 'null'],
          items: { type: 'number' },
          description: 'Diámetros que admite el vehículo, en pulgadas.',
        },
        etMin: numeroOpcional,
        etMax: numeroOpcional,
        skus: {
          type: ['array', 'null'],
          items: { type: 'string' },
          description: 'SKU concretos a comprobar. Si va a null, se comprueba todo el catálogo.',
        },
      },
      required: ['anclaje', 'buje', 'diametros', 'etMin', 'etMax', 'skus'],
      additionalProperties: false,
    },
  },
  {
    name: 'consultar_politica',
    description:
      'Lee la página real de la tienda sobre envíos, devoluciones, garantía, seguimiento del ' +
      'pedido, cómo comprar, compatibilidad o medidas, y devuelve su texto. Úsala SIEMPRE antes ' +
      'de responder sobre cualquiera de esos temas: no contestes de memoria.',
    strict: true,
    input_schema: {
      type: 'object',
      properties: {
        tema: { type: 'string', enum: Object.keys(PAGINAS) },
      },
      required: ['tema'],
      additionalProperties: false,
    },
  },
  {
    name: 'preparar_consulta',
    description:
      'Construye el enlace al formulario de SJ Wheels con los datos ya rellenos. Úsala para ' +
      'cerrar cualquier conversación que necesite una persona: confirmar compatibilidad, dar un ' +
      'precio, resolver un pedido concreto o una devolución.',
    strict: true,
    input_schema: {
      type: 'object',
      properties: {
        motivo: {
          type: 'string',
          enum: ['compatibilidad', 'precio', 'pedido', 'envio', 'devolucion', 'otro'],
        },
        sku: textoOpcional,
        vehiculo: { ...textoOpcional, description: 'Marca, modelo, generación y año.' },
        nota: { ...textoOpcional, description: 'Lo que el cliente ha contado, resumido.' },
      },
      required: ['motivo', 'sku', 'vehiculo', 'nota'],
      additionalProperties: false,
    },
  },
];

function resumen(v: (typeof todasLasVariantes)[number]) {
  return {
    sku: v.sku,
    diseno: v.diseno,
    medida: `${v.diametro} × ${v.anchura}"`,
    anclaje: v.anclaje,
    et: v.et,
    buje: v.buje,
    acabado: v.acabado,
    url: v.url,
    precio: 'bajo consulta',
    compra: 'bloqueada hasta que SJ Wheels confirme',
  };
}

export async function ejecutar(nombre: string, entrada: unknown): Promise<string> {
  const a = (entrada ?? {}) as Record<string, unknown>;
  const num = (k: string) => (typeof a[k] === 'number' ? (a[k] as number) : undefined);
  const txt = (k: string) => (typeof a[k] === 'string' && a[k] ? (a[k] as string) : undefined);

  switch (nombre) {
    case 'buscar_llantas': {
      const { total, variantes } = buscar({
        anclaje: txt('anclaje'), diametro: num('diametro'),
        diametroMin: num('diametroMin'), diametroMax: num('diametroMax'),
        anchuraMin: num('anchuraMin'), anchuraMax: num('anchuraMax'),
        etMin: num('etMin'), etMax: num('etMax'), buje: num('buje'),
        acabado: txt('acabado'), diseno: txt('diseno'),
      });
      return JSON.stringify({
        total,
        mostradas: variantes.length,
        variantes: variantes.map(resumen),
        aviso: catalogo.nota,
      });
    }

    case 'comprobar_compatibilidad': {
      const anclaje = txt('anclaje');
      if (!anclaje) return JSON.stringify({ error: 'Falta el anclaje del vehículo.' });
      if (!normalizaAnclaje(anclaje)) {
        return JSON.stringify({
          error: `No entiendo el anclaje "${anclaje}". Espero algo como 5x112.`,
        });
      }
      const vehiculo = vehiculoDelCliente({
        anclaje,
        buje: num('buje') ?? null,
        diametros: Array.isArray(a['diametros']) ? (a['diametros'] as number[]) : null,
        etMin: num('etMin') ?? null,
        etMax: num('etMax') ?? null,
      });

      const lista = Array.isArray(a['skus']) && (a['skus'] as string[]).length
        ? (a['skus'] as string[]).map(porSku).filter((v): v is NonNullable<typeof v> => !!v)
        : todasLasVariantes;

      const descartadas: unknown[] = [];
      const candidatas: unknown[] = [];
      for (const v of lista) {
        const veredicto = motor.evaluate(comoLlanta(v), vehiculo);
        const fila = { ...resumen(v), motivos: veredicto.reasons, faltan: veredicto.missing,
                       necesitaCentradores: veredicto.needsSpacers };
        if (veredicto.status === 'no') descartadas.push(fila);
        else candidatas.push(fila);
      }
      return JSON.stringify({
        comprobadas: lista.length,
        descartadas: { total: descartadas.length, ejemplos: descartadas.slice(0, 8) },
        candidatas: { total: candidatas.length, ejemplos: candidatas.slice(0, 12) },
        lectura:
          'Las descartadas no encajan por medidas y puedes decirlo con seguridad. Las candidatas ' +
          'NO están confirmadas: preséntalas como candidatas a revisar por SJ Wheels, nunca como ' +
          'compatibles. El motor no puede devolver «compatible» porque ninguna referencia tiene ' +
          'todavía la verificación hecha.',
      });
    }

    case 'consultar_politica': {
      const tema = txt('tema') as Tema | undefined;
      if (!tema || !(tema in PAGINAS)) {
        return JSON.stringify({ error: 'Tema desconocido.', temas: Object.keys(PAGINAS) });
      }
      const pagina = await leerPagina(tema);
      return JSON.stringify({
        ...pagina,
        instruccion: 'Responde solo con lo que diga este texto. Si no lo dice, di que no lo sabes.',
      });
    }

    case 'preparar_consulta': {
      const p = new URLSearchParams();
      const motivo = txt('motivo');
      if (motivo) p.set('motivo', motivo);
      const sku = txt('sku');
      if (sku) {
        p.set('ref', sku);
        const v = porSku(sku);
        if (v) {
          p.set('producto', v.diseno);
          p.set('medida', `${v.diametro}x${v.anchura}`);
          p.set('anclaje', v.anclaje);
          p.set('et', String(v.et));
          p.set('buje', String(v.buje));
          p.set('acabado', v.acabado);
        }
      }
      const vehiculo = txt('vehiculo');
      if (vehiculo) p.set('vehiculo', vehiculo);
      const nota = txt('nota');
      if (nota) p.set('nota', nota.slice(0, 500));
      return JSON.stringify({
        url: `/pages/solicitud-de-compatibilidad?${p.toString()}`,
        instruccion:
          'Dale al cliente este enlace y dile qué datos lleva ya puestos y cuáles tendrá que ' +
          'completar él (correo, destino y código postal).',
      });
    }

    default:
      return JSON.stringify({ error: `Herramienta desconocida: ${nombre}` });
  }
}
