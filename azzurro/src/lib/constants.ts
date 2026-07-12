// Datos de Azzurro. Los campos marcados como reales proceden de
// información pública verificada (dirección, teléfono, Facebook). Donde
// las fuentes no coinciden o no hay una cuenta oficial confirmada
// (horario, Instagram), se usa un dato provisional claramente señalado o
// se mantiene oculto — nunca se ha inventado un dato.

export const RESTAURANT = {
  name: "Restaurante Azzurro",
  shortName: "Azzurro",
  tagline: "Restaurante italiano",

  phone: "922 70 30 73",
  phoneIntl: "+34 922 70 30 73",
  phoneHref: "tel:+34922703073",
  whatsappHref: null as string | null,

  address: {
    complement: "C.C. El Paso, Local 2",
    street: "Avenida Claudio Delgado Díaz, 2",
    postalCode: "38639",
    locality: "Las Chafiras",
    municipality: "San Miguel de Abona",
    region: "Santa Cruz de Tenerife",
    country: "España",
    full: "Avenida Claudio Delgado Díaz, 2, Local 2 (C.C. El Paso), 38639 Las Chafiras, San Miguel de Abona, Santa Cruz de Tenerife",
  },

  // El horario encontrado en distintas fuentes públicas no coincide.
  // PENDIENTE DE CONFIRMACIÓN CON EL RESTAURANTE — usar este horario solo
  // como provisional hasta recibir confirmación directa del local.
  hours: {
    provisional: true,
    weekday: { label: "Lunes a sábado", value: "12:00 – 23:30" },
    sunday: { label: "Domingo", value: "12:00 – 20:00" },
    note: "Horario provisional, pendiente de confirmación con el restaurante.",
  },

  social: {
    // No se ha encontrado una cuenta de Instagram oficial confirmada —
    // se mantiene oculta en la web hasta poder verificarla.
    instagram: null as string | null,
    facebook: "https://www.facebook.com/azzurrolaschafiras/",
  },

  mapsEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "Azzurro, Avenida Claudio Delgado Díaz 2, 38639 Las Chafiras, San Miguel de Abona, Tenerife"
    ) +
    "&output=embed",
  mapsDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Azzurro, Avenida Claudio Delgado Díaz 2, 38639 Las Chafiras, San Miguel de Abona, Tenerife"
    ),
  tripadvisorSearchHref:
    "https://www.tripadvisor.es/Search?q=" +
    encodeURIComponent("Restaurante Azzurro Las Chafiras"),
} as const;

// Sin testimonios inventados: solo se muestra la valoración agregada
// verificada en Tripadvisor (nota y número de opiniones), nunca citas
// individuales que no se hayan podido confirmar.
export const AGGREGATE_REVIEWS = {
  source: "Tripadvisor",
  rating: 3.8,
  totalReviews: 53,
} as const;

// Carta — "Entrantes" son platos y precios reales verificados. El resto
// de categorías quedan preparadas (sin platos) a la espera de la carta
// oficial completa. No se inventan platos ni precios.
export const SPECIALTIES = [
  {
    slug: "entrantes",
    title: "Entrantes",
    description: "Para abrir la mesa, pensados para compartir.",
    icon: "starter",
    examples: [
      { name: "Ensalada de Solomillo estilo Thai", price: "20,70 €" },
      { name: "Rollito de Pato", price: "12,30 €" },
      { name: "Saquito de Marisco", price: "12,30 €" },
      { name: "Gyoza a la Plancha", price: "6,44 €" },
    ],
  },
  {
    slug: "pasta",
    title: "Pasta",
    description: "Fresca, artesanal, hecha cada día en casa.",
    icon: "pasta",
    examples: [],
  },
  {
    slug: "pizza",
    title: "Pizza",
    description: "Masa de fermentación lenta, horneada al momento.",
    icon: "pizza",
    examples: [],
  },
  {
    slug: "carnes",
    title: "Carnes",
    description: "Cortes seleccionados, cocinados con precisión.",
    icon: "flame",
    examples: [],
  },
  {
    slug: "pescados",
    title: "Pescados",
    description: "Producto fresco, tratado con respeto.",
    icon: "fish",
    examples: [],
  },
  {
    slug: "arroces",
    title: "Arroces",
    description: "De cocción lenta, para el centro de la mesa.",
    icon: "rice",
    examples: [],
  },
  {
    slug: "postres",
    title: "Postres",
    description: "El cierre justo para una sobremesa larga.",
    icon: "dessert",
    examples: [],
  },
  {
    slug: "vinos",
    title: "Vinos",
    description: "Una bodega pensada para acompañar cada plato.",
    icon: "wine",
    examples: [],
  },
  {
    slug: "bebidas",
    title: "Bebidas",
    description: "La carta líquida de la casa.",
    icon: "drink",
    examples: [],
  },
] as const;

// Los tres pilares de la experiencia — no hablan de platos, hablan de lo
// que se siente al sentarse a la mesa.
export const EXPERIENCE_PILLARS = [
  {
    title: "El tiempo",
    text: "Una mesa donde las horas se ralentizan.",
  },
  {
    title: "Compartir",
    text: "Platos pensados para el centro de la mesa.",
  },
  {
    title: "El ambiente",
    text: "Luz cálida, voces bajas, buena compañía.",
  },
] as const;

export const GALLERY_PLACEHOLDERS = [
  { label: "Sala principal", ratio: "4/5" },
  { label: "La barra", ratio: "1/1" },
  { label: "Detalle de mesa", ratio: "4/5" },
  { label: "La cocina", ratio: "1/1" },
  { label: "Terraza", ratio: "4/5" },
  { label: "La bodega", ratio: "1/1" },
] as const;
