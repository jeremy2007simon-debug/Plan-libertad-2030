import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTeam } from "@/lib/content";

/**
 * "Meet the people behind your journey".
 *
 * Fichas editoriales, no una cuadrícula corporativa: retrato alto, nombre en
 * serif, una historia de tres líneas y los idiomas de cada persona —que aquí
 * son un argumento comercial real, no un adorno.
 *
 * Los retratos todavía no existen. `MediaFrame` pinta el hueco con la misma
 * proporción que tendrá la foto, así que el día que lleguen no se mueve nada.
 * Poner aquí fotos de archivo sería inventarse a tres personas concretas.
 */
export async function Team() {
  const team = await getTeam();

  return (
    <section className="bg-page-alt py-24 sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow="The team"
          title="Meet the people behind your journey"
          lede="Three founders in Arusha. Between them they cover journey design, safari operations and everything you feel once you are on the ground."
        >
          <ButtonLink href="/about/team" variant="quiet">
            The full team
          </ButtonLink>
        </SectionHeading>

        <Reveal className="mt-14">
          <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
            {team.map((member) => (
              <li key={member.slug}>
                <article className="flex h-full flex-col">
                  <div className="relative aspect-4/5 overflow-hidden">
                    <MediaFrame
                      media={member.portrait}
                      label={`Portrait of ${member.name}`}
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>

                  <h3 className="font-display mt-6 text-[1.5rem] leading-tight text-forest">
                    {member.name}
                  </h3>
                  <p className="eyebrow mt-2 text-terracotta">{member.role}</p>

                  <p className="mt-4 text-[0.94rem] leading-relaxed text-ink-soft">
                    {member.bio}
                  </p>

                  <dl className="mt-6 flex flex-col gap-3 border-t border-rule pt-5 text-[0.85rem]">
                    <div>
                      <dt className="eyebrow text-ink-faint">Languages</dt>
                      <dd className="mt-1 text-ink-soft">
                        {member.languages.join(" · ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-faint">Specialty</dt>
                      <dd className="mt-1 text-ink-soft">{member.specialty}</dd>
                    </div>
                    {/* El lugar favorito solo aparece cuando cada persona lo
                        haya indicado; nada de rellenarlo por ellos. */}
                    {member.favouritePlace && (
                      <div>
                        <dt className="eyebrow text-ink-faint">
                          Favourite place in Tanzania
                        </dt>
                        <dd className="mt-1 text-ink-soft">{member.favouritePlace}</dd>
                      </div>
                    )}
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
