import type { Metadata } from "next";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Collections } from "@/components/home/Collections";
import { DestinationMap } from "@/components/home/DestinationMap";
import { ExperienceSelector } from "@/components/home/ExperienceSelector";
import { FeaturedJourneys } from "@/components/home/FeaturedJourneys";
import { Hero } from "@/components/home/Hero";
import { Impact } from "@/components/home/Impact";
import { MaishaMeaning } from "@/components/home/MaishaMeaning";
import { PlannerSection } from "@/components/home/PlannerSection";
import { Team } from "@/components/home/Team";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoStory } from "@/components/home/VideoStory";
import { WhyMaisha } from "@/components/home/WhyMaisha";

export const metadata: Metadata = {
  title: "Private safaris in Tanzania · Maisha Quest",
  description:
    "Private journeys through Tanzania, guided by local experts and designed around your story. Serengeti, Ngorongoro, Tarangire, Kilimanjaro and Zanzibar, planned from Arusha.",
  alternates: { canonical: "/" },
};

/**
 * Home.
 *
 * El orden es un recorrido, no un catálogo: quién somos → cómo quieres viajar
 * → qué ofrecemos → dónde → cómo se siente → por qué nosotros → quiénes somos
 * → qué dejamos atrás → qué dicen → empecemos.
 *
 * Todas las secciones son componentes de servidor salvo las tres que
 * necesitan estado (mapa, carrusel y planificador). El JavaScript que llega al
 * navegador es solo el de esas tres.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MaishaMeaning />
      <ExperienceSelector />
      <Collections />
      <FeaturedJourneys />
      <DestinationMap />
      <VideoStory />
      <WhyMaisha />
      <Team />
      <Impact />
      <Testimonials />
      <PlannerSection />
      <ClosingCTA />
    </>
  );
}
