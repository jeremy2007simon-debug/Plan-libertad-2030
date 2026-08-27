import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CompassDivider } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { JOURNAL_POSTS } from "@/data/journal";
import { getJournalPost } from "@/lib/content";

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
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
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
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
                This article is being written by our team in Arusha and will be
                published here shortly.
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-faint">
                If you need the answer before then, ask us — it is a question we
                answer for travellers every week, and we would rather tell you
                properly than have you wait for a blog post.
              </p>
            </div>
          )}

          <CompassDivider className="my-12" />

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/plan" variant="primary">
              Plan your journey
            </ButtonLink>
            <ButtonLink href="/journal" variant="secondary">
              More from the journal
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  );
}
