import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { STORES } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

const PIN_POSITIONS = [
  { top: "38%", left: "46%" },
  { top: "22%", left: "68%" },
  { top: "64%", left: "30%" },
];

function MapPlaceholder() {
  return (
    <div className="bg-grid relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-surface-border bg-bg-elevated-2 lg:aspect-auto lg:h-full">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue/15 blur-[110px]" />

      {STORES.map((store, i) => {
        const pos = PIN_POSITIONS[i % PIN_POSITIONS.length];
        return (
          <div
            key={store.slug}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
            style={{ top: pos.top, left: pos.left }}
          >
            <span className="rounded-full border border-surface-border bg-bg/90 px-2.5 py-1 font-mono text-[.62rem] tracking-[0.08em] text-ink-dim whitespace-nowrap uppercase backdrop-blur-md">
              {store.name}
            </span>
            <span className="relative mt-1.5 flex size-3 items-center justify-center">
              <span className="absolute size-3 animate-ping rounded-full bg-blue/60" />
              <span className="relative size-2.5 rounded-full bg-blue shadow-[0_0_12px_var(--blue-glow)]" />
            </span>
          </div>
        );
      })}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-hair bg-bg/70 px-5 py-3 backdrop-blur-md">
        <span className="font-mono text-[.68rem] tracking-[0.1em] text-ink-dim-2 uppercase">
          Mapa — vista previa
        </span>
        <span className="font-mono text-[.68rem] text-ink-dim-2">
          {STORES.length} tiendas
        </span>
      </div>
    </div>
  );
}

export function Tiendas() {
  return (
    <section id="tiendas" className="relative bg-bg py-28 md:py-36">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel index="03">Localiza tu tienda</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-semibold tracking-tight text-ink text-balance">
              Cerca de donde trabajas.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal delay={0.1}>
            <MapPlaceholder />
          </Reveal>

          <div className="flex flex-col gap-4">
            {STORES.map((store, i) => (
              <Reveal key={store.slug} delay={0.15 + i * 0.08}>
                <div className="group rounded-2xl border border-surface-border bg-bg-elevated p-6 transition-colors duration-500 hover:border-blue-dim/35">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                      {store.name}
                    </h3>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-surface-border bg-surface text-blue-dim">
                      <MapPin className="size-4" strokeWidth={1.5} />
                    </span>
                  </div>

                  <dl className="mt-4 flex flex-col gap-2 text-sm text-ink-dim">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 size-3.5 shrink-0 text-ink-dim-2" />
                      <dd>{store.address}</dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="size-3.5 shrink-0 text-ink-dim-2" />
                      <dd>{store.hours}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex items-center gap-3">
                    <a
                      href={store.mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-surface-border px-4 py-2 text-xs font-medium text-ink transition-colors duration-300 hover:border-blue-dim/50 hover:text-blue-dim"
                    >
                      Cómo llegar
                      <ArrowUpRight className="size-3.5" />
                    </a>
                    <a
                      href={`tel:${store.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-surface-border px-4 py-2 text-xs font-medium text-ink transition-colors duration-300 hover:border-blue-dim/50 hover:text-blue-dim"
                    >
                      <Phone className="size-3.5" />
                      Llamar
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
