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

              <Reveal className="mt-14">
                <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <div className="relative aspect-3/2 overflow-hidden">
                        <MediaFrame
                          media={project.image}
                          label={`${project.title} — photograph to follow`}
                          sizes="(max-width: 640px) 100vw, 32vw"
                        />
                      </div>
                      <p className="eyebrow mt-5 text-terracotta">{project.area}</p>
                      <h2 className="font-display mt-2 text-[1.35rem] leading-tight text-forest">
                        {project.title}
                      </h2>
                      <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-soft">
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
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <div className="mx-auto w-full max-w-[20rem] lg:max-w-none">
                  <LazyVideo
                    video={video}
                    label="Watch"
                    posterLabel="Maisha Quest Cares — community film"
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
