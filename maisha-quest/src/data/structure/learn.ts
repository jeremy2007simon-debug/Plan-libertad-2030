/**
 * ESTRUCTURA — sin una sola palabra traducible.
 *
 * Slugs, coordenadas... no aplican aquí igual que en otros archivos de esta
 * carpeta, pero el principio es el mismo: lo que no cambia entre idiomas vive
 * aquí (qué destinos actuales del sitio caen en qué región real, y qué
 * fotografía ilustra cada tema/región), y el texto visible vive en
 * `src/i18n/content/<idioma>.ts`.
 *
 * MIGRACIÓN WIX — sección Learn y organización regional real.
 * ------------------------------------------------------------
 * maishaquest.com tiene una página `/learn` con 6 temas (Geography & Nature,
 * Culture, History, Wildlife & Conservation, Economy & Development, Cultural
 * Events & Festivals) y 5 páginas de región (Northern, Central & Southern,
 * Lake Zone & Western, Coastal, y Zanzibar Island como "Special Feature").
 * Cada página real de región tiene, además, cuatro secciones propias
 * (People, Culture, Place, History) con mucho más detalle del que se
 * reproduce aquí: lo de abajo es un resumen fiel — cada dato citado existe
 * en la fuente — pero no el volcado completo de las cuatro secciones. Ver
 * la nota en `RegionText`/`LearnTopicText` en `types/content.ts`.
 *
 * De los 9 destinos actuales del sitio, 6 caen en la región Northern
 * (Serengeti, Tarangire, Lake Manyara, Ngorongoro, Kilimanjaro, Arusha), 2 en
 * Central & Southern (Nyerere, Ruaha) y 1 es la propia Zanzibar Island. Ni
 * la región Lake Zone & Western ni la región Coastal (continental, distinta
 * de Zanzibar) tienen todavía una página de destino propia en este sitio —
 * sus tarjetas en /learn no enlazan a ningún destino, lo cual es honesto:
 * no existe contenido verificable propio que publicar todavía.
 */

import type { LearnTopicStructure, RegionStructure } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

export const LEARN_TOPIC_STRUCTURE: LearnTopicStructure[] = [
  { slug: "geography", image: PHOTOS["kilimanjaro-kibo"] },
  { slug: "culture", image: PHOTOS["maasai-boma-warm"] },
  { slug: "history", image: PHOTOS["ngorongoro-crater"] },
  { slug: "wildlife-and-conservation", image: CLIENT_PHOTOS["elephant-family-walking"] },
  { slug: "economy", image: PHOTOS["arusha"] },
  { slug: "festivals", image: PHOTOS["zanzibar-stone-town"] },
];

export const LEARN_TOPIC_SLUGS = LEARN_TOPIC_STRUCTURE.map((t) => t.slug);

export const REGION_STRUCTURE: RegionStructure[] = [
  {
    slug: "northern",
    destinationSlugs: ["serengeti", "tarangire", "lake-manyara", "ngorongoro", "kilimanjaro", "arusha"],
    image: PHOTOS["serengeti-plains"],
  },
  {
    slug: "central-southern",
    destinationSlugs: ["nyerere", "ruaha"],
    image: PHOTOS["ruaha"],
  },
  {
    slug: "lake-zone-western",
    // Sin destino propio todavía — provisional por temática (paisaje de
    // sabana, no del lago Victoria/Tanganica reales).
    destinationSlugs: [],
    image: CLIENT_PHOTOS["savannah-acacia-sunset"],
  },
  {
    slug: "coastal",
    // Región continental (Dar es Salaam, Bagamoyo, Kilwa...), distinta de
    // Zanzibar Island. Sin destino propio todavía.
    destinationSlugs: [],
    image: PHOTOS["zanzibar-dhow-sunset"],
  },
  {
    slug: "zanzibar-island",
    destinationSlugs: ["zanzibar"],
    image: PHOTOS["zanzibar-nungwi"],
  },
];

export const REGION_SLUGS = REGION_STRUCTURE.map((r) => r.slug);
