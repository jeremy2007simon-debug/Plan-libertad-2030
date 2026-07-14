import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg pt-28 pb-20"
    >
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)] opacity-60" />
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue/20 blur-[140px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[.72rem] font-medium tracking-[0.3em] text-ink-dim uppercase">
              <span className="h-px w-8 bg-blue" />
              Recambios · Suministros · Distribución
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-2xl font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] font-semibold tracking-tight text-ink text-balance">
              El socio que mueve
              <br />
              <span className="text-blue-dim">tu taller.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-7 max-w-md text-lg text-ink-dim">
              Soluciones en recambios y suministros para profesionales y
              particulares.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href="#presupuesto"
                className="group inline-flex items-center gap-2.5 rounded-full bg-blue px-8 py-4 text-sm font-medium tracking-tight text-white shadow-[0_10px_40px_-12px_var(--blue-glow)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-10px_var(--blue-glow)]"
              >
                Solicitar presupuesto
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <a
                href="#tiendas"
                className="inline-flex items-center gap-2.5 rounded-full border border-surface-border px-8 py-4 text-sm font-medium tracking-tight text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-blue-dim/50"
              >
                <MapPin className="size-4 text-blue-dim" />
                Localizar tienda
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-hair pt-8">
              {["Rapidez", "Disponibilidad", "Asesoramiento técnico"].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-[.8rem] font-medium text-ink-dim"
                >
                  <span className="size-1 rounded-full bg-blue-dim" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25} className="hidden lg:block">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
