import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CompassDivider } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { ImageSlot, Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";
import { COMPANY, TRUST_PILLARS } from "@/lib/site";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Maisha Quest is a Tanzanian safari company based in Arusha. Maisha means life — we build private journeys around who you are and how you want to travel.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Guided by Tanzania. Designed around you."
        lede="Maisha Quest was founded in Arusha, at the foot of Mount Meru. We are a small local team building private journeys for travellers who want more than a fixed departure."
        image={PHOTOS.arusha}
      />

      <section className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-h2 text-forest">
                  <span className="italic">&lsquo;Maisha&rsquo;</span> means life.
                </h2>
                <p className="text-lede measure mt-6 text-ink-soft">
                  Maisha Quest translates roughly as the journey of life — and
                  that is the whole idea. A safari is not a product you buy off a
                  shelf; it is a stretch of your life spent somewhere
                  extraordinary, and it should be built accordingly.
                </p>

                <CompassDivider className="my-9 max-w-sm" />

                <p className="measure text-[0.98rem] leading-relaxed text-ink-soft">
                  Our founders describe the idea as living life by a compass —
                  choosing a direction rather than following a fixed route. It is
                  how we plan: we start from where you want to end up, not from a
                  catalogue of packages.
                </p>
                <p className="measure mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
                  Everything is arranged from Arusha, on the ground. Our guides,
                  vehicles and suppliers are Tanzanian, and the people who answer
                  your first email are the people who meet you at the airport.
                </p>

                <ButtonLink href="/about/team" variant="secondary" className="mt-9">
                  Meet the team
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-4/5 overflow-hidden">
                {/* Hueco declarado: la foto del equipo es material propio y
                    todavía no existe. Una imagen de stock aquí sería falsa. */}
                <ImageSlot label="The Maisha Quest founders in Arusha" />
              </div>
              <div className="relative mt-3 aspect-3/2 overflow-hidden">
                <Photo
                  photo={PHOTOS["serengeti-sunrise"]}
                  alt=""
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="dark-section bg-forest py-20 text-on-dark sm:py-24">
        <Container width="wide">
          <h2 className="text-h2 text-ivory">How we work</h2>
          <ul className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_PILLARS.map((pillar) => (
              <li key={pillar.title}>
                <h3 className="font-display text-[1.3rem] text-ivory">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-on-dark-soft">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-page-alt py-20">
        <Container width="wide">
          <h2 className="text-h2 text-forest">The people</h2>
          <ul className="mt-10 flex flex-col divide-y divide-rule border-y border-rule">
            {team.map((member) => (
              <li
                key={member.slug}
                className="flex flex-wrap items-baseline gap-x-8 gap-y-2 py-5"
              >
                <span className="font-display w-48 text-[1.35rem] text-forest">
                  {member.name}
                </span>
                <span className="eyebrow w-56 text-terracotta">{member.role}</span>
                <span className="flex-1 text-[0.9rem] text-ink-soft">
                  {member.languages.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about/team" variant="quiet" className="mt-8">
            Read their stories
          </ButtonLink>
        </Container>
      </section>

      <section className="bg-page py-20">
        <Container width="prose">
          <h2 className="text-h2 text-forest">Talk to us</h2>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
            We are in Arusha, {COMPANY.hours.timezone}, {COMPANY.hours.label}. The
            fastest way to start is to tell us roughly when you want to travel and
            what matters to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/plan" variant="primary">
              Plan your journey
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact details
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
