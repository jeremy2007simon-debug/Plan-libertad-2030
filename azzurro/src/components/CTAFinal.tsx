import { Reveal } from "./ui/Reveal";
import { Icon } from "./ui/Icon";

export function CTAFinal() {
  return (
    <section className="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-bg py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 55% at 50% 40%, rgba(182,138,78,0.14), transparent 70%)",
        }}
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <p className="text-[.72rem] font-medium tracking-[0.34em] text-ink-dim uppercase">
            Azzurro
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 text-balance font-display text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.15] text-ink">
            Una mesa puede reservarse en segundos.
            <br />
            <span className="italic text-gold">
              Los recuerdos duran para siempre.
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.26}>
          <a
            href="#reservas"
            className="group mt-14 inline-flex items-center gap-3 rounded-full bg-gold px-12 py-5 text-base font-medium tracking-wide text-bg shadow-[0_20px_60px_-15px_var(--gold-glow)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_-12px_var(--gold-glow)]"
          >
            Reservar ahora
            <Icon
              name="arrowRight"
              className="size-5 transition-transform duration-500 group-hover:translate-x-1.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
