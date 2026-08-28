import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { AnimatedLine, ImageReveal, Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JourneyPlanner } from "@/components/planner/JourneyPlanner";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { getDestinations, getReviewSources, getTestimonials } from "@/lib/content";
import { COMPANY } from "@/lib/site";

/**
 * "Let's design your journey" — el planificador, embebido en la home.
 *
 * Es el final del recorrido de la página: inspiración arriba, decisión aquí.
 * Se monta completo en lugar de enlazar a otra página porque el momento de
 * mayor intención es justo después de haber visto los viajes, el mapa y al
 * equipo, y cada clic intermedio pierde solicitudes.
 *
 * La columna izquierda recoge además la invitación a hablar con el equipo que
 * antes ocupaba una sección entera de testimonios vacía. Mientras no haya
 * reseñas reales, este es el sitio donde esa invitación sirve para algo: al
 * lado del formulario, cuando alguien ya está decidiendo. Si el cliente
 * confirma perfiles de reseñas, los enlaces aparecen aquí solos; sin URL
 * oficial no se enlaza nada, porque una búsqueda genérica no es una reseña.
 */
export async function PlannerSection({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const destinations = await getDestinations(locale);
  const testimonials = await getTestimonials();
  const sources = getReviewSources();
  /* La invitación solo tiene sentido mientras no haya testimonios reales: en
     cuanto los haya, vuelve su propia sección y esto sobra. */
  const showInvitation = testimonials.length === 0;

  return (
    <section id="plan" className="texture-paper relative isolate bg-page py-20 sm:py-24">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={t.home.planner.eyebrow}
              title={t.home.planner.title}
              lede={t.home.planner.lede}
            />

            <ImageReveal className="mt-9 hidden aspect-4/5 lg:block">
              <Photo
                photo={CLIENT_PHOTOS["flamingo-flock-in-motion"]}
                alt=""
                sizes="(max-width: 1024px) 0px, 28vw"
              />
            </ImageReveal>

            <Reveal className="mt-8">
              <p className="eyebrow text-ink-faint">{t.home.planner.ratherTalk}</p>
              <a
                href={COMPANY.phoneHref}
                className="font-display mt-2 block text-[1.45rem] text-forest transition-colors duration-[var(--dur-hover)] hover:text-terracotta-text"
              >
                {COMPANY.phone}
              </a>
              <p className="mt-1.5 text-[0.85rem] text-ink-faint">
                {COMPANY.hours.label} · {COMPANY.hours.timezone}
              </p>
            </Reveal>

          </div>

          <Reveal className="lg:col-span-8">
            <JourneyPlanner
              locale={locale}
              t={t.planner}
              requiredLabel={t.a11y.required}
              destinations={destinations.map((destination) => ({
                slug: destination.slug,
                name: destination.name,
                region: t.regions[destination.region],
              }))}
            />
          </Reveal>
        </div>

        {/* Invitación a hablar con el equipo.

            Va a todo lo ancho y DEBAJO del formulario, no en la columna de la
            izquierda: ahí hacía la columna más alta que el planificador y la
            sección terminaba en medio folio de pergamino vacío. Aquí cierra la
            sección y se lee después de haber visto el formulario. */}
        {showInvitation && (
          <div className="mt-14">
            <AnimatedLine tone="gold" className="max-w-[12rem]" />
            <div className="mt-7 grid gap-8 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-5">
                <p className="font-display text-[1.35rem] leading-snug text-forest">
                  {t.home.testimonials.emptyTitle}
                </p>
              </Reveal>
              <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
                <p className="text-[0.94rem] leading-relaxed text-ink-soft">
                  {sources.length > 0
                    ? t.home.testimonials.emptyBodyWithSources
                    : t.home.testimonials.emptyBody}
                </p>

                {/* Los perfiles de reseñas solo se enlazan si el cliente ha
                    confirmado la URL exacta. Sin ellos no queda un hueco: la
                    lista entera desaparece. */}
                {sources.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {sources.map((source) => (
                      <li key={source.label}>
                        <a
                          href={source.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.85rem] text-forest underline decoration-forest/25 underline-offset-[6px] transition-colors duration-[var(--dur-hover)] hover:text-terracotta-text hover:decoration-terracotta-text"
                        >
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                <ButtonLink
                  href="/contact"
                  locale={locale}
                  variant="quiet"
                  className="mt-5"
                >
                  {t.home.testimonials.askReferences}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
