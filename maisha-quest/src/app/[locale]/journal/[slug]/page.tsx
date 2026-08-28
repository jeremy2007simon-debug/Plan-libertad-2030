import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CompassDivider } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { JOURNAL_STRUCTURE } from "@/data/structure/journal";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate, getJournalPost } from "@/lib/content";
import { alternatesFor } from "@/lib/seo";

/** Las tres entradas × los seis idiomas: dieciocho rutas estáticas. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    JOURNAL_STRUCTURE.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getJournalPost(locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesFor(locale, `/journal/${post.slug}`),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image.src }],
    },
  };
}

/**
 * Artículo del journal.
 *
 * El modelo ya admite el cuerpo completo (`body`). Mientras el cliente no
 * facilite los textos, la página muestra la entradilla real y dice con
 * claridad que el artículo está en preparación, en lugar de rellenar con
 * párrafos inventados sobre Tanzania firmados por la empresa.
 */
export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const post = await getJournalPost(locale, slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        lede={post.excerpt}
        image={post.image}
      >
        <p className="mt-8 flex flex-wrap items-center gap-x-4 text-[0.82rem] text-ivory/70">
          <time dateTime={post.date}>
            {formatDate(locale, post.date)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{t.common.readingTime(post.readingMinutes)}</span>
          {post.author && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </>
          )}
        </p>
      </PageHero>

      <article className="bg-page py-16 sm:py-20">
        <Container width="prose">
          {post.body && post.body.length > 0 ? (
            post.body.map((paragraph, index) => (
              <p
                key={index}
                className="mt-6 text-[1.02rem] leading-[1.75] text-ink-soft first:mt-0"
              >
                {paragraph}
              </p>
            ))
          ) : (
            <div className="border-l-2 border-gold pl-6">
              <p className="text-[1.02rem] leading-relaxed text-ink-soft">
                {t.journal.pendingTitle}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-faint">
                {t.journal.pendingBody}
              </p>
            </div>
          )}

          <CompassDivider className="my-12" />

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/plan" locale={locale} variant="primary">
              {t.nav.planCta}
            </ButtonLink>
            <ButtonLink href="/journal" locale={locale} variant="secondary">
              {t.journal.more}
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}
