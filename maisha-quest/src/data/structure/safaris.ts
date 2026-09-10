/**
 * ESTRUCTURA — sin una sola palabra traducible.
 *
 * Slugs, duraciones, coordenadas, rutas, relaciones y fotografías viven aquí
 * una única vez, compartidas por los seis idiomas. El texto visible está en
 * `src/i18n/content/<idioma>.ts`. Así la versión alemana no puede declarar un
 * safari de siete días si la francesa dice ocho: la duración solo existe en
 * este archivo.
 *
 * MIGRACIÓN DESDE MAISHAQUEST.COM (WIX) — leer antes de tocar nada
 * -----------------------------------------------------------------
 * Estos 18 paquetes sustituyen a los 7 de demostración (conservados, sin
 * usarse, en `safaris.legacy.ts`). Son los 18 reales: 6 Explorer, 6 Escape y
 * 6 Enrich, tal y como aparecen hoy en `/explorer-tanzania-safaris`,
 * `/escape-tanzania-safaris` y `/enrich-tanzania-safaris`.
 *
 * Cada itinerario día a día, el "incluye/no incluye" y las duraciones vienen
 * literalmente de la ficha real de cada paquete. Ningún precio, nombre de
 * alojamiento concreto ni duración de trayecto figura en el sitio original,
 * así que aquí tampoco: `price` es siempre "bajo consulta",
 * `accommodationSlug` siempre `null` y `estimatedDuration` solo se rellena
 * cuando el propio itinerario da una pista razonable (p. ej. "medio día").
 *
 * Dos cosas quedan documentadas aquí porque son un hallazgo de la auditoría,
 * no un error nuestro:
 *
 * 1. `six-day-camping-safari`: en `/explorer-tanzania-safaris` la tarjeta
 *    "6 Days Tanzania Camping Safari" enlaza a la MISMA URL que el paquete de
 *    5 días (`/5days-tanzania-safaris`) — es un enlace roto del propio sitio
 *    Wix, no algo que hayamos podido corregir con más información. Se
 *    publica con el itinerario de 5 días íntegro más un sexto día genérico
 *    marcado `draft`, y una nota interna de qué falta confirmar con el
 *    cliente.
 * 2. `wildlife-leisure-culture` (Enrich, 12 días): la descripción de la
 *    página promete una etapa en las playas de Zanzíbar, pero el itinerario
 *    día a día que publica el propio sitio nunca sale de tierra firme y
 *    termina en el aeropuerto de Kilimanjaro. Se respeta el itinerario tal
 *    cual —es el dato verificable— y se anota la incoherencia para que el
 *    cliente decida cuál de los dos textos es el correcto.
 *
 * "Lake Eyasi" y las visitas a poblados masái aparecen en varios itinerarios
 * reales pero no tienen página de destino propia todavía (ver la auditoría
 * de Learn/regiones). Se mencionan en el texto de la actividad del día, no
 * como parada estructural en `routeDestinationSlugs`, hasta que exista esa
 * página.
 *
 * Las fotografías de cada paquete son PROVISIONALES: se han asignado
 * fotografías ya existentes en el repositorio por coherencia temática
 * (destino y tipo de alojamiento), no las fotografías reales de cada paquete
 * de Wix. Ver el inventario de medios pendientes para la lista exacta de lo
 * que hay que descargar del admin de Wix para sustituirlas.
 */

import type { SafariStructure } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

const PRICE_ON_REQUEST = { fromPerPerson: null, currency: "USD" } as const;

/**
 * El bloque de "incluye/no incluye" es, palabra por palabra, casi idéntico en
 * las 18 fichas reales de Wix (transporte, guía, tasas de parque, comida,
 * agua, soporte 24h / vuelos, visado, seguro, propinas, comidas fuera del
 * safari). Se define una vez por idioma en `i18n/content` y se referencia
 * desde las 18, en lugar de repetirlo, porque repetirlo no es más fiel al
 * original: el original YA es el mismo bloque copiado 18 veces.
 */

export const SAFARI_STRUCTURE: SafariStructure[] = [
  /* ======================== EXPLORER — camping ========================= */
  {
    slug: "manyara-ngorongoro-safari",
    collection: "explorer",
    durationDays: 2,
    routeDestinationSlugs: ["arusha", "lake-manyara", "ngorongoro"],
    accommodationStyle: "Tented camp",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["ngorongoro-crater"],
    gallery: [PHOTOS["lake-manyara"], CLIENT_PHOTOS["flamingo-taking-flight"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["lunch", "dinner"], images: [PHOTOS["lake-manyara"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["ngorongoro-crater"]] },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["tarangire-manyara-ngorongoro-safari", "serengeti-ngorongoro-manyara-safari"],
    featured: false,
    draft: true,
  },
  {
    slug: "tarangire-manyara-ngorongoro-safari",
    collection: "explorer",
    durationDays: 3,
    routeDestinationSlugs: ["arusha", "tarangire", "lake-manyara", "ngorongoro"],
    accommodationStyle: "Tented camp",
    price: PRICE_ON_REQUEST,
    image: CLIENT_PHOTOS["antelope-herd-grasslands"],
    gallery: [PHOTOS["tarangire-baobab"], PHOTOS["lake-manyara-giraffe"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara-giraffe"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["ngorongoro-crater"]] },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["manyara-ngorongoro-safari", "serengeti-ngorongoro-manyara-safari"],
    featured: false,
    draft: true,
  },
  {
    slug: "serengeti-ngorongoro-manyara-safari",
    collection: "explorer",
    durationDays: 4,
    routeDestinationSlugs: ["arusha", "lake-manyara", "ngorongoro", "serengeti"],
    accommodationStyle: "Tented camp",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["serengeti-plains"],
    gallery: [CLIENT_PHOTOS["flamingo-flock-in-motion"], PHOTOS["ngorongoro-zebras"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["lunch", "dinner"], images: [PHOTOS["lake-manyara"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["tarangire-manyara-ngorongoro-safari", "northern-circuit-camping-safari"],
    featured: true,
    draft: true,
  },
  {
    slug: "northern-circuit-camping-safari",
    collection: "explorer",
    durationDays: 5,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro"],
    accommodationStyle: "Tented camp",
    price: PRICE_ON_REQUEST,
    image: CLIENT_PHOTOS["safari-tent-accommodation"],
    gallery: [PHOTOS["tarangire-baobab"], PHOTOS["serengeti-sunrise"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["serengeti-ngorongoro-manyara-safari", "six-day-camping-safari"],
    featured: false,
    draft: true,
  },
  {
    slug: "six-day-camping-safari",
    collection: "explorer",
    durationDays: 6,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro"],
    accommodationStyle: "Tented camp",
    price: PRICE_ON_REQUEST,
    image: CLIENT_PHOTOS["safari-tent-accommodation"],
    gallery: [PHOTOS["tarangire-baobab"], PHOTOS["serengeti-sunset"]],
    // El sexto día no tiene itinerario propio confirmado — ver la nota de
    // cabecera del archivo. Se deja como día abierto, sin inventar actividad.
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunset"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["northern-circuit-camping-safari", "extended-camping-safari"],
    featured: false,
    draft: true,
  },
  {
    slug: "extended-camping-safari",
    collection: "explorer",
    durationDays: 7,
    routeDestinationSlugs: ["arusha", "tarangire", "lake-manyara", "serengeti", "ngorongoro"],
    accommodationStyle: "Tented camp",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["serengeti-sunset"],
    gallery: [CLIENT_PHOTOS["male-lions-together"], PHOTOS["ngorongoro-crater"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunset"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["six-day-camping-safari", "serengeti-ngorongoro-manyara-safari"],
    featured: false,
    draft: true,
  },

  /* ==================== ESCAPE — lodge + Zanzíbar ======================= */
  {
    slug: "safari-zanzibar-escape",
    collection: "escape",
    durationDays: 7,
    routeDestinationSlugs: ["arusha", "tarangire", "ngorongoro", "zanzibar"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["zanzibar-dhow-sunset"],
    gallery: [PHOTOS["ngorongoro-crater"], PHOTOS["zanzibar-stone-town"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast"], images: [PHOTOS["zanzibar-dhow-sunset"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["serengeti-zanzibar", "big-three-zanzibar"],
    featured: true,
    draft: true,
  },
  {
    slug: "serengeti-zanzibar",
    collection: "escape",
    durationDays: 8,
    routeDestinationSlugs: ["arusha", "serengeti", "ngorongoro", "zanzibar"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["zanzibar-nungwi"],
    gallery: [PHOTOS["serengeti-sunrise"], CLIENT_PHOTOS["leopard-in-tree"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast"], images: [PHOTOS["zanzibar-nungwi"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["safari-zanzibar-escape", "big-three-zanzibar"],
    featured: false,
    draft: true,
  },
  {
    slug: "big-three-zanzibar",
    collection: "escape",
    durationDays: 9,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro", "zanzibar"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: CLIENT_PHOTOS["lion-pair-calling"],
    gallery: [PHOTOS["zanzibar-stone-town"], PHOTOS["tarangire-baobab"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast"], images: undefined },
      { day: 9, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["serengeti-zanzibar", "safari-culture-zanzibar"],
    featured: false,
    draft: true,
  },
  {
    slug: "safari-culture-zanzibar",
    collection: "escape",
    durationDays: 10,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro", "zanzibar"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["maasai-boma-warm"],
    gallery: [PHOTOS["zanzibar-dhow-sunset"], PHOTOS["serengeti-plains"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["arusha"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      // Día 7: visita cultural en Lake Eyasi antes del vuelo a Zanzíbar — ver
      // nota de cabecera sobre destinos sin página propia todavía.
      { day: 7, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["maasai-boma-warm"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 9, accommodationSlug: null, meals: ["breakfast"], images: [PHOTOS["zanzibar-dhow-sunset"]] },
      { day: 10, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["big-three-zanzibar", "luxury-safari-zanzibar"],
    featured: false,
    draft: true,
  },
  {
    slug: "luxury-safari-zanzibar",
    collection: "escape",
    durationDays: 12,
    routeDestinationSlugs: ["arusha", "tarangire", "lake-manyara", "serengeti", "ngorongoro", "zanzibar"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["balloon-serengeti"],
    gallery: [PHOTOS["zanzibar-nungwi"], CLIENT_PHOTOS["giraffes-open-savannah"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara-giraffe"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      // Día 5: globo aerostático opcional al amanecer — no incluido en el precio base (ver "no incluye").
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["balloon-serengeti"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["zanzibar-dhow-sunset"]] },
      { day: 9, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 10, accommodationSlug: null, meals: ["breakfast"], images: [PHOTOS["zanzibar-nungwi"]] },
      { day: 11, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["zanzibar-nungwi"]] },
      { day: 12, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["safari-culture-zanzibar", "grand-safari-zanzibar"],
    featured: false,
    draft: true,
  },
  {
    slug: "grand-safari-zanzibar",
    collection: "escape",
    durationDays: 14,
    routeDestinationSlugs: ["arusha", "tarangire", "lake-manyara", "serengeti", "ngorongoro", "zanzibar"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["zanzibar-stone-town"],
    gallery: [PHOTOS["maasai-boma-warm"], PHOTOS["wildebeest-migration"], PHOTOS["zanzibar-dhow-sunset"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara-giraffe"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["wildebeest-migration"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-zebras"]] },
      { day: 9, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["maasai-boma-warm"]] },
      { day: 10, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["zanzibar-stone-town"]] },
      { day: 11, accommodationSlug: null, meals: ["breakfast"], images: [PHOTOS["zanzibar-nungwi"]] },
      { day: 12, accommodationSlug: null, meals: ["breakfast"], images: [PHOTOS["zanzibar-nungwi"]] },
      { day: 13, accommodationSlug: null, meals: ["breakfast", "dinner"], images: [PHOTOS["zanzibar-dhow-sunset"]] },
      { day: 14, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["luxury-safari-zanzibar", "safari-culture-zanzibar"],
    featured: false,
    draft: true,
  },

  /* ============== ENRICH — lodge, fauna + cultura, sin Zanzíbar ========= */
  {
    slug: "tarangire-serengeti-ngorongoro-enrich",
    collection: "enrich",
    durationDays: 5,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["ngorongoro-zebras"],
    gallery: [CLIENT_PHOTOS["antelope-herd-grasslands"], PHOTOS["serengeti-cheetah"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      // Día 4: visita opcional a un poblado masái, mencionada en la ficha real.
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-cheetah"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch"], images: [PHOTOS["ngorongoro-crater"]] },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["manyara-serengeti-ngorongoro-enrich", "tarangire-manyara-serengeti-ngorongoro-enrich"],
    featured: false,
    draft: true,
  },
  {
    slug: "manyara-serengeti-ngorongoro-enrich",
    collection: "enrich",
    durationDays: 7,
    routeDestinationSlugs: ["arusha", "lake-manyara", "serengeti", "ngorongoro"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["lake-manyara-giraffe"],
    gallery: [PHOTOS["serengeti-plains"], PHOTOS["ngorongoro-crater"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara-giraffe"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunset"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["tarangire-serengeti-ngorongoro-enrich", "tarangire-manyara-serengeti-ngorongoro-enrich"],
    featured: true,
    draft: true,
  },
  {
    slug: "tarangire-manyara-serengeti-ngorongoro-enrich",
    collection: "enrich",
    durationDays: 8,
    routeDestinationSlugs: ["arusha", "tarangire", "lake-manyara", "serengeti", "ngorongoro"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: CLIENT_PHOTOS["giraffes-open-savannah"],
    gallery: [PHOTOS["tarangire-baobab"], PHOTOS["lake-manyara"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunset"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast", "lunch"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["manyara-serengeti-ngorongoro-enrich", "cultural-safari-combo"],
    featured: false,
    draft: true,
  },
  {
    slug: "cultural-safari-combo",
    collection: "enrich",
    durationDays: 10,
    routeDestinationSlugs: ["arusha", "tarangire", "serengeti", "ngorongoro"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["maasai-boma-warm"],
    gallery: [PHOTOS["serengeti-sunrise"], CLIENT_PHOTOS["elephant-family-walking"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["arusha"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunset"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      // Días 8-9: Lake Eyasi (comunidades hadzabe y datoga) y poblado masái —
      // sin página de destino propia todavía, ver nota de cabecera.
      { day: 8, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["maasai-boma-warm"]] },
      { day: 9, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [CLIENT_PHOTOS["elephant-family-walking"]] },
      { day: 10, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["tarangire-manyara-serengeti-ngorongoro-enrich", "extended-safari-cultural-immersion"],
    featured: false,
    draft: true,
  },
  {
    slug: "extended-safari-cultural-immersion",
    collection: "enrich",
    durationDays: 11,
    routeDestinationSlugs: ["arusha", "tarangire", "lake-manyara", "serengeti", "ngorongoro"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: CLIENT_PHOTOS["male-lions-together"],
    gallery: [PHOTOS["maasai-boma-warm"], PHOTOS["ngorongoro-zebras"]],
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["arusha"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunset"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-zebras"]] },
      { day: 9, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      // Día 10: comunidades hadzabe (Lake Eyasi), datoga y masái — ver nota de cabecera.
      { day: 10, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["maasai-boma-warm"]] },
      { day: 11, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["cultural-safari-combo", "wildlife-leisure-culture"],
    featured: false,
    draft: true,
  },
  {
    slug: "wildlife-leisure-culture",
    collection: "enrich",
    durationDays: 12,
    routeDestinationSlugs: ["arusha", "tarangire", "lake-manyara", "serengeti", "ngorongoro"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["serengeti-sunset"],
    gallery: [PHOTOS["balloon-serengeti"], CLIENT_PHOTOS["flamingo-low-flight"]],
    // La descripción de la ficha real promete una etapa en Zanzíbar que el
    // itinerario día a día no incluye — ver la nota de cabecera del archivo.
    // Se publica el itinerario, que es el dato verificable.
    itinerary: [
      { day: 1, accommodationSlug: null, meals: ["dinner"], images: [PHOTOS["arusha"]] },
      { day: 2, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["arusha"]] },
      { day: 3, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["tarangire-baobab"]] },
      { day: 4, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["lake-manyara"]] },
      { day: 5, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunrise"]] },
      { day: 6, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-plains"]] },
      { day: 7, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["balloon-serengeti"]] },
      { day: 8, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["serengeti-sunset"]] },
      { day: 9, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["ngorongoro-crater"]] },
      { day: 10, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [PHOTOS["maasai-boma-warm"]] },
      { day: 11, accommodationSlug: null, meals: ["breakfast", "lunch", "dinner"], images: [CLIENT_PHOTOS["flamingo-low-flight"]] },
      { day: 12, accommodationSlug: null, meals: ["breakfast"], images: undefined },
    ],
    faqSlugs: ["best-time-to-visit", "how-far-in-advance", "single-travellers"],
    relatedSafariSlugs: ["extended-safari-cultural-immersion", "cultural-safari-combo"],
    featured: false,
    draft: true,
  },
];

export const SAFARI_SLUGS = SAFARI_STRUCTURE.map((s) => s.slug);
