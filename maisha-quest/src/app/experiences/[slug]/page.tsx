import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SafariCard } from "@/components/safari/SafariCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCES } from "@/data/experiences";
import {
  getDestination,
  getExperience,
  getSafarisByDestination,
} from "@/lib/content";
import type { Destination, Safari } from "@/types/content";

export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperience(slug);
  if (!experience) return {};
  return {
    title: experience.name,
    description: experience.description.slice(0, 158),
    alternates: { canonical: `/experiences/${experience.slug}` },
    openGraph: {
      title: `${experience.name} · Tanzania`,
      description: experience.shortDescription,
      images: [{ url: experience.image.src }],
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperience(slug);
  if (!experience) notFound();

  const destinations = (
    await Promise.all(experience.destinationSlugs.map((s) => getDestination(s)))
  ).filter((d): d is Destination => Boolean(d));

  // Viajes que pasan por cualquiera de esos destinos, sin repetir.
  const safariLists = await Promise.all(
    experience.destinationSlugs.map((s) => getSafarisByDestination(s)),
  );
  const safaris = [...new Map(safariLists.flat().map((s) => [s.slug, s])).values()]
    .slice(0, 3) as Safari[];

  return (
    <>
      <PageHero
        eyebrow="Experience"
        title={experience.name}
        lede={experience.shortDescription}
        image={experience.image}
      />

      <div className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lede measure text-ink-soft">
                  {experience.description}
                </p>
              </Reveal>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <h2 className="eyebrow border-t border-rule pt-7 text-ink-faint">
                  Where you do this
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {destinations.map((destination) => (
                    <li key={destination.slug}>
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="flex items-baseline justify-between gap-4 text-[0.95rem] text-forest transition-colors duration-300 hover:text-terracotta"
                      >
                        {destination.name}
                        <span className="text-[0.78rem] text-ink-faint">
                          {destination.bestTime}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/plan" variant="primary" className="mt-8">
                  Add this to my journey
                </ButtonLink>
              </Reveal>
            </aside>
          </div>
        </Container>
      </div>

      {safaris.length > 0 && (
        <section className="border-t border-rule bg-page-alt py-20">
          <Container width="wide">
            <h2 className="text-h2 text-forest">Journeys that include it</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {safaris.map((safari) => (
                <li key={safari.slug} className="flex">
                  <SafariCard safari={safari} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
