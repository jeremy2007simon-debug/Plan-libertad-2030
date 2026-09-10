/**
 * Detector de inglés residual en las cinco lenguas no inglesas.
 *
 * Qué hace
 * --------
 * Rastrea las dieciocho rutas principales en `es`, `de`, `fr`, `ru` y `zh-CN`
 * y compara CADA cadena visible y CADA nombre accesible con la misma cadena en
 * `/en`. Si un texto aparece palabra por palabra igual que en inglés y no está
 * en la lista de excepciones, es que se ha escrito a mano dentro de un
 * componente en vez de salir del diccionario.
 *
 * Comparar contra el inglés real es la única forma fiable de encontrarlos: un
 * diccionario incompleto no falla en compilación —los diccionarios sí están
 * tipados contra el inglés—, pero una cadena escrita a mano dentro de un JSX
 * no pasa por el diccionario y no la ve nadie.
 *
 * Qué NO marca
 * ------------
 * Nombres propios, marca, correos, URLs, redes, cifras, códigos y el puñado de
 * términos internacionales que se dejan igual a propósito. La lista está abajo
 * y es explícita: cada excepción dice por qué lo es.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/check-untranslated.mjs [http://127.0.0.1:3000]
 */

import { readFileSync } from "node:fs";

import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

import { dictionaryFor, isAllowed } from "./lib/translation-exceptions.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["es", "de", "fr", "ru", "zh-CN"];

/** Las rutas que pide la revisión, más las cuatro legales. */
const PATHS = [
  "",
  "/safaris",
  "/safaris/safari-zanzibar-escape",
  "/destinations",
  "/destinations/serengeti",
  "/experiences",
  "/about",
  "/about/team",
  "/impact",
  "/journal",
  "/contact",
  "/faq",
  "/plan",
  "/legal/terms",
  "/legal/privacy",
  "/legal/cookies",
  "/legal/credits",
];

/** Texto visible y nombre accesible de cada nodo con contenido propio. */
const HARVEST = () => {
  const seen = new Set();
  const out = [];
  const push = (kind, value, where) => {
    const text = (value || "").replace(/\s+/g, " ").trim();
    if (text.length < 3) return;
    const id = kind + "\u0000" + text;
    if (seen.has(id)) return;
    seen.add(id);
    out.push({ kind, text, where });
  };

  // Texto visible: solo el nodo que lo contiene directamente, para no repetir
  // el contenido de toda la página en cada ancestro.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement;
    if (!el || el.closest("script,style,noscript")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    push("texto", n.nodeValue, el.tagName.toLowerCase());
  }

  // Nombres accesibles y textos de asistencia.
  for (const el of document.querySelectorAll(
    "[aria-label],[title],[placeholder],[alt],[aria-describedby],[aria-live]",
  )) {
    const tag = el.tagName.toLowerCase();
    push("aria-label", el.getAttribute("aria-label"), tag);
    push("title", el.getAttribute("title"), tag);
    push("placeholder", el.getAttribute("placeholder"), tag);
    if (el.getAttribute("alt")) push("alt", el.getAttribute("alt"), tag);
  }
  return out;
};

const DICTIONARY = new Map(LOCALES.map((locale) => [locale, dictionaryFor(locale)]));

/**
 * Paso previo, sin navegador: la lista negra contra los diccionarios.
 *
 * El rastreo de abajo solo ve lo que se pinta al cargar la página. Un
 * marcador de posición del paso 6 del planificador, o el mensaje de un campo
 * obligatorio, solo aparecen si alguien interactúa. Como todos esos textos
 * salen del diccionario, se comprueban aquí directamente.
 *
 * Se miran los VALORES, no los comentarios: los comentarios de estos archivos
 * están en castellano y citan a propósito las fórmulas que se corrigieron.
 */
function forbiddenInDictionaries() {
  const found = [];
  for (const locale of LOCALES) {
    const file = new URL(`../src/i18n/messages/${locale}.ts`, import.meta.url);
    const code = readFileSync(file, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")   // comentarios de bloque
      .replace(/^\s*\/\/.*$/gm, "");      // comentarios de línea
    for (const [, value] of code.matchAll(/"((?:[^"\\]|\\.)*)"/g)) {
      const term = FORBIDDEN_TERMS.find((re) => re.test(value));
      if (term) found.push({ locale, term: String(term), text: value });
    }
  }
  return found;
}

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

/**
 * Lista negra de la revisión: fórmulas en inglés que NO pueden aparecer en una
 * página que no sea la inglesa, ni siquiera aunque el inglés de esa misma ruta
 * no tenga esa cadena.
 *
 * Es una comprobación distinta a la de arriba, y por eso va aparte: la de
 * arriba encuentra lo que coincide con el inglés de la MISMA ruta; esta
 * encuentra lo que se cuela desde cualquier parte —un formateador de fechas
 * con `en-US`, un mensaje de validación del navegador, un `aria-label` escrito
 * a mano— aunque el inglés de esa ruta no lo tenga.
 */
const FORBIDDEN_TERMS = [
  /\bMonday\b/i,
  /\bSaturday\b/i,
  /\bSample itinerary\b/i,
  /\bI agree\b/i,
  /\bOne fewer\b/i,
  /\bOne more\b/i,
  /\bSend\b/i,
  /\bRequired\b/i,
  /\bContinue\b/i,
  /\bBack\b/i,
];

/** Los mismos términos, en el orden en que los pide la revisión. */
const FORBIDDEN_NAMES = [
  "Monday",
  "Saturday",
  "Sample itinerary",
  "I agree",
  "One fewer",
  "One more",
  "Send",
  "Required",
  "Continue",
  "Back",
];

const enDiccionario = forbiddenInDictionaries();
if (enDiccionario.length === 0) {
  console.log("Diccionarios: ninguna fórmula de la lista negra en los cinco idiomas.");
} else {
  console.log(`\n${enDiccionario.length} fórmulas de la lista negra dentro de un diccionario:\n`);
  for (const f of enDiccionario) {
    console.log(`  [${f.locale}] ${f.term} · ${f.text.slice(0, 120)}`);
  }
}

const findings = [];
const forbidden = [];
let checked = 0;

for (const path of PATHS) {
  const response = await page.goto(`${BASE}/en${path}`, { waitUntil: "networkidle" });
  if (!response || response.status() !== 200) {
    findings.push({ locale: "en", path, kind: "ruta", text: `HTTP ${response?.status()}` });
    continue;
  }
  const english = new Map(
    (await page.evaluate(HARVEST)).map((item) => [item.kind + "\u0000" + item.text, item]),
  );

  for (const locale of LOCALES) {
    const r = await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "networkidle" });
    checked += 1;
    if (!r || r.status() !== 200) {
      findings.push({ locale, path, kind: "ruta", text: `HTTP ${r?.status()}` });
      continue;
    }
    for (const item of await page.evaluate(HARVEST)) {
      const key = item.kind + "\u0000" + item.text;
      const banned = FORBIDDEN_TERMS.find((re) => re.test(item.text));
      if (banned && !isAllowed(item.text, DICTIONARY.get(locale))) {
        forbidden.push({ locale, path: path || "/", term: String(banned), ...item });
      }
      if (!english.has(key)) continue; // distinto del inglés: traducido
      if (isAllowed(item.text, DICTIONARY.get(locale))) continue;
      findings.push({ locale, path: path || "/", ...item });
    }
  }
}

await browser.close();

const byLocale = new Map();
for (const f of findings) {
  if (!byLocale.has(f.locale)) byLocale.set(f.locale, []);
  byLocale.get(f.locale).push(f);
}

console.log(`Páginas comprobadas: ${checked} (${PATHS.length} rutas × ${LOCALES.length} idiomas)`);

if (forbidden.length === 0) {
  console.log(
    `Lista negra (${FORBIDDEN_NAMES.length} fórmulas: ${FORBIDDEN_NAMES.join(", ")}): ninguna aparece.`,
  );
} else {
  console.log(`\n${forbidden.length} apariciones de la lista negra:\n`);
  for (const f of forbidden) {
    console.log(`  [${f.locale}] ${f.path} · ${f.term} · [${f.kind}] ${f.text.slice(0, 120)}`);
  }
}

if (findings.length === 0 && forbidden.length === 0 && enDiccionario.length === 0) {
  console.log("Sin texto en inglés dentro de los otros idiomas.");
  process.exit(0);
}
if (findings.length === 0) process.exit(1);

console.log(`\n${findings.length} cadenas en inglés dentro de otro idioma:\n`);
for (const [locale, items] of byLocale) {
  console.log(`### ${locale} (${items.length})`);
  const byPath = new Map();
  for (const i of items) {
    if (!byPath.has(i.path)) byPath.set(i.path, []);
    byPath.get(i.path).push(i);
  }
  for (const [path, list] of byPath) {
    console.log(`  ${path}`);
    for (const i of list) console.log(`    [${i.kind}] ${i.text.slice(0, 120)}`);
  }
}
process.exit(1);
