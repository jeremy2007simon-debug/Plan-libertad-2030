import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { WhatsAppGlyph } from "@/components/layout/MobileCTABar";
import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PHOTOS } from "@/data/photography";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { COMPANY, HOME_COORDINATES, socialLinks, whatsappHref } from "@/lib/site";
import { getPhotoAlt } from "@/i18n/alt";

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
    path: "/contact",
    title: t.meta.contact.title,
    description: t.meta.contact.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const alt = await getPhotoAlt(locale);
  const socials = socialLinks();

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.contact}
        title={t.contact.title}
        lede={t.contact.lede}
      />

      <section className="texture-paper relative isolate bg-page py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <dl className="flex flex-col divide-y divide-rule border-y border-rule">
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">{t.contact.phone}</dt>
                  <dd className="mt-2">
                    <a
                      href={COMPANY.phoneHref}
                      className="tap-44 font-display inline-block text-[1.6rem] text-forest transition-colors duration-300 hover:text-terracotta-text"
                    >
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">{t.contact.email}</dt>
                  <dd className="mt-2">
                    <a
                      href={COMPANY.emailHref}
                      className="tap-44 font-display inline-block text-[1.6rem] text-forest transition-colors duration-300 hover:text-terracotta-text"
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">WhatsApp</dt>
                  <dd className="mt-2">
                    <a
                      href={whatsappHref(t.nav.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-44 inline-flex items-center gap-2.5 text-[1rem] text-forest transition-colors duration-300 hover:text-terracotta-text"
                    >
                      <WhatsAppGlyph className="size-4" />
                      {t.contact.messageUs}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">{t.contact.hours}</dt>
                  <dd className="mt-2 text-[0.98rem] text-ink-soft">
                    {t.company.hours}
                    <br />
                    {COMPANY.hours.timezone} — {t.company.utcNote}
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">{t.contact.whereWeAre}</dt>
                  <dd className="mt-2 text-[0.98rem] text-ink-soft">
                    {COMPANY.base}
                    <span className="tnum mt-1 block text-[0.82rem] tracking-[0.1em] text-ink-faint">
                      {HOME_COORDINATES.label}
                    </span>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">{t.team.languages}</dt>
                  <dd className="mt-2 text-[0.98rem] text-ink-soft">
                    {t.contact.languagesBody}
                  </dd>
                </div>
              </dl>

              {socials.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-44 eyebrow inline-flex items-center text-ink-soft transition-colors duration-300 hover:text-terracotta-text"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="border border-rule bg-cream p-8">
                <CompassMark className="size-8 text-gold" />
                <h2 className="font-display mt-5 text-[1.5rem] leading-tight text-forest">
                  {t.contact.planningTitle}
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                  {t.contact.planningBody}
                </p>
                <ButtonLink
                  href="/plan"
                  locale={locale}
                  variant="primary"
                  className="mt-7"
                >
                  {t.nav.planCta}
                </ButtonLink>
              </div>

              <div className="relative mt-8 aspect-4/3 overflow-hidden">
                <Photo
                  photo={PHOTOS.arusha}
                  alt={alt.arusha}
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
              <p className="mt-3 text-[0.8rem] text-ink-faint">
                {t.company.arushaCaption}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
