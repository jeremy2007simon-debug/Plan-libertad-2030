// Propuesta de diseño para Azzurro — no hay datos reales del restaurante
// todavía. Todo lo marcado como "pendiente" es un marcador de posición a
// sustituir por la información real antes de publicar esta web. No se ha
// inventado ninguna dirección, teléfono, horario, premio ni año de
// apertura: donde falta el dato, se muestra un texto neutro en su lugar.

export const RESTAURANT = {
  name: "Azzurro",
  shortName: "Azzurro",
  tagline: "Restaurante italiano",

  // TODO: sustituir por el teléfono real. Mientras tanto no se muestra
  // ningún número inventado.
  phone: null as string | null,
  phoneHref: null as string | null,
  whatsappHref: null as string | null,

  // TODO: sustituir por la dirección real.
  address: {
    line1: "Dirección pendiente de confirmar",
    line2: null as string | null,
    full: null as string | null,
  },

  // TODO: sustituir por el horario real.
  hours: null as string | null,

  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },

  // Sin dirección confirmada no se genera ningún enlace de mapa: se
  // muestra un panel a la espera de activarse.
  mapsEmbedSrc: null as string | null,
  mapsDirectionsHref: null as string | null,
  googleReviewsSearchHref: null as string | null,
} as const;

// Sin testimonios inventados: esta sección queda preparada para las
// reseñas reales (ver src/lib/reviews.ts) y muestra un estado de espera
// mientras no haya ninguna fuente conectada.
export const CURATED_REVIEWS = [] as const;

// Categorías de la carta. Sin platos ni precios inventados — cada
// categoría se describe en una frase breve, a la espera de la carta real.
export const SPECIALTIES = [
  {
    slug: "pizza",
    title: "Pizza",
    description: "Masa de fermentación lenta, horneada al momento.",
    icon: "pizza",
  },
  {
    slug: "pasta",
    title: "Pasta",
    description: "Fresca, artesanal, hecha cada día en casa.",
    icon: "pasta",
  },
  {
    slug: "carnes",
    title: "Carnes",
    description: "Cortes seleccionados, cocinados con precisión.",
    icon: "flame",
  },
  {
    slug: "pescados",
    title: "Pescados",
    description: "Producto fresco, tratado con respeto.",
    icon: "fish",
  },
  {
    slug: "postres",
    title: "Postres",
    description: "El cierre justo para una sobremesa larga.",
    icon: "dessert",
  },
  {
    slug: "vinos",
    title: "Vinos",
    description: "Una bodega pensada para acompañar cada plato.",
    icon: "wine",
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
