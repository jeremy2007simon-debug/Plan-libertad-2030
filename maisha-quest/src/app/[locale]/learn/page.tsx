import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { getPhotoAlt } from "@/i18n/alt";
import { isLocale, localeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getDestination, getLearnTopics, getRegions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { Destination } from "@/types/content";

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
    path: "/learn",
    title: t.meta.learn.title,
    description: t.meta.learn.description,
  });
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const topics = await getLearnTopics(locale);
  const regions = await getRegions(locale);
  const alt = await getPhotoAlt(locale);

  const regionsWithDestinations = await Promise.all(
    regions.map(async (region) => ({
      region,
      destinations: (
        await Promise.all(
          region.destinationSlugs.map((slug) => getDestination(locale, slug)),
        )
      ).filter((d): d is Destination => Boolean(d)),
    })),
  );

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.learn}
        title={t.nav.items.learn}
        lede={t.learn.lede}
        image={CLIENT_PHOTOS["savannah-acacia-sunset"]}
      />

      <div className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <SectionHeading tone="light" title={t.learn.topicsTitle} />
          <Reveal>
            <ul className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {topics.map((topic) => (
                <li key={topic.slug} className="flex flex-col">
                  <div className="relative aspect-3/2 overflow-hidden">
                    <Photo
                      photo={topic.image}
                      alt={alt[topic.image.altKey]}
                      sizes="(max-width: 768px) 100vw, 32vw"
                    />
                  </div>
                  <h2 className="font-display mt-5 text-[1.35rem] leading-tight text-forest">
                    {topic.name}
                  </h2>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
                    {topic.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>

      <div className="texture-paper relative isolate border-t border-rule bg-page-alt py-16 sm:py-20">
        <Container width="wide">
          <SectionHeading
            tone="light"
            title={t.learn.regionsTitle}
            lede={t.learn.regionsLede}
          />
          <Reveal>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {regionsWithDestinations.map(({ region, destinations }) => (
                <li key={region.slug} className="flex flex-col border border-rule p-7">
                  <div className="relative aspect-16/9 overflow-hidden">
                    <Photo
                      photo={region.image}
                      alt={alt[region.image.altKey]}
                      sizes="(max-width: 768px) 100vw, 48vw"
                    />
                  </div>
                  <h3 className="font-display mt-5 text-[1.3rem] leading-tight text-forest">
                    {region.name}
                  </h3>
                  <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
                    {region.description}
                  </p>
                  <div className="mt-5 border-t border-rule pt-4">
                    <p className="eyebrow text-ink-faint">
                      {t.learn.destinationsInRegion}
                    </p>
                    {destinations.length > 0 ? (
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                        {destinations.map((destination) => (
                          <li key={destination.slug}>
                            <Link
                              href={localeHref(
                                locale,
                                `/destinations/${destination.slug}`,
                              )}
                              className="text-[0.92rem] text-forest underline decoration-forest/25 underline-offset-[6px] transition-colors duration-300 hover:text-terracotta-text hover:decoration-terracotta-text"
                            >
                              {destination.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-[0.88rem] text-ink-faint italic">
                        {t.learn.noDestinationYet}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
