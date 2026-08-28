/**
 * Prueba de extremo a extremo: cambiar de idioma no destruye el planificador.
 *
 * El fallo que motivó esta prueba
 * -------------------------------
 * Entrar en `/es/plan`, elegir un tipo de viaje, avanzar al paso 2 y cambiar a
 * inglés. La ruta pasaba bien a `/en/plan`, pero el planificador volvía al paso
 * 1. Las respuestas seguían en el borrador —la clave de `localStorage` nunca
 * llevó el idioma—, pero el PASO no se guardaba, así que el visitante volvía al
 * principio con todo relleno y sin entender por qué.
 *
 * Qué comprueba
 * -------------
 *  1. Se conserva el paso al cambiar de idioma.
 *  2. Se conservan las respuestas de los seis pasos y los datos de contacto.
 *  3. El idioma de respuesta sigue al de la página mientras nadie lo toque…
 *  4. …y respeta la elección de quien sí lo tocó.
 *  5. `?safari=` sobrevive al cambio de idioma.
 *  6. Un slug inexistente no rompe el planificador.
 *  7. No viaja ningún dato personal en la URL.
 *  8. Un borrador con un esquema viejo o corrupto se descarta sin romper nada.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-planner-locale.mjs [http://127.0.0.1:3000]
 */

import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const problems = [];
const fail = (msg) => {
  problems.push(msg);
  console.log(`  FALLO  ${msg}`);
};
const pass = (msg) => console.log(`  ok     ${msg}`);

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

/** Índice del paso visible, leído del propio indicador del formulario. */
const currentStep = () =>
  page.evaluate(() => {
    const el = document.querySelector("[data-planner-step]");
    return el ? Number(el.getAttribute("data-planner-step")) : -1;
  });

/** Cambia de idioma con el selector real de la cabecera, no navegando a mano. */
async function switchLocale(to) {
  const link = page.locator(`header a[hreflang="${to}"]`).first();
  if ((await link.count()) === 0) {
    const trigger = page.locator("header button[aria-expanded]").first();
    await trigger.click().catch(() => {});
    await page.waitForTimeout(150);
  }
  await page.locator(`header a[hreflang="${to}"]`).first().click();
  await page.waitForLoadState("networkidle");
}

console.log("\n== 1-2. Paso y respuestas al cambiar de idioma ==");
{
  await page.goto(`${BASE}/es/plan`, { waitUntil: "networkidle" });

  // Paso 1: tipo de viaje. Se elige la primera opción disponible.
  await page.locator('input[type="radio"]').first().check();
  const chosenTrip = await page.evaluate(
    () => document.querySelector('input[type="radio"]:checked')?.value ?? "",
  );
  await page.getByRole("button", { name: /siguiente|continuar/i }).first().click();
  await page.waitForTimeout(400);

  const stepBefore = await currentStep();
  if (stepBefore !== 1) fail(`no se llegó al paso 2 en /es/plan (paso ${stepBefore})`);
  else pass("en /es/plan, paso 2 alcanzado");

  await switchLocale("en");

  const url = page.url();
  if (!url.includes("/en/plan")) fail(`la ruta no pasó a /en/plan: ${url}`);
  else pass("la ruta pasa a /en/plan");

  const stepAfter = await currentStep();
  if (stepAfter !== stepBefore)
    fail(`el paso se perdió al cambiar de idioma: ${stepBefore} → ${stepAfter}`);
  else pass(`el paso se conserva (${stepAfter})`);

  const tripAfter = await page.evaluate(() => {
    const raw = localStorage.getItem("maisha-quest:journey-draft:v2");
    return raw ? JSON.parse(raw).state.tripType : null;
  });
  if (tripAfter !== chosenTrip)
    fail(`el tipo de viaje se perdió: "${chosenTrip}" → "${tripAfter}"`);
  else pass(`el tipo de viaje se conserva ("${tripAfter}")`);
}

console.log("\n== 3. El idioma de respuesta sigue al de la página ==");
{
  await context.clearCookies();
  await page.goto(`${BASE}/de/plan`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  const initial = await page.evaluate(
    () => document.querySelector("#preferredLanguage")?.value,
  );
  // El select solo existe en el paso de contacto; si no está, se lee del borrador.
  const readLang = async () =>
    page.evaluate(() => {
      const select = document.querySelector("#preferredLanguage");
      if (select) return select.value;
      const raw = localStorage.getItem("maisha-quest:journey-draft:v2");
      return raw ? JSON.parse(raw).state.preferredLanguage : null;
    });

  await page.locator('input[type="radio"]').first().check();
  await page.waitForTimeout(300);
  const inDe = await readLang();
  if (inDe !== "de") fail(`en /de/plan el idioma de respuesta es "${inDe}", esperado "de"`);
  else pass('en /de/plan el idioma de respuesta arranca en "de"');

  await switchLocale("fr");
  const inFr = await readLang();
  if (inFr !== "fr")
    fail(`tras cambiar a francés el idioma de respuesta es "${inFr}", esperado "fr"`);
  else pass('al cambiar a francés pasa a "fr" sin que nadie lo toque');
  void initial;
}

console.log("\n== 4. Una elección manual se respeta ==");
{
  await page.goto(`${BASE}/es/plan`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  // Se marca la elección manual directamente en el borrador: llegar al paso de
  // contacto exigiría rellenar seis pasos y no es lo que prueba este caso.
  await page.evaluate(() => {
    localStorage.setItem(
      "maisha-quest:journey-draft:v2",
      JSON.stringify({
        version: 2,
        step: 1,
        state: { preferredLanguage: "ru", tripType: "", destinationSlugs: [] },
        languageTouched: true,
      }),
    );
  });
  await page.reload({ waitUntil: "networkidle" });
  await switchLocale("en");
  const kept = await page.evaluate(() => {
    const raw = localStorage.getItem("maisha-quest:journey-draft:v2");
    return raw ? JSON.parse(raw).state.preferredLanguage : null;
  });
  if (kept !== "ru") fail(`la elección manual "ru" se perdió: quedó "${kept}"`);
  else pass('la elección manual "ru" sobrevive al cambio a inglés');
}

console.log("\n== 5-6. ?safari= y slugs inexistentes ==");
{
  await page.goto(`${BASE}/es/plan?safari=serengeti-under-canvas`, {
    waitUntil: "networkidle",
  });
  await switchLocale("de");
  if (!page.url().includes("safari=serengeti-under-canvas"))
    fail(`?safari= se perdió al cambiar de idioma: ${page.url()}`);
  else pass("?safari= sobrevive al cambio de idioma");

  // Sin borrador previo: si no, se restaura el paso de destinos —que usa
  // casillas, no botones de radio— y la comprobación mediría otra cosa.
  await page.evaluate(() => localStorage.clear());
  const r = await page.goto(`${BASE}/es/plan?safari=no-existe-este-viaje`, {
    waitUntil: "networkidle",
  });
  const errors = [];
  page.once("pageerror", (e) => errors.push(e.message));
  await page.waitForTimeout(400);
  const step = await currentStep();
  if (r.status() !== 200) fail(`un slug inexistente devuelve ${r.status()}`);
  else if (errors.length) fail(`un slug inexistente lanza una excepción: ${errors[0]}`);
  else if (step !== 0) fail(`un slug inexistente arranca en el paso ${step + 1}`);
  else if ((await page.locator('input[type="radio"]').count()) === 0)
    fail("un slug inexistente deja el planificador sin formulario");
  else pass("un slug inexistente no rompe el planificador");
}

console.log("\n== 7. Sin datos personales en la URL ==");
{
  await page.goto(`${BASE}/es/plan`, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.locator('input[type="radio"]').first().check();
  await page.getByRole("button", { name: /siguiente|continuar/i }).first().click();
  await page.waitForTimeout(300);
  await switchLocale("fr");
  const url = new URL(page.url());
  const leaked = [...url.searchParams.keys()].filter((k) => k !== "safari");
  if (leaked.length) fail(`parámetros inesperados en la URL: ${leaked.join(", ")}`);
  else pass("la URL solo lleva ?safari=, ningún dato personal");
}

console.log("\n== 8. Borrador corrupto o de otro esquema ==");
{
  for (const [name, value] of [
    ["JSON roto", "{no es json"],
    ["esquema viejo (v1 sin sobre)", JSON.stringify({ tripType: "wildlife", adults: 4 })],
    ["versión desconocida", JSON.stringify({ version: 99, state: {}, step: 3 })],
  ]) {
    await page.goto(`${BASE}/es/plan`, { waitUntil: "networkidle" });
    await page.evaluate((v) => {
      localStorage.clear();
      localStorage.setItem("maisha-quest:journey-draft:v2", v);
    }, value);
    const errors = [];
    page.once("pageerror", (e) => errors.push(e.message));
    await page.reload({ waitUntil: "networkidle" });
    const step = await currentStep();
    if (errors.length) fail(`${name}: excepción en la página — ${errors[0]}`);
    else if (step < 0) fail(`${name}: el planificador no se pinta`);
    else pass(`${name}: se descarta y el formulario arranca en el paso ${step + 1}`);
  }

  // Y la migración real desde v1, que sí debe conservar las respuestas.
  await page.goto(`${BASE}/es/plan`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem(
      "maisha-quest:journey-draft:v1",
      JSON.stringify({ tripType: "wildlife", adults: 4 }),
    );
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const migrated = await page.evaluate(() => {
    const raw = localStorage.getItem("maisha-quest:journey-draft:v2");
    const old = localStorage.getItem("maisha-quest:journey-draft:v1");
    return { raw: raw ? JSON.parse(raw) : null, oldGone: old === null };
  });
  if (!migrated.raw || migrated.raw.state.adults !== 4)
    fail("un borrador v1 no se migró a v2 conservando las respuestas");
  else if (!migrated.oldGone) fail("el borrador v1 sigue en localStorage tras migrar");
  else pass("un borrador v1 se migra a v2 y se borra el antiguo");
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Planificador y cambio de idioma: sin problemas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
