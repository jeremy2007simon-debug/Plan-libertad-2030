/**
 * La barra de acción móvil no se mueve.
 *
 * Qué se reportó
 * --------------
 * En Safari de iPhone la barra bajaba con el contenido y, al llegar al pie,
 * aparecía a media pantalla. Dos causas: `overflow-x: clip` en el `body`
 * —que en iOS desancla los `position: fixed`— y una transición de
 * `transform` disparada por el evento `scroll`, que iOS no emite durante el
 * desplazamiento por inercia.
 *
 * Qué comprueba esto
 * ------------------
 *  1. La barra está pegada al borde inferior en TODAS las posiciones de
 *     scroll: arriba, a la mitad, y con el pie a la vista.
 *  2. Su caja no cambia ni un píxel entre esas posiciones.
 *  3. Es `fixed`, sin `transform`, sin `transition` y sin animación.
 *  4. Sigue clavada cuando el viewport cambia de alto, que es lo que hace
 *     Safari al plegar sus barras.
 *  5. No tapa nada: el último enlace del pie sube por encima de ella.
 *  6. Las dos zonas táctiles llegan a 44 × 44 px y responden.
 *  7. Cero desbordamiento horizontal.
 *  8. Con un campo enfocado —el teclado del móvil— se aparta.
 *  9. En el planificador no aparece, y en escritorio tampoco.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-mobile-bar.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"];

/** Anchos que pide la revisión, más el perfil de iPhone. */
const WIDTHS = [360, 390, 430];

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

/** Caja de la barra y del viewport, tal y como las ve el navegador. */
const readBar = () =>
  ({
    ...(() => {
      const el = document.querySelector("[data-mobile-cta]");
      if (!el) return { missing: true };
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        left: Math.round(r.left),
        right: Math.round(r.right),
        height: Math.round(r.height),
        position: cs.position,
        transform: cs.transform,
        transition: cs.transitionProperty,
        animation: cs.animationName,
        zIndex: cs.zIndex,
        display: cs.display,
      };
    })(),
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    scrollY: Math.round(window.scrollY),
    docWidth: document.documentElement.scrollWidth,
  });

/* ---- 1. Anclada al borde inferior en toda la página ----------------------- */

console.log("\n== 1. La barra no se mueve durante el scroll ==");
for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 780 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });

  const shots = [];
  // Arriba del todo, un tercio, dos tercios y el final con el pie a la vista.
  for (const fraction of [0, 0.33, 0.66, 1]) {
    await page.evaluate((f) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: max * f, behavior: "instant" });
    }, fraction);
    await page.waitForTimeout(220);
    shots.push(await page.evaluate(readBar));
  }

  if (shots.some((s) => s.missing)) {
    fail(`${width}px: la barra no existe`);
    await context.close();
    continue;
  }

  const pegada = shots.every((s) => s.bottom === s.viewportHeight);
  if (!pegada)
    fail(
      `${width}px: la barra se despega del borde inferior — bottom/alto: ` +
        shots.map((s) => `${s.bottom}/${s.viewportHeight}`).join(", "),
    );
  else pass(`${width}px: pegada al borde inferior en las cuatro posiciones`);

  const quieta = shots.every(
    (s) => s.top === shots[0].top && s.height === shots[0].height,
  );
  if (!quieta)
    fail(`${width}px: la caja cambia al hacer scroll — top: ${shots.map((s) => s.top).join(", ")}`);
  else pass(`${width}px: misma caja arriba, a la mitad y en el pie (top ${shots[0].top})`);

  const ancho = shots.every((s) => s.left === 0 && s.right === s.viewportWidth);
  if (!ancho) fail(`${width}px: la barra no ocupa todo el ancho`);
  else pass(`${width}px: ocupa el ancho completo`);

  const sinDesborde = shots.every((s) => s.docWidth <= s.viewportWidth);
  if (!sinDesborde) fail(`${width}px: hay desbordamiento horizontal`);
  else pass(`${width}px: sin desbordamiento horizontal`);

  await context.close();
}

/* ---- 2. Cómo está posicionada -------------------------------------------- */

console.log("\n== 2. Posicionamiento ==");
{
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  const bar = await page.evaluate(readBar);

  if (bar.position !== "fixed") fail(`position es "${bar.position}", no "fixed"`);
  else pass("position: fixed");

  if (bar.transform !== "none") fail(`lleva transform: ${bar.transform}`);
  else pass("sin transform");

  if (bar.transition !== "none" && bar.transition !== "all")
    fail(`lleva transición: ${bar.transition}`);
  else pass("sin transición");

  if (bar.animation !== "none") fail(`lleva animación: ${bar.animation}`);
  else pass("sin animación");

  // Un ancestro con overflow/transform/filter rompe `fixed` en Safari.
  const culprit = await page.evaluate(() => {
    const el = document.querySelector("[data-mobile-cta]");
    for (let p = el?.parentElement; p; p = p.parentElement) {
      const cs = getComputedStyle(p);
      const bad =
        cs.transform !== "none" ||
        cs.filter !== "none" ||
        cs.perspective !== "none" ||
        cs.contain.includes("paint") ||
        (cs.overflowX !== "visible" && p.tagName !== "HTML") ||
        (cs.overflowY !== "visible" && p.tagName !== "HTML");
      if (bad) return `${p.tagName.toLowerCase()} · overflow ${cs.overflowX}/${cs.overflowY} · transform ${cs.transform} · contain ${cs.contain}`;
    }
    return null;
  });
  if (culprit) fail(`un ancestro puede desanclarla: ${culprit}`);
  else pass("ningún ancestro con overflow, transform, filter, perspective ni contain");
}

/* ---- 3. Safari plegando y desplegando sus barras -------------------------- */

console.log("\n== 3. El viewport cambia de alto (barras de Safari) ==");
{
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
  await page.waitForTimeout(200);
  const antes = await page.evaluate(readBar);

  // Safari gana ~60 px de alto al plegar la barra de direcciones.
  await page.setViewportSize({ width: 390, height: 844 - 60 });
  await page.waitForTimeout(250);
  const durante = await page.evaluate(readBar);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(250);
  const despues = await page.evaluate(readBar);

  for (const [nombre, s] of [["antes", antes], ["plegada", durante], ["desplegada", despues]]) {
    if (s.bottom !== s.viewportHeight)
      fail(`con la barra ${nombre} queda a ${s.viewportHeight - s.bottom} px del borde`);
  }
  if (problems.length === 0 || antes.bottom === antes.viewportHeight)
    pass("sigue pegada al borde con el viewport alto y bajo");

  await context.close();
}

/* ---- 4. No tapa nada ------------------------------------------------------ */

console.log("\n== 4. Nada queda detrás de la barra ==");
for (const locale of LOCALES) {
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo({ top: 1e7, behavior: "instant" }));
  await page.waitForTimeout(300);

  const tapado = await page.evaluate(() => {
    const bar = document.querySelector("[data-mobile-cta]");
    const barTop = bar.getBoundingClientRect().top;
    const dentro = [...document.querySelectorAll("footer a, footer button")].filter((el) => {
      const r = el.getBoundingClientRect();
      // Solo lo que está en pantalla: lo que queda arriba no lo tapa la barra.
      return r.height > 0 && r.bottom > barTop && r.top < window.innerHeight;
    });
    return dentro.map((el) => (el.textContent || "").trim().slice(0, 40));
  });

  if (tapado.length) fail(`${locale}: la barra tapa ${tapado.length} enlaces del pie: ${tapado.join(" · ")}`);
  else pass(`${locale}: el pie entero sube por encima de la barra`);
  await context.close();
}

/* ---- 5. Zonas táctiles ---------------------------------------------------- */

console.log("\n== 5. Los dos botones ==");
{
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });

  const botones = await page.evaluate(() => {
    const bar = document.querySelector("[data-mobile-cta]");
    return [...bar.querySelectorAll("a")].map((a) => {
      const r = a.getBoundingClientRect();
      return {
        nombre: (a.getAttribute("aria-label") || a.textContent || "").trim(),
        href: a.getAttribute("href"),
        w: Math.round(r.width),
        h: Math.round(r.height),
        // ¿Es el propio botón lo que hay bajo su centro?
        alcanzable: a.contains(
          document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2),
        ),
      };
    });
  });

  if (botones.length !== 2) fail(`la barra tiene ${botones.length} botones, esperados 2`);
  for (const b of botones) {
    if (b.h < 44 || b.w < 44) fail(`«${b.nombre}»: ${b.w}×${b.h} px, por debajo de 44`);
    else if (!b.alcanzable) fail(`«${b.nombre}» no responde al toque: algo lo tapa`);
    else pass(`«${b.nombre}» — ${b.w}×${b.h} px, pulsable · ${b.href.slice(0, 42)}`);
  }
  await context.close();
}

/* ---- 6. Teclado del móvil ------------------------------------------------- */

console.log("\n== 6. Con el teclado abierto ==");
{
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });

  const resultado = await page.evaluate(async () => {
    const bar = () => document.querySelector("[data-mobile-cta]");
    const alto = () =>
      getComputedStyle(document.documentElement).getPropertyValue(
        "--mobile-action-bar-height",
      );
    const antes = { visible: !!bar()?.offsetHeight, alto: alto() };

    const input = document.createElement("input");
    input.type = "text";
    document.body.append(input);
    input.focus();
    await new Promise((r) => setTimeout(r, 150));
    const durante = { visible: !!bar()?.offsetHeight, alto: alto() };

    input.blur();
    input.remove();
    await new Promise((r) => setTimeout(r, 150));
    const despues = { visible: !!bar()?.offsetHeight, alto: alto() };
    return { antes, durante, despues };
  });

  if (!resultado.antes.visible) fail("la barra no se ve antes de enfocar el campo");
  else if (resultado.durante.visible) fail("la barra sigue encima con un campo enfocado");
  else if (!resultado.despues.visible) fail("la barra no vuelve al soltar el campo");
  else pass("se aparta con un campo enfocado y vuelve al soltarlo");

  if (resultado.antes.alto !== resultado.durante.alto)
    fail(`el hueco reservado cambia al enfocar (${resultado.antes.alto} → ${resultado.durante.alto}): eso es un salto de maquetación`);
  else pass(`el hueco reservado no cambia (${resultado.antes.alto.trim()})`);
  await context.close();
}

/* ---- 7. Dónde NO debe salir ----------------------------------------------- */

console.log("\n== 7. Planificador y escritorio ==");
{
  const movil = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await movil.newPage();
  await page.goto(`${BASE}/es/plan`, { waitUntil: "networkidle" });
  const enPlan = await page.evaluate(() => !!document.querySelector("[data-mobile-cta]"));
  if (enPlan) fail("la barra aparece en el planificador");
  else pass("en el planificador no aparece");
  await movil.close();

  const escritorio = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktop = await escritorio.newPage();
  await desktop.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  const visible = await desktop.evaluate(() => {
    const el = document.querySelector("[data-mobile-cta]");
    if (!el) return false;
    return getComputedStyle(el).display !== "none";
  });
  if (visible) fail("la barra se ve en escritorio");
  else pass("en escritorio no se ve");

  const enfocable = await desktop.evaluate(() => {
    const el = document.querySelector("[data-mobile-cta]");
    return el ? [...el.querySelectorAll("a")].some((a) => a.offsetParent !== null) : false;
  });
  if (enfocable) fail("en escritorio sus enlaces siguen en el orden de tabulación");
  else pass("en escritorio sus enlaces salen del orden de tabulación");
  await escritorio.close();
}

/* ---- 8. Otras rutas y orientación ---------------------------------------- */

console.log("\n== 8. Otras rutas, idiomas y orientación ==");
{
  const RUTAS = [
    "/safaris/serengeti-ngorongoro-journey",
    "/contact",
    "/destinations/serengeti",
    "/faq",
  ];
  for (const ruta of RUTAS) {
    const context = await browser.newContext({ ...devices["iPhone 13"] });
    const page = await context.newPage();
    await page.goto(`${BASE}/de${ruta}`, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo({ top: 1e7, behavior: "instant" }));
    await page.waitForTimeout(250);
    const s = await page.evaluate(readBar);
    if (s.missing) fail(`${ruta}: la barra no aparece`);
    else if (s.bottom !== s.viewportHeight)
      fail(`${ruta}: queda a ${s.viewportHeight - s.bottom} px del borde`);
    else pass(`${ruta}: pegada al borde con el pie a la vista`);
    await context.close();
  }

  // Apaisado.
  const apaisado = await browser.newContext({
    viewport: { width: 844, height: 390 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await apaisado.newPage();
  await page.goto(`${BASE}/ru`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  await page.waitForTimeout(200);
  const s = await page.evaluate(readBar);
  if (s.missing || s.bottom !== s.viewportHeight) fail("en apaisado no queda pegada al borde");
  else pass("en apaisado sigue pegada al borde");
  await apaisado.close();
}

/* ---- 9. Movimiento reducido ---------------------------------------------- */

console.log("\n== 9. Movimiento reducido ==");
{
  const context = await browser.newContext({
    ...devices["iPhone 13"],
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo({ top: 1e7, behavior: "instant" }));
  await page.waitForTimeout(250);
  const s = await page.evaluate(readBar);
  if (s.missing || s.bottom !== s.viewportHeight)
    fail("con movimiento reducido no queda pegada al borde");
  else pass("con movimiento reducido, igual de quieta");
  await context.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Barra de acción móvil: clavada abajo, sin tapar nada.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
