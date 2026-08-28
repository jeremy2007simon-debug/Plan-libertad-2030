import type { Dictionary } from "./en";

/**
 * Diccionario de interfaz — español.
 *
 * Traducción completa, pendiente de revisión por hablante nativo antes del
 * lanzamiento. Terminología según `src/i18n/glossary.ts`.
 *
 * Sin traducir: "Maisha Quest", los nombres del equipo, los nombres de las
 * colecciones (Explorer / Escape / Enrich), correos, teléfonos y los topónimos
 * cuya forma oficial es la inglesa (Serengeti, Ngorongoro, Tarangire,
 * Zanzíbar se adapta por estar asentado en español).
 */
export const es: Dictionary = {
  a11y: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mainNav: "Principal",
    footerNav: "Pie de página",
    languageMenu: "Cambiar de idioma",
    languageMenuLabel: "Idioma",
    currentLanguage: "Idioma actual",
    previous: "Anterior",
    next: "Siguiente",
    required: "(obligatorio)",
    externalLink: "se abre en una pestaña nueva",
    whatsapp: "Escribir a Maisha Quest por WhatsApp",
    callUs: "Llamar a Maisha Quest",
    emailUs: "Escribir a Maisha Quest",
  },

  nav: {
    homeLabel: "Maisha Quest — inicio",
    mainNavLabel: "Principal",
    menu: "Menú",
    close: "Cerrar",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    siteMenu: "Menú del sitio",
    whatsappLabel: "Escribir a Maisha Quest por WhatsApp",
    language: {
      buttonLabel: "Cambiar de idioma",
      menuLabel: "Idioma",
      current: "Actual",
    },
    items: {
      safaris: "Safaris",
      allSafaris: "Todos los safaris",
      explorer: "Colección Explorer",
      escape: "Colección Escape",
      enrich: "Colección Enrich",
      destinations: "Destinos",
      experiences: "Experiencias",
      about: "Nosotros",
      ourStory: "Nuestra historia",
      team: "El equipo",
      impact: "Impacto",
      journal: "Diario",
      contact: "Contacto",
      faq: "Preguntas frecuentes",
      aboutUs: "Sobre nosotros",
      terms: "Términos y condiciones",
      privacy: "Política de privacidad",
      cookies: "Política de cookies",
      credits: "Créditos fotográficos",
      sitemap: "Mapa del sitio",
    },
    descriptions: {
      safaris: "Viajes privados, agrupados por la forma en que te gusta viajar.",
      explorer: "Paisajes salvajes, aventura y descubrimiento.",
      escape: "Espacio, comodidad y desconexión sin esfuerzo.",
      enrich: "Cultura, cocina y comunidades.",
    },
    planCta: "Diseña tu viaje",
    planShort: "Diseñar mi safari",
    speakToExpert: "Habla con un experto local",
    chat: "Chat",
    whatsappMessage:
      "Hola Maisha Quest, me gustaría recibir ayuda para planificar un safari en Tanzania.",
  },

  footer: {
    navLabel: "Pie de página",
    blurb:
      "Viajes privados por Tanzania, diseñados y guiados desde Arusha. Guiados por Tanzania. Pensados para ti.",
    groups: {
      travel: "Viajar",
      company: "Maisha Quest",
      legal: "Legal",
    },
    whatsapp: "Escríbenos por WhatsApp",
    rights: "Maisha significa vida — el viaje de la vida.",
  },

  collectionNames: {
    explorer: "Explorer",
    escape: "Escape",
    enrich: "Enrich",
  },

  safaris: {
    title: "Todos los viajes que diseñamos",
    lede:
      "Aquí no hay salidas fijas. Cada uno es una forma de viaje que sabemos que funciona, reconstruida en torno a tus fechas, tu ritmo y quienes te acompañan.",
    collection: "Colección",
    aboutCollection: "Sobre esta colección",
    journeyCount: (n: number) => (n === 1 ? "1 viaje" : `${n} viajes`),
    noneRightTitle: "¿Ninguno acaba de encajar?",
    noneRightBody:
      "Mejor: ese suele ser el punto de partida. Cuéntanos qué tienes en la cabeza y lo construimos desde cero.",
  },

  collections: {
    pageTitle: (name: string) => `Colección ${name}`,
    typicalLength: "Duración habitual",
    journeysInCollection: (n: number) =>
      n === 1 ? "1 viaje en esta colección" : `${n} viajes en esta colección`,
    notQuiteYou: "¿No es del todo lo tuyo?",
  },

  destinations: {
    title: "Nueve lugares, un país",
    lede:
      "Tanzania no es un solo paisaje. Estos son los lugares por los que viajamos, qué habita en cada uno y cuándo están en su mejor momento.",
    whenToCome: "Cuándo venir",
    include: (place: string) => `Incluir ${place}`,
    journeysThrough: (place: string) => `Viajes que pasan por ${place}`,
  },

  experiences: {
    singular: "Experiencia",
    lede:
      "Un safari no son solo salidas en vehículo. Estas son las formas de vivir un día en Tanzania: combina las que quieras en un mismo viaje.",
    whereYouDoThis: "Dónde se vive",
    addToJourney: "Añadir a mi viaje",
    journeysIncluding: "Viajes que la incluyen",
  },

  planner: {
    stepOf: "Paso {n} de {total}",
    progress: "Progreso del planificador",
    draftRestored:
      "Retomamos donde lo dejaste. Tus respuestas anteriores están guardadas solo en este dispositivo.",
    back: "Atrás",
    continue: "Continuar",
    send: "Enviar mi solicitud",
    sending: "Enviando…",
    savedLocally: "Se guarda en este dispositivo mientras avanzas",

    steps: {
      trip: {
        label: "Viaje",
        title: "¿Qué tipo de viaje te imaginas?",
        help: "Elige el más parecido. Nada de esto es vinculante: solo nos dice por dónde empezar.",
      },
      destinations: {
        label: "Lugares",
        title: "¿Adónde te gustaría ir?",
        help: "Elige los que quieras, o déjalo en nuestras manos.",
      },
      dates: {
        label: "Fechas",
        title: "¿Cuándo y durante cuánto tiempo?",
        help: "Con una aproximación basta. Si tus fechas son flexibles, dilo: suele jugar a tu favor.",
      },
      travellers: {
        label: "Viajeros",
        title: "¿Quién viaja y cómo te gustaría alojarte?",
        help: "",
      },
      budget: {
        label: "Presupuesto",
        title: "¿Con qué presupuesto trabajas?",
        help: "Por persona, sin vuelos internacionales. Un rango sincero nos permite proponerte algo real y no algo optimista.",
      },
      contact: {
        label: "Contacto",
        title: "¿Adónde te enviamos la propuesta?",
        help: "",
      },
      review: { label: "Resumen", title: "¿Está todo correcto?", help: "" },
    },

    legends: {
      tripType: "Tipo de viaje",
      duration: "¿Cuánto tiempo?",
      travellers: "Viajeros",
      accommodation: "¿Cómo te gustaría alojarte?",
      budget: "Presupuesto por persona",
    },

    tripTypes: {
      wildlife: {
        label: "Safari clásico",
        note: "Salidas en vehículo y los grandes parques",
      },
      honeymoon: { label: "Luna de miel", note: "Intimidad, confort y costa" },
      family: { label: "Viaje en familia", note: "Al ritmo de los niños" },
      adventure: {
        label: "Aventura",
        note: "A pie, acampada, rutas remotas",
      },
      kilimanjaro: { label: "Kilimanjaro", note: "Ascender la montaña" },
      culture: { label: "Cultura y comunidad", note: "Gente, cocina y lugar" },
      "safari-and-zanzibar": {
        label: "Safari y Zanzíbar",
        note: "Primero la llanura, después el océano",
      },
      "not-sure": { label: "Aún no lo sé", note: "Ayúdanos a decidirlo" },
    },

    durations: {
      "under-7": { label: "Menos de una semana" },
      "7-9": { label: "7 – 9 días" },
      "10-14": { label: "10 – 14 días" },
      "15-plus": { label: "Más de dos semanas" },
      unsure: { label: "Sin decidir" },
    },

    accommodationStyles: {
      camp: {
        label: "Campamentos de tiendas",
        note: "Lona, cerca de la fauna",
      },
      lodge: { label: "Lodges", note: "Comodidad y una cama de verdad" },
      boutique: {
        label: "Boutique y diseño",
        note: "Alojamientos pequeños y con carácter",
      },
      mixed: { label: "Una mezcla", note: "Estilos distintos a lo largo de la ruta" },
      guidance: { label: "Aconsejadme", note: "Os propondremos lo que encaje" },
    },

    budgets: {
      "under-3000": { label: "Menos de 3.000 $" },
      "3000-5000": { label: "3.000 – 5.000 $" },
      "5000-8000": { label: "5.000 – 8.000 $" },
      "8000-plus": { label: "Más de 8.000 $" },
      open: { label: "Abierto — aconsejadme" },
    },

    fields: {
      month: "¿Más o menos cuándo?",
      adults: "Adultos",
      children: "Niños",
      childrenHint: "Menores de 18",
      firstName: "Nombre",
      lastName: "Apellidos",
      email: "Correo electrónico",
      phone: "Teléfono o WhatsApp",
      country: "País",
      replyIn: "Respondedme en",
      notes: "¿Algo más que debamos saber?",
      notesPlaceholder:
        "Celebraciones, necesidades alimentarias, movilidad, fotografía, animales que esperas ver…",
    },

    errors: {
      tripType:
        "Elige el tipo de viaje que tienes en mente, o «Aún no lo sé».",
      travelMonth:
        "Dinos un mes aproximado, o marca «mis fechas son flexibles».",
      durationDays: "¿Más o menos cuánto tiempo quieres viajar?",
      adultsMin: "Tiene que viajar al menos un adulto.",
      adultsMax:
        "Para grupos de más de veinte personas, escríbenos directamente: lo planificamos de otra forma.",
      accommodationStyle: "Elige un estilo de alojamiento, o pídenos consejo.",
      budgetPerPerson: "Elige un rango, o «Abierto — aconsejadme».",
      firstName: "Necesitamos un nombre al que responder.",
      emailMissing: "Necesitamos un correo al que enviarte la propuesta.",
      emailInvalid: "Ese correo no parece correcto: revísalo, por favor.",
      consent:
        "Confirma que podemos usar estos datos para responder a tu solicitud.",
    },

    review: {
      journey: "Viaje",
      destinations: "Destinos",
      when: "Cuándo",
      length: "Duración",
      travellers: "Viajeros",
      stays: "Alojamiento",
      budget: "Presupuesto",
      contact: "Contacto",
      notes: "Notas",
      edit: "Editar",
      flexible: "Flexibles",
      notGiven: "Sin indicar",
      openToSuggestions: "Abierto a sugerencias",
      adultCount: { one: "{n} adulto", other: "{n} adultos" },
      childCount: { one: ", {n} niño", other: ", {n} niños" },
    },

    summary: {
      heading: "Solicitud de viaje — Maisha Quest",
      name: "Nombre",
      email: "Correo",
      phone: "Teléfono",
      country: "País",
      replyIn: "Responder en",
      journeyType: "Tipo de viaje",
      budgetPerPerson: "Presupuesto por persona",
    },

    status: {
      sentTitle: "Tu solicitud está con nosotros.",
      sentBody:
        "Gracias, {name}. Alguien del equipo en Arusha la leerá con calma y te responderá: no con una plantilla, con una ruta.",
      reference: "Tu referencia es",
      unconfiguredTitle: "Casi — este formulario aún no está conectado.",
      unconfiguredBody:
        "No vamos a decirte que tu solicitud se ha enviado cuando no es así. El punto de envío todavía no está conectado a un correo ni a un CRM, así que no nos ha llegado nada. Abajo tienes tus respuestas, listas para enviar: un toque y salen.",
      sendByEmail: "Enviar por correo",
      sendOnWhatsApp: "Enviar por WhatsApp",
      yourAnswers: "Tus respuestas",
      sendFailed: "No hemos podido enviarlo ahora mismo.",
      offline:
        "No hemos podido conectar con nuestro servidor. Comprueba tu conexión e inténtalo de nuevo.",
      orEmailUs: "También puedes escribirnos a",
      inTheMeantime: "Mientras tanto",
    },
  },

  contact: {
    title: "Habla con un experto local",
    lede:
      "Estamos en Arusha, no en un centro de llamadas. Escribas por donde escribas, lo verá uno de los fundadores.",
    phone: "Teléfono",
    email: "Correo electrónico",
    hours: "Horario",
    whereWeAre: "Dónde estamos",
    messageUs: "Escríbenos",
    languagesBody:
      "Planificamos y acompañamos en inglés y suajili, y también hablamos ruso y chino mandarín.",
    planningTitle: "¿Estás planeando un viaje?",
    planningBody:
      "El planificador lleva unos minutos y nos da todo lo necesario para responderte con una ruta real y no con un folleto.",
  },

  plan: {
    lede:
      "Sin compromiso y sin presupuestos automáticos. Una persona en Arusha lee cada solicitud y responde con una ruta.",
    customizeTitle: (name: string) => `Personalizar: ${name}`,
    customizeLede:
      "Hemos traído este viaje como punto de partida. Cambia lo que quieras: la ruta, el ritmo, la duración, el tipo de alojamiento.",
    steps: [
      {
        title: "Nos cuentas cómo lo imaginas",
        body: "Siete pasos breves: cuándo, cuánto tiempo, quién viaja y qué quieres sacar del viaje.",
      },
      {
        title: "Te respondemos con una ruta",
        body: "Un itinerario propuesto, con una idea honesta de lo que cuesta y lo que implica, escrito por una persona y no generado.",
      },
      {
        title: "Lo cambiamos hasta que encaje",
        body: "Tantas vueltas como hagan falta. No se confirma ni se paga nada hasta que estés conforme.",
      },
    ],
  },

  legal: {
    eyebrow: "Legal",
    notice: {
      before:
        "Esta página se está terminando con el asesor jurídico de Maisha Quest. Hasta entonces, las condiciones que se aplican a tu reserva son las que figuran por escrito en tu confirmación. Pídenos la versión vigente en",
      after: "y te la enviamos.",
    },
    pendingSection:
      "La redacción completa de este apartado está pendiente de revisión jurídica.",
    terms: {
      title: "Términos y condiciones",
      intro:
        "Las condiciones que se aplican cuando reservas un viaje con Maisha Quest.",
      sections: [
        {
          heading: "Con quién reservas",
          body: [
            "Maisha Quest es un operador turístico con sede en Arusha (Tanzania) que organiza safaris privados, ascensiones y estancias en la costa por todo el país.",
            "Aquí se publicarán los datos de registro mercantil y de la licencia de operador turístico.",
          ],
          pending: true,
        },
        {
          heading: "Presupuestos y confirmación",
          body: [
            "Un presupuesto es una propuesta, no una reserva. Precios, campamentos y disponibilidad se confirman por escrito antes de bloquear nada.",
          ],
          pending: true,
        },
        {
          heading: "Pago",
          body: [
            "Las condiciones de señal, saldo y formas de pago están pendientes.",
          ],
          pending: true,
        },
        {
          heading: "Cambios y cancelación",
          body: [
            "Las condiciones de cancelación dependen de los campamentos y los vuelos internos bloqueados para tu viaje, y se detallarán íntegramente en tu confirmación de reserva.",
          ],
          pending: true,
        },
        {
          heading: "Seguro",
          body: [
            "Todos los viajeros deben contratar un seguro de viaje y médico completo. La cobertura debe incluir evacuación médica y, para las ascensiones al Kilimanjaro, trekking hasta 6.000 metros.",
          ],
        },
        {
          heading: "Pasaporte, visados y salud",
          body: [
            "Cada viajero es responsable de tener un pasaporte válido y el visado correcto, y de cumplir los requisitos sanitarios de entrada. Te indicaremos las fuentes oficiales, pero no podemos asesorarte sobre tu caso concreto.",
          ],
        },
        {
          heading: "Seguridad en el safari",
          body: [
            "La fauna es salvaje. Los viajeros deben seguir en todo momento las indicaciones de su guía, también en el campamento, y ningún avistamiento está garantizado.",
          ],
        },
        {
          heading: "Responsabilidad y legislación aplicable",
          body: [
            "La ley aplicable y las cláusulas de responsabilidad están pendientes de revisión jurídica.",
          ],
          pending: true,
        },
      ],
    },
    privacy: {
      title: "Política de privacidad",
      intro:
        "Qué recogemos cuando nos escribes, para qué, y qué hacemos con ello.",
      sections: [
        {
          heading: "Qué recogemos",
          body: [
            "Cuando usas el planificador o nos escribes, recogemos lo que nos das: tu nombre, tu correo, un teléfono y un país opcionales, y los datos del viaje que estás considerando.",
            "En esta web no pedimos datos de pasaporte ni de pago.",
          ],
        },
        {
          heading: "Por qué lo guardamos",
          body: [
            "Para responder a tu consulta y, si reservas, organizar tu viaje. Ese es el único motivo. No vendemos ni cedemos tus datos a nadie.",
          ],
        },
        {
          heading: "Adónde va",
          body: [
            "Las solicitudes llegan a nuestro equipo en Arusha. Para organizar un viaje compartimos únicamente lo imprescindible con los campamentos, lodges, aerolíneas y guías de tu itinerario.",
          ],
        },
        {
          heading: "Cuánto tiempo lo conservamos",
          body: [
            "Los plazos de conservación están pendientes de revisión jurídica.",
          ],
          pending: true,
        },
        {
          heading: "Tus derechos",
          body: [
            "Puedes pedirnos qué datos tenemos sobre ti, pedir que los corrijamos o que los borremos. Escríbenos a la dirección que aparece al pie de esta página y lo tramitamos.",
          ],
        },
        {
          heading: "El borrador guardado en tu navegador",
          body: [
            "El planificador guarda tus respuestas en tu propio navegador para que no las pierdas si cierras la pestaña. Ese borrador se queda en tu dispositivo, no nos llega hasta que envías el formulario y se borra al hacerlo.",
          ],
        },
      ],
    },
    cookies: {
      title: "Política de cookies",
      intro: "Qué guarda esta web en tu navegador.",
      sections: [
        {
          heading: "Esta web no pone cookies de seguimiento",
          body: [
            "Tal y como está construida, esta web no pone cookies publicitarias ni analíticas, y no carga rastreadores de terceros. Las tipografías se sirven desde el propio sitio y no desde un proveedor externo, y el mapa lo dibuja la web misma en lugar de pedirlo a un servicio de mapas.",
          ],
        },
        {
          heading: "Qué se guarda en local",
          body: [
            "El planificador guarda tus respuestas sin terminar en el almacenamiento local de tu navegador para que no las pierdas. No sale de tu dispositivo hasta que envías el formulario, y se elimina en cuanto lo haces. Borrar los datos del navegador lo elimina al instante.",
          ],
        },
        {
          heading: "Si más adelante se añade analítica",
          body: [
            "Si Maisha Quest añade herramientas de analítica o publicidad, esta página se actualizará y se incorporará un aviso de consentimiento antes de instalar ninguna cookie de ese tipo.",
          ],
          pending: true,
        },
      ],
    },
  },

  credits: {
    eyebrow: "Créditos",
    title: "Créditos fotográficos",
    lede:
      "Las imágenes de este sitio son fotografías documentales provisionales de Tanzania, usadas bajo licencia Creative Commons mientras se prepara la fotografía propia de Maisha Quest.",
    sourceAndLicence: "Ficha y licencia",
    body:
      "Cada imagen se eligió porque su ficha de origen acredita tanto el país como el sujeto, de modo que en esta web no aparece ninguna especie ni paisaje ajeno a Tanzania. Ninguna de estas fotografías la tomó Maisha Quest, y en ninguna aparecen viajeros, guías, vehículos ni campamentos de Maisha Quest.",
    allOwn: "Toda la fotografía de este sitio es ya material propio de Maisha Quest.",
  },

  meta: {
    keywords: [
      "safari Tanzania",
      "safari privado Tanzania",
      "safari Serengeti",
      "cráter del Ngorongoro",
      "ascensión al Kilimanjaro",
      "safari y Zanzíbar",
      "safari a medida Arusha",
    ],
    home: {
      title: "Maisha Quest · Safaris privados en Tanzania",
      description:
        "Viajes privados por Tanzania, guiados por expertos locales y diseñados en torno a tu historia. Serengeti, Ngorongoro, Tarangire, Kilimanjaro y Zanzíbar, planificados desde Arusha.",
      ogTitle: "Viajes privados por Tanzania · Maisha Quest",
      ogDescription:
        "Guiados por expertos locales. Pensados para ti. Safaris a medida por toda Tanzania, desde un equipo con base en Arusha.",
    },
    safaris: {
      title: "Safaris",
      description:
        "Todos los viajes privados que diseñamos en Tanzania, agrupados por la forma en que te gusta viajar. Aquí no hay salidas fijas.",
    },
    destinations: {
      title: "Destinos",
      description:
        "Nueve lugares de Tanzania: el circuito norte, los parques del sur, el Kilimanjaro y la costa del Índico.",
    },
    experiences: {
      title: "Experiencias",
      description:
        "Salidas en vehículo, safaris a pie, vuelos en globo, jornadas culturales, el Kilimanjaro y la costa de Zanzíbar: las formas de vivir un día en Tanzania.",
    },
    about: {
      title: "Sobre nosotros",
      description:
        "Maisha Quest es una empresa de safaris tanzana con sede en Arusha. Maisha significa vida: construimos viajes privados en torno a quién eres y a cómo quieres viajar.",
    },
    team: {
      title: "El equipo",
      description:
        "Talisa Tufts, Frank Lyatuu y Tina Ngabo: los fundadores de Maisha Quest, con base en Arusha (Tanzania).",
    },
    impact: {
      title: "Impacto",
      description:
        "Maisha Quest Cares: guías y proveedores tanzanos, visitas a comunidades acordadas directamente y el trabajo educativo y de conservación que Maisha Quest está construyendo alrededor de sus viajes.",
    },
    journal: {
      title: "Diario",
      description:
        "Guías de planificación de nuestro equipo en Arusha: dónde está la migración mes a mes, cómo elegir una ruta al Kilimanjaro y viajar por Tanzania en la estación verde.",
    },
    contact: {
      title: "Contacto",
      description:
        "Habla con Maisha Quest en Arusha (Tanzania). Teléfono, correo y WhatsApp, atendidos por el equipo que acompañará tu viaje.",
    },
    plan: {
      title: "Diseña tu viaje",
      description:
        "Siete pasos breves que lee una persona en Arusha, uno por uno. Sin presupuestos automáticos y sin compromiso.",
    },
    faq: {
      title: "Preguntas frecuentes",
      description:
        "Cuándo visitar Tanzania, con cuánta antelación reservar, qué significa un safari privado, visados, vacunas y qué llevar, respondido por nuestro equipo en Arusha.",
    },
  },

  notFound: {
    title: "Fuera del mapa",
    body:
      "Esta página no existe, o cambió de sitio cuando rehicimos la web. Prueba con una de estas.",
    contact: "Contacta con nosotros",
  },

  about: {
    heroTitle: "Guiados por Tanzania. Pensados para ti.",
    heroLede:
      "Maisha Quest nació en Arusha, al pie del monte Meru. Somos un equipo local pequeño que construye viajes privados para quien busca algo más que una salida fija.",
    lede:
      "Maisha Quest se traduce aproximadamente como el viaje de la vida, y esa es toda la idea. Un safari no es un producto que se compra de un estante: es un tramo de tu vida en un lugar extraordinario, y merece construirse como tal.",
    compass:
      "Nuestros fundadores lo describen como vivir la vida con una brújula: elegir una dirección en lugar de seguir una ruta fija. Así planificamos: partimos de adónde quieres llegar, no de un catálogo de paquetes.",
    ground:
      "Todo se organiza desde Arusha, sobre el terreno. Nuestros guías, vehículos y proveedores son tanzanos, y quien responde a tu primer correo es quien te recibe en el aeropuerto.",
    meetTeam: "Conoce al equipo",
    howWeWork: "Cómo trabajamos",
    people: "Las personas",
    readStories: "Lee sus historias",
    talkTitle: "Hablemos",
    talkBody: (timezone: string, hours: string) =>
      `Estamos en Arusha, ${timezone}, ${hours}. La forma más rápida de empezar es contarnos más o menos cuándo quieres viajar y qué te importa.`,
    contactDetails: "Datos de contacto",
  },

  journal: {
    title: "Notas desde Arusha",
    lede:
      "Escritos prácticos sobre viajar por Tanzania: las preguntas que más nos hacen, respondidas como es debido y no en un párrafo.",
    pendingTitle:
      "Nuestro equipo en Arusha está escribiendo este artículo y se publicará aquí en breve.",
    pendingBody:
      "Si necesitas la respuesta antes, pregúntanos: es una duda que resolvemos a viajeros cada semana, y preferimos contártelo bien a que esperes a una entrada de blog.",
    more: "Más del diario",
  },

  faq: {
    title: "Las preguntas que más nos hacen",
    lede:
      "Respuestas directas. Cuando algo depende de tu pasaporte, tu salud o tus fechas, lo decimos y te remitimos a la fuente oficial en lugar de suponer.",
    stillTitle: "¿Sigues sin respuesta?",
    stillBefore: "Escríbenos a",
    stillAfter: (phone: string, timezone: string) =>
      `o llama al ${phone}. Estamos en Arusha, ${timezone}.`,
  },

  impact: {
    noNumbers:
      "No vamos a poner en esta página cifras que no podamos sostener. A medida que cada programa dé resultados que podamos documentar —colegios apoyados, personas empleadas, proyectos financiados— se publicarán aquí con el detalle que los respalde.",
    askCta: "Pregúntanos por nuestros proyectos",
  },

  regions: {
    northern: "Circuito norte",
    southern: "Circuito sur",
    coast: "Costa e islas",
    gateway: "Puerta de entrada",
  },
  accommodation: {
    "Mobile camp": "Campamento móvil",
    "Tented camp": "Campamento de tiendas",
    Lodge: "Lodge",
    "Boutique lodge": "Lodge boutique",
    "Beach resort": "Resort de playa",
    "City hotel": "Hotel urbano",
  },
  meals: {
    breakfast: "Desayuno",
    lunch: "Comida",
    dinner: "Cena",
  },
  impactAreas: {
    education: "Educación",
    conservation: "Conservación",
    community: "Comunidad",
    employment: "Empleo local",
  },
  faqTopics: {
    planning: "Planificación",
    travel: "Viaje",
    safari: "Safari",
    health: "Salud y seguridad",
    payment: "Pago",
  },
  categories: {
    wildlife: "Fauna",
    adventure: "Aventura",
    luxury: "Lujo",
    honeymoon: "Luna de miel",
    family: "Familia",
    culture: "Cultura",
    kilimanjaro: "Kilimanjaro",
    "safari-and-zanzibar": "Safari y Zanzíbar",
  },
  languageNames: {
    English: "Inglés",
    Swahili: "Suajili",
    Russian: "Ruso",
    "Mandarin Chinese": "Chino mandarín",
    Spanish: "Español",
    German: "Alemán",
    French: "Francés",
  },

  video: {
    play: "Reproducir",
    pause: "Pausar",
    unmute: "Activar el sonido",
    mute: "Silenciar",
  },

  team: {
    languages: "Idiomas",
    specialty: "Especialidad",
    favouritePlace: "Lugar favorito de Tanzania",
    portraitOf: (name: string) => `Retrato de ${name}`,
    pageTitle: "Las personas que hay detrás de tu viaje",
    crewTitle: "Guías, conductores y equipo",
    crewBody:
      "Cada viaje lo llevan guías y conductores tanzanos con los que trabajamos directamente. En el Kilimanjaro, cómo se retribuye a una cuadrilla y cuánto carga forma parte de elegirla. Aquí se publicarán los perfiles del resto del equipo.",
    startPlanning: "Empezar a planificar",
  },

  safari: {
    itineraryPending:
      "Nuestro equipo en Arusha está terminando el itinerario día a día de este viaje. Pídenoslo y te enviamos la versión actual.",
    stay: "Alojamiento",
    stayPending: "Se confirma con tu propuesta",
    meals: "Comidas",
    time: "Tiempo",
    collectionOf: (name: string) => `Colección ${name}`,
    style: "Estilo",
    theJourney: "El viaje",
    dayByDay: "Día a día",
    whereYouStay: "Dónde te alojas",
    whereYouStayBody: (style: string) =>
      `Este viaje está pensado en torno a alojamiento de tipo ${style.toLowerCase()}. Los campamentos y lodges concretos te los proponemos junto con el itinerario, elegidos por dónde están en la ruta y por lo que haya disponible en tus fechas, en lugar de nombrar aquí establecimientos que quizá no podamos bloquear.`,
    gallery: "Galería",
    theRoute: "La ruta",
    included: "Qué incluye",
    notIncluded: "No incluye",
    practical: "Práctico",
    commonQuestions: "Preguntas habituales",
    whatTravellersSaid: "Lo que dijeron los viajeros",
    noReviews:
      "Todavía no hay opiniones publicadas de este viaje, y no vamos a escribir una nosotros. Pregúntanos y te ponemos en contacto con viajeros que lo han hecho.",
    similarJourneys: "Viajes parecidos",
    askQuestion: "Hacer una pregunta",
  },

  home: {
    hero: {
      headline: ["Viajes privados", "por Tanzania"],
      subline: "Guiados por expertos locales. Pensados para tu historia.",
      designCta: "Diseña tu safari",
      exploreCta: "Ver los viajes",
      pillars: ["Expertos locales", "Safaris privados", "Viaje responsable"],
      scroll: "Desliza",
    },
    maisha: {
      eyebrow: "Nuestro nombre",
      meansLife: "significa vida.",
      lede:
        "Cada viaje es una oportunidad de descubrir, conectar y vivir más plenamente. Creamos safaris privados por Tanzania a la medida de quién eres y de cómo quieres viajar.",
      body:
        "Maisha Quest nació en Arusha, al pie del monte Meru y al principio del circuito norte. Somos un equipo pequeño: quien responde a tu primer correo es quien te recibe en el aeropuerto.",
      cta: "Conoce Maisha Quest",
    },
    experiences: {
      eyebrow: "Empieza aquí",
      title: "¿Cómo quieres vivir Tanzania?",
      lede:
        "Cada viaje que construimos empieza por esta pregunta y no por un paquete. Elige el que más se te parezca: luego puedes combinarlos.",
      carouselLabel: "Formas de vivir Tanzania",
    },
    collections: {
      eyebrow: "Las colecciones Maisha",
      title: "Tres formas de viajar por Tanzania",
      lede:
        "No son tres niveles de precio, son tres temperamentos. Casi todo el mundo sabe cuál es el suyo al terminar la primera línea.",
      explore: (name: string) => `Descubre ${name}`,
    },
    featured: {
      eyebrow: "Viajes destacados",
      title: "Viajes que se recuerdan",
      lede:
        "Aquí no hay salidas fijas. Cada uno es una forma de viaje que sabemos que funciona.",
    },
    map: {
      eyebrow: "El mapa",
      title: "Encuentra tu lugar en Tanzania",
      lede:
        "Nueve lugares, cuatro circuitos y una costa. Elige uno para ver cuándo ir, qué habita allí y qué viajes pasan por él.",
      bestTime: "Mejor época",
      wildlife: "Fauna",
      journeysHere: "Viajes que pasan por aquí",
      chooseDestination: "Elige un destino",
      dayCount: (n: number) => (n === 1 ? "1 día" : `${n} días`),
      moreOn: (place: string) => `Más sobre ${place}`,
    },
    film: {
      eyebrow: "La película",
      title: "Un país. Infinitas formas de sentirse vivo.",
      watch: "Ver el viaje",
      cta: "Ver las experiencias",
      threads: [
        { label: "Fauna", note: "La llanura y lo que la cruza." },
        { label: "Cultura", note: "Tiempo con quienes viven aquí." },
        { label: "Aventura", note: "A pie, en el agua, en la montaña." },
        { label: "Océano", note: "Donde el viaje baja el ritmo." },
        { label: "Conexión", note: "La razón de que todo lo demás importe." },
      ],
    },
    why: {
      eyebrow: "Por qué Maisha Quest",
      title: "Tu viaje, en buenas manos",
      lede:
        "Somos una empresa tanzana. No es una frase de marketing: cambia quién responde al teléfono, quién conduce el vehículo y adónde va el dinero.",
      pillars: [
        {
          title: "Expertos con base en Tanzania",
          body:
            "Nuestras rutas salen de conducirlas, no de un folleto.",
        },
        {
          title: "Itinerarios a medida",
          body:
            "Cada viaje se construye desde cero en torno a tu ritmo, tus intereses y tus fechas.",
        },
        {
          title: "Atención multilingüe",
          body:
            "Planificación y correspondencia en inglés y suajili. Talisa habla además ruso y chino mandarín.",
        },
        {
          title: "Alojamientos elegidos uno a uno",
          body:
            "Campamentos y lodges elegidos por dónde están, cómo se llevan y lo que se ve desde ellos.",
        },
        {
          title: "Viaje local y responsable",
          body:
            "Guías locales, proveedores locales y comunidades implicadas en lugar de fotografiadas.",
        },
        {
          title: "Apoyo de la llegada a la salida",
          body:
            "Un mismo equipo desde tu primer mensaje hasta tu vuelo de vuelta: quien planifica tu viaje es quien te responde.",
        },
      ],
    },
    team: {
      eyebrow: "El equipo",
      title: "Conoce a quienes hay detrás de tu viaje",
      lede:
        "Tres fundadores en Arusha. Entre ellos cubren el diseño del viaje, la operativa del safari y todo lo que se siente una vez sobre el terreno.",
      cta: "Todo el equipo",
    },
    impact: {
      eyebrow: "Maisha Quest Cares",
      watch: "Ver",
      cta: "Cómo funciona nuestro impacto",
      intro: {
        title: "Viajar y devolver algo",
        lede: "Tu viaje debería dejar Tanzania mejor de como la encontraste.",
        body:
          "Maisha Quest Cares es donde eso deja de ser un eslogan. Funciona sobre los mismos viajes que haces: guías y proveedores tanzanos, y visitas a comunidades acordadas directamente con quien las acoge.",
      },
    },
    testimonials: {
      eyebrow: "Viajeros",
      title: "Historias que vuelven a casa",
      lede:
        "Lo que contaron los viajeros al volver, publicado con su fuente para que puedas comprobarlo tú mismo.",
      emptyTitle:
        "Preferimos no enseñarte nada antes que enseñarte algo escrito por nosotros.",
      emptyBody:
        "Las opiniones se publicarán aquí según nos las envíen los viajeros, cada una con el enlace a donde se publicó originalmente. Mientras tanto, pregúntanos y te ponemos en contacto con alguien que ha viajado con nosotros.",
      emptyBodyWithSources:
        "Las opiniones se publicarán aquí según nos las envíen los viajeros, cada una con el enlace a donde se publicó originalmente. Mientras tanto, búscanos en las plataformas de abajo, o pregúntanos y te ponemos en contacto con alguien que ha viajado con nosotros.",
      speakDirectly: "Habla directamente con nosotros",
      askReferences: "Pedir referencias",
      verified: "Opinión verificada",
      rated: (n: number) => `Valorado con ${n} sobre 5`,
    },
    planner: {
      eyebrow: "Planifica tu viaje",
      title: "Diseñemos tu viaje",
      lede:
        "Siete pasos breves. Sin compromiso y sin presupuestos automáticos: una persona en Arusha los lee uno a uno y responde con una ruta.",
      ratherTalk: "¿Prefieres hablar?",
    },
    closing: {
      title: "Tu historia en Tanzania empieza aquí.",
      concept: "Guiados por Tanzania. Pensados para ti.",
    },
  },

  common: {
    priceOnRequest: "Precio bajo consulta",
    sampleItinerary: "Itinerario orientativo",
    from: "Desde",
    days: "días",
    day: "Día",
    nights: "noches",
    readMore: "Leer más",
    viewJourney: "Ver el viaje",
    customize: "Personalizar",
    customizeThis: "Personalizar este viaje",
    backToCatalogue: "Volver a todos los safaris",
    exploreAll: "Ver todos los safaris",
    suits: "Ideal para",
    bestTime: "Mejor época",
    duration: "Duración",
    route: "Ruta",
    accommodation: "Alojamiento",
    wildlife: "Fauna",
    experiencesHere: "Experiencias aquí",
    minutesRead: "min de lectura",
    dayCount: (n: number) => (n === 1 ? "1 día" : `${n} días`),
    dayLabel: (n: number) => `Día ${n}`,
    durationRange: ([min, max]: [number, number]) =>
      min === max ? `${min} días` : `${min}–${max} días`,
    safariMeta: (style: string) => `Safari privado · alojamiento en ${style.toLowerCase()}`,
    fromPerPerson: (price: string) => `Desde ${price} por persona`,
    draftNotice:
      "Itinerario orientativo: la ruta y las fechas definitivas se confirman contigo.",
    readingTime: (n: number) => `${n} min de lectura`,
  },
};
