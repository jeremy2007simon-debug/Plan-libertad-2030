import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { hasPlayableVideo } from "@/lib/media";
import { MediaFrame } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/motion";
import { PHOTOS } from "@/data/photography";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { getImpact } from "@/lib/content";

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
    path: "/impact",
    title: t.meta.impact.title,
    description: t.meta.impact.description,
  });
}

/**
 * Página de impacto.
 *
 * Sin una sola cifra: no hay datos de impacto facilitados por el cliente y
 * inventarlos en esta sección concreta sería especialmente grave. La maqueta
 * ya está preparada para mostrarlos (`outcomes` por proyecto) en cuanto
 * existan. Ver `src/data/impact.ts` para la advertencia interna sobre
 * autorización de imagen de menores en el vídeo.
 */
export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const { projects, video } = await getImpact(locale);
  const intro = t.home.impact.intro;

  return (
    <>
      <PageHero
        eyebrow={t.home.impact.eyebrow}
        title={intro.title}
        lede={intro.lede}
        image={PHOTOS["ngorongoro-zebras"]}
      />

      <section className="texture-paper relative isolate bg-page py-20 sm:py-24">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lede measure text-ink-soft">{intro.body}</p>
                <p className="measure mt-6 text-[0.98rem] leading-relaxed text-ink-soft">
                  {t.impact.noNumbers}
                </p>
              </Reveal>

              {/* Lista editorial numerada, sin huecos de imagen.
                  Cuatro marcos vacíos apilados hacían que la página que habla
                  de credibilidad fuese la que más parecía sin terminar. Cada
                  proyecto muestra su foto en cuanto exista: el marco vuelve
                  con `project.image.src`. */}
              <Reveal className="mt-14">
                <ol className="flex flex-col divide-y divide-rule border-y border-rule">
                  {projects.map((project, index) => (
                    <li
                      key={project.slug}
                      className="grid gap-x-8 gap-y-3 py-7 sm:grid-cols-[auto_1fr]"
                    >
                      <span className="tnum eyebrow pt-1.5 text-gold-text">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="eyebrow text-terracotta-text">{t.impactAreas[project.area]}</p>
                        <h2 className="font-display mt-1.5 text-[1.4rem] leading-tight text-forest">
                          {project.title}
                        </h2>
                        <p className="measure mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                          {project.description}
                        </p>
                        {project.location && (
                          <p className="mt-3 text-[0.82rem] text-ink-faint">
                            {project.location}
                          </p>
                        )}
                        {project.outcomes.length > 0 && (
                          <ul className="mt-4 flex flex-col gap-1.5">
                            {project.outcomes.map((outcome) => (
                              <li key={outcome} className="text-[0.9rem] text-forest">
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        )}
                        {project.image.src && (
                          <div className="relative mt-5 aspect-3/2 overflow-hidden">
                            <MediaFrame
                              media={project.image}
                              sizes="(max-width: 640px) 100vw, 32vw"
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                {/* Sin autorización escrita para las imágenes de menores, el
                    vídeo no se publica y aquí no queda ningún marco. */}
                {hasPlayableVideo(video) && (
                  <div className="mx-auto w-full max-w-[17rem] lg:max-w-none">
                    <LazyVideo
                      video={video}
                      t={{
                        play: t.home.impact.watch,
                        pause: t.video.pause,
                        unmute: t.video.unmute,
                        mute: t.video.mute,
                      }}
                      className="relative aspect-9/16 w-full bg-canopy"
                    />
                  </div>
                )}
                <ButtonLink
                  href="/contact"
                  locale={locale}
                  variant="secondary"
                  className="mt-8"
                >
                  {t.impact.askCta}
                </ButtonLink>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
