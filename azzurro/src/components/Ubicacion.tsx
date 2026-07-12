import { RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
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
                Te esperamos pronto
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
                      {RESTAURANT.address.line1}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div>
                    <dt className="text-xs tracking-[0.2em] uppercase text-ink-dim">
                      Teléfono
                    </dt>
                    <dd className="mt-1 text-ink-dim">
                      {RESTAURANT.phone ?? "Pendiente de confirmar"}
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
                      {RESTAURANT.hours ?? "Pendiente de confirmar"}
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {RESTAURANT.mapsDirectionsHref ? (
              <div className="overflow-hidden rounded-sm border border-surface-border">
                <iframe
                  title={`Mapa — ${RESTAURANT.name}`}
                  src={RESTAURANT.mapsEmbedSrc ?? undefined}
                  width="100%"
                  height="440"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[0.4] contrast-[1.05] invert-[0.92] hue-rotate-180"
                />
              </div>
            ) : (
              <GlassCard
                className="flex h-[360px] flex-col items-center justify-center gap-4 p-10 text-center md:h-[440px]"
                glow="none"
              >
                <Icon name="pin" className="size-8 text-gold/50" />
                <p className="text-sm text-ink-dim">
                  El mapa se activará en cuanto se confirme la dirección del
                  local.
                </p>
              </GlassCard>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
