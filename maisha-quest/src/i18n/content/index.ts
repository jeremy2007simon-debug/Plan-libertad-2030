import { enContent, type ContentDictionary } from "./en";
import { esContent } from "./es";
import { deContent } from "./de";
import { frContent } from "./fr";
import { ruContent } from "./ru";
import { zhCNContent } from "./zh-CN";
import type { Locale } from "@/i18n/config";

/**
 * Contenido traducido, por idioma.
 *
 * A diferencia del diccionario de interfaz, este registro es SÍNCRONO: la capa
 * de datos compone estructura + texto dentro de funciones que no son `async`
 * (`formatRoute`, los `compose*`), y hacerlas asíncronas solo para cargar un
 * objeto ya presente en el servidor no aporta nada. Todo esto es código de
 * servidor: no llega ni un byte al navegador.
 */
const CONTENT: Record<Locale, ContentDictionary> = {
  en: enContent,
  es: esContent,
  de: deContent,
  fr: frContent,
  ru: ruContent,
  "zh-CN": zhCNContent,
};

export function getContent(locale: Locale): ContentDictionary {
  return CONTENT[locale];
}

export type { ContentDictionary };
