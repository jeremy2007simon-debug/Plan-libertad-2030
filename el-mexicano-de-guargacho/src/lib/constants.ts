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
  // validarlo antes con El Mexicano de Guargacho. El texto mostrado al
  // visitante vive en src/lib/i18n/{es,en}.ts (ubicacion.hoursText) — debe
  // mantenerse en sincronía con estos horarios en ambos idiomas.
  // --------------------------------------------------------------------
  hoursSpec: [
    { dayOfWeek: ["Monday", "Tuesday", "Thursday"], opens: "19:00", closes: "23:00" },
    { dayOfWeek: ["Friday", "Saturday"], opens: "13:00", closes: "16:00" },
    { dayOfWeek: ["Friday", "Saturday"], opens: "19:00", closes: "23:30" },
    { dayOfWeek: ["Sunday"], opens: "13:00", closes: "16:00" },
  ],
  social: {
    // Cuenta de Instagram oficial confirmada (@el.mexicano.de.guargacho_).
    instagram: "https://www.instagram.com/el.mexicano.de.guargacho_/" as
      | string
      | null,
    // Página de Facebook pública localizada — verificar la URL definitiva
    // directamente con el restaurante antes del despliegue.
    facebook:
      "https://www.facebook.com/p/El-Mexicano-de-Guargacho-100064245032403/" as
        | string
        | null,
    // Cuenta de TikTok oficial confirmada (@mexicanodeguargacho).
    tiktok: "https://www.tiktok.com/@mexicanodeguargacho" as string | null,
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
// esté configurada (ver src/lib/reviews.ts). Solo esta cifra agregada,
// actualizable en cuanto el restaurante confirme el dato exacto — la frase
// que la envuelve (p. ej. "Más de N opiniones verificadas") vive en
// src/lib/i18n/{es,en}.ts (opiniones.countLabel) para poder traducirse.
export const REVIEWS_SUMMARY = {
  rating: 4.3,
  count: 170,
} as const;

// El contenido de la carta (Especialidades.tsx) y de la galería
// (Galeria.tsx) vive en src/lib/i18n/{es,en}.ts (especialidades.categories
// / galeria.items) para poder traducirse junto con el resto de la web.
