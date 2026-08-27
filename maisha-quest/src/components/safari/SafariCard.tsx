import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { formatPrice, formatRoute, formatSafariMeta } from "@/lib/content";
import type { Safari } from "@/types/content";

/**
 * Tarjeta de viaje. La misma en la home, en el catálogo y en "viajes
 * similares", para que un safari se presente igual en toda la web.
 *
 * El precio solo aparece si existe de verdad. Cuando no lo hay, en su lugar va
 * "Price on request", que es lo cierto — no un "desde 0 €" ni un hueco vacío.
 */
export function SafariCard({
  safari,
  sizes = "(max-width: 768px) 88vw, (max-width: 1280px) 44vw, 30vw",
  priority = false,
}: {
  safari: Safari;
  sizes?: string;
  priority?: boolean;
}) {
  const price = formatPrice(safari);

  return (
    <article className="group flex h-full flex-col bg-ivory-warm">
      <Link
        href={`/safaris/${safari.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-4/3 overflow-hidden"
      >
        <Photo
          photo={safari.image}
          alt=""
          sizes={sizes}
          priority={priority}
          className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 bg-ivory/92 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.08em] text-forest uppercase">
          {safari.durationDays} days
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.45rem] leading-tight text-forest">
          <Link
            href={`/safaris/${safari.slug}`}
            className="transition-colors duration-300 hover:text-terracotta"
          >
            {safari.name}
          </Link>
        </h3>

        <p className="mt-3 text-[0.84rem] leading-relaxed text-ink-soft">
          {formatRoute(safari)}
        </p>
        <p className="mt-1 text-[0.84rem] text-ink-faint">
          {formatSafariMeta(safari)}
        </p>

        <p className="measure mt-4 text-[0.92rem] leading-relaxed text-ink-soft">
          {safari.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="border border-rule px-2.5 py-1 text-[0.72rem] text-ink-soft">
            {safari.travellerProfile}
          </span>
        </div>

        {/* Pie de la tarjeta, siempre abajo aunque los textos midan distinto. */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-rule pt-5 [margin-top:1.75rem]">
          <p className="text-[0.85rem] text-forest">
            {price ?? <span className="text-ink-faint">Price on request</span>}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/safaris/${safari.slug}`}
              className="text-[0.72rem] font-semibold tracking-[0.06em] text-forest uppercase underline decoration-forest/30 underline-offset-[6px] transition-colors duration-300 hover:text-terracotta hover:decoration-terracotta"
            >
              View Journey
            </Link>
            <Link
              href={`/plan?safari=${safari.slug}`}
              className="text-[0.72rem] font-semibold tracking-[0.06em] text-terracotta uppercase underline decoration-terracotta/35 underline-offset-[6px] transition-colors duration-300 hover:decoration-terracotta"
            >
              Customize
            </Link>
          </div>
        </div>

        {safari.draft && (
          /* Sello de borrador. Desaparece solo en cuanto se quita `draft` del
             dato — nadie tiene que acordarse de borrar nada del componente. */
          <p className="mt-4 border-l-2 border-gold/60 pl-3 text-[0.72rem] leading-snug text-ink-faint">
            Sample itinerary — final routing and dates confirmed with you.
          </p>
        )}
      </div>
    </article>
  );
}
