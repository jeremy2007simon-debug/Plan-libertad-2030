import { PlaceholderImage } from "./ui/PlaceholderImage";
import { Reveal } from "./ui/Reveal";
import { Icon } from "./ui/Icon";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        {/* Sustituir por la fotografía real del restaurante (next/image, fill, priority) */}
        <PlaceholderImage
          label="Fotografía del restaurante"
          ratio="auto"
          tone="deep"
          className="h-full w-full rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 pb-24 pt-40 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="flex items-center gap-3 text-[.72rem] font-semibold tracking-[0.3em] text-ink-dim uppercase">
              <span className="h-px w-8 bg-gold" />
              Las Chafiras · San Miguel de Abona · Tenerife
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.03] font-light text-ink text-balance">
              Tradición, calidad y sabor
              <span className="italic text-gold"> en cada plato.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-lg text-lg text-ink-dim">
              Disfruta de una experiencia gastronómica única en Las Chafiras.
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href="#reservas"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-bg shadow-[0_10px_40px_-12px_var(--gold-glow)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_55px_-10px_var(--gold-glow)]"
              >
                Reservar mesa
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#especialidades"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold tracking-wide text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold"
              >
                Ver carta
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-dim-2 md:flex">
        <span className="text-[.65rem] tracking-[0.25em] uppercase">
          Desliza
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
