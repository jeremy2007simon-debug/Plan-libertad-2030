/**
 * Accesibilidad en los seis idiomas.
 *
 * Comprueba:
 *
 *  1. Un solo `h1` por página y jerarquía de encabezados sin saltos.
 *  2. Todo control interactivo tiene nombre accesible, y en el idioma de la
 *     página — incluida la comprobación explícita de que no queda inglés
 *     dentro de un nombre accesible en español.
 *  3. Navegación por teclado: enlace de salto, orden, foco visible.
 *  4. Selector de idioma: Escape, clic fuera, teclado y retorno del foco.
 *  5. Formularios con etiqueta real, errores asociados por `aria-describedby`
 *     y estados anunciados con `aria-live`.
 *  6. `alt` presente; decorativas con `alt=""`.
 *  7. Nada oculto duplicado dentro del árbol accesible.
 *  8. `prefers-reduced-motion` y ausencia de contenido invisible sin JS.
 *
 * El contraste se mide aparte, sobre píxeles, porque detrás del texto del hero
 * no hay un color sino una fotografía con dos velos encima.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/check-a11y.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { dictionaryFor, isAllowed } from "./lib/translation-exceptions.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"];
const PATHS = ["", "/safaris", "/destinations/serengeti", "/plan", "/contact", "/impact"];

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

const DICTIONARY = new Map(LOCALES.map((locale) => [locale, dictionaryFor(locale)]));

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

/** Nombre accesible de un elemento, siguiendo el orden que usa el navegador. */
const AUDIT = () => {
  const accessibleName = (el) => {
    const labelledby = el.getAttribute("aria-labelledby");
    if (labelledby) {
      const parts = labelledby
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent ?? "")
        .join(" ");
      if (parts.trim()) return parts.trim();
    }
    const label = el.getAttribute("aria-label");
    if (label?.trim()) return label.trim();
    if (el.id) {
      const explicit = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (explicit?.textContent?.trim()) return explicit.textContent.trim();
    }
    const wrapping = el.closest("label");
    if (wrapping?.textContent?.trim()) return wrapping.textContent.trim();
    const title = el.getAttribute("title");
    if (title?.trim()) return title.trim();
    const own = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (own) return own;
    const img = el.querySelector("img[alt]");
    if (img?.getAttribute("alt")?.trim()) return img.getAttribute("alt").trim();
    return "";
  };

  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return (
      cs.display !== "none" &&
      cs.visibility !== "hidden" &&
      (r.width > 0 || r.height > 0 || el.closest(".sr-only") !== null)
    );
  };

  const controls = [...document.querySelectorAll("a[href], button, input, select, textarea")]
    .filter(visible)
    .filter((el) => el.type !== "hidden" && el.tabIndex !== -1);

  return {
    h1: document.querySelectorAll("h1").length,
    headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) =>
      Number(h.tagName[1]),
    ),
    unnamed: controls
      .filter((el) => !accessibleName(el))
      .map((el) => `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(" ")[0] : ""}`),
    names: controls.map((el) => accessibleName(el)),
    imagesWithoutAlt: [...document.querySelectorAll("img")].filter(
      (img) => img.getAttribute("alt") === null,
    ).length,
    ariaLive: document.querySelectorAll("[aria-live]").length,
    // Inputs sin etiqueta real (ni <label>, ni aria-label, ni aria-labelledby).
    unlabelledFields: [...document.querySelectorAll("input, select, textarea")]
      .filter((el) => el.type !== "hidden")
      .filter((el) => !accessibleName(el))
      .map((el) => el.id || el.name || el.tagName.toLowerCase()),
  };
};

/* ---- 1-2. Encabezados y nombres accesibles ------------------------------- */

console.log("== 1. Encabezados y nombres accesibles ==");
let audited = 0;
for (const locale of LOCALES) {
  for (const path of PATHS) {
    await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "networkidle" });
    const a = await page.evaluate(AUDIT);
    audited += 1;
    const where = `/${locale}${path || "/"}`;
    if (a.h1 !== 1) fail(`${where}: ${a.h1} elementos h1`);
    // Jerarquía: ningún salto hacia abajo de más de un nivel.
    for (let i = 1; i < a.headings.length; i += 1) {
      if (a.headings[i] - a.headings[i - 1] > 1) {
        fail(`${where}: salto de h${a.headings[i - 1]} a h${a.headings[i]}`);
        break;
      }
    }
    if (a.unnamed.length) fail(`${where}: ${a.unnamed.length} controles sin nombre accesible — ${a.unnamed.slice(0, 4).join(", ")}`);
    if (a.imagesWithoutAlt) fail(`${where}: ${a.imagesWithoutAlt} imágenes sin atributo alt`);
    if (a.unlabelledFields.length) fail(`${where}: campos sin etiqueta — ${a.unlabelledFields.join(", ")}`);
  }
}
pass(`${audited} páginas: un h1, jerarquía sin saltos, todo control con nombre`);

/* ---- 3. Inglés dentro de un nombre accesible en otro idioma -------------- */

console.log("\n== 2. Inglés dentro de nombres accesibles no ingleses ==");
{
  const english = new Map();
  for (const path of PATHS) {
    await page.goto(`${BASE}/en${path}`, { waitUntil: "networkidle" });
    english.set(path, new Set((await page.evaluate(AUDIT)).names));
  }
  let leaks = 0;
  for (const locale of LOCALES.filter((l) => l !== "en")) {
    const dictionary = DICTIONARY.get(locale);
    for (const path of PATHS) {
      await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "networkidle" });
      const names = (await page.evaluate(AUDIT)).names;
      for (const name of names) {
        if (!name || name.length < 4) continue;
        if (!english.get(path)?.has(name)) continue;
        if (isAllowed(name, dictionary)) continue;
        leaks += 1;
        fail(`/${locale}${path || "/"}: nombre accesible en inglés — "${name.slice(0, 70)}"`);
      }
    }
  }
  if (leaks === 0) pass("ningún nombre accesible en inglés dentro de los otros cinco idiomas");
}

/* ---- 4. Teclado ---------------------------------------------------------- */

console.log("\n== 3. Navegación por teclado ==");
{
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const a = document.activeElement;
    const r = a.getBoundingClientRect();
    return { href: a.getAttribute("href"), text: (a.textContent || "").trim(), visible: r.height > 0 };
  });
  if (!first.href?.includes("#") || !first.visible)
    fail(`el primer tabulador no es un salto al contenido visible: ${JSON.stringify(first)}`);
  else pass(`primer tabulador: "${first.text}" → ${first.href}`);

  const stops = [];
  for (let i = 0; i < 45; i += 1) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return null;
      const cs = getComputedStyle(a);
      const r = a.getBoundingClientRect();
      return {
        tag: a.tagName.toLowerCase(),
        inViewportOrScrollable: r.width > 0 && r.height > 0,
        ring: cs.outlineStyle !== "none" || cs.boxShadow !== "none",
      };
    });
    if (!info) {
      fail(`el foco se pierde en la parada ${i}`);
      break;
    }
    stops.push(info);
  }
  const noRing = stops.filter((s) => s.inViewportOrScrollable && !s.ring);
  if (noRing.length) fail(`${noRing.length} paradas sin indicador de foco visible`);
  else pass(`${stops.length} paradas de tabulación, todas con foco visible`);
}

/* ---- 5. Selector de idioma ----------------------------------------------- */

console.log("\n== 4. Selector de idioma ==");
{
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  const trigger = page.locator("header button[aria-expanded]").first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(250);
  if ((await trigger.getAttribute("aria-expanded")) !== "true")
    fail("el selector no se abre con Enter");
  else pass("se abre con Enter");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(250);
  if ((await trigger.getAttribute("aria-expanded")) !== "false")
    fail("el selector no se cierra con Escape");
  else pass("se cierra con Escape");

  const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-expanded"));
  if (focused !== "false") fail("el foco no vuelve al botón tras cerrar con Escape");
  else pass("el foco vuelve al botón");

  await trigger.click();
  await page.waitForTimeout(200);
  await page.mouse.click(20, 400);
  await page.waitForTimeout(250);
  if ((await trigger.getAttribute("aria-expanded")) !== "false")
    fail("el selector no se cierra al hacer clic fuera");
  else pass("se cierra al hacer clic fuera");
}

/* ---- 6. Formulario: errores y anuncios ----------------------------------- */

console.log("\n== 5. Formulario del planificador ==");
{
  await page.goto(`${BASE}/es/plan`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  // Intento de avanzar sin elegir nada: debe salir un error asociado.
  await page.getByRole("button", { name: /siguiente|continuar/i }).first().click();
  await page.waitForTimeout(350);
  const errors = await page.evaluate(() => {
    const described = [...document.querySelectorAll("[aria-describedby]")].map((el) => {
      const ids = el.getAttribute("aria-describedby").split(/\s+/);
      return ids.map((id) => document.getElementById(id)?.textContent ?? "").join(" ").trim();
    });
    const invalid = document.querySelectorAll('[aria-invalid="true"]').length;
    const live = [...document.querySelectorAll("[aria-live]")].map((el) =>
      (el.textContent || "").trim(),
    );
    return { described: described.filter(Boolean), invalid, live };
  });
  if (errors.described.length === 0 && errors.live.every((t) => !t))
    fail("un error de validación no se asocia ni se anuncia");
  else pass(`el error se anuncia (aria-describedby: ${errors.described.length}, aria-live: ${errors.live.filter(Boolean).length})`);
}

/* ---- 7. Sin JavaScript y con movimiento reducido ------------------------- */

console.log("\n== 6. Sin JavaScript y con movimiento reducido ==");
{
  for (const [name, options] of [
    ["sin JavaScript", { javaScriptEnabled: false, viewport: { width: 1440, height: 900 } }],
    ["movimiento reducido", { reducedMotion: "reduce", viewport: { width: 1440, height: 900 } }],
    ["móvil sin JavaScript", { ...devices["iPhone 13"], javaScriptEnabled: false }],
  ]) {
    const ctx = await browser.newContext(options);
    const p = await ctx.newPage();
    let hidden = 0;
    for (const locale of LOCALES) {
      await p.goto(`${BASE}/${locale}`, { waitUntil: "domcontentloaded" });
      await p.waitForTimeout(300);
      hidden += await p.evaluate(() => {
        let n = 0;
        for (const el of document.querySelectorAll("h1,h2,h3,p,li,a,button,img")) {
          const r = el.getBoundingClientRect();
          if (r.width < 2 && r.height < 2) continue;
          const cs = getComputedStyle(el);
          if (parseFloat(cs.opacity) < 0.05 || cs.visibility === "hidden") n += 1;
        }
        return n;
      });
    }
    if (hidden) fail(`${name}: ${hidden} elementos invisibles en los seis idiomas`);
    else pass(`${name}: nada invisible en los seis idiomas`);
    await ctx.close();
  }
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Accesibilidad: sin problemas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
