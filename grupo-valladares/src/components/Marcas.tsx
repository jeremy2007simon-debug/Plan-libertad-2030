import { Image as ImageIcon } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

const SLOTS = Array.from({ length: 8 });

export function Marcas() {
  return (
    <section id="marcas" className="relative bg-bg py-28 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel index="06">Marcas</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold tracking-tight text-ink text-balance">
                Espacio preparado para las marcas que distribuimos.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm text-ink-dim">
              Los logotipos oficiales se incorporarán aquí en cuanto estén
              disponibles.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-dashed border-surface-border bg-surface-border sm:grid-cols-4">
          {SLOTS.map((_, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <div className="flex aspect-[3/2] items-center justify-center bg-bg text-ink-dim-2 transition-colors duration-500 hover:bg-bg-elevated">
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="size-5 opacity-50" strokeWidth={1.3} />
                  <span className="font-mono text-[.6rem] tracking-[0.1em] uppercase opacity-60">
                    Logotipo
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
