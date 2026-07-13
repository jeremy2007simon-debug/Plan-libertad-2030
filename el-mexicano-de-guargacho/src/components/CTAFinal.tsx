import { Reveal } from "./ui/Reveal";
import { Icon } from "./ui/Icon";

export function CTAFinal() {
  return (
    <section className="relative flex min-h-[85svh] items-center justify-center overflow-hidden bg-bg py-32">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--gold-glow) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.1] font-light text-ink text-balance">
            Cada mesa cuenta una historia.
            <br />
            La próxima puede ser{" "}
            <span className="italic text-gold">la tuya</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href="#reservas"
            className="group mt-12 inline-flex items-center gap-2.5 rounded-full bg-gold px-9 py-4 text-sm font-semibold tracking-wide text-bg shadow-[0_10px_40px_-12px_var(--gold-glow)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_55px_-10px_var(--gold-glow)]"
          >
            Reservar ahora
            <Icon
              name="arrowRight"
              className="size-4 transition-transform duration-500 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
