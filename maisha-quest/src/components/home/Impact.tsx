import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { hasPlayableVideo } from "@/lib/media";
import { AnimatedLine, ImageReveal, Reveal, Stagger } from "@/components/ui/motion";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { getImpact } from "@/lib/content";

/**
 * "Travel that gives back" — Maisha Quest Cares.
 *
 * El vídeo vertical de impacto va aquí, no en el hero: es material documental
 * de comunidad, y como hero perdería el sentido y el encuadre.
 *
 * Sobre datos: `outcomes` está vacío en todos los proyectos y esta sección no
 * muestra ni una cifra. En cuanto el cliente facilite resultados reales, la
 * lista aparece sola.
 *
 * EL VÍDEO NO SE PINTA. El material que hay grabado en un colegio muestra
 * menores identificables y no consta autorización escrita de sus tutores ni
 * del centro. Hasta tenerla no se publica, y no se deja en su lugar un marco
 * vacío ni un aviso: la sección se recompone a dos columnas de texto y no se
 * nota ningún hueco. Ver `src/data/impact.ts` y `src/data/claims.ts`.
 */
export async function Impact({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { projects, video } = await getImpact(locale);
  const intro = t.home.impact.intro;
  const showVideo = hasPlayableVideo(video);

  return (
    <section className="dark-section texture-dust relative isolate bg-forest py-20 text-on-dark sm:py-24">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Vídeo vertical. Solo existe si existe un archivo publicable. */}
          {showVideo && (
            <ImageReveal className="mx-auto w-full max-w-[15rem] sm:max-w-[17rem] lg:col-span-4 lg:max-w-[17rem]">
              <div className="w-full">
                <LazyVideo
                  video={video}
                  t={{
                    play: t.home.impact.watch,
                    pause: t.video.pause,
                    unmute: t.video.unmute,
                    mute: t.video.mute,
                    label: t.video.label,
                  }}
                  className="relative aspect-9/16 w-full bg-canopy"
                />
              </div>
            </ImageReveal>
          )}

          {/* Texto y proyectos */}
          <div className={showVideo ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-10 lg:col-start-2"}>
            <Reveal>
              <p className="eyebrow text-sand">{t.home.impact.eyebrow}</p>
              <h2 className="text-h1 mt-5 text-parchment">{intro.title}</h2>
              <p className="text-lede measure mt-6 text-parchment/90 italic">
                {intro.lede}
              </p>
              <p className="measure mt-6 text-[0.96rem] leading-relaxed text-on-dark-soft">
                {intro.body}
              </p>
            </Reveal>

            {/* Línea de impacto: un solo filete dorado que se traza al entrar.
                Nada de contadores ni de cifras — no las tenemos. */}
            <AnimatedLine tone="gold" className="mt-10 max-w-[16rem]" delay={0.1} />

            <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <Stagger as="li" step={0.09}>
                {projects.map((project) => (
                  <span key={project.slug} className="block">
                    <span className="eyebrow block text-on-dark-faint">
                      {t.impactAreas[project.area]}
                    </span>
                    <span className="font-display mt-2 block text-[1.25rem] text-parchment">
                      {project.title}
                    </span>
                    <span className="mt-2.5 block text-[0.9rem] leading-relaxed text-on-dark-soft">
                      {project.description}
                    </span>
                    {/* Resultados: solo si existen de verdad. */}
                    {project.outcomes.length > 0 && (
                      <span className="mt-3 flex flex-col gap-1.5">
                        {project.outcomes.map((outcome) => (
                          <span key={outcome} className="text-[0.88rem] text-sand">
                            {outcome}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                ))}
              </Stagger>
            </ul>

            <Reveal>
              <ButtonLink
                href="/impact"
                locale={locale}
                variant="secondary"
                tone="dark"
                className="mt-10"
              >
                {t.home.impact.cta}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
