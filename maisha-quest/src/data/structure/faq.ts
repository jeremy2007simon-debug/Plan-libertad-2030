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

import type { FaqStructure } from "@/types/content";

export const FAQ_STRUCTURE: FaqStructure[] = [
  { slug: "best-time-to-visit", topic: "planning" },
  { slug: "how-far-in-advance", topic: "planning" },
  { slug: "what-does-private-mean", topic: "safari" },
  { slug: "single-travellers", topic: "planning" },
  { slug: "children", topic: "planning" },
  { slug: "visa-and-entry", topic: "travel" },
  { slug: "vaccinations", topic: "health" },
  { slug: "languages", topic: "planning" },
  { slug: "what-to-pack", topic: "travel" },
  { slug: "how-to-start", topic: "planning" },
];
