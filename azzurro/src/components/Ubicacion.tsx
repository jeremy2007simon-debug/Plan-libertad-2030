import { RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

export function Ubicacion() {
  return (
    <section
      id="ubicacion"
      className="relative bg-bg-elevated py-28 md:py-40"
    >
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-20">
          <div>
            <Reveal>
              <SectionIntro index="06">Ubicación</SectionIntro>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.2vw,3.2rem)] font-light text-ink">
                Te esperamos en Las Chafiras
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 flex flex-col gap-7">
                <div className="flex items-start gap-4">
                  <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div>
                    <dt className="text-xs tracking-[0.2em] uppercase text-ink-dim">
                      Dirección
                    </dt>
                    <dd className="mt-1 text-ink-dim">
                      {RESTAURANT.address.complement}
                      <br />
                      {RESTAURANT.address.street}
                      <br />
                      {RESTAURANT.address.postalCode} {RESTAURANT.address.locality}
                      <br />
                      {RESTAURANT.address.municipality}, Tenerife
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div>
                    <dt className="text-xs tracking-[0.2em] uppercase text-ink-dim">
                      Teléfono
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={RESTAURANT.phoneHref}
                        className="text-ink-dim transition-colors hover:text-gold"
                      >
                        {RESTAURANT.phone}
                      </a>
                      <span className="mt-0.5 block text-xs text-ink-dim-2">
                        {RESTAURANT.phoneIntl}
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div>
                    <dt className="text-xs tracking-[0.2em] uppercase text-ink-dim">
                      Horario
                    </dt>
                    <dd className="mt-1 text-ink-dim">
                      {RESTAURANT.hours.weekday.label}: {RESTAURANT.hours.weekday.value}
                      <br />
                      {RESTAURANT.hours.sunday.label}: {RESTAURANT.hours.sunday.value}
                    </dd>
                    {RESTAURANT.hours.provisional && (
                      <p className="mt-1.5 text-xs italic text-ink-dim-2">
                        {RESTAURANT.hours.note}
                      </p>
                    )}
                  </div>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                href={RESTAURANT.mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-sm font-medium tracking-wide text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold"
              >
                Cómo llegar
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-sm border border-surface-border">
              <iframe
                title={`Mapa — ${RESTAURANT.name}`}
                src={RESTAURANT.mapsEmbedSrc}
                width="100%"
                height="440"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.4] contrast-[1.05] invert-[0.92] hue-rotate-180"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
