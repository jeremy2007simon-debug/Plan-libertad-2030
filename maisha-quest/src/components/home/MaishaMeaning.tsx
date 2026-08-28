import { ButtonLink } from "@/components/ui/Button";
import { CompassDivider } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { ImageSlot, Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";

/**
 * "Maisha significa vida" — el bloque editorial que explica la marca.
 *
 * Composición a dos columnas desiguales con la imagen desbordando ligeramente
 * la retícula: es lo que separa una página editorial de una cuadrícula de
 * tarjetas. El hueco vertical de la derecha espera el retrato real del equipo;
 * mientras tanto lo ocupa una fotografía de paisaje y, debajo, un hueco
 * declarado para la foto del equipo en Arusha.
 */
export function MaishaMeaning({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="bg-page py-24 sm:py-32">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Imagen */}
          <Reveal className="lg:col-span-6 lg:col-start-1">
            <div className="grid grid-cols-5 gap-4">
              <div className="relative col-span-5 aspect-4/5 overflow-hidden sm:col-span-3">
                <Photo
                  photo={CLIENT_PHOTOS["african-elephant-portrait"]}
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
              <div className="relative col-span-5 aspect-4/5 self-end overflow-hidden sm:col-span-2">
                <ImageSlot label={t.home.maisha.teamSlot} />
              </div>
            </div>
          </Reveal>

          {/* Texto */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow text-terracotta">{t.home.maisha.eyebrow}</p>
              {/* "Maisha" es la marca: se queda en swahili en los seis
                  idiomas y solo se traduce lo que la acompaña. */}
              <h2 className="text-h1 mt-5 text-forest">
                <span className="italic">&lsquo;Maisha&rsquo;</span>{" "}
                {t.home.maisha.meansLife}
              </h2>
              <p className="text-lede measure mt-7 text-ink-soft">
                {t.home.maisha.lede}
              </p>

              <CompassDivider className="my-9 max-w-xs" />

              <p className="measure text-[0.98rem] leading-relaxed text-ink-soft">
                {t.home.maisha.body}
              </p>

              <ButtonLink
                href="/about"
                locale={locale}
                variant="secondary"
                className="mt-9"
              >
                {t.home.maisha.cta}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
