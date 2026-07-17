// Diccionario de traducción — Español (idioma por defecto).
// Estructura de referencia: cualquier idioma nuevo (src/lib/i18n/<locale>.ts)
// debe cumplir el tipo `Translations` derivado de este archivo (ver types.ts).
export const es = {
  nav: {
    links: [
      { href: "#historia", label: "Historia" },
      { href: "#especialidades", label: "Especialidades" },
      { href: "#experiencia", label: "Experiencia" },
      { href: "#galeria", label: "Galería" },
      { href: "#opiniones", label: "Opiniones" },
      { href: "#ubicacion", label: "Ubicación" },
    ],
    reserve: "Reservar mesa",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  hero: {
    kicker: "Guargacho · San Miguel de Abona · Tenerife",
    titleLine1: "México no se explica.",
    titleLine2: "Se vive.",
    subtitle: "Descubre una experiencia gastronómica auténtica en Tenerife.",
    reserve: "Reservar mesa",
    viewMenu: "Ver carta",
    scroll: "Desliza",
  },

  historia: {
    label: "Nuestra historia",
    titleLine1: "México, servido",
    titleLine2: "con calma y carácter.",
    paragraph:
      "En Guargacho cocinamos como se ha cocinado siempre en México: con fuego lento, producto de verdad y ganas de compartir. Cada mesa se atiende como si fuera la primera vez que abrimos las puertas — con el mismo cuidado, el mismo sabor y el mismo ambiente cercano que nos define desde el primer día.",
    pillars: [
      { title: "Tradición", text: "Desde 1999, la misma cocina de siempre." },
      { title: "Sabor auténtico", text: "Recetas mexicanas, sin atajos." },
      { title: "Familia", text: "Se cocina y se sirve como en casa." },
    ],
  },

  especialidades: {
    label: "Especialidades",
    title: "Lo que nos define",
    moreOnMenu: (n: number) => `+${n} más en la carta`,
    disclaimer:
      "Precios orientativos, sujetos a variación. Carta completa disponible en sala.",
    categories: [
      {
        slug: "entrantes",
        icon: "plate",
        title: "Entrantes",
        description: "Para abrir boca y compartir en el centro.",
        dishes: [
          { name: "Nachos auténticos", price: "12,50 €" },
          {
            name: "Queso fundido con champiñones y cuitlacoche",
            price: "15 €",
          },
          { name: "Flautas de pollo", price: "16 €" },
          { name: "Cóctel de gambas estilo Acapulco", price: "13 €" },
          { name: "Sincronizadas", price: "10 €" },
          { name: "Gringa", price: "16 €" },
          { name: "Paquete Primerizos", price: "20 €" },
        ],
      },
      {
        slug: "tacos",
        icon: "taco",
        title: "Tacos",
        description: "Maíz, brasa y salsa. La base de todo.",
        dishes: [
          { name: "Tres tacos de maíz", price: "12 €" },
          { name: "Tacos de pescado Baja California", price: "13 €" },
        ],
      },
      {
        slug: "burritos",
        icon: "burrito",
        title: "Burritos",
        description: "Generosos, envueltos a mano.",
        dishes: [{ name: "Burrito", price: "16 €" }],
      },
      {
        slug: "enchiladas",
        icon: "enchilada",
        title: "Enchiladas",
        description: "Bañadas en salsa, al horno.",
        dishes: [
          { name: "Verdes", price: "18 €" },
          { name: "Tradicionales", price: "18 €" },
          { name: "Mole", price: "18 €" },
          { name: "Suizas", price: "18 €" },
          { name: "Chipotle y cacahuete", price: "18 €" },
          { name: "Cuitlacoche", price: "18 €" },
        ],
      },
      {
        slug: "carnes",
        icon: "flame",
        title: "Carnes",
        description: "A la parrilla, con carácter.",
        dishes: [],
      },
      {
        slug: "especialidades",
        icon: "sparkles",
        title: "Especialidades",
        description: "Los platos insignia de la casa.",
        dishes: [],
      },
      {
        slug: "postres",
        icon: "dessert",
        title: "Postres",
        description: "El cierre dulce de la noche.",
        dishes: [
          { name: "Pastel Tres Leches", price: "7,50 €" },
          { name: "Flan de elote", price: "7 €" },
          { name: "Tarta de queso con tamarindo y mezcal", price: "7,50 €" },
          { name: "Crema de mango", price: "7 €" },
          { name: "Yogur griego con guayaba", price: "6 €" },
          { name: "Crepas de cajeta", price: "7 €" },
          { name: "Tarta de chocolate", price: "7,50 €" },
        ],
      },
      {
        slug: "bebidas",
        icon: "cocktail",
        title: "Bebidas",
        description: "Margaritas, cervezas y algo más.",
        dishes: [],
      },
    ],
  },

  experiencia: {
    label: "La experiencia",
    titleLine1: "No servimos platos.",
    titleLine2: {
      pre: "Servimos ",
      word1: "momentos",
      mid: " para ",
      word2: "compartir",
      post: ".",
    },
    moments: [
      {
        n: "01",
        title: "Compartir",
        text: "La mesa se llena de platos para el centro, hechos para pasar de mano en mano.",
      },
      {
        n: "02",
        title: "Celebrar",
        text: "Cumpleaños, reencuentros, un viernes cualquiera que merece serlo todo.",
      },
      {
        n: "03",
        title: "Vivir",
        text: "Luz baja, música suave, tiempo de sobra. Así se queda una noche en la memoria.",
      },
    ],
  },

  galeria: {
    label: "Galería",
    title: "Un vistazo a la casa",
    close: "Cerrar",
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    expand: (label: string) => `Ampliar imagen: ${label}`,
    items: [
      { label: "Sala principal", ratio: "4/5" },
      { label: "Tacos al pastor", ratio: "1/1" },
      { label: "Terraza", ratio: "4/5" },
      { label: "Fajitas en sartén", ratio: "1/1" },
      { label: "Margaritas", ratio: "1/1" },
      { label: "Ambiente de noche", ratio: "4/5" },
    ],
  },

  reservas: {
    label: "Reservas",
    title: "Reserva tu mesa",
    paragraph:
      "Cuéntanos cuándo quieres venir y te confirmaremos la reserva. Si lo prefieres, también puedes llamarnos directamente.",
    callWhatsapp: "Reservar por WhatsApp",
    successTitle: "Solicitud recibida",
    successBody: (phone: string) =>
      `Gracias, hemos registrado tu solicitud de reserva. Te confirmaremos la mesa lo antes posible. Si tu reserva es urgente, llámanos directamente al ${phone}.`,
    newReservation: "Hacer otra reserva",
    errorBody: (phone: string) =>
      `No hemos podido enviar tu solicitud. Prueba de nuevo o llámanos al ${phone}.`,
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email (opcional)",
      emailPlaceholder: "tu@email.com",
      phone: "Teléfono",
      phonePlaceholder: "600 000 000",
      guests: "Número de personas",
      guestsPlaceholder: "2",
      date: "Fecha",
      time: "Hora",
      notes: "Comentarios",
      notesPlaceholder: "Alergias, ocasión especial, silla para bebé…",
      submit: "Reservar mesa",
      submitting: "Enviando…",
    },
  },

  opiniones: {
    label: "Opiniones",
    title: "Confianza real, verificada.",
    outOf5: "/ 5",
    countLabel: (n: number) => `Más de ${n} opiniones verificadas`,
    connecting: "Conectando reseñas verificadas…",
    viewReviews: "Ver opiniones",
    syncNote:
      "Las opiniones mostradas se sincronizarán automáticamente con Google cuando se active la integración de Google Places.",
    googleTitle: "Lo que dicen en Google",
    googleCount: (n: number) => `${n} reseñas en Google`,
    viewOnGoogle: "Ver reseñas en Google",
  },

  ubicacion: {
    label: "Ubicación",
    title: "Te esperamos en Guargacho",
    address: "Dirección",
    phone: "Teléfono",
    fromAbroad: "Desde el extranjero:",
    hours: "Horario",
    hoursText:
      "Lun, mar y jue: 19:00–23:00 · Vie y sáb: 13:00–16:00 y 19:00–23:30 · Dom: 13:00–16:00 · Miércoles: cerrado",
    directions: "Cómo llegar",
    mapTitle: (name: string) => `Mapa — ${name}`,
  },

  ctaFinal: {
    titleLine1: "Cada mesa cuenta una historia.",
    titleLine2Pre: "La próxima puede ser",
    titleLine2Word: "la tuya",
    button: "Reservar ahora",
  },

  footer: {
    tagline:
      "Cocina mexicana auténtica desde 1999, en el corazón de Guargacho.",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    location: "Ubicación",
    followUs: "Síguenos",
    rights: (year: number, name: string) =>
      `© ${year} ${name}. Todos los derechos reservados.`,
    privacy: "Política de privacidad",
  },
};
