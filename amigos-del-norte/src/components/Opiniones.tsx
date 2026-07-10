import { RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

// Marcadores de posición a la espera de conectar las reseñas reales de
// Google (Places API o el widget de Google Business Profile). No se
// inventan testimonios ni valoraciones.
const PLACEHOLDER_SLOTS = [1, 2, 3];

export function Opiniones() {
  return (
    <section id="opiniones" className="relative py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionLabel index="05" center>
              Opiniones
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
              Lo que dicen en Google
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-ink-dim">
              Próximamente mostraremos aquí las reseñas reales de Google.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PLACEHOLDER_SLOTS.map((slot) => (
            <Reveal key={slot} delay={slot * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-[2px] border border-surface-border bg-surface p-7">
                <div className="flex gap-1 text-gold/40">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <div className="h-3 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />
                <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/[0.06]" />
                <p className="mt-auto text-xs tracking-wide text-ink-dim-2 uppercase">
                  Reseña de Google — próximamente
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-10 text-center">
            <a
              href={RESTAURANT.googleReviewsSearchHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gold"
            >
              Ver reseñas en Google
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
