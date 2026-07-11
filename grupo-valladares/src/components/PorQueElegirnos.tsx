import { Zap, PackageCheck, Headset, ShieldCheck, Compass } from "lucide-react";
import { WHY_US } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

const ICONS = [Zap, PackageCheck, Headset, ShieldCheck, Compass];

export function PorQueElegirnos() {
  return (
    <section className="relative bg-bg-elevated py-28 md:py-36">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel index="07">¿Por qué elegirnos?</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-semibold tracking-tight text-ink text-balance">
              Cinco razones para trabajar con nosotros.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group">
                  <span className="relative flex size-12 items-center justify-center rounded-xl border border-surface-border bg-surface text-blue-dim transition-all duration-500 group-hover:-translate-y-1 group-hover:border-blue-dim/40">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-base font-medium tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
