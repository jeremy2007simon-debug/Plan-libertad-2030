/**
 * CONTENIDO EN ESPAÑOL.
 *
 * Traducción completa desde `en.ts`, la fuente. Solo texto visible: la
 * estructura —slugs, duraciones, coordenadas, rutas, fotografías— no se
 * duplica, vive en `src/data/structure/`.
 *
 * Si en el inglés se añade un safari, un día de itinerario o una FAQ y aquí
 * no se traduce, `tsc` falla: no existe fallback silencioso al inglés.
 *
 * NO se traduce: "Maisha Quest", los nombres del equipo, los nombres de las
 * colecciones (Explorer/Escape/Enrich), correos, teléfonos y las siglas de
 * organizaciones.
 *
 * ⚠️ INTERNO: traducción completa a nivel técnico, PENDIENTE de revisión
 * final por un hablante nativo antes de publicar en producción. No se
 * presenta como traducción jurada ni certificada.
 */

import type { ContentDictionary } from "./en";

/**
 * Líneas de incluido/no incluido compartidas por casi los 18 paquetes reales.
 *
 * No es un atajo: maishaquest.com repite este mismo bloque, casi palabra por
 * palabra, en las 18 páginas de paquete. Dos cosas que NO confirma, en
 * ningún paquete, y que por eso no se añaden aquí: si el vuelo interno a
 * Zanzíbar está incluido en los seis paquetes Escape, y si un safari en
 * globo opcional está incluido o tiene coste aparte. Ambas se señalan en
 * `practicalInfo` en los paquetes donde importan, como preguntas abiertas
 * para el cliente y no como una suposición en un sentido u otro.
 */
const STANDARD_INCLUDED = [
  "Traslados de aeropuerto a la llegada y a la salida",
  "Vehículo 4x4 Land Cruiser con techo abatible",
  "Guía de habla inglesa, con asistencia 24 horas",
  "Todas las tasas de parques y tasas gubernamentales",
  "Alojamiento según lo reservado",
  "Tres comidas al día durante el safari",
  "Agua embotellada y refrescos",
];
const STANDARD_NOT_INCLUDED = [
  "Vuelos internacionales y visado de Tanzania",
  "Seguro de viaje y de asistencia médica",
  "Propinas para el guía",
  "Comidas de hotel antes o después del safari",
];

export const esContent: ContentDictionary = {
  safaris: {
    /* ======================== EXPLORER — campamento ======================= */
    "manyara-ngorongoro-safari": {
      name: "Safari al Lago Manyara y el Cráter del Ngorongoro",
      summary: "Una introducción compacta de dos días al circuito clásico de fauna de Tanzania: leones trepadores en el Lago Manyara y después un día completo en el suelo del Cráter del Ngorongoro.",
      overview: "Pensado para viajeros con poco tiempo que aun así quieren un safari de verdad y no una muestra. Alojamiento en campamento durante todo el recorrido, exactamente como se indica en los paquetes Explorer de maishaquest.com.",
      travellerProfile: "Viajeros con poco tiempo que buscan una experiencia clásica de fauna",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Campamento — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Parque Nacional del Lago Manyara", route: "Arusha → Parque Nacional del Lago Manyara", activities: ["Salida temprana desde Arusha", "Safari en el Lago Manyara: leones trepadores, elefantes y flamencos", "Almuerzo de picnic dentro del parque", "Traslado por la tarde a un campamento cerca de Karatu"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: "Karatu → Cráter del Ngorongoro → Arusha", activities: ["Descenso temprano al suelo del cráter", "Observación de fauna durante todo el día, con buenas probabilidades de ver rinocerontes y grandes felinos", "Almuerzo de picnic junto al estanque de los hipopótamos", "Regreso por la tarde a Arusha"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-ngorongoro-safari": {
      name: "Safari a Tarangire, el Lago Manyara y el Cráter del Ngorongoro",
      summary: "Tres de los parques más conocidos de Tanzania en tres días: elefantes y baobabs en Tarangire, la falla del Valle del Rift en el Lago Manyara y medio día dentro del Cráter del Ngorongoro.",
      overview: "Un safari introductorio para quienes visitan por primera vez y quieren probar tres parques emblemáticos sin un itinerario largo. Alojamiento en campamento durante todo el recorrido, exactamente como se indica en los paquetes Explorer de maishaquest.com.",
      travellerProfile: "Viajeros en su primer safari que quieren probar tres parques emblemáticos",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Campamento — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Parque Nacional de Tarangire", route: "Arusha → Parque Nacional de Tarangire", activities: ["Safari: manadas de elefantes y antiguos baobabs", "Almuerzo de picnic en el parque", "Noche en campamento"], estimatedDuration: null },
        { title: "Parque Nacional del Lago Manyara", route: "Tarangire → Parque Nacional del Lago Manyara", activities: ["Safari matinal a lo largo de la falla del Valle del Rift: jirafas, elefantes y aves", "Traslado por la tarde a un campamento cerca de Karatu"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: "Karatu → Cráter del Ngorongoro → Arusha", activities: ["Descenso temprano para un safari de medio día en el suelo del cráter", "Almuerzo de picnic dentro del cráter", "Regreso a Arusha"], estimatedDuration: null },
      ],
    },
    "serengeti-ngorongoro-manyara-safari": {
      name: "Safari al Serengeti, el Ngorongoro y el Lago Manyara",
      summary: "Cuatro días entre el Lago Manyara, el Cráter del Ngorongoro y el Serengeti, siguiendo la Gran Migración y a los depredadores que la acompañan.",
      overview: "Un circuito de campamento de cuatro días por tres destinos principales, exactamente como se indica en los paquetes Explorer de maishaquest.com.",
      travellerProfile: "Viajeros que buscan una muestra más completa del circuito norte en cuatro días",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Campamento — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Parque Nacional del Lago Manyara", route: "Arusha → Parque Nacional del Lago Manyara", activities: ["Safari matinal en el Lago Manyara: leones trepadores, elefantes y flamencos", "Traslado por la tarde a un campamento en las tierras altas del Ngorongoro"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: "Tierras altas del Ngorongoro → Cráter del Ngorongoro → Serengeti", activities: ["Safari matinal temprano en el cráter", "Traslado por la tarde al Serengeti, pasando por la Garganta de Olduvai (opcional)", "Safari al atardecer"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Día completo de safaris siguiendo a los depredadores y las manadas migratorias", "Almuerzo de picnic", "Noche en campamento"], estimatedDuration: "Día completo" },
        { title: "Regreso a Arusha", route: "Serengeti → Ngorongoro → Karatu → Arusha", activities: ["Safari matinal a la salida del Serengeti", "Regreso a Arusha pasando por el Ngorongoro y Karatu"], estimatedDuration: null },
      ],
    },
    "northern-circuit-camping-safari": {
      name: "Safari de campamento de 5 días por el circuito norte",
      summary: "Un safari de campamento equilibrado y sin prisas por Tarangire, el Lago Manyara, el Serengeti y el Cráter del Ngorongoro.",
      overview: "Para viajeros que buscan un itinerario equilibrado sin correr entre parques. Alojamiento en campamento durante todo el recorrido, exactamente como se indica en los paquetes Explorer de maishaquest.com.",
      travellerProfile: "Viajeros que buscan un itinerario equilibrado sin prisas",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Campamento — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Parque Nacional de Tarangire", route: "Arusha → Parque Nacional de Tarangire", activities: ["Safari a la llegada", "Noche en campamento"], estimatedDuration: null },
        { title: "De Tarangire al Serengeti", route: "Tarangire → Parque Nacional del Serengeti", activities: ["Observación de fauna durante el trayecto", "Noche en un campamento del Serengeti central"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safaris por la mañana y por la tarde", "Noche en campamento"], estimatedDuration: null },
        { title: "Del Serengeti al Ngorongoro", route: "Serengeti → borde del Cráter del Ngorongoro", activities: ["Safari matinal", "Traslado por la tarde a un campamento en el borde del cráter"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: "Cráter del Ngorongoro → Arusha", activities: ["Descenso temprano para un safari de medio día en el suelo del cráter", "Regreso a Arusha"], estimatedDuration: null },
      ],
    },
    "six-day-camping-safari": {
      name: "Safari de campamento de 6 días por Tanzania",
      // ⚠️ En la propia página Explorer de maishaquest.com, el botón "EXPLORE
      // SAFARI" de este paquete enlaza a la misma página que el paquete de 5
      // días de arriba: no existe un itinerario confirmado y distinto para
      // un sexto día. Los días 1-5 repiten el itinerario confirmado de 5
      // días; el día 6 se deja abierto en lugar de inventarse. Véase la nota
      // al comienzo de `safaris.ts`.
      summary: "Un sexto día añadido al safari de campamento del circuito norte. La página de origen de este itinerario exacto no está enlazada correctamente en maishaquest.com — véase la nota sobre el día 6.",
      overview: "El contenido confirmado para los días 1 a 5 coincide con el Safari de campamento de 5 días por el circuito norte. El día 6 debe confirmarse directamente con Maisha Quest antes de publicarlo.",
      travellerProfile: "Viajeros que buscan un itinerario equilibrado sin prisas",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Campamento — disponible en categoría de lujo, media o económica" },
        { label: "Pendiente", value: "El itinerario del día 6 no está confirmado — la página de origen enlaza en su lugar al paquete de 5 días" },
      ],
      days: [
        { title: "Parque Nacional de Tarangire", route: "Arusha → Parque Nacional de Tarangire", activities: ["Safari a la llegada", "Noche en campamento"], estimatedDuration: null },
        { title: "De Tarangire al Serengeti", route: "Tarangire → Parque Nacional del Serengeti", activities: ["Observación de fauna durante el trayecto", "Noche en un campamento del Serengeti central"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safaris por la mañana y por la tarde", "Noche en campamento"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Más safaris en otra zona del parque", "Noche en campamento"], estimatedDuration: null },
        { title: "Del Serengeti al Ngorongoro", route: "Serengeti → borde del Cráter del Ngorongoro", activities: ["Safari matinal", "Traslado por la tarde a un campamento en el borde del cráter"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro — día pendiente de confirmación", route: "Cráter del Ngorongoro → Arusha", activities: ["Aún no confirmado con Maisha Quest — véase la información práctica"], estimatedDuration: null },
      ],
    },
    "extended-camping-safari": {
      name: "Safari de campamento ampliado de 7 días por Tanzania",
      summary: "Un itinerario de campamento inmersivo por Tarangire, el Lago Manyara, el Serengeti y el Cráter del Ngorongoro, con margen suficiente para seguir de verdad la Gran Migración.",
      overview: "El más largo de los itinerarios de campamento Explorer, exactamente como se indica en maishaquest.com. Termina con una actividad cultural opcional en el regreso a Arusha.",
      travellerProfile: "Viajeros que quieren el circuito norte completo sin prisas",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Campamento — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Parque Nacional de Tarangire", route: "Arusha → Parque Nacional de Tarangire", activities: ["Safari por la tarde a la llegada"], estimatedDuration: null },
        { title: "Parque Nacional del Lago Manyara", route: null, activities: ["Exploración matinal del Lago Manyara", "Noche cerca de Karatu"], estimatedDuration: null },
        { title: "Hacia el Serengeti", route: "Karatu → Ngorongoro (parada opcional en la Garganta de Olduvai) → Serengeti", activities: ["Safari por la tarde a la llegada al Serengeti"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Día completo siguiendo la migración y a los depredadores"], estimatedDuration: "Día completo" },
        { title: "Del Serengeti al borde del cráter", route: "Serengeti → borde del Cráter del Ngorongoro", activities: ["Safari matinal", "Llegada por la tarde al borde del cráter"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: "Cráter del Ngorongoro → Karatu", activities: ["Safari completo por el cráter", "Noche cerca de Karatu"], estimatedDuration: null },
        { title: "Regreso a Arusha", route: "Karatu → Arusha", activities: ["Regreso panorámico por carretera", "Actividad cultural opcional en el camino"], estimatedDuration: null },
      ],
    },

    /* ==================== ESCAPE — lodge + Zanzíbar ===================== */
    "safari-zanzibar-escape": {
      name: "Escapada Safari y Zanzíbar",
      summary: "Safaris en Tarangire y el Cráter del Ngorongoro y después un vuelo a Zanzíbar para conocer Stone Town y la playa.",
      overview: "Una escapada de siete días que combina el circuito de safari del norte con una estancia costera en Zanzíbar, exactamente como se indica en los paquetes Escape de maishaquest.com.",
      travellerProfile: "Viajeros que quieren combinar fauna y playa en un solo viaje",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge durante el safari, hotel de playa en Zanzíbar — disponible en categoría de lujo, media o económica" },
        { label: "Pendiente", value: "No está confirmado en la página de origen si el vuelo interno a Zanzíbar está incluido en el precio" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su hotel"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safari de día completo: manadas de elefantes y baobabs"], estimatedDuration: "Día completo" },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Exploración del cráter durante todo el día"], estimatedDuration: "Día completo" },
        { title: "Hacia Zanzíbar", route: "Arusha → Zanzíbar", activities: ["Regreso a Arusha", "Vuelo a Zanzíbar", "Registro de entrada en Stone Town"], estimatedDuration: null },
        { title: "Stone Town y las plantaciones de especias", route: null, activities: ["Recorrido a pie por Stone Town", "Visita a una plantación de especias"], estimatedDuration: null },
        { title: "Día de playa", route: null, activities: ["Día de descanso en la playa", "Buceo, submarinismo o kitesurf opcionales"], estimatedDuration: null },
        { title: "Salida", route: "Zanzíbar → aeropuerto", activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
    "serengeti-zanzibar": {
      name: "Serengeti y Zanzíbar",
      summary: "Safaris del Big Five en el Serengeti y el Ngorongoro, seguidos de Stone Town y las playas de arena blanca de Zanzíbar.",
      overview: "Una escapada de ocho días que combina la exploración de fauna con el ocio en la isla, exactamente como se indica en los paquetes Escape de maishaquest.com.",
      travellerProfile: "Viajeros que quieren combinar fauna y playa en un solo viaje",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Campamento de lujo durante el safari, Stone Town o resort en Zanzíbar" },
        { label: "Pendiente", value: "No está confirmado en la página de origen si el vuelo interno a Zanzíbar está incluido en el precio" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su hotel"], estimatedDuration: null },
        { title: "Hacia el Serengeti", route: "Arusha → Serengeti", activities: ["Safari por la tarde a la llegada"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Día completo de safaris", "Almuerzo de picnic en la sabana"], estimatedDuration: "Día completo" },
        { title: "Del Serengeti al Ngorongoro", route: "Serengeti → Área de Conservación del Ngorongoro", activities: ["Safari matinal", "Traslado a un lodge en el borde del cráter"], estimatedDuration: null },
        { title: "Del Cráter del Ngorongoro a Zanzíbar", route: "Ngorongoro → Zanzíbar", activities: ["Safari por el cráter", "Vuelo a Zanzíbar por la tarde", "Registro de entrada en Stone Town"], estimatedDuration: null },
        { title: "Stone Town y Prison Island", route: null, activities: ["Recorrido a pie por Stone Town", "Excursión en barco a Prison Island con buceo de superficie"], estimatedDuration: null },
        { title: "Día de playa", route: null, activities: ["Día de descanso en la playa", "Deportes acuáticos opcionales"], estimatedDuration: null },
        { title: "Salida", route: "Zanzíbar → aeropuerto", activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
    "big-three-zanzibar": {
      name: "Big 3 + Zanzíbar",
      summary: "Tarangire, el Serengeti y el Cráter del Ngorongoro, seguidos de Stone Town y la playa en Zanzíbar.",
      overview: "Una escapada de nueve días que combina tres de los parques más conocidos de Tanzania con tiempo en Zanzíbar, exactamente como se indica en los paquetes Escape de maishaquest.com.",
      travellerProfile: "Viajeros que quieren combinar fauna y playa en un solo viaje",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge durante el safari, Stone Town o resort de playa en Zanzíbar" },
        { label: "Pendiente", value: "No está confirmado en la página de origen si el vuelo interno a Zanzíbar está incluido en el precio" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Recogida en el aeropuerto", "Briefing por la tarde"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safari de día completo", "Almuerzo de picnic"], estimatedDuration: "Día completo" },
        { title: "Hacia el Serengeti", route: "Arusha → tierras altas del Ngorongoro → Serengeti", activities: ["Trayecto hacia el Serengeti central"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safaris por la mañana y por la tarde"], estimatedDuration: null },
        { title: "Del Serengeti al Ngorongoro", route: "Serengeti → borde del Cráter del Ngorongoro", activities: ["Safari temprano", "Traslado al borde del cráter"], estimatedDuration: null },
        { title: "Del Cráter del Ngorongoro a Zanzíbar", route: "Ngorongoro → Zanzíbar", activities: ["Safari completo por el cráter", "Vuelo por la noche a Stone Town"], estimatedDuration: null },
        { title: "Stone Town y las plantaciones de especias", route: null, activities: ["Recorrido a pie por Stone Town", "Visita a una plantación de especias"], estimatedDuration: null },
        { title: "Día de playa", route: null, activities: ["Natación, buceo de superficie o submarinismo, a su elección"], estimatedDuration: null },
        { title: "Salida", route: "Zanzíbar → aeropuerto", activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
    "safari-culture-zanzibar": {
      name: "Safari, Cultura y Zanzíbar",
      summary: "Safaris por Tarangire, el Serengeti y el Ngorongoro, un día con las comunidades hadzabe y datoga en el Lago Eyasi y después Zanzíbar.",
      overview: "Un recorrido de diez días que combina safari, encuentros culturales y un final en la playa, exactamente como se indica en los paquetes Escape de maishaquest.com.",
      travellerProfile: "Viajeros que quieren fauna, cultura y playa en un solo viaje",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge durante el safari, Stone Town o resort de playa en Zanzíbar" },
        { label: "Pendiente", value: "El Lago Eyasi todavía no tiene página propia de destino en este sitio — véase la auditoría de Learn/regiones" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Recogida en el aeropuerto"], estimatedDuration: null },
        { title: "Recorrido por la ciudad de Arusha", route: null, activities: ["Mercados, el Museo de la Tanzanita y el Centro del Patrimonio Cultural"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safari de día completo", "Almuerzo de picnic"], estimatedDuration: "Día completo" },
        { title: "Hacia el Serengeti", route: "Arusha → tierras altas del Ngorongoro → Serengeti", activities: ["Safari por la tarde a la llegada"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safaris por la mañana y por la tarde"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Descenso al cráter para observar la fauna"], estimatedDuration: null },
        { title: "Del Lago Eyasi a Zanzíbar", route: "Ngorongoro → Lago Eyasi → Zanzíbar", activities: ["Visitas culturales con cazadores-recolectores hadzabe y herreros datoga", "Vuelo a Zanzíbar por la tarde"], estimatedDuration: null },
        { title: "Stone Town y las plantaciones de especias", route: null, activities: ["Recorrido guiado por Stone Town", "Visita a una plantación de especias"], estimatedDuration: null },
        { title: "Día de playa", route: null, activities: ["Buceo de superficie, kitesurf o paseo en dhow, opcionales"], estimatedDuration: null },
        { title: "Salida", route: "Zanzíbar → aeropuerto", activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
    "luxury-safari-zanzibar": {
      name: "Safari de Lujo y Zanzíbar",
      summary: "Un safari completo por el circuito norte —Tarangire, el Lago Manyara, el Serengeti y el Ngorongoro, con un vuelo opcional en globo— seguido de cuatro noches en Zanzíbar.",
      overview: "Una escapada de doce días pensada para parejas, familias y grupos pequeños que quieren tanto safari como tiempo en la isla, exactamente como se indica en los paquetes Escape de maishaquest.com.",
      travellerProfile: "Parejas, familias y grupos pequeños que buscan emoción de safari y calma isleña",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Safari en globo (opcional, el día 5)"],
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge durante el safari, Stone Town o resort de playa en Zanzíbar" },
        { label: "Pendiente", value: "No está confirmado en la página de origen si el vuelo interno a Zanzíbar está incluido en el precio" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su hotel"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safari de día completo: baobabs, elefantes y el Big Five"], estimatedDuration: "Día completo" },
        { title: "Parque Nacional del Lago Manyara", route: null, activities: ["Leones trepadores y flamencos"], estimatedDuration: null },
        { title: "Hacia el Serengeti", route: "Arusha → tierras altas del Ngorongoro → Serengeti", activities: ["Trayecto hacia el Serengeti central"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari opcional en globo al amanecer con desayuno en la sabana", "Safaris en vehículo"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari de día completo, siguiendo la migración cuando la temporada lo permite"], estimatedDuration: "Día completo" },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Descenso al cráter para observar la fauna"], estimatedDuration: null },
        { title: "Hacia Zanzíbar", route: "Arusha → Zanzíbar", activities: ["Regreso a Arusha", "Vuelo a Zanzíbar", "Paseo en dhow al atardecer"], estimatedDuration: null },
        { title: "Plantaciones de especias y Prison Island", route: null, activities: ["Recorrido por una plantación de especias", "Excursión de buceo de superficie a Prison Island"], estimatedDuration: null },
        { title: "Día de playa", route: null, activities: ["Día de descanso", "Deportes acuáticos opcionales"], estimatedDuration: null },
        { title: "Día libre", route: null, activities: ["Día libre", "Cena de atardecer en la playa"], estimatedDuration: null },
        { title: "Salida", route: "Zanzíbar → aeropuerto", activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
    "grand-safari-zanzibar": {
      name: "Gran Safari y Zanzíbar",
      summary: "El circuito norte completo, un día con las comunidades hadzabe y datoga en el Lago Eyasi y después una semana en Zanzíbar que incluye el Bosque de Jozani y Kizimkazi.",
      overview: "El itinerario Escape más largo de maishaquest.com: catorce días que combinan un safari en profundidad con una estancia prolongada en Zanzíbar.",
      travellerProfile: "Viajeros que buscan un recorrido completo y sin prisas por Tanzania",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge durante el safari, Stone Town o resort de playa en Zanzíbar" },
        { label: "Pendiente", value: "El Lago Eyasi todavía no tiene página propia de destino en este sitio — véase la auditoría de Learn/regiones" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su hotel"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safari de día completo: manadas de elefantes y baobabs"], estimatedDuration: "Día completo" },
        { title: "Parque Nacional del Lago Manyara", route: null, activities: ["Leones trepadores y flamencos"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Seguimiento de la migración, cuando la temporada lo permite"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Observación de cruces de río, cuando la temporada lo permite"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Más safaris por el parque"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Descenso al cráter para un safari de día completo"], estimatedDuration: "Día completo" },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Más observación de fauna en el cráter"], estimatedDuration: null },
        { title: "Del Lago Eyasi a Zanzíbar", route: "Ngorongoro → Lago Eyasi → Zanzíbar", activities: ["Visitas a las comunidades hadzabe y datoga", "Vuelo a Zanzíbar por la tarde"], estimatedDuration: null },
        { title: "Stone Town y las plantaciones de especias", route: null, activities: ["Recorrido a pie por Stone Town", "Visita a una plantación de especias", "Paseo en dhow al atardecer"], estimatedDuration: null },
        { title: "Día de playa", route: null, activities: ["Día de descanso", "Submarinismo, buceo de superficie o kitesurf opcionales"], estimatedDuration: null },
        { title: "Bosque de Jozani y Kizimkazi", route: null, activities: ["Colobos rojos en el Bosque de Jozani", "Encuentro con delfines en Kizimkazi"], estimatedDuration: null },
        { title: "Día libre", route: null, activities: ["Día de descanso", "Cena de despedida frente al mar"], estimatedDuration: null },
        { title: "Salida", route: "Zanzíbar → aeropuerto", activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },

    /* =============== ENRICH — lodge, fauna + cultura ================= */
    "tarangire-serengeti-ngorongoro-enrich": {
      name: "Tarangire, Serengeti y Ngorongoro",
      summary: "Antiguos baobabs y manadas de elefantes en Tarangire, las llanuras abiertas del Serengeti y el Cráter del Ngorongoro, a menudo llamado la Octava Maravilla del Mundo.",
      overview: "Un safari de cinco días alojado en lodges por tres de los parques más importantes de Tanzania, exactamente como se indica en los paquetes Enrich de maishaquest.com.",
      travellerProfile: "Viajeros que buscan una introducción al circuito norte alojándose en lodges",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Lodge — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su lodge"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safaris", "Almuerzo de picnic en el parque"], estimatedDuration: null },
        { title: "Hacia el Serengeti", route: "Arusha → tierras altas → Serengeti", activities: ["Safari por la tarde a la llegada"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari al amanecer", "Visita opcional a una aldea masái", "Traslado hacia el Ngorongoro"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: "Cráter del Ngorongoro → Arusha", activities: ["Descenso al cráter", "Safari de medio día", "Regreso a Arusha"], estimatedDuration: null },
      ],
    },
    "manyara-serengeti-ngorongoro-enrich": {
      name: "Lago Manyara, Serengeti y Ngorongoro",
      summary: "Paisajes diversos y fauna abundante, incluido el Big Five: leones trepadores, la Gran Migración y la densa fauna del Cráter del Ngorongoro.",
      overview: "Un safari de siete días alojado en lodges por el Lago Manyara, el Serengeti y el Ngorongoro, exactamente como se indica en los paquetes Enrich de maishaquest.com.",
      travellerProfile: "Viajeros que buscan un safari más completo alojándose en lodges por el circuito norte",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Lodge — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su hotel"], estimatedDuration: null },
        { title: "Parque Nacional del Lago Manyara", route: null, activities: ["Safari", "Almuerzo de picnic"], estimatedDuration: null },
        { title: "Hacia el Serengeti", route: "Lago Manyara → borde del Cráter del Ngorongoro → Serengeti central", activities: ["Trayecto con observación de fauna en el camino"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari de día completo siguiendo la migración y a los depredadores"], estimatedDuration: "Día completo" },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari matinal en el norte o el sur del Serengeti, según la temporada"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Descenso al cráter", "Safari de medio día"], estimatedDuration: null },
        { title: "Regreso a Arusha", route: "Ngorongoro → Arusha", activities: ["Traslado al aeropuerto"], estimatedDuration: null },
      ],
    },
    "tarangire-manyara-serengeti-ngorongoro-enrich": {
      name: "Tarangire, Lago Manyara, Serengeti y Ngorongoro",
      summary: "Elefantes entre los baobabs en Tarangire, leones trepadores y flamencos en el Lago Manyara, las llanuras del Serengeti y el Cráter del Ngorongoro.",
      overview: "Un safari de ocho días alojado en lodges por cuatro parques, exactamente como se indica en los paquetes Enrich de maishaquest.com.",
      travellerProfile: "Viajeros que quieren el circuito norte completo desde lodges cómodos",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [{ label: "Alojamiento", value: "Lodge — disponible en categoría de lujo, media o económica" }],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su hotel"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safaris: elefantes y bosque de baobabs"], estimatedDuration: null },
        { title: "Parque Nacional del Lago Manyara", route: null, activities: ["Leones trepadores y flamencos"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari a la llegada"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Exploración de día completo; la ruta depende de la temporada de migración"], estimatedDuration: "Día completo" },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Más safaris"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Safari de medio día en el borde del cráter"], estimatedDuration: null },
        { title: "Regreso a Arusha", route: "Ngorongoro → Arusha", activities: ["Traslado al aeropuerto"], estimatedDuration: null },
      ],
    },
    "cultural-safari-combo": {
      name: "Combinado Cultural + Safari",
      summary: "Exploración tribal y vida comunitaria auténtica junto a safaris de fauna: Arusha, Tarangire, el Serengeti, el Ngorongoro, el Lago Eyasi y una aldea masái.",
      overview: "Un recorrido de diez días que equilibra los parques nacionales con visitas comunitarias tradicionales, exactamente como se indica en los paquetes Enrich de maishaquest.com.",
      travellerProfile: "Viajeros que buscan inmersión cultural junto a la fauna",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge — disponible en categoría de lujo, media o económica" },
        { label: "Pendiente", value: "El Lago Eyasi todavía no tiene página propia de destino en este sitio — véase la auditoría de Learn/regiones" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado desde el aeropuerto"], estimatedDuration: null },
        { title: "Recorrido por la ciudad de Arusha", route: null, activities: ["Mercados y el Centro del Patrimonio Cultural"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safari de día completo"], estimatedDuration: "Día completo" },
        { title: "Hacia el Serengeti", route: "Arusha → Ngorongoro → Serengeti", activities: ["Safaris durante el trayecto"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safaris", "Cena opcional al atardecer"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Expedición de seguimiento de la migración"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Observación de fauna en el suelo del cráter"], estimatedDuration: null },
        { title: "Lago Eyasi", route: null, activities: ["Visita a los cazadores-recolectores hadzabe y a los herreros datoga"], estimatedDuration: null },
        { title: "Aldea masái", route: null, activities: ["Visita de inmersión cultural"], estimatedDuration: null },
        { title: "Salida", route: null, activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
    "extended-safari-cultural-immersion": {
      name: "Safari Ampliado e Inmersión Cultural",
      summary: "Exploración de fauna por cuatro parques combinada con encuentros comunitarios: cazadores hadzabe, herreros datoga y aldeas masái.",
      overview: "Un recorrido de once días que equilibra las actividades de safari con visitas comunitarias, exactamente como se indica en los paquetes Enrich de maishaquest.com.",
      travellerProfile: "Viajeros que buscan un encuentro cultural prolongado junto a la fauna",
      bestTime: "No especificado por Maisha Quest",
      included: STANDARD_INCLUDED,
      notIncluded: STANDARD_NOT_INCLUDED,
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge — disponible en categoría de lujo, media o económica" },
        { label: "Pendiente", value: "El Lago Eyasi todavía no tiene página propia de destino en este sitio — véase la auditoría de Learn/regiones" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado desde el aeropuerto"], estimatedDuration: null },
        { title: "Recorrido por la ciudad de Arusha", route: null, activities: ["Mercados y el Museo de la Tanzanita"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safaris"], estimatedDuration: null },
        { title: "Parque Nacional del Lago Manyara", route: null, activities: ["Observación de fauna"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safaris, observación de la migración cuando la temporada lo permite"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Más safaris"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Más safaris"], estimatedDuration: null },
        { title: "Hacia el Ngorongoro", route: "Serengeti → Ngorongoro", activities: ["Traslado"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Safari de día completo"], estimatedDuration: "Día completo" },
        { title: "Lago Eyasi y aldeas masái", route: null, activities: ["Participación en una cacería tradicional y en el encendido de fuego con los cazadores hadzabe", "Visitas a herreros datoga y a una aldea masái"], estimatedDuration: null },
        { title: "Salida", route: null, activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
    "wildlife-leisure-culture": {
      name: "Fauna + Ocio + Cultura",
      // ⚠️ El propio resumen de maishaquest.com para este paquete promete una
      // etapa de playa en Zanzíbar («la combinación perfecta de aventura,
      // relajación e inmersión cultural»), pero el itinerario día a día en la
      // misma página nunca sale del continente y termina en el Aeropuerto del
      // Kilimanjaro. El itinerario —la parte verificable— se publica tal
      // cual; véase la nota al comienzo de `safaris.ts`.
      summary: "Observación de fauna por los parques del norte, una visita a una finca de café y de tanzanita, y encuentros culturales con las comunidades hadzabe, datoga y masái.",
      overview: "Un itinerario Enrich de doce días. Nota: la descripción del paquete en maishaquest.com también promete tiempo de playa en Zanzíbar, algo que el itinerario día a día publicado no incluye — señalado para que el cliente confirme cuál es correcto.",
      travellerProfile: "Viajeros que buscan fauna, ocio y cultura combinados",
      bestTime: "Todo el año",
      included: STANDARD_INCLUDED,
      notIncluded: [...STANDARD_NOT_INCLUDED, "Safari en globo (opcional, el día 7)"],
      practicalInfo: [
        { label: "Alojamiento", value: "Lodge — disponible en categoría de lujo, media o económica" },
        { label: "Pendiente", value: "La descripción del paquete promete una etapa en Zanzíbar que el itinerario día a día no incluye — confirmar con el cliente cuál es correcto" },
      ],
      days: [
        { title: "Llegada a Arusha", route: "Aeropuerto Internacional del Kilimanjaro → Arusha", activities: ["Traslado a su hotel"], estimatedDuration: null },
        { title: "Recorrido por la ciudad de Arusha", route: null, activities: ["Experiencia de la tanzanita", "Visita y cata en una plantación de café"], estimatedDuration: null },
        { title: "Parque Nacional de Tarangire", route: null, activities: ["Safari de día completo: elefantes y baobabs"], estimatedDuration: "Día completo" },
        { title: "Parque Nacional del Lago Manyara", route: null, activities: ["Leones trepadores, hipopótamos y flamencos"], estimatedDuration: null },
        { title: "Hacia el Serengeti", route: "Tierras altas del Ngorongoro → Serengeti central", activities: ["Trayecto panorámico"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari de día completo"], estimatedDuration: "Día completo" },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Safari opcional en globo con desayuno con champán", "Safaris por la tarde"], estimatedDuration: null },
        { title: "Parque Nacional del Serengeti", route: null, activities: ["Norte o sur del Serengeti, según la temporada de migración"], estimatedDuration: null },
        { title: "Cráter del Ngorongoro", route: null, activities: ["Descenso al cráter", "Safari por la tarde"], estimatedDuration: null },
        { title: "Lago Eyasi", route: null, activities: ["Experiencias culturales con cazadores hadzabe y herreros datoga"], estimatedDuration: null },
        { title: "Aldea masái", route: "→ Arusha", activities: ["Visita tradicional a una aldea masái", "Regreso a Arusha"], estimatedDuration: null },
        { title: "Salida", route: "Arusha → Aeropuerto Internacional del Kilimanjaro", activities: ["Traslado para su vuelo de salida"], estimatedDuration: null },
      ],
    },
  },

  destinations: {
    "serengeti": {
      name: "Serengeti",
      shortDescription: "Llanuras infinitas y la migración que las cruza.",
      description: "Serengeti significa «llanuras infinitas» en maa, y el nombre no es un adorno. Es un parque enorme y por capas —llanuras de hierba corta en el sur, kopjes de granito en el centro, bosque de ribera en el norte— que sostiene todo el año las poblaciones de depredadores por las que se conoce a Tanzania, y la migración de ñus que lo recorre en un lento círculo anual.",
      bestTime: "Todo el año, según dónde esté la migración",
      wildlife: ["León","Leopardo","Guepardo","Ñu","Cebra","Elefante","Hiena"],
      seasons: [
        {"label":"Partos","months":"Enero – marzo","note":"Las manadas están en las llanuras de hierba corta del sur. Actividad de depredadores muy concentrada."},
        {"label":"Corredor occidental","months":"Mayo – julio","note":"La migración se desplaza al oeste y al norte. Cruces del río Grumeti."},
        {"label":"Cruces del norte","months":"Julio – octubre","note":"Cruces del río Mara en el norte. Las semanas más solicitadas del año."},
      ],
    },
    "tarangire": {
      name: "Tarangire",
      shortDescription: "Baobabs y las mayores manadas de elefantes del norte.",
      description: "Tarangire se organiza alrededor de un único río que conserva agua cuando la tierra de alrededor no la tiene. En los meses secos ese río atrae manadas de elefantes en un número que rara vez se ve en otro punto del norte de Tanzania, bajo baobabs de siglos. Es más tranquilo que el Serengeti y suele ser el primer parque de una ruta norte.",
      bestTime: "Junio – octubre",
      wildlife: ["Elefante","León","Jirafa","Cebra","Eland","Órix de orejas ribeteadas"],
      seasons: [
        {"label":"Estación seca","months":"Junio – octubre","note":"Los animales se concentran junto al río Tarangire. La mejor observación de elefantes del año."},
        {"label":"Estación verde","months":"Noviembre – mayo","note":"Menos vehículos, cielos espectaculares y aves excelentes. La fauna está más dispersa."},
      ],
    },
    "lake-manyara": {
      name: "Lago Manyara",
      shortDescription: "Bosque freático, un lago alcalino y flamencos.",
      description: "Un parque estrecho encajado entre el escarpe del Valle del Rift y un lago salino poco profundo. En cuestión de minutos se pasa de un bosque freático denso a una llanura de inundación abierta, lo que lo convierte en uno de los safaris cortos más variados del país, y en una parada natural de media jornada entre Arusha y las tierras altas del Ngorongoro.",
      bestTime: "Junio – octubre para fauna, noviembre – abril para aves",
      wildlife: ["Elefante","Jirafa","Hipopótamo","Babuino","Flamenco","Pelícano"],
      seasons: [],
    },
    "ngorongoro": {
      name: "Ngorongoro",
      shortDescription: "Un volcán hundido que contiene un ecosistema entero.",
      description: "El cráter del Ngorongoro es la mayor caldera volcánica intacta del mundo, y en su fondo caben pradera, bosque, un lago salino y una población residente de grandes mamíferos que no necesita migrar. Se desciende al amanecer desde un borde frío y con niebla. Es además un área de conservación donde comunidades masái y fauna comparten el territorio.",
      bestTime: "Todo el año",
      wildlife: ["Rinoceronte negro","León","Elefante","Búfalo","Hiena","Flamenco"],
      seasons: [
        {"label":"Estación seca","months":"Junio – octubre","note":"Vistas despejadas del cráter y pistas fáciles. Los meses de más afluencia en el fondo."},
        {"label":"Estación verde","months":"Noviembre – mayo","note":"Fondo del cráter verde y partos en las llanuras cercanas de Ndutu a partir de enero."},
      ],
    },
    "kilimanjaro": {
      name: "Kilimanjaro",
      shortDescription: "El punto más alto de África, recorrido a pie de base a cumbre.",
      description: "Al Kilimanjaro se sube, no se llega en coche. En cinco a nueve días se camina desde tierras de cultivo a través de selva tropical, páramo y desierto alpino hasta una cumbre glaciada a 5.895 metros: cinco climas en una semana. La elección de la ruta, el ritmo y la aclimatación importan más que la forma física, y los planificamos en torno a ti.",
      bestTime: "Enero – marzo y junio – octubre",
      wildlife: ["Mono colobo","Mono azul","Suimanga malaquita"],
      seasons: [],
    },
    "nyerere": {
      name: "Nyerere",
      shortDescription: "Safaris en barca por el Rufiji, en el mayor parque de África.",
      description: "El Parque Nacional Nyerere —desgajado de la antigua Reserva de Caza de Selous— lo define el río Rufiji y su red de lagos y canales. Es uno de los pocos lugares de Tanzania donde se puede rastrear fauna a pie por la mañana y desde una barca por la tarde, con una fracción de los vehículos del circuito norte.",
      bestTime: "Junio – octubre",
      wildlife: ["Elefante","Hipopótamo","Cocodrilo","Licaón","Búfalo","León"],
      seasons: [],
    },
    "ruaha": {
      name: "Ruaha",
      shortDescription: "País de baobabs, grandes manadas y casi nadie más.",
      description: "Ruaha está donde se solapan los ecosistemas del sur y del este de África, y por eso conviven en el mismo parque el kudú mayor y el menor. Es remoto, agreste y muy poco visitado: la elección de quien ya ha hecho el circuito norte y quiere su versión salvaje.",
      bestTime: "Junio – octubre",
      wildlife: ["Elefante","León","Kudú mayor","Antílope sable","Licaón"],
      seasons: [],
    },
    "zanzibar": {
      name: "Zanzíbar",
      shortDescription: "Océano Índico, velas de dhow y Stone Town.",
      description: "Zanzíbar es donde terminan la mayoría de los viajes: arena blanca y agua cálida y somera en las costas norte y este, y Stone Town —Patrimonio de la Humanidad de callejones de piedra coralina, puertas talladas e historia suajili, omaní e india— en el oeste. Dos noches son una pausa; cinco son unas vacaciones en sí mismas.",
      bestTime: "Junio – octubre y diciembre – febrero",
      wildlife: ["Colobo rojo","Delfines","Peces de arrecife","Tortuga verde"],
      seasons: [],
    },
    "arusha": {
      name: "Arusha",
      shortDescription: "Donde empieza cada viaje, y donde vivimos.",
      description: "Arusha está a la sombra del monte Meru, al pie del circuito norte. Es la puerta de entrada al Serengeti y al Ngorongoro, y también es casa: aquí están nuestra oficina, nuestros guías y nuestros vehículos. La mayoría de los viajes empieza con una noche en Arusha, un briefing como es debido y una primera mañana sin prisa.",
      bestTime: "Todo el año",
      wildlife: ["Mono colobo","Mono azul","Aves de bosque"],
      seasons: [],
    },
  },

  /**
   * Las 5 categorías reales de la sección Experiences de maishaquest.com,
   * cada una con su propia página allí (/thrill-seaker-adventures,
   * /water-activities, /tours, /shopping-and-leisure, /nightlife). La
   * `description` de cada una enumera con fidelidad las actividades o
   * locales publicados en esa página — nada inventado, nada resumido hasta
   * perder el nombre o el lugar. Ninguna de estas actividades o locales
   * tiene un precio publicado.
   */
  experiences: {
    "thrill-seeker-adventure": {
      name: "Aventura Extrema",
      shortDescription: "«Safari» significa «viaje» en suajili: explore fronteras llenas de aventura en cada rincón de Tanzania con los mejores operadores.",
      description: "Salto en paracaídas sobre la playa de Kendwa, en Zanzíbar. Tirolina entre plantaciones de plátano y bosques de Mto wa Mbu, a dos horas de Arusha. Parapente en tándem sobre el Valle del Rift, en Monduli, a hora y media de Arusha (de temporada). Ciclismo de montaña entre plantaciones de café y aldeas cerca de Usa River y el bosque de Rau, junto a Moshi y Arusha, con vistas al Kilimanjaro. Paseos a caballo por las playas de Nungwi, en Zanzíbar. Trekking de montaña en el Kilimanjaro, el monte Meru o las montañas Usambara. Senderismo hasta las cascadas de Materuni y Napuru, cerca de Moshi y Arusha, con visitas culturales a las comunidades chagga y meru. Natación con delfines en Kizimkazi, Zanzíbar. Y, de temporada entre noviembre y marzo, natación con tiburones ballena frente a la isla de Mafia. Según se indica en la página Thrill Seeker Adventure de maishaquest.com.",
    },
    "water-activities": {
      name: "Actividades Acuáticas",
      shortDescription: "El agua es el origen de toda vida: deje la tierra firme y disfrute de una variedad de deportes acuáticos en la costa y más allá.",
      description: "Buceo de superficie en el atolón de Mnemba, Zanzíbar. Submarinismo con centros certificados PADI en Zanzíbar y la isla de Mafia. Kitesurf en la playa de Paje, Zanzíbar, una de las mejores playas del mundo para este deporte (de temporada, clases diarias). Piragüismo en el lago Duluti, un lago de cráter a veinte minutos de Arusha. Motos acuáticas en Kendwa y Nungwi, Zanzíbar. Pesca en el lago Victoria y la costa de Zanzíbar, desde salidas tradicionales con pescadores locales hasta pesca de altura. Paseos en barco por el lago Victoria y el océano Índico, desde cruceros al atardecer hasta salidas tradicionales en dhow. Excursiones de un día a la isla Bongoyo y la isla Mbudya, ambas cerca de Dar es Salaam, para bucear y hacer picnic en la playa. Alquiler de yates privados desde Dar es Salaam y Zanzíbar. Y visitas guiadas a las cuevas de agua dulce de Zanzíbar. Según se indica en la página Water Activities de maishaquest.com.",
    },
    "tours-and-safaris": {
      name: "Tours y Safaris",
      shortDescription: "Descubra rincones ocultos en un recorrido por lugares con su propia historia que contar.",
      description: "Visitas a museos en Dar es Salaam y Arusha, incluidos el Museo Nacional, el Museo de la Declaración de Arusha y el Museo de Historia Natural. Recorridos urbanos por Arusha, Dar es Salaam, Zanzíbar y Mwanza. Visitas a aldeas en Mto wa Mbu y en poblados masái. Visitas a galerías de arte en el Nafasi Art Space de Dar es Salaam y el Centro del Patrimonio Cultural de Arusha. Una caminata hasta las cascadas de Materuni, cerca de Moshi, con una experiencia tradicional de elaboración de café junto a la comunidad chagga. Las cascadas de Napuru, a veinte minutos de Arusha, para senderismo, cuatriciclos y picnics. El lago Duluti, también a veinte minutos de Arusha, para piragüismo, pesca y observación de aves. El Parque de Serpientes de Meserani y el Museo Masái, a media hora de Arusha. El Centro de Jirafas de Arusha. Visitas a fincas de café y de plátano en Moshi y Arusha. Y visitas a minas y talleres de gemas y tanzanita en Arusha y las minas de Mererani. Según se indica en la página Tours de maishaquest.com.",
    },
    "shopping-and-leisure": {
      name: "Compras y Ocio",
      shortDescription: "La mejor forma de aprovechar el tiempo libre: recupere energía con las mejores ofertas al alcance de la mano.",
      description: "El Mercado Masái de Arusha, mejor visitarlo en sábado. El Centro del Patrimonio Cultural de Arusha, con arte, piezas artesanales, joyería y una cafetería. El AIM Mall de Arusha, con boutiques, cine y restauración. El Slipway Shopping Centre de Dar es Salaam, para comprar y comer frente al mar. Las tiendas de Stone Town, en Zanzíbar, con artesanía suajili tradicional, especias y ropa. El Mlimani City Mall, el centro comercial más grande de Tanzania, en Dar es Salaam. El Rock City Mall de Mwanza. Y jornadas de spa en el Lemon Spa de Arusha, el Ocean Spa de Dar es Salaam y Zanzíbar, o el Honey Spa de Moshi. Según se indica en la página Shopping and Leisure de maishaquest.com.",
    },
    nightlife: {
      name: "Vida Nocturna",
      shortDescription: "La música no se detiene: los mejores locales de la ciudad, allá donde le lleve el viaje.",
      description: "En Arusha: Via Via, para música en vivo al aire libre y noches culturales; Rafiki Juice Bar, para cócteles y DJ; Kesho Café, para jazz y poesía; Pillars, para bandas en vivo; y discotecas como Aces, Club D, The Hub y El Toro, con Bongo Flava y éxitos internacionales. En Dar es Salaam: Samaki Samaki, para cenar y bailar; Elements, para cócteles en una azotea; Tips Lounge, para hip-hop y Bongo Flava; Wavuvi Camp, para fiestas en la playa; Coco Beach Strip; Cocktails & Dreams; The Reef; y discotecas como Uncles, Kitamba Cheupe, Havoc y Warehouse. En Zanzíbar: Sky Bar, con vistas a Stone Town; Jambo Beach; la Full Moon Party de Kendwa Rocks; y locales como 6 Degrees South, Garage Club y Tatu. En Mwanza: Cask n Grill y Tilapia Lounge. Según se indica en la página Nightlife de maishaquest.com.",
    },
  },

  collections: {
    "explorer": {
      tagline: "Para quien busca paisajes salvajes, aventura y descubrimiento.",
      description: "La versión activa de Tanzania. Jornadas más largas sobre el terreno, campamentos que se mueven con la fauna, tiempo a pie además de en vehículo y rutas que llegan a los rincones de un parque a los que casi ningún coche llega.",
      travellerProfile: "Viajeros activos, fotógrafos y quienes repiten safari",
      traits: ["Campamentos móviles","Safaris en vehículo","Caminatas y trekking","Rutas remotas"],
    },
    "escape": {
      tagline: "Para quien busca espacio, comodidad y desconexión sin esfuerzo.",
      description: "Más pausado, más suave y con todo resuelto. Menos parques y más noches en cada uno, lodges elegidos por dónde están y por lo que se ve desde ellos, y un final en el Índico.",
      travellerProfile: "Parejas, lunas de miel y quienes hacen su primer safari",
      traits: ["Lodges y campamentos boutique","Parejas y lunas de miel","Bienestar","Zanzíbar"],
    },
    "enrich": {
      tagline: "Para quien quiere vivir Tanzania con más profundidad.",
      description: "Tanzania más allá del safari en vehículo. Días con comunidades y equipos de conservación, comida y café donde se cultivan, y acceso privado acordado directamente con quien lo acoge.",
      travellerProfile: "Viajeros curiosos, familias con hijos mayores y quienes vuelven",
      traits: ["Cultura","Cocina","Comunidades","Conservación"],
    },
  },

  journal: {
    "elevate-your-safari-experience": {
      title: "Eleva tu experiencia de safari: las aventuras a medida de Maisha Quest",
      excerpt: "Un vistazo a los paquetes Explorer, Escape y Enrich de Maisha Quest, y a la mudanza a una nueva web hecha con Wix, con formularios de safari a medida y un perfil completo de la empresa.",
      category: "Noticias de la empresa",
      body: [
        "¿Sueñas con una experiencia de safari inolvidable que vaya más allá de lo habitual? No busques más: Maisha Quest es una empresa de safaris de primer nivel con sede en Arusha, Tanzania, especializada en crear aventuras a medida que se adaptan a cada uno de tus deseos.",
        "Maisha Quest tiene la misión de redefinir la experiencia de safari ofreciendo viajes únicos, auténticos y sostenibles que no solo muestran los paisajes impresionantes de Tanzania, sino que también profundizan en su rica historia y sus diversas culturas. Con el foco puesto en el desarrollo sostenible del destino, Maisha Quest se asegura de que cada viaje contribuya a la preservación de la fauna, al enriquecimiento de las comunidades locales y a la promoción de Tanzania como un destino vibrante y dinámico. Ya seas un explorador aventurero, alguien que busca relajarse o un entusiasta de la cultura, Maisha Quest tiene el paquete perfecto para ti. Sus Paquetes Explorer están pensados para quienes buscan emociones fuertes y experiencias cargadas de adrenalina en pleno corazón de la naturaleza salvaje. Si lo que buscas es desconectar y disfrutar de la belleza de la naturaleza, los Paquetes Escape ofrecen un retiro sereno en medio de paisajes sobrecogedores. Y para quienes quieren sumergirse en la vibrante cultura y la vida urbana de Tanzania, los Paquetes Enrich ofrecen una inmersión profunda en las costumbres y tradiciones locales. Además de sus experiencias de safari cuidadosamente diseñadas, Maisha Quest también se dedica a ofrecer un servicio de atención al cliente excelente y a asegurarse de que cada aspecto de tu viaje quede resuelto sin fisuras. La empresa está en proceso de mudarse a Wix, un cambio que mejorará el seguimiento del sitio web, potenciará las capacidades de SEO, aumentará el rendimiento, facilitará la gestión y dará acceso a herramientas de diseño avanzadas. La nueva web tendrá un diseño elegante y refinado, propio de los mejores destinos de naturaleza salvaje, así como una sección sencilla de usar donde podrás rellenar formularios de safari a medida y conocer el perfil de la empresa. Así que, si estás listo para elevar tu experiencia de safari a un nuevo nivel y emprender el viaje de tu vida, confía en Maisha Quest para crear una aventura a medida que supere todas tus expectativas. Reserva hoy tu safari a medida y prepárate para sumergirte en la magia de Tanzania como nunca antes.",
      ],
    },
    "unleash-your-wanderlust": {
      title: "Da rienda suelta a tus ganas de viajar: te esperan las aventuras de safari de Maisha Quest",
      excerpt: "Por qué Maisha Quest plantea sus paquetes Explorer, Escape y Enrich en torno al turismo sostenible, y qué está cambiando con la mudanza de la empresa a una nueva web.",
      category: "Noticias de la empresa",
      body: [
        "¿Estás listo para emprender la aventura de safari de tu vida, una que no solo despierte tus ganas de viajar, sino que también contribuya a la preservación de la fauna y al enriquecimiento de las comunidades locales? No busques más: Maisha Quest Safari Adventures tiene su base en los sobrecogedores paisajes de Arusha, Tanzania.",
        "Maisha Quest no es una empresa de safaris cualquiera. Su misión es desafiar los estereotipos y mostrar la rica historia, las diversas culturas y los impresionantes paisajes de África. Con un compromiso firme con el turismo sostenible, Maisha Quest ofrece una gama de experiencias de safari cuidadosamente diseñadas para distintos tipos de viajeros. Para quienes buscan aventura, los Paquetes Explorer son perfectos para sumergirse en la naturaleza salvaje y acercarse a la majestuosa fauna de Tanzania. Si lo tuyo es más la relajación y la belleza paisajística, los Paquetes Escape ofrecen un retiro tranquilo en el corazón de la naturaleza. Y para quienes están deseando adentrarse en el tejido cultural de Tanzania, los Paquetes Enrich ofrecen una experiencia realmente inmersiva y reveladora.",
        "Además de ofrecer experiencias de safari inolvidables, Maisha Quest se dedica al desarrollo sostenible de Tanzania como destino. Al elegir Maisha Quest para tu próxima aventura, no solo emprendes un viaje increíble, sino que también contribuyes a la conservación de la fauna y al empoderamiento de las comunidades locales. Se avecinan novedades emocionantes para Maisha Quest, que se prepara para lanzar una web nueva y mejorada en Wix. Este cambio permitirá un mejor seguimiento, optimización de SEO, mayor rendimiento, una gestión más sencilla y acceso a herramientas de diseño de primer nivel. El diseño elegante y refinado de la nueva web reflejará la sofisticación de los principales sitios de viajes, ofreciendo una experiencia fluida a quienes la visiten. Una de las características clave de la nueva web será una sección donde los viajeros podrán rellenar formularios de safari a medida para personalizar su experiencia. Además, habrá disponible un perfil completo de la empresa para que quienes visiten la web puedan conocer mejor los valores, la misión y el compromiso de Maisha Quest con el turismo sostenible. Así que, si estás listo para dar rienda suelta a tus ganas de viajar y emprender una aventura de safari como ninguna otra, las aventuras de Maisha Quest Safari Adventures te esperan. Prepárate para explorar la belleza salvaje de Tanzania, sumergirte en sus vibrantes culturas y dejar una huella positiva en el mundo.",
      ],
    },
    "discover-tanzanias-hidden-gems": {
      title: "Descubre las joyas ocultas de Tanzania: las experiencias de safari de Maisha Quest",
      excerpt: "Los paquetes Explorer, Escape y Enrich de Maisha Quest, y un primer vistazo a la mudanza de la empresa a una web rediseñada, hecha con Wix.",
      category: "Noticias de la empresa",
      body: [
        "¿Eres un viajero aventurero en busca de una experiencia de safari como ninguna otra? No busques más: Maisha Quest es una empresa de safaris de primer nivel con sede en Arusha, Tanzania, que ofrece una gama de experiencias de safari únicas y sostenibles.",
        "Maisha Quest tiene la misión de desafiar los estereotipos y mostrar la rica historia, las diversas culturas y los sobrecogedores paisajes de África. Con un compromiso firme con el desarrollo sostenible del destino, esta empresa imagina un mundo en el que cada viaje contribuya a la preservación de la fauna, impulse a las comunidades locales y ponga en valor a Tanzania como un destino emocionante y vibrante. Ya seas alguien que busca aventura, relajación o inmersión cultural, Maisha Quest tiene el paquete de safari perfecto para ti. Desde los Paquetes Explorer para quienes buscan emociones fuertes, hasta los Paquetes Escape para quienes anhelan serenidad y belleza natural, y los Paquetes Enrich para viajeros que desean experiencias culturales inmersivas, hay algo para cada persona. Con el objetivo de mejorar la experiencia de usuario y agilizar las operaciones, el propietario de Maisha Quest tiene previsto mudar la web a Wix. Este cambio no solo mejorará el seguimiento, el rendimiento en SEO y la gestión, sino que también aportará mejores herramientas de diseño, ofreciendo a quienes visiten la web una experiencia de navegación más elegante y refinada, similar a la del reconocido sitio Wilderness Destinations. Una de las características más destacadas de la próxima web será la inclusión de formularios de safari a medida, que permitirán a quienes la visiten personalizar su experiencia de safari y hacer de su viaje algo verdaderamente inolvidable. Además, la web mostrará el perfil de la empresa, ofreciendo una visión de la filosofía, los valores y el compromiso de Maisha Quest con el turismo sostenible. Así que, si estás listo para emprender un viaje de safari como nunca antes, mantente atento a la renovada web de Maisha Quest, donde te esperan la aventura, la relajación y la inmersión cultural. Es hora de descubrir las joyas ocultas de Tanzania y crear recuerdos que durarán toda la vida.",
      ],
    },
  },

  faq: {
    "best-time-to-visit": {
      question: "¿Cuál es la mejor época para viajar a Tanzania?",
      answer: "No hay un único mes mejor: hay un mes mejor para lo que usted quiere ver. De junio a octubre es la estación seca, con la observación de fauna más sencilla y, desde julio, los cruces de río en el norte del Serengeti. De enero a marzo llega el parto de los ñus en las llanuras del sur y los meses más despejados para el Kilimanjaro. De noviembre a mayo es la estación verde: menos vehículos, cielos espectaculares, aves magníficas y fauna más dispersa. Díganos sus fechas y le diremos con franqueza para qué son buenas.",
    },
    "how-far-in-advance": {
      question: "¿Con cuánta antelación conviene reservar?",
      answer: "Los campamentos y lodges que merecen la pena son pequeños, y los mejor situados se llenan primero, sobre todo para los cruces del norte del Serengeti y para viajar en Navidad y Año Nuevo. Si sus fechas son fijas, empiece la conversación pronto. Si son flexibles, tenemos más margen con el que trabajar.",
    },
    "what-does-private-mean": {
      question: "¿Qué significa realmente un safari «privado»?",
      answer: "Su propio vehículo, su propio guía y un itinerario que pertenece solo a su grupo. Usted decide a qué hora salir por la mañana, cuánto tiempo quedarse con un animal y cuándo parar a comer. No comparte vehículo con desconocidos ni sigue una salida de grupo fijada de antemano.",
    },
    "single-travellers": {
      question: "¿Aceptan viajeros individuales y grupos pequeños?",
      answer: "Sí. Todos los viajes que diseñamos son privados, ya sea para un viajero o para una familia de diez. En la mayoría de campamentos y lodges se aplica un suplemento individual, y se lo mostraremos antes de que se comprometa a nada.",
    },
    "children": {
      question: "¿Podemos viajar con niños?",
      answer: "Sí, y los viajes en familia son uno de los que más planificamos. Algunos campamentos fijan edades mínimas y algunas actividades —las caminatas de safari en particular— tienen límites de edad. Lo comprobamos con su familia antes de proponer nada, no después.",
    },
    "visa-and-entry": {
      question: "¿Necesitamos visado?",
      answer: "La mayoría de los visitantes necesita visado para entrar en Tanzania y, para muchas nacionalidades, puede solicitarse en línea con antelación a través del servicio de inmigración tanzano. Los requisitos dependen de su pasaporte y cambian de vez en cuando, así que consulte la web oficial de inmigración correspondiente a su país cerca de la fecha de viaje. Se la indicaremos al reservar.",
    },
    "vaccinations": {
      question: "¿Qué hay de las vacunas y la malaria?",
      answer: "Tanzania es zona de malaria, y se exige certificado de fiebre amarilla si llega desde un país donde exista riesgo. Lo que usted necesite depende de su salud, de su ruta y del lugar desde el que vuele: consulte a un centro de vacunación internacional o a su médico bastante antes de salir. No podemos dar consejo médico.",
    },
    "languages": {
      question: "¿En qué idiomas trabajan?",
      answer: "Planificamos y acompañamos en inglés y suajili, y Talisa habla además ruso y chino mandarín. Para otros idiomas le diremos con claridad qué podemos organizar, en lugar de prometerle un guía que no podemos proporcionar.",
    },
    "what-to-pack": {
      question: "¿Qué deberíamos llevar?",
      answer: "Colores neutros, capas para las mañanas frías y los mediodías cálidos, un buen sombrero, prismáticos y más tarjetas de memoria de las que cree necesitar. Los vuelos internos entre parques tienen límites de equipaje estrictos, normalmente en bolsas blandas. Recibirá una lista de equipaje hecha para su ruta concreta.",
    },
    "how-to-start": {
      question: "¿Cómo funciona planificar un viaje con ustedes?",
      answer: "Usted nos dice aproximadamente cuándo, aproximadamente cuánto tiempo y qué le importa. Nosotros volvemos con una ruta propuesta y una idea honesta de lo que cuesta y de lo que implica. Usted la cambia tantas veces como necesite. Nada se confirma hasta que esté conforme.",
    },
  },

  team: {
    "talisa-tufts": {
      role: "Fundadora",
      bio: "Talisa fundó Maisha Quest tras una carrera en turismo internacional y hostelería. Habla cuatro idiomas, y por eso a los viajeros de Moscú, Shanghái o Madrid se les atiende en el suyo — y la primera conversación sobre tu viaje casi nunca necesita traductor.",
      specialty: "Diseño de viajes y atención multilingüe",
      favouritePlace: null,
    },
    "frank-lyatuu": {
      role: "Cofundador — Operaciones",
      bio: "Frank es de Arusha, y las rutas por las que viaja Maisha Quest son las que conoce de conducirlas. Se ocupa de la operativa, la hospitalidad y la parte práctica de montar un safari: los vehículos, los tiempos, la gente en cada puerta de parque.",
      specialty: "Operativa de safari y conocimiento local",
      favouritePlace: null,
    },
    "tina-ngabo": {
      role: "Cofundadora — Experiencia del viajero",
      bio: "Tina aporta experiencia en hostelería internacional a la parte del viaje que más se nota: cómo te cuidan. Es quien se asegura de que ese detalle que mencionaste una vez por correo te esté esperando en Tanzania.",
      specialty: "Experiencia del viajero y estándares de servicio",
      favouritePlace: null,
    },
  },

  impact: {
    "maisha-quest-cares": {
      title: "Maisha Quest Cares — Programa para Adolescentes en Riesgo",
      description: "Un programa para adolescentes que han perdido el rumbo —tras la pérdida de sus padres, por hogares rotos o circunstancias difíciles— y que en muchos casos acaban viviendo en la calle, expuestos a la delincuencia y al abuso de sustancias. Ofrece un hogar seguro con alimentación y alojamiento; formación en oficios con socios de sectores como mecánica, carpintería, costura, artesanía, hostelería y agricultura; patrocinio educativo y mentoría que cubre los costes de la formación y la matrícula escolar; y acompañamiento continuo para ayudar a cada joven a construir su autoestima, un sentido de propósito y esperanza en el futuro.",
      location: null,
    },
    empowerment: {
      title: "Empowerment — empleo justo para jóvenes tanzanos",
      description: "El propio equipo de Maisha Quest —guías, conductores, cocineros y personal de oficina— se contrata y se forma en Tanzania. La empresa describe el empleo justo, el desarrollo de competencias y un entorno de trabajo de apoyo para su personal como una medida de su labor tan importante como los viajes que diseña para sus clientes, y afirma estar invirtiendo en jóvenes tanzanos que llegarán a liderar el sector turístico más allá de Maisha Quest.",
      location: "Arusha, Tanzania",
    },
  },

  learnTopics: {
    geography: {
      name: "Geografía y naturaleza",
      description: "Tanzania reúne en un solo país una gama de ecosistemas poco habitual: la cumbre nevada del Kilimanjaro, las llanuras abiertas del Serengeti, las aguas profundas del lago Tanganica y los arrecifes de coral frente a Zanzíbar. El cráter del Ngorongoro, la mayor caldera volcánica intacta del mundo, se llama a veces el «Jardín del Edén» de África por la densidad de fauna que sostiene su suelo, incluidos los Cinco Grandes. En el norte, las aguas muy alcalinas del lago Natron son inhóspitas para casi toda forma de vida, pero sirven de criadero a millones de flamencos.",
    },
    culture: {
      name: "Cultura",
      description: "El suajili y el inglés son los idiomas oficiales de Tanzania, pero el país reúne a más de 120 grupos étnicos, cada uno con su propia lengua y tradiciones. El arte tanzano es conocido internacionalmente por el estilo de pintura Tinga Tinga —representaciones vivas y estilizadas de animales y vida cotidiana— y por la talla en madera makonde. A los masái se los reconoce por su shuka de colores vivos, la tela que llevan sobre los hombros.",
    },
    history: {
      name: "Historia",
      description: "La garganta de Olduvai, llamada a veces la Cuna de la Humanidad, es uno de los yacimientos paleoantropológicos más importantes del mundo. En 1871, el explorador Henry Morton Stanley se encontró con el misionero David Livingstone en Ujiji, a orillas del lago Tanganica. Entre 1905 y 1907, la rebelión Maji Maji unió a varios grupos étnicos contra el dominio colonial alemán: uno de los alzamientos más importantes de aquel periodo en África Oriental.",
    },
    "wildlife-and-conservation": {
      name: "Fauna y conservación",
      description: "Cada año, miles de elefantes se desplazan entre el Serengeti y el Parque Nacional de Tarangire, parte de una de las mayores migraciones de elefantes de África. Tanzania también ha avanzado de verdad en la conservación del rinoceronte negro y del licaón africano. En el Parque Nacional de Gombe Stream, a orillas del lago Tanganica, la Dra. Jane Goodall inició en los años sesenta su investigación sobre chimpancés salvajes, que continúa allí hoy.",
    },
    economy: {
      name: "Economía y desarrollo",
      description: "La agricultura es la columna vertebral de la economía tanzana y da empleo a la mayoría de la población; el país es uno de los mayores productores mundiales de clavo y sisal. Tanzania es además el único lugar del planeta donde se encuentra la tanzanita, extraída en las colinas de Mererani, cerca del Kilimanjaro, y apreciada por su color azul violáceo intenso.",
    },
    festivals: {
      name: "Eventos culturales y festivales",
      description: "El Festival Wanyambo, celebrado cada año en Bukoba, cerca del lago Victoria, celebra la cultura del pueblo haya con danza tradicional, música y comida. El Festival de Música Karibu, en Bagamoyo, es uno de los mayores eventos musicales de África Oriental, con una mezcla de música africana tradicional y contemporánea.",
    },
  },

  regions: {
    northern: {
      name: "Región Norte",
      description: "Hogar de más de 120 grupos étnicos, entre ellos los masái, los chagga de las laderas del Kilimanjaro y los hadza, uno de los últimos pueblos cazadores-recolectores de África. Es el terreno de safari más conocido de Tanzania: aquí se alza el Kilimanjaro, el pico más alto de África, con cinco zonas climáticas distintas; el Serengeti acoge la Gran Migración anual; y la garganta de Olduvai, la Cuna de la Humanidad, ha dado fósiles de antepasados humanos de hasta 3,6 millones de años. El norte de Tanzania estuvo bajo dominio colonial alemán hasta la Primera Guerra Mundial, y después fue mandato británico hasta la independencia en 1961 bajo Julius Nyerere.",
    },
    "central-southern": {
      name: "Región Centro y Sur",
      description: "El pueblo gogo es el grupo dominante en torno a la capital, Dodoma, tradicionalmente pastores y agricultores; más al sur viven los yao, los makonde —célebres por su talla en madera—, los ngoni y los hehe. Dodoma se convirtió en capital de Tanzania en 1973, dentro de un plan para desarrollar el interior del país. Más al sur, la Reserva de Caza de Selous (hoy en gran parte Parque Nacional de Nyerere) es una de las mayores reservas de caza del mundo y Patrimonio de la Humanidad de la UNESCO, con grandes poblaciones de elefantes y licaones africanos junto al río Rufiji; el Parque Nacional de Ruaha, el mayor de Tanzania, es conocido por sus manadas de leones. La antigua ciudad-estado insular de Kilwa Kisiwani, también Patrimonio de la Humanidad, comerció con oro, marfil y esclavos por el océano Índico entre los siglos IX y XV.",
    },
    "lake-zone-western": {
      name: "Zona de los Lagos y Región Oeste",
      description: "En torno al lago Victoria, el mayor de África, viven los sukuma —el grupo étnico más numeroso de Tanzania—, junto a los haya, conocidos por el cultivo del plátano y el café, y comunidades pesqueras que dependen de la perca del Nilo y la tilapia. A orillas del lago Tanganica, uno de los más antiguos y profundos del mundo, hay comunidades que todavía pescan de noche desde canoas talladas, con lámparas para atraer a los peces. Mwanza, la «ciudad de roca» a orillas del Victoria, es el centro económico de la región; los parques nacionales de Gombe Stream y de las montañas Mahale, ambos junto al Tanganica, están entre los mejores lugares de África para el trekking de chimpancés. Maisha Quest todavía no publica una página de destino propia para esta región.",
    },
    coastal: {
      name: "Región Costera",
      description: "El pueblo suajili ha vivido en la costa continental de Tanzania durante siglos, una cultura que mezcla influencias africanas, árabes y persas, expresada en la música taarab y en platos como el pilau y el mandazi. Dar es Salaam, la ciudad más grande del país, es su centro económico; Bagamoyo, antigua capital del África Oriental Alemana, y Kilwa Kisiwani, ciudad-estado suajili y Patrimonio de la Humanidad, son lugares de gran carga histórica. El Parque Nacional de Saadani, en la costa al norte de Dar es Salaam, es la única reserva de fauna de Tanzania situada directamente frente al océano. Maisha Quest todavía no publica una página de destino propia para esta región.",
    },
    "zanzibar-island": {
      name: "Isla de Zanzíbar",
      description: "Conocida como la Isla de las Especias, Zanzíbar está formada por dos islas principales, Unguja y Pemba, a unos 25-50 kilómetros de la Tanzania continental. Su población es mayoritariamente de habla suajili y musulmana, con raíces africanas, árabes, persas e indias que se reflejan en la música taarab y en la arquitectura arabesca y las puertas de madera talladas de Stone Town, Patrimonio de la Humanidad de la UNESCO. Comerciantes árabes se asentaron aquí desde el siglo VIII; las islas se convirtieron en centro del comercio de especias bajo el Sultanato de Omán en el siglo XIX y poco después en protectorado británico, hasta independizarse en 1963 y unirse a Tanganica en 1964 para formar Tanzania. El bosque de Jozani alberga al colobo rojo de Zanzíbar, una especie endémica.",
    },
  },
};
