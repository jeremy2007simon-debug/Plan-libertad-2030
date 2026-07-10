import { CURATED_REVIEWS, RESTAURANT } from "@/lib/constants";
import { getGoogleReviews } from "@/lib/reviews";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

const PLACEHOLDER_SLOTS = [1, 2, 3];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? "" : "text-gold/25"}>
          ★
        </span>
      ))}
    </div>
  );
}

export async function Opiniones() {
  const data = await getGoogleReviews();
  const googleReviews = data?.reviews ?? [];
  const hasGoogle = googleReviews.length > 0;
  const hasCurated = !hasGoogle && CURATED_REVIEWS.length > 0;
  const curatedAvg =
    CURATED_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / CURATED_REVIEWS.length;

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
              {hasGoogle ? "Lo que dicen en Google" : "Lo que dicen nuestros clientes"}
            </h2>
          </Reveal>
          {hasGoogle && data ? (
            <Reveal delay={0.2}>
              <p className="mt-5 flex items-center justify-center gap-2 text-ink-dim">
                <span className="font-display text-2xl text-ink">
                  {data.rating.toFixed(1)}
                </span>
                <Stars rating={data.rating} />
                <span>· {data.totalReviews} reseñas en Google</span>
              </p>
            </Reveal>
          ) : hasCurated ? (
            <Reveal delay={0.2}>
              <p className="mt-5 flex items-center justify-center gap-2 text-ink-dim">
                <span className="font-display text-2xl text-ink">
                  {curatedAvg.toFixed(1)}
                </span>
                <Stars rating={curatedAvg} />
                <span>· Opiniones reales en TripAdvisor</span>
              </p>
            </Reveal>
          ) : (
            <Reveal delay={0.2}>
              <p className="mt-5 text-ink-dim">
                Próximamente mostraremos aquí las reseñas reales de Google.
              </p>
            </Reveal>
          )}
        </div>

        {hasGoogle ? (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {googleReviews.slice(0, 3).map((review, i) => (
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
                      <span className="flex size-8 items-center justify-center rounded-full bg-white/5 text-xs text-ink-dim">
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
        ) : hasCurated ? (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CURATED_REVIEWS.map((review, i) => (
              <Reveal key={review.author + i} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-[2px] border border-surface-border bg-surface p-7">
                  <Stars rating={review.rating} />
                  <div>
                    <p className="text-sm font-semibold text-ink">{review.title}</p>
                    <p className="mt-2 line-clamp-6 text-sm leading-relaxed text-ink-dim">
                      {review.text}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 pt-2">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs text-ink-dim">
                      {review.author.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm text-ink">{review.author}</p>
                      <p className="text-xs text-ink-dim-2">
                        {review.date}
                        {review.location ? ` · ${review.location}` : ""}
                      </p>
                    </div>
                  </div>
                  {review.collaboration && (
                    <p className="text-[11px] leading-snug text-ink-dim-2 italic">
                      Opinión obtenida en colaboración con el restaurante (aviso de
                      TripAdvisor)
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
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
        )}

        <Reveal delay={0.4}>
          <div className="mt-10 text-center">
            <a
              href={
                hasGoogle
                  ? RESTAURANT.googleReviewsSearchHref
                  : RESTAURANT.tripadvisorSearchHref
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gold"
            >
              {hasGoogle ? "Ver reseñas en Google" : "Ver más reseñas en TripAdvisor"}
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
