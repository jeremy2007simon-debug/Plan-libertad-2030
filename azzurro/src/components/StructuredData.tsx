import { AGGREGATE_REVIEWS, RESTAURANT } from "@/lib/constants";

// Datos estructurados Schema.org (Restaurant), con la información pública
// verificada disponible. El horario se marca como provisional en la propia
// web (ver Ubicacion.tsx) — aun así se incluye aquí porque es el mejor
// dato disponible; actualízalo en RESTAURANT.hours en cuanto el
// restaurante lo confirme.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT.name,
    servesCuisine: "Italiana",
    telephone: RESTAURANT.phoneIntl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${RESTAURANT.address.street}, ${RESTAURANT.address.complement}`,
      postalCode: RESTAURANT.address.postalCode,
      addressLocality: RESTAURANT.address.locality,
      addressRegion: RESTAURANT.address.region,
      addressCountry: "ES",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "12:00",
        closes: "23:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "20:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE_REVIEWS.rating,
      reviewCount: AGGREGATE_REVIEWS.totalReviews,
    },
    ...(RESTAURANT.social.facebook ? { sameAs: [RESTAURANT.social.facebook] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
