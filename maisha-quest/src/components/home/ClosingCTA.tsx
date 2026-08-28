import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { ParallaxMedia, Reveal } from "@/components/ui/motion";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";

/**
 * Cierre cinematográfico: el atardecer con la acacia (`image-X4-16.jpg`) y las
 * dos decisiones posibles.
 *
 * No repite la animación del hero. Allí hay un zoom largo de 22 s; aquí, un
 * paralaje muy corto al hacer scroll y una entrada del texto por líneas, con
 * la fotografía quieta. Dos cierres con el mismo movimiento se leerían como un
 * error de montaje.
 *
 * El degradado inferior lleva al Dark Canopy del footer, para que la
 * fotografía no termine en un corte recto contra él.
 */
export function ClosingCTA({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="relative isolate flex min-h-[66svh] items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <ParallaxMedia strength={26} className="absolute -inset-y-10 inset-x-0">
          <Photo
            photo={CLIENT_PHOTOS["savannah-acacia-sunset"]}
            alt=""
            sizes="100vw"
            className="scale-105"
          />
        </ParallaxMedia>
        <div className="media-scrim-side absolute inset-0" />
        <div className="grain absolute inset-0" />
        {/* Salida hacia el footer. */}
        <div className="fade-to-canopy absolute inset-0" />
      </div>

      <Container width="wide" className="py-10 sm:py-14">
        <div className="max-w-2xl">
          <Reveal from="none">
            <CompassMark className="size-9 text-sand" />
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-display mt-6 text-parchment">
              {t.home.closing.title}
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-lede measure mt-5 text-parchment">
              {t.home.closing.concept}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex flex-wrap gap-3 sm:gap-4">
            <ButtonLink href="/plan" locale={locale} variant="primary" size="lg">
              {t.nav.planShort}
            </ButtonLink>
            <ButtonLink
              href="/contact"
              locale={locale}
              variant="secondary"
              tone="dark"
              size="lg"
            >
              {t.nav.speakToExpert}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
