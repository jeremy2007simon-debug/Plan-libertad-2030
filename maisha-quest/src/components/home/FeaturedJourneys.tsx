import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import {
  ImageReveal,
  MagneticArrow,
  Reveal,
} from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Locale, localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { formatPrice, formatRoute, getFeaturedSafaris } from "@/lib/content";
import type { Safari } from "@/types/content";

/**
 * "Journeys worth remembering" — los viajes destacados de la home.
 *
 * Deja de ser una rejilla de tres tarjetas iguales. Ahora hay una jerarquía:
 * el primer viaje ocupa una fotografía grande a siete columnas y los otros dos
 * van a su derecha como filas compactas. Es una composición editorial, y de
 * paso ahorra unos 400 px de alto frente a tres tarjetas de la misma altura.
 *
 * En móvil, carrusel con anclaje de scroll: tres tarjetas altas apiladas
 * sumaban 2.400 px para enseñar lo mismo. Es el mismo contenido; solo cambia
 * la disposición.
 *
 * Nada esencial vive en el hover: número, nombre, ruta, duración y precio
 * están siempre a la vista. Al pasar por encima solo se mueven la fotografía
 * (3 %), el filete y la flecha.
 */

/** Duración y ruta, la línea de datos que acompaña a cada viaje. */
function Meta({
  safari,
  locale,
  t,
  className = "",
}: {
  safari: Safari;
  locale: Locale;
  t: Dictionary;
  className?: string;
}) {
  return (
    <p className={`text-[0.82rem] leading-snug text-on-dark-soft ${className}`}>
      <span className="tnum text-[var(--gold)]">
        {t.common.dayCount(safari.durationDays)}
      </span>
      <span aria-hidden="true" className="mx-2 text-on-dark-faint">
        ·
      </span>
      {formatRoute(locale, safari)}
    </p>
  );
}

/** Precio real o "precio a consultar". Nunca un "desde 0". */
function Price({
  safari,
  locale,
  t,
}: {
  safari: Safari;
  locale: Locale;
  t: Dictionary;
}) {
  const price = formatPrice(locale, safari);
  return (
    <span className="text-[0.85rem] text-parchment">
      {price ? (
        t.common.fromPerPerson(price)
      ) : (
        <span className="text-on-dark-faint">{t.common.priceOnRequest}</span>
      )}
    </span>
  );
}

export async function FeaturedJourneys({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const safaris = await getFeaturedSafaris(locale, 3);
  if (safaris.length === 0) return null;

  const [lead, ...rest] = safaris;

  /** Tarjeta compacta: fotografía a la izquierda, datos a la derecha. */
  const compact = (safari: Safari, index: number) => (
    <Link
      key={safari.slug}
      href={localeHref(locale, `/safaris/${safari.slug}`)}
      className="group flex gap-5 border-t border-rule-on-dark pt-6"
    >
      <span className="relative aspect-square w-24 shrink-0 overflow-hidden sm:w-28">
        <Photo
          photo={safari.image}
          alt=""
          sizes="120px"
          className="transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        />
      </span>
      <span className="flex-1">
        <span
          aria-hidden="true"
          className="tnum block text-[0.65rem] tracking-[0.24em] text-[var(--gold)]"
        >
          {String(index + 2).padStart(2, "0")}
        </span>
        <span className="font-display mt-1 block text-[1.15rem] leading-tight text-parchment transition-colors duration-[var(--dur-hover)] group-hover:text-sand group-focus-visible:text-sand">
          {safari.name}
        </span>
        <Meta safari={safari} locale={locale} t={t} className="mt-1.5" />
        <span className="mt-2 flex items-center gap-3">
          <Price safari={safari} locale={locale} t={t} />
          <MagneticArrow className="text-[var(--gold)]" />
        </span>
      </span>
    </Link>
  );

  /** Tarjeta alta para el carrusel de móvil. */
  const tall = (safari: Safari, index: number) => (
    <Link
      key={safari.slug}
      href={localeHref(locale, `/safaris/${safari.slug}`)}
      className="group block"
    >
      <span className="relative block aspect-4/5 overflow-hidden">
        <Photo
          photo={safari.image}
          alt=""
          sizes="84vw"
          className="transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
        />
        <span className="media-scrim-soft absolute inset-0" />
        <span className="absolute inset-x-0 bottom-0 p-5">
          <span
            aria-hidden="true"
            className="tnum block text-[0.65rem] tracking-[0.24em] text-[var(--gold)]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display mt-1.5 block text-[1.35rem] leading-tight text-parchment">
            {safari.name}
          </span>
          <Meta safari={safari} locale={locale} t={t} className="mt-1.5" />
          <span className="mt-2.5 flex items-center gap-3">
            <Price safari={safari} locale={locale} t={t} />
            <MagneticArrow className="text-[var(--gold)]" />
          </span>
        </span>
      </span>
    </Link>
  );

  return (
    <section className="dark-section texture-dust relative isolate bg-forest py-20 text-on-dark sm:py-24">
      <Container width="wide">
        <SectionHeading
          tone="dark"
          eyebrow={t.home.featured.eyebrow}
          title={t.home.featured.title}
          lede={t.home.featured.lede}
        >
          <ButtonLink href="/safaris" locale={locale} variant="secondary" tone="dark">
            {t.nav.items.allSafaris}
          </ButtonLink>
        </SectionHeading>

        {/* Tableta y escritorio: uno grande y dos compactos. */}
        <div className="mt-10 hidden gap-10 md:grid md:grid-cols-12 lg:gap-14">
          <ImageReveal className="md:col-span-7">
            <Link
              href={localeHref(locale, `/safaris/${lead.slug}`)}
              className="group block"
            >
              <span className="relative block aspect-4/3 overflow-hidden">
                <Photo
                  photo={lead.image}
                  alt=""
                  sizes="(max-width: 1024px) 58vw, 54vw"
                  className="transition-transform duration-[1400ms] ease-[var(--ease-soft)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
                />
                <span className="media-scrim absolute inset-0" />
                <span className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="tnum block text-[0.68rem] tracking-[0.24em] text-[var(--gold)]"
                  >
                    01
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-px w-10 origin-left bg-[var(--gold)]/70 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-x-[3] group-focus-visible:scale-x-[3]"
                  />
                  <span className="font-display mt-3.5 block text-[1.9rem] leading-tight text-parchment sm:text-[2.25rem]">
                    {lead.name}
                  </span>
                  <Meta safari={lead} locale={locale} t={t} className="mt-2.5" />
                  <span className="mt-3 flex items-center gap-4">
                    <Price safari={lead} locale={locale} t={t} />
                    <MagneticArrow className="text-[var(--gold)]" />
                  </span>
                </span>
              </span>
            </Link>
          </ImageReveal>

          <div className="flex flex-col justify-center gap-8 md:col-span-5">
            {rest.map((safari, index) => (
              <Reveal key={safari.slug} delay={0.1 + index * 0.1} from="right">
                {compact(safari, index)}
              </Reveal>
            ))}

            <Reveal delay={0.3} from="right" className="border-t border-rule-on-dark pt-6">
              {/* Reutiliza el texto que ya existe traducido en el catálogo:
                  aquí cierra la columna sin dejar un hueco y sin inventar una
                  frase nueva que habría que traducir seis veces. */}
              <p className="eyebrow text-sand">{t.safaris.noneRightTitle}</p>
              <p className="measure-narrow mt-3 text-[0.9rem] leading-relaxed text-on-dark-soft">
                {t.safaris.noneRightBody}
              </p>
              <ButtonLink
                href="/plan"
                locale={locale}
                variant="quiet"
                tone="dark"
                className="mt-3"
              >
                {t.nav.planCta}
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        {/* Móvil: carrusel con anclaje de scroll. */}
        <div className="mt-10 md:hidden">
          <Reveal>
            <Carousel
              label={t.home.featured.title}
              itemClassName="w-[84vw] max-w-[22rem]"
            >
              {safaris.map((safari, index) => tall(safari, index))}
            </Carousel>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
