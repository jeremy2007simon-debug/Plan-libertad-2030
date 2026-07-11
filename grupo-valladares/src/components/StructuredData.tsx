import { COMPANY } from "@/lib/constants";

// Datos estructurados mínimos (Schema.org Organization). Se omiten
// deliberadamente dirección, teléfono y horario: son marcadores en
// constants.ts y no deben publicarse como datos reales hasta confirmarse.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    description:
      "Distribución de recambios, lubricantes y suministros para talleres y particulares.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
