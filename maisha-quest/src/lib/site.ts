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
  whatsappNumber: "255672426411",
  email: "info@maishaquest.com",
  emailHref: "mailto:info@maishaquest.com",
  hours: {
    label: "Monday – Saturday, 8:00 AM – 6:00 PM",
    timezone: "GMT+3",
  },
  /**
   * Perfiles sociales — ÚNICO sitio donde viven estas URLs.
   *
   * Verificadas contra la web oficial anterior de Maisha Quest. Ningún
   * componente las escribe a mano: todos pasan por `socialLinks()`, así que
   * cambiar un perfil se hace aquí y en ningún sitio más.
   *
   * `null` significa "no confirmada" y el enlace NO se pinta: ni `href="#"`,
   * ni botón desactivado, ni icono muerto.
   */
  social: {
    instagram:
      "https://www.instagram.com/maishaquest?igsh=MThwamk4OWNxM21ieg%3D%3D&utm_source=qr",
    linkedin: "https://www.linkedin.com/in/maisha-quest-817ab6311/",
    youtube: "https://www.youtube.com/@MaishaQuest",
    facebook: null,
  } as Record<string, string | null>,
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


/**
 * Redes sociales con URL confirmada, en orden de presentación.
 *
 * Devuelve solo las que existen. Si el cliente no ha confirmado ninguna la
 * lista viene vacía y quien la pinta no renderiza nada: ni enlaces a `#`, ni
 * botones desactivados, ni iconos muertos.
 */
export function socialLinks(): { label: string; href: string }[] {
  const order: [string, string | null][] = [
    ["Instagram", COMPANY.social.instagram],
    ["LinkedIn", COMPANY.social.linkedin],
    ["YouTube", COMPANY.social.youtube],
    ["Facebook", COMPANY.social.facebook],
  ];
  return order
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, href]) => ({ label, href }));
}

/**
 * Enlace de WhatsApp con el mensaje inicial ya escrito.
 *
 * El texto va codificado con `encodeURIComponent`, así que acentos, signos de
 * apertura y caracteres no latinos sobreviven al viaje. Sin mensaje devuelve
 * el enlace pelado en lugar de un `?text=` vacío.
 */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${COMPANY.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mensaje que se precarga en WhatsApp, por idioma. */
export const WHATSAPP_MESSAGE: Record<string, string> = {
  en: "Hello Maisha Quest, I would like help planning a safari in Tanzania.",
  es: "Hola Maisha Quest, me gustaría recibir ayuda para planificar un safari en Tanzania.",
  de: "Hallo Maisha Quest, ich hätte gern Hilfe bei der Planung einer Safari in Tansania.",
  fr: "Bonjour Maisha Quest, j\u2019aimerais de l\u2019aide pour organiser un safari en Tanzanie.",
  ru: "Здравствуйте, Maisha Quest! Мне нужна помощь в планировании сафари в Танзании.",
  "zh-CN": "您好 Maisha Quest，我想请你们帮忙规划一次坦桑尼亚野生动物之旅。",
};

/**
 * Datos que faltan por confirmar con el cliente.
 *
 * Lista viva de lo que hoy no se puede publicar porque no está verificado.
 * Nada de esto se inventa ni se sustituye por un sucedáneo: si no hay dato, el
 * elemento no se pinta.
 */
export const CLIENT_DATA_PENDING = [
  {
    key: "reviews.profiles",
    label: "URLs oficiales de TripAdvisor, SafariBookings y Google Business",
    note:
      "La web anterior no contiene ninguna. Los tres botones están ocultos por " +
      "completo: una búsqueda genérica no es una reseña y puede devolver a la " +
      "competencia. Rellenar REVIEW_SOURCES en data/testimonials.ts cuando el " +
      "cliente facilite los enlaces oficiales.",
  },
  {
    key: "whatsapp.business",
    label: "Confirmar que +255 672 426 411 tiene WhatsApp Business activo",
    note: "El enlace wa.me se construye con ese número.",
  },
  {
    key: "trust.credentials",
    label: "Licencias TALA/TATO, seguros y años en operación",
    note: "TRUST_CREDENTIALS sigue vacío y la franja no se pinta.",
  },
] as const;
