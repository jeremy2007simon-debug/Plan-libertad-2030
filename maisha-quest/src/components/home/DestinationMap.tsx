import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plainTitle } from "@/components/ui/motion";
import {
  formatRoute,
  getDestinations,
  getSafarisByDestination,
} from "@/lib/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { MapExplorer, type MapDestination } from "./MapExplorer";
import { getPhotoAlt } from "@/i18n/alt";

/**
 * "Find your place in Tanzania".
 *
 * Envoltorio de servidor: resuelve destinos, experiencias y viajes desde la
 * capa de datos y le pasa al cliente sólo lo que el mapa necesita. Así el
 * bundle de cliente no arrastra el catálogo entero.
 */
export async function DestinationMap({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const destinations = await getDestinations(locale);
  const alt = await getPhotoAlt(locale);

  const payload: MapDestination[] = await Promise.all(
    destinations.map(async (destination) => {
      const safaris = await getSafarisByDestination(locale, destination.slug);
      return {
        slug: destination.slug,
        name: destination.name,
        moreOnLabel: t.home.map.moreOn(destination.name),
        region: t.regions[destination.region],
        shortDescription: destination.shortDescription,
        description: destination.description,
        bestTime: destination.bestTime,
        wildlife: destination.wildlife,
        coordinates: destination.coordinates.label,
        mapPosition: destination.mapPosition,
        image: {
          src: destination.image.src ?? "",
          alt: alt[destination.image.altKey],
          width: destination.image.width ?? 1600,
          height: destination.image.height ?? 1067,
          blurDataURL:
            "blurDataURL" in destination.image
              ? (destination.image.blurDataURL as string)
              : "",
        },
        safaris: safaris.map((safari) => ({
          slug: safari.slug,
          name: safari.name,
          durationDays: safari.durationDays,
          durationLabel: t.home.map.dayCount(safari.durationDays),
          route: formatRoute(locale, safari),
        })),
      };
    }),
  );

  return (
    <section className="on-sand texture-paper relative isolate bg-sand py-10 sm:py-14">
      <Container width="wide">
        <SectionHeading
          eyebrow={t.home.map.eyebrow}
          title={t.home.map.title}
          lede={t.home.map.lede}
        />
        <div className="mt-12">
          <MapExplorer
            destinations={payload}
            locale={locale}
            /* Solo las cadenas: `t.home.map` también contiene funciones de
               traducción (`dayCount`, `moreOn`) y esas se resuelven arriba,
               al construir `payload`. */
            t={{
              eyebrow: t.home.map.eyebrow,
              title: plainTitle(t.home.map.title),
              lede: t.home.map.lede,
              bestTime: t.home.map.bestTime,
              wildlife: t.home.map.wildlife,
              journeysHere: t.home.map.journeysHere,
              chooseDestination: t.home.map.chooseDestination,
            }}
          />
        </div>
      </Container>
    </section>
  );
}
