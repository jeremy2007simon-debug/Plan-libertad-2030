import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PHOTOS } from "@/data/photography";
import { COMPANY } from "@/lib/site";

/** Cierre cinematográfico: atardecer real del Serengeti y las dos decisiones posibles. */
export function ClosingCTA() {
  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <Photo
          photo={PHOTOS["serengeti-sunset-wide"]}
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
          <h2 className="text-display mt-7 text-ivory">
            Your story in Tanzania starts here.
          </h2>
          <p className="text-lede measure mt-5 text-ivory/85">
            {COMPANY.concept}
          </p>

          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            <ButtonLink href="/plan" variant="primary" size="lg">
              Plan My Safari
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" tone="dark" size="lg">
              Speak to a Local Expert
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
