import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { AnimatedLine, ImageReveal, ParallaxMedia, Reveal } from "@/components/ui/motion";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { HOME_COORDINATES } from "@/lib/site";

/**
 * "Maisha significa vida" — el bloque editorial que explica la marca.
 *
 * Cambios de esta ronda:
 *
 * - El fondo deja de ser marfil casi blanco y pasa a pergamino con la textura
 *   de papel: dos degradados radiales muy abiertos y un ruido al 2,8 %, todo
 *   en CSS, sin un solo archivo.
 * - Desaparece el hueco reservado al retrato del equipo. Un rectángulo con la
 *   leyenda "foto pendiente" se lee como imagen rota, y el encargo pide
 *   explícitamente que no haya bloques con aspecto de marcador de posición.
 *   La fotografía del elefante pasa a ocupar toda la columna, que es lo que
 *   pedía de todos modos. Cuando lleguen los retratos reales del equipo van a
 *   su sección, no aquí.
 * - "Maisha" aparece de fondo en grande, recortado por el borde y al 4 % de
 *   opacidad: da profundidad sin convertirse en un elemento más que leer.
 *   Es marca, así que no se traduce, y va oculto a lectores de pantalla.
 */
export function MaishaMeaning({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="texture-paper relative isolate overflow-hidden bg-page py-12 sm:py-20">
      {/* Marca de agua tipográfica. Decorativa: `aria-hidden`. */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -left-[0.08em] top-1/2 -z-10 -translate-y-1/2 text-[26vw] leading-none text-forest/[0.045] select-none lg:text-[20vw]"
      >
        Maisha
      </span>

      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Fotografía: entra por máscara y se mueve muy poco al hacer scroll. */}
          <ImageReveal className="aspect-3/2 lg:col-span-6 lg:aspect-square">
            <ParallaxMedia strength={22} className="absolute -inset-y-8 inset-x-0">
              <Photo
                photo={CLIENT_PHOTOS["african-elephant-portrait"]}
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </ParallaxMedia>
          </ImageReveal>

          {/* Texto */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <CompassMark className="size-6 text-[var(--gold)]" />
                <span className="tnum text-[0.66rem] tracking-[0.2em] text-ink-faint uppercase">
                  {HOME_COORDINATES.label}
                </span>
              </div>
              <p className="eyebrow mt-5 text-terracotta-text">
                {t.home.maisha.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              {/* "Maisha" es la marca: se queda en suajili en los seis idiomas
                  y solo se traduce lo que la acompaña. */}
              <h2 className="text-h1 mt-4 text-forest">
                <span className="italic">&lsquo;Maisha&rsquo;</span>{" "}
                {t.home.maisha.meansLife}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-lede measure mt-6 text-ink-soft">
                {t.home.maisha.lede}
              </p>
            </Reveal>

            <AnimatedLine tone="gold" className="my-8 max-w-[14rem]" delay={0.24} />

            <Reveal delay={0.28}>
              <p className="measure text-[0.98rem] leading-relaxed text-ink-soft">
                {t.home.maisha.body}
              </p>
              <ButtonLink
                href="/about"
                locale={locale}
                variant="secondary"
                className="mt-8"
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
