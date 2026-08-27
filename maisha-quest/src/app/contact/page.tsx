import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { WhatsAppGlyph } from "@/components/layout/MobileCTABar";
import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PHOTOS } from "@/data/photography";
import { COMPANY, HOME_COORDINATES, LOCALES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Maisha Quest in Arusha, Tanzania. Phone +255 672 426 411, info@maishaquest.com, Monday to Saturday 8:00 AM – 6:00 PM GMT+3.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const spokenLanguages = LOCALES.filter((locale) =>
    ["en", "ru", "zh"].includes(locale.code),
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak to a local expert"
        lede="We are in Arusha, not in a call centre. Whichever way you get in touch, one of the founders will see it."
      />

      <section className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <dl className="flex flex-col divide-y divide-rule border-y border-rule">
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">Phone</dt>
                  <dd className="mt-2">
                    <a
                      href={COMPANY.phoneHref}
                      className="font-display text-[1.6rem] text-forest transition-colors duration-300 hover:text-terracotta"
                    >
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={COMPANY.emailHref}
                      className="font-display text-[1.6rem] text-forest transition-colors duration-300 hover:text-terracotta"
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">WhatsApp</dt>
                  <dd className="mt-2">
                    <a
                      href={COMPANY.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-[1rem] text-forest transition-colors duration-300 hover:text-terracotta"
                    >
                      <WhatsAppGlyph className="size-4" />
                      Message us
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">Hours</dt>
                  <dd className="mt-2 text-[0.98rem] text-ink-soft">
                    {COMPANY.hours.label}
                    <br />
                    {COMPANY.hours.timezone} — Tanzania is three hours ahead of
                    UTC, all year.
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">Where we are</dt>
                  <dd className="mt-2 text-[0.98rem] text-ink-soft">
                    {COMPANY.base}
                    <span className="tnum mt-1 block text-[0.82rem] tracking-[0.1em] text-ink-faint">
                      {HOME_COORDINATES.label}
                    </span>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-ink-faint">Languages</dt>
                  <dd className="mt-2 text-[0.98rem] text-ink-soft">
                    We plan and host in English and Swahili
                    {spokenLanguages.length > 1 &&
                      `, and also speak ${spokenLanguages
                        .filter((l) => l.code !== "en")
                        .map((l) => l.englishLabel)
                        .join(" and ")}`}
                    .
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-5">
                {(
                  [
                    ["Instagram", COMPANY.social.instagram],
                    ["LinkedIn", COMPANY.social.linkedin],
                    ["YouTube", COMPANY.social.youtube],
                  ] as const
                ).map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow text-ink-soft transition-colors duration-300 hover:text-terracotta"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <div className="border border-rule bg-ivory-warm p-8">
                <CompassMark className="size-8 text-gold" />
                <h2 className="font-display mt-5 text-[1.5rem] leading-tight text-forest">
                  Planning a trip?
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
                  The planner takes a few minutes and gives us everything we need
                  to come back with a real route rather than a brochure.
                </p>
                <ButtonLink href="/plan" variant="primary" className="mt-7">
                  Plan your journey
                </ButtonLink>
              </div>

              <div className="relative mt-8 aspect-4/3 overflow-hidden">
                <Photo
                  photo={PHOTOS.arusha}
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
              <p className="mt-3 text-[0.8rem] text-ink-faint">
                Arusha, at the foot of Mount Meru — where every journey starts.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
