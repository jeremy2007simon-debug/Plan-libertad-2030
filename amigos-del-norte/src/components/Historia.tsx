import { PlaceholderImage } from "./ui/PlaceholderImage";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";

const PILLARS = [
  { title: "Producto fresco", text: "Seleccionado con cuidado, cada día." },
  { title: "Recetas de siempre", text: "Cocina tradicional, sin atajos." },
  { title: "Trato cercano", text: "Como en casa, desde que entras." },
];

export function Historia() {
  return (
    <section id="historia" className="relative py-28 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:items-center md:px-10 md:gap-20">
        <Reveal>
          <PlaceholderImage label="Nuestra cocina" ratio="4/5" />
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel index="01">Nuestra historia</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-tight font-light text-ink text-balance">
              Un restaurante familiar,
              <br />
              con el sabor de siempre.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-ink-dim leading-relaxed">
              Amigos del Norte nace de una cocina familiar: la que cuida el
              producto, respeta las recetas de siempre y trata a cada
              comensal como si volviera a casa. Sin prisa, sin atajos —
              solo buena mesa, tradición y un servicio cercano en el corazón
              de Las Chafiras.
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
