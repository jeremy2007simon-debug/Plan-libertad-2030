import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SafariCard } from "@/components/safari/SafariCard";
import { getFeaturedSafaris } from "@/lib/content";

/** "Journeys worth remembering" — los viajes destacados de la home. */
export async function FeaturedJourneys() {
  const safaris = await getFeaturedSafaris(3);
  if (safaris.length === 0) return null;

  return (
    <section className="bg-page py-24 sm:py-32">
      <Container width="wide">
        <SectionHeading
          eyebrow="Featured journeys"
          title="Journeys worth remembering"
          lede="Starting points, not fixed departures. Every one of these is rebuilt around your dates, your pace and the people you are travelling with."
        >
          <ButtonLink href="/safaris" variant="secondary">
            All safaris
          </ButtonLink>
        </SectionHeading>

        <Reveal className="mt-14">
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {safaris.map((safari, index) => (
              <li key={safari.slug} className="flex">
                <SafariCard safari={safari} priority={index === 0} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
