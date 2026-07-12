import { Reveal } from "./ui/Reveal";
import { VideoBackground } from "./ui/VideoBackground";
import { Icon } from "./ui/Icon";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        {/* Vídeo institucional preparado — pasar `src` cuando exista una
            grabación real. Ver VideoBackground.tsx. */}
        <VideoBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 pb-24 pt-40 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="flex items-center gap-3 text-[.72rem] font-medium tracking-[0.34em] text-ink-dim uppercase">
              <span className="h-px w-8 bg-gold shadow-[0_0_10px_var(--gold-soft)]" />
              Azzurro · Restaurante italiano
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.6rem,7vw,6.2rem)] leading-[1.02] font-light text-ink">
              La auténtica experiencia italiana
              <span className="italic text-gold"> comienza aquí.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-dim">
              Una propuesta de experiencia gastronómica elegante y moderna.
            </p>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#reservas"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-bg shadow-[0_10px_40px_-12px_var(--gold-glow)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-10px_var(--gold-glow)]"
              >
                Reservar mesa
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#especialidades"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-sm font-medium tracking-wide text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold"
              >
                Descubrir carta
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-dim-2 md:flex">
        <span className="text-[.65rem] tracking-[0.28em] uppercase">
          Desliza
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
