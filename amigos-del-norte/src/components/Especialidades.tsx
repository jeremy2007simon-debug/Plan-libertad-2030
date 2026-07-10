import { SPECIALTIES } from "@/lib/constants";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

const CARTA_URL = "https://restauranteamigosdelnorte.tucartadigital.com/";

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

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[2px] bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {SPECIALTIES.map((item, i) => (
            <Reveal
              key={item.slug}
              delay={(i % 4) * 0.06}
              className={i === SPECIALTIES.length - 1 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <div className="group flex h-full flex-col gap-5 bg-bg-elevated p-8 transition-colors duration-500 hover:bg-[#181410]">
                <span className="flex size-12 items-center justify-center rounded-full border border-surface-border text-gold transition-colors duration-500 group-hover:border-gold/50">
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

                {item.examples.length > 0 && (
                  <ul className="mt-auto flex flex-col gap-1.5 border-t border-hair pt-4 text-sm">
                    {item.examples.map((dish) => (
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
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-xs text-ink-dim-2">
            Precios orientativos, sujetos a variación.{" "}
            <a
              href={CARTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline underline-offset-4 transition-colors hover:text-ink"
            >
              Ver carta completa
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
