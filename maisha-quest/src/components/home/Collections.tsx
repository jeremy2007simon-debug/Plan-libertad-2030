import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { CompassPoint } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { AnimatedLine, ImageReveal, MagneticArrow, ParallaxMedia, Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Locale, localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { collectionDurationRange, getCollections } from "@/lib/content";


/** Acento por colección. Solo colorea número, filete y antetítulo. */
const ACCENT: Record<string, { text: string; line: string; wash: string }> = {
  explorer: {
    text: "text-terracotta-text",
    line: "bg-[var(--terracotta)]",
    wash: "from-[var(--forest)]/45",
  },
  escape: {
    text: "text-[var(--olive-deep)]",
    line: "bg-[var(--olive)]",
    wash: "from-[var(--olive)]/40",
  },
  enrich: {
    text: "text-[var(--earth)]",
    line: "bg-[var(--gold)]",
    wash: "from-[var(--earth)]/45",
  },
};

/**
 * Las tres colecciones Maisha.
 *
 * Cada una ocupa una banda ancha alternando el lado de la imagen, en lugar de
 * tres tarjetas idénticas: así se lee la diferencia entre ellas, que es
 * justo lo que hoy no se distingue. La duración sale calculada de los safaris
 * reales de cada colección, no escrita a mano — si mañana se añade un viaje de
 * 14 días, el rango se actualiza solo.
 *
 * Cada colección lleva además su propio acento, en lugar de repetir el mismo
 * dorado tres veces: verde profundo y terracota para Explorer, arena y oliva
 * para Escape, tierra y dorado suave para Enrich. Es lo que hace que las tres
 * bandas se lean como tres propuestas distintas y no como una plantilla
 * repetida.
 */
export async function Collections({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const collections = await getCollections(locale);

  return (
    <section className="on-sand texture-paper relative isolate bg-sand py-12 sm:py-16">
      <Container width="wide">
        <SectionHeading
          eyebrow={t.home.collections.eyebrow}
          title={t.home.collections.title}
          lede={t.home.collections.lede}
        >
          <ButtonLink href="/safaris" locale={locale} variant="quiet">
            {t.common.exploreAll}
          </ButtonLink>
        </SectionHeading>

        <div className="mt-12 flex flex-col gap-12 sm:gap-16">
          {collections.map((collection, index) => {
            const range = t.common.durationRange(collectionDurationRange(collection));
            const flipped = index % 2 === 1;
            const accent = ACCENT[collection.id] ?? ACCENT.explorer;

            return (
              <article
                key={collection.id}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                  <ImageReveal
                    className={`aspect-16/9 lg:col-span-6 lg:aspect-16/10 ${
                      flipped ? "lg:order-2 lg:col-start-7" : ""
                    }`}
                  >
                    <Link
                      href={localeHref(locale, `/collections/${collection.id}`)}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="group absolute inset-0 block"
                    >
                      <ParallaxMedia strength={18} className="absolute -inset-y-6 inset-x-0">
                        <Photo
                          photo={collection.image}
                          alt=""
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="transition-transform duration-[1400ms] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                        />
                      </ParallaxMedia>
                      {/* Velo del color de la colección, muy diluido: es lo que
                          diferencia las tres bandas sin teñir la fotografía. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 bg-linear-to-t to-transparent ${accent.wash}`}
                      />
                    </Link>
                  </ImageReveal>

                  <div
                    className={`lg:col-span-6 ${
                      flipped ? "lg:order-1 lg:col-start-1" : ""
                    }`}
                  >
                    <Reveal from={flipped ? "right" : "left"}>
                      <p className={`eyebrow flex items-center gap-2.5 ${accent.text}`}>
                        <CompassPoint className="size-2.5" />
                        {String(index + 1).padStart(2, "0")} · {range}
                      </p>
                    </Reveal>

                    <Reveal delay={0.08} from={flipped ? "right" : "left"}>
                      {/* El nombre de la colección es el titular. Antes lo era
                          el lema, que en móvil ocupaba tres líneas de serif y
                          dejaba "Explorer / Escape / Enrich" —lo que el
                          visitante tiene que elegir— en el antetítulo. */}
                      <h3 className="text-h2 mt-3 text-forest">
                        <Link
                          href={localeHref(locale, `/collections/${collection.id}`)}
                          className="group transition-colors duration-[var(--dur-hover)] hover:text-terracotta-text"
                        >
                          {collection.name}
                        </Link>
                      </h3>

                      <p className="text-lede measure mt-3 text-ink">
                        {collection.tagline}
                      </p>
                    </Reveal>

                    <AnimatedLine
                      className={`mt-6 max-w-[11rem] ${accent.line}`}
                      delay={0.16}
                    />

                    <Reveal delay={0.2} from={flipped ? "right" : "left"}>
                      <p className="measure mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
                        {collection.description}
                      </p>

                      <dl className="mt-5">
                        <dt className="eyebrow text-ink-faint">{t.common.suits}</dt>
                        <dd className="mt-1.5 text-[0.95rem] text-forest">
                          {collection.travellerProfile}
                        </dd>
                      </dl>

                      {/* Los rasgos van como una línea de texto: cuatro
                          etiquetas con borde se partían en dos filas en móvil
                          y sumaban altura sin aportar nada. */}
                      <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-faint">
                        {collection.traits.join("  ·  ")}
                      </p>

                      <Link
                        href={localeHref(locale, `/collections/${collection.id}`)}
                        className="group mt-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.06em] text-forest uppercase"
                      >
                        <span className="border-b border-forest/30 pb-1 transition-colors duration-[var(--dur-hover)] group-hover:border-terracotta-text group-hover:text-terracotta-text">
                          {t.home.collections.explore(collection.name)}
                        </span>
                        <MagneticArrow className="text-terracotta-text" />
                      </Link>
                    </Reveal>
                  </div>
                </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
