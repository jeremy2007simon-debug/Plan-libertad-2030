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

import type { JournalStructure } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

export const JOURNAL_STRUCTURE: JournalStructure[] = [
  {
    slug: "when-to-see-the-great-migration",
    date: "2026-07-14",
    author: null,
    readingMinutes: 7,
    image: PHOTOS["wildebeest-migration"],
  },
  {
    slug: "choosing-a-kilimanjaro-route",
    date: "2026-06-02",
    author: null,
    readingMinutes: 9,
    image: PHOTOS["kilimanjaro-shira"],
  },
  {
    slug: "green-season-tanzania",
    date: "2026-04-21",
    author: null,
    readingMinutes: 6,
    image: CLIENT_PHOTOS["flamingo-low-flight"],
  },
];
