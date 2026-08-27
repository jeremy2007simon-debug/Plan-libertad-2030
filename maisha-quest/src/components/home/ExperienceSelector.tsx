import Link from "next/link";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
 */
export async function ExperienceSelector() {
  const categories = await getExperienceCategories();

  const cards = categories.map((category, index) => (
    <Link
      key={category.id}
      href={`/experiences/${category.experience.slug}`}
      className="group relative block aspect-3/4 w-full overflow-hidden"
    >
      <Photo
        photo={category.experience.image}
        alt=""
        sizes="(max-width: 640px) 66vw, (max-width: 1024px) 33vw, 22vw"
        className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="media-scrim-soft absolute inset-0 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span
          aria-hidden="true"
          className="tnum block text-[0.65rem] tracking-[0.2em] text-sand/70"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display mt-1.5 text-[1.35rem] leading-tight text-ivory">
          {category.label}
        </h3>
        <p className="mt-1.5 max-w-[24ch] text-[0.82rem] leading-snug text-ivory/70">
          {category.experience.shortDescription}
        </p>
      </div>
    </Link>
  ));

  return (
    <section className="bg-page-alt py-24 sm:py-28">
      <Container width="wide">
        <SectionHeading
          eyebrow="Start here"
          title="How do you want to experience Tanzania?"
          lede="Every journey we build starts with this question rather than with a package. Pick the one that sounds most like you — you can combine them later."
        />
      </Container>

      {/* Escritorio: rejilla de ocho. */}
      <Container width="wide" className="mt-12 hidden lg:block">
        <Reveal>
          <ul className="grid grid-cols-4 gap-5">
            {cards.map((card, index) => (
              <li key={index}>{card}</li>
            ))}
          </ul>
        </Reveal>
      </Container>

      {/* Móvil y tableta: carrusel táctil. */}
      <div className="mt-10 lg:hidden">
        {/* El sangrado hasta el borde lo aplica ahora `Carousel`; quitarle aquí
            el padding al contenedor lo duplicaría y sacaría la pista fuera de
            la pantalla. */}
        <Container width="wide">
          <Carousel
            label="Ways to experience Tanzania"
            itemClassName="w-[66vw] max-w-[19rem] sm:w-[34vw]"
          >
            {cards}
          </Carousel>
        </Container>
      </div>
    </section>
  );
}
