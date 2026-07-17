"use client";

import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { useT } from "./i18n/LanguageProvider";

// Foto de stock provisional servida directamente desde Unsplash (licencia
// libre de uso comercial) — no es una foto real del restaurante. Ver
// public/images/CREDITOS.md para el crédito y el criterio de sustitución.
const HISTORIA_IMAGE_URL =
  "https://images.unsplash.com/photo-1680992071073-cb1696ba8d3e?fm=jpg&q=80&w=1400&fit=crop";

export function Historia() {
  const t = useT();

  return (
    <section id="historia" className="relative py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center md:px-10 md:gap-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2px]" style={{ aspectRatio: "4/5" }}>
            <Image
              src={HISTORIA_IMAGE_URL}
              alt=""
              fill
              className="object-cover object-[30%_center]"
            />
            <div className="absolute inset-0 bg-bg/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/10" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel index="01">{t.historia.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-tight font-light text-ink text-balance">
              {t.historia.titleLine1}
              <br />
              {t.historia.titleLine2}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-ink-dim leading-relaxed">
              {t.historia.paragraph}
            </p>
          </Reveal>

          <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {t.historia.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.3 + i * 0.08}>
                <div className="border-t border-hair pt-4">
                  <p className="font-display text-lg italic text-terracota">
                    {pillar.title}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-dim">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
