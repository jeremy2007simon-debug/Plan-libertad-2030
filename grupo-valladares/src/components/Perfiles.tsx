import { Check, Wrench, User } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";

const PROFILES = [
  {
    icon: Wrench,
    title: "Profesionales",
    description:
      "Condiciones y suministro pensados para el ritmo de un taller.",
    benefits: [
      "Catálogo profesional ampliado",
      "Disponibilidad prioritaria",
      "Asesoramiento técnico directo",
      "Facturación y condiciones a medida",
    ],
    tone: "blue" as const,
  },
  {
    icon: User,
    title: "Particulares",
    description:
      "La misma calidad y el mismo trato, sin necesidad de ser profesional del sector.",
    benefits: [
      "Atención cercana y sin tecnicismos",
      "Pieza correcta para tu vehículo",
      "Recogida en tienda",
      "Precio claro desde el primer momento",
    ],
    tone: "light" as const,
  },
];

export function Perfiles() {
  return (
    <section id="perfiles" className="relative bg-bg-elevated py-28 md:py-36">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel index="02">Para quién trabajamos</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-semibold tracking-tight text-ink text-balance">
              Dos formas de trabajar con nosotros.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {PROFILES.map((profile, i) => (
            <Reveal key={profile.title} delay={i * 0.12}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-10 transition-all duration-500 md:p-12 ${
                  profile.tone === "blue"
                    ? "border-blue-dim/25 bg-gradient-to-br from-blue/[0.09] via-bg to-bg hover:border-blue-dim/45"
                    : "border-surface-border bg-bg hover:border-white/20"
                }`}
              >
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue/10 blur-[100px] transition-opacity duration-500 group-hover:opacity-80" />

                <span
                  className={`relative flex size-12 items-center justify-center rounded-xl border ${
                    profile.tone === "blue"
                      ? "border-blue-dim/40 bg-blue/10 text-blue-bright"
                      : "border-surface-border bg-surface text-ink"
                  }`}
                >
                  <profile.icon className="size-5" strokeWidth={1.5} />
                </span>

                <h3 className="relative mt-8 font-display text-2xl font-semibold tracking-tight text-ink">
                  {profile.title}
                </h3>
                <p className="relative mt-3 max-w-sm text-ink-dim">
                  {profile.description}
                </p>

                <ul className="relative mt-8 flex flex-col gap-3.5">
                  {profile.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-dim" strokeWidth={2} />
                      <span className="text-sm text-ink-dim">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
