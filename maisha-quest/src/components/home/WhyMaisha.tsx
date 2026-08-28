import { Container } from "@/components/ui/Container";
import { CompassMark } from "@/components/ui/Compass";
import { Photo } from "@/components/ui/Photo";
import { ImageReveal, Reveal, Stagger } from "@/components/ui/motion";
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
 *
 * Sobre tierra oscura y sin tarjetas: los seis motivos van sobre el fondo, con
 * su icono de brújula y un filete dorado por encima. Una tarjeta blanca
 * flotando sobre marrón es exactamente el aspecto de panel de aplicación que
 * el encargo descarta, y además obligaría a un tercer color de texto.
 */
export function WhyMaisha({ t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="dark-section texture-dust relative isolate bg-earth py-20 text-on-dark sm:py-24">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="dark"
              eyebrow={t.home.why.eyebrow}
              title={t.home.why.title}
              lede={t.home.why.lede}
            />

            <ImageReveal className="mt-9 aspect-square">
              <Photo
                photo={CLIENT_PHOTOS["giraffe-patterns-monochrome"]}
                alt=""
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
            </ImageReveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <Stagger as="li" step={0.07}>
                {t.home.why.pillars.map((pillar) => (
                  <span key={pillar.title} className="block">
                    {/* Separador dorado discreto en lugar de un borde de
                        tarjeta: marca el bloque sin dibujar una caja. */}
                    <span className="rule-gold block h-px w-14 origin-left" />
                    <CompassMark
                      className="mt-5 size-6 text-[var(--gold)]"
                      needle={false}
                      strokeWidth={1.4}
                    />
                    <span className="font-display mt-4 block text-[1.28rem] leading-tight text-parchment">
                      {pillar.title}
                    </span>
                    <span className="mt-2.5 block text-[0.92rem] leading-relaxed text-on-dark-soft">
                      {pillar.body}
                    </span>
                  </span>
                ))}
              </Stagger>
            </ul>

            {TRUST_CREDENTIALS.length > 0 && (
              <Reveal className="mt-12">
                <dl className="grid gap-6 border-t border-rule-on-dark pt-8 sm:grid-cols-3">
                  {TRUST_CREDENTIALS.map((credential) => (
                    <div key={credential.label}>
                      <dt className="eyebrow text-on-dark-faint">{credential.label}</dt>
                      <dd className="font-display mt-1.5 text-[1.6rem] text-parchment">
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
