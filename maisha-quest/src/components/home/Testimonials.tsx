import { ButtonLink } from "@/components/ui/Button";
import { CompassDivider, CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY } from "@/lib/site";
import { getReviewSources, getTestimonials } from "@/lib/content";

/**
 * "Stories brought home".
 *
 * Hoy no hay testimonios reales, y no se ha inventado ninguno: una reseña
 * falsa es comprobable y destruye exactamente la confianza que esta sección
 * existe para construir.
 *
 * Así que la sección tiene dos caras. Con datos, pinta las citas completas
 * (retrato, valoración, viaje, fecha y fuente verificable). Sin datos, pinta
 * un estado vacío deliberado que sigue haciendo trabajo comercial: explica que
 * las opiniones se publicarán con su fuente, invita a comprobarlas por cuenta
 * propia y ofrece hablar con viajeros anteriores.
 */
export async function Testimonials() {
  const testimonials = await getTestimonials();
  const sources = getReviewSources();

  return (
    <section className="bg-page py-24 sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow="Travellers"
          title="Stories brought home"
          lede={
            testimonials.length > 0
              ? "What travellers said after they got back, published with the source so you can check it yourself."
              : undefined
          }
        />

        {testimonials.length > 0 ? (
          <Reveal className="mt-14">
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <figure className="flex h-full flex-col bg-ivory-warm p-7">
                    {testimonial.rating !== null && (
                      <p
                        className="flex gap-1 text-gold"
                        aria-label={`Rated ${testimonial.rating} out of 5`}
                      >
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <CompassMark key={i} className="size-3.5" needle={false} />
                        ))}
                      </p>
                    )}
                    <blockquote className="font-display mt-5 flex-1 text-[1.22rem] leading-snug text-forest">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-7 flex items-center gap-4 border-t border-rule pt-5">
                      {testimonial.portrait && (
                        <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
                          <MediaFrame
                            media={testimonial.portrait}
                            label={testimonial.name}
                            sizes="44px"
                          />
                        </span>
                      )}
                      <span className="flex flex-col">
                        <span className="text-[0.92rem] text-forest">
                          {testimonial.name}
                        </span>
                        <span className="text-[0.8rem] text-ink-faint">
                          {testimonial.country}
                          {testimonial.tripType && ` · ${testimonial.tripType}`}
                        </span>
                      </span>
                    </figcaption>
                    {testimonial.source && (
                      <a
                        href={testimonial.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eyebrow mt-4 text-ink-faint underline underline-offset-4 hover:text-terracotta"
                      >
                        Verified review
                      </a>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <Reveal className="mt-12">
            <div className="grid items-center gap-10 border border-rule bg-ivory-warm px-7 py-12 sm:px-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <p className="font-display text-h3 text-forest">
                  We would rather show you nothing than show you something we
                  wrote ourselves.
                </p>
                <p className="measure mt-5 text-[0.96rem] leading-relaxed text-ink-soft">
                  Reviews will be published here as travellers send them, each
                  one with a link to where it was originally posted. Until then,
                  look us up yourself — or ask, and we will put you in touch
                  with someone who has travelled with us.
                </p>

                <CompassDivider className="my-8 max-w-sm" />

                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {sources.map((source) => (
                    <li key={source.label}>
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.85rem] text-forest underline decoration-forest/25 underline-offset-[6px] transition-colors duration-300 hover:text-terracotta hover:decoration-terracotta"
                      >
                        Search on {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <p className="eyebrow text-ink-faint">Speak to us directly</p>
                <a
                  href={COMPANY.phoneHref}
                  className="font-display mt-3 block text-[1.6rem] text-forest transition-colors duration-300 hover:text-terracotta"
                >
                  {COMPANY.phone}
                </a>
                <p className="mt-2 text-[0.85rem] text-ink-faint">
                  {COMPANY.hours.label}
                  <br />
                  {COMPANY.hours.timezone}
                </p>
                <ButtonLink href="/contact" variant="secondary" className="mt-6">
                  Ask for references
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
