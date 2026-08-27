import type { ImpactProject, MediaVideo } from "@/types/content";

/**
 * Maisha Quest Cares — impacto social.
 *
 * ⚠️ AVISO INTERNO, NO MOSTRAR EN LA INTERFAZ ⚠️
 *
 * El vídeo de impacto facilitado por el cliente ("WhatsApp Video 2026-08-27 at
 * 16.07.30 (1).mp4", 41 s, 576×1024) contiene imágenes de un colegio y de
 * menores identificables. ANTES DEL LANZAMIENTO hay que confirmar por escrito
 * la autorización de imagen de los menores que aparecen —de sus tutores y del
 * centro— y conservar ese consentimiento. Sin él, el vídeo no se publica: el
 * componente está preparado para funcionar sin vídeo y no rompe la sección.
 *
 * Por la misma razón, los huecos de fotografía de esta sección se quedan
 * vacíos. No se ha puesto ni una sola foto de archivo de niños o de aulas:
 * presentarla como el trabajo comunitario de esta empresa sería falso, y el
 * problema de consentimiento sería exactamente el mismo.
 *
 * `outcomes` está vacío en todos los proyectos a propósito. No hay ni una
 * cifra de impacto inventada: en cuanto el cliente facilite datos reales
 * (colegios, alumnos, hectáreas, empleos), se rellenan aquí y la interfaz los
 * muestra sin tocar ningún componente.
 */

export const IMPACT_INTRO = {
  title: "Travel that gives back",
  lede: "Your journey should leave Tanzania better than you found it.",
  body: "Maisha Quest Cares is how we keep that from being a slogan. It runs on the same trips you take: local guides on local wages, suppliers from Arusha rather than abroad, community visits arranged and paid for directly, and a share of what a journey earns going back into education and conservation work near the places you travel through.",
} as const;

export const IMPACT_PROJECTS: ImpactProject[] = [
  {
    slug: "education",
    title: "Education support",
    area: "Education",
    description:
      "Working with schools near the communities we travel through — the practical things a classroom runs short of, and the costs that keep children out of one.",
    outcomes: [],
    location: null,
    image: {
      src: null,
      alt: "Maisha Quest education support work",
    },
  },
  {
    slug: "conservation",
    title: "Wildlife conservation",
    area: "Conservation",
    description:
      "Supporting the conservation teams working in the ecosystems our journeys depend on, and giving travellers a way to spend a day with them rather than only reading about it.",
    outcomes: [],
    location: null,
    image: {
      src: null,
      alt: "Conservation work supported by Maisha Quest",
    },
  },
  {
    slug: "community",
    title: "Community partnership",
    area: "Community",
    description:
      "Community visits arranged directly with the people hosting them, at times that suit them, with fees paid to the community rather than to an intermediary.",
    outcomes: [],
    location: null,
    image: {
      src: null,
      alt: "Community partnership work by Maisha Quest",
    },
  },
  {
    slug: "local-employment",
    title: "Local employment",
    area: "Local employment",
    description:
      "Guides, drivers, cooks and office staff hired and trained in Tanzania. On Kilimanjaro, porter pay and load limits follow KPAP guidelines.",
    outcomes: [],
    location: "Arusha, Tanzania",
    image: {
      src: null,
      alt: "The Maisha Quest team at work in Arusha",
    },
  },
];

/**
 * Vídeo de impacto del cliente. `mp4: null` hasta que exista la versión
 * comprimida y esté confirmada la autorización de imagen (ver aviso arriba).
 *
 * Original: 41 s · 576×1024 · ~6,9 MB · vertical.
 * Para publicarlo: comprimir a MP4 (H.264) y WebM (VP9), extraer un póster y
 * añadir la pista de subtítulos, y rellenar estas rutas.
 */
export const IMPACT_VIDEO: MediaVideo = {
  mp4: null,
  webm: null,
  captions: null,
  orientation: "portrait",
  durationSeconds: 41,
  poster: {
    src: null,
    alt: "Maisha Quest community work in Tanzania",
  },
};
