import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { MediaFrame } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";
import { getImpact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Maisha Quest Cares — local guides on local wages, community visits paid directly, and support for education and conservation work near the places we travel.",
  alternates: { canonical: "/impact" },
};

/**
 * Página de impacto.
 *
 * Sin una sola cifra: no hay datos de impacto facilitados por el cliente y
 * inventarlos en esta sección concreta sería especialmente grave. La maqueta
 * ya está preparada para mostrarlos (`outcomes` por proyecto) en cuanto
 * existan. Ver `src/data/impact.ts` para la advertencia interna sobre
 * autorización de imagen de menores en el vídeo.
 */
export default async function ImpactPage() {
  const { intro, projects, video } = await getImpact();

  return (
    <>
      <PageHero
        eyebrow="Maisha Quest Cares"
        title={intro.title}
        lede={intro.lede}
        image={PHOTOS["ngorongoro-zebras"]}
      />

      <section className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lede measure text-ink-soft">{intro.body}</p>
                <p className="measure mt-6 text-[0.98rem] leading-relaxed text-ink-soft">
                  We are not going to put numbers on this page that we cannot
                  stand behind. As each programme produces results we can
                  document — schools supported, people employed, projects funded
                  — they will be published here with the detail to back them up.
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
                      <span className="tnum eyebrow pt-1.5 text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="eyebrow text-terracotta">{project.area}</p>
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
                              label={project.title}
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
                <div className="mx-auto w-full max-w-[20rem] lg:max-w-none">
                  <LazyVideo
                    video={video}
                    label="Watch"
                    posterLabel="Maisha Quest Cares, in the field"
                    tone="dark"
                    className="relative aspect-9/16 w-full bg-forest-deep"
                  />
                </div>
                <ButtonLink href="/contact" variant="secondary" className="mt-8">
                  Ask about our projects
                </ButtonLink>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
