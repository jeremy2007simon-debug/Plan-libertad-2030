import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { EXPERIENCE_CATEGORIES } from "@/data/experiences";
import { getExperiences } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Game drives, walking safaris, the Great Migration, balloon flights, Kilimanjaro, culture, cuisine and the Indian Ocean — the ways to spend a day in Tanzania.",
  alternates: { canonical: "/experiences" },
};

const CATEGORY_LABELS = new Map(
  EXPERIENCE_CATEGORIES.map((category) => [category.id, category.label]),
);

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="One country. Endless ways to feel alive."
        lede="A safari is not only game drives. These are the ways a day in Tanzania can be spent — mix as many as you like into one journey."
        image={CLIENT_PHOTOS["male-lions-together"]}
      />

      <div className="bg-page py-20 sm:py-24">
        <Container width="wide">
          <Reveal>
            <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {experiences.map((experience) => (
                <li key={experience.slug}>
                  <Link href={`/experiences/${experience.slug}`} className="group block">
                    <div className="relative aspect-3/2 overflow-hidden">
                      <Photo
                        photo={experience.image}
                        alt=""
                        sizes="(max-width: 768px) 100vw, 32vw"
                        className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <p className="eyebrow mt-5 text-terracotta">
                      {CATEGORY_LABELS.get(experience.category) ?? experience.category}
                    </p>
                    <h2 className="font-display mt-2 text-[1.45rem] leading-tight text-forest transition-colors duration-300 group-hover:text-terracotta">
                      {experience.name}
                    </h2>
                    <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-soft">
                      {experience.shortDescription}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
