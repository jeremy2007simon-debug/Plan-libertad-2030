import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Reveal } from "@/components/ui/Reveal";
import { getImpact } from "@/lib/content";

/**
 * "Travel that gives back" — Maisha Quest Cares.
 *
 * El vídeo vertical de impacto va aquí, no en el hero: es material documental
 * de comunidad, y como hero perdería el sentido y el encuadre.
 *
 * Sobre datos: `outcomes` está vacío en todos los proyectos y esta sección no
 * muestra ni una cifra. En cuanto el cliente facilite resultados reales, la
 * lista aparece sola. Ver `src/data/impact.ts` para la advertencia interna
 * sobre autorización de imagen de menores — no se muestra en la interfaz.
 */
export async function Impact() {
  const { intro, projects, video } = await getImpact();

  return (
    <section className="dark-section bg-forest py-24 text-on-dark sm:py-32">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Vídeo vertical */}
          <Reveal className="lg:col-span-4">
            <div className="mx-auto w-full max-w-[20rem] lg:max-w-none">
              <LazyVideo
                video={video}
                label="Watch"
                posterLabel="Maisha Quest Cares, in the field"
                tone="dark"
                className="relative aspect-9/16 w-full bg-forest-deep"
              />
            </div>
          </Reveal>

          {/* Texto y proyectos */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="eyebrow text-sand">Maisha Quest Cares</p>
              <h2 className="text-h1 mt-5 text-ivory">{intro.title}</h2>
              <p className="text-lede measure mt-6 text-ivory/90 italic">
                {intro.lede}
              </p>
              <p className="measure mt-6 text-[0.96rem] leading-relaxed text-on-dark-soft">
                {intro.body}
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <p className="eyebrow text-on-dark-faint">{project.area}</p>
                    <h3 className="font-display mt-2 text-[1.25rem] text-ivory">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-on-dark-soft">
                      {project.description}
                    </p>
                    {/* Resultados: solo si existen de verdad. */}
                    {project.outcomes.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {project.outcomes.map((outcome) => (
                          <li key={outcome} className="text-[0.88rem] text-sand">
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <ButtonLink
                href="/impact"
                variant="secondary"
                tone="dark"
                className="mt-11"
              >
                How our impact works
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
