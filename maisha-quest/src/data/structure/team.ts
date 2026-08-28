/**
 * ESTRUCTURA — sin una sola palabra traducible.
 *
 * Slugs, duraciones, coordenadas, rutas, relaciones y fotografías viven aquí
 * una única vez, compartidas por los seis idiomas. El texto visible está en
 * `src/i18n/content/<idioma>.ts`. Así la versión alemana no puede declarar un
 * safari de siete días si la francesa dice ocho: la duración solo existe en
 * este archivo.
 *
 * Generado a partir de los datos originales; a partir de aquí se edita a mano.
 */

import type { TeamStructure } from "@/types/content";

/**
 * Tres personas reales. Los nombres no se traducen, y los retratos siguen
 * pendientes: `src: null` pinta el hueco con monograma, nunca una foto de
 * archivo, que aquí sería directamente falsa.
 */
export const TEAM_STRUCTURE: TeamStructure[] = [
  {
    slug: "talisa-tufts",
    name: "Talisa Tufts",
    languageCodes: ["English","Swahili","Russian","Mandarin Chinese"],
    portrait: {"src":null},
  },
  {
    slug: "frank-lyatuu",
    name: "Frank Lyatuu",
    languageCodes: ["English","Swahili"],
    portrait: {"src":null},
  },
  {
    slug: "tina-ngabo",
    name: "Tina Ngabo",
    languageCodes: ["English","Swahili"],
    portrait: {"src":null},
  },
];
