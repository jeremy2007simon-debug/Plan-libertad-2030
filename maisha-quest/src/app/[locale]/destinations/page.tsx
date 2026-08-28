import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";
import { isLocale, localeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { getDestinations } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/destinations",
    title: t.meta.destinations.title,
    description: t.meta.destinations.description,
  });
}

/**
 * El circuito norte abre la página: es el corazón comercial y donde están las
 * fotografías más fuertes. Arusha (Gateway) va al final — es una ciudad, y
 * abrir con una calle con cables de la luz hunde la primera impresión.
 */
const REGION_ORDER = ["northern", "southern", "coast", "gateway"] as const;

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const destinations = await getDestinations(locale);

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.destinations}
        title={t.destinations.title}
        lede={t.destinations.lede}
        // No se usa la del cráter: es la portada de una de las fichas de abajo.
        image={PHOTOS["wildebeest-migration"]}
      />

      <div className="bg-page py-20 sm:py-24">
        <Container width="wide">
          {REGION_ORDER.map((region) => {
            const inRegion = destinations.filter((d) => d.region === region);
            if (inRegion.length === 0) return null;

            return (
              <section key={region} className="mb-16 last:mb-0">
                <h2 className="eyebrow border-b border-rule pb-4 text-terracotta">
                  {t.regions[region]}
                </h2>
                {/* Una región con un solo destino se presenta apaisada. En la
                    rejilla de tres columnas quedaba una tarjeta sola con dos
                    huecos al lado, que se lee como un fallo de maquetación. */}
                <Reveal className="mt-8">
                  <ul
                    className={
                      inRegion.length === 1
                        ? "grid gap-6"
                        : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                    }
                  >
                    {inRegion.map((destination) => (
                      <li key={destination.slug}>
                        <Link
                          href={localeHref(
                            locale,
                            `/destinations/${destination.slug}`,
                          )}
                          className={`group block ${
                            inRegion.length === 1
                              ? "grid items-center gap-8 md:grid-cols-2"
                              : ""
                          }`}
                        >
                          <div
                            className={`relative overflow-hidden ${
                              inRegion.length === 1 ? "aspect-16/9" : "aspect-4/3"
                            }`}
                          >
                            <Photo
                              photo={destination.image}
                              alt=""
                              sizes={
                                inRegion.length === 1
                                  ? "(max-width: 768px) 100vw, 45vw"
                                  : "(max-width: 768px) 100vw, 32vw"
                              }
                              className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                            />
                          </div>
                          <div className={inRegion.length === 1 ? "" : "contents"}>
                            <h3
                              className={`font-display mt-5 text-[1.5rem] leading-tight text-forest transition-colors duration-300 group-hover:text-terracotta ${
                                inRegion.length === 1 ? "md:mt-0" : ""
                              }`}
                            >
                              {destination.name}
                            </h3>
                            <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                              {destination.shortDescription}
                            </p>
                            <p className="tnum mt-3 text-[0.75rem] tracking-[0.1em] text-ink-faint">
                              {destination.coordinates.label}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>
            );
          })}
        </Container>
      </div>
    </>
  );
}
