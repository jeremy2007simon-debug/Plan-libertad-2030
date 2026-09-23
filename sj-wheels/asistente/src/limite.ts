/**
 * Límite de peticiones por IP.
 *
 * El endpoint tiene que ser público para que lo llame el escaparate, y cada
 * conversación cuesta dinero en la API de Anthropic. Sin un tope, cualquiera
 * con curl puede vaciar el saldo de la tienda en una tarde.
 *
 * Esto es una cubeta de fichas en memoria del proceso. Hay que saber lo que
 * NO es: una función sin estado puede correr en varias instancias a la vez,
 * así que el límite real es el que se pone aquí multiplicado por el número de
 * instancias calientes. Frena el abuso casual y el bucle de un script; no
 * frena un ataque repartido. Para eso está el cortafuegos de Vercel, que se
 * configura en el panel y sí cuenta de verdad.
 *
 * Se prefiere esto a nada porque no cuesta ninguna dependencia y cubre el
 * caso que de verdad pasa: alguien descubre el endpoint y lo aporrea.
 */
const VENTANA_MS = 60_000;
const PETICIONES_POR_VENTANA = 12;
const MAX_IPS = 5_000;

const cubetas = new Map<string, { fichas: number; renovado: number }>();

export function dentroDelLimite(ip: string): boolean {
  const ahora = Date.now();

  // La tabla no puede crecer sin fin en una instancia de larga vida.
  if (cubetas.size > MAX_IPS) {
    for (const [clave, cubeta] of cubetas) {
      if (ahora - cubeta.renovado > VENTANA_MS) cubetas.delete(clave);
    }
    if (cubetas.size > MAX_IPS) cubetas.clear();
  }

  const cubeta = cubetas.get(ip);
  if (!cubeta || ahora - cubeta.renovado >= VENTANA_MS) {
    cubetas.set(ip, { fichas: PETICIONES_POR_VENTANA - 1, renovado: ahora });
    return true;
  }
  if (cubeta.fichas <= 0) return false;
  cubeta.fichas -= 1;
  return true;
}

/** La IP del cliente según las cabeceras que pone Vercel por delante. */
export function ipDe(req: Request): string {
  const reenviada = req.headers.get('x-forwarded-for');
  if (reenviada) {
    const primera = reenviada.split(',')[0];
    if (primera) return primera.trim();
  }
  return req.headers.get('x-real-ip') ?? 'desconocida';
}
