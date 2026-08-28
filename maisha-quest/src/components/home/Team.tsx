import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/Photo";
import { AnimatedLine, ImageReveal, Reveal, Stagger } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { getTeam } from "@/lib/content";
import type { TeamMember } from "@/types/content";

/**
 * "Meet the people behind your journey".
 *
 * Los retratos reales todavía no existen, y esta ronda cambia cómo se resuelve
 * esa ausencia. Antes había un marco vertical con un monograma: ocupaba el
 * sitio de una fotografía y, por bien resuelto que estuviera, se leía como una
 * imagen que no ha cargado.
 *
 * Ahora la ficha es una composición TIPOGRÁFICA: número, filete dorado que se
 * traza, nombre en serif grande, función, y los datos que de verdad importan
 * —idiomas y especialidad—. No finge una fotografía; parece decidido así. El
 * día que lleguen los retratos se activa `MediaFrame` sin tocar el resto,
 * porque la condición ya está escrita.
 *
 * Poner aquí fotos de archivo sería inventarse a tres personas concretas, y
 * usar un animal en su lugar sería peor.
 */

function Member({
  member,
  index,
  t,
}: {
  member: TeamMember;
  index: number;
  t: Dictionary;
}) {
  const languages = member.languages
    .map((code) => t.languageNames[code as keyof typeof t.languageNames])
    .join(" · ");

  return (
    <article className="flex h-full flex-col border-t border-rule-strong pt-6">
      {member.portrait.src && (
        <ImageReveal className="mb-6 aspect-4/5">
          <MediaFrame
            media={member.portrait}
            label={t.team.portraitOf(member.name)}
            sizes="(max-width: 768px) 86vw, 30vw"
          />
        </ImageReveal>
      )}

      <span
        aria-hidden="true"
        className="tnum text-[0.66rem] tracking-[0.24em] text-[var(--earth)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="font-display mt-3 text-[1.85rem] leading-[1.08] text-forest">
        {member.name}
      </h3>
      <p className="eyebrow mt-2.5 text-terracotta-text">{member.role}</p>

      <AnimatedLine tone="gold" className="mt-5 max-w-[7rem]" delay={0.1} />

      <p className="mt-5 text-[0.94rem] leading-relaxed text-ink-soft">
        {member.bio}
      </p>

      <dl className="mt-auto flex flex-col gap-3 pt-6 text-[0.85rem]">
        <div>
          <dt className="eyebrow text-ink-faint">{t.team.languages}</dt>
          <dd className="mt-1 text-ink">{languages}</dd>
        </div>
        <div>
          <dt className="eyebrow text-ink-faint">{t.team.specialty}</dt>
          <dd className="mt-1 text-ink-soft">{member.specialty}</dd>
        </div>
        {/* El lugar favorito solo aparece cuando cada persona lo haya
            indicado; nada de rellenarlo por ellos. */}
        {member.favouritePlace && (
          <div>
            <dt className="eyebrow text-ink-faint">{t.team.favouritePlace}</dt>
            <dd className="mt-1 text-ink-soft">{member.favouritePlace}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

export async function Team({ locale, t }: { locale: Locale; t: Dictionary }) {
  const team = await getTeam(locale);

  return (
    <section className="texture-paper relative isolate bg-sand py-20 sm:py-24">
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

        <ul className="mt-12 hidden gap-8 md:grid md:grid-cols-3 md:gap-8">
          <Stagger as="li" step={0.1}>
            {team.map((member, index) => (
              <Member key={member.slug} member={member} index={index} t={t} />
            ))}
          </Stagger>
        </ul>

        {/* Móvil: mismo contenido, en carrusel. Tres fichas completas apiladas
            sumaban 2.800 px y obligaban a pasar por las tres para llegar a la
            siguiente sección. */}
        <div className="mt-10 md:hidden">
          <Reveal>
            <Carousel label={t.home.team.title} itemClassName="w-[86vw] max-w-[21rem]">
              {team.map((member, index) => (
                <Member key={member.slug} member={member} index={index} t={t} />
              ))}
            </Carousel>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
