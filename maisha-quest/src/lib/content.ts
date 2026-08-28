/**
 * Capa de acceso a datos.
 *
 * Todo componente pide el contenido AQUÍ, nunca importando `src/data/*`
 * directamente. Cada función recibe el idioma y devuelve el objeto ya
 * compuesto: estructura compartida (`src/data/structure/`) más el texto del
 * idioma (`src/i18n/content/<idioma>.ts`). El día que exista un CMS solo
 * cambia el cuerpo de estas funciones — son `async` desde el principio
 * precisamente para eso.
 *
 * Centraliza además dos comprobaciones que se ejecutan al importar, es decir,
 * en tiempo de compilación:
 *
 *   1. Coherencia estructural: si un safari declara 7 días y trae 6, o apunta
 *      a un destino que no existe, el build falla.
 *   2. Completitud de traducciones: si a un idioma le falta un safari, una
 *      FAQ o un día de itinerario, el build falla. No hay fallback silencioso
 *      al inglés — un texto en inglés dentro de la versión rusa es un error,
 *      no un detalle que se descubre en producción.
 */

import { COLLECTION_STRUCTURE } from "@/data/structure/collections";
import { DESTINATION_STRUCTURE } from "@/data/structure/destinations";
import {
  EXPERIENCE_CATEGORIES,
  EXPERIENCE_STRUCTURE,
} from "@/data/structure/experiences";
import { FAQ_STRUCTURE } from "@/data/structure/faq";
import { IMPACT_STRUCTURE } from "@/data/structure/impact";
import { JOURNAL_STRUCTURE } from "@/data/structure/journal";
import { SAFARI_STRUCTURE } from "@/data/structure/safaris";
import { TEAM_STRUCTURE } from "@/data/structure/team";
import { IMPACT_VIDEO } from "@/data/impact";
import { REVIEW_SOURCES, TESTIMONIALS } from "@/data/testimonials";
import { getContent } from "@/i18n/content";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
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

const SAFARI_BY_SLUG = new Map(SAFARI_STRUCTURE.map((s) => [s.slug, s]));
const DESTINATION_BY_SLUG = new Map(DESTINATION_STRUCTURE.map((d) => [d.slug, d]));
const EXPERIENCE_BY_SLUG = new Map(EXPERIENCE_STRUCTURE.map((e) => [e.slug, e]));
const COLLECTION_BY_ID = new Map(COLLECTION_STRUCTURE.map((c) => [c.id, c]));
const FAQ_BY_SLUG = new Map(FAQ_STRUCTURE.map((f) => [f.slug, f]));
const JOURNAL_BY_SLUG = new Map(JOURNAL_STRUCTURE.map((p) => [p.slug, p]));
const TEAM_BY_SLUG = new Map(TEAM_STRUCTURE.map((m) => [m.slug, m]));

/* -------------------------------------------------------------------------
 * Comprobaciones en tiempo de compilación
 * ---------------------------------------------------------------------- */

function assertContentIsConsistent() {
  const problems: string[] = [];
  const safariSlugs = new Set(SAFARI_STRUCTURE.map((s) => s.slug));

  for (const safari of SAFARI_STRUCTURE) {
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
      if (!DESTINATION_BY_SLUG.has(slug)) {
        problems.push(`"${safari.slug}": ruta hacia un destino inexistente "${slug}".`);
      }
    }
    for (const slug of safari.relatedSafariSlugs ?? []) {
      if (!safariSlugs.has(slug)) {
        problems.push(`"${safari.slug}": safari relacionado inexistente "${slug}".`);
      }
    }
    for (const slug of safari.faqSlugs ?? []) {
      if (!FAQ_BY_SLUG.has(slug)) problems.push(`"${safari.slug}": FAQ inexistente "${slug}".`);
    }
    if (!COLLECTION_BY_ID.has(safari.collection)) {
      problems.push(`"${safari.slug}": colección inexistente "${safari.collection}".`);
    }
    if (safari.price.fromPerPerson !== null && safari.price.fromPerPerson <= 0) {
      problems.push(`"${safari.slug}": precio no válido.`);
    }
  }

  for (const destination of DESTINATION_STRUCTURE) {
    for (const slug of destination.experienceSlugs) {
      if (!EXPERIENCE_BY_SLUG.has(slug)) {
        problems.push(`Destino "${destination.slug}": experiencia inexistente "${slug}".`);
      }
    }
  }

  for (const experience of EXPERIENCE_STRUCTURE) {
    for (const slug of experience.destinationSlugs) {
      if (!DESTINATION_BY_SLUG.has(slug)) {
        problems.push(`Experiencia "${experience.slug}": destino inexistente "${slug}".`);
      }
    }
  }

  for (const category of EXPERIENCE_CATEGORIES) {
    if (!EXPERIENCE_BY_SLUG.has(category.leadExperienceSlug)) {
      problems.push(`Categoría "${category.id}": experiencia guía inexistente.`);
    }
  }

  for (const testimonial of TESTIMONIALS) {
    if (testimonial.safariSlug && !safariSlugs.has(testimonial.safariSlug)) {
      problems.push(`Testimonio "${testimonial.id}": safari inexistente.`);
    }
  }

  if (problems.length > 0) {
    throw new Error("Contenido incoherente en src/data:\n  - " + problems.join("\n  - "));
  }
}

/**
 * Ninguna traducción puede faltar.
 *
 * TypeScript ya obliga a que cada idioma tenga las mismas CLAVES que el
 * inglés, pero no puede saber si un día de itinerario se quedó a medias ni si
 * alguien dejó una cadena vacía. Esto lo comprueba de verdad y revienta el
 * build con el idioma, la sección y la clave exactas.
 */
function assertTranslationsAreComplete() {
  const problems: string[] = [];

  const blank = (value: unknown) =>
    typeof value === "string" && value.trim().length === 0;

  for (const locale of LOCALES) {
    const c = getContent(locale);
    const where = (section: string, key: string) =>
      `[${locale}] ${section} → "${key}"`;

    for (const safari of SAFARI_STRUCTURE) {
      const text = c.safaris[safari.slug as keyof typeof c.safaris];
      if (!text) {
        problems.push(where("safaris", safari.slug) + ": sin traducir.");
        continue;
      }
      if (blank(text.name) || blank(text.summary)) {
        problems.push(where("safaris", safari.slug) + ": nombre o resumen vacío.");
      }
      if (text.days.length !== safari.itinerary.length) {
        problems.push(
          where("safaris", safari.slug) +
            `: ${text.days.length} días traducidos frente a ${safari.itinerary.length} en la estructura.`,
        );
      }
      text.days.forEach((day, i) => {
        if (blank(day.title)) {
          problems.push(where("safaris", safari.slug) + `: día ${i + 1} sin título.`);
        }
        if (day.activities.length === 0) {
          problems.push(where("safaris", safari.slug) + `: día ${i + 1} sin actividades.`);
        }
      });
    }

    for (const destination of DESTINATION_STRUCTURE) {
      const text = c.destinations[destination.slug as keyof typeof c.destinations];
      if (!text) {
        problems.push(where("destinations", destination.slug) + ": sin traducir.");
        continue;
      }
      if (text.seasons.length !== destination.seasonCount) {
        problems.push(
          where("destinations", destination.slug) +
            `: ${text.seasons.length} temporadas traducidas frente a ${destination.seasonCount}.`,
        );
      }
      if (text.wildlife.length === 0) {
        problems.push(where("destinations", destination.slug) + ": sin fauna traducida.");
      }
    }

    for (const experience of EXPERIENCE_STRUCTURE) {
      if (!c.experiences[experience.slug as keyof typeof c.experiences]) {
        problems.push(where("experiences", experience.slug) + ": sin traducir.");
      }
    }
    for (const collection of COLLECTION_STRUCTURE) {
      if (!c.collections[collection.id]) {
        problems.push(where("collections", collection.id) + ": sin traducir.");
      }
    }
    for (const post of JOURNAL_STRUCTURE) {
      if (!c.journal[post.slug as keyof typeof c.journal]) {
        problems.push(where("journal", post.slug) + ": sin traducir.");
      }
    }
    for (const faq of FAQ_STRUCTURE) {
      if (!c.faq[faq.slug as keyof typeof c.faq]) {
        problems.push(where("faq", faq.slug) + ": sin traducir.");
      }
    }
    for (const member of TEAM_STRUCTURE) {
      if (!c.team[member.slug as keyof typeof c.team]) {
        problems.push(where("team", member.slug) + ": sin traducir.");
      }
    }
    for (const project of IMPACT_STRUCTURE) {
      if (!c.impact[project.slug as keyof typeof c.impact]) {
        problems.push(where("impact", project.slug) + ": sin traducir.");
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(
      "Traducciones incompletas:\n  - " +
        problems.join("\n  - ") +
        "\n\nNinguna página puede publicarse a medio traducir.",
    );
  }
}

assertContentIsConsistent();
assertTranslationsAreComplete();

/* -------------------------------------------------------------------------
 * Composición: estructura + texto del idioma
 * ---------------------------------------------------------------------- */

function composeSafari(locale: Locale, slug: Slug): Safari {
  const structure = SAFARI_BY_SLUG.get(slug)!;
  const text = getContent(locale).safaris[slug as keyof ReturnType<typeof getContent>["safaris"]];
  return {
    slug: structure.slug,
    collection: structure.collection,
    durationDays: structure.durationDays,
    routeDestinationSlugs: structure.routeDestinationSlugs,
    accommodationStyle: structure.accommodationStyle,
    price: { fromPerPerson: structure.price.fromPerPerson, currency: "USD" },
    image: structure.image,
    gallery: structure.gallery,
    video: structure.video,
    featured: structure.featured,
    draft: structure.draft,
    faqSlugs: structure.faqSlugs,
    relatedSafariSlugs: structure.relatedSafariSlugs,
    name: text.name,
    summary: text.summary,
    overview: text.overview,
    travellerProfile: text.travellerProfile,
    bestTime: text.bestTime,
    included: text.included,
    notIncluded: text.notIncluded,
    practicalInfo: text.practicalInfo,
    itinerary: structure.itinerary.map((day, i) => ({
      day: day.day,
      accommodationSlug: day.accommodationSlug,
      meals: day.meals,
      images: day.images,
      title: text.days[i].title,
      route: text.days[i].route,
      activities: text.days[i].activities,
      estimatedDuration: text.days[i].estimatedDuration,
    })),
  };
}

function composeDestination(locale: Locale, slug: Slug): Destination {
  const s = DESTINATION_BY_SLUG.get(slug)!;
  const t = getContent(locale).destinations[
    slug as keyof ReturnType<typeof getContent>["destinations"]
  ];
  return { ...s, ...t };
}

function composeExperience(locale: Locale, slug: Slug): Experience {
  const s = EXPERIENCE_BY_SLUG.get(slug)!;
  const t = getContent(locale).experiences[
    slug as keyof ReturnType<typeof getContent>["experiences"]
  ];
  return { ...s, ...t };
}

/* -------------------------------------------------------------------------
 * Safaris
 * ---------------------------------------------------------------------- */

export async function getSafaris(locale: Locale): Promise<Safari[]> {
  return SAFARI_STRUCTURE.map((s) => composeSafari(locale, s.slug));
}

export async function getFeaturedSafaris(locale: Locale, limit = 3): Promise<Safari[]> {
  return SAFARI_STRUCTURE.filter((s) => s.featured)
    .slice(0, limit)
    .map((s) => composeSafari(locale, s.slug));
}

export async function getSafariBySlug(
  locale: Locale,
  slug: Slug,
): Promise<Safari | undefined> {
  return SAFARI_BY_SLUG.has(slug) ? composeSafari(locale, slug) : undefined;
}

export async function getSafarisByCollection(
  locale: Locale,
  id: CollectionId,
): Promise<Safari[]> {
  return SAFARI_STRUCTURE.filter((s) => s.collection === id).map((s) =>
    composeSafari(locale, s.slug),
  );
}

export async function getSafarisByDestination(
  locale: Locale,
  slug: Slug,
): Promise<Safari[]> {
  return SAFARI_STRUCTURE.filter((s) => s.routeDestinationSlugs.includes(slug)).map(
    (s) => composeSafari(locale, s.slug),
  );
}

/** Ruta legible: "Arusha · Tarangire · Serengeti · Ngorongoro", ya traducida. */
export function formatRoute(locale: Locale, safari: Safari): string {
  const names = getContent(locale).destinations;
  return safari.routeDestinationSlugs
    .map((slug) => names[slug as keyof typeof names]?.name ?? slug)
    .join(" · ");
}

/** Precio formateado en la moneda y el formato del idioma, o `null` si no hay tarifa. */
export function formatPrice(locale: Locale, safari: Safari): string | null {
  const { fromPerPerson, currency } = safari.price;
  if (fromPerPerson === null) return null;
  return new Intl.NumberFormat(LOCALE_META[locale].intl, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(fromPerPerson);
}

/* -------------------------------------------------------------------------
 * Colecciones, destinos y experiencias
 * ---------------------------------------------------------------------- */

export async function getCollections(locale: Locale): Promise<Collection[]> {
  return COLLECTION_STRUCTURE.map((c) => composeCollection(locale, c.id));
}

function composeCollection(locale: Locale, id: CollectionId): Collection {
  const s = COLLECTION_BY_ID.get(id)!;
  const t = getContent(locale).collections[id];
  // El nombre de la colección es marca: idéntico en los seis idiomas.
  const name = id.charAt(0).toUpperCase() + id.slice(1);
  return { ...s, ...t, name };
}

export async function getCollection(
  locale: Locale,
  id: CollectionId,
): Promise<Collection | undefined> {
  return COLLECTION_BY_ID.has(id) ? composeCollection(locale, id) : undefined;
}

/**
 * Rango de duración real de una colección, calculado desde sus safaris — así
 * la tarjeta nunca anuncia "7–12 días" mientras los viajes dicen otra cosa.
 */
export function collectionDurationRange(collection: Collection): [number, number] {
  const durations = SAFARI_STRUCTURE.filter((s) => s.collection === collection.id).map(
    (s) => s.durationDays,
  );
  if (durations.length === 0) return collection.typicalDurationDays;
  return [Math.min(...durations), Math.max(...durations)];
}

export async function getDestinations(locale: Locale): Promise<Destination[]> {
  return DESTINATION_STRUCTURE.map((d) => composeDestination(locale, d.slug));
}

export async function getDestination(
  locale: Locale,
  slug: Slug,
): Promise<Destination | undefined> {
  return DESTINATION_BY_SLUG.has(slug) ? composeDestination(locale, slug) : undefined;
}

export async function getExperiences(locale: Locale): Promise<Experience[]> {
  return EXPERIENCE_STRUCTURE.map((e) => composeExperience(locale, e.slug));
}

export async function getExperience(
  locale: Locale,
  slug: Slug,
): Promise<Experience | undefined> {
  return EXPERIENCE_BY_SLUG.has(slug) ? composeExperience(locale, slug) : undefined;
}

export function getExperienceForDestination(locale: Locale, slug: Slug): Experience[] {
  const destination = DESTINATION_BY_SLUG.get(slug);
  if (!destination) return [];
  return destination.experienceSlugs.map((s) => composeExperience(locale, s));
}

/** Las ocho tarjetas del selector de experiencia de la home. */
export async function getExperienceCategories(
  locale: Locale,
): Promise<{ id: string; experience: Experience }[]> {
  return EXPERIENCE_CATEGORIES.map((category) => ({
    id: category.id,
    experience: composeExperience(locale, category.leadExperienceSlug),
  }));
}

/* -------------------------------------------------------------------------
 * Personas, impacto, opiniones y journal
 * ---------------------------------------------------------------------- */

export async function getTeam(locale: Locale): Promise<TeamMember[]> {
  const t = getContent(locale).team;
  return TEAM_STRUCTURE.map((m) => ({
    ...m,
    ...t[m.slug as keyof typeof t],
    languages: m.languageCodes,
  }));
}

export async function getTeamMember(
  locale: Locale,
  slug: Slug,
): Promise<TeamMember | undefined> {
  const structure = TEAM_BY_SLUG.get(slug);
  if (!structure) return undefined;
  const t = getContent(locale).team;
  return {
    ...structure,
    ...t[slug as keyof typeof t],
    languages: structure.languageCodes,
  };
}

export async function getImpact(locale: Locale) {
  const t = getContent(locale).impact;
  return {
    projects: IMPACT_STRUCTURE.map((p) => ({
      ...p,
      ...t[p.slug as keyof typeof t],
    })),
    video: IMPACT_VIDEO,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

/**
 * Perfiles públicos de reseñas. Hoy devuelve una lista vacía: no hay URLs
 * confirmadas y una búsqueda genérica no es una reseña.
 */
export function getReviewSources() {
  return REVIEW_SOURCES;
}

export async function getJournalPosts(locale: Locale): Promise<JournalPost[]> {
  const t = getContent(locale).journal;
  return [...JOURNAL_STRUCTURE]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => ({ ...p, ...t[p.slug as keyof typeof t] }));
}

export async function getJournalPost(
  locale: Locale,
  slug: Slug,
): Promise<JournalPost | undefined> {
  const structure = JOURNAL_BY_SLUG.get(slug);
  if (!structure) return undefined;
  const t = getContent(locale).journal;
  return { ...structure, ...t[slug as keyof typeof t] };
}

export async function getFaqs(locale: Locale): Promise<FAQ[]> {
  const t = getContent(locale).faq;
  return FAQ_STRUCTURE.map((f) => ({ ...f, ...t[f.slug as keyof typeof t] }));
}

export async function getFaqsBySlugs(locale: Locale, slugs: Slug[]): Promise<FAQ[]> {
  const t = getContent(locale).faq;
  return slugs
    .map((slug) => FAQ_BY_SLUG.get(slug))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))
    .map((f) => ({ ...f, ...t[f.slug as keyof typeof t] }));
}

/** Fecha larga en el formato del idioma: "14 July 2026", "14 de julio de 2026", "2026年7月14日". */
export function formatDate(locale: Locale, iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE_META[locale].intl, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
