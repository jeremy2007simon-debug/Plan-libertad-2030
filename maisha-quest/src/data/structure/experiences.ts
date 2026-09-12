/**
 * ESTRUCTURA — sin una sola palabra traducible.
 *
 * Slugs, duraciones, coordenadas, rutas, relaciones y fotografías viven aquí
 * una única vez, compartidas por los seis idiomas. El texto visible está en
 * `src/i18n/content/<idioma>.ts`. Así la versión alemana no puede declarar un
 * safari de siete días si la francesa dice ocho: la duración solo existe en
 * este archivo.
 *
 * MIGRACIÓN WIX — sustituye las 8 categorías inventadas por las 5 reales.
 * ---------------------------------------------------------------------
 * La sección "Experiences" de maishaquest.com no es un catálogo de
 * actividades de safari (eso vive en los paquetes): son cinco páginas de
 * categoría — Thrill Seeker Adventure, Water Activities, Tours & Safaris,
 * Shopping and Leisure, Nightlife — cada una con una lista de actividades
 * reservables por libre en Arusha, Zanzíbar, Moshi, Dar es Salaam y Mwanza
 * (paracaidismo, submarinismo, mercados, vida nocturna...). El sitio real NO
 * tiene una página propia por actividad individual, así que replicar aquí
 * quince o cincuenta slugs de detalle habría sido inventar una arquitectura
 * de contenido que maishaquest.com no tiene. En su lugar, cada una de las
 * cinco categorías reales es una única `Experience`, y su `description`
 * enumera con fidelidad las actividades reales listadas en su página de
 * origen — nada inventado, nada resumido hasta perder el nombre o el lugar.
 *
 * Las 15 "experiencias" anteriores (game-drives, great-migration,
 * mobile-camping, walking-safari, balloon-safari, photographic-safari,
 * beach-and-ocean, family-safari, cultural-encounters, coffee-and-cuisine,
 * kilimanjaro-trek, safari-and-zanzibar, boat-safari, birdwatching,
 * conservation) desaparecen: no existen como tales en maishaquest.com.
 *
 * Ninguna fotografía del pool actual (fauna y paisaje) representa de verdad
 * paracaidismo, tirolina, un mercado o una discoteca. Las cinco imágenes de
 * abajo son sustitutos provisionales por temática/tono, marcados aquí como
 * pendientes de reemplazo real — ver el inventario de recursos del bloque de
 * Fase 2 (paso 7, medios pendientes de Wix).
 */

import type { ExperienceStructure, Experience } from "@/types/content";
import { PHOTOS } from "../photography";

export const EXPERIENCE_STRUCTURE: ExperienceStructure[] = [
  {
    slug: "thrill-seeker-adventure",
    category: "thrill-seeker-adventure",
    // Provisional: no hay en el pool ninguna foto de paracaidismo, tirolina
    // o parapente. Sustituye por una fotografía real de aventura en cuanto
    // esté descargada del panel de Wix.
    image: PHOTOS["balloon-serengeti"],
    destinationSlugs: ["arusha", "kilimanjaro", "zanzibar"],
  },
  {
    slug: "water-activities",
    category: "water-activities",
    // Provisional: sin fotos propias de buceo, kitesurf o motos acuáticas.
    image: PHOTOS["zanzibar-dhow-sunset"],
    destinationSlugs: ["arusha", "zanzibar"],
  },
  {
    slug: "tours-and-safaris",
    category: "tours-and-safaris",
    image: PHOTOS["maasai-boma-warm"],
    destinationSlugs: ["arusha", "kilimanjaro", "zanzibar"],
  },
  {
    slug: "shopping-and-leisure",
    category: "shopping-and-leisure",
    // La única del grupo con encaje real: Stone Town es, literalmente, uno
    // de los lugares de compras que lista la página de origen.
    image: PHOTOS["zanzibar-stone-town"],
    destinationSlugs: ["arusha", "zanzibar"],
  },
  {
    slug: "nightlife",
    category: "nightlife",
    // Provisional: sin fotos propias de vida nocturna. `savannah-acacia-sunset`
    // era la primera opción por tema, pero a 2264 K, 63% de saturación y fuera
    // de rango cromático rompía la comprobación del explorador
    // (check-experience-cards.mjs exige 2600-7000 K, saturación hasta 45% y
    // menos de 16% de píxeles azul/violeta entre las cinco fotografías). Esta
    // pasa las tres comprobaciones — sigue sin representar vida nocturna real.
    image: PHOTOS["lake-manyara-giraffe"],
    destinationSlugs: ["arusha", "zanzibar"],
  },
];

export const EXPERIENCE_SLUGS = EXPERIENCE_STRUCTURE.map((e) => e.slug);

/**
 * Las cinco categorías reales del selector de la home, en el orden en que
 * aparecen en la página /experiences de maishaquest.com. Con una sola
 * `Experience` por categoría, `leadExperienceSlug` coincide con `id`.
 *
 * `noPhoto` — solo en `nightlife`. No existe ninguna fotografía autorizada de
 * vida nocturna: la que se usaba antes (un lago con una jirafa) pasaba la
 * comprobación cromática del selector por casualidad de color, no porque
 * representara la categoría. Se retira del selector panorámico —que muestra
 * una única fotografía protagonista y por eso es donde el desajuste se nota
 * más— a favor de un tratamiento tipográfico neutral, con el mismo contenido
 * y el mismo enlace. La `Experience` en sí conserva su fotografía original
 * (ficha de detalle, rejilla de `/experiences`): ese es un desajuste menor,
 * de una imagen entre muchas en una rejilla, no la única imagen protagonista
 * de la categoría, así que se deja fuera de esta ronda.
 */
export const EXPERIENCE_CATEGORIES: {
  id: Experience["category"];
  leadExperienceSlug: string;
  noPhoto?: true;
}[] = [
  { id: "thrill-seeker-adventure", leadExperienceSlug: "thrill-seeker-adventure" },
  { id: "water-activities", leadExperienceSlug: "water-activities" },
  { id: "tours-and-safaris", leadExperienceSlug: "tours-and-safaris" },
  { id: "shopping-and-leisure", leadExperienceSlug: "shopping-and-leisure" },
  { id: "nightlife", leadExperienceSlug: "nightlife", noPhoto: true },
];
