import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";
import { getDestinations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "The places a Maisha Quest journey travels through: Serengeti, Ngorongoro, Tarangire, Lake Manyara, Kilimanjaro, Nyerere, Ruaha, Zanzibar and Arusha.",
  alternates: { canonical: "/destinations" },
};

const REGION_ORDER = [
  "Gateway",
  "Northern Circuit",
  "Southern Circuit",
  "Coast & Islands",
] as const;

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="Nine places, one country"
        lede="Tanzania is not one landscape. These are the places we travel through, what lives in each and when they are at their best."
        image={PHOTOS["ngorongoro-crater"]}
      />

      <div className="bg-page py-20 sm:py-24">
        <Container width="wide">
          {REGION_ORDER.map((region) => {
            const inRegion = destinations.filter((d) => d.region === region);
            if (inRegion.length === 0) return null;

            return (
              <section key={region} className="mb-16 last:mb-0">
                <h2 className="eyebrow border-b border-rule pb-4 text-terracotta">
                  {region}
                </h2>
                <Reveal className="mt-8">
                  <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {inRegion.map((destination) => (
                      <li key={destination.slug}>
                        <Link
                          href={`/destinations/${destination.slug}`}
                          className="group block"
                        >
                          <div className="relative aspect-4/3 overflow-hidden">
                            <Photo
                              photo={destination.image}
                              alt=""
                              sizes="(max-width: 768px) 100vw, 32vw"
                              className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                            />
                          </div>
                          <h3 className="font-display mt-5 text-[1.5rem] leading-tight text-forest transition-colors duration-300 group-hover:text-terracotta">
                            {destination.name}
                          </h3>
                          <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">
                            {destination.shortDescription}
                          </p>
                          <p className="tnum mt-3 text-[0.75rem] tracking-[0.1em] text-ink-faint">
                            {destination.coordinates.label}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>
            );
          })}
        </Container>
      </div>
    </>
  );
}
