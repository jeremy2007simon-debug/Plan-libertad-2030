/**
 * Modelos de contenido de Maisha Quest.
 *
 * Única fuente de verdad para nombres, duraciones, rutas y precios. Ningún
 * componente debe escribir a mano un nombre de safari o una duración: todo
 * sale de `src/data/*` a través de `src/lib/content.ts`, para que la web
 * nunca se contradiga a sí misma (uno de los fallos de la web actual).
 *
 * Las formas están pensadas para mapearse 1:1 contra tablas de Supabase o
 * colecciones de un CMS cuando llegue el backend.
 */

/** Slug estable usado en URLs. Nunca se traduce. */
export type Slug = string;

/** Marca de contenido pendiente de que el cliente facilite el dato real. */
export type Pending<T> = T | null;

export type CollectionId = "explorer" | "escape" | "enrich";

export type Locale = "en" | "es" | "de" | "fr" | "ru" | "zh";

/** Atribución de una fotografía provisional. */
export interface PhotoCredit {
  author: string;
  license: string;
  /** URL de la ficha original, para poder comprobar la licencia. */
  source: string;
}

/** Referencia a un asset. `src === null` => hueco de imagen a la espera de foto real. */
export interface MediaImage {
  src: Pending<string>;
  /** Alt descriptivo. Obligatorio siempre que haya `src`. */
  alt: string;
  /** Ancho/alto reales del archivo; permiten reservar espacio y evitar CLS. */
  width?: number;
  height?: number;
  /** LQIP en base64: evita el destello de carga sin una petición extra. */
  blurDataURL?: string;
  /** Crédito para la página de créditos. */
  credit?: PhotoCredit;
  /** true cuando es foto provisional (stock/Commons), no material propio de Maisha Quest. */
  provisional?: boolean;
}

/**
 * Imagen que ya existe en el repositorio, con todos sus metadatos.
 *
 * La distinción con `MediaImage` es la que sostiene toda la política de
 * fotografía: los campos que SIEMPRE tienen foto (destinos, experiencias,
 * safaris, colecciones) se tipan como `ResolvedImage` y el compilador exige un
 * archivo real; los que pueden estar pendientes porque retratan al negocio
 * —equipo, alojamientos, impacto, testimonios— se tipan como `MediaImage` y
 * admiten `src: null`.
 */
export interface ResolvedImage extends MediaImage {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  credit: PhotoCredit;
}

export interface MediaVideo {
  /** MP4 comprimido (H.264). null mientras no exista la versión optimizada. */
  mp4: Pending<string>;
  /** WebM opcional; el navegador lo prefiere si está. */
  webm?: Pending<string>;
  poster: MediaImage;
  /** Pista de subtítulos WebVTT. */
  captions?: Pending<string>;
  orientation: "portrait" | "landscape";
  /** Duración en segundos, para anunciarla en la interfaz. */
  durationSeconds?: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
  /** Formato legible tipo brújula: 2°19'59"S 34°49'59"E */
  label: string;
}

export interface Collection {
  id: CollectionId;
  name: string;
  tagline: string;
  description: string;
  /** Perfil de viajero al que habla la colección. */
  travellerProfile: string;
  /** Rango habitual de duración, en días. */
  typicalDurationDays: [number, number];
  /** Rasgos asociados (camping, lodges, cultura...). */
  traits: string[];
  accent: "sand" | "terracotta" | "gold";
  image: ResolvedImage;
}

export interface Destination {
  slug: Slug;
  name: string;
  /** Región tal y como la agrupa Maisha Quest hoy. */
  region:
    | "Northern Circuit"
    | "Southern Circuit"
    | "Coast & Islands"
    | "Gateway";
  shortDescription: string;
  description: string;
  coordinates: Coordinates;
  /** Meses recomendados, en texto corto ("June – October"). */
  bestTime: string;
  /** Detalle por temporadas para la ficha ampliada. */
  seasons?: { label: string; months: string; note: string }[];
  /** Fauna característica. Solo especies presentes en Tanzania. */
  wildlife: string[];
  /** Slugs de `experiences` disponibles aquí. */
  experienceSlugs: Slug[];
  image: ResolvedImage;
  gallery?: ResolvedImage[];
  /** Posición en el mapa esquemático (porcentaje sobre el viewBox del SVG). */
  mapPosition: { x: number; y: number };
}

export interface Experience {
  slug: Slug;
  name: string;
  /** Categoría del selector "How do you want to experience Tanzania?". */
  category:
    | "wildlife"
    | "adventure"
    | "luxury"
    | "honeymoon"
    | "family"
    | "culture"
    | "kilimanjaro"
    | "safari-and-zanzibar";
  shortDescription: string;
  description: string;
  image: ResolvedImage;
  /** Destinos donde se vive esta experiencia. */
  destinationSlugs: Slug[];
}

export type AccommodationStyle =
  | "Mobile camp"
  | "Tented camp"
  | "Lodge"
  | "Boutique lodge"
  | "Beach resort"
  | "City hotel";

export interface Accommodation {
  slug: Slug;
  name: Pending<string>;
  style: AccommodationStyle;
  destinationSlug: Slug;
  description: Pending<string>;
  image: MediaImage;
}

export interface ItineraryDay {
  day: number;
  title: string;
  /** Trayecto del día: "Arusha → Tarangire". */
  route: Pending<string>;
  activities: string[];
  /** Slug de `accommodations` o nombre pendiente de confirmar. */
  accommodationSlug: Pending<Slug>;
  meals: ("Breakfast" | "Lunch" | "Dinner")[];
  /** Tiempo estimado de trayecto/actividad. */
  estimatedDuration: Pending<string>;
  images?: ResolvedImage[];
}

export interface Price {
  /** Importe "desde", por persona. null si aún no hay tarifa confirmada. */
  fromPerPerson: Pending<number>;
  currency: "USD";
  /** Nota obligatoria cuando hay precio (temporada, mínimo de viajeros...). */
  note?: string;
}

export interface Safari {
  slug: Slug;
  name: string;
  collection: CollectionId;
  durationDays: number;
  /** Ruta como lista ordenada de slugs de destino. Fuente única de la ruta. */
  routeDestinationSlugs: Slug[];
  summary: string;
  /** Descripción larga, opcional. */
  overview?: string;
  accommodationStyle: AccommodationStyle;
  travellerProfile: string;
  price: Price;
  bestTime: string;
  image: ResolvedImage;
  gallery?: ResolvedImage[];
  video?: MediaVideo;
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  practicalInfo?: { label: string; value: string }[];
  faqSlugs?: Slug[];
  /** Slugs de safaris afines, para "Similar journeys". */
  relatedSafariSlugs?: Slug[];
  /** Marca los que aparecen en "Journeys worth remembering". */
  featured?: boolean;
  /** true mientras el itinerario no lo haya validado el equipo de Arusha. */
  draft?: boolean;
}

export interface TeamMember {
  slug: Slug;
  name: string;
  role: string;
  languages: string[];
  /** Biografía breve, en primera o tercera persona según el tono de la ficha. */
  bio: string;
  specialty: string;
  /** "Lugar favorito en Tanzania" — pendiente hasta que cada persona lo indique. */
  favouritePlace: Pending<string>;
  portrait: MediaImage;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  date: string;
  /** Safari realizado, por slug, si se conoce. */
  safariSlug: Pending<Slug>;
  tripType: Pending<string>;
  rating: Pending<number>;
  quote: string;
  /** URL pública verificable (Google, TripAdvisor, SafariBookings...). */
  source: Pending<string>;
  portrait?: MediaImage;
  video?: MediaVideo;
}

export interface ImpactProject {
  slug: Slug;
  title: string;
  area: "Education" | "Conservation" | "Community" | "Local employment";
  description: string;
  /** Resultados concretos. Vacío mientras el cliente no facilite datos reales. */
  outcomes: string[];
  location: Pending<string>;
  image: MediaImage;
}

export interface JournalPost {
  slug: Slug;
  title: string;
  excerpt: string;
  date: string;
  author: Pending<string>;
  category: string;
  readingMinutes: number;
  image: ResolvedImage;
  /** Cuerpo en párrafos. Se sustituirá por el campo del CMS. */
  body?: string[];
}

export interface FAQ {
  slug: Slug;
  question: string;
  answer: string;
  topic: "Planning" | "Travel" | "Safari" | "Health & safety" | "Payment";
}

/* -------------------------------------------------------------------------
 * Solicitud de viaje (planificador)
 * ---------------------------------------------------------------------- */

export interface ContactRequest {
  tripType: string;
  destinationSlugs: Slug[];
  /** Mes aproximado en formato YYYY-MM, o "flexible". */
  travelMonth: string;
  durationDays: string;
  travellers: { adults: number; children: number };
  accommodationStyle: string;
  budgetPerPerson: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    country?: string;
  };
  specialRequests?: string;
  /** Idioma en el que el viajero quiere que le respondan. */
  preferredLanguage: Locale;
  /** Campo trampa antispam: si viene relleno, se descarta la solicitud. */
  honeypot?: string;
  /** Milisegundos que tardó en completar el formulario (antispam). */
  elapsedMs?: number;
}
