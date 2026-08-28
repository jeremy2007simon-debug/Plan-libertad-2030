import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { CompassPoint } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Locale, localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { collectionDurationRange, getCollections } from "@/lib/content";

/**
 * Las tres colecciones Maisha.
 *
 * Cada una ocupa una banda ancha alternando el lado de la imagen, en lugar de
 * tres tarjetas idénticas: así se lee la diferencia entre ellas, que es
 * justo lo que hoy no se distingue. La duración sale calculada de los safaris
 * reales de cada colección, no escrita a mano — si mañana se añade un viaje de
 * 14 días, el rango se actualiza solo.
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
    <section className="dark-section bg-forest py-24 text-on-dark sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow={t.home.collections.eyebrow}
          tone="dark"
          title={t.home.collections.title}
          lede={t.home.collections.lede}
        >
          <ButtonLink href="/safaris" locale={locale} variant="quiet" tone="dark">
            {t.common.exploreAll}
          </ButtonLink>
        </SectionHeading>

        <div className="mt-16 flex flex-col gap-16 sm:gap-20">
          {collections.map((collection, index) => {
            const range = t.common.durationRange(collectionDurationRange(collection));
            const flipped = index % 2 === 1;

            return (
              <Reveal key={collection.id}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <Link
                    href={localeHref(locale, `/collections/${collection.id}`)}
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`group relative block aspect-16/10 overflow-hidden lg:col-span-7 ${
                      flipped ? "lg:order-2 lg:col-start-6" : ""
                    }`}
                  >
                    <Photo
                      photo={collection.image}
                      alt=""
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </Link>

                  <div
                    className={`lg:col-span-5 ${
                      flipped ? "lg:order-1 lg:col-start-1" : ""
                    }`}
                  >
                    <p className="eyebrow flex items-center gap-2.5 text-sand">
                      <CompassPoint className="size-2.5" />
                      {String(index + 1).padStart(2, "0")} · {range}
                    </p>

                    {/* El nombre de la colección es el titular. Antes lo era el
                        lema, que en móvil ocupaba tres líneas de serif y dejaba
                        "Explorer / Escape / Enrich" —lo que el visitante tiene
                        que elegir— escondido en el antetítulo. */}
                    <h3 className="text-h2 mt-3 text-ivory">
                      <Link
                        href={localeHref(locale, `/collections/${collection.id}`)}
                        className="transition-colors duration-300 hover:text-sand"
                      >
                        {collection.name}
                      </Link>
                    </h3>

                    <p className="text-lede measure mt-3 text-ivory/85">
                      {collection.tagline}
                    </p>

                    <p className="measure mt-5 text-[0.98rem] leading-relaxed text-on-dark-soft">
                      {collection.description}
                    </p>

                    <dl className="mt-7 border-t border-rule-on-dark pt-6">
                      <dt className="eyebrow text-on-dark-faint">{t.common.suits}</dt>
                      <dd className="mt-1.5 text-[0.95rem] text-ivory">
                        {collection.travellerProfile}
                      </dd>
                    </dl>

                    {/* Los rasgos van como una línea de texto: cuatro etiquetas
                        con borde se partían en dos filas en móvil y sumaban
                        altura sin aportar nada. */}
                    <p className="mt-5 text-[0.85rem] leading-relaxed text-on-dark-faint">
                      {collection.traits.join("  ·  ")}
                    </p>

                    <ButtonLink
                      href={`/collections/${collection.id}`}
                      locale={locale}
                      variant="secondary"
                      tone="dark"
                      className="mt-7"
                    >
                      {t.home.collections.explore(collection.name)}
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
