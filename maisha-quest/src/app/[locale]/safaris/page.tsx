import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SafariCard } from "@/components/safari/SafariCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTOS } from "@/data/photography";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  collectionDurationRange,
  getCollections,
  getSafaris,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/safaris",
    title: t.meta.safaris.title,
    description: t.meta.safaris.description,
  });
}

/**
 * Catálogo completo.
 *
 * Se agrupa por colección en lugar de volcar una rejilla plana: así el
 * visitante ve la lógica de la oferta, no una lista de paquetes sueltos.
 */
export default async function SafarisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const [safaris, collections] = await Promise.all([
    getSafaris(locale),
    getCollections(locale),
  ]);

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.safaris}
        title={t.safaris.title}
        lede={t.safaris.lede}
        image={PHOTOS["serengeti-plains"]}
      />

      <div className="bg-page">
        {collections.map((collection) => {
          const inCollection = safaris.filter((s) => s.collection === collection.id);
          if (inCollection.length === 0) return null;

          return (
            <section
              key={collection.id}
              id={collection.id}
              className="border-b border-rule py-20 last:border-b-0 sm:py-24"
            >
              <Container width="wide">
                <SectionHeading
                  eyebrow={t.safaris.collection}
                  title={collection.name}
                  lede={collection.tagline}
                >
                  <ButtonLink
                    href={`/collections/${collection.id}`}
                    locale={locale}
                    variant="quiet"
                  >
                    {t.safaris.aboutCollection}
                  </ButtonLink>
                </SectionHeading>

                <p className="measure mt-5 text-[0.96rem] leading-relaxed text-ink-soft">
                  {collection.description}
                </p>

                <p className="eyebrow mt-6 text-ink-faint">
                  {t.safaris.journeyCount(inCollection.length)}
                  <span className="mx-2 opacity-50">·</span>
                  {t.common.durationRange(collectionDurationRange(collection))}
                </p>

                <Reveal className="mt-10">
                  <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {inCollection.map((safari) => (
                      <li key={safari.slug} className="flex">
                        <SafariCard safari={safari} locale={locale} t={t} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </Container>
            </section>
          );
        })}
      </div>

      <section className="dark-section texture-dust relative isolate bg-forest py-20 text-on-dark">
        <Container width="wide">
          <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-h2 text-parchment">{t.safaris.noneRightTitle}</h2>
              <p className="measure mt-4 text-[0.98rem] text-on-dark-soft">
                {t.safaris.noneRightBody}
              </p>
            </div>
            <ButtonLink href="/plan" locale={locale} variant="primary" size="lg">
              {t.home.hero.designCta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
