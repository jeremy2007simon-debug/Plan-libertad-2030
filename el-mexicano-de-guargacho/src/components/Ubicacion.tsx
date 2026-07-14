import { RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

export function Ubicacion() {
  return (
    <section id="ubicacion" className="relative bg-bg-elevated py-28 md:py-36">
      <Container>
        <div className="grid gap-16 md:grid-cols-2 md:items-center md:gap-20">
          <div>
            <Reveal>
              <SectionLabel index="07">Ubicación</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
                Te esperamos en Guargacho
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 flex flex-col gap-7">
                <div className="flex items-start gap-4">
                  <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-terracota" />
                  <div>
                    <dt className={"text-xs tracking-[0.18em] uppercase text-ink-dim"}>
                      Dirección
                    </dt>
                    <dd className="mt-1 text-ink">
                      {RESTAURANT.address.line1}
                      <br />
                      {RESTAURANT.address.line2}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-terracota" />
                  <div>
                    <dt className="text-xs tracking-[0.18em] uppercase text-ink-dim">
                      Teléfono
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={RESTAURANT.phoneHref}
                        className="text-ink transition-colors hover:text-terracota"
                      >
                        {RESTAURANT.phone}
                      </a>
                      <span className="block text-sm text-ink-dim-2">
                        Desde el extranjero: {RESTAURANT.phoneIntl}
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-terracota" />
                  <div>
                    <dt className="text-xs tracking-[0.18em] uppercase text-ink-dim">
                      Horario
                    </dt>
                    <dd className="mt-1 text-ink-dim">
                      {RESTAURANT.hours ??
                        `Consulta el horario llamando al ${RESTAURANT.phone}`}
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <a
                href={RESTAURANT.mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold tracking-wide text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-terracota/50 hover:text-terracota"
              >
                Cómo llegar
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-[2px] border border-surface-border">
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
