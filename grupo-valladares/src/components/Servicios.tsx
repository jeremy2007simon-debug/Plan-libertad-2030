import {
  Cog,
  Droplets,
  Filter,
  BatteryCharging,
  Disc,
  Wrench,
  Sparkles,
  Thermometer,
  Repeat,
  Waves,
  Lightbulb,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

const ICONS: Record<string, LucideIcon> = {
  recambios: Cog,
  lubricantes: Droplets,
  filtros: Filter,
  baterias: BatteryCharging,
  frenos: Disc,
  herramientas: Wrench,
  accesorios: Sparkles,
  refrigeracion: Thermometer,
  transmision: Repeat,
  suspension: Waves,
  iluminacion: Lightbulb,
  electronica: Cpu,
};

export function Servicios() {
  return (
    <section id="ofrecemos" className="relative bg-bg py-28 md:py-36">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel index="01">Qué ofrecemos</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-semibold tracking-tight text-ink text-balance">
              Todo el catálogo que un taller necesita, en un solo sitio.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-surface-border bg-surface-border sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.slug];
            return (
              <Reveal key={service.slug} delay={(i % 4) * 0.06}>
                <div className="group relative flex h-full flex-col justify-between gap-8 bg-bg p-7 transition-colors duration-500 hover:bg-bg-elevated md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-surface-border bg-surface text-blue-dim transition-all duration-500 group-hover:border-blue-dim/40 group-hover:text-blue-bright">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[.68rem] text-ink-dim-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium tracking-tight text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
