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

import type { DestinationStructure } from "@/types/content";
import { PHOTOS } from "../photography";
import { CLIENT_PHOTOS } from "../client-photography";

/** Los nueve destinos. Coordenadas y posición en el mapa son datos reales. */
export const DESTINATION_STRUCTURE: DestinationStructure[] = [
  {
    slug: "serengeti",
    region: "northern",
    coordinates: {"lat":-2.3333,"lng":34.8333,"label":"2°20'00\"S  34°50'00\"E"},
    experienceSlugs: ["game-drives","great-migration","balloon-safari","photographic-safari","mobile-camping"],
    image: PHOTOS["serengeti-plains"],
    gallery: [CLIENT_PHOTOS["male-lions-together"], CLIENT_PHOTOS["zebra-herd-monochrome"], PHOTOS["serengeti-sunrise"], PHOTOS["wildebeest-migration"]],
    mapPosition: {"x":494.5955776482442,"y":120.88893930571223},
    seasonCount: 3,
  },
  {
    slug: "tarangire",
    region: "northern",
    coordinates: {"lat":-4,"lng":36,"label":"4°00'00\"S  36°00'00\"E"},
    experienceSlugs: ["game-drives","walking-safari","family-safari"],
    image: CLIENT_PHOTOS["elephant-family-walking"],
    gallery: [PHOTOS["tarangire-baobab"], CLIENT_PHOTOS["giraffes-open-savannah"], CLIENT_PHOTOS["antelope-herd-grasslands"]],
    mapPosition: {"x":599.3249992639227,"y":271.4335501262955},
    seasonCount: 2,
  },
  {
    slug: "lake-manyara",
    region: "northern",
    coordinates: {"lat":-3.5833,"lng":35.8167,"label":"3°35'00\"S  35°49'00\"E"},
    experienceSlugs: ["game-drives","birdwatching"],
    image: CLIENT_PHOTOS["flamingos-tanzania-lake"],
    gallery: [CLIENT_PHOTOS["flamingo-flock-in-motion"], PHOTOS["lake-manyara-giraffe"]],
    mapPosition: {"x":582.8709811083094,"y":233.79513929714986},
    seasonCount: 0,
  },
  {
    slug: "ngorongoro",
    region: "northern",
    coordinates: {"lat":-3.1667,"lng":35.5833,"label":"3°10'00\"S  35°35'00\"E"},
    experienceSlugs: ["game-drives","cultural-encounters","conservation"],
    image: PHOTOS["ngorongoro-crater"],
    gallery: [PHOTOS["ngorongoro-zebras"]],
    mapPosition: {"x":561.9197108545175,"y":196.1657609640035},
    seasonCount: 2,
  },
  {
    slug: "kilimanjaro",
    region: "northern",
    coordinates: {"lat":-3.0674,"lng":37.3556,"label":"3°04'03\"S  37°21'20\"E"},
    experienceSlugs: ["kilimanjaro-trek","walking-safari"],
    image: PHOTOS["kilimanjaro-kibo"],
    gallery: [PHOTOS["kilimanjaro-shira"], PHOTOS["kilimanjaro-climbers"]],
    mapPosition: {"x":721.0111258964884,"y":187.1964924366837},
    seasonCount: 0,
  },
  {
    slug: "nyerere",
    region: "southern",
    coordinates: {"lat":-8,"lng":37.5,"label":"8°00'00\"S  37°30'00\"E"},
    experienceSlugs: ["boat-safari","walking-safari","game-drives"],
    image: PHOTOS["nyerere"],
    gallery: undefined,
    mapPosition: {"x":733.9732656764693,"y":632.7333900988958},
    seasonCount: 0,
  },
  {
    slug: "ruaha",
    region: "southern",
    coordinates: {"lat":-7.5,"lng":34.75,"label":"7°30'00\"S  34°45'00\"E"},
    experienceSlugs: ["game-drives","walking-safari","photographic-safari"],
    image: PHOTOS["ruaha"],
    gallery: undefined,
    mapPosition: {"x":487.1181105868007,"y":587.5709101023208},
    seasonCount: 0,
  },
  {
    slug: "zanzibar",
    region: "coast",
    coordinates: {"lat":-6.1659,"lng":39.2026,"label":"6°09'57\"S  39°12'09\"E"},
    experienceSlugs: ["beach-and-ocean","cultural-encounters","coffee-and-cuisine"],
    image: PHOTOS["zanzibar-nungwi"],
    gallery: [PHOTOS["zanzibar-dhow-sunset"], PHOTOS["zanzibar-stone-town"]],
    mapPosition: {"x":886.8080246058033,"y":467.06838097545926},
    seasonCount: 0,
  },
  {
    slug: "arusha",
    region: "gateway",
    coordinates: {"lat":-3.3869,"lng":36.683,"label":"3°23'13\"S  36°40'59\"E"},
    experienceSlugs: ["cultural-encounters","coffee-and-cuisine"],
    image: PHOTOS["arusha"],
    gallery: undefined,
    mapPosition: {"x":660.6348432371022,"y":216.05531715449516},
    seasonCount: 0,
  },
];

export const DESTINATION_SLUGS = DESTINATION_STRUCTURE.map((d) => d.slug);
