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
    title: t.legal.cookies.title,
    description: t.legal.cookies.intro,
    alternates: alternatesFor(locale, "/legal/cookies"),
    // Las páginas legales no se indexan mientras sean un esqueleto.
    robots: { index: false, follow: true },
  };
}

export default async function CookiesPage({
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
      title={t.legal.cookies.title}
      intro={t.legal.cookies.intro}
      sections={t.legal.cookies.sections}
      notice={t.legal.notice}
      pendingLabel={t.legal.pendingSection}
    />
  );
}
