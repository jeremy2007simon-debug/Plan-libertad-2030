import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { getTestimonials } from "@/lib/content";

/**
 * "Stories brought home".
 *
 * Hoy no hay testimonios reales, y no se ha inventado ninguno: una reseña
 * falsa es comprobable y destruye exactamente la confianza que esta sección
 * existe para construir.
 *
 * Con datos, pinta las citas completas: retrato, valoración, viaje, fecha y
 * fuente verificable.
 *
 * SIN datos —hoy— no pinta NADA en la home. Antes ocupaba una sección entera
 * con un estado vacío; por bien resuelto que estuviera, eran 1.100 px que el
 * visitante recorría para leer "todavía no hay opiniones". Esa invitación a
 * hablar con el equipo vive ahora dentro del planificador, que es justo donde
 * alguien está decidiendo. El día que haya reseñas reales, la sección vuelve
 * sola: la home ya la tiene montada y esta condición deja de cumplirse.
 *
 * La ficha de cada safari mantiene su propio texto para el mismo caso, donde
 * no compite con nada y ocupa tres líneas.
 */
export async function Testimonials({ t }: { locale: Locale; t: Dictionary }) {
  const testimonials = await getTestimonials();
  // Sin reseñas reales la sección no se pinta. Ver la nota de arriba.
  if (testimonials.length === 0) return null;

  return (
    <section className="texture-paper relative isolate bg-page py-12 sm:py-16">
      <Container width="wide">
        <SectionHeading
          eyebrow={t.home.testimonials.eyebrow}
          title={t.home.testimonials.title}
          lede={t.home.testimonials.lede}
        />

        <Reveal className="mt-12">
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <figure className="flex h-full flex-col bg-cream p-7">
                    {testimonial.rating !== null && (
                      <p
                        className="flex gap-1 text-gold"
                        aria-label={t.home.testimonials.rated(testimonial.rating)}
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
                        className="eyebrow mt-4 text-ink-faint underline underline-offset-4 hover:text-terracotta-text"
                      >
                        {t.home.testimonials.verified}
                      </a>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
        </Reveal>
      </Container>
    </section>
  );
}
