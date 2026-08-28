import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SafariCard } from "@/components/safari/SafariCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/motion";
import { EXPERIENCE_STRUCTURE } from "@/data/structure/experiences";
import { LOCALES, isLocale, localeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getDestination,
  getExperience,
  getSafarisByDestination,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import type { Destination, Safari } from "@/types/content";
import { getPhotoAlt } from "@/i18n/alt";

/** Quince experiencias × seis idiomas = 90 rutas estáticas. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    EXPERIENCE_STRUCTURE.map((experience) => ({
      locale,
      slug: experience.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const experience = await getExperience(locale, slug);
  if (!experience) return {};
  const alt = await getPhotoAlt(locale);
  return pageMetadata({
    locale,
    path: `/experiences/${experience.slug}`,
    title: experience.name,
    description: experience.description.slice(0, 158),
    image: { src: experience.image.src, alt: alt[experience.image.altKey] },
  });
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const experience = await getExperience(locale, slug);
  if (!experience) notFound();

  const destinations = (
    await Promise.all(
      experience.destinationSlugs.map((s) => getDestination(locale, s)),
    )
  ).filter((d): d is Destination => Boolean(d));

  // Viajes que pasan por cualquiera de esos destinos, sin repetir.
  const safariLists = await Promise.all(
    experience.destinationSlugs.map((s) => getSafarisByDestination(locale, s)),
  );
  const safaris = [...new Map(safariLists.flat().map((s) => [s.slug, s])).values()]
    .slice(0, 3) as Safari[];

  return (
    <>
      <PageHero
        eyebrow={t.experiences.singular}
        title={experience.name}
        lede={experience.shortDescription}
        image={experience.image}
      />

      <div className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lede measure text-ink-soft">
                  {experience.description}
                </p>
              </Reveal>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <h2 className="eyebrow border-t border-rule pt-7 text-ink-faint">
                  {t.experiences.whereYouDoThis}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {destinations.map((destination) => (
                    <li key={destination.slug}>
                      <Link
                        href={localeHref(
                          locale,
                          `/destinations/${destination.slug}`,
                        )}
                        className="flex items-baseline justify-between gap-4 text-[0.95rem] text-forest transition-colors duration-300 hover:text-terracotta-text"
                      >
                        {destination.name}
                        <span className="text-[0.78rem] text-ink-faint">
                          {destination.bestTime}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/plan"
                  locale={locale}
                  variant="primary"
                  className="mt-8"
                >
                  {t.experiences.addToJourney}
                </ButtonLink>
              </Reveal>
            </aside>
          </div>
        </Container>
      </div>

      {safaris.length > 0 && (
        <section className="texture-paper relative isolate border-t border-rule bg-page-alt py-20">
          <Container width="wide">
            <h2 className="text-h2 text-forest">{t.experiences.journeysIncluding}</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {safaris.map((safari) => (
                <li key={safari.slug} className="flex">
                  <SafariCard safari={safari} locale={locale} t={t} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
