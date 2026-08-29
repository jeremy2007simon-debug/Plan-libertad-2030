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

import type { SafariStructure } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

const PRICE_ON_REQUEST = { fromPerPerson: null, currency: "USD" } as const;

/**
 * ⚠️ ITINERARIOS DE DEMOSTRACIÓN — pendientes de validar por el equipo de
 * Arusha. Todos llevan `draft: true` y `price.fromPerPerson: null`. No hay una
 * sola tarifa inventada: donde no hay precio real la ficha dice "precio bajo
 * consulta" en el idioma que toque, nunca una cifra.
 */
export const SAFARI_STRUCTURE: SafariStructure[] = [
  {
    slug: "serengeti-ngorongoro-journey",
    collection: "escape",
    durationDays: 7,
    routeDestinationSlugs: ["arusha","tarangire","serengeti","ngorongoro"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["ngorongoro-crater"],
    gallery: [CLIENT_PHOTOS["giraffes-open-savannah"], CLIENT_PHOTOS["lion-pair-calling"], PHOTOS["serengeti-sunrise"], CLIENT_PHOTOS["elephant-family-walking"]],
    itinerary: [
      {
        day: 1,
        accommodationSlug: null,
        meals: ["dinner"],
        images: [PHOTOS["arusha"]],
      },
      {
        day: 2,
        accommodationSlug: null,
        meals: ["breakfast","lunch","dinner"],
        images: [PHOTOS["tarangire-baobab"]],
      },
      {
        day: 3,
        accommodationSlug: null,
        meals: ["breakfast","lunch","dinner"],
        images: [PHOTOS["serengeti-plains"]],
      },
      {
        day: 4,
        accommodationSlug: null,
        meals: ["breakfast","lunch","dinner"],
        images: [PHOTOS["serengeti-cheetah"], PHOTOS["balloon-serengeti"]],
      },
      {
        day: 5,
        accommodationSlug: null,
        meals: ["breakfast","lunch","dinner"],
        images: [PHOTOS["serengeti-sunset"]],
      },
      {
        day: 6,
        accommodationSlug: null,
        meals: ["breakfast","lunch","dinner"],
        images: [PHOTOS["ngorongoro-zebras"]],
      },
      {
        day: 7,
        accommodationSlug: null,
        meals: ["breakfast","lunch"],
        images: undefined,
      },
    ],
    faqSlugs: ["best-time-to-visit","how-far-in-advance","single-travellers"],
    relatedSafariSlugs: ["serengeti-under-canvas","serengeti-and-zanzibar"],
    featured: true,
    draft: true,
  },
  {
    slug: "serengeti-under-canvas",
    collection: "explorer",
    durationDays: 9,
    routeDestinationSlugs: ["arusha","tarangire","serengeti","ngorongoro"],
    accommodationStyle: "Mobile camp",
    price: PRICE_ON_REQUEST,
    image: CLIENT_PHOTOS["safari-tent-accommodation"],
    gallery: [PHOTOS["serengeti-sunrise"], CLIENT_PHOTOS["male-lions-together"], PHOTOS["wildebeest-migration"]],
    itinerary: [

    ],
    faqSlugs: undefined,
    relatedSafariSlugs: ["serengeti-ngorongoro-journey","southern-wild"],
    featured: true,
    draft: true,
  },
  {
    slug: "serengeti-and-zanzibar",
    collection: "escape",
    durationDays: 11,
    routeDestinationSlugs: ["arusha","serengeti","ngorongoro","zanzibar"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["zanzibar-nungwi"],
    gallery: [CLIENT_PHOTOS["antelope-herd-grasslands"], PHOTOS["zanzibar-dhow-sunset"], PHOTOS["zanzibar-stone-town"]],
    itinerary: [

    ],
    faqSlugs: undefined,
    relatedSafariSlugs: ["serengeti-ngorongoro-journey","tanzania-in-depth"],
    featured: true,
    draft: true,
  },
  {
    slug: "tanzania-in-depth",
    collection: "enrich",
    durationDays: 10,
    routeDestinationSlugs: ["arusha","kilimanjaro","ngorongoro","serengeti","zanzibar"],
    accommodationStyle: "Boutique lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["zanzibar-stone-town"],
    gallery: [PHOTOS["maasai-boma-warm"], PHOTOS["kilimanjaro-shira"], CLIENT_PHOTOS["zebra-herd-monochrome"]],
    itinerary: [

    ],
    faqSlugs: undefined,
    relatedSafariSlugs: ["serengeti-ngorongoro-journey","highlands-and-communities"],
    featured: true,
    draft: true,
  },
  {
    slug: "southern-wild",
    collection: "explorer",
    durationDays: 9,
    routeDestinationSlugs: ["nyerere","ruaha"],
    accommodationStyle: "Tented camp",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["nyerere"],
    gallery: [PHOTOS["ruaha"]],
    itinerary: [

    ],
    faqSlugs: undefined,
    relatedSafariSlugs: ["serengeti-under-canvas"],
    featured: false,
    draft: true,
  },
  {
    slug: "kilimanjaro-lemosho",
    collection: "explorer",
    durationDays: 9,
    routeDestinationSlugs: ["arusha","kilimanjaro"],
    accommodationStyle: "Mobile camp",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["kilimanjaro-kibo"],
    gallery: [PHOTOS["kilimanjaro-climbers"], PHOTOS["kilimanjaro-shira"]],
    itinerary: [

    ],
    faqSlugs: undefined,
    relatedSafariSlugs: ["serengeti-under-canvas","highlands-and-communities"],
    featured: false,
    draft: true,
  },
  {
    slug: "highlands-and-communities",
    collection: "enrich",
    durationDays: 8,
    routeDestinationSlugs: ["arusha","lake-manyara","ngorongoro","serengeti"],
    accommodationStyle: "Lodge",
    price: PRICE_ON_REQUEST,
    image: PHOTOS["lake-manyara"],
    gallery: [PHOTOS["lake-manyara-giraffe"], CLIENT_PHOTOS["flamingo-taking-flight"]],
    itinerary: [

    ],
    faqSlugs: undefined,
    relatedSafariSlugs: ["tanzania-in-depth","serengeti-ngorongoro-journey"],
    featured: false,
    draft: true,
  },
];

export const SAFARI_SLUGS = SAFARI_STRUCTURE.map((s) => s.slug);
