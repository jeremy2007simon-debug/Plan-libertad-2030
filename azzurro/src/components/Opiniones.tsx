import { AGGREGATE_REVIEWS, RESTAURANT } from "@/lib/constants";
import { getGoogleReviews } from "@/lib/reviews";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { GlassCard } from "./ui/GlassCard";
import { Icon } from "./ui/Icon";

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
              {hasReviews ? "Lo que dicen en Google" : "Lo que dicen nuestros clientes"}
            </h2>
          </Reveal>
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
          <Reveal delay={0.15}>
            <GlassCard className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 p-10 text-center">
              <Icon name="quote" className="size-5 text-gold/50" />
              <p className="font-display text-5xl font-light text-ink">
                {AGGREGATE_REVIEWS.rating.toFixed(1)}
              </p>
              <Stars rating={AGGREGATE_REVIEWS.rating} />
              <p className="text-sm text-ink-dim">
                {AGGREGATE_REVIEWS.totalReviews} opiniones en{" "}
                {AGGREGATE_REVIEWS.source}
              </p>
              <a
                href={RESTAURANT.tripadvisorSearchHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold"
              >
                Ver opiniones
                <Icon name="arrowUpRight" className="size-4" />
              </a>
            </GlassCard>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
