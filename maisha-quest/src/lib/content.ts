/**
 * Capa de acceso a datos.
 *
 * Todo componente pide el contenido AQUÍ, nunca importando `src/data/*`
 * directamente. Hoy las funciones leen datos locales; el día que exista
 * Supabase o un CMS solo cambia el cuerpo de estas funciones — son `async`
 * desde el principio precisamente para que ese cambio no toque ni un
 * componente.
 *
 * Además centraliza las comprobaciones de coherencia: si un safari declara
 * 7 días y trae un itinerario de 6, o apunta a un destino que no existe, la
 * compilación falla. Es la respuesta directa al problema de la web actual, en
 * la que nombres, rutas y duraciones se contradicen entre páginas.
 */

import { COLLECTIONS, COLLECTIONS_BY_ID } from "@/data/collections";
import { DESTINATIONS, DESTINATIONS_BY_SLUG } from "@/data/destinations";
import {
  EXPERIENCES,
  EXPERIENCES_BY_SLUG,
  EXPERIENCE_CATEGORIES,
} from "@/data/experiences";
import { FAQS, FAQS_BY_SLUG } from "@/data/faq";
import { IMPACT_INTRO, IMPACT_PROJECTS, IMPACT_VIDEO } from "@/data/impact";
import { JOURNAL_BY_SLUG, JOURNAL_POSTS } from "@/data/journal";
import { SAFARIS } from "@/data/safaris";
import { TEAM, TEAM_BY_SLUG } from "@/data/team";
import { REVIEW_SOURCES, TESTIMONIALS } from "@/data/testimonials";
import type {
  Collection,
  CollectionId,
  Destination,
  Experience,
  FAQ,
  JournalPost,
  Safari,
  Slug,
  TeamMember,
  Testimonial,
} from "@/types/content";

/* -------------------------------------------------------------------------
 * Comprobaciones de coherencia (se ejecutan al importar, en build)
 * ---------------------------------------------------------------------- */

function assertContentIsConsistent() {
  const problems: string[] = [];
  const safariSlugs = new Set(SAFARIS.map((s) => s.slug));

  for (const safari of SAFARIS) {
    if (safari.itinerary.length > 0 && safari.itinerary.length !== safari.durationDays) {
      problems.push(
        `"${safari.slug}": declara ${safari.durationDays} días pero el itinerario tiene ${safari.itinerary.length}.`,
      );
    }
    safari.itinerary.forEach((day, index) => {
      if (day.day !== index + 1) {
        problems.push(`"${safari.slug}": el día ${index + 1} está numerado como ${day.day}.`);
      }
    });
    for (const slug of safari.routeDestinationSlugs) {
      if (!DESTINATIONS_BY_SLUG.has(slug)) {
        problems.push(`"${safari.slug}": ruta hacia un destino inexistente "${slug}".`);
      }
    }
    for (const slug of safari.relatedSafariSlugs ?? []) {
      if (!safariSlugs.has(slug)) {
        problems.push(`"${safari.slug}": safari relacionado inexistente "${slug}".`);
      }
    }
    for (const slug of safari.faqSlugs ?? []) {
      if (!FAQS_BY_SLUG.has(slug)) {
        problems.push(`"${safari.slug}": FAQ inexistente "${slug}".`);
      }
    }
    if (!COLLECTIONS_BY_ID.has(safari.collection)) {
      problems.push(`"${safari.slug}": colección inexistente "${safari.collection}".`);
    }
    if (safari.price.fromPerPerson !== null && safari.price.fromPerPerson <= 0) {
      problems.push(`"${safari.slug}": precio no válido.`);
    }
  }

  for (const destination of DESTINATIONS) {
    for (const slug of destination.experienceSlugs) {
      if (!EXPERIENCES_BY_SLUG.has(slug)) {
        problems.push(`Destino "${destination.slug}": experiencia inexistente "${slug}".`);
      }
    }
  }

  for (const experience of EXPERIENCES) {
    for (const slug of experience.destinationSlugs) {
      if (!DESTINATIONS_BY_SLUG.has(slug)) {
        problems.push(`Experiencia "${experience.slug}": destino inexistente "${slug}".`);
      }
    }
  }

  for (const category of EXPERIENCE_CATEGORIES) {
    if (!EXPERIENCES_BY_SLUG.has(category.leadExperienceSlug)) {
      problems.push(`Categoría "${category.id}": experiencia guía inexistente.`);
    }
  }

  for (const testimonial of TESTIMONIALS) {
    if (testimonial.safariSlug && !safariSlugs.has(testimonial.safariSlug)) {
      problems.push(`Testimonio "${testimonial.id}": safari inexistente.`);
    }
  }

  if (problems.length > 0) {
    throw new Error(
      "Contenido incoherente en src/data:\n  - " + problems.join("\n  - "),
    );
  }
}

assertContentIsConsistent();

/* -------------------------------------------------------------------------
 * Safaris
 * ---------------------------------------------------------------------- */

export async function getSafaris(): Promise<Safari[]> {
  return SAFARIS;
}

export async function getFeaturedSafaris(limit = 3): Promise<Safari[]> {
  return SAFARIS.filter((safari) => safari.featured).slice(0, limit);
}

export async function getSafariBySlug(slug: Slug): Promise<Safari | undefined> {
  return SAFARIS.find((safari) => safari.slug === slug);
}

export async function getSafarisByCollection(id: CollectionId): Promise<Safari[]> {
  return SAFARIS.filter((safari) => safari.collection === id);
}

export async function getSafarisByDestination(slug: Slug): Promise<Safari[]> {
  return SAFARIS.filter((safari) => safari.routeDestinationSlugs.includes(slug));
}

/** Ruta legible del safari: "Arusha · Tarangire · Serengeti · Ngorongoro". */
export function formatRoute(safari: Safari): string {
  return safari.routeDestinationSlugs
    .map((slug) => DESTINATIONS_BY_SLUG.get(slug)?.name ?? slug)
    .join(" · ");
}

/** Línea de resumen bajo el nombre: "Private safari · Lodge accommodation". */
export function formatSafariMeta(safari: Safari): string {
  return `Private safari · ${safari.accommodationStyle} accommodation`;
}

/** Precio formateado, o `null` si todavía no hay tarifa real que mostrar. */
export function formatPrice(safari: Safari): string | null {
  const { fromPerPerson, currency } = safari.price;
  if (fromPerPerson === null) return null;
  return `From ${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(fromPerPerson)} per person`;
}

/* -------------------------------------------------------------------------
 * Colecciones, destinos y experiencias
 * ---------------------------------------------------------------------- */

export async function getCollections(): Promise<Collection[]> {
  return COLLECTIONS;
}

export async function getCollection(id: CollectionId): Promise<Collection | undefined> {
  return COLLECTIONS_BY_ID.get(id);
}

/**
 * Rango de duración real de una colección, calculado desde sus safaris.
 * Si aún no tiene ninguno, cae en el rango declarado — así la tarjeta nunca
 * anuncia "7–12 días" mientras los viajes publicados dicen otra cosa.
 */
export function collectionDurationRange(
  collection: Collection,
): [number, number] {
  const durations = SAFARIS.filter((s) => s.collection === collection.id).map(
    (s) => s.durationDays,
  );
  if (durations.length === 0) return collection.typicalDurationDays;
  return [Math.min(...durations), Math.max(...durations)];
}

export function formatDurationRange([min, max]: [number, number]): string {
  return min === max ? `${min} days` : `${min}–${max} days`;
}

export async function getDestinations(): Promise<Destination[]> {
  return DESTINATIONS;
}

export async function getDestination(slug: Slug): Promise<Destination | undefined> {
  return DESTINATIONS_BY_SLUG.get(slug);
}

export async function getExperiences(): Promise<Experience[]> {
  return EXPERIENCES;
}

export async function getExperience(slug: Slug): Promise<Experience | undefined> {
  return EXPERIENCES_BY_SLUG.get(slug);
}

export function getExperienceForDestination(slug: Slug): Experience[] {
  const destination = DESTINATIONS_BY_SLUG.get(slug);
  if (!destination) return [];
  return destination.experienceSlugs
    .map((s) => EXPERIENCES_BY_SLUG.get(s))
    .filter((e): e is Experience => Boolean(e));
}

/** Las ocho tarjetas del selector de experiencia de la home. */
export async function getExperienceCategories(): Promise<
  { id: string; label: string; experience: Experience }[]
> {
  return EXPERIENCE_CATEGORIES.map((category) => {
    const experience = EXPERIENCES_BY_SLUG.get(category.leadExperienceSlug);
    if (!experience) throw new Error(`Categoría sin experiencia: ${category.id}`);
    return { id: category.id, label: category.label, experience };
  });
}

/* -------------------------------------------------------------------------
 * Personas, impacto, opiniones y journal
 * ---------------------------------------------------------------------- */

export async function getTeam(): Promise<TeamMember[]> {
  return TEAM;
}

export async function getTeamMember(slug: Slug): Promise<TeamMember | undefined> {
  return TEAM_BY_SLUG.get(slug);
}

export async function getImpact() {
  return { intro: IMPACT_INTRO, projects: IMPACT_PROJECTS, video: IMPACT_VIDEO };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

export function getReviewSources() {
  return REVIEW_SOURCES;
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  return [...JOURNAL_POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getJournalPost(slug: Slug): Promise<JournalPost | undefined> {
  return JOURNAL_BY_SLUG.get(slug);
}

export async function getFaqs(): Promise<FAQ[]> {
  return FAQS;
}

export async function getFaqsBySlugs(slugs: Slug[]): Promise<FAQ[]> {
  return slugs.map((slug) => FAQS_BY_SLUG.get(slug)).filter((f): f is FAQ => Boolean(f));
}
