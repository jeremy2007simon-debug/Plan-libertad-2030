import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperienceCategories } from "@/lib/content";
import { getPhotoAlt } from "@/i18n/alt";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { ExperienceExplorerPanel, type ExplorerItem } from "./ExperienceExplorerPanel";

/**
 * Encuadre de cada categoría en el panel panorámico del explorador.
 *
 * El original de cada fotografía sirve a varios recortes distintos en la web
 * (una miniatura 3:4, un panel cuadrado, este panel ancho); el punto de
 * interés casi nunca es el mismo en todos, así que este componente define el
 * suyo en lugar de heredar el de la fotografía.
 */
const OBJECT_POSITION: Record<string, string> = {
  wildlife: "50% 30%",
  adventure: "center 58%",
  luxury: "center 42%",
  honeymoon: "center 56%",
  family: "center 68%",
  culture: "center 46%",
  kilimanjaro: "center 40%",
  "safari-and-zanzibar": "center 42%",
};

/**
 * "How do you want to experience Tanzania?" — el explorador.
 *
 * El cliente rechazó la versión anterior (una rejilla de ocho tarjetas de
 * distintas alturas y proporciones, con texto sobre cada fotografía): leía
 * como un collage, no como una selección editorial. Esta versión envuelve
 * de servidor —resuelve categorías, alt text y encuadres— y le pasa al
 * cliente sólo los datos planos que el panel necesita.
 */
export async function ExperienceExplorer({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const categories = await getExperienceCategories(locale);
  const alt = await getPhotoAlt(locale);

  const items: ExplorerItem[] = categories.map((category) => ({
    id: category.id,
    slug: category.experience.slug,
    label: t.categories[category.id as keyof typeof t.categories],
    shortDescription: category.experience.shortDescription,
    objectPosition: OBJECT_POSITION[category.id] ?? "center",
    image: {
      src: category.experience.image.src,
      alt: alt[category.experience.image.altKey],
      blurDataURL: category.experience.image.blurDataURL,
    },
  }));

  return (
    <section className="on-olive texture-dust relative isolate bg-olive-deep py-14 sm:py-20">
      <Container width="wide">
        <SectionHeading
          tone="dark"
          eyebrow={t.home.experiences.eyebrow}
          title={t.home.experiences.title}
          lede={t.home.experiences.lede}
        />
        <div className="mt-12 sm:mt-16">
          <ExperienceExplorerPanel
            items={items}
            locale={locale}
            exploreLabel={t.home.experiences.explore}
            selectorLabel={t.home.experiences.carouselLabel}
          />
        </div>
      </Container>
    </section>
  );
}
