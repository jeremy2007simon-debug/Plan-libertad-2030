/**
 * Configuración de idiomas.
 *
 * Seis idiomas con prefijo de ruta (`/en/...`, `/es/...`). No hay librería de
 * i18n: el patrón es el que documenta el propio Next 16 —segmento `[locale]`,
 * diccionarios cargados en el servidor y `proxy.ts` para la raíz— porque toda
 * la web son componentes de servidor y los diccionarios nunca llegan al
 * bundle del cliente. Una dependencia externa aquí solo añadiría superficie
 * de rotura sin resolver nada que no resuelva el framework.
 *
 * El código de idioma chino es `zh-CN` (chino simplificado) porque es lo que
 * entienden los buscadores y el atributo `lang`; el modelo de datos interno
 * usaba `zh` y se mantiene la equivalencia en un único sitio: aquí.
 */

export const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Metadatos de cada idioma. `nativeName` es lo que ve el visitante. */
export const LOCALE_META: Record<
  Locale,
  {
    /** Nombre en su propio idioma — nunca una bandera como única identificación. */
    nativeName: string;
    /** Nombre en inglés, para textos internos y `aria-label`. */
    englishName: string;
    /** Valor del atributo `lang` y del `hreflang`. */
    htmlLang: string;
    /** Etiqueta corta del botón del selector. */
    short: string;
    /** Locale de `Intl` para fechas y números. */
    intl: string;
    /** Sistema de escritura: decide la pila tipográfica. */
    script: "latin" | "cyrillic" | "han";
  }
> = {
  en: {
    nativeName: "English",
    englishName: "English",
    htmlLang: "en",
    short: "EN",
    intl: "en-GB",
    script: "latin",
  },
  es: {
    nativeName: "Español",
    englishName: "Spanish",
    htmlLang: "es",
    short: "ES",
    intl: "es-ES",
    script: "latin",
  },
  de: {
    nativeName: "Deutsch",
    englishName: "German",
    htmlLang: "de",
    short: "DE",
    intl: "de-DE",
    script: "latin",
  },
  fr: {
    nativeName: "Français",
    englishName: "French",
    htmlLang: "fr",
    short: "FR",
    intl: "fr-FR",
    script: "latin",
  },
  ru: {
    nativeName: "Русский",
    englishName: "Russian",
    htmlLang: "ru",
    short: "RU",
    intl: "ru-RU",
    script: "cyrillic",
  },
  "zh-CN": {
    nativeName: "简体中文",
    englishName: "Simplified Chinese",
    htmlLang: "zh-Hans",
    short: "中文",
    intl: "zh-CN",
    script: "han",
  },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Antepone el prefijo de idioma a una ruta interna.
 *
 * Es la única forma de construir un enlace interno en el proyecto: si un
 * componente escribe `/safaris` a pelo, el visitante sale de su idioma. Acepta
 * la ruta con o sin barra inicial y conserva query y hash.
 */
export function localeHref(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path; // externo, tel:, mailto:, #ancla
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/**
 * Quita el prefijo de idioma de una ruta. Devuelve la ruta "neutra", que es
 * la que el selector usa para saltar al equivalente en otro idioma.
 */
export function stripLocale(pathname: string): { locale: Locale | null; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return { locale: segments[0], path: "/" + segments.slice(1).join("/") };
  }
  return { locale: null, path: pathname || "/" };
}

/**
 * Elige el idioma a partir de la cabecera `Accept-Language`.
 * Sin dependencias: un `Accept-Language` real es corto y el orden por `q` es
 * todo lo que hace falta.
 */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.slice(2)) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // Coincidencia exacta: zh-cn, es-419…
    const exact = LOCALES.find((l) => l.toLowerCase() === tag);
    if (exact) return exact;
    // Chino: cualquier variante simplificada cae en zh-CN.
    if (tag === "zh" || tag.startsWith("zh-hans") || tag === "zh-sg") return "zh-CN";
    // Coincidencia por idioma base: es-MX → es.
    const base = tag.split("-")[0];
    const byBase = LOCALES.find((l) => l.split("-")[0] === base);
    if (byBase) return byBase;
  }

  return DEFAULT_LOCALE;
}

/** Nombre de la cookie donde se guarda la preferencia explícita del visitante. */
export const LOCALE_COOKIE = "maisha_locale";

/** Un año. La cookie no guarda nada personal: solo el idioma elegido. */
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Guarda la preferencia de idioma del visitante.
 *
 * Vive aquí y no dentro del selector porque escribir en `document` desde el
 * cuerpo de un componente es una mutación de ámbito externo que el compilador
 * de React rechaza, con razón: desde un módulo aparte queda claro que es un
 * efecto de borde deliberado, invocado solo desde un manejador de eventos.
 */
export function rememberLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};samesite=lax`;
}
