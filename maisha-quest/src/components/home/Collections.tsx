import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { CompassPoint } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  collectionDurationRange,
  formatDurationRange,
  getCollections,
} from "@/lib/content";

/**
 * Las tres colecciones Maisha.
 *
 * Cada una ocupa una banda ancha alternando el lado de la imagen, en lugar de
 * tres tarjetas idénticas: así se lee la diferencia entre ellas, que es
 * justo lo que hoy no se distingue. La duración sale calculada de los safaris
 * reales de cada colección, no escrita a mano — si mañana se añade un viaje de
 * 14 días, el rango se actualiza solo.
 */
export async function Collections() {
  const collections = await getCollections();

  return (
    <section className="dark-section bg-forest py-24 text-on-dark sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow="The Maisha Collections"
          tone="dark"
          title="Three ways to travel Tanzania"
          lede="Not three price tiers — three temperaments. Most travellers know which one is theirs by the end of the first line."
        >
          <ButtonLink href="/safaris" variant="quiet" tone="dark">
            View all safaris
          </ButtonLink>
        </SectionHeading>

        <div className="mt-16 flex flex-col gap-16 sm:gap-20">
          {collections.map((collection, index) => {
            const range = formatDurationRange(collectionDurationRange(collection));
            const flipped = index % 2 === 1;

            return (
              <Reveal key={collection.id}>
                <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <Link
                    href={`/collections/${collection.id}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`group relative block aspect-16/10 overflow-hidden lg:col-span-7 ${
                      flipped ? "lg:order-2 lg:col-start-6" : ""
                    }`}
                  >
                    <Photo
                      photo={collection.image}
                      alt=""
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </Link>

                  <div
                    className={`lg:col-span-5 ${
                      flipped ? "lg:order-1 lg:col-start-1" : ""
                    }`}
                  >
                    <p className="eyebrow flex items-center gap-2.5 text-sand">
                      <CompassPoint className="size-2.5" />
                      {String(index + 1).padStart(2, "0")} · {collection.name}
                    </p>

                    <h3 className="text-h2 mt-4 text-ivory">
                      <Link
                        href={`/collections/${collection.id}`}
                        className="transition-colors duration-300 hover:text-sand"
                      >
                        {collection.tagline}
                      </Link>
                    </h3>

                    <p className="measure mt-5 text-[0.98rem] leading-relaxed text-on-dark-soft">
                      {collection.description}
                    </p>

                    <dl className="mt-7 grid gap-x-8 gap-y-4 border-t border-rule-on-dark pt-6 sm:grid-cols-2">
                      <div>
                        <dt className="eyebrow text-on-dark-faint">Typical length</dt>
                        <dd className="mt-1.5 text-[0.95rem] text-ivory">{range}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-on-dark-faint">Suits</dt>
                        <dd className="mt-1.5 text-[0.95rem] text-ivory">
                          {collection.travellerProfile}
                        </dd>
                      </div>
                    </dl>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {collection.traits.map((trait) => (
                        <li
                          key={trait}
                          className="border border-rule-on-dark px-3 py-1.5 text-[0.75rem] text-on-dark-soft"
                        >
                          {trait}
                        </li>
                      ))}
                    </ul>

                    <ButtonLink
                      href={`/collections/${collection.id}`}
                      variant="secondary"
                      tone="dark"
                      className="mt-8"
                    >
                      Explore Collection
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
