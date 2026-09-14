import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Collections } from "@/components/home/Collections";
import { FeaturedJourneys } from "@/components/home/FeaturedJourneys";
import { Hero } from "@/components/home/Hero";
import { Impact } from "@/components/home/Impact";
import { MaishaMeaning } from "@/components/home/MaishaMeaning";
import { PlannerSection } from "@/components/home/PlannerSection";
import { Team } from "@/components/home/Team";
import { Testimonials } from "@/components/home/Testimonials";
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
 * El recorrido editorial pedido, sin desvíos: portada y propuesta de valor →
 * quiénes somos, en dos frases → cómo quieres viajar (Explorer/Escape/Enrich)
 * → los viajes oficiales destacados → equipo e impacto real → planificar.
 *
 * Tres secciones que vivían aquí se han trasladado a la página interior donde
 * de verdad completan algo, en vez de repetirlo:
 *  · `ExperienceExplorer` y `VideoStory` → `/experiences`, delante de su
 *    propio listado completo de experiencias (mismo contenido, sin la
 *    competencia de imágenes con `FeaturedJourneys` que tenían aquí).
 *  · `DestinationMap` → `/destinations`, delante de su propio listado por
 *    región.
 *  · `WhyMaisha` se retira sin trasladar nada: sus seis motivos
 *    (`t.home.why.pillars`) ya se pintan en `/about`, en la sección «Cómo
 *    trabajamos» — mantenerlo aquí era el mismo texto dos veces, no contenido
 *    nuevo.
 *
 * Todas las secciones son componentes de servidor salvo las que necesitan
 * estado (carrusel de Experiencias en la página de experiencias, mapa en la
 * de destinos, el planificador aquí, y el botón de reproducción del hero,
 * cuyo overlay de vídeo no toca el documento hasta el primer clic — ver
 * `HeroFilmButton`).
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
      <Hero locale={locale} t={t} />
      <MaishaMeaning locale={locale} t={t} />
      <Collections locale={locale} t={t} />
      <FeaturedJourneys locale={locale} t={t} />
      <Team locale={locale} t={t} />
      <Impact locale={locale} t={t} />
      <Testimonials locale={locale} t={t} />
      <PlannerSection locale={locale} t={t} />
      <ClosingCTA locale={locale} t={t} />
    </>
  );
}
