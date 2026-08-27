import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "The team",
  description:
    "Talisa Tufts, Frank Lyatuu and Tina Ngabo — the founders behind Maisha Quest, based in Arusha, Tanzania.",
  alternates: { canonical: "/about/team" },
};

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="The team"
        title="The people behind your journey"
        lede="Three founders in Arusha. Between them they cover journey design, safari operations and everything you feel once you are on the ground."
        image={PHOTOS["kilimanjaro-shira"]}
      />

      <div className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <ul className="flex flex-col gap-16 sm:gap-20">
            {team.map((member, index) => (
              <li key={member.slug}>
                <Reveal>
                  <article className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
                    <div
                      className={`relative aspect-4/5 overflow-hidden lg:col-span-4 ${
                        index % 2 === 1 ? "lg:order-2 lg:col-start-9" : ""
                      }`}
                    >
                      <MediaFrame
                        media={member.portrait}
                        label={`Portrait of ${member.name}`}
                        sizes="(max-width: 1024px) 100vw, 30vw"
                      />
                    </div>

                    <div
                      className={`lg:col-span-7 ${
                        index % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-6"
                      }`}
                    >
                      <p className="eyebrow text-terracotta">{member.role}</p>
                      <h2 className="text-h2 mt-3 text-forest">{member.name}</h2>
                      <p className="text-lede measure mt-5 text-ink-soft">
                        {member.bio}
                      </p>

                      <dl className="mt-8 grid gap-x-10 gap-y-5 border-t border-rule pt-6 sm:grid-cols-2">
                        <div>
                          <dt className="eyebrow text-ink-faint">Languages</dt>
                          <dd className="mt-1.5 text-[0.95rem] text-forest">
                            {member.languages.join(" · ")}
                          </dd>
                        </div>
                        <div>
                          <dt className="eyebrow text-ink-faint">Specialty</dt>
                          <dd className="mt-1.5 text-[0.95rem] text-forest">
                            {member.specialty}
                          </dd>
                        </div>
                        {member.favouritePlace && (
                          <div className="sm:col-span-2">
                            <dt className="eyebrow text-ink-faint">
                              Favourite place in Tanzania
                            </dt>
                            <dd className="mt-1.5 text-[0.95rem] text-forest">
                              {member.favouritePlace}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-20 border-t border-rule pt-12">
            <h2 className="text-h2 text-forest">Guides, drivers and crew</h2>
            <p className="measure mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
              Every journey is run by Tanzanian guides and drivers we work with
              directly. On Kilimanjaro, porter pay and load limits follow KPAP
              guidelines. Profiles of the wider team will be published here.
            </p>
            <ButtonLink href="/plan" variant="primary" className="mt-8">
              Start planning
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
