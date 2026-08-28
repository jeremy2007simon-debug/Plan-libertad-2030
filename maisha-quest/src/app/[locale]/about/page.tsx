import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CompassDivider } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { ImageSlot, Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/motion";
import { PHOTOS } from "@/data/photography";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";
import { getTeam } from "@/lib/content";

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
    path: "/about",
    title: t.meta.about.title,
    description: t.meta.about.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const team = await getTeam(locale);

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.aboutUs}
        title={t.about.heroTitle}
        lede={t.about.heroLede}
        image={PHOTOS.arusha}
      />

      <section className="texture-paper relative isolate bg-page py-20 sm:py-24">
        <Container width="wide">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-h2 text-forest">
                  <span className="italic">&lsquo;Maisha&rsquo;</span>{" "}
                  {t.home.maisha.meansLife}
                </h2>
                <p className="text-lede measure mt-6 text-ink-soft">
                  {t.about.lede}
                </p>

                <CompassDivider className="my-9 max-w-sm" />

                <p className="measure text-[0.98rem] leading-relaxed text-ink-soft">
                  {t.about.compass}
                </p>
                <p className="measure mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
                  {t.about.ground}
                </p>

                <ButtonLink
                  href="/about/team"
                  locale={locale}
                  variant="secondary"
                  className="mt-9"
                >
                  {t.about.meetTeam}
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-4/5 overflow-hidden">
                {/* Hueco declarado: la foto del equipo es material propio y
                    todavía no existe. Una imagen de stock aquí sería falsa. */}
                <ImageSlot label={t.about.foundersSlot} />
              </div>
              <div className="relative mt-3 aspect-3/2 overflow-hidden">
                <Photo
                  photo={PHOTOS["serengeti-sunrise"]}
                  alt=""
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="dark-section texture-dust relative isolate bg-forest py-20 text-on-dark sm:py-24">
        <Container width="wide">
          <h2 className="text-h2 text-parchment">{t.about.howWeWork}</h2>
          <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.home.why.pillars.map((pillar) => (
              <li key={pillar.title}>
                <h3 className="font-display text-[1.3rem] text-parchment">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-on-dark-soft">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="texture-paper relative isolate bg-page-alt py-20">
        <Container width="wide">
          <h2 className="text-h2 text-forest">{t.about.people}</h2>
          <ul className="mt-10 flex flex-col divide-y divide-rule border-y border-rule">
            {team.map((member) => (
              <li
                key={member.slug}
                className="flex flex-wrap items-baseline gap-x-8 gap-y-2 py-5"
              >
                <span className="font-display w-48 text-[1.35rem] text-forest">
                  {member.name}
                </span>
                <span className="eyebrow w-56 text-terracotta-text">{member.role}</span>
                <span className="flex-1 text-[0.9rem] text-ink-soft">
                  {member.languages
                    .map((code) => t.languageNames[code as keyof typeof t.languageNames])
                    .join(" · ")}
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink
            href="/about/team"
            locale={locale}
            variant="quiet"
            className="mt-8"
          >
            {t.about.readStories}
          </ButtonLink>
        </Container>
      </section>

      <section className="texture-paper relative isolate bg-page py-20">
        <Container width="prose">
          <h2 className="text-h2 text-forest">{t.about.talkTitle}</h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
            {t.about.talkBody(COMPANY.hours.timezone, COMPANY.hours.label)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/plan" locale={locale} variant="primary">
              {t.nav.planCta}
            </ButtonLink>
            <ButtonLink href="/contact" locale={locale} variant="secondary">
              {t.about.contactDetails}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
