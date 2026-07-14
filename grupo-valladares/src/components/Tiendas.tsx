import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { STORES } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STORES.map((store, i) => (
            <Reveal key={store.slug} delay={(i % 3) * 0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-surface-border bg-bg-elevated p-6 transition-colors duration-500 hover:border-blue-dim/35">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[.68rem] text-ink-dim-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                      {store.name}
                    </h3>
                  </div>
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
      </Container>
    </section>
  );
}
