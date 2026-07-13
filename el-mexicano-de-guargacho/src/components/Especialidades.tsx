import { SPECIALTIES } from "@/lib/constants";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

export function Especialidades() {
  return (
    <section id="especialidades" className="relative bg-bg-elevated py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionLabel index="02" center>
              Especialidades
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
              Lo que nos define
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] bg-hair sm:grid-cols-3 lg:grid-cols-4">
          {SPECIALTIES.map((item, i) => (
            <Reveal
              key={item.slug}
              delay={(i % 4) * 0.06}
              className={i === SPECIALTIES.length - 1 ? "col-span-2 sm:col-span-1" : ""}
            >
              <div className="group flex h-full min-h-[13rem] flex-col items-center justify-center gap-5 bg-bg-elevated p-8 text-center transition-colors duration-500 hover:bg-[#1c1712]">
                <span className="flex size-14 items-center justify-center rounded-full border border-surface-border text-gold transition-all duration-500 group-hover:scale-105 group-hover:border-gold/50 group-hover:shadow-[0_0_24px_-6px_var(--gold-glow)]">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-xs text-ink-dim-2">
            Carta completa disponible en sala. Pregunta por las sugerencias
            del día.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
