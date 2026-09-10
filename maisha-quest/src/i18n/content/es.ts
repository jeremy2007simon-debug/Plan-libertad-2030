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

  experiences: {
    "game-drives": {
      name: "Safaris en vehículo",
      shortDescription: "Vehículo privado, techo abierto y un guía que lee el terreno.",
      description: "El corazón de un safari en Tanzania. Viajas en tu propio vehículo con tu propio guía, lo que significa que marcas el ritmo: quedarte dos horas con un leopardo si la luz acompaña, o seguir. Las primeras horas y el final de la tarde son cuando la llanura está más viva.",
    },
    "great-migration": {
      name: "La Gran Migración",
      shortDescription: "Seguir a las manadas, ajustado a dónde están de verdad.",
      description: "Casi dos millones de ñus y cebras recorren el ecosistema del Serengeti en un lento círculo anual. No hay una única «temporada de migración»: hay un lugar donde deberían estar las manadas el mes en que viajas, y construimos la ruta alrededor de eso y no de un itinerario fijo.",
    },
    "mobile-camping": {
      name: "Campamento móvil",
      shortDescription: "Un campamento que se mueve con la fauna, no contra ella.",
      description: "Lona, una cama de verdad, una ducha de cubo bajo las estrellas y un campamento que se recoge y sigue a las manadas. Es lo más cerca que se está de cómo se viajaba originalmente en safari, sin nada de la incomodidad que quizá te estés imaginando.",
    },
    "walking-safari": {
      name: "Safari a pie",
      shortDescription: "El mismo paisaje, a tres kilómetros por hora.",
      description: "A pie, con un ranger armado y un guía de caminata, el safari cambia de escala: rastros, excrementos, cantos de aves, el olor del monte. Ves menos animales y entiendes muchísimo más. Disponible en Tarangire, Nyerere y Ruaha, y en las faldas del Kilimanjaro.",
    },
    "balloon-safari": {
      name: "Safari en globo",
      shortDescription: "La primera luz sobre el Serengeti, desde trescientos metros.",
      description: "Despegue al amanecer, una hora de deriva casi silenciosa sobre la llanura y desayuno sobre la hierba donde aterrizas. Es el añadido del que casi nadie se arrepiente, y hay que reservarlo con mucha antelación.",
    },
    "photographic-safari": {
      name: "Safari fotográfico",
      shortDescription: "Construido en torno a la luz, la posición y la paciencia.",
      description: "Rutas y horarios pensados para la hora dorada, colocación del vehículo respecto al sol, sacos de arena en lugar de trípodes y guías acostumbrados a trabajar con fotógrafos. Días más lentos, menos parques, mejores fotos.",
    },
    "beach-and-ocean": {
      name: "Playa y océano",
      shortDescription: "El Índico, después del polvo de la llanura.",
      description: "Zanzíbar y las islas menores de la costa: agua cálida y poco profunda, velas de dhow al atardecer, arrecifes para bucear con tubo o con botella. Es la segunda mitad natural de un safari, y aquella en torno a la que la mayoría de las parejas monta su luna de miel.",
    },
    "family-safari": {
      name: "Safari en familia",
      shortDescription: "Al ritmo de los niños, sin restarle nada a los adultos.",
      description: "Trayectos más cortos, unidades familiares en lugar de habitaciones separadas, guías que saben mantener la atención de un niño de siete años y parques lo bastante cerca como para que nadie pase un día entero en el coche. La edad mínima varía según el campamento: la comprobamos antes de proponer nada.",
    },
    "cultural-encounters": {
      name: "Encuentros culturales",
      shortDescription: "Tiempo con las comunidades, en sus términos.",
      description: "Visitas acordadas directamente con las comunidades implicadas, en los horarios que les convienen y con una parte justa de lo que pagas quedándose en el lugar. Comunidades masái y datoga cerca de las tierras altas del Ngorongoro, aldeas chagga en las laderas del Kilimanjaro y la Stone Town suajili de Zanzíbar.",
    },
    "coffee-and-cuisine": {
      name: "Café y cocina",
      shortDescription: "Tanzania a través de lo que cultiva y cocina.",
      description: "Café en las laderas donde se cultiva, fincas de especias a las afueras de Stone Town, una cocina suajili, un mercado en Arusha. Medias jornadas pequeñas y sin prisa que cuentan más del país que otro safari en vehículo.",
    },
    "kilimanjaro-trek": {
      name: "Ascensión al Kilimanjaro",
      shortDescription: "Cinco climas, una montaña, una semana.",
      description: "Machame, Lemosho, Rongai o Marangu: la ruta correcta depende del tiempo que tengas, de cómo aclimates y de cómo quieras que se sienta la caminata. Planificamos el día extra de aclimatación como estándar, no como un extra que vender.",
    },
    "safari-and-zanzibar": {
      name: "Safari y Zanzíbar",
      shortDescription: "Primero la llanura, después el océano. La combinación clásica.",
      description: "La forma de viaje por Tanzania que más se pide: el circuito norte y después un vuelo corto hacia el este, a la costa. Días suficientes en cada mitad para que ninguna se sienta apresurada, y un solo equipo ocupándose del enlace en medio.",
    },
    "boat-safari": {
      name: "Safari en barca",
      shortDescription: "Seguir la fauna desde el agua, en el Rufiji.",
      description: "En Nyerere el río es la carretera. El final de la tarde en el Rufiji trae hipopótamos, cocodrilos, elefantes bajando a beber y una lista de aves de tres cifras, desde una barca y a la altura de los ojos.",
    },
    "birdwatching": {
      name: "Observación de aves",
      shortDescription: "Más de mil especies y guías que reconocen los cantos.",
      description: "La lista de aves de Tanzania es de las más largas de África. Lake Manyara, los lagos del Valle del Rift y los parques del sur en la estación verde son el mejor terreno, y los meses de noviembre a abril traen a las migratorias.",
    },
    "conservation": {
      name: "Jornadas de conservación",
      shortDescription: "Un día con quienes hacen el trabajo.",
      description: "Tiempo con rangers, investigadores y proyectos comunitarios de conservación: entender qué implica de verdad proteger estos ecosistemas, en lugar de verlo desde un vehículo.",
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
    "when-to-see-the-great-migration": {
      title: "Dónde está realmente la migración, mes a mes",
      excerpt: "No hay una temporada de la migración: hay un lugar donde deberían estar las manadas el mes en que viajas. Una respuesta clara para cada mes y lo que implica para dónde duermes.",
      category: "Planificación",
    },
    "choosing-a-kilimanjaro-route": {
      title: "Cómo elegir una ruta al Kilimanjaro",
      excerpt: "Lemosho, Machame, Rongai o Marangu. Las diferencias que importan son el perfil de aclimatación y cuántos días puedes darle a la montaña, no una escala de dificultad.",
      category: "Kilimanjaro",
    },
    "green-season-tanzania": {
      title: "En defensa de la estación verde",
      excerpt: "De noviembre a mayo se descarta como los meses de lluvia. Lo que hay en realidad: parques vacíos, cielos extraordinarios, crías recién nacidas y la mejor observación de aves del año.",
      category: "Planificación",
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
    "education": {
      title: "Apoyo a la educación",
      description: "Escuelas cercanas a las comunidades por las que pasan estos viajes: las cosas prácticas que le faltan a un aula y los gastos que dejan a los niños fuera de ella.",
      location: null,
    },
    "conservation": {
      title: "Conservación de la fauna",
      description: "Los equipos de conservación que trabajan en los ecosistemas de los que dependen estos viajes, y una forma de pasar un día con ellos en lugar de solo leer sobre el tema.",
      location: null,
    },
    "community": {
      title: "Alianza con las comunidades",
      description: "Visitas a comunidades acordadas directamente con quienes las acogen, en el momento que a ellos les conviene y no en el que le conviene a un autocar.",
      location: null,
    },
    "local-employment": {
      title: "Empleo local",
      description: "Guías, conductores, cocineros y personal de oficina contratados en Tanzania. En el Kilimanjaro, cómo se retribuye a una cuadrilla y cuánto carga forma parte de elegirla.",
      location: "Arusha, Tanzania",
    },
  },
};
