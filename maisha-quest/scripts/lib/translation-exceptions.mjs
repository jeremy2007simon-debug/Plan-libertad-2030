/**
 * Qué NO cuenta como inglés residual.
 *
 * Lo usan los dos detectores —`check-untranslated.mjs`, que mira el texto
 * visible, y `check-a11y.mjs`, que mira los nombres accesibles— porque la
 * pregunta es la misma y una lista duplicada acaba divergiendo.
 *
 * El criterio no es lingüístico sino de ORIGEN. Hay palabras que se escriben
 * igual en inglés y en otra lengua —«Contact», «Destinations», «Menu» y
 * «Culture» en francés; «Budget», «Route» y «Sitemap» en alemán; «Legal» y
 * «Chat» en español—, y marcarlas sería ruido. La distinción es si la cadena
 * está en `messages/<idioma>.ts` o en `content/<idioma>.ts`: si está, alguien
 * la escribió como traducción y coincide a propósito; si no está, viene
 * escrita a mano dentro de un componente y no ha pasado por el diccionario.
 * Eso segundo es exactamente lo que se busca.
 */

import { readFileSync } from "node:fs";

const SRC = new URL("../../src/", import.meta.url);

/** Cadenas literales de un archivo de traducción. */
function literals(file) {
  const source = readFileSync(new URL(file, SRC), "utf8");
  return [...source.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) =>
    m[1].replace(/\\"/g, '"').replace(/\\n/g, " ").replace(/\s+/g, " ").trim(),
  );
}

/** Valores de un campo concreto de un archivo de datos. */
function fieldValues(file, field) {
  const source = readFileSync(new URL(file, SRC), "utf8");
  return [...source.matchAll(new RegExp(`${field}:\\s*"([^"]+)"`, "g"))].map((m) => m[1]);
}

/**
 * Nombres propios, leídos de los datos y no de una lista escrita a mano.
 *
 * Los del equipo y las atribuciones de Wikimedia no se traducen: una licencia
 * CC exige el nombre del autor tal y como lo publicó. Leerlos del origen evita
 * que la lista se quede vieja y empiece a tapar cadenas sin traducir de verdad.
 */
export const PROPER_NAMES = new Set([
  ...fieldValues("data/structure/team.ts", "name"),
  ...fieldValues("data/photography.ts", "author"),
]);

/** Cadenas que cada idioma declara como traducción suya. */
export function dictionaryFor(locale) {
  return new Set([
    ...literals(`i18n/messages/${locale}.ts`),
    ...literals(`i18n/content/${locale}.ts`),
    ...literals(`i18n/alt/${locale}.ts`),
  ]);
}

/** Excepciones que no dependen del idioma, cada una con su motivo. */
export const ALLOWED = [
  // --- Marca y nombres propios ---
  /^Maisha Quest/i,
  /^Live Life by a Compass$/, // lema de marca, en inglés a propósito (ver README)
  /^[‘'"“]?Maisha[’'"”]?$/, // la palabra suajili que da nombre a la empresa
  /^Explorer( Collection)?$/, // nombres de colección: marca, no se traducen
  /^Escape( Collection)?$/,
  /^Enrich( Collection)?$/,
  // --- Topónimos y nombres oficiales ---
  /^(Serengeti|Ngorongoro|Tarangire|Arusha|Zanzibar|Kilimanjaro|Manyara|Nyerere|Ruaha|Meru|Selous|Mikumi|Katavi|Mahale|Kibo|Shira|Lemosho|Machame|Maasai|Tanzania|Africa|Kenya)/i,
  /^(Lake|Mount|Mt\.?) /i,
  /^(Natural Earth|Wikimedia Commons|Creative Commons|CC BY(-SA)?[\d. ]*)/i,
  // --- Datos de contacto y enlaces ---
  /@/, // correos
  /^https?:\/\//,
  /^\+?[\d\s().–—-]+$/, // teléfonos, cifras, rangos
  /^[\d\s°'"′″.,-]+[NSEW]([\s,]+[\d\s°'"′″.,-]+[NSEW])?$/, // coordenadas
  /^(Instagram|LinkedIn|YouTube|WhatsApp|Facebook|TripAdvisor|SafariBookings|Google)$/i,
  /^(GMT|UTC)[+\-−]?\d*$/,
  // --- Códigos e identificadores ---
  /^[A-Z]{2,4}(-[A-Z0-9]+)*$/, // EN, ES, ZH-CN, MQ-260828-XXXX
  /^(EN|ES|DE|FR|RU|ZH)$/,
  // --- Términos internacionales que se dejan igual en el glosario ---
  /^safari(s)?$/i, // viene del suajili; es la misma palabra en las seis lenguas
  /^lodge(s)?$/i, // asentado en el sector en todas menos el chino, que sí lo traduce
  /^camp(s)?$/i,
  // --- Ruido tipográfico ---
  /^[\s·—–-]*$/,
];

/**
 * ¿Se acepta esta cadena idéntica al inglés dentro de `locale`?
 *
 * `dictionary` se pasa ya construido para no releer los archivos en cada
 * comprobación: son cientos por página.
 */
export function isAllowed(text, dictionary) {
  return (
    PROPER_NAMES.has(text) ||
    dictionary?.has(text) ||
    ALLOWED.some((re) => re.test(text))
  );
}
