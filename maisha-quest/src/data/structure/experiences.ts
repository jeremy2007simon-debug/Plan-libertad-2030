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

import type { ExperienceStructure, Experience } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

export const EXPERIENCE_STRUCTURE: ExperienceStructure[] = [
  {
    slug: "game-drives",
    category: "wildlife",
    image: CLIENT_PHOTOS["leopard-in-tree"],
    destinationSlugs: ["serengeti","ngorongoro","tarangire","lake-manyara","ruaha","nyerere"],
  },
  {
    slug: "great-migration",
    category: "wildlife",
    image: PHOTOS["wildebeest-migration"],
    destinationSlugs: ["serengeti"],
  },
  {
    slug: "mobile-camping",
    category: "adventure",
    image: PHOTOS["serengeti-sunrise"],
    destinationSlugs: ["serengeti","ngorongoro"],
  },
  {
    slug: "walking-safari",
    category: "adventure",
    image: CLIENT_PHOTOS["antelope-herd-grasslands"],
    destinationSlugs: ["tarangire","nyerere","ruaha","kilimanjaro"],
  },
  {
    slug: "balloon-safari",
    category: "luxury",
    image: PHOTOS["balloon-serengeti"],
    destinationSlugs: ["serengeti"],
  },
  {
    slug: "photographic-safari",
    category: "luxury",
    // Era la otra monocroma del carrusel. No se reutiliza el leopardo, que ya
    // ilustra la tarjeta de fauna: dos veces la misma foto en la misma tira, y
    // tampoco los leones en blanco y negro.
    image: CLIENT_PHOTOS["male-lions-together"],
    destinationSlugs: ["serengeti","ngorongoro","ruaha"],
  },
  {
    slug: "beach-and-ocean",
    category: "honeymoon",
    image: PHOTOS["zanzibar-dhow-sunset"],
    destinationSlugs: ["zanzibar"],
  },
  {
    slug: "family-safari",
    category: "family",
    // En color. Antes iba la manada de elefantes en blanco y negro, que era la
    // única monocroma del carrusel de la portada; los elefantes caminando que
    // parecían el relevo natural resultaron ser también monocromos —de las 19
    // fotografías del cliente, cinco lo son—. Los flamencos del lago Manyara,
    // que además es uno de los destinos de esta experiencia, sí tienen color.
    image: CLIENT_PHOTOS["flamingos-tanzania-lake"],
    destinationSlugs: ["tarangire","lake-manyara","ngorongoro","zanzibar"],
  },
  {
    slug: "cultural-encounters",
    category: "culture",
    image: PHOTOS["maasai-boma"],
    destinationSlugs: ["ngorongoro","arusha","zanzibar","kilimanjaro"],
  },
  {
    slug: "coffee-and-cuisine",
    category: "culture",
    image: PHOTOS["zanzibar-stone-town"],
    destinationSlugs: ["arusha","kilimanjaro","zanzibar"],
  },
  {
    slug: "kilimanjaro-trek",
    category: "kilimanjaro",
    image: PHOTOS["kilimanjaro-climbers"],
    destinationSlugs: ["kilimanjaro"],
  },
  {
    slug: "safari-and-zanzibar",
    category: "safari-and-zanzibar",
    image: PHOTOS["ngorongoro-zebras"],
    destinationSlugs: ["serengeti","ngorongoro","zanzibar"],
  },
  {
    slug: "boat-safari",
    category: "adventure",
    image: PHOTOS["nyerere"],
    destinationSlugs: ["nyerere"],
  },
  {
    slug: "birdwatching",
    category: "wildlife",
    image: CLIENT_PHOTOS["flamingo-taking-flight"],
    destinationSlugs: ["lake-manyara","nyerere","tarangire"],
  },
  {
    slug: "conservation",
    category: "culture",
    image: PHOTOS["ruaha"],
    destinationSlugs: ["ngorongoro","serengeti","ruaha"],
  },
];

export const EXPERIENCE_SLUGS = EXPERIENCE_STRUCTURE.map((e) => e.slug);

/**
 * Las ocho categorías del selector de la home, en orden. La etiqueta sale del
 * diccionario; aquí solo vive qué experiencia representa a cada categoría.
 */
export const EXPERIENCE_CATEGORIES: {
  id: Experience["category"];
  leadExperienceSlug: string;
}[] = [
  { id: "wildlife", leadExperienceSlug: "game-drives" },
  { id: "adventure", leadExperienceSlug: "walking-safari" },
  { id: "luxury", leadExperienceSlug: "balloon-safari" },
  { id: "honeymoon", leadExperienceSlug: "beach-and-ocean" },
  { id: "family", leadExperienceSlug: "family-safari" },
  { id: "culture", leadExperienceSlug: "cultural-encounters" },
  { id: "kilimanjaro", leadExperienceSlug: "kilimanjaro-trek" },
  { id: "safari-and-zanzibar", leadExperienceSlug: "safari-and-zanzibar" },
];
