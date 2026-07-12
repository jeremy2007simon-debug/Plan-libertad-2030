import { RESTAURANT } from "@/lib/constants";

// Datos estructurados Schema.org (Restaurant). Solo se incluyen los campos
// confirmados — sin dirección, teléfono ni horario reales, no se generan
// aquí para no publicar información inventada. Añádelos en
// src/lib/constants.ts en cuanto estén disponibles.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT.name,
    servesCuisine: "Italiana",
    ...(RESTAURANT.phone ? { telephone: RESTAURANT.phone } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
