import { SPECIALTIES } from "@/lib/constants";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

const MAX_EXAMPLES = 3;

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

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] bg-hair lg:grid-cols-4">
          {SPECIALTIES.map((item, i) => {
            const shown = item.examples.slice(0, MAX_EXAMPLES);
            const remaining = item.examples.length - shown.length;

            return (
              <Reveal key={item.slug} delay={(i % 4) * 0.06}>
                <div className="group flex h-full flex-col gap-5 bg-bg-elevated p-8 transition-colors duration-500 hover:bg-[#1c1712]">
                  <span className="flex size-12 items-center justify-center rounded-full border border-surface-border text-gold transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_24px_-6px_var(--gold-glow)]">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                      {item.description}
                    </p>
                  </div>

                  {shown.length > 0 && (
                    <ul className="mt-auto flex flex-col gap-1.5 border-t border-hair pt-4 text-sm">
                      {shown.map((dish) => (
                        <li
                          key={dish.name}
                          className="flex items-baseline justify-between gap-3 text-ink-dim"
                        >
                          <span className="truncate">{dish.name}</span>
                          <span className="shrink-0 tabular-nums text-gold/80">
                            {dish.price}
                          </span>
                        </li>
                      ))}
                      {remaining > 0 && (
                        <li className="text-xs text-ink-dim-2">
                          +{remaining} más en la carta
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-xs text-ink-dim-2">
            Precios orientativos, sujetos a variación. Carta completa
            disponible en sala.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
