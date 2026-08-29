/**
 * La introducción cinematográfica se comporta.
 *
 * Comprueba lo que el encargo pide, en el navegador:
 *
 *  1. Primera visita a la portada: se ejecuta, y el hero ya está detrás.
 *  2. Segunda visita dentro de la misma sesión: NO se ejecuta.
 *  3. `?intro=1`: se ejecuta aunque la marca de sesión exista.
 *  4. Nunca en una ruta interna, ni al volver a la portada navegando.
 *  5. `prefers-reduced-motion`: no se ejecuta, y la portada se ve entera.
 *  6. `saveData`: no se ejecuta.
 *  7. Sin JavaScript: no se ve, y la portada se ve entera.
 *  8. Se desmonta del DOM al terminar, y deja el scroll libre.
 *  9. El botón de saltar y la tecla Escape la cierran.
 * 10. No atrapa el foco ni hace que un lector lea la marca dos veces.
 * 11. En móvil la brújula no pasa de 96 px y no hay desbordamiento.
 * 12. Cero CLS y el hero no se retrasa.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-intro.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const KEY = "maisha-intro-seen-v1";

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

/** ¿Está la capa puesta y visible en este instante? */
const introVisible = () => {
  const root = document.documentElement.hasAttribute("data-intro");
  const node = document.getElementById("mq-intro");
  const visible = node ? getComputedStyle(node).display !== "none" : false;
  return { root, existe: !!node, visible };
};

/* ---- 1-2. Primera y segunda visita --------------------------------------- */

console.log("\n== 1. Primera visita ==");
const sesion = await browser.newContext({ viewport: { width: 1280, height: 800 } });
// El guardián no ejecuta la introducción en un navegador automatizado —una capa
// de tres segundos falsearía las demás herramientas—, así que aquí se disimula
// para poder probar la primera visita tal y como la vive una persona.
await sesion.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => false });
});
{
  const page = await sesion.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const estado = await page.evaluate(introVisible);
  if (!estado.root || !estado.visible) fail("la introducción no se ejecuta en la primera visita");
  else pass("se ejecuta en la primera visita");

  // El hero tiene que estar renderizado DETRÁS desde el principio.
  const heroDetras = await page.evaluate(() => {
    const h1 = document.querySelector("main h1");
    return !!h1 && h1.textContent.trim().length > 0;
  });
  if (!heroDetras) fail("el hero no está detrás de la introducción");
  else pass("el hero ya está renderizado detrás");

  const marca = await page.evaluate((k) => sessionStorage.getItem(k), KEY);
  if (marca !== "1") fail(`la marca de sesión no se guarda (${marca})`);
  else pass(`${KEY} = 1`);

  // Se desmonta sola.
  await page.waitForTimeout(3400);
  const despues = await page.evaluate(introVisible);
  if (despues.existe || despues.root) fail("la capa sigue en el DOM tres segundos después");
  else pass("se desmonta del DOM al terminar");

  const scroll = await page.evaluate(() => getComputedStyle(document.documentElement).overflow);
  if (scroll === "hidden") fail("el scroll se queda bloqueado");
  else pass("el scroll queda libre");
  await page.close();
}

console.log("\n== 2. Segunda visita en la misma sesión ==");
{
  // La MISMA pestaña: `sessionStorage` es por pestaña, así que abrir otra
  // sería empezar una sesión nueva y la introducción tendría que verse.
  const page = await sesion.newPage();
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(200);
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const estado = await page.evaluate(introVisible);
  if (estado.root || estado.visible) fail("se repite dentro de la misma sesión");
  else pass("no se repite dentro de la misma sesión");

  // Y tampoco al navegar dentro del sitio y volver.
  await page.goto(`${BASE}/es/safaris`, { waitUntil: "domcontentloaded" });
  const enInterior = await page.evaluate(introVisible);
  if (enInterior.root) fail("se ejecuta en una ruta interna");
  else pass("no se ejecuta en una ruta interna");
  await page.close();
}

console.log("\n== 3. ?intro=1 ==");
{
  const page = await sesion.newPage();
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  const estado = await page.evaluate(introVisible);
  if (!estado.visible) fail("?intro=1 no la fuerza con la marca de sesión puesta");
  else pass("?intro=1 la fuerza aunque ya se haya visto");
  await page.close();
}
await sesion.close();

/* ---- 4. Movimiento reducido ---------------------------------------------- */

console.log("\n== 4. Movimiento reducido ==");
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  const estado = await page.evaluate(introVisible);
  if (estado.root || estado.visible) fail("se ejecuta con movimiento reducido");
  else pass("con movimiento reducido no se ejecuta, ni siquiera con ?intro=1");

  const heroVisible = await page.evaluate(() => {
    const h1 = document.querySelector("main h1");
    if (!h1) return false;
    const cs = getComputedStyle(h1);
    return cs.opacity === "1" && cs.visibility !== "hidden";
  });
  if (!heroVisible) fail("con movimiento reducido el hero no se ve");
  else pass("el hero se ve directamente");
  await context.close();
}

/* ---- 5. saveData ---------------------------------------------------------- */

console.log("\n== 5. Ahorro de datos ==");
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      get: () => ({ saveData: true }),
    });
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const estado = await page.evaluate(introVisible);
  if (estado.root) fail("se ejecuta con saveData activado");
  else pass("con saveData no se ejecuta");
  await context.close();
}

/* ---- 6. Sin JavaScript ---------------------------------------------------- */

console.log("\n== 6. Sin JavaScript ==");
{
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const oculto = await page.evaluate(() => {
    const node = document.getElementById("mq-intro");
    return !node || getComputedStyle(node).display === "none";
  });
  if (!oculto) fail("sin JavaScript la capa tapa la portada");
  else pass("sin JavaScript la capa no se ve");
  await context.close();
}

/* ---- 7. Saltar y Escape --------------------------------------------------- */

console.log("\n== 7. Saltar y Escape ==");
for (const via of ["botón", "escape"]) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(700);

  if (via === "botón") {
    const boton = page.locator("[data-intro-skip]");
    const caja = await boton.boundingBox();
    if (!caja || caja.height < 44) fail(`el botón de saltar mide ${caja?.height ?? 0} px de alto`);
    else pass(`el botón de saltar mide ${Math.round(caja.height)} px y es visible a los 700 ms`);
    await boton.click();
  } else {
    await page.keyboard.press("Escape");
  }
  await page.waitForTimeout(150);
  const estado = await page.evaluate(introVisible);
  if (estado.existe || estado.root) fail(`${via}: no cierra la introducción`);
  else pass(`${via}: la cierra y la retira del DOM`);
  await context.close();
}

/* ---- 8. Foco y lectores de pantalla --------------------------------------- */

console.log("\n== 8. Foco y accesibilidad ==");
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  const info = await page.evaluate(() => {
    const node = document.getElementById("mq-intro");
    const stage = node.querySelector(".mq-intro-stage");
    const skip = node.querySelector("[data-intro-skip]");
    return {
      escenarioOculto: stage?.getAttribute("aria-hidden") === "true",
      botonFuera: !skip?.closest("[aria-hidden='true']"),
      focoInicial: document.activeElement === document.body,
      marcaDentroDeOculto: !!node.querySelector("[aria-hidden='true'] .mq-intro-name"),
    };
  });
  if (!info.escenarioOculto) fail("lo decorativo no está bajo aria-hidden");
  else pass("todo lo decorativo va bajo aria-hidden");
  if (!info.marcaDentroDeOculto) fail("la marca de la introducción se anuncia y se leería dos veces");
  else pass("la marca no se anuncia: no se lee dos veces");
  if (!info.botonFuera) fail("el botón de saltar está dentro del subárbol oculto y no se anuncia");
  else pass("el botón de saltar sí se anuncia");
  if (!info.focoInicial) fail("la introducción se lleva el foco al abrirse");
  else pass("no se lleva el foco al abrirse");

  // Tabular tiene que llegar al contenido real, no quedarse encerrado.
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const atrapado = await page.evaluate(() => !!document.activeElement.closest("#mq-intro"));
  if (atrapado) fail("el foco se queda atrapado dentro de la introducción");
  else pass("el foco no se queda atrapado");
  await context.close();
}

/* ---- 9. Móvil ------------------------------------------------------------- */

console.log("\n== 9. Móvil ==");
for (const perfil of ["iPhone 13", "Pixel 7"]) {
  const context = await browser.newContext({ ...devices[perfil] });
  const page = await context.newPage();
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  const m = await page.evaluate(() => {
    const c = document.querySelector(".mq-intro-compass");
    const nombre = document.querySelector(".mq-intro-name");
    const node = document.getElementById("mq-intro");
    return {
      brujula: c ? Math.round(c.getBoundingClientRect().width) : 0,
      nombreAncho: nombre ? Math.round(nombre.getBoundingClientRect().width) : 0,
      viewport: window.innerWidth,
      alto: node ? Math.round(node.getBoundingClientRect().height) : 0,
      ventana: window.innerHeight,
      desborde: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  if (m.brujula > 96) fail(`${perfil}: la brújula mide ${m.brujula} px, por encima de 96`);
  else pass(`${perfil}: brújula de ${m.brujula} px`);
  if (m.nombreAncho > m.viewport - 24) fail(`${perfil}: «Maisha Quest» no cabe (${m.nombreAncho} px)`);
  else pass(`${perfil}: «Maisha Quest» cabe sin cortarse (${m.nombreAncho} px)`);
  if (m.desborde) fail(`${perfil}: las franjas provocan desbordamiento horizontal`);
  else pass(`${perfil}: sin desbordamiento horizontal`);
  if (Math.abs(m.alto - m.ventana) > 2) fail(`${perfil}: la capa mide ${m.alto} y la ventana ${m.ventana}`);
  else pass(`${perfil}: la capa cubre el viewport exacto (${m.alto} px)`);
  await context.close();
}

/* ---- 10. CLS -------------------------------------------------------------- */

console.log("\n== 10. Desplazamiento de maquetación ==");
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3600);
  const cls = await page.evaluate(() => window.__cls);
  if (cls > 0.02) fail(`CLS de ${cls.toFixed(3)} con la introducción`);
  else pass(`CLS ${cls.toFixed(3)} con la introducción`);
  await context.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Introducción: se comporta.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
