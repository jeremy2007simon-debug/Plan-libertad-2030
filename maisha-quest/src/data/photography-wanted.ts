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
    key: "impact.programs",
    subject:
      "Maisha Quest Cares y Empowerment, los dos programas reales (ver " +
      "maishaquest.com/cares y /empowerment). SIN MENORES IDENTIFICABLES " +
      "mientras no haya autorización escrita de tutores y del centro, y " +
      "NUNCA la fotografía del tigre del pie de la página real de Cares: no " +
      "es de Maisha Quest y es incoherente con Tanzania.",
    placement: "Home (impacto), /impact",
    ratio: "3:2",
    fillIn: "image.src en las dos entradas de src/data/structure/impact.ts",
    meanwhile: "Los dos programas se presentan solo con texto.",
    priority: "media",
  },
  {
    key: "safaris.packages",
    subject:
      "Foto de portada y galería de cada uno de los 18 paquetes reales " +
      "(6 Explorer, 6 Escape, 6 Enrich), tal y como aparecen en " +
      "/explorer-tanzania-safaris, /escape-tanzania-safaris y " +
      "/enrich-tanzania-safaris y en la ficha de cada paquete.",
    placement: "Ficha de cada safari (imagen de cabecera y galería)",
    ratio: "3:2 (cabecera), variable (galería)",
    fillIn: "image y gallery en las 18 entradas de src/data/structure/safaris.ts",
    meanwhile:
      "Fotografías del pool existente reasignadas por coherencia temática " +
      "(destino y tipo de alojamiento), no las fotografías reales de Wix.",
    priority: "media",
  },
  {
    key: "experiences.categories",
    subject:
      "Foto de portada de cada una de las 5 categorías reales: " +
      "/thrill-seaker-adventures, /water-activities, /tours, " +
      "/shopping-and-leisure, /nightlife.",
    placement: "Explorador de experiencias (home), ficha de cada categoría",
    ratio: "4:5 (explorador) y 16:9 (cabecera de ficha)",
    fillIn: "image en las 5 entradas de src/data/structure/experiences.ts",
    meanwhile:
      "Fotografías de fauna/paisaje reasignadas por tono: ninguna representa " +
      "de verdad paracaidismo, un mercado o vida nocturna.",
    priority: "media",
  },
  {
    key: "learn.topicsAndRegions",
    subject:
      "Foto de portada de /learn y de sus 6 temas, y de las 5 páginas de " +
      "región (Northern, Central & Southern, Lake Zone & Western, Coastal, " +
      "Zanzibar Island).",
    placement: "/learn (tarjetas de tema y de región)",
    ratio: "4:3",
    fillIn: "image en LEARN_TOPIC_STRUCTURE y REGION_STRUCTURE, src/data/structure/learn.ts",
    meanwhile: "Fotografías del pool existente reasignadas por región/tema.",
    priority: "baja",
  },
  {
    key: "journal.posts",
    subject:
      "Imagen de cabecera de los 3 artículos reales del blog, tal y como " +
      "aparecen en maishaquest.com/blog.",
    placement: "Listado de journal y cabecera de cada artículo",
    ratio: "16:9",
    fillIn: "image en las 3 entradas de src/data/structure/journal.ts",
    meanwhile: "Fotografías del pool existente reasignadas provisionalmente.",
    priority: "baja",
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
  {
    key: "experience.culture",
    subject:
      "Escena humana real y autorizada de la categoría Tours & Safaris — una " +
      "visita guiada, una conversación con un guía o un anfitrión local, algo " +
      "que se lea como la experiencia, no como arquitectura. La fotografía " +
      "actual (`maasai-boma-warm`, un boma sin personas, con el tejado " +
      "corregido de morado a un tono cálido) pasa las comprobaciones técnicas " +
      "pero no representa bien la experiencia: es la única fotografía de " +
      "persona/comunidad en todo el catálogo, y por eso queda como recurso " +
      "pendiente, no reemplazado por otra imagen de fauna o paisaje.",
    placement: "Selector de experiencias (home y /experiences), ficha de " +
      "Tours & Safaris",
    ratio: "16:10 (panel panorámico) y 3:2 (tarjeta)",
    fillIn: "image de la Experience \"tours-and-safaris\" en " +
      "src/data/structure/experiences.ts",
    meanwhile:
      "Se mantiene `maasai-boma-warm`: no es fauna ni un desajuste de " +
      "categoría como el de Nightlife, así que se deja visible mientras no " +
      "haya una autorizada mejor — pero sin darla por definitiva.",
    priority: "media",
  },
  {
    key: "experience.nightlife",
    subject:
      "Escena real y autorizada de vida nocturna en Arusha, Zanzíbar o " +
      "cualquier plaza que el cliente confirme — un bar, una terraza, música " +
      "en vivo, algo reconocible como vida nocturna. No existe ninguna en el " +
      "catálogo actual: la que se usaba antes (un lago con una jirafa, de día) " +
      "pasaba la comprobación cromática del selector por casualidad de color, " +
      "no porque representara la categoría.",
    placement: "Selector de experiencias (home y /experiences), tarjeta de " +
      "Nightlife en /experiences, cabecera de /experiences/nightlife",
    ratio: "16:10 (panel panorámico), 3:2 (tarjeta) y 21:9 (cabecera)",
    fillIn: "image de la Experience \"nightlife\" en src/data/structure/experiences.ts",
    meanwhile:
      "`image` queda sin definir a propósito: cada uno de los tres sitios " +
      "pasa a un tratamiento tipográfico neutral —mismo fondo oscuro, el " +
      "nombre de la categoría como textura de fondo—, con el mismo contenido " +
      "y el mismo enlace que si hubiera fotografía.",
    priority: "media",
  },
];
