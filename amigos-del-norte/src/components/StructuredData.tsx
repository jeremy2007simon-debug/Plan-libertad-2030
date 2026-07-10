import { RESTAURANT } from "@/lib/constants";

// Datos estructurados Schema.org (Restaurant) con la información real
// facilitada. No incluye horario ni valoraciones porque no se han
// confirmado — añádelos aquí en cuanto estén disponibles.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT.name,
    telephone: RESTAURANT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Chafiras",
      addressRegion: "Santa Cruz de Tenerife",
      addressCountry: "ES",
    },
    servesCuisine: ["Canaria", "Carnes a la brasa", "Pescados"],
    areaServed: "Tenerife Sur",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
