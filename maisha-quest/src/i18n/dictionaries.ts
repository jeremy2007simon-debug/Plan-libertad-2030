import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./messages/en";

/**
 * Carga del diccionario de interfaz.
 *
 * Import dinámico por idioma: cada página de servidor solo evalúa el suyo, y
 * como toda la web son componentes de servidor, ninguno de los seis llega al
 * bundle del navegador.
 *
 * Los cinco idiomas traducidos se tipan contra `Dictionary`, que sale del
 * inglés. Añadir una clave en inglés y no traducirla rompe `tsc`, así que una
 * página a medio traducir no puede llegar a compilar.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./messages/en").then((m) => m.en),
  es: () => import("./messages/es").then((m) => m.es),
  de: () => import("./messages/de").then((m) => m.de),
  fr: () => import("./messages/fr").then((m) => m.fr),
  ru: () => import("./messages/ru").then((m) => m.ru),
  "zh-CN": () => import("./messages/zh-CN").then((m) => m.zhCN),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
