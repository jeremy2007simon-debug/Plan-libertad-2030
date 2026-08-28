import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SafariCard } from "@/components/safari/SafariCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { COLLECTION_STRUCTURE } from "@/data/structure/collections";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  collectionDurationRange,
  getCollection,
  getCollections,
  getSafarisByCollection,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { CollectionId } from "@/types/content";

/** Tres colecciones × seis idiomas = 18 rutas estáticas. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    COLLECTION_STRUCTURE.map((collection) => ({ locale, id: collection.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const [t, collection] = await Promise.all([
    getDictionary(locale),
    getCollection(locale, id as CollectionId),
  ]);
  if (!collection) return {};
  return pageMetadata({
    locale,
    path: `/collections/${collection.id}`,
    title: t.collections.pageTitle(collection.name),
    description: `${collection.tagline} ${collection.description}`,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const collection = await getCollection(locale, id as CollectionId);
  if (!collection) notFound();

  const safaris = await getSafarisByCollection(locale, collection.id);
  const others = (await getCollections(locale)).filter(
    (c) => c.id !== collection.id,
  );

  return (
    <>
      {/* El H1 es el nombre de la colección, no su lema: es lo que la
          identifica en un buscador y lo que mantiene la jerarquía de
          encabezados coherente con el resto de la web. */}
      <PageHero
        eyebrow={t.safaris.collection}
        title={t.collections.pageTitle(collection.name)}
        lede={collection.tagline}
        image={collection.image}
      >
        <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
          <div>
            <dt className="eyebrow text-sand">{t.collections.typicalLength}</dt>
            <dd className="mt-1.5 text-ivory">
              {t.common.durationRange(collectionDurationRange(collection))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-sand">{t.common.suits}</dt>
            <dd className="mt-1.5 text-ivory">{collection.travellerProfile}</dd>
          </div>
        </dl>
      </PageHero>

      <section className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <p className="text-lede measure text-ink-soft">
            {collection.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {collection.traits.map((trait) => (
              <li
                key={trait}
                className="border border-rule px-4 py-2 text-[0.85rem] text-ink-soft"
              >
                {trait}
              </li>
            ))}
          </ul>

          {/* Encabezado de nivel 2 antes de la rejilla: las tarjetas usan h3
              y sin él la jerarquía saltaría de h1 a h3. */}
          <h2 className="text-h2 mt-14 text-forest">
            {t.collections.journeysInCollection(safaris.length)}
          </h2>

          <Reveal className="mt-10">
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {safaris.map((safari, index) => (
                <li key={safari.slug} className="flex">
                  <SafariCard
                    safari={safari}
                    locale={locale}
                    t={t}
                    priority={index === 0}
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Las otras dos colecciones, por si esta no encaja. */}
      <section className="border-t border-rule bg-page-alt py-20">
        <Container width="wide">
          <h2 className="text-h2 text-forest">{t.collections.notQuiteYou}</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.id}>
                <p className="eyebrow text-terracotta">
                  {t.collections.pageTitle(other.name)}
                </p>
                <h3 className="font-display mt-3 text-[1.5rem] leading-tight text-forest">
                  {other.tagline}
                </h3>
                <p className="measure mt-3 text-[0.94rem] text-ink-soft">
                  {other.description}
                </p>
                <ButtonLink
                  href={`/collections/${other.id}`}
                  locale={locale}
                  variant="quiet"
                  className="mt-4"
                >
                  {t.home.collections.explore(other.name)}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
