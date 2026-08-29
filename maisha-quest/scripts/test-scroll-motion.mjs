/**
 * Las entradas al hacer scroll: que existan, que entren una vez y que nunca
 * dejen texto invisible.
 *
 * Lo que comprueba
 * ----------------
 *  1. Los títulos de sección se parten en líneas, y el corte sale del
 *     diccionario: en los seis idiomas, y con cortes distintos en cada uno.
 *  2. Antes de entrar en pantalla, una línea está oculta; después, visible.
 *  3. Al volver a subir NO se vuelve a ocultar: se anima una sola vez.
 *  4. Al final del recorrido no queda ni un bloque invisible en ninguno de
 *     los seis idiomas. Es la comprobación que de verdad importa: una
 *     animación que no dispara deja texto en blanco.
 *  5. Con movimiento reducido y sin JavaScript, todo visible desde el principio.
 *  6. En móvil el recorrido es más corto que en escritorio.
 *
 * Uso
 * ---
 *   node scripts/test-scroll-motion.mjs [http://127.0.0.1:3000]
 */

import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"];

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

/** Recorre la página entera despacio, como haría una persona. */
const recorrer = async (page) => {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 40)));
    }
  });
  // Margen de sobra para el barrido de seguridad (260 ms), el retardo máximo
  // de un escalonado (600 ms) y la transición más lenta (1,05 s de la
  // fotografía). Medir antes contaría como «invisible» algo que solo está a
  // mitad de entrar.
  await page.waitForTimeout(2600);
};

/* ---- 1. Los cortes salen del diccionario ---------------------------------- */

console.log("\n== 1. Títulos partidos en líneas, por idioma ==");
const cortes = new Map();
for (const locale of LOCALES) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle" });

  const titulos = await page.evaluate(() =>
    [...document.querySelectorAll("main h2, main h1")]
      .map((h) => [...h.querySelectorAll("[data-title-line]")].map((s) => s.textContent.trim()))
      .filter((lineas) => lineas.length > 0),
  );

  const partidos = titulos.filter((l) => l.length > 1);
  if (titulos.length === 0) fail(`${locale}: ningún título usa el revelado por líneas`);
  else if (partidos.length === 0)
    fail(`${locale}: ningún título tiene corte editorial en el diccionario`);
  else
    pass(
      `${locale}: ${titulos.length} títulos por líneas, ${partidos.length} con corte propio ` +
        `(p. ej. «${partidos[0].join(" / ")}»)`,
    );
  cortes.set(locale, partidos.map((l) => l.join("|")).join("·"));
  await context.close();
}

// Los cortes de dos idiomas no pueden ser el mismo texto: eso significaría que
// se están partiendo por posición y no por decisión editorial.
const distintos = new Set(cortes.values()).size;
if (distintos < LOCALES.length)
  fail(`solo hay ${distintos} juegos de cortes distintos para ${LOCALES.length} idiomas`);
else pass("cada idioma tiene sus propios cortes");

/* ---- 2-3. Entra una vez y no se deshace ----------------------------------- */

console.log("\n== 2. Entra al llegar, y no se repite ==");
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });

  const medir = () =>
    page.evaluate(() => {
      // Un bloque bien abajo, que no ha entrado nunca en pantalla.
      const bloques = [...document.querySelectorAll("main [data-reveal]")];
      const lejano = bloques[bloques.length - 2];
      if (!lejano) return null;
      const cs = getComputedStyle(lejano);
      return {
        estado: lejano.getAttribute("data-reveal"),
        opacidad: Number(cs.opacity),
        y: cs.transform,
      };
    });

  const antes = await medir();
  if (!antes) fail("no hay bloques con data-reveal");
  else if (antes.opacidad > 0.05)
    fail(`un bloque lejano ya está visible antes de llegar (opacidad ${antes.opacidad})`);
  else pass("un bloque que aún no ha entrado está oculto");

  await recorrer(page);
  const despues = await medir();
  if (despues.opacidad < 0.99) fail(`tras llegar sigue a opacidad ${despues.opacidad}`);
  else pass("al llegar entra del todo");

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const alVolver = await medir();
  if (alVolver.opacidad < 0.99) fail("al subir se vuelve a ocultar: se anima más de una vez");
  else pass("al subir no se vuelve a ocultar");
  await context.close();
}

/* ---- 4. Nada queda invisible --------------------------------------------- */

console.log("\n== 3. Al final del recorrido no queda nada invisible ==");
for (const locale of LOCALES) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle" });
  await recorrer(page);

  const invisibles = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        "[data-reveal],[data-title-line],[data-eyebrow],[data-lede],[data-image-reveal],[data-line]",
      ),
    ]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return false;
        return Number(getComputedStyle(el).opacity) < 0.9;
      })
      .map((el) => (el.textContent || el.tagName).replace(/\s+/g, " ").trim().slice(0, 40)),
  );

  if (invisibles.length)
    fail(`${locale}: ${invisibles.length} elementos siguen invisibles: ${invisibles.slice(0, 3).join(" · ")}`);
  else pass(`${locale}: nada queda invisible`);
  await context.close();
}

/* ---- 5. Movimiento reducido y sin JavaScript ------------------------------ */

console.log("\n== 4. Movimiento reducido y sin JavaScript ==");
for (const modo of ["reducido", "sin-js"]) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ...(modo === "reducido" ? { reducedMotion: "reduce" } : { javaScriptEnabled: false }),
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  const ocultos = await page.evaluate(() =>
    [...document.querySelectorAll("[data-reveal],[data-title-line],[data-lede],[data-eyebrow]")]
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.9)
      .length,
  );
  if (ocultos) fail(`${modo}: ${ocultos} elementos nacen invisibles`);
  else pass(`${modo}: todo visible desde el primer momento`);
  await context.close();
}

/* ---- 6. Móvil: recorrido más corto ---------------------------------------- */

console.log("\n== 5. En móvil el movimiento es más contenido ==");
{
  const leer = async (width) => {
    const context = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await context.newPage();
    await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
    const v = await page.evaluate(() => {
      const el = document.querySelector("main [data-reveal]:not([data-reveal='in'])");
      if (!el) return null;
      const cs = getComputedStyle(el);
      const m = /matrix\(1, 0, 0, 1, [\d.-]+, ([\d.-]+)\)/.exec(cs.transform);
      return { y: m ? Math.abs(Number(m[1])) : null, ms: cs.transitionDuration };
    });
    await context.close();
    return v;
  };
  const movil = await leer(390);
  const escritorio = await leer(1440);
  if (!movil || !escritorio || movil.y === null || escritorio.y === null)
    fail("no se pudo medir el recorrido");
  else if (movil.y >= escritorio.y)
    fail(`en móvil el recorrido es ${movil.y} px y en escritorio ${escritorio.y} px`);
  else
    pass(
      `recorrido ${escritorio.y} px en escritorio y ${movil.y} px en móvil ` +
        `(${escritorio.ms} → ${movil.ms})`,
    );
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Entradas al hacer scroll: correctas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
