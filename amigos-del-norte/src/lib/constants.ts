// Datos reales del restaurante. Centralizados aquí para no repetirlos
// por el código — cualquier cambio (teléfono, dirección...) se hace una vez.

export const RESTAURANT = {
  name: "Restaurante Amigos del Norte",
  shortName: "Amigos del Norte",
  phone: "922 73 56 19",
  phoneHref: "tel:+34922735619",
  // El teléfono facilitado es un fijo (prefijo 922, Tenerife). wa.me solo
  // funciona si ese número tiene WhatsApp Business habilitado — confirmar
  // con el restaurante y sustituir por el móvil correcto si procede.
  whatsappHref: "https://wa.me/34922735619",
  address: {
    line1: "Las Chafiras",
    line2: "San Miguel de Abona, Tenerife",
    full: "Las Chafiras, San Miguel de Abona, Santa Cruz de Tenerife",
  },
  // Sin horario confirmado por el cliente: no se inventa, se deja pendiente.
  hours: null as string | null,
  social: {
    // TODO: añadir los enlaces reales de Instagram y Facebook del restaurante.
    instagram: null as string | null,
    facebook: null as string | null,
  },
  mapsEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Las Chafiras, San Miguel de Abona, Tenerife") +
    "&output=embed",
  mapsDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Las Chafiras, San Miguel de Abona, Tenerife"),
  googleReviewsSearchHref:
    "https://www.google.com/search?q=" +
    encodeURIComponent("Restaurante Amigos del Norte Las Chafiras"),
} as const;

// Ejemplos y precios reales tomados de la carta digital del restaurante
// (restauranteamigosdelnorte.tucartadigital.com). Actualizar aquí si cambian.
export const SPECIALTIES = [
  {
    slug: "carnes-a-la-brasa",
    title: "Carnes a la brasa",
    description: "Cortes seleccionados, preparados al momento sobre brasa.",
    icon: "flame",
    examples: [
      { name: "Chuletón de novillo", price: "45,50 €" },
      { name: "Secreto ibérico", price: "19,95 €" },
      { name: "Parrillada mixta", price: "28,50 €" },
    ],
  },
  {
    slug: "comida-canaria",
    title: "Comida canaria",
    description: "Platos tradicionales de las islas, con producto local.",
    icon: "leaf",
    examples: [
      { name: "Queso de cabra", price: "6,95 €" },
      { name: "Garbanzas", price: "7,10 €" },
      { name: "Papas arrugadas", price: "Consultar" },
    ],
  },
  {
    slug: "pescados",
    title: "Pescados",
    description: "Pescado fresco preparado con recetas de siempre.",
    icon: "fish",
    examples: [
      { name: "Chocos a la plancha", price: "12,75 €" },
      { name: "Fogonero a la plancha", price: "10,75 €" },
    ],
  },
  {
    slug: "pollos-asados",
    title: "Pollos asados",
    description: "Asados lentamente hasta conseguir el punto justo.",
    icon: "drumstick",
    examples: [
      { name: "1/2 pollo con ensalada", price: "7,95 €" },
      { name: "Pollo asado", price: "11,00 €" },
    ],
  },
  {
    slug: "menu-infantil",
    title: "Menú infantil",
    description: "Pensado para que los más pequeños también disfruten.",
    icon: "smile",
    examples: [
      { name: "Bistec de cerdo", price: "7,50 €" },
      { name: "Escalope de ternera", price: "9,00 €" },
    ],
  },
  {
    slug: "comida-para-llevar",
    title: "Comida para llevar",
    description: "La misma calidad de sala, lista para llevar a casa.",
    icon: "bag",
    examples: [
      { name: "Pollo asado", price: "9,50 €" },
      { name: "1/2 pollo", price: "4,75 €" },
    ],
  },
  {
    slug: "celebraciones",
    title: "Celebraciones",
    description: "Espacio y atención cuidada para tus momentos especiales.",
    icon: "sparkles",
    examples: [],
  },
] as const;

export const GALLERY_PLACEHOLDERS = [
  { label: "Sala principal", ratio: "4/5" },
  { label: "Carnes a la brasa", ratio: "1/1" },
  { label: "Terraza", ratio: "4/5" },
  { label: "Comida canaria", ratio: "1/1" },
  { label: "Detalle de sala", ratio: "1/1" },
  { label: "Fachada", ratio: "4/5" },
] as const;
