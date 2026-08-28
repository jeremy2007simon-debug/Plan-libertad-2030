import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MediaFrame, PersonSlot } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/motion";
import { PHOTOS } from "@/data/photography";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { getTeam } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/about/team",
    title: t.meta.team.title,
    description: t.meta.team.description,
  });
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const team = await getTeam(locale);

  return (
    <>
      <PageHero
        eyebrow={t.nav.items.team}
        title={t.team.pageTitle}
        lede={t.home.team.lede}
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
                      className={`relative overflow-hidden lg:col-span-4 ${
                        member.portrait.src ? "aspect-4/5" : "aspect-square"
                      } ${index % 2 === 1 ? "lg:order-2 lg:col-start-9" : ""}`}
                    >
                      {member.portrait.src ? (
                        <MediaFrame
                          media={member.portrait}
                          label={t.team.portraitOf(member.name)}
                          sizes="(max-width: 1024px) 100vw, 30vw"
                        />
                      ) : (
                        <PersonSlot name={member.name} />
                      )}
                    </div>

                    <div
                      className={`lg:col-span-7 ${
                        index % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-6"
                      }`}
                    >
                      <p className="eyebrow text-terracotta-text">{member.role}</p>
                      <h2 className="text-h2 mt-3 text-forest">{member.name}</h2>
                      <p className="text-lede measure mt-5 text-ink-soft">
                        {member.bio}
                      </p>

                      <dl className="mt-8 grid gap-x-10 gap-y-5 border-t border-rule pt-6 sm:grid-cols-2">
                        <div>
                          <dt className="eyebrow text-ink-faint">{t.team.languages}</dt>
                          <dd className="mt-1.5 text-[0.95rem] text-forest">
                            {member.languages
                              .map(
                                (code) =>
                                  t.languageNames[
                                    code as keyof typeof t.languageNames
                                  ],
                              )
                              .join(" · ")}
                          </dd>
                        </div>
                        <div>
                          <dt className="eyebrow text-ink-faint">{t.team.specialty}</dt>
                          <dd className="mt-1.5 text-[0.95rem] text-forest">
                            {member.specialty}
                          </dd>
                        </div>
                        {member.favouritePlace && (
                          <div className="sm:col-span-2">
                            <dt className="eyebrow text-ink-faint">
                              {t.team.favouritePlace}
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
            <h2 className="text-h2 text-forest">{t.team.crewTitle}</h2>
            <p className="measure mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
              {t.team.crewBody}
            </p>
            <ButtonLink
              href="/plan"
              locale={locale}
              variant="primary"
              className="mt-8"
            >
              {t.team.startPlanning}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </>
  );
}
