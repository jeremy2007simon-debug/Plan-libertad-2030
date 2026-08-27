import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SafariCard } from "@/components/safari/SafariCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PHOTOS } from "@/data/photography";
import {
  collectionDurationRange,
  formatDurationRange,
  getCollections,
  getSafaris,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "All safaris",
  description:
    "Every Maisha Quest journey through Tanzania, grouped by the way you like to travel: Explorer, Escape and Enrich. Private, tailor-made, planned from Arusha.",
  alternates: { canonical: "/safaris" },
};

/**
 * Catálogo completo.
 *
 * Se agrupa por colección en lugar de volcar una rejilla plana: así el
 * visitante ve la lógica de la oferta, no una lista de paquetes sueltos.
 */
export default async function SafarisPage() {
  const [safaris, collections] = await Promise.all([getSafaris(), getCollections()]);

  return (
    <>
      <PageHero
        eyebrow="Safaris"
        title="Every journey we build"
        lede="Nothing here is a fixed departure. Each one is a shape of journey we know works, rebuilt around your dates, your pace and the people you are travelling with."
        image={PHOTOS["serengeti-plains"]}
      />

      <div className="bg-page">
        {collections.map((collection) => {
          const inCollection = safaris.filter((s) => s.collection === collection.id);
          if (inCollection.length === 0) return null;

          return (
            <section
              key={collection.id}
              id={collection.id}
              className="border-b border-rule py-20 last:border-b-0 sm:py-24"
            >
              <Container width="wide">
                <SectionHeading
                  eyebrow={`${collection.name} Collection`}
                  title={collection.tagline}
                  lede={collection.description}
                >
                  <ButtonLink href={`/collections/${collection.id}`} variant="quiet">
                    About this collection
                  </ButtonLink>
                </SectionHeading>

                <p className="eyebrow mt-6 text-ink-faint">
                  {inCollection.length} journey{inCollection.length === 1 ? "" : "s"}
                  <span className="mx-2 opacity-50">·</span>
                  {formatDurationRange(collectionDurationRange(collection))}
                </p>

                <Reveal className="mt-10">
                  <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {inCollection.map((safari) => (
                      <li key={safari.slug} className="flex">
                        <SafariCard safari={safari} />
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </Container>
            </section>
          );
        })}
      </div>

      <section className="dark-section bg-forest py-20 text-on-dark">
        <Container width="wide">
          <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-h2 text-ivory">
                None of these quite right?
              </h2>
              <p className="measure mt-4 text-[0.98rem] text-on-dark-soft">
                Good — that is usually the starting point. Tell us what you are
                imagining and we will build it from scratch.
              </p>
            </div>
            <ButtonLink href="/plan" variant="primary" size="lg">
              Design your safari
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
