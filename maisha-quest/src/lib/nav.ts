/**
 * Estructura de navegación — sin una sola palabra traducible.
 *
 * Aquí viven las rutas y las claves; las etiquetas salen del diccionario del
 * idioma activo. Así la estructura no se duplica seis veces y es imposible que
 * un idioma pierda una entrada de menú: si falta la clave, el build falla.
 *
 * Los `href` se escriben sin prefijo de idioma. `localeHref()` lo antepone al
 * pintarlos, que es la única forma admitida de construir un enlace interno.
 */

import { PHOTOS } from "@/data/photography";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import type { Photo } from "@/data/photography";

export interface NavNode {
  /** Clave de traducción dentro de `t.nav.items`. */
  key: string;
  href: string;
  children?: NavNode[];
  /**
   * Fotografía editorial del menú de escritorio (`SiteMenu`).
   *
   * Siempre la MISMA imagen que ya usa `PageHero` en esa página — no una
   * elección nueva para el menú. Así la fotografía que alguien ve al pasar
   * por "Destinos" es la que va a encontrar un segundo después al llegar,
   * en vez de crear una asociación de color que la propia página desmiente.
   * Solo los nodos que aparecen en el panel de la derecha llevan `image`:
   * los duplicados de un padre (`allSafaris`, `ourStory`) no la necesitan
   * porque el propio padre ya la lleva.
   */
  image?: Photo;
}

export const MAIN_NAV: NavNode[] = [
  {
    key: "safaris",
    href: "/safaris",
    image: PHOTOS["serengeti-plains"],
    children: [
      { key: "allSafaris", href: "/safaris" },
      { key: "explorer", href: "/collections/explorer", image: CLIENT_PHOTOS["lion-open-savannah"] },
      { key: "escape", href: "/collections/escape", image: PHOTOS["serengeti-sunset"] },
      { key: "enrich", href: "/collections/enrich", image: CLIENT_PHOTOS["giraffe-oxpecker-birds"] },
    ],
  },
  { key: "destinations", href: "/destinations", image: PHOTOS["wildebeest-migration"] },
  { key: "experiences", href: "/experiences", image: CLIENT_PHOTOS["male-lions-together"] },
  { key: "learn", href: "/learn", image: CLIENT_PHOTOS["savannah-acacia-sunset"] },
  {
    key: "about",
    href: "/about",
    image: PHOTOS.arusha,
    children: [
      { key: "ourStory", href: "/about" },
      { key: "team", href: "/about/team", image: PHOTOS["kilimanjaro-shira"] },
    ],
  },
  { key: "impact", href: "/impact", image: PHOTOS["ngorongoro-zebras"] },
  { key: "journal", href: "/journal", image: PHOTOS["serengeti-sunset-wide"] },
];

export const FOOTER_NAV: { titleKey: string; items: NavNode[] }[] = [
  {
    titleKey: "travel",
    items: [
      { key: "allSafaris", href: "/safaris" },
      { key: "explorer", href: "/collections/explorer" },
      { key: "escape", href: "/collections/escape" },
      { key: "enrich", href: "/collections/enrich" },
      { key: "destinations", href: "/destinations" },
      { key: "experiences", href: "/experiences" },
      { key: "learn", href: "/learn" },
    ],
  },
  {
    titleKey: "company",
    items: [
      { key: "aboutUs", href: "/about" },
      { key: "team", href: "/about/team" },
      { key: "impact", href: "/impact" },
      { key: "journal", href: "/journal" },
      { key: "contact", href: "/contact" },
      { key: "faq", href: "/faq" },
    ],
  },
  {
    titleKey: "legal",
    items: [
      { key: "terms", href: "/legal/terms" },
      { key: "privacy", href: "/legal/privacy" },
      { key: "cookies", href: "/legal/cookies" },
      { key: "credits", href: "/legal/credits" },
      { key: "sitemap", href: "/sitemap.xml" },
    ],
  },
];
