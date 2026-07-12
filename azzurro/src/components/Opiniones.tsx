import { RESTAURANT } from "@/lib/constants";
import { getGoogleReviews } from "@/lib/reviews";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
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
  const reviews = data?.reviews ?? [];
  const hasReviews = reviews.length > 0;

  return (
    <section id="opiniones" className="relative py-28 md:py-40">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionIntro index="05" center>
              Opiniones
            </SectionIntro>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.2vw,3.2rem)] font-light text-ink">
              {hasReviews ? "Lo que dicen en Google" : "Lo que dirán nuestros clientes"}
            </h2>
          </Reveal>
          {hasReviews && data ? (
            <Reveal delay={0.2}>
              <p className="mt-5 flex items-center justify-center gap-2 text-ink-dim">
                <span className="font-display text-2xl text-ink">
                  {data.rating.toFixed(1)}
                </span>
                <Stars rating={data.rating} />
                <span>· {data.totalReviews} reseñas en Google</span>
              </p>
            </Reveal>
          ) : (
            <Reveal delay={0.2}>
              <p className="mt-5 text-ink-dim">
                Esta sección está preparada para mostrar reseñas reales de
                Google en cuanto el restaurante esté dado de alta.
              </p>
            </Reveal>
          )}
        </div>

        {hasReviews ? (
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {reviews.slice(0, 3).map((review, i) => (
              <Reveal key={review.authorName + i} delay={i * 0.08}>
                <GlassCard className="flex h-full flex-col gap-4 p-7">
                  <Icon name="quote" className="size-5 text-gold/50" />
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
                </GlassCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PLACEHOLDER_SLOTS.map((slot) => (
              <Reveal key={slot} delay={slot * 0.08}>
                <GlassCard className="flex h-full flex-col gap-4 p-7" glow="none">
                  <div className="flex gap-1 text-gold/30">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="h-3 w-3/4 animate-pulse rounded-full bg-white/[0.06]" />
                  <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/[0.06]" />
                  <p className="mt-auto text-xs uppercase tracking-wide text-ink-dim-2">
                    Reseña de Google — próximamente
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        )}

        {!hasReviews && RESTAURANT.googleReviewsSearchHref && (
          <Reveal delay={0.4}>
            <div className="mt-10 text-center">
              <a
                href={RESTAURANT.googleReviewsSearchHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold"
              >
                Ver reseñas en Google
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
