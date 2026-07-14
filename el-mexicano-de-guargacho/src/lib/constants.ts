// Datos reales del restaurante. Centralizados aquí para no repetirlos
// por el código — cualquier cambio (teléfono, dirección...) se hace una vez.

export const RESTAURANT = {
  name: "El Mexicano de Guargacho",
  shortName: "El Mexicano",
  phone: "922 73 13 13",
  // Formato internacional, a mostrar junto al nacional (p. ej. en Ubicación).
  phoneIntl: "+34 922 73 13 13",
  phoneHref: "tel:+34922731313",
  // Teléfono fijo publicado por el restaurante. wa.me solo funciona si ese
  // número tiene WhatsApp Business habilitado — confirmar con el
  // restaurante y sustituir por el móvil correcto si procede.
  whatsappHref: "https://wa.me/34922731313",
  address: {
    line1: "Carretera General Guargacho, 84 — Edificio El Mexicano",
    line2: "38639 Guargacho, San Miguel de Abona, Tenerife",
    full: "Carretera General Guargacho, 84, Edificio El Mexicano, 38639 Guargacho, San Miguel de Abona, Santa Cruz de Tenerife, España",
  },
  // --------------------------------------------------------------------
  // HORARIO — PENDIENTE DE CONFIRMACIÓN.
  // Procede de fuentes públicas (perfil de Google Business y directorios),
  // no ha sido confirmado directamente por el restaurante. No publicar sin
  // validarlo antes con El Mexicano de Guargacho.
  // --------------------------------------------------------------------
  hours:
    "Lun, mar y jue: 19:00–23:00 · Vie y sáb: 13:00–16:00 y 19:00–23:30 · Dom: 13:00–16:00 · Miércoles: cerrado" as
      | string
      | null,
  // Mismo horario en formato Schema.org (openingHoursSpecification), usado
  // en StructuredData.tsx. Actualizar junto con `hours` si cambia — y
  // quitar este comentario de "pendiente de confirmación" en ambos sitios
  // en cuanto el restaurante lo valide.
  hoursSpec: [
    { dayOfWeek: ["Monday", "Tuesday", "Thursday"], opens: "19:00", closes: "23:00" },
    { dayOfWeek: ["Friday", "Saturday"], opens: "13:00", closes: "16:00" },
    { dayOfWeek: ["Friday", "Saturday"], opens: "19:00", closes: "23:30" },
    { dayOfWeek: ["Sunday"], opens: "13:00", closes: "16:00" },
  ],
  social: {
    // No se ha encontrado una cuenta de Instagram oficial confirmada —
    // se mantiene oculta (ver Footer.tsx) hasta tener el enlace real.
    instagram: null as string | null,
    // Página de Facebook pública localizada — verificar la URL definitiva
    // directamente con el restaurante antes del despliegue.
    facebook:
      "https://www.facebook.com/p/El-Mexicano-de-Guargacho-100064245032403/" as
        | string
        | null,
  },
  mapsEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "El Mexicano de Guargacho, Carretera General Guargacho 84, Tenerife"
    ) +
    "&output=embed",
  mapsDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "El Mexicano de Guargacho, Carretera General Guargacho 84, Tenerife"
    ),
  googleReviewsSearchHref:
    "https://www.google.com/search?q=" +
    encodeURIComponent("El Mexicano de Guargacho reseñas"),
  tripadvisorSearchHref:
    "https://www.tripadvisor.es/Search?q=" +
    encodeURIComponent("El Mexicano de Guargacho Tenerife"),
} as const;

// Resumen de reseñas — dato público y verificable (perfil de Google
// Business del restaurante), no inventado. Se muestra mientras no haya
// integración activa de Google Places; Opiniones.tsx delega
// automáticamente en GoogleReviews.tsx en cuanto GOOGLE_PLACES_API_KEY
// esté configurada (ver src/lib/reviews.ts). No se transcriben reseñas
// individuales de ejemplo — solo esta cifra agregada, actualizable en
// cuanto el restaurante confirme el dato exacto.
export const REVIEWS_SUMMARY = {
  rating: 4.3,
  countLabel: "Más de 170 opiniones verificadas",
} as const;

// Especialidades de la carta real (categorías e importes verificados).
// Cada tarjeta muestra como máximo 3 platos de ejemplo — el resto queda
// en `examples` para uso futuro (p. ej. una página de carta completa o
// datos estructurados de menú), sin saturar la tarjeta visualmente.
export const SPECIALTIES = [
  {
    slug: "entrantes",
    title: "Entrantes",
    description: "Para abrir boca y compartir en el centro.",
    icon: "plate",
    examples: [
      { name: "Nachos auténticos", price: "12,50 €" },
      { name: "Queso fundido con champiñones y cuitlacoche", price: "15 €" },
      { name: "Flautas de pollo", price: "16 €" },
      { name: "Cóctel de gambas estilo Acapulco", price: "13 €" },
      { name: "Sincronizadas", price: "10 €" },
      { name: "Gringa", price: "16 €" },
      { name: "Paquete Primerizos", price: "20 €" },
    ],
  },
  {
    slug: "tacos",
    title: "Tacos",
    description: "Maíz, brasa y salsa. La base de todo.",
    icon: "taco",
    examples: [
      { name: "Tres tacos de maíz", price: "12 €" },
      { name: "Tacos de pescado Baja California", price: "13 €" },
    ],
  },
  {
    slug: "burritos",
    title: "Burritos",
    description: "Generosos, envueltos a mano.",
    icon: "burrito",
    examples: [{ name: "Burrito", price: "16 €" }],
  },
  {
    slug: "enchiladas",
    title: "Enchiladas",
    description: "Bañadas en salsa, al horno.",
    icon: "enchilada",
    examples: [
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
    title: "Carnes",
    description: "A la parrilla, con carácter.",
    icon: "flame",
    examples: [],
  },
  {
    slug: "especialidades",
    title: "Especialidades",
    description: "Los platos insignia de la casa.",
    icon: "sparkles",
    examples: [],
  },
  {
    slug: "postres",
    title: "Postres",
    description: "El cierre dulce de la noche.",
    icon: "dessert",
    examples: [
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
    title: "Bebidas",
    description: "Margaritas, cervezas y algo más.",
    icon: "cocktail",
    examples: [],
  },
] as const;

export const GALLERY_PLACEHOLDERS = [
  { label: "Sala principal", ratio: "4/5" },
  { label: "Tacos al pastor", ratio: "1/1" },
  { label: "Terraza", ratio: "4/5" },
  { label: "Fajitas en sartén", ratio: "1/1" },
  { label: "Margaritas", ratio: "1/1" },
  { label: "Ambiente de noche", ratio: "4/5" },
] as const;
