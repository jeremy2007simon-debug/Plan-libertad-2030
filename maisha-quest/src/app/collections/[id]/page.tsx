import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { SafariCard } from "@/components/safari/SafariCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { COLLECTIONS } from "@/data/collections";
import {
  collectionDurationRange,
  formatDurationRange,
  getCollection,
  getSafarisByCollection,
} from "@/lib/content";
import type { CollectionId } from "@/types/content";

/** Las tres colecciones se prerenderizan: son finitas y no cambian por sesión. */
export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ id: collection.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const collection = await getCollection(id as CollectionId);
  if (!collection) return {};
  return {
    title: `${collection.name} Collection`,
    description: `${collection.tagline} ${collection.description}`,
    alternates: { canonical: `/collections/${collection.id}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = await getCollection(id as CollectionId);
  if (!collection) notFound();

  const safaris = await getSafarisByCollection(collection.id);
  const others = COLLECTIONS.filter((c) => c.id !== collection.id);

  return (
    <>
      {/* El H1 es el nombre de la colección, no su lema: es lo que la
          identifica en un buscador y lo que mantiene la jerarquía de
          encabezados coherente con el resto de la web. */}
      <PageHero
        eyebrow="Collection"
        title={`${collection.name} Collection`}
        lede={collection.tagline}
        image={collection.image}
      >
        <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5">
          <div>
            <dt className="eyebrow text-sand">Typical length</dt>
            <dd className="mt-1.5 text-ivory">
              {formatDurationRange(collectionDurationRange(collection))}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-sand">Suits</dt>
            <dd className="mt-1.5 text-ivory">{collection.travellerProfile}</dd>
          </div>
        </dl>
      </PageHero>

      <section className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <p className="text-lede measure text-ink-soft">
            {collection.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {collection.traits.map((trait) => (
              <li
                key={trait}
                className="border border-rule px-4 py-2 text-[0.85rem] text-ink-soft"
              >
                {trait}
              </li>
            ))}
          </ul>

          {/* Encabezado de nivel 2 antes de la rejilla: las tarjetas usan h3
              y sin él la jerarquía saltaría de h1 a h3. */}
          <h2 className="text-h2 mt-14 text-forest">
            {safaris.length} journey{safaris.length === 1 ? "" : "s"} in this
            collection
          </h2>

          <Reveal className="mt-10">
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {safaris.map((safari, index) => (
                <li key={safari.slug} className="flex">
                  <SafariCard safari={safari} priority={index === 0} />
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Las otras dos colecciones, por si esta no encaja. */}
      <section className="border-t border-rule bg-page-alt py-20">
        <Container width="wide">
          <h2 className="text-h2 text-forest">Not quite you?</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.id}>
                <p className="eyebrow text-terracotta">
                  {other.name} Collection
                </p>
                <h3 className="font-display mt-3 text-[1.5rem] leading-tight text-forest">
                  {other.tagline}
                </h3>
                <p className="measure mt-3 text-[0.94rem] text-ink-soft">
                  {other.description}
                </p>
                <ButtonLink
                  href={`/collections/${other.id}`}
                  variant="quiet"
                  className="mt-4"
                >
                  Explore {other.name}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
