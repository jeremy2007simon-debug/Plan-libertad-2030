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
/**
 * Redirecciones 301 desde las rutas reales de maishaquest.com (Wix).
 *
 * Fuente: `https://www.maishaquest.com/pages-sitemap.xml`, comprobada por
 * completo (44 URLs) el día de la auditoría, más los 3 artículos del blog
 * (viven en el sitemap de posts de Wix, no en el de páginas). El destino no
 * lleva prefijo de idioma: `src/proxy.ts` ya redirige cualquier ruta sin
 * idioma al detectado por cookie o `Accept-Language`, igual que hace con
 * cualquier enlace interno sin prefijo — encadenar los dos saltos es más
 * correcto que fijar aquí un idioma.
 *
 * Quedan FUERA a propósito, documentado en el README
 * ("Mapa de redirecciones 301"):
 *   - `/4days-midrange-tanzania-safaris` y `/7days-tanzania-safaris`: páginas
 *     huérfanas en el propio Wix, no corresponden a ninguno de los 18
 *     paquetes reales migrados.
 *   - `/english-refund-policy`: sin página equivalente todavía — pendiente de
 *     decisión del cliente o su asesor legal, no se inventa un destino.
 *   - `/`, `/experiences`, `/learn`: la ruta nueva es idéntica a la
 *     original, no hace falta redirección.
 *   - `six-day-camping-safari`: su tarjeta de origen en Wix no enlaza a una
 *     URL propia (enlaza, erróneamente, a la de 5 días), así que no tiene
 *     origen del que redirigir.
 *
 * `WIX_EXCLUDED_ROUTES` deja esas exclusiones como datos, no solo como
 * comentario, para que `scripts/test-redirects.mjs` pueda comprobar que
 * ninguna aparece por accidente en `WIX_REDIRECTS` y que siguen documentadas.
 */
export const WIX_EXCLUDED_ROUTES: { source: string; reason: string }[] = [
  {
    source: "/4days-midrange-tanzania-safaris",
    reason: "Página huérfana en el propio Wix — no corresponde a ninguno de los 18 paquetes reales.",
  },
  {
    source: "/7days-tanzania-safaris",
    reason: "Página huérfana en el propio Wix — no corresponde a ninguno de los 18 paquetes reales.",
  },
  {
    source: "/english-refund-policy",
    reason: "Sin página equivalente todavía — pendiente de decisión del cliente o su asesor legal.",
  },
];

export const WIX_REDIRECTS: { source: string; destination: string }[] = [
  // Learn y regiones
  { source: "/northern-region", destination: "/learn" },
  { source: "/central-and-southern-region", destination: "/learn" },
  { source: "/lake-zone-and-western-zone", destination: "/learn" },
  { source: "/coastal-region", destination: "/learn" },
  { source: "/zanzibar-island", destination: "/learn" },
  // Experiencias
  { source: "/thrill-seaker-adventures", destination: "/experiences/thrill-seeker-adventure" },
  { source: "/water-activities", destination: "/experiences/water-activities" },
  { source: "/tours", destination: "/experiences/tours-and-safaris" },
  { source: "/shopping-and-leisure", destination: "/experiences/shopping-and-leisure" },
  { source: "/nightlife", destination: "/experiences/nightlife" },
  // Colecciones
  { source: "/explorer-tanzania-safaris", destination: "/collections/explorer" },
  { source: "/escape-tanzania-safaris", destination: "/collections/escape" },
  { source: "/enrich-tanzania-safaris", destination: "/collections/enrich" },
  // Los 17 paquetes de safari con URL propia en Wix (de 18: ver la nota de
  // six-day-camping-safari arriba)
  { source: "/2days-tanzania-safaris", destination: "/safaris/manyara-ngorongoro-safari" },
  { source: "/3days-tanzania-safaris", destination: "/safaris/tarangire-manyara-ngorongoro-safari" },
  { source: "/4days-tanzania-safaris", destination: "/safaris/serengeti-ngorongoro-manyara-safari" },
  { source: "/5days-tanzania-safaris", destination: "/safaris/northern-circuit-camping-safari" },
  { source: "/5days-tanzania-safari-adventures", destination: "/safaris/tarangire-serengeti-ngorongoro-enrich" },
  { source: "/7days-camping-tanzania-safaris", destination: "/safaris/extended-camping-safari" },
  { source: "/7days-manyara-tanzania-safaris", destination: "/safaris/manyara-serengeti-ngorongoro-enrich" },
  { source: "/7days-luxury-tanzania-safaris", destination: "/safaris/safari-zanzibar-escape" },
  { source: "/8days-tanzania-safaris", destination: "/safaris/tarangire-manyara-serengeti-ngorongoro-enrich" },
  { source: "/8daystanzania-luxury-safaris", destination: "/safaris/serengeti-zanzibar" },
  { source: "/9days-tanzania-safaris", destination: "/safaris/big-three-zanzibar" },
  { source: "/10days-tanzania-safaris", destination: "/safaris/cultural-safari-combo" },
  { source: "/10days-tanzania-luxury-safaris", destination: "/safaris/safari-culture-zanzibar" },
  { source: "/11days-tanzania-luxury-safaris", destination: "/safaris/extended-safari-cultural-immersion" },
  { source: "/12days-tanzania-safaris", destination: "/safaris/luxury-safari-zanzibar" },
  { source: "/12days-enrich-tanzania-luxury-safaris", destination: "/safaris/wildlife-leisure-culture" },
  { source: "/14days-tanzania-luxury-safaris", destination: "/safaris/grand-safari-zanzibar" },
  // Blog e institucionales
  { source: "/blog", destination: "/journal" },
  {
    source: "/post/elevate-your-safari-experience-maisha-quest-s-tailored-adventures",
    destination: "/journal/elevate-your-safari-experience",
  },
  {
    source: "/post/unleash-your-wanderlust-maisha-quest-safari-adventures-await",
    destination: "/journal/unleash-your-wanderlust",
  },
  {
    source: "/post/discover-tanzania-s-hidden-gems-maisha-quest-safari-experiences",
    destination: "/journal/discover-tanzanias-hidden-gems",
  },
  { source: "/about-maisha-quest-item", destination: "/about/team" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/book-online", destination: "/plan" },
  { source: "/cares", destination: "/impact" },
  { source: "/empowerment", destination: "/impact" },
  { source: "/english-terms-conditions", destination: "/legal/terms" },
  { source: "/english-privacy-policy", destination: "/legal/privacy" },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [45, 50, 55, 60, 68, 75],
  },
  async redirects() {
    return WIX_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
