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

export const esContent: ContentDictionary = {
  safaris: {
    "serengeti-ngorongoro-journey": {
      name: "Viaje al Serengeti y el Ngorongoro",
      summary: "El circuito norte sin prisa: la tierra de los baobabs, las llanuras infinitas y un descenso al cráter al amanecer. Lodges todo el viaje, vehículo privado todo el viaje.",
      overview: "Esta es la forma de viaje que busca la mayoría de quienes visitan Tanzania por primera vez, hecha como debe hacerse: tres parques en lugar de cinco, dos noches como mínimo en cada uno y ningún día que le deje seis horas dentro del vehículo. Termina en las tierras altas del Ngorongoro y sale desde Arusha.",
      travellerProfile: "Parejas y viajeros que hacen su primer safari",
      bestTime: "De junio a octubre, y de enero a marzo",
      included: ["Vehículo 4x4 privado con techo abierto y guía de Maisha Quest","Todas las tasas de parques y áreas de conservación","Alojamiento según lo indicado, en régimen de pensión completa","Agua embotellada durante todo el safari","Traslados de aeropuerto a la llegada y a la salida","Cobertura de evacuación con Flying Doctors"],
      notIncluded: ["Vuelos internacionales y visado de Tanzania","Seguro de viaje y de asistencia médica","Safari en globo y otras actividades opcionales","Bebidas distintas del agua y gastos personales","Propinas para el guía y el personal de campamento"],
      practicalInfo: [
        {"label":"Tamaño del grupo","value":"Salida privada: solo su grupo"},
        {"label":"Vehículo","value":"4x4 con techo abierto y asiento de ventanilla garantizado"},
        {"label":"Conducción","value":"El trayecto más largo ronda las 4 horas"},
        {"label":"Forma física","value":"No se requiere una forma física particular"},
      ],
      days: [
        {"title":"Llegada a Arusha","route":"Aeropuerto Internacional del Kilimanjaro → Arusha","activities":["Recepción en el aeropuerto por su guía de Maisha Quest","Traslado a Arusha y entrada en el alojamiento","Briefing del viaje durante la cena y repaso de los días siguientes"],"estimatedDuration":"1 h de traslado"},
        {"title":"Entrada en Tarangire","route":"Arusha → Parque Nacional de Tarangire","activities":["Trayecto matinal hacia el sur, por tierras de pastoreo masái","Safari de tarde a lo largo del río Tarangire","Atardecer entre los baobabs"],"estimatedDuration":"2,5 h de carretera y 3 h de safari"},
        {"title":"De Tarangire al Serengeti","route":"Tarangire → Parque Nacional del Serengeti","activities":["Salida temprana cruzando el Área de Conservación del Ngorongoro","Almuerzo de picnic en Naabi Hill, a las puertas de las llanuras","Safari de tarde entrando en el Serengeti central"],"estimatedDuration":"Jornada completa de viaje con observación por el camino"},
        {"title":"Las llanuras infinitas","route":null,"activities":["Día completo en el Serengeti, organizado en torno a la luz","Kopjes y riberas donde descansan los felinos","Vuelo en globo al amanecer, opcional y reservado con antelación"],"estimatedDuration":"Día completo"},
        {"title":"Del Serengeti al borde del cráter","route":"Serengeti → Área de Conservación del Ngorongoro","activities":["Último safari matinal en las llanuras","Subida a las tierras altas del Ngorongoro","Final de la tarde en el borde del cráter"],"estimatedDuration":"4 h de carretera con paradas"},
        {"title":"Dentro del cráter","route":"Suelo del cráter del Ngorongoro","activities":["Descenso al suelo del cráter con la primera luz","Safari en el suelo: la población residente no migra","Tarde de vuelta en el borde, o visita a una comunidad masái"],"estimatedDuration":"6 h en el suelo del cráter"},
        {"title":"Regreso a Arusha","route":"Ngorongoro → Arusha → Aeropuerto Internacional del Kilimanjaro","activities":["Desayuno sin prisa en el borde del cráter","Regreso por carretera a Arusha con parada para tomar café","Traslado al aeropuerto para su vuelo"],"estimatedDuration":"4 h de carretera"},
      ],
    },
    "serengeti-under-canvas": {
      name: "El Serengeti bajo lona",
      summary: "Un campamento móvil que se desplaza con las manadas, jornadas largas de campo y noches bajo lona allí donde de verdad está la fauna.",
      overview: "El campamento se desmonta y sigue a la migración, de modo que uno despierta donde están los animales en lugar de conducir dos horas para alcanzarlos. Lona confortable, camas de verdad, agua caliente… y nada entre usted y la llanura.",
      travellerProfile: "Viajeros activos y quienes repiten safari",
      bestTime: "De enero a marzo por el parto de los ñus; de julio a octubre por los cruces del norte",
      included: ["Vehículo 4x4 privado con techo abierto y guía de Maisha Quest","Todas las tasas de parques y áreas de conservación","Alojamiento en campamento móvil en régimen de pensión completa","Personal de campamento y agua embotellada durante todo el viaje","Traslados de aeropuerto a la llegada y a la salida"],
      notIncluded: ["Vuelos internacionales y visado de Tanzania","Seguro de viaje y de asistencia médica","Safari en globo y otras actividades opcionales","Bebidas distintas del agua y gastos personales","Propinas para el guía y el personal de campamento"],
      practicalInfo: undefined,
      days: [],
    },
    "serengeti-and-zanzibar": {
      name: "Serengeti y Zanzíbar",
      summary: "Primero las llanuras, después el océano Índico. Seis días de safari, cuatro en la costa y un solo equipo ocupándose del enlace.",
      overview: "La forma de viaje tanzano más solicitada, con noches suficientes a cada lado para que ninguna de las dos mitades se sienta apresurada. Se vuela del Serengeti directamente a Zanzíbar, sin volver atrás por Arusha.",
      travellerProfile: "Parejas y viajes de novios",
      bestTime: "De junio a octubre, y de diciembre a febrero",
      included: ["Vehículo 4x4 privado con techo abierto y guía de Maisha Quest","Todas las tasas de parques y áreas de conservación","Vuelo interno del Serengeti a Zanzíbar","Alojamiento según lo indicado: pensión completa en el safari, alojamiento y desayuno en la costa","Todos los traslados de aeropuerto y hotel"],
      notIncluded: ["Vuelos internacionales y visado de Tanzania","Seguro de viaje y de asistencia médica","Comidas distintas de las indicadas y gastos personales","Deportes acuáticos y excursiones opcionales en Zanzíbar","Propinas para el guía y el personal de campamento"],
      practicalInfo: undefined,
      days: [],
    },
    "tanzania-in-depth": {
      name: "Tanzania en profundidad",
      summary: "Café en las laderas donde crece, días con comunidades masái y chagga, un equipo de conservación sobre el terreno… y también la fauna.",
      overview: "Para viajeros que quieren entender el país y no marcar una lista. Aproximadamente la mitad de los días transcurre con personas y no con animales, y los días de safari salen ganando con ello.",
      travellerProfile: "Viajeros curiosos y familias con hijos mayores",
      bestTime: "De junio a octubre",
      included: ["Vehículo 4x4 privado con techo abierto y guía de Maisha Quest","Todas las tasas de parques y áreas de conservación","Visitas a comunidades acordadas directamente, con el pago dirigido a las propias comunidades","Alojamiento según lo indicado, en régimen de pensión completa","Todos los traslados"],
      notIncluded: ["Vuelos internacionales y visado de Tanzania","Seguro de viaje y de asistencia médica","Bebidas distintas del agua y gastos personales","Propinas para el guía y el personal de campamento"],
      practicalInfo: undefined,
      days: [],
    },
    "southern-wild": {
      name: "Sur salvaje: Nyerere y Ruaha",
      summary: "Safaris en barca por el Rufiji, caminatas en tierra de baobabs y dos parques que reciben una fracción de los vehículos del circuito norte.",
      overview: undefined,
      travellerProfile: "Viajeros que repiten safari y buscan espacio",
      bestTime: "De junio a octubre",
      included: ["Vuelos internos entre Dar es Salaam, Nyerere y Ruaha","Todas las tasas de parques","Alojamiento en campamentos de tiendas en régimen de pensión completa","Safaris en vehículo, a pie y en barca según programa"],
      notIncluded: ["Vuelos internacionales y visado de Tanzania","Seguro de viaje y de asistencia médica","Bebidas distintas del agua y gastos personales","Propinas para el guía y el personal de campamento"],
      practicalInfo: undefined,
      days: [],
    },
    "kilimanjaro-lemosho": {
      name: "Kilimanjaro: la ruta Lemosho",
      summary: "Ocho días en la montaña por la ruta que mejor aclimata, con el día adicional incluido de serie en lugar de venderse aparte.",
      overview: undefined,
      travellerProfile: "Senderistas; no se necesita experiencia técnica de escalada",
      bestTime: "De enero a marzo, y de junio a octubre",
      included: ["Equipo de montaña: guías, cocinero y porteadores, con sueldo y límites de carga acordados antes de subir","Todas las tasas del Parque Nacional del Kilimanjaro y de rescate","Equipo de acampada, comidas y agua potable en la montaña","Dos noches en Arusha, antes y después de la ascensión","Traslados de aeropuerto"],
      notIncluded: ["Vuelos internacionales y visado de Tanzania","Seguro de viaje y médico con cobertura de trekking hasta 6.000 m","Equipo personal de trekking y saco de dormir","Propinas para el equipo de montaña"],
      practicalInfo: undefined,
      days: [],
    },
    "highlands-and-communities": {
      name: "Tierras altas y comunidades",
      summary: "Los parques del norte, enhebrados a través de las comunidades de altura que viven junto a ellos: masái, datoga y chagga.",
      overview: undefined,
      travellerProfile: "Viajeros que quieren contexto además de fauna",
      bestTime: "De junio a octubre",
      included: ["Vehículo 4x4 privado con techo abierto y guía de Maisha Quest","Todas las tasas de parques y áreas de conservación","Visitas a comunidades acordadas directamente, con el pago dirigido a las propias comunidades","Alojamiento según lo indicado, en régimen de pensión completa"],
      notIncluded: ["Vuelos internacionales y visado de Tanzania","Seguro de viaje y de asistencia médica","Bebidas distintas del agua y gastos personales","Propinas para el guía y el personal de campamento"],
      practicalInfo: undefined,
      days: [],
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
