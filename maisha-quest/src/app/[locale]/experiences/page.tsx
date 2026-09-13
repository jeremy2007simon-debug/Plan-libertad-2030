import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/motion";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { ExperienceExplorer } from "@/components/home/ExperienceExplorer";
import { isLocale, localeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { getExperiences } from "@/lib/content";

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
    path: "/experiences",
    title: t.meta.experiences.title,
    description: t.meta.experiences.description,
  });
}

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const experiences = await getExperiences(locale);

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.experiences}
        title={t.home.film.title}
        lede={t.experiences.lede}
        image={CLIENT_PHOTOS["male-lions-together"]}
      />

      {/* Trasladado desde la portada: el explorador por categoría vivía en la
          home compitiendo por fotografías con los viajes destacados. Aquí, un
          tramo antes del listado completo, es donde de verdad ayuda a elegir. */}
      <ExperienceExplorer locale={locale} t={t} />

      <div className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <Reveal>
            <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {experiences.map((experience) => (
                <li key={experience.slug}>
                  <Link
                    href={localeHref(locale, `/experiences/${experience.slug}`)}
                    className="group block"
                  >
                    <div className="relative aspect-3/2 overflow-hidden">
                      {experience.image ? (
                        <Photo
                          photo={experience.image}
                          alt=""
                          sizes="(max-width: 768px) 100vw, 32vw"
                          className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        /* `nightlife`: sin fotografía autorizada (ver
                            Experience.image) — mismo tratamiento tipográfico
                            neutral que el selector de la home. */
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(155deg,var(--canopy),var(--olive-deep))]"
                        >
                          <span className="font-display px-4 text-center text-[13vw] leading-[0.95] text-parchment/[0.09] select-none sm:text-[3.4vw]">
                            {experience.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="eyebrow mt-5 text-terracotta-text">
                      {t.categories[experience.category]}
                    </p>
                    <h2 className="font-display mt-2 text-[1.45rem] leading-tight text-forest transition-colors duration-300 group-hover:text-terracotta-text">
                      {experience.name}
                    </h2>
                    <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
                      {experience.shortDescription}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
