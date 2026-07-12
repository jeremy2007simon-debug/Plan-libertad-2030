import { EXPERIENCE_PILLARS } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";

export function Experiencia() {
  return (
    <section id="experiencia" className="relative py-28 md:py-40">
      <Container>
        <Reveal>
          <SectionIntro index="01">La experiencia</SectionIntro>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.12] font-light text-ink">
            No servimos platos.
            <br />
            <span className="italic text-gold">Servimos tiempo,</span>{" "}
            compañía y sobremesa.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          {EXPERIENCE_PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.1 + i * 0.1}>
              <GlassCard className="flex h-full flex-col gap-6 p-9">
                <span className="font-display text-sm italic text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-2xl font-light text-ink">
                  {pillar.title}
                </p>
                <p className="mt-auto text-sm leading-relaxed text-ink-dim">
                  {pillar.text}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
