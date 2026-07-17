"use client";

import type { GoogleReviewsData } from "@/lib/reviews";
import { RESTAURANT } from "@/lib/constants";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";
import { Stars } from "./ui/Stars";
import { useT } from "./i18n/LanguageProvider";

// Sustituye automáticamente a Opiniones.tsx en cuanto getGoogleReviews()
// (src/lib/reviews.ts) devuelve datos reales — ver el componente
// Opiniones.tsx, que decide cuál de los dos renderizar. No requiere
// ningún otro cambio: misma sección, mismo id="opiniones", mismo índice.
// Los textos de reseñas y nombres de autor los sirve Google tal cual — no
// se traducen (son contenido de terceros, no copy de la web).
export function GoogleReviews({ data }: { data: GoogleReviewsData }) {
  const t = useT();

  return (
    <section id="opiniones" className="relative py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionLabel index="06" center>
              {t.opiniones.label}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
              {t.opiniones.googleTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 flex items-center justify-center gap-2 text-ink-dim">
              <span className="font-display text-2xl text-ink">
                {data.rating.toFixed(1)}
              </span>
              <Stars rating={data.rating} />
              <span>· {t.opiniones.googleCount(data.totalReviews)}</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {data.reviews.slice(0, 3).map((review, i) => (
            <Reveal key={review.authorName + i} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-[2px] border border-surface-border bg-surface p-7">
                <Stars rating={review.rating} />
                <p className="line-clamp-5 text-sm leading-relaxed text-ink-dim">
                  {review.text}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  {review.authorPhotoUrl ? (
                    // Avatar alojado por Google; no aplica next/image.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.authorPhotoUrl}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full"
                      loading="lazy"
                    />
                  ) : (
                    <span className="flex size-8 items-center justify-center rounded-full bg-bg-elevated text-xs text-ink-dim">
                      {review.authorName.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm text-ink">{review.authorName}</p>
                    <p className="text-xs text-ink-dim-2">{review.relativeTime}</p>
                  </div>
                </div>
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
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-terracota"
            >
              {t.opiniones.viewOnGoogle}
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
