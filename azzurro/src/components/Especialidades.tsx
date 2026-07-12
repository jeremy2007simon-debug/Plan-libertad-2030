import { SPECIALTIES } from "@/lib/constants";
import { Icon, type IconName } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";

export function Especialidades() {
  return (
    <section
      id="especialidades"
      className="relative bg-bg-elevated py-28 md:py-40"
    >
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionIntro index="02" center>
              Especialidades
            </SectionIntro>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.2vw,3.2rem)] font-light text-ink">
              Nuestras especialidades
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
          {SPECIALTIES.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 6) * 0.06}>
              <GlassCard className="group flex h-full flex-col gap-5 p-7 md:p-9">
                <span className="flex size-11 items-center justify-center rounded-full border border-surface-border text-gold transition-colors duration-500 group-hover:border-gold/50">
                  <Icon name={item.icon as IconName} className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-light text-ink md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {item.description}
                  </p>
                </div>

                {item.examples.length > 0 && (
                  <ul className="mt-auto flex flex-col gap-1.5 border-t border-hair pt-4 text-sm">
                    {item.examples.map((dish) => (
                      <li
                        key={dish.name}
                        className="flex items-baseline justify-between gap-3 text-ink-dim"
                      >
                        <span>{dish.name}</span>
                        <span className="shrink-0 tabular-nums text-gold/80">
                          {dish.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-center text-xs text-ink-dim-2">
            Entrantes: selección real de la carta. El resto de categorías se
            irá completando con la carta oficial.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
