import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/motion";
import { PHOTOS } from "@/data/photography";
import { isLocale, localeHref } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { formatDate, getJournalPosts } from "@/lib/content";

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
    path: "/journal",
    title: t.meta.journal.title,
    description: t.meta.journal.description,
  });
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const posts = await getJournalPosts(locale);

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.journal}
        title={t.journal.title}
        lede={t.journal.lede}
        image={PHOTOS["serengeti-sunset-wide"]}
      />

      <div className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <Reveal>
            <ul className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article>
                    <Link
                      href={localeHref(locale, `/journal/${post.slug}`)}
                      className="group block"
                    >
                      <div className="relative aspect-3/2 overflow-hidden">
                        <Photo
                          photo={post.image}
                          alt=""
                          sizes="(max-width: 768px) 100vw, 32vw"
                          className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <p className="eyebrow mt-5 flex items-center gap-3 text-terracotta-text">
                        {post.category}
                        <span className="text-ink-faint">
                          {t.common.readingTime(post.readingMinutes)}
                        </span>
                      </p>
                      <h2 className="font-display mt-2.5 text-[1.45rem] leading-tight text-forest transition-colors duration-300 group-hover:text-terracotta-text">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">
                        {post.excerpt}
                      </p>
                      <time
                        dateTime={post.date}
                        className="mt-4 block text-[0.8rem] text-ink-faint"
                      >
                        {formatDate(locale, post.date)}
                      </time>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
