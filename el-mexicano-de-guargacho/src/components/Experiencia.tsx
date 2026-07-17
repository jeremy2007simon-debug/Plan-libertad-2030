"use client";

import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { useT } from "./i18n/LanguageProvider";

export function Experiencia() {
  const t = useT();

  return (
    <section id="experiencia" className="relative overflow-hidden py-32 md:py-44">
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--cta-glow) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-1/3 left-[15%] h-[26rem] w-[26rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--olive-glow) 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel index="03" center>
              {t.experiencia.label}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] font-light text-ink text-balance">
              {t.experiencia.titleLine1}
              <br />
              {t.experiencia.titleLine2.pre}
              <span className="italic text-cta">
                {t.experiencia.titleLine2.word1}
              </span>
              {t.experiencia.titleLine2.mid}
              <span className="italic text-terracota">
                {t.experiencia.titleLine2.word2}
              </span>
              {t.experiencia.titleLine2.post}
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {t.experiencia.moments.map((m, i) => (
            <Reveal key={m.n} delay={0.2 + i * 0.1}>
              <div className="border-t border-hair pt-6 text-center sm:text-left">
                <span className="font-display text-sm text-terracota/70 tabular-nums">
                  {m.n}
                </span>
                <h3 className="mt-3 font-display text-2xl italic text-ink">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                  {m.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
