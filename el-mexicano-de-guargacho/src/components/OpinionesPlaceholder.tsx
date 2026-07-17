"use client";

import { REVIEWS_SUMMARY, RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";
import { Stars } from "./ui/Stars";
import { useT } from "./i18n/LanguageProvider";

// Estado "sin integración": ningún dato individual inventado, solo la
// valoración agregada pública (REVIEWS_SUMMARY, en src/lib/constants.ts).
// Componente cliente (necesita useT()) — Opiniones.tsx (server) decide si
// renderiza esto o <GoogleReviews /> según haya datos reales o no.
export function OpinionesPlaceholder() {
  const t = useT();

  return (
    <section id="opiniones" className="relative overflow-hidden py-28 md:py-36">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--terracota-glow) 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionLabel index="06" center>
              {t.opiniones.label}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
              {t.opiniones.title}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-md rounded-[28px] border border-surface-border bg-surface p-12 text-center shadow-[0_20px_60px_-20px_rgba(42,29,19,0.18)] md:p-14">
            <div className="flex items-center justify-center gap-4">
              <span className="font-display text-6xl font-light text-ink">
                {REVIEWS_SUMMARY.rating.toFixed(1)}
              </span>
              <div className="flex flex-col items-start gap-1.5">
                <Stars rating={REVIEWS_SUMMARY.rating} />
                <span className="text-xs tracking-wide text-ink-dim-2">
                  {t.opiniones.outOf5}
                </span>
              </div>
            </div>
            <p className="mt-5 text-ink-dim">
              {t.opiniones.countLabel(REVIEWS_SUMMARY.count)}
            </p>

            <div className="mx-auto mt-9 inline-flex items-center gap-2.5 rounded-full border border-surface-border bg-bg-elevated/70 px-4 py-2 text-xs text-ink-dim">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracota opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-terracota" />
              </span>
              {t.opiniones.connecting}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-5 text-center">
            <a
              href={RESTAURANT.googleReviewsSearchHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-hair px-8 py-4 text-sm font-semibold tracking-wide text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-terracota/50 hover:text-terracota"
            >
              {t.opiniones.viewReviews}
              <Icon name="arrowUpRight" className="size-4" />
            </a>
            <p className="text-xs leading-relaxed text-ink-dim-2">
              {t.opiniones.syncNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
