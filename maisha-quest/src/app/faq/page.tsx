import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSchema } from "@/components/seo/StructuredData";
import { ButtonLink } from "@/components/ui/Button";
import { CompassPoint } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { getFaqs } from "@/lib/content";
import { COMPANY } from "@/lib/site";
import type { FAQ } from "@/types/content";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "When to visit Tanzania, how far ahead to book, what a private safari means, visas, vaccinations and what to pack — answered by our team in Arusha.",
  alternates: { canonical: "/faq" },
};

const TOPIC_ORDER: FAQ["topic"][] = [
  "Planning",
  "Safari",
  "Travel",
  "Health & safety",
  "Payment",
];

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <FaqSchema faqs={faqs} />
      <PageHero
        eyebrow="FAQ"
        title="Questions we are asked most"
        lede="Straight answers. Where something depends on your passport, your health or your dates, we say so and point you at the official source rather than guessing."
      />

      <div className="bg-page py-16 sm:py-20">
        <Container width="prose">
          {TOPIC_ORDER.map((topic) => {
            const inTopic = faqs.filter((faq) => faq.topic === topic);
            if (inTopic.length === 0) return null;
            return (
              <section key={topic} className="mb-14 last:mb-0">
                <h2 className="eyebrow border-b border-rule pb-4 text-terracotta">
                  {topic}
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
              Still not answered?
            </h2>
            <p className="mt-4 text-[0.96rem] leading-relaxed text-ink-soft">
              Write to us at{" "}
              <a
                href={COMPANY.emailHref}
                className="text-forest underline underline-offset-4 hover:text-terracotta"
              >
                {COMPANY.email}
              </a>{" "}
              or call {COMPANY.phone}. We are in Arusha, {COMPANY.hours.timezone}.
            </p>
            <ButtonLink href="/contact" variant="primary" className="mt-7">
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
