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

export interface NavNode {
  /** Clave de traducción dentro de `t.nav.items`. */
  key: string;
  href: string;
  children?: NavNode[];
}

export const MAIN_NAV: NavNode[] = [
  {
    key: "safaris",
    href: "/safaris",
    children: [
      { key: "allSafaris", href: "/safaris" },
      { key: "explorer", href: "/collections/explorer" },
      { key: "escape", href: "/collections/escape" },
      { key: "enrich", href: "/collections/enrich" },
    ],
  },
  { key: "destinations", href: "/destinations" },
  { key: "experiences", href: "/experiences" },
  {
    key: "about",
    href: "/about",
    children: [
      { key: "ourStory", href: "/about" },
      { key: "team", href: "/about/team" },
    ],
  },
  { key: "impact", href: "/impact" },
  { key: "journal", href: "/journal" },
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
