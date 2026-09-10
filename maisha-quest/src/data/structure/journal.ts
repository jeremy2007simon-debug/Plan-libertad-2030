/**
 * ESTRUCTURA — sin una sola palabra traducible.
 *
 * Slugs, duraciones, coordenadas, rutas, relaciones y fotografías viven aquí
 * una única vez, compartidas por los seis idiomas. El texto visible está en
 * `src/i18n/content/<idioma>.ts`. Así la versión alemana no puede declarar un
 * safari de siete días si la francesa dice ocho: la duración solo existe en
 * este archivo.
 *
 * MIGRACIÓN WIX — los 3 artículos reales del blog de maishaquest.com.
 * ---------------------------------------------------------------------
 * Sustituye los 3 artículos de demostración (ver `journal.legacy.ts`), que
 * nunca tuvieron `body`: la página mostraba honestamente un aviso de
 * "artículo en preparación" en vez de párrafos inventados. Estos tres sí
 * tienen `body` real, porque existen de verdad en maishaquest.com/blog,
 * firmados por Talisa Tufts y publicados el 29 de abril de 2025.
 *
 * Nota de contenido: los tres artículos originales son, en su mayoría,
 * texto promocional genérico sobre Maisha Quest — los tres mencionan
 * explícitamente la propia migración del sitio a Wix como novedad. No son
 * guías de viaje con consejos prácticos como los tres artículos de
 * demostración que sustituyen. Se traducen tal cual, sin añadir ni quitar
 * sustancia, por poco sustancioso que sea el material de origen.
 *
 * Mapa de URL original → nueva ruta (para el bloque de redirecciones 301):
 *   /post/elevate-your-safari-experience-maisha-quest-s-tailored-adventures
 *     → /journal/elevate-your-safari-experience
 *   /post/unleash-your-wanderlust-maisha-quest-safari-adventures-await
 *     → /journal/unleash-your-wanderlust
 *   /post/discover-tanzania-s-hidden-gems-maisha-quest-safari-experiences
 *     → /journal/discover-tanzanias-hidden-gems
 *
 * Ninguna de las tres páginas originales tenía imagen descargable con
 * atribución clara, así que las fotografías siguen siendo del pool
 * provisional existente — pendientes de sustituir por las imágenes reales
 * del panel de Wix (ver inventario de medios pendientes).
 */

import type { JournalStructure } from "@/types/content";
import { CLIENT_PHOTOS } from "../client-photography";

export const JOURNAL_STRUCTURE: JournalStructure[] = [
  {
    slug: "elevate-your-safari-experience",
    date: "2025-04-29",
    author: "Talisa Tufts",
    readingMinutes: 2,
    image: CLIENT_PHOTOS["safari-tent-accommodation"],
  },
  {
    slug: "unleash-your-wanderlust",
    date: "2025-04-29",
    author: "Talisa Tufts",
    readingMinutes: 2,
    image: CLIENT_PHOTOS["savannah-acacia-sunset"],
  },
  {
    slug: "discover-tanzanias-hidden-gems",
    date: "2025-04-29",
    author: "Talisa Tufts",
    readingMinutes: 2,
    image: CLIENT_PHOTOS["tanzania-wildlife-sunset-hero"],
  },
];

export const JOURNAL_SLUGS = JOURNAL_STRUCTURE.map((p) => p.slug);
