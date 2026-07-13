import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const PILLARS = [
  { title: "Tradición", text: "Desde 1999, la misma cocina de siempre." },
  { title: "Sabor auténtico", text: "Recetas mexicanas, sin atajos." },
  { title: "Familia", text: "Se cocina y se sirve como en casa." },
];

export function Historia() {
  return (
    <section id="historia" className="relative py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center md:px-10 md:gap-20">
        <Reveal>
          {/* Foto de stock provisional (Unsplash, licencia libre de uso
              comercial) — no es una foto real del restaurante. Sustituir por
              fotografía propia en cuanto esté disponible: ver public/images/CREDITOS.md */}
          <div className="relative overflow-hidden rounded-[2px]" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/images/historia-provisional.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel index="01">Nuestra historia</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-tight font-light text-ink text-balance">
              México, servido
              <br />
              con calma y carácter.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-ink-dim leading-relaxed">
              En Guargacho cocinamos como se ha cocinado siempre en México:
              con fuego lento, producto de verdad y ganas de compartir. Cada
              mesa se atiende como si fuera la primera vez que abrimos las
              puertas — con el mismo cuidado, el mismo sabor y el mismo
              ambiente cercano que nos define desde el primer día.
            </p>
          </Reveal>

          <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.3 + i * 0.08}>
                <div className="border-t border-hair pt-4">
                  <p className="font-display text-lg italic text-gold">
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
