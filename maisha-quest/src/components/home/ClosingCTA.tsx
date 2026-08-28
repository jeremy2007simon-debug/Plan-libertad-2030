import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";

/** Cierre cinematográfico: atardecer real del Serengeti y las dos decisiones posibles. */
export function ClosingCTA({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <Photo
          photo={CLIENT_PHOTOS["savannah-acacia-sunset"]}
          alt=""
          sizes="100vw"
          className="scale-105"
        />
        <div className="media-scrim absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

      <Container width="wide" className="py-24 sm:py-28">
        <div className="max-w-2xl">
          <CompassMark className="size-9 text-sand" />
          <h2 className="text-display mt-7 text-ivory">{t.home.closing.title}</h2>
          <p className="text-lede measure mt-5 text-ivory/85">
            {t.home.closing.concept}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
