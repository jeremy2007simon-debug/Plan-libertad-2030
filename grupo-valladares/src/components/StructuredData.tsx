import { COMPANY, STORES } from "@/lib/constants";

// Datos estructurados Schema.org (Organization), con la sede central de
// Santa Cruz de Tenerife como dirección de contacto principal.
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    description:
      "Distribución de recambios, lubricantes y suministros para talleres y particulares.",
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 302, Nave 15, Polígono Industrial Costa Sur",
      addressLocality: "Santa Cruz de Tenerife",
      postalCode: "38009",
      addressRegion: "Santa Cruz de Tenerife",
      addressCountry: "ES",
    },
    areaServed: "Tenerife",
    location: STORES.map((store) => ({
      "@type": "Place",
      name: store.name,
      address: store.address,
      telephone: store.phone,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
