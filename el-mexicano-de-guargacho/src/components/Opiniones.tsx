import { REVIEWS_SUMMARY, RESTAURANT } from "@/lib/constants";
import { getGoogleReviews } from "@/lib/reviews";
import { GoogleReviews } from "./GoogleReviews";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";
import { Stars } from "./ui/Stars";

// Estado "sin integración": ningún dato individual inventado, solo la
// valoración agregada pública (REVIEWS_SUMMARY, en src/lib/constants.ts).
// En cuanto getGoogleReviews() (src/lib/reviews.ts) devuelva datos reales,
// esta función delega por completo en GoogleReviews.tsx — mismo id de
// sección, mismo lugar en la página, sin más cambios.
export async function Opiniones() {
  const data = await getGoogleReviews();
  if (data) return <GoogleReviews data={data} />;

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
              Opiniones
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
              Confianza real, verificada.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-md rounded-[28px] border border-white/10 bg-white/[0.03] p-12 text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-14">
            <div className="flex items-center justify-center gap-4">
              <span className="font-display text-6xl font-light text-ink">
                {REVIEWS_SUMMARY.rating.toFixed(1)}
              </span>
              <div className="flex flex-col items-start gap-1.5">
                <Stars rating={REVIEWS_SUMMARY.rating} />
                <span className="text-xs tracking-wide text-ink-dim-2">/ 5</span>
              </div>
            </div>
            <p className="mt-5 text-ink-dim">{REVIEWS_SUMMARY.countLabel}</p>

            <div className="mx-auto mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-ink-dim">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracota opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-terracota" />
              </span>
              Conectando reseñas verificadas…
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-5 text-center">
            <a
              href={RESTAURANT.googleReviewsSearchHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold tracking-wide text-ink transition-all duration-500 hover:-translate-y-0.5 hover:border-terracota/50 hover:text-terracota"
            >
              Ver opiniones
              <Icon name="arrowUpRight" className="size-4" />
            </a>
            <p className="text-xs leading-relaxed text-ink-dim-2">
              Las opiniones mostradas se sincronizarán automáticamente con
              Google cuando se active la integración de Google Places.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
