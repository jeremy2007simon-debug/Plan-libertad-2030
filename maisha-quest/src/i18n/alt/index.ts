import "server-only";
import type { Locale } from "../config";
import type { PhotoAlt } from "./en";

/**
 * Carga del texto alternativo de la fotografía.
 *
 * Mismo patrón que `dictionaries.ts`: import dinámico por idioma, evaluado
 * solo en el servidor, y los cinco traducidos tipados contra el inglés. Una
 * clave sin traducir rompe `tsc`; no hay respaldo silencioso al inglés, que
 * es justo lo que hacía que estas descripciones se colaran sin traducir.
 */
const alts: Record<Locale, () => Promise<PhotoAlt>> = {
  en: () => import("./en").then((m) => m.en),
  es: () => import("./es").then((m) => m.es),
  de: () => import("./de").then((m) => m.de),
  fr: () => import("./fr").then((m) => m.fr),
  ru: () => import("./ru").then((m) => m.ru),
  "zh-CN": () => import("./zh-CN").then((m) => m.zhCN),
};

export async function getPhotoAlt(locale: Locale): Promise<PhotoAlt> {
  return alts[locale]();
}

export type { PhotoAlt, PhotoAltKey } from "./en";
