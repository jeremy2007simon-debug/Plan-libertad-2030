// Datos reales del restaurante. Centralizados aquí para no repetirlos
// por el código — cualquier cambio (teléfono, dirección...) se hace una vez.

export const RESTAURANT = {
  name: "El Mexicano de Guargacho",
  shortName: "El Mexicano",
  phone: "922 73 13 13",
  phoneHref: "tel:+34922731313",
  // Teléfono fijo publicado por el restaurante. wa.me solo funciona si ese
  // número tiene WhatsApp Business habilitado — confirmar con el
  // restaurante y sustituir por el móvil correcto si procede.
  whatsappHref: "https://wa.me/34922731313",
  address: {
    line1: "Carretera General de Guargacho, 84",
    line2: "Guargacho, San Miguel de Abona, Tenerife",
    full: "Carretera General de Guargacho 84, Guargacho, San Miguel de Abona, Santa Cruz de Tenerife",
  },
  // Horario recopilado de fuentes públicas (perfil de Google Business y
  // directorios) a fecha de redacción de esta web — confirmar con el
  // restaurante antes de publicar y actualizar si cambia por temporada.
  hours: "Lun, mar y jue: 18:00–00:00 · Vie–dom: 13:00–00:00 · Miércoles: cerrado" as
    | string
    | null,
  // Mismo horario en formato Schema.org (openingHoursSpecification), usado
  // en StructuredData.tsx. Actualizar junto con `hours` si cambia.
  hoursSpec: [
    { dayOfWeek: ["Monday", "Tuesday", "Thursday"], opens: "18:00", closes: "23:59" },
    { dayOfWeek: ["Friday", "Saturday", "Sunday"], opens: "13:00", closes: "23:59" },
  ],
  social: {
    // TODO: confirmar y añadir el Instagram real del restaurante.
    instagram: null as string | null,
    facebook:
      "https://www.facebook.com/p/El-Mexicano-de-Guargacho-100064245032403/" as
        | string
        | null,
  },
  mapsEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "El Mexicano de Guargacho, Carretera General de Guargacho 84, Tenerife"
    ) +
    "&output=embed",
  mapsDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "El Mexicano de Guargacho, Carretera General de Guargacho 84, Tenerife"
    ),
  googleReviewsSearchHref:
    "https://www.google.com/search?q=" +
    encodeURIComponent("El Mexicano de Guargacho reseñas"),
  tripadvisorSearchHref:
    "https://www.tripadvisor.es/Search?q=" +
    encodeURIComponent("El Mexicano de Guargacho Tenerife"),
} as const;

// Sin reseñas curadas todavía: esta sección se apoya en Google Places
// (ver src/lib/reviews.ts) en cuanto se active GOOGLE_PLACES_API_KEY. No se
// inventan reseñas — mientras no haya API activa, Opiniones.tsx muestra un
// estado "próximamente". Si el restaurante facilita capturas reales
// (Google, TripAdvisor), transcribirlas aquí verbatim, como se hizo en el
// proyecto hermano (Amigos del Norte).
export const CURATED_REVIEWS: {
  author: string;
  location: string | null;
  rating: number;
  title: string;
  text: string;
  date: string;
  collaboration: boolean;
}[] = [];

// Especialidades de la carta. Deliberadamente sin precios ni platos
// concretos verificados todavía — tarjetas muy visuales, con el mínimo
// texto, listas para enlazar la carta digital real en cuanto exista.
export const SPECIALTIES = [
  {
    slug: "tacos",
    title: "Tacos",
    description: "Maíz, brasa y salsa. La base de todo.",
    icon: "taco",
  },
  {
    slug: "fajitas",
    title: "Fajitas",
    description: "Sizzling, a la plancha, para compartir.",
    icon: "skillet",
  },
  {
    slug: "burritos",
    title: "Burritos",
    description: "Generosos, envueltos a mano.",
    icon: "burrito",
  },
  {
    slug: "enchiladas",
    title: "Enchiladas",
    description: "Bañadas en salsa, al horno.",
    icon: "enchilada",
  },
  {
    slug: "carnes",
    title: "Carnes",
    description: "A la parrilla, con carácter.",
    icon: "flame",
  },
  {
    slug: "margaritas",
    title: "Margaritas",
    description: "Clásicas, heladas, con sal.",
    icon: "cocktail",
  },
  {
    slug: "postres",
    title: "Postres",
    description: "El cierre dulce de la noche.",
    icon: "dessert",
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
