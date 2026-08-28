import { type Locale, localeHref } from "@/i18n/config";
import { COMPANY, SITE_URL, socialLinks } from "@/lib/site";
import type { FAQ, Safari } from "@/types/content";
import { formatRoute } from "@/lib/content";

/**
 * Datos estructurados (schema.org).
 *
 * Solo se declara lo que es cierto y comprobable: nombre, sede, teléfono,
 * email, horario y perfiles sociales. Nada de `aggregateRating` ni de premios
 * mientras no haya reseñas reales — marcar valoraciones inventadas es, además
 * de falso, motivo de penalización en buscadores.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // El JSON lo generamos nosotros a partir de datos internos, no de
      // entrada de usuario, y `JSON.stringify` escapa el contenido.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: COMPANY.name,
        url: `${SITE_URL}${localeHref(locale, "/")}`,
        description:
          "Private, tailor-made safaris through Tanzania, designed and guided by a local team based in Arusha.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Arusha",
          addressCountry: "TZ",
        },
        telephone: COMPANY.phone,
        email: COMPANY.email,
        areaServed: { "@type": "Country", name: "Tanzania" },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
        // `sameAs` solo si hay perfiles confirmados: declararle a Google un
        // perfil que quizá no es del cliente es peor que no declarar ninguno.
        ...(socialLinks().length > 0
          ? { sameAs: socialLinks().map((s) => s.href) }
          : {}),
      }}
    />
  );
}

/**
 * Ficha de un safari. Se declara `offers` únicamente cuando hay un precio
 * real: un `offers` sin precio, o con precio inventado, es peor que ninguno.
 */
export function SafariSchema({ locale, safari }: { locale: Locale; safari: Safari }) {
  const price = safari.price.fromPerPerson;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: safari.name,
        description: safari.summary,
        url: `${SITE_URL}${localeHref(locale, `/safaris/${safari.slug}`)}`,
        touristType: safari.travellerProfile,
        itinerary: {
          "@type": "ItemList",
          numberOfItems: safari.routeDestinationSlugs.length,
          itemListElement: formatRoute(locale, safari)
            .split(" · ")
            .map((name, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: { "@type": "TouristDestination", name },
            })),
        },
        provider: { "@type": "TravelAgency", name: COMPANY.name, url: SITE_URL },
        ...(price !== null
          ? {
              offers: {
                "@type": "Offer",
                price,
                priceCurrency: safari.price.currency,
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
      }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}
