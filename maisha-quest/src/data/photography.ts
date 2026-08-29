/**
 * Registro de fotografía provisional de Tanzania.
 *
 * NINGUNA de estas imágenes es material propio de Maisha Quest: son fotos
 * documentales de Wikimedia Commons, elegidas una a una porque su ficha
 * acredita el país y el sujeto. Ese criterio es deliberado — así ninguna
 * especie ajena a Tanzania (el tigre de la web actual, por ejemplo) puede
 * colarse en la selección.
 *
 * Todas llevan `provisional: true`. Sustituir por fotografía propia antes
 * del lanzamiento y vaciar entonces `/legal/credits`.
 *
 * Los huecos que retratan específicamente a este negocio — equipo,
 * alojamientos, viajeros, proyectos de impacto — se quedan a propósito sin
 * foto de archivo: ahí una imagen de stock sería directamente engañosa.
 * Esos huecos usan `<ImageSlot>`.
 *
 * Generado con scripts/optimize (ver public/images/CREDITS.md). Editar el alt
 * a mano si cambia la imagen.
 */

import { CLIENT_PHOTOS } from "./client-photography";
import type { ResolvedImage } from "@/types/content";

/** Toda foto del registro es una imagen resuelta: existe el archivo y tiene metadatos. */
export type Photo = ResolvedImage;

export const PHOTOS = {
  arusha: {
    src: "/images/tanzania/arusha.webp",
    altKey: "arusha",
    width: 2000,
    height: 1277,
    blurDataURL: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAwBACdASoUAA0APxl2s1EspySisAgBkCMJQBOgA+pr3sTrBntm2ml5BQAA/ltLCthC8UdP9FTBqVGtFIe+xCnLhZA0OM/PiG1RrkBACQda6Aq5XccskfTBsblsN0ETLciH7p13wE7xQjxAAAA=",
    provisional: true,
    credit: {
      author: "Roman Boed from The Netherlands",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Arusha,_Tanzania_(Explored)_-_Flickr_-_romanboed.jpg",
    },
  },
  "balloon-serengeti": {
    src: "/images/tanzania/balloon-serengeti.webp",
    altKey: "balloon-serengeti",
    width: 1280,
    height: 720,
    blurDataURL: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAACwAwCdASoUAAsAPxl2slEspySisAgBkCMJZgCdABuM9NAG+eL9gAD+ryr7Mu2F2N2A+NkNcp5DgBc0YK6SP1aJ92cBJwG7xya4CSwl7kJwVZv98AA=",
    provisional: true,
    credit: {
      author: "Eric Kilby",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Serengeti_Balloon.jpg",
    },
  },
  "kilimanjaro-climbers": {
    src: "/images/tanzania/kilimanjaro-climbers.webp",
    altKey: "kilimanjaro-climbers",
    width: 1200,
    height: 1799,
    blurDataURL: "data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAADwBACdASoUAB4APxl+sVOsqCQiqA1RkCMJZADM0EXe2hN+9fcf9TXAV+uipDe6ovAA/vYLfHbT5b2hOYxKXFNrViNGZVAgbrZocK+IURq8IFGid/9cZQ5GBYgyF+vPzk94lalaKVCBO+pRXymZlKw2yHm6yotK8znOzf8kGqXIp7dDSVdbVKH93Q0YyzKO6sUgAAAA",
    provisional: true,
    credit: {
      author: "Altezzatravel",
      license: "CC BY-SA 4.0",
      adjusted: true,
      source: "https://commons.wikimedia.org/wiki/File:Climbers_Barranco_Wall_Kilimanjaro_Tanzania.jpg",
    },
  },
  "kilimanjaro-kibo": {
    src: "/images/tanzania/kilimanjaro-kibo.webp",
    altKey: "kilimanjaro-kibo",
    width: 2000,
    height: 946,
    blurDataURL: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAAkAPxl4tFGspyUisAgBkCMJbACdMoADT4oROmlklVYA94ngt5QS3zHYk4AAMwTQaHbbVuu3VqmJb2GRr06GeovOg4zv8O+NInSCMJ6wboAA",
    provisional: true,
    credit: {
      author: "Ray in Manila",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Kibo_Summit,_Mount_Kilimanjaro,_Tanzania_(30819102678).jpg",
    },
  },
  "kilimanjaro-shira": {
    src: "/images/tanzania/kilimanjaro-shira.webp",
    altKey: "kilimanjaro-shira",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADwAwCdASoUAA0APxl2slCspySisAgBkCMJZQC7ACHIzU4ZTaR8tcRgAP7nfOWjQ23dLrG4+sO+WjU54jePWOnjlsDnI3UQKhyVkQUMrz1N7u7VVvd1GBniGAi/h0dFw9soAA==",
    provisional: true,
    credit: {
      author: "Stig Nygaard",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Shira_plateau.jpg",
    },
  },
  "lake-manyara": {
    src: "/images/tanzania/lake-manyara.webp",
    altKey: "lake-manyara",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAACwAwCdASoUAA0APxl0sVCspqSisAgBkCMJQBbZBH/xoi+lLhs0QAD+vDs2uFKVgBbgk88HOg+pk0RJkz0Dt5XdWo5P0VbNMR/dGSgPkmclZkv1a33alVnU51DNDVhAAAA=",
    provisional: true,
    credit: {
      author: "Richard Mortel from Riyadh, Saudi Arabia",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Lake_Manyara_National_Park_(5)_(28503835281).jpg",
    },
  },
  "lake-manyara-giraffe": {
    src: "/images/tanzania/lake-manyara-giraffe.webp",
    altKey: "lake-manyara-giraffe",
    width: 1200,
    height: 1799,
    blurDataURL: "data:image/webp;base64,UklGRsIAAABXRUJQVlA4ILYAAABQBQCdASoUAB4APxl0sVEspqSisAgBkCMJZACpJw7xNwL/R1L9CINkr6Ntwcuk1YYcr4AA/lgMHeLO+jDcwnssNWkfDOCGIMfQjrSi1rLAWSV3SzvTB95qdKEcrpt62lZjaBGaQTJoa3VJy53ZuJbhriCo3BPzvM0RUH4O9TwC3BlHfbtlcKj7h6Dq5W+kP2fcy5cN8VSWHA4blBVfKQtIRBL2+MiXphFmMZyzt1Deq+RCOQAAAA==",
    provisional: true,
    credit: {
      author: "Giles Laurent",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:006_Giraffe_portrait_in_the_Lake_Manyara_National_Park_Photo_by_Giles_Laurent.jpg",
    },
  },
  "maasai-boma": {
    src: "/images/tanzania/maasai-boma.webp",
    altKey: "maasai-boma",
    width: 1280,
    height: 838,
    blurDataURL: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACwAwCdASoUAA0APxl0sVCspqSisAgBkCMJQBdmUABfDalAlBXEwAD+sjmAMM5efgEcu8/CPsJxaCn7FgkSaB+oFW9pPDWoysd89KHM141lMvJIHCp0lZjIlYg9Xb5EjxerAAAA",
    provisional: true,
    credit: {
      author: "Erasmus Kamugisha",
      license: "CC BY-SA 4.0",
      adjusted: true,
      source: "https://commons.wikimedia.org/wiki/File:A_typical_Maasai_boma.jpg",
    },
  },
  "ngorongoro-crater": {
    src: "/images/tanzania/ngorongoro-crater.webp",
    altKey: "ngorongoro-crater",
    width: 2000,
    height: 1334,
    blurDataURL: "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABwAwCdASoUAA0APxl0sVCspqSisAgBkCMJQAAHizBnp00zMOIA1n2sHkS9HkSIggIt0oCmfOM3dsYWzj7vqwvUeYuvToKJQiAAAA==",
    provisional: true,
    credit: {
      author: "Pavel.shyshkouski",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Ngorongoro_crater_landscape.jpg",
    },
  },
  "ngorongoro-zebras": {
    src: "/images/tanzania/ngorongoro-zebras.webp",
    altKey: "ngorongoro-zebras",
    width: 1280,
    height: 853,
    blurDataURL: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADQAwCdASoUAA0APxl0sVCspqSisAgBkCMJZgC7ACHZh07+cmmgFwAA/lLYSyAfTD9kMMuXkn1kDEoLv/dh6gaW2SuGGdF7Qg50z0qPfbRN4PwRgAAAAA==",
    provisional: true,
    credit: {
      author: "Rasheedhrasheed",
      license: "CC BY-SA 4.0",
      adjusted: true,
      source: "https://commons.wikimedia.org/wiki/File:Landscape_with_zebras_and_buffalos_in_ngorongoro_crater.jpg",
    },
  },
  nyerere: {
    src: "/images/tanzania/nyerere.webp",
    altKey: "nyerere",
    width: 1280,
    height: 1129,
    blurDataURL: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADQAwCdASoUABIAPxl+sVQsqCQjKA1RkCMJZQC90BXzPZSVeMTGg4AA/tqN9vg8/Z8bmwb8PsE88QPTwwZ5lEF/JVFa6NMWcJgCWgAA",
    provisional: true,
    credit: {
      author: "Erasmus Kamugisha",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Nyerere_National_Park_(144).jpg",
    },
  },
  ruaha: {
    src: "/images/tanzania/ruaha.webp",
    altKey: "ruaha",
    width: 2000,
    height: 1330,
    blurDataURL: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADwAwCdASoUAA0APxl0slCspqSisAgBkCMJaACdIA/DA3XQqllhjdHAAPelArRj/6lxSCAgi0z86SgznrTgMy2hYjmglbeuFr7SzfAy+c26H+vsF2AAAA==",
    provisional: true,
    credit: {
      author: "Richard Mortel from Riyadh, Saudi Arabia",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Ruaha_National_Park_landscape_(3)_(28746213190).jpg",
    },
  },
  "serengeti-cheetah": {
    src: "/images/tanzania/serengeti-cheetah.webp",
    altKey: "serengeti-cheetah",
    width: 1280,
    height: 853,
    blurDataURL: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAwCdASoUAA0APxl2slEspySisAgBkCMJQBdgAxpWMXjbsKDwIAAA/sP5sqwmf6SKOh3Ob8KxSPXpyAPeb+kuha+oofgCgy4/Jhc+BFHg81kAAAA=",
    provisional: true,
    credit: {
      author: "Giles Laurent",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:037_Cheetah_close-up_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg",
    },
  },
  "serengeti-plains": {
    src: "/images/tanzania/serengeti-plains.webp",
    altKey: "serengeti-plains",
    width: 2000,
    height: 1152,
    blurDataURL: "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACQAwCdASoUAAwAPxl2slCspySisAgBkCMJZgCxDMgCZ3XRzrMAAPpr9YvY7gyReq0EiL3GbaF2A1byk3AD4C7L0pQGLiYAGD4Dy5RAAAA=",
    provisional: true,
    credit: {
      author: "Bjørn Christian Tørrissen",
      license: "CC BY-SA 3.0",
      adjusted: true,
      source: "https://commons.wikimedia.org/wiki/File:Serengeti-Landscape-2012.JPG",
    },
  },
  "serengeti-sunrise": {
    src: "/images/tanzania/serengeti-sunrise.webp",
    altKey: "serengeti-sunrise",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQBACdASoUAA0APxl2slEspySisAgBkCMJagCdL11s/wG1+p0T/VMF4E6AAP1CcAuUSuCZj6EJRNDJ9YgaVQcSevwOyfOGXu3Zu5NsOTjNrosNc4h9u5aBAliPFHo9phu29LtQAAA=",
    provisional: true,
    credit: {
      author: "Giles Laurent",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:019_Sunrise_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg",
    },
  },
  "serengeti-sunset": {
    src: "/images/tanzania/serengeti-sunset.webp",
    altKey: "serengeti-sunset",
    width: 1280,
    height: 854,
    blurDataURL: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAA0APxl2slEspySisAgBkCMJaACdABLrLV5UprGAAKw71kLEIil27e2BEqwYj054Zd2ai6gEBsE+Q8+ArE70FAgW3jiO5hYU4QAA",
    provisional: true,
    credit: {
      author: "Giles Laurent",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:017_Sunset_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg",
    },
  },
  "serengeti-sunset-wide": {
    src: "/images/tanzania/serengeti-sunset-wide.webp",
    altKey: "serengeti-sunset-wide",
    width: 2000,
    height: 1125,
    blurDataURL: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAAsAPxl2s1EspySisAgBkCMJZQAAWRkSAs1y2RMAAN3tpWSilzbYVK0aD4Ae+x+3mZ5zwN5D2dx8HiN6KiwgiXK96LOPQR3YAAAA",
    provisional: true,
    credit: {
      author: "Eric Kilby",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Sunset_Beams_on_the_Serengeti.jpg",
    },
  },
  "tarangire-baobab": {
    src: "/images/tanzania/tarangire-baobab.webp",
    altKey: "tarangire-baobab",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADwAwCdASoUAA0APxl0slCspqSisAgBkCMJYgCsAB58ZO/6erngZ6CAAP5qcT7a9MNJQrvbjsl4cWmeOvYXtmPN4bvEXhbyNdnw4Gr4+LFaEPcBm+KlobRyBCnVH/hfl6+UTzPgRHRM2GtGfCgnwAAA",
    provisional: true,
    credit: {
      author: "Maximilian Staub",
      license: "CC BY 4.0",
      adjusted: true,
      source: "https://commons.wikimedia.org/wiki/File:Baobab_Tree_in_Tarangire_National_Park_with_blue_sky.jpg",
    },
  },
  "wildebeest-migration": {
    src: "/images/tanzania/wildebeest-migration.webp",
    altKey: "wildebeest-migration",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwAwCdASoUAA0APxl2slEspySisAgBkCMJQAAL1wk28ZgUwp7xmfEAAMsn5et9DroT7RKiBEhplLxgZ9wBxSUEd6aKclFoj9B8ZLrE7YeWKT+n6pU8U3FqGYGLJQhwEjTt2owxAAA=",
    provisional: true,
    credit: {
      author: "Richard Mortel from Riyadh, Saudi Arabia",
      license: "CC BY 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Wildebeest_on_the_Great_Migration_in_the_northern_Serengeti_(2)_(28597231226).jpg",
    },
  },
  "zanzibar-dhow-sunset": {
    src: "/images/tanzania/zanzibar-dhow-sunset.webp",
    altKey: "zanzibar-dhow-sunset",
    width: 2000,
    height: 1328,
    blurDataURL: "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAwBACdASoUAA0APxl0slCspqSisAgBkCMJbACdMoMh1Efs7kIFRT+3xAAA/oHy0v5xRAzgqL/r7Is5RB40BywzqYNLpUoFyPTyfmTBRQQq6v4X6UneAycUHTuThFV7+ET6OWnTFGjscz2YRangW/5APAAAAA==",
    provisional: true,
    credit: {
      author: "Rod Waddington from Kergunyah, Australia",
      license: "CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:Dhow_Sunset,_Zanzibar_(10164046475).jpg",
    },
  },
  "zanzibar-nungwi": {
    src: "/images/tanzania/zanzibar-nungwi.webp",
    altKey: "zanzibar-nungwi",
    width: 1280,
    height: 960,
    blurDataURL: "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAACwAwCdASoUAA8APxl0slEspqSisAgBkCMJZQC/OB3u7WSqfKZAwAD+hlI9iYF//L3CpQg3J0FVLOTCm57f70IwpNpyAuM+Cbexzz1+ncFEGQaGrCTt5OI8cmS5fGexllNGKnaFx35acLzSkBA4sCeB9mIvs+d5qL/06wvqSJX9FMlDXCaAQO54AAA=",
    provisional: true,
    credit: {
      author: "Mangapwani",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Paradise_at_Nungwi,_Kaskazini_A,_Unguja_North,_Zanzibar.jpg",
    },
  },
  "zanzibar-stone-town": {
    src: "/images/tanzania/zanzibar-stone-town.webp",
    altKey: "zanzibar-stone-town",
    width: 2000,
    height: 1457,
    blurDataURL: "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoUAA8APxl0sVCspqSisAgBkCMJYwC2yCKJmaV/yibeIYAAAP4FoEux3ERAE56xTcCEribN+u8maCB/W2z4WPG9NOCeRexz0vtMQCYul010x6PhTGt9d/SCAQaRn8tBUtAEMtDN0vJ4hN9kMcAAAA==",
    provisional: true,
    credit: {
      author: "Diego Delso",
      license: "CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Parque_Forodhani,_Stone_Town,_Zanz%C3%ADbar,_Tanzania,_2024-05-31,_DD_29-31_HDR.jpg",
    },
  },
} as const satisfies Record<string, Photo>;

export type PhotoId = keyof typeof PHOTOS;

/** Devuelve la foto lista para <Image>. Falla en compilación si el id no existe. */
export function photo(id: PhotoId): Photo {
  return PHOTOS[id];
}

/** Todas las fotos provisionales, para la página de créditos. */
/**
 * Toda la fotografía que se publica, con su clave.
 *
 * Devolvía solo `PHOTOS` —las provisionales de Commons— y por eso la página de
 * créditos no listaba ni una de las 19 que entregó el cliente, que son la mitad
 * de lo que se ve en la web. Una página de procedencia que se deja fuera la
 * mitad del material no cumple su función.
 */
export function allCredits(): (Photo & { id: string })[] {
  return [
    // El material del cliente primero: es la fotografía real del negocio.
    ...Object.entries(CLIENT_PHOTOS).map(([id, p]) => ({ ...p, id })),
    ...Object.entries(PHOTOS).map(([id, p]) => ({ ...p, id })),
  ];
}
