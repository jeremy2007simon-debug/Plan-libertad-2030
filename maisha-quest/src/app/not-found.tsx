import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";

/** 404 con la brújula: perderse forma parte del viaje, pero hay salida. */
export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-page pt-[var(--header-h)]">
      <Container width="prose" className="py-20 text-center">
        <CompassMark className="mx-auto size-14 text-gold" />
        <h1 className="text-h1 mt-8 text-forest">Off the map</h1>
        <p className="text-lede mx-auto mt-5 max-w-lg text-ink-soft">
          This page does not exist — or it moved when we rebuilt the site. Try
          one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/safaris" variant="primary">
            All safaris
          </ButtonLink>
          <ButtonLink href="/destinations" variant="secondary">
            Destinations
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
