import type { NextConfig } from "next";

/**
 * Configuración de Next.
 *
 * El proyecto no tenía archivo de configuración: no hacía falta. Existe ahora
 * por una sola razón, y conviene dejarla escrita porque es un cambio de Next
 * 16 que no avisa.
 *
 * `images.qualities` pasó a valer `[75]` por defecto. Antes, la prop `quality`
 * de `<Image>` aceptaba cualquier valor; ahora, cualquier número que no esté
 * en esta lista se REDONDEA al más cercano de la lista, sin error ni aviso: se
 * pide `quality={68}` y se sirve 75 igualmente. Se detectó comparando la URL
 * generada (`&q=75`) con lo que pedía el componente.
 *
 * 68 y 60 son las calidades de las fotografías grandes que el navegador
 * descarga antes de que nadie toque el scroll. Son fauna y paisaje, sin texto
 * ni degradados planos, y a tamaño de pantalla no se distinguen de 75; el
 * archivo baja entre un tercio y la mitad, que es lo que separa la primera
 * pantalla de entrar o no en presupuesto.
 *
 * En una pantalla de 390 px a 3× de densidad, una fotografía a todo el ancho
 * son 1.200 px reales: ahí es donde se van los kilobytes, no en el hero.
 */
const nextConfig: NextConfig = {
  images: {
    qualities: [45, 50, 55, 60, 68, 75],
  },
};

export default nextConfig;
