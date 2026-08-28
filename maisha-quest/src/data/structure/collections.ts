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

import type { CollectionStructure } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

/** Explorer, Escape y Enrich son nombres de marca: no se traducen. */
export const COLLECTION_STRUCTURE: CollectionStructure[] = [
  {
    id: "explorer",
    typicalDurationDays: [7,12],
    accent: "sand",
    image: CLIENT_PHOTOS["lion-open-savannah"],
  },
  {
    id: "escape",
    typicalDurationDays: [7,14],
    accent: "terracotta",
    image: PHOTOS["serengeti-sunset"],
  },
  {
    id: "enrich",
    typicalDurationDays: [8,14],
    accent: "gold",
    image: CLIENT_PHOTOS["giraffe-oxpecker-birds"],
  },
];
