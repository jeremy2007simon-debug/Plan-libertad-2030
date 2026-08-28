import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Itinerary } from "@/components/safari/Itinerary";
import { RouteMap } from "@/components/safari/RouteMap";
import { SafariCard } from "@/components/safari/SafariCard";
import { FaqSchema, SafariSchema } from "@/components/seo/StructuredData";
import { ButtonLink } from "@/components/ui/Button";
import { CompassMark, CompassPoint } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { ImageSlot, Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SAFARIS } from "@/data/safaris";
import { getReviewSources, getTestimonials } from "@/lib/content";
import {
  formatPrice,
  formatRoute,
  formatSafariMeta,
  getDestination,
  getFaqsBySlugs,
  getSafariBySlug,
} from "@/lib/content";
import type { Destination } from "@/types/content";

export function generateStaticParams() {
  return SAFARIS.map((safari) => ({ slug: safari.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const safari = await getSafariBySlug(slug);
  if (!safari) return {};
  return {
    title: `${safari.name} · ${safari.durationDays} days`,
    description: safari.summary,
    alternates: { canonical: `/safaris/${safari.slug}` },
    openGraph: {
      title: `${safari.name} — ${safari.durationDays} days in Tanzania`,
      description: safari.summary,
      images: [{ url: safari.image.src }],
    },
  };
}

/**
 * Ficha de safari.
 *
 * Estructura completa —resumen, mapa, itinerario, alojamiento, incluido, mejor
 * época, práctica, precio, FAQ, testimonios y viajes similares— con una barra
 * de acción fija abajo. Todo lo que aún no está confirmado se dice, no se
 * rellena: sin nombres de lodge inventados y sin tarifas ficticias.
 */
export default async function SafariPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const safari = await getSafariBySlug(slug);
  if (!safari) notFound();

  const stops = (
    await Promise.all(safari.routeDestinationSlugs.map((s) => getDestination(s)))
  ).filter((d): d is Destination => Boolean(d));

  const [faqs, testimonials, related] = await Promise.all([
    getFaqsBySlugs(safari.faqSlugs ?? []),
    getTestimonials(),
    Promise.all((safari.relatedSafariSlugs ?? []).map((s) => getSafariBySlug(s))),
  ]);

  const relatedSafaris = related.filter((s) => s !== undefined);
  const reviewSources = getReviewSources();
  const price = formatPrice(safari);
  const relatedTestimonials = testimonials.filter(
    (t) => t.safariSlug === safari.slug,
  );

  return (
    <>
      <SafariSchema safari={safari} />
      <FaqSchema faqs={faqs} />

      <PageHero
        eyebrow={`${safari.collection} collection`}
        title={safari.name}
        lede={safari.summary}
        image={safari.image}
      >
        <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
          <div>
            <dt className="eyebrow text-sand">Duration</dt>
            <dd className="tnum mt-1.5 text-ivory">{safari.durationDays} days</dd>
          </div>
          <div>
            <dt className="eyebrow text-sand">Route</dt>
            <dd className="mt-1.5 text-ivory">{formatRoute(safari)}</dd>
          </div>
          <div>
            <dt className="eyebrow text-sand">Style</dt>
            <dd className="mt-1.5 text-ivory">{formatSafariMeta(safari)}</dd>
          </div>
        </dl>
      </PageHero>

      {/* Cinta de datos clave */}
      <section className="border-b border-rule bg-page-alt">
        <Container width="wide">
          <dl className="grid gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Best time", safari.bestTime],
              ["Suits", safari.travellerProfile],
              ["Accommodation", safari.accommodationStyle],
              ["From", price ?? "Price on request"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="eyebrow text-ink-faint">{label}</dt>
                <dd className="mt-1.5 text-[0.95rem] text-forest">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {safari.draft && (
        <Container width="wide" className="pt-10">
          <p className="border-l-2 border-gold bg-sand/12 py-4 pl-5 text-[0.92rem] leading-relaxed text-ink-soft">
            <strong className="font-semibold text-forest">Sample itinerary.</strong>{" "}
            This route shows the shape of the journey. Timings, camps and the
            final day-by-day are confirmed with you before anything is booked.
          </p>
        </Container>
      )}

      <div className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Columna principal */}
            <div className="lg:col-span-7">
              {safari.overview && (
                <Reveal>
                  <h2 className="text-h2 text-forest">The journey</h2>
                  <p className="measure mt-5 text-[1rem] leading-relaxed text-ink-soft">
                    {safari.overview}
                  </p>
                </Reveal>
              )}

              <Reveal className="mt-14">
                <h2 className="text-h2 text-forest">Day by day</h2>
                <div className="mt-7">
                  <Itinerary days={safari.itinerary} />
                </div>
              </Reveal>

              <Reveal className="mt-14">
                <h2 className="text-h2 text-forest">Where you stay</h2>
                <p className="measure mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  This journey is planned around {safari.accommodationStyle.toLowerCase()}{" "}
                  accommodation. We propose specific camps and lodges with your
                  itinerary, chosen for where they sit on the route and what is
                  available on your dates — rather than naming properties here we
                  may not be able to hold.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {stops.slice(0, 3).map((stop) => (
                    <div key={stop.slug} className="relative aspect-4/3 overflow-hidden">
                      <ImageSlot label={`Accommodation in ${stop.name}`} />
                    </div>
                  ))}
                </div>
              </Reveal>

              {safari.gallery && safari.gallery.length > 0 && (
                <Reveal className="mt-14">
                  <h2 className="text-h2 text-forest">Gallery</h2>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {safari.gallery.map((image, index) => {
                      // Igual que en destinos: la primera manda a doble ancho
                      // cuando el número de fotos es impar.
                      const lead = index === 0 && safari.gallery!.length % 2 === 1;
                      return (
                        <li
                          key={image.src}
                          className={
                            lead
                              ? "relative aspect-16/9 overflow-hidden sm:col-span-2"
                              : "relative aspect-4/3 overflow-hidden"
                          }
                        >
                          <Photo
                            photo={image}
                            sizes={
                              lead
                                ? "(max-width: 640px) 100vw, 52vw"
                                : "(max-width: 640px) 100vw, 40vw"
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              )}
            </div>

            {/* Columna lateral */}
            <aside className="lg:col-span-5">
              <Reveal>
                <div className="border border-rule bg-ivory-warm p-7">
                  <h2 className="font-display text-[1.4rem] text-forest">
                    The route
                  </h2>
                  <div className="mt-5">
                    <RouteMap stops={stops} />
                  </div>
                  <ul className="mt-6 flex flex-col divide-y divide-rule border-t border-rule">
                    {stops.map((stop) => (
                      <li key={stop.slug}>
                        <Link
                          href={`/destinations/${stop.slug}`}
                          className="flex items-baseline justify-between gap-4 py-3 text-[0.92rem] text-forest transition-colors duration-300 hover:text-terracotta"
                        >
                          {stop.name}
                          <span className="tnum shrink-0 text-[0.75rem] text-ink-faint">
                            {stop.coordinates.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal className="mt-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <h2 className="eyebrow text-terracotta">What is included</h2>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {safari.included.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.9rem] leading-relaxed text-ink-soft"
                        >
                          <CompassPoint className="mt-1.5 size-2 shrink-0 text-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="eyebrow text-ink-faint">Not included</h2>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {safari.notIncluded.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.9rem] leading-relaxed text-ink-faint"
                        >
                          <span aria-hidden="true" className="mt-2.5 h-px w-2 shrink-0 bg-current" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {safari.practicalInfo && (
                <Reveal className="mt-8">
                  <h2 className="eyebrow text-ink-faint">Practical</h2>
                  <dl className="mt-4 flex flex-col divide-y divide-rule border-y border-rule">
                    {safari.practicalInfo.map((row) => (
                      <div key={row.label} className="flex gap-5 py-3">
                        <dt className="w-32 shrink-0 text-[0.85rem] text-ink-faint">
                          {row.label}
                        </dt>
                        <dd className="text-[0.9rem] text-ink-soft">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}
            </aside>
          </div>
        </Container>
      </div>

      {faqs.length > 0 && (
        <section className="border-t border-rule bg-page-alt py-20">
          <Container width="prose">
            <h2 className="text-h2 text-forest">Common questions</h2>
            <div className="mt-8 flex flex-col divide-y divide-rule border-y border-rule">
              {faqs.map((faq) => (
                <details key={faq.slug} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[1.2rem] leading-snug text-forest">
                      {faq.question}
                    </span>
                    <CompassPoint className="mt-2 size-3 shrink-0 text-gold transition-transform duration-500 group-open:rotate-45" />
                  </summary>
                  <p className="measure mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonios del viaje. Sin datos reales, se ofrece la vía honesta. */}
      <section className="bg-page py-20">
        <Container width="wide">
          <h2 className="text-h2 text-forest">What travellers said</h2>
          {relatedTestimonials.length > 0 ? (
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedTestimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <figure className="h-full bg-ivory-warm p-7">
                    <blockquote className="font-display text-[1.2rem] leading-snug text-forest">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-[0.85rem] text-ink-faint">
                      {testimonial.name} · {testimonial.country}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <p className="measure text-[0.95rem] leading-relaxed text-ink-soft">
                No reviews for this journey have been published yet, and we are
                not going to write one ourselves. Ask and we will put you in
                touch with travellers who have done it.
              </p>
              {/* Sin URL oficial de perfil no se enlaza nada: una búsqueda
                  genérica no es una reseña. La lista desaparece entera. */}
              {reviewSources.length > 0 && (
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {reviewSources.map((source) => (
                    <li key={source.label}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.85rem] text-forest underline decoration-forest/25 underline-offset-[6px] hover:text-terracotta"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Container>
      </section>

      {relatedSafaris.length > 0 && (
        <section className="border-t border-rule bg-page-alt py-20">
          <Container width="wide">
            <h2 className="text-h2 text-forest">Similar journeys</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedSafaris.map((other) => (
                <li key={other.slug} className="flex">
                  <SafariCard safari={other} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Barra de acción fija. En móvil se apoya sobre la barra global. */}
      <div className="dark-section sticky bottom-0 z-30 border-t border-rule-on-dark bg-forest/97 backdrop-blur-md">
        <Container width="wide">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
              <CompassMark className="hidden size-8 text-sand sm:block" />
              <div>
                <p className="font-display text-[1.1rem] leading-tight text-ivory">
                  {safari.name}
                </p>
                <p className="tnum text-[0.8rem] text-on-dark-faint">
                  {safari.durationDays} days
                  <span className="mx-2 opacity-50">·</span>
                  {price ?? "Price on request"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/plan?safari=${safari.slug}`} variant="primary">
                Customize This Journey
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                tone="dark"
                className="hidden sm:inline-flex"
              >
                Ask a question
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
