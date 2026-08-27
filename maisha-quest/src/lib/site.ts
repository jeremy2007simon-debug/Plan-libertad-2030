/**
 * Datos reales de Maisha Quest y configuración de navegación.
 *
 * Todo dato de contacto vive aquí y en ningún otro sitio. Lo que no está
 * confirmado por el cliente se deja como `null` con un TODO, nunca inventado.
 */

import type { Locale } from "@/types/content";

export const SITE_URL = "https://www.maishaquest.com";

export const COMPANY = {
  name: "Maisha Quest",
  /** "Maisha" significa "vida" en swahili; la marca lo traduce como "Journey of Life". */
  meaning: "Journey of Life",
  legacyTagline: "Live Life by a Compass",
  valueProposition: {
    headline: "Private journeys through Tanzania",
    subline: "Guided by local experts. Designed around your story.",
  },
  concept: "Guided by Tanzania. Designed around you.",
  base: "Arusha, Tanzania",
  phone: "+255 672 426 411",
  phoneHref: "tel:+255672426411",
  /** El número facilitado es el de contacto; confirmar que tiene WhatsApp Business activo. */
  whatsappHref: "https://wa.me/255672426411",
  email: "info@maishaquest.com",
  emailHref: "mailto:info@maishaquest.com",
  hours: {
    label: "Monday – Saturday, 8:00 AM – 6:00 PM",
    timezone: "GMT+3",
  },
  social: {
    instagram: "https://www.instagram.com/maishaquest/",
    linkedin: "https://www.linkedin.com/company/maishaquest/",
    youtube: "https://www.youtube.com/@MaishaQuest",
  },
  /**
   * TODO (cliente): licencias TALA/TATO, seguros, años en operación y número de
   * viajeros atendidos. La sección "Your journey, in trusted hands" tiene el
   * hueco preparado (`TRUST_CREDENTIALS`); se queda vacío hasta tener el dato.
   */
  credentials: [] as { label: string; value: string }[],
} as const;

/** Coordenadas de Arusha — sede real de la empresa; se usan en el pie y en el hero. */
export const HOME_COORDINATES = {
  lat: -3.3869,
  lng: 36.68299,
  label: "3°23'13\"S  36°40'59\"E",
};

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  {
    label: "Safaris",
    href: "/safaris",
    description: "Private journeys, grouped by the way you like to travel.",
    children: [
      { label: "All safaris", href: "/safaris" },
      {
        label: "Explorer Collection",
        href: "/collections/explorer",
        description: "Wild landscapes, adventure and discovery.",
      },
      {
        label: "Escape Collection",
        href: "/collections/escape",
        description: "Space, comfort and effortless connection.",
      },
      {
        label: "Enrich Collection",
        href: "/collections/enrich",
        description: "Culture, cuisine and communities.",
      },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our story", href: "/about" },
      { label: "The team", href: "/about/team" },
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "Journal", href: "/journal" },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Travel",
    items: [
      { label: "All safaris", href: "/safaris" },
      { label: "Explorer Collection", href: "/collections/explorer" },
      { label: "Escape Collection", href: "/collections/escape" },
      { label: "Enrich Collection", href: "/collections/enrich" },
      { label: "Destinations", href: "/destinations" },
      { label: "Experiences", href: "/experiences" },
    ],
  },
  {
    title: "Maisha Quest",
    items: [
      { label: "About us", href: "/about" },
      { label: "The team", href: "/about/team" },
      { label: "Impact", href: "/impact" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Photo credits", href: "/legal/credits" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

/**
 * Idiomas previstos. Solo `en` está traducido: el resto queda declarado para
 * que el selector y el enrutado existan, pero sin traducciones inventadas.
 */
export const LOCALES: {
  code: Locale;
  label: string;
  englishLabel: string;
  available: boolean;
}[] = [
  { code: "en", label: "English", englishLabel: "English", available: true },
  { code: "es", label: "Español", englishLabel: "Spanish", available: false },
  { code: "de", label: "Deutsch", englishLabel: "German", available: false },
  { code: "fr", label: "Français", englishLabel: "French", available: false },
  { code: "ru", label: "Русский", englishLabel: "Russian", available: false },
  { code: "zh", label: "中文", englishLabel: "Mandarin", available: false },
];

export const DEFAULT_LOCALE: Locale = "en";

/** Beneficios de "Your journey, in trusted hands". Sin cifras: nada inventado. */
export const TRUST_PILLARS = [
  {
    title: "Tanzania-based experts",
    body: "We live and work in Arusha. Our routes come from driving them, not from a brochure.",
    icon: "compass",
  },
  {
    title: "Tailor-made itineraries",
    body: "Every journey is built from scratch around your pace, your interests and your dates.",
    icon: "route",
  },
  {
    title: "Multilingual service",
    body: "We plan and host in English, Swahili, Russian and Mandarin Chinese.",
    icon: "languages",
  },
  {
    title: "Carefully selected stays",
    body: "Camps and lodges we have visited ourselves, chosen for location, service and character.",
    icon: "lodge",
  },
  {
    title: "Responsible local travel",
    body: "Local guides, local suppliers, and communities involved rather than photographed.",
    icon: "leaf",
  },
  {
    title: "Support from arrival to departure",
    body: "One team from your first message to your flight home, reachable throughout your trip.",
    icon: "shield",
  },
] as const;

/**
 * Espacio reservado para acreditaciones comerciales (TALA, TATO, seguros,
 * años de operación, tiempo medio de respuesta). Vacío a propósito: el
 * componente `TrustCredentials` no renderiza nada mientras no haya datos
 * reales confirmados por el cliente.
 */
export const TRUST_CREDENTIALS: { label: string; value: string }[] = [];
