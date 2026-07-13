import { RESTAURANT } from "@/lib/constants";

// Datos estructurados Schema.org (Restaurant) con la información real
// facilitada. No incluye valoraciones porque no se han confirmado —
// añádelas aquí en cuanto estén disponibles.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT.name,
    telephone: RESTAURANT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANT.address.line1,
      addressLocality: "Guargacho, San Miguel de Abona",
      addressRegion: "Santa Cruz de Tenerife",
      addressCountry: "ES",
    },
    servesCuisine: ["Mexicana"],
    areaServed: "Tenerife Sur",
    openingHoursSpecification: RESTAURANT.hoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
