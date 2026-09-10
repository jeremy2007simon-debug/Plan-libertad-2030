/**
 * ⚠️ ARCHIVO LEGADO — NO SE IMPORTA EN NINGÚN SITIO. NO SE USA EN PRODUCCIÓN.
 *
 * Los tres artículos de demostración que existían antes de migrar los tres
 * artículos reales de maishaquest.com (ver `journal.ts`). Se conservan aquí,
 * intactos, solo por si su estructura o enfoque editorial hiciera falta como
 * referencia más adelante. Ninguno de los tres es un artículo real de Maisha
 * Quest: eran guías de viaje genéricas, bien escritas pero inventadas para
 * mostrar cómo se vería un journal antes de tener contenido oficial. De
 * hecho ninguno tenía `body`: la página siempre mostró un estado "artículo
 * en preparación" en vez de inventar párrafos firmados por la empresa.
 *
 * Si esto sigue sin usarse dentro de unos meses, se puede borrar sin más.
 */

import type { JournalStructure } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

export const LEGACY_JOURNAL_STRUCTURE: JournalStructure[] = [
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

export const LEGACY_JOURNAL_SLUGS = LEGACY_JOURNAL_STRUCTURE.map((p) => p.slug);
