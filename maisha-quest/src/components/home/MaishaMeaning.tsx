import { ButtonLink } from "@/components/ui/Button";
import { CompassDivider } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { ImageSlot, Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";

/**
 * "Maisha significa vida" — el bloque editorial que explica la marca.
 *
 * Composición a dos columnas desiguales con la imagen desbordando ligeramente
 * la retícula: es lo que separa una página editorial de una cuadrícula de
 * tarjetas. El hueco vertical de la derecha espera el retrato real del equipo;
 * mientras tanto lo ocupa una fotografía de paisaje y, debajo, un hueco
 * declarado para la foto del equipo en Arusha.
 */
export function MaishaMeaning() {
  return (
    <section className="bg-page py-24 sm:py-32">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Imagen */}
          <Reveal className="lg:col-span-6 lg:col-start-1">
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-5 aspect-4/5 overflow-hidden sm:col-span-3">
                <Photo
                  photo={PHOTOS["serengeti-plains"]}
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
              <div className="relative col-span-5 aspect-4/5 self-end overflow-hidden sm:col-span-2">
                <ImageSlot label="The Maisha Quest team in Arusha" />
              </div>
            </div>
          </Reveal>

          {/* Texto */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow text-terracotta">Our name</p>
              <h2 className="text-h1 mt-5 text-forest">
                <span className="italic">&lsquo;Maisha&rsquo;</span> means life.
              </h2>
              <p className="text-lede measure mt-7 text-ink-soft">
                Every journey is a chance to discover, connect and live more
                fully. We create private Tanzanian safaris shaped around who you
                are and how you want to travel.
              </p>

              <CompassDivider className="my-9 max-w-xs" />

              <p className="measure text-[0.98rem] leading-relaxed text-ink-soft">
                Maisha Quest was founded in Arusha, at the foot of Mount Meru
                and the start of the northern circuit. We are a small team: the
                people who answer your first email are the people who meet you
                at the airport.
              </p>

              <ButtonLink href="/about" variant="secondary" className="mt-9">
                Meet Maisha Quest
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
