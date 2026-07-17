import { es } from "./es";
import { en } from "./en";
import type { Locale, Translations } from "./types";

export const defaultLocale: Locale = "es";

// Añadir un idioma nuevo: crear src/lib/i18n/<locale>.ts que tipe como
// `Translations`, y registrarlo aquí y en LOCALE_META (LanguageSwitcher.tsx).
export const dictionaries: Record<Locale, Translations> = { es, en };

export const locales: Locale[] = ["es", "en"];

export type { Locale, Translations };
