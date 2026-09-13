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
    // Sin fotografía: no existe ninguna imagen autorizada de vida nocturna.
    // Antes se ponía aquí una fotografía elegida solo porque pasaba la
    // comprobación cromática del selector (`check-experience-cards.mjs`) —
    // un lago con una jirafa, que no representa la categoría en absoluto.
    // `image` queda sin definir a propósito: cada sitio que la pinta (tarjeta
    // de /experiences, cabecera de su ficha, selector de la home) pasa a un
    // tratamiento tipográfico neutral en su lugar. Ver `photography-wanted.ts`
    // si llega una fotografía real que lo resuelva.
    destinationSlugs: ["arusha", "zanzibar"],
  },
];

export const EXPERIENCE_SLUGS = EXPERIENCE_STRUCTURE.map((e) => e.slug);

/**
 * Las cinco categorías reales del selector de la home, en el orden en que
 * aparecen en la página /experiences de maishaquest.com. Con una sola
 * `Experience` por categoría, `leadExperienceSlug` coincide con `id`.
 *
 * `nightlife` no tiene `image` (ver `Experience.image` y la propia entrada en
 * `EXPERIENCE_STRUCTURE`): cada sitio que pinta su fotografía —incluido este
 * selector— lo detecta directamente comprobando si `image` existe, en vez de
 * llevar aquí una segunda bandera que podría desincronizarse de la primera.
 */
export const EXPERIENCE_CATEGORIES: {
  id: Experience["category"];
  leadExperienceSlug: string;
}[] = [
  { id: "thrill-seeker-adventure", leadExperienceSlug: "thrill-seeker-adventure" },
  { id: "water-activities", leadExperienceSlug: "water-activities" },
  { id: "tours-and-safaris", leadExperienceSlug: "tours-and-safaris" },
  { id: "shopping-and-leisure", leadExperienceSlug: "shopping-and-leisure" },
  { id: "nightlife", leadExperienceSlug: "nightlife" },
];
