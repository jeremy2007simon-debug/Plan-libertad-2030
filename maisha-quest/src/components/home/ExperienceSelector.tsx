import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { MagneticArrow, Reveal, Stagger } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type Locale, localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { getExperienceCategories } from "@/lib/content";

/**
 * "How do you want to experience Tanzania?"
 *
 * Es la primera bifurcación real de la web: en lugar de obligar a elegir entre
 * tres nombres de paquete que no significan nada para quien llega de fuera, se
 * pregunta por el motivo del viaje.
 *
 * En escritorio es una rejilla; en móvil, el mismo marcado se convierte en
 * carrusel táctil (`Carousel` usa scroll nativo con snap, así que no hay dos
 * versiones del contenido ni JavaScript duplicado).
 *
 * Sobre oliva y con ritmo: las tarjetas pares bajan media altura y son algo
 * más cortas, de modo que la fila deja de leerse como una cuadrícula. La
 * información esencial —número, título y descripción— está SIEMPRE visible;
 * al pasar por encima solo cambian el velo, un zoom del 3 % y la flecha. Nada
 * que haga falta para decidir se esconde detrás de un hover, que además no
 * existe en pantallas táctiles.
 */
export async function ExperienceSelector({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const categories = await getExperienceCategories(locale);

  const card = (
    category: (typeof categories)[number],
    index: number,
    /** En la rejilla de escritorio las pares son algo más cortas. */
    ratio: string,
  ) => (
    <Link
      key={category.id}
      href={localeHref(locale, `/experiences/${category.experience.slug}`)}
      className={`group relative block w-full overflow-hidden ${ratio}`}
    >
      <Photo
        photo={category.experience.image}
        alt=""
        // 50vw en móvil frente a los 76vw reales: mismo tope de densidad que
        // en la sección del elefante. El carrusel horizontal descarga las
        // cuatro tarjetas antes de que nadie lo toque, así que aquí se
        // multiplica por cuatro cada kilobyte de más.
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 23vw"
        quality={60}
        className="transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
      />
      {/* Dos velos: el de base asienta el texto; el segundo, terracota muy
          diluida, entra al pasar por encima y da el calor de la hora dorada
          sin apagar la fotografía. */}
      <div className="media-scrim-soft absolute inset-0" />
      <div className="absolute inset-0 bg-linear-to-t from-[var(--terracotta)]/38 to-transparent opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100 group-focus-visible:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="tnum block text-[0.65rem] tracking-[0.24em] text-[var(--gold)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="mt-2 block h-px w-8 origin-left bg-[var(--gold)]/70 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-x-[2.6] group-focus-visible:scale-x-[2.6]"
        />
        <h3 className="font-display mt-3 text-[1.4rem] leading-tight text-parchment">
          {t.categories[category.id as keyof typeof t.categories]}
        </h3>
        <p className="mt-2 max-w-[26ch] text-[0.84rem] leading-snug text-parchment/80">
          {category.experience.shortDescription}
        </p>
        <span className="mt-3 flex text-[var(--gold)]">
          <MagneticArrow />
        </span>
      </div>
    </Link>
  );

  const carouselCards = categories.map((category, index) =>
    card(category, index, "aspect-3/4"),
  );

  return (
    <section className="on-olive texture-dust relative isolate bg-olive-deep py-10 sm:py-14">
      <Container width="wide">
        <SectionHeading
          tone="dark"
          eyebrow={t.home.experiences.eyebrow}
          title={t.home.experiences.title}
          lede={t.home.experiences.lede}
        />
      </Container>

      {/* Escritorio: rejilla de ocho con alturas alternas. */}
      <Container width="wide" className="mt-10 hidden lg:block">
        <ul className="grid grid-cols-4 items-start gap-5">
          <Stagger as="li" step={0.07}>
            {categories.map((category, index) =>
              index % 2 === 1 ? (
                <div key={category.id} className="pt-10">
                  {card(category, index, "aspect-square")}
                </div>
              ) : (
                card(category, index, "aspect-3/4")
              ),
            )}
          </Stagger>
        </ul>
      </Container>

      {/* Móvil y tableta: carrusel táctil. */}
      <div className="mt-10 lg:hidden">
        {/* El sangrado hasta el borde lo aplica ahora `Carousel`; quitarle aquí
            el padding al contenedor lo duplicaría y sacaría la pista fuera de
            la pantalla. */}
        <Container width="wide">
          <Reveal>
            <Carousel
              label={t.home.experiences.carouselLabel}
              itemClassName="w-[74vw] max-w-[21rem] sm:w-[38vw]"
            >
              {carouselCards}
            </Carousel>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
