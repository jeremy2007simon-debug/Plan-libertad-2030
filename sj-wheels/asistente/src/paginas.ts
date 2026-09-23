/**
 * Los textos de política que el asistente puede citar.
 *
 * No se guardan aquí: se leen de la propia tienda en el momento. Es más
 * trabajo que copiarlos, pero evita el fallo que más caro sale en un bot de
 * atención al cliente: contestar con una política que dejó de ser cierta
 * hace tres meses. Si la página de envíos cambia, el asistente cambia con
 * ella el mismo día, sin volver a desplegar.
 *
 * El texto se cachea en memoria un rato porque una función sin estado puede
 * atender muchos mensajes seguidos, y no tiene sentido pedir la misma página
 * cuatro veces en la misma conversación.
 */
const TIENDA = process.env.SJW_TIENDA ?? 'https://5y82gi-yt.myshopify.com';
const VIGENCIA_MS = 10 * 60 * 1000;

export const PAGINAS = {
  envios: 'envios',
  devoluciones: 'cambios-y-devoluciones',
  garantia: 'garantia',
  seguimiento: 'seguimiento-del-pedido',
  como_comprar: 'como-comprar',
  compatibilidad: 'guia-de-compatibilidad',
  medidas: 'guia-de-medidas',
  sobre_nosotros: 'sobre-sj-wheels',
} as const;

export type Tema = keyof typeof PAGINAS;

const cache = new Map<string, { texto: string; ts: number }>();

/** Quita el marcado y deja un texto legible. Sin dependencias: es HTML de Shopify. */
function aTexto(html: string): string {
  const cuerpo = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return cuerpo
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '· ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

export async function leerPagina(tema: Tema): Promise<{ tema: Tema; url: string; texto: string }> {
  const handle = PAGINAS[tema];
  const url = `${TIENDA}/pages/${handle}`;
  const guardado = cache.get(handle);
  if (guardado && Date.now() - guardado.ts < VIGENCIA_MS) {
    return { tema, url: `/pages/${handle}`, texto: guardado.texto };
  }
  const respuesta = await fetch(url, {
    headers: { 'Accept-Language': 'es-ES,es;q=0.9', 'User-Agent': 'SJWheels-Asistente/1.0' },
  });
  if (!respuesta.ok) {
    // No se inventa el contenido: se dice que no se ha podido leer.
    return {
      tema,
      url: `/pages/${handle}`,
      texto: `No he podido leer la página /pages/${handle} (HTTP ${respuesta.status}). ` +
        'No inventes su contenido: remite al cliente a la página.',
    };
  }
  const texto = aTexto(await respuesta.text()).slice(0, 6000);
  cache.set(handle, { texto, ts: Date.now() });
  return { tema, url: `/pages/${handle}`, texto };
}
