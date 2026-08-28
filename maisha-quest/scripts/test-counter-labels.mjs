/**
 * Los cuatro nombres accesibles de los contadores, en los seis idiomas.
 *
 * Qué falló dos veces
 * -------------------
 * Primero estaban escritos en el componente como `One fewer ${label}`, así que
 * un lector de pantalla en español anunciaba «One fewer adultos». Al pasarlos
 * al diccionario se quedaron como plantilla con un hueco —«Un {label} menos»—
 * y el resultado seguía sin ser gramatical: «Un adultos menos».
 *
 * Esta prueba lee los nombres accesibles REALES de los cuatro botones en cada
 * idioma, contra el navegador, y comprueba tres cosas:
 *
 *  1. Que coinciden exactamente con lo que declara el diccionario.
 *  2. Que los cuatro son distintos entre sí: si dos coinciden, es que alguno
 *     se está componiendo a partir del otro.
 *  3. Que ninguno arrastra un hueco sin sustituir (`{label}`) ni una palabra
 *     de la lista de fórmulas inglesas que ya se colaron una vez.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-counter-labels.mjs [http://127.0.0.1:3000]
 */

import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { readFileSync } from "node:fs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"];
const KEYS = ["removeAdult", "addAdult", "removeChild", "addChild"];

/** Fórmulas que ya se colaron alguna vez y no deben volver. */
const FORBIDDEN = [/\{label\}/i, /one fewer/i, /one more/i, /\bun [a-záéíóúñ]+s (menos|más)\b/i];

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

/** Lo que declara el diccionario de ese idioma. */
function declared(locale) {
  const source = readFileSync(
    new URL(`../src/i18n/messages/${locale}.ts`, import.meta.url),
    "utf8",
  );
  const read = (key) => new RegExp(`\\b${key}: "([^"]+)"`).exec(source)?.[1];
  const out = {};
  for (const key of KEYS) {
    const value = read(key);
    if (value) out[key] = value;
  }
  // El rótulo del botón que avanza sale del propio diccionario. Adivinarlo con
  // una expresión regular multilingüe fallaba en español, ruso y chino, y la
  // prueba no llegaba al paso de viajeros. Es `planner.continue`, no
  // `a11y.next`: el segundo es el del carrusel.
  out.__next = read("continue");
  return out;
}

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

for (const locale of LOCALES) {
  const expected = declared(locale);
  const missing = KEYS.filter((k) => !expected[k]);
  if (missing.length) {
    fail(`${locale}: el diccionario no declara ${missing.join(", ")}`);
    continue;
  }

  await page.goto(`${BASE}/${locale}/plan`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  /** Nombres accesibles de los botones que hay DENTRO del formulario. */
  const plannerLabels = () =>
    page.evaluate(() =>
      [...document.querySelectorAll("[data-planner-step] button[aria-label]")]
        .map((b) => b.getAttribute("aria-label"))
        .filter(Boolean),
    );

  // Los contadores están en el paso de viajeros. Se avanza eligiendo la
  // primera opción de cada paso anterior hasta que aparezcan, en lugar de
  // contar pasos: si mañana se añade uno, la prueba sigue valiendo.
  let labels = await plannerLabels();
  for (let step = 0; step < 8 && labels.length < 4; step += 1) {
    if (await page.locator("input[type=radio]").count())
      await page.locator("input[type=radio]").first().check().catch(() => {});
    // El paso de fechas se satisface con la casilla de flexibilidad.
    const flexible = page.locator('input[type="checkbox"]').first();
    if (await flexible.count()) await flexible.check().catch(() => {});
    const next = page.getByRole("button", { name: expected.__next, exact: true }).first();
    if ((await next.count()) === 0) break;
    await next.click().catch(() => {});
    await page.waitForTimeout(400);
    labels = await plannerLabels();
  }

  const found = KEYS.map((k) => expected[k]).filter((v) => labels.includes(v));
  if (found.length !== KEYS.length) {
    const absent = KEYS.filter((k) => !labels.includes(expected[k]));
    fail(
      `${locale}: no se encuentran en la página ${absent.map((k) => `"${expected[k]}"`).join(", ")}` +
        ` — nombres presentes: ${labels.slice(0, 8).join(" | ")}`,
    );
    continue;
  }

  const unique = new Set(KEYS.map((k) => expected[k]));
  if (unique.size !== KEYS.length) {
    fail(`${locale}: dos de los cuatro nombres son idénticos`);
    continue;
  }

  const bad = KEYS.filter((k) => FORBIDDEN.some((re) => re.test(expected[k])));
  if (bad.length) {
    fail(`${locale}: fórmula mal formada en ${bad.map((k) => `${k}="${expected[k]}"`).join(", ")}`);
    continue;
  }

  pass(`${locale}: ${KEYS.map((k) => `«${expected[k]}»`).join(" · ")}`);
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Nombres accesibles de los contadores: correctos en los seis idiomas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
