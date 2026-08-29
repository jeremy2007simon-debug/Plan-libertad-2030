import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Intro, IntroScript } from "@/components/intro/Intro";
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
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

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
    path: "/",
    title: t.meta.home.title,
    description: t.meta.home.description,
  });
}

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
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      {/* Capa de apertura. Sale en el HTML del servidor pero solo se ve si el
          guardián del <head> ha puesto `data-intro`. */}
      <Intro t={t.a11y} />
      <Hero locale={locale} t={t} />
      <MaishaMeaning locale={locale} t={t} />
      <ExperienceSelector locale={locale} t={t} />
      <Collections locale={locale} t={t} />
      <FeaturedJourneys locale={locale} t={t} />
      <DestinationMap locale={locale} t={t} />
      <VideoStory locale={locale} t={t} />
      <WhyMaisha locale={locale} t={t} />
      <Team locale={locale} t={t} />
      <Impact locale={locale} t={t} />
      <Testimonials locale={locale} t={t} />
      <PlannerSection locale={locale} t={t} />
      <ClosingCTA locale={locale} t={t} />
      <IntroScript />
    </>
  );
}
