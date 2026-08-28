import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { MediaFrame, PersonSlot } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
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
export async function Team({ locale, t }: { locale: Locale; t: Dictionary }) {
  const team = await getTeam(locale);

  return (
    <section className="bg-page-alt py-24 sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow={t.home.team.eyebrow}
          title={t.home.team.title}
          lede={t.home.team.lede}
        >
          <ButtonLink href="/about/team" locale={locale} variant="quiet">
            {t.home.team.cta}
          </ButtonLink>
        </SectionHeading>

        <Reveal className="mt-14 hidden md:block">
          <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
            {team.map((member) => (
              <li key={member.slug}>
                <article className="flex h-full flex-col">
                  {/* Con foto, marco vertical 4:5. Sin ella, monograma
                      cuadrado: la mitad de alto y con aspecto intencionado. */}
                  <div
                    className={`relative overflow-hidden ${
                      member.portrait.src ? "aspect-4/5" : "aspect-square"
                    }`}
                  >
                    {member.portrait.src ? (
                      <MediaFrame
                        media={member.portrait}
                        label={t.team.portraitOf(member.name)}
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    ) : (
                      <PersonSlot name={member.name} />
                    )}
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
                      <dt className="eyebrow text-ink-faint">{t.team.languages}</dt>
                      <dd className="mt-1 text-ink-soft">
                        {member.languages
                          .map((code) => t.languageNames[code as keyof typeof t.languageNames])
                          .join(" · ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-ink-faint">{t.team.specialty}</dt>
                      <dd className="mt-1 text-ink-soft">{member.specialty}</dd>
                    </div>
                    {/* El lugar favorito solo aparece cuando cada persona lo
                        haya indicado; nada de rellenarlo por ellos. */}
                    {member.favouritePlace && (
                      <div>
                        <dt className="eyebrow text-ink-faint">
                          {t.team.favouritePlace}
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

        {/* Móvil: mismo contenido, en carrusel. Tres fichas completas apiladas
            sumaban 2.800 px y obligaban a pasar por las tres para llegar a la
            siguiente sección. */}
        <div className="mt-10 md:hidden">
          <Carousel label={t.home.team.title} itemClassName="w-[86vw] max-w-[21rem]">
            {team.map((member) => (
              <article key={member.slug} className="flex h-full flex-col">
                <div
                  className={`relative overflow-hidden ${
                    member.portrait.src ? "aspect-4/5" : "aspect-square"
                  }`}
                >
                  {member.portrait.src ? (
                    <MediaFrame
                      media={member.portrait}
                      label={t.team.portraitOf(member.name)}
                      sizes="86vw"
                    />
                  ) : (
                    <PersonSlot name={member.name} />
                  )}
                </div>

                <h3 className="font-display mt-5 text-[1.5rem] leading-tight text-forest">
                  {member.name}
                </h3>
                <p className="eyebrow mt-2 text-terracotta">{member.role}</p>
                <p className="mt-4 text-[0.94rem] leading-relaxed text-ink-soft">
                  {member.bio}
                </p>
                <dl className="mt-5 border-t border-rule pt-4 text-[0.85rem]">
                  <dt className="eyebrow text-ink-faint">{t.team.languages}</dt>
                  <dd className="mt-1 text-ink-soft">{member.languages
                          .map((code) => t.languageNames[code as keyof typeof t.languageNames])
                          .join(" · ")}</dd>
                </dl>
              </article>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
