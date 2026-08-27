import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JourneyPlanner } from "@/components/planner/JourneyPlanner";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { getDestinations } from "@/lib/content";
import { COMPANY } from "@/lib/site";

/**
 * "Let's design your journey" — el planificador, embebido en la home.
 *
 * Es el final del recorrido de la página: inspiración arriba, decisión aquí.
 * Se monta completo en lugar de enlazar a otra página porque el momento de
 * mayor intención es justo después de haber visto los viajes, el mapa y al
 * equipo, y cada clic intermedio pierde solicitudes.
 */
export async function PlannerSection() {
  const destinations = await getDestinations();

  return (
    <section id="plan" className="bg-page-alt py-24 sm:py-32">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Plan your journey"
              title="Let’s design your journey"
              lede="Seven short steps. No obligation, no automated quote — a person in Arusha reads every one of these and replies with a route."
            />

            <Reveal className="mt-10 hidden lg:block">
              <div className="relative aspect-3/4 overflow-hidden">
                <Photo
                  photo={CLIENT_PHOTOS["flamingo-flock-in-motion"]}
                  alt=""
                  sizes="(max-width: 1024px) 0px, 28vw"
                />
              </div>
            </Reveal>

            <Reveal className="mt-8">
              <p className="eyebrow text-ink-faint">Rather just talk?</p>
              <a
                href={COMPANY.phoneHref}
                className="font-display mt-2 block text-[1.45rem] text-forest transition-colors duration-300 hover:text-terracotta"
              >
                {COMPANY.phone}
              </a>
              <p className="mt-1.5 text-[0.85rem] text-ink-faint">
                {COMPANY.hours.label} · {COMPANY.hours.timezone}
              </p>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-8">
            <JourneyPlanner
              destinations={destinations.map((destination) => ({
                slug: destination.slug,
                name: destination.name,
                region: destination.region,
              }))}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
