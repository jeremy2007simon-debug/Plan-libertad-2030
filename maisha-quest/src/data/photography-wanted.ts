/**
 * FOTOGRAFÍA QUE FALTA.
 *
 * Registro interno, NO se renderiza. Es la lista de lo que hay que pedirle al
 * cliente y de dónde entra cada foto en cuanto llegue.
 *
 * REGLA: mientras una fotografía no exista, su hueco NO SE PINTA. Nada de
 * marcos con la leyenda "photograph to follow", ni monogramas, ni rectángulos
 * de arena. Un hueco anunciado como hueco es peor que no tener el elemento: le
 * dice al visitante que la web está a medio hacer, que es justo lo que una
 * agencia de lujo no puede permitirse.
 *
 * REGLA 2: ninguno de estos huecos se rellena con fauna ni con personas de
 * archivo. Una foto de stock de un guía sonriendo presentada como "nuestro
 * equipo" es una afirmación falsa sobre el negocio, y un elefante en el sitio
 * de un retrato es un parche que se nota.
 *
 * Cada entrada dice: qué foto, dónde entra, en qué proporción, y qué pasa hoy
 * en ese sitio. Cuando llegue el archivo se añade al catálogo de fotografía
 * (`src/data/client-photography.ts`) y se enlaza desde el dato que
 * corresponda; el componente la recoge sin tocar nada más.
 */

export interface WantedPhoto {
  key: string;
  /** Qué hay que fotografiar. */
  subject: string;
  /** Dónde entra en la web. */
  placement: string;
  /** Proporción a la que se recorta. */
  ratio: string;
  /** Dato que hay que rellenar cuando llegue. */
  fillIn: string;
  /** Qué se ve hoy en ese sitio. */
  meanwhile: string;
  priority: "alta" | "media" | "baja";
}

export const WANTED_PHOTOGRAPHY: WantedPhoto[] = [
  {
    key: "founders.portraits",
    subject:
      "Retrato de Talisa Tufts, Frank Lyatuu y Tina Ngabo. Por separado, vertical, " +
      "luz natural, en Arusha o sobre el terreno. Mejor de trabajo que de estudio.",
    placement: "Home (sección de equipo), /about/team",
    ratio: "4:5",
    fillIn: "portrait.src en src/data/structure/team.ts",
    meanwhile:
      "Ficha tipográfica: número, nombre en serif grande, función, filete " +
      "dorado, idiomas y especialidad. No hay marco de foto.",
    priority: "alta",
  },
  {
    key: "founders.together",
    subject: "Los tres fundadores juntos, en la oficina de Arusha o junto a un vehículo.",
    placement: "/about, columna derecha",
    ratio: "4:5",
    fillIn: "Nuevo campo en client-photography y uso en /about",
    meanwhile: "La columna la ocupa la fotografía de paisaje que ya existe.",
    priority: "alta",
  },
  {
    key: "guides.crew",
    subject:
      "Guías y conductores en activo: al volante, con los prismáticos, montando " +
      "el campamento. Con nombre y consentimiento de cada persona.",
    placement: "/about/team, bloque 'Guides, drivers and crew'",
    ratio: "3:2",
    fillIn: "Nuevo bloque de tripulación en structure/team.ts",
    meanwhile: "Solo el texto del bloque. Ningún marco reservado.",
    priority: "media",
  },
  {
    key: "vehicles",
    subject:
      "Los 4x4 con el techo abierto: exterior completo, interior con los asientos " +
      "y el detalle de la ventanilla garantizada.",
    placement: "Ficha de safari (información práctica), /about",
    ratio: "3:2",
    fillIn: "Nueva entrada en client-photography",
    meanwhile: "La información práctica se lee como tabla, sin fotografía.",
    priority: "media",
  },
  {
    key: "office",
    subject: "La oficina de Arusha: fachada, mesa de trabajo, alguien al teléfono.",
    placement: "/contact, /about",
    ratio: "3:2",
    fillIn: "Nueva entrada en client-photography",
    meanwhile: "La página de contacto funciona con los datos y el mapa de coordenadas.",
    priority: "baja",
  },
  {
    key: "travellers",
    subject:
      "Viajeros reales durante un viaje, CON AUTORIZACIÓN DE IMAGEN FIRMADA. " +
      "Sin autorización no se publica ninguna.",
    placement: "Testimonios, cuando existan reseñas reales",
    ratio: "1:1 (retrato) y 3:2 (ambiente)",
    fillIn: "portrait en data/testimonials.ts",
    meanwhile:
      "La sección de testimonios no se pinta: no hay reseñas reales. La " +
      "invitación a hablar con el equipo vive en el planificador.",
    priority: "media",
  },
  {
    key: "accommodation",
    subject:
      "Los campamentos y lodges que se ofrecen de verdad, con permiso del " +
      "establecimiento para usar sus imágenes.",
    placement: "Itinerario de cada safari, por parada",
    ratio: "3:2",
    fillIn: "image en las entradas de alojamiento",
    meanwhile:
      "El día del itinerario se lee sin fotografía: título, ruta, actividades " +
      "y duración. No hay marco reservado.",
    priority: "media",
  },
  {
    key: "impact.projects",
    subject:
      "Los proyectos de Maisha Quest Cares. SIN MENORES IDENTIFICABLES mientras " +
      "no haya autorización escrita de tutores y del centro.",
    placement: "Home (impacto), /impact",
    ratio: "3:2",
    fillIn: "image en src/data/structure/impact.ts",
    meanwhile: "Los cuatro proyectos se presentan solo con texto.",
    priority: "media",
  },
  {
    key: "video.journey",
    subject:
      "Montaje vertical comprimido (720 px de ancho, H.264 + WebM, póster). " +
      "Ver public/video/README.md para los comandos.",
    placement: "Home, sección 'The film'",
    ratio: "9:16",
    fillIn: "JOURNEY_FILM en components/home/VideoStory.tsx",
    meanwhile:
      "La sección se recompone a dos columnas de texto sobre la fotografía de " +
      "fondo. No hay marco de vídeo.",
    priority: "alta",
  },
  {
    key: "video.impact",
    subject:
      "Vídeo de Maisha Quest Cares. BLOQUEADO: contiene menores identificables " +
      "y no consta autorización escrita.",
    placement: "Home (impacto), /impact",
    ratio: "9:16",
    fillIn: "IMPACT_VIDEO en src/data/impact.ts",
    meanwhile: "No se pinta ningún módulo de vídeo.",
    priority: "alta",
  },
  {
    key: "video.hero",
    subject:
      "Montaje HORIZONTAL para el hero de escritorio. El vertical recortado a " +
      "pantalla completa pierde casi todo el encuadre.",
    placement: "Hero de la home",
    ratio: "16:9",
    fillIn: "prop `video` de <Hero>",
    meanwhile: "Fotografía del atardecer con zoom lento. Funciona sin vídeo.",
    priority: "baja",
  },
];
