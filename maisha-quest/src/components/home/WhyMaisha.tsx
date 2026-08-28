import { Container } from "@/components/ui/Container";
import { CompassMark } from "@/components/ui/Compass";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { TRUST_CREDENTIALS } from "@/lib/site";

/**
 * "Your journey, in trusted hands".
 *
 * Seis motivos, sin una sola estadística. La franja de acreditaciones
 * (licencias, asociaciones, años en operación, viajeros atendidos, tiempo de
 * respuesta) está construida y maquetada, pero solo se pinta si
 * `TRUST_CREDENTIALS` tiene datos: hoy está vacío a propósito porque no
 * disponemos de esas cifras y ponerlas inventadas sería el peor error posible
 * en una sección que se titula "en manos de confianza".
 */
export function WhyMaisha({ t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="bg-page py-24 sm:py-32">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t.home.why.eyebrow}
              title={t.home.why.title}
              lede={t.home.why.lede}
            />

            <Reveal className="mt-10">
              <div className="relative aspect-4/5 overflow-hidden">
                <Photo
                  photo={CLIENT_PHOTOS["giraffe-patterns-monochrome"]}
                  alt=""
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                {t.home.why.pillars.map((pillar) => (
                  <li key={pillar.title}>
                    <CompassMark
                      className="size-6 text-gold"
                      needle={false}
                      strokeWidth={1.4}
                    />
                    <h3 className="font-display mt-4 text-[1.28rem] leading-tight text-forest">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-soft">
                      {pillar.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            {TRUST_CREDENTIALS.length > 0 && (
              <Reveal className="mt-12">
                <dl className="grid gap-6 border-t border-rule pt-8 sm:grid-cols-3">
                  {TRUST_CREDENTIALS.map((credential) => (
                    <div key={credential.label}>
                      <dt className="eyebrow text-ink-faint">{credential.label}</dt>
                      <dd className="font-display mt-1.5 text-[1.6rem] text-forest">
                        {credential.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
