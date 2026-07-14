import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { Container } from "./ui/Container";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-bg py-6">
      <Container>
        <div className="bg-grid relative isolate overflow-hidden rounded-[2rem] border border-surface-border bg-bg-elevated-2 px-8 py-24 text-center md:px-16 md:py-32">
          <div className="absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/25 blur-[130px]" />

          <Reveal className="mx-auto flex flex-col items-center">
            <span className="relative size-2 rounded-full bg-yellow">
              <span className="absolute inset-0 rounded-full bg-yellow blur-[6px]" />
            </span>
            <h2 className="mt-8 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.08] font-semibold tracking-tight text-ink text-balance">
              ¿No encuentras la pieza que necesitas?
            </h2>
            <p className="mt-6 max-w-md text-ink-dim">
              Habla directamente con nuestro equipo técnico. Te ayudamos a
              identificar la referencia exacta.
            </p>
            <a
              href={COMPANY.whatsappHref}
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-blue px-9 py-4 text-sm font-medium tracking-tight text-white shadow-[0_10px_40px_-12px_var(--blue-glow)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-10px_var(--blue-glow)]"
            >
              Hablar con un especialista
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
