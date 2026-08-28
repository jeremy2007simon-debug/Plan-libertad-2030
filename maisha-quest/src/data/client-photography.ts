import type { ResolvedImage } from "@/types/content";

/**
 * Fotografía entregada por el cliente.
 *
 * ⚠️ DERECHOS PENDIENTES DE CONFIRMACIÓN ESCRITA ⚠️
 *
 * Las 22 fotografías las entregó el cliente, pero NO hay confirmación escrita
 * de derechos de uso comercial. Por eso cada entrada lleva
 * `commercialUseConfirmed: false` y ni el autor ni la licencia se rellenan a
 * ojo: lo que no sabemos se declara `null`, no se inventa.
 *
 * Tampoco se afirma que las tomara Maisha Quest, ni dónde: las asignaciones a
 * destinos de este proyecto son TEMÁTICAS, y por eso
 * `locationConfirmed: false` en todas. `subjectConfirmed` es `false` cuando el
 * alt evita nombrar una especie que no está verificada.
 *
 * Nada de esto se muestra en la interfaz pública: es control interno para
 * saber qué se puede publicar y qué no.
 *
 * ORIGINALES: `public/images/maisha-quest/originals/` — intactos, con su
 * nombre original y su metadata. No se tocan nunca. Los derivados de
 * `optimized/` son WebP sin metadata, generados con nombre semántico para que
 * ningún componente dependa de un nombre como `image-X4-13.jpg`.
 *
 * DUPLICADO: `image-X4-9.jpg` es byte a byte idéntico a `image-X4-1.jpg`
 * (mismo SHA-256). Se conservan los dos originales y se genera un único
 * derivado, `flamingos-tanzania-lake`.
 *
 * RESERVADAS SIN DERIVADO — el original sigue en `originals/`, pero no se
 * publica ningún WebP para evitar archivos huérfanos en el despliegue:
 *
 * - `image-X4-18.jpg` (leona con crías): lleva la marca de agua de un tercero
 *   impresa en la propia imagen. No se puede publicar sin resolver antes esa
 *   autoría; recortarla sería peor.
 * - `image-XL.jpg` (flamencos en agua somera): 1024 px de ancho, insuficiente
 *   para cualquier hueco del diseño, y ampliarla está descartado.
 * - `image-X4-9.jpg`: duplicado exacto, ver arriba.
 */

export type ClientPhoto = ResolvedImage;

export const CLIENT_PHOTOS = {
  "tanzania-wildlife-sunset-hero": {
    src: "/images/maisha-quest/optimized/tanzania-wildlife-sunset-hero.webp",
    altKey: "tanzania-wildlife-sunset-hero",
    width: 2000,
    height: 1125,
    blurDataURL: "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAwCdASoUAAsAPxl2slCspySisAgBkCMJbACdMoABw3AmU63rMtAAAP3SBDBju/vE5znZMi7CeOC/XnCfl8sEDZV3ONKb2LTSCa/wAAA=",
    objectPosition: "32% 62%",
    provenance: {
      originalFilename: "x-X4.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: false,
    },
  },
  "antelope-herd-grasslands": {
    src: "/images/maisha-quest/optimized/antelope-herd-grasslands.webp",
    altKey: "antelope-herd-grasslands",
    width: 2000,
    height: 1090,
    blurDataURL: "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAACwAwCdASoUAAsAPxl2slEspySisAgBkCMJQBdgBERkK2LYhBA+gADNkKFNICpPnDybch8UM0ciU5GT4OL+YIyM4MGZhJHh4agAAA==",
    provenance: {
      originalFilename: "image-X4.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: false,
    },
  },
  "elephant-herd-protecting-calf": {
    src: "/images/maisha-quest/optimized/elephant-herd-protecting-calf.webp",
    altKey: "elephant-herd-protecting-calf",
    width: 2000,
    height: 1384,
    blurDataURL: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADwAwCdASoUAA4APxl0sVCspqSisAgBkCMJaQDLLBk6oblJAFn8fe9gAP7AU5uAkEcqHwonl2PQEQP6NKxOFksaQRlNLlVwilIVGNgSe2QiBSJubA8juF8MrGLuHAMFHzpFLebuSqn5atqAAAA=",
    objectPosition: "center 58%",
    provenance: {
      originalFilename: "image-X4-13.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "african-elephant-portrait": {
    src: "/images/maisha-quest/optimized/african-elephant-portrait.webp",
    altKey: "african-elephant-portrait",
    width: 1400,
    height: 1750,
    blurDataURL: "data:image/webp;base64,UklGRqQAAABXRUJQVlA4IJgAAACwBACdASoUABkAPxmCuFYsqCUjqAgBkCMJZwDI1A9FbNAXfwmWiSdtdhJqG1lQAP7e6JGHEe+FUEiqy7ezbTSmGJ0E/INYIOH0stZ4Q4vdzFspZ4mfk2V40+5YuilQVIIDgDerzhyZagv/T/1bbFkvoMvtjO/DKNgk279ZN4EI+0sZNRDC1AEyhPwEZJLlIrEBJukiKgAAAA==",
    provenance: {
      originalFilename: "image-X4-14.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "elephant-family-walking": {
    src: "/images/maisha-quest/optimized/elephant-family-walking.webp",
    altKey: "elephant-family-walking",
    width: 2000,
    height: 1601,
    blurDataURL: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACwAwCdASoUABAAPxl0slCspqSisAgBkCMJaQDLLBEGU/d+50Ve0AD+Ect12ldI8mfRGDk9Rzwjg9Jc6LrOqqLeKrNNwwst1Bvb2/C8b636QO0mUt9fW3AA",
    objectPosition: "center 55%",
    provenance: {
      originalFilename: "image-X4-15.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "savannah-acacia-sunset": {
    src: "/images/maisha-quest/optimized/savannah-acacia-sunset.webp",
    altKey: "savannah-acacia-sunset",
    width: 2000,
    height: 1334,
    blurDataURL: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAwCdASoUAA0APxl4slEspySisAgBkCMJYgCdACIAPI4MmpsUHAAA/r7yfOxHAoV9b9S+upEGABsiBcCwZVEgDSp8kVVpEKMMFPegrWdGbqFGolbQjMDsAAA=",
    objectPosition: "62% 72%",
    provenance: {
      originalFilename: "image-X4-16.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "lion-pair-calling": {
    src: "/images/maisha-quest/optimized/lion-pair-calling.webp",
    altKey: "lion-pair-calling",
    width: 1600,
    height: 1600,
    blurDataURL: "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAACQBACdASoUABQAPxmCt1YsqCUjqAgBkCMJZwDCCAshMF1zEZVteRn94HhQEAAA9vo6wCkMZCakZ8yqTsa5V7qmrh1rPMgfen9NiFPGiCInXN7nT93JEpJXD7WiAzdyHlK4Q7n2PhiOsDJ0WLC4+e/NUqZZgAAA",
    objectPosition: "center 45%",
    provenance: {
      originalFilename: "image-X4-17.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "giraffe-oxpecker-birds": {
    src: "/images/maisha-quest/optimized/giraffe-oxpecker-birds.webp",
    altKey: "giraffe-oxpecker-birds",
    width: 2000,
    height: 1000,
    blurDataURL: "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAAAQBACdASoUAAoAPxl0sVCspqSisAgBkCMJQBOmUDX/wDGd7KdN1tYlaADU26jZArwUvqrONFoMEyxRnFRKUJ2mjGoACYq9EO91mUDi6IhoN2jqyvKDPuLvQuwZqET58nytzntSk5qhdqFWCdKedtbuIql9UilR3GAAAA==",
    provenance: {
      originalFilename: "image-X4-19.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "flamingo-taking-flight": {
    src: "/images/maisha-quest/optimized/flamingo-taking-flight.webp",
    altKey: "flamingo-taking-flight",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAABwAwCdASoUAA0APxl2slCspySisAgBkCMJQBOgAw9d3nn01wAA/nLv3aOU736Sm8uPylV3QOMRu4H9Mnj0uqbAO8Bj9NfDGFBZFqXDoJTxt0IcENAAAA==",
    objectPosition: "center 45%",
    provenance: {
      originalFilename: "Canon-2098745.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "flamingos-tanzania-lake": {
    src: "/images/maisha-quest/optimized/flamingos-tanzania-lake.webp",
    altKey: "flamingos-tanzania-lake",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAwCdASoUAA0APxl2s1EspySisAgBkCMJYwCsACIB1YzkytwAAP4l5oohO30rumYVk3CybiMBViG0adHa+sEC0uL42QqLbiymZQAA",
    objectPosition: "center 65%",
    provenance: {
      originalFilename: "image-X4-1.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "male-lions-together": {
    src: "/images/maisha-quest/optimized/male-lions-together.webp",
    altKey: "male-lions-together",
    width: 2000,
    height: 1335,
    blurDataURL: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQBACdASoUAA0APxl0slCspqSisAgBkCMJZAC7ACFfJBxiiSJ29odNQAD+3MrWJgUlk11kFKDaN9ED4Etmlzco67VUqWn/qv6VUvXEb3ascPI3KeL/wAAA",
    objectPosition: "center 45%",
    provenance: {
      originalFilename: "image-X4-2.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "giraffes-open-savannah": {
    src: "/images/maisha-quest/optimized/giraffes-open-savannah.webp",
    altKey: "giraffes-open-savannah",
    width: 2000,
    height: 1500,
    blurDataURL: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAwBACdASoUAA8APxl2sVCspySisAgBkCMJZACdMoADQ8sM5ympHLLFHOAA/lfmVCbZDDZiiI4lNUr9FwYwvGlVIFXMa1NbkIJ2K/Pogn0CpQexhak7n/4sZ+f15ZAA",
    objectPosition: "center 42%",
    provenance: {
      originalFilename: "image-X4-3.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "leopard-in-tree": {
    src: "/images/maisha-quest/optimized/leopard-in-tree.webp",
    altKey: "leopard-in-tree",
    width: 1600,
    height: 1600,
    blurDataURL: "data:image/webp;base64,UklGRqAAAABXRUJQVlA4IJQAAACwBACdASoUABQAPxmEuVYsqCWjqAgBkCMJQBhQtgATe8R1XEnMDdxGCzpJIFzgAP6fLSWqExwbvMPZHPCS4F/a3lxjRW3omVns7GZn+2E348NSAsJo/aijFAKZxYlQfDIAEB6ZgGhBnoWGK5Mo3llh4eV/MPjB6vEWmFAja6BafthxOfFF2Vzp+eALIC58QFZ84AAA",
    provenance: {
      originalFilename: "image-X4-4.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "zebra-herd-monochrome": {
    src: "/images/maisha-quest/optimized/zebra-herd-monochrome.webp",
    altKey: "zebra-herd-monochrome",
    width: 2000,
    height: 1000,
    blurDataURL: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACwAwCdASoUAAoAPxl2sVCspySisAgBkCMJaQDKABTsbrq8o0BbgADhTZqTiKYYX3PKZCGdwFrXtyWeMC2E5B4R7SqqqLxjA5F6VYKL6VB7KaVqqEIAAA==",
    objectPosition: "center 55%",
    provenance: {
      originalFilename: "image-X4-5.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "lion-open-savannah": {
    src: "/images/maisha-quest/optimized/lion-open-savannah.webp",
    altKey: "lion-open-savannah",
    width: 2000,
    height: 1000,
    blurDataURL: "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAwCdASoUAAoAPxl2slCspySisAgBkCMJaACdMoMulEHthW9oSWAA/nGY49sVDhdLYJ0ZmX0I0i4Q4nqaHEfHrZh9jNDSObwAAA==",
    objectPosition: "28% center",
    provenance: {
      originalFilename: "image-X4-6.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "giraffe-patterns-monochrome": {
    src: "/images/maisha-quest/optimized/giraffe-patterns-monochrome.webp",
    altKey: "giraffe-patterns-monochrome",
    width: 2000,
    height: 1126,
    blurDataURL: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQAwCdASoUAAsAPxl2slEspySisAgBkCMJaQAAQyXFRPX8rHaGjVwA/bzwMVilr/yS8FOVy9qG90AcnKxecbvaCpLs2fays8ROIJT/Yxz9CmGPlbmtw+ZlJ7YveEsafoAAAA==",
    provenance: {
      originalFilename: "image-X4-7.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "safari-tent-accommodation": {
    src: "/images/maisha-quest/optimized/safari-tent-accommodation.webp",
    altKey: "safari-tent-accommodation",
    width: 2000,
    height: 1320,
    blurDataURL: "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAABQBACdASoUAA0APxl2slEspySisAgBkCMJZgCdMoRwABy29raqDg3640nAAP7sTU/sI5qMquIGS6M4SosEeQzWM+kuZnEfTmftj+nRkqUyf/EplkKEZ9+hdbuX/nupVGTp+OPo32BXQzjGROBzzSzoOwAAAA==",
    objectPosition: "center 55%",
    provenance: {
      originalFilename: "image-X4-8.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "flamingo-low-flight": {
    src: "/images/maisha-quest/optimized/flamingo-low-flight.webp",
    altKey: "flamingo-low-flight",
    width: 2000,
    height: 1125,
    blurDataURL: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoUAAsAPxl0sVCspqSisAgBkCMJZQC7ABrRnBLOhJ96APqYmITub1R4MMp/K+QHiAzHi3r5ZhOXbWbqMPEEhFhLVcS/bYFFhAJcAAAA",
    objectPosition: "center 55%",
    provenance: {
      originalFilename: "image-X4-11.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
  "flamingo-flock-in-motion": {
    src: "/images/maisha-quest/optimized/flamingo-flock-in-motion.webp",
    altKey: "flamingo-flock-in-motion",
    width: 2000,
    height: 1333,
    blurDataURL: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABQAwCdASoUAA0APxl0slCspqSisAgBkCMJQBYdgYVbIMviAAD+0GibVs75N1E3dX5m6YkwTs0tttihtXvRWuRmaXnEY/Tr/3qEoXioL4xLg4xOVJ7syqavxJE6n8XmQgrALqXxAhtxWDAAAAA=",
    objectPosition: "center 50%",
    provenance: {
      originalFilename: "image-X4-12.jpg",
      photographer: null,
      creditUrl: null,
      license: null,
      commercialUseConfirmed: false,
      locationConfirmed: false,
      subjectConfirmed: true,
    },
  },
} as const satisfies Record<string, ClientPhoto>;

export type ClientPhotoId = keyof typeof CLIENT_PHOTOS;

/** Devuelve una foto del cliente. Falla en compilación si el id no existe. */
export function clientPhoto(id: ClientPhotoId): ClientPhoto {
  return CLIENT_PHOTOS[id];
}

/** Inventario completo, para el informe interno de derechos. */
export function allClientPhotos(): (ClientPhoto & { id: string })[] {
  return Object.entries(CLIENT_PHOTOS).map(([id, photo]) => ({ ...photo, id }));
}
