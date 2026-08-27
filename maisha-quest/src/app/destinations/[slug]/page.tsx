import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SafariCard } from "@/components/safari/SafariCard";
import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { DESTINATIONS } from "@/data/destinations";
import {
  getDestination,
  getExperienceForDestination,
  getSafarisByDestination,
} from "@/lib/content";

export function generateStaticParams() {
  return DESTINATIONS.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) return {};
  return {
    title: `${destination.name}, Tanzania`,
    description: destination.description.slice(0, 158),
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title: `${destination.name} · Tanzania`,
      description: destination.shortDescription,
      images: [{ url: destination.image.src }],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestination(slug);
  if (!destination) notFound();

  const experiences = getExperienceForDestination(destination.slug);
  const safaris = await getSafarisByDestination(destination.slug);

  return (
    <>
      <PageHero
        eyebrow={destination.region}
        title={destination.name}
        lede={destination.shortDescription}
        image={destination.image}
      >
        <p className="tnum mt-8 flex items-center gap-3 text-[0.8rem] tracking-[0.16em] text-sand">
          <CompassMark className="size-5" needle={false} />
          {destination.coordinates.label}
        </p>
      </PageHero>

      <div className="bg-page py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-lede measure text-ink-soft">
                  {destination.description}
                </p>
              </Reveal>

              {destination.seasons && (
                <Reveal className="mt-12">
                  <h2 className="text-h2 text-forest">When to come</h2>
                  <dl className="mt-7 flex flex-col divide-y divide-rule border-y border-rule">
                    {destination.seasons.map((season) => (
                      <div key={season.label} className="py-5">
                        <dt className="flex flex-wrap items-baseline gap-x-4">
                          <span className="font-display text-[1.25rem] text-forest">
                            {season.label}
                          </span>
                          <span className="eyebrow text-terracotta">
                            {season.months}
                          </span>
                        </dt>
                        <dd className="measure mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                          {season.note}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}

              {destination.gallery && destination.gallery.length > 0 && (
                <Reveal className="mt-12">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {destination.gallery.map((image) => (
                      <li
                        key={image.src}
                        className="relative aspect-4/3 overflow-hidden"
                      >
                        <Photo photo={image} sizes="(max-width: 640px) 100vw, 40vw" />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Reveal>
                <dl className="flex flex-col gap-7 border-t border-rule pt-7">
                  <div>
                    <dt className="eyebrow text-ink-faint">Best time</dt>
                    <dd className="mt-2 text-[0.98rem] text-forest">
                      {destination.bestTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-faint">Wildlife</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {destination.wildlife.map((animal) => (
                        <span
                          key={animal}
                          className="border border-rule px-3 py-1.5 text-[0.8rem] text-ink-soft"
                        >
                          {animal}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ink-faint">Experiences here</dt>
                    <dd className="mt-2 flex flex-col gap-2">
                      {experiences.map((experience) => (
                        <Link
                          key={experience.slug}
                          href={`/experiences/${experience.slug}`}
                          className="text-[0.95rem] text-forest underline decoration-forest/25 underline-offset-[6px] transition-colors duration-300 hover:text-terracotta hover:decoration-terracotta"
                        >
                          {experience.name}
                        </Link>
                      ))}
                    </dd>
                  </div>
                </dl>

                <ButtonLink href="/plan" variant="primary" className="mt-9">
                  Include {destination.name}
                </ButtonLink>
              </Reveal>
            </aside>
          </div>
        </Container>
      </div>

      {safaris.length > 0 && (
        <section className="border-t border-rule bg-page-alt py-20">
          <Container width="wide">
            <h2 className="text-h2 text-forest">
              Journeys through {destination.name}
            </h2>
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
