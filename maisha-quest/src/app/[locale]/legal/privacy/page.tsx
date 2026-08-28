import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.legal.privacy.title,
    description: t.legal.privacy.intro,
    alternates: alternatesFor(locale, "/legal/privacy"),
    // Las páginas legales no se indexan mientras sean un esqueleto.
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <LegalPage
      eyebrow={t.legal.eyebrow}
      title={t.legal.privacy.title}
      intro={t.legal.privacy.intro}
      sections={t.legal.privacy.sections}
      notice={t.legal.notice}
      pendingLabel={t.legal.pendingSection}
    />
  );
}
