import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  formatRoute,
  getDestinations,
  getExperienceForDestination,
  getSafarisByDestination,
} from "@/lib/content";
import { MapExplorer, type MapDestination } from "./MapExplorer";

/**
 * "Find your place in Tanzania".
 *
 * Envoltorio de servidor: resuelve destinos, experiencias y viajes desde la
 * capa de datos y le pasa al cliente sólo lo que el mapa necesita. Así el
 * bundle de cliente no arrastra el catálogo entero.
 */
export async function DestinationMap() {
  const destinations = await getDestinations();

  const payload: MapDestination[] = await Promise.all(
    destinations.map(async (destination) => {
      const safaris = await getSafarisByDestination(destination.slug);
      return {
        slug: destination.slug,
        name: destination.name,
        region: destination.region,
        shortDescription: destination.shortDescription,
        description: destination.description,
        bestTime: destination.bestTime,
        wildlife: destination.wildlife,
        coordinates: destination.coordinates.label,
        mapPosition: destination.mapPosition,
        image: {
          src: destination.image.src ?? "",
          alt: destination.image.alt,
          width: destination.image.width ?? 1600,
          height: destination.image.height ?? 1067,
          blurDataURL:
            "blurDataURL" in destination.image
              ? (destination.image.blurDataURL as string)
              : "",
        },
        experiences: getExperienceForDestination(destination.slug).map((e) => ({
          slug: e.slug,
          name: e.name,
        })),
        safaris: safaris.map((safari) => ({
          slug: safari.slug,
          name: safari.name,
          durationDays: safari.durationDays,
          route: formatRoute(safari),
        })),
      };
    }),
  );

  return (
    <section className="bg-page-alt py-24 sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow="The map"
          title="Find your place in Tanzania"
          lede="Nine places, four circuits and one coastline. Select one to see when to go, what lives there and which journeys pass through."
        />
        <div className="mt-14">
          <MapExplorer destinations={payload} />
        </div>
      </Container>
    </section>
  );
}
