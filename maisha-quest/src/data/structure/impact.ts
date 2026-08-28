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

import type { ImpactStructure } from "@/types/content";

/**
 * `outcomes` vacío en todos: no hay cifras confirmadas por el cliente y no se
 * inventa ninguna. La interfaz detecta el vacío y muestra el proyecto sin
 * resultados en lugar de un número inventado.
 */
export const IMPACT_STRUCTURE: ImpactStructure[] = [
  {
    slug: "education",
    area: "education",
    outcomes: [],
    image: {"src":null,"alt":"Maisha Quest education support work"},
  },
  {
    slug: "conservation",
    area: "conservation",
    outcomes: [],
    image: {"src":null,"alt":"Conservation work supported by Maisha Quest"},
  },
  {
    slug: "community",
    area: "community",
    outcomes: [],
    image: {"src":null,"alt":"Community partnership work by Maisha Quest"},
  },
  {
    slug: "local-employment",
    area: "employment",
    outcomes: [],
    image: {"src":null,"alt":"The Maisha Quest team at work in Arusha"},
  },
];
