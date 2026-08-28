import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSchema } from "@/components/seo/StructuredData";
import { ButtonLink } from "@/components/ui/Button";
import { CompassPoint } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";
import type { FAQ } from "@/types/content";

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
    path: "/faq",
    title: t.meta.faq.title,
    description: t.meta.faq.description,
  });
}

const TOPIC_ORDER: FAQ["topic"][] = [
  "planning",
  "safari",
  "travel",
  "health",
  "payment",
];

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const faqs = await getFaqs(locale);

  return (
    <>
      <FaqSchema faqs={faqs} />
      <PageHero
        eyebrow={t.nav.items.faq}
        title={t.faq.title}
        lede={t.faq.lede}
      />

      <div className="bg-page py-16 sm:py-20">
        <Container width="prose">
          {TOPIC_ORDER.map((topic) => {
            const inTopic = faqs.filter((faq) => faq.topic === topic);
            if (inTopic.length === 0) return null;
            return (
              <section key={topic} className="mb-14 last:mb-0">
                <h2 className="eyebrow border-b border-rule pb-4 text-terracotta-text">
                  {t.faqTopics[topic]}
                </h2>
                <div className="flex flex-col divide-y divide-rule">
                  {inTopic.map((faq) => (
                    <details key={faq.slug} id={faq.slug} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                        <h3 className="font-display text-[1.2rem] leading-snug text-forest">
                          {faq.question}
                        </h3>
                        <CompassPoint className="mt-2 size-3 shrink-0 text-gold transition-transform duration-500 group-open:rotate-45" />
                      </summary>
                      <p className="mt-4 text-[0.96rem] leading-relaxed text-ink-soft">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}

          <div className="mt-16 border-t border-rule pt-10">
            <h2 className="text-h3 font-display text-forest">
              {t.faq.stillTitle}
            </h2>
            <p className="mt-4 text-[0.96rem] leading-relaxed text-ink-soft">
              {t.faq.stillBefore}{" "}
              <a
                href={COMPANY.emailHref}
                className="text-forest underline underline-offset-4 hover:text-terracotta-text"
              >
                {COMPANY.email}
              </a>{" "}
              {t.faq.stillAfter(COMPANY.phone, COMPANY.hours.timezone)}
            </p>
            <ButtonLink
              href="/contact"
              locale={locale}
              variant="primary"
              className="mt-7"
            >
              {t.notFound.contact}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
