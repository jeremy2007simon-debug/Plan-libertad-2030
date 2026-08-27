import type { JournalPost } from "@/types/content";
import { PHOTOS } from "./photography";
import { CLIENT_PHOTOS } from "./client-photography";

/**
 * Journal — el blog, reestructurado.
 *
 * Estas tres entradas son guías de planificación construidas sobre geografía y
 * estacionalidad reales de Tanzania, no sobre datos del negocio. No firman a
 * nadie (`author: null`) ni citan cifras de la empresa. Sustituir por los
 * artículos reales del cliente en cuanto estén; el modelo ya admite el cuerpo
 * completo (`body`) para cuando el contenido venga del CMS.
 */

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "when-to-see-the-great-migration",
    title: "Where the migration actually is, month by month",
    excerpt:
      "There is no migration season — there is a place the herds should be in the month you travel. A straight answer for each one, and what it means for where you sleep.",
    date: "2026-07-14",
    author: null,
    category: "Planning",
    readingMinutes: 7,
    image: PHOTOS["wildebeest-migration"],
  },
  {
    slug: "choosing-a-kilimanjaro-route",
    title: "Choosing a Kilimanjaro route",
    excerpt:
      "Lemosho, Machame, Rongai or Marangu. The differences that matter are acclimatisation profile and how many days you can give the mountain — not difficulty ratings.",
    date: "2026-06-02",
    author: null,
    category: "Kilimanjaro",
    readingMinutes: 9,
    image: PHOTOS["kilimanjaro-shira"],
  },
  {
    slug: "green-season-tanzania",
    title: "In defence of the green season",
    excerpt:
      "November to May gets written off as the wet months. What you actually get: empty parks, extraordinary skies, newborn animals and the best birding of the year.",
    date: "2026-04-21",
    author: null,
    category: "Planning",
    readingMinutes: 6,
    image: CLIENT_PHOTOS["flamingo-low-flight"],
  },
];

export const JOURNAL_BY_SLUG = new Map(
  JOURNAL_POSTS.map((post) => [post.slug, post]),
);
