import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { JourneyPlanner } from "@/components/planner/JourneyPlanner";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { getDestinations, getSafariBySlug } from "@/lib/content";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan your journey",
  description:
    "Tell us roughly when you want to travel and what matters to you. Our team in Arusha will come back with a route built for you — no automated quote.",
  alternates: { canonical: "/plan" },
};

const STEPS_EXPLAINED = [
  {
    title: "You tell us the shape of it",
    body: "Seven short steps: when, how long, who is travelling and what you want out of it.",
  },
  {
    title: "We come back with a route",
    body: "A proposed itinerary with an honest view of what it costs and what it involves — written by a person, not generated.",
  },
  {
    title: "We change it until it fits",
    body: "As many rounds as you need. Nothing is confirmed or paid until you are happy with it.",
  },
];

/**
 * Página del planificador.
 *
 * Acepta `?safari=slug` desde el botón "Customize" de cualquier tarjeta: llega
 * con los destinos de ese viaje ya marcados y una nota de partida, para que
 * personalizar un viaje no signifique empezar de cero.
 */
export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<{ safari?: string }>;
}) {
  const [{ safari: safariSlug }, destinations] = await Promise.all([
    searchParams,
    getDestinations(),
  ]);

  const safari = safariSlug ? await getSafariBySlug(safariSlug) : undefined;

  return (
    <>
      <PageHero
        eyebrow="Plan your journey"
        title={safari ? `Customize: ${safari.name}` : "Let’s design your journey"}
        lede={
          safari
            ? "We have carried this journey across as a starting point. Change anything — the route, the pace, the length, the style of stay."
            : "No obligation and no automated quote. A person in Arusha reads every enquiry and replies with a route."
        }
      />

      <div className="bg-page py-14 sm:py-16">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ol className="flex flex-col gap-8">
                {STEPS_EXPLAINED.map((step, index) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="tnum eyebrow shrink-0 pt-1 text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="font-display block text-[1.2rem] leading-tight text-forest">
                        {step.title}
                      </span>
                      <span className="mt-2 block text-[0.92rem] leading-relaxed text-ink-soft">
                        {step.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-12 border-t border-rule pt-8">
                <CompassMark className="size-7 text-gold" needle={false} />
                <p className="eyebrow mt-4 text-ink-faint">Rather just talk?</p>
                <a
                  href={COMPANY.phoneHref}
                  className="font-display mt-2 block text-[1.35rem] text-forest transition-colors duration-300 hover:text-terracotta"
                >
                  {COMPANY.phone}
                </a>
                <a
                  href={COMPANY.emailHref}
                  className="mt-1 block text-[0.95rem] text-ink-soft transition-colors duration-300 hover:text-terracotta"
                >
                  {COMPANY.email}
                </a>
                <p className="mt-3 text-[0.85rem] text-ink-faint">
                  {COMPANY.hours.label}
                  <br />
                  {COMPANY.hours.timezone}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <JourneyPlanner
                destinations={destinations.map((destination) => ({
                  slug: destination.slug,
                  name: destination.name,
                  region: destination.region,
                }))}
                initialSafari={
                  safari
                    ? {
                        slug: safari.slug,
                        name: safari.name,
                        destinationSlugs: safari.routeDestinationSlugs,
                      }
                    : null
                }
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
