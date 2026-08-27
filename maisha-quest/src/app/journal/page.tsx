import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";
import { getJournalPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Planning guides from our team in Arusha: where the migration is month by month, choosing a Kilimanjaro route, and travelling Tanzania in the green season.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from Arusha"
        lede="Practical writing about travelling Tanzania — the questions we are asked most, answered properly rather than in a paragraph."
        image={PHOTOS["serengeti-sunset-wide"]}
      />

      <div className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <Reveal>
            <ul className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article>
                    <Link href={`/journal/${post.slug}`} className="group block">
                      <div className="relative aspect-3/2 overflow-hidden">
                        <Photo
                          photo={post.image}
                          alt=""
                          sizes="(max-width: 768px) 100vw, 32vw"
                          className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                        />
                      </div>
                      <p className="eyebrow mt-5 flex items-center gap-3 text-terracotta">
                        {post.category}
                        <span className="text-ink-faint">
                          {post.readingMinutes} min read
                        </span>
                      </p>
                      <h2 className="font-display mt-2.5 text-[1.45rem] leading-tight text-forest transition-colors duration-300 group-hover:text-terracotta">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-soft">
                        {post.excerpt}
                      </p>
                      <time
                        dateTime={post.date}
                        className="mt-4 block text-[0.8rem] text-ink-faint"
                      >
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
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
