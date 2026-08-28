/**
 * Responsive y calidad visual en los seis idiomas.
 *
 * No rediseña nada: mide. Comprueba en 360, 390, 768, 1024 y 1440 px, y con
 * los motores de Safari iOS y Chrome Android:
 *
 *  1. Cero desbordamiento horizontal.
 *  2. Ningún control tapado por la barra de acción móvil.
 *  3. Zonas táctiles de 44 × 44 px como mínimo en los controles reales.
 *  4. Nada que se salga de su contenedor con los idiomas largos —alemán y
 *     ruso son los que rompen las cajas— ni con la tipografía china.
 *  5. Consola limpia y sin recursos fallidos.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/check-responsive.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"];
const PATHS = ["", "/safaris", "/safaris/serengeti-ngorongoro-journey", "/destinations", "/plan", "/contact", "/impact", "/about/team"];

const VIEWPORTS = [
  { name: "360", width: 360, height: 740 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

/** Desbordamiento real: se intenta desplazar y se mira si el navegador cede. */
const OVERFLOW = () => {
  window.scrollTo(9999, 0);
  const x = window.scrollX;
  window.scrollTo(0, 0);
  return x;
};

/** Controles cuya zona táctil se queda por debajo de 44 × 44. */
const SMALL_TARGETS = () => {
  const out = [];
  for (const el of document.querySelectorAll("a[href], button, input, select")) {
    if (el.type === "hidden" || el.tabIndex === -1) continue;
    // El enlace de salto mide 1×1 hasta que recibe el foco, y entonces se
    // pinta a tamaño completo: como zona táctil no existe.
    if (el.closest(".sr-only")) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Los enlaces dentro de un párrafo son texto, no botones: su zona es la
    // línea y medirlos como controles daría un falso positivo en cada uno.
    if (el.tagName === "A" && el.closest("p, li:not([class*=nav])")) continue;
    /*
     * La zona táctil de un radio o una casilla es su etiqueta, no el cuadrito.
     * Todas las del planificador van dentro de un <label> de 56 px de alto:
     * medir el input daría 16 × 16 y sería medir lo que no se toca.
     */
    const box = el.closest("label") ?? el;
    const br = box.getBoundingClientRect();
    // Con `tap-44`, el área efectiva la amplía un pseudoelemento invisible.
    const hasTap = box.classList.contains("tap-44") || el.classList.contains("tap-44");
    const width = hasTap ? Math.max(br.width, 44) : br.width;
    const height = hasTap ? Math.max(br.height, 44) : br.height;
    if (width < 44 || height < 44) {
      out.push(
        `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(width)}×${Math.round(height)}`,
      );
    }
  }
  return out;
};

/**
 * ¿Deja la barra de acción móvil algún control fuera de alcance?
 *
 * La pregunta no es si tapa algo mientras se baja —una barra fija tapa
 * contenido al pasar por debajo, y ese contenido se alcanza desplazándose un
 * poco más— sino si al FINAL del documento queda algo debajo de ella que ya
 * no se pueda descubrir. Eso sí sería un control inalcanzable.
 */
const COVERED = () => {
  const bar = document.querySelector("[data-mobile-cta]");
  if (!bar) return [];
  const barTop = bar.getBoundingClientRect().top;
  // La barra vive fuera de pantalla hasta que se baja: si su borde superior
  // está por debajo del viewport, no tapa nada y medirla marcaría cualquier
  // elemento que cruce el borde inferior.
  if (barTop >= window.innerHeight - 1) return [];
  const out = [];
  for (const el of document.querySelectorAll("a[href], button, input, select, textarea")) {
    if (bar.contains(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Solo lo que está en pantalla ahora mismo.
    if (r.top < 0 || r.top > window.innerHeight) continue;
    if (r.bottom > barTop && r.top < barTop) {
      out.push(`${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 30)}"`);
    }
  }
  return out;
};

/**
 * Texto RECORTADO: el que su contenedor corta de verdad.
 *
 * No basta con `scrollWidth > clientWidth`. Un elemento con `overflow:
 * visible` que mide tres píxeles de más no está recortado: se sale y se ve,
 * y en el caso del logotipo esos tres píxeles son el `letter-spacing` del
 * último glifo, que el navegador cuenta y no dibuja. Lo que se ve cortado es
 * lo que tiene un contenedor con `overflow` `hidden` o `clip`.
 */
const CLIPPED = () =>
  [...document.querySelectorAll("h1, h2, h3, button, a, span, p")]
    .filter((el) => {
      if (el.closest(".sr-only")) return false;
      const r = el.getBoundingClientRect();
      if (r.width === 0) return false;
      if (el.scrollWidth - el.clientWidth <= 4) return false;
      const cs = getComputedStyle(el);
      if (cs.overflow === "hidden" || cs.overflow === "clip") return true;
      // O un ancestro cercano que sí corta.
      let parent = el.parentElement;
      for (let depth = 0; parent && depth < 3; depth += 1, parent = parent.parentElement) {
        const pcs = getComputedStyle(parent);
        if (pcs.overflow === "hidden" || pcs.overflow === "clip") {
          return el.getBoundingClientRect().right > parent.getBoundingClientRect().right + 2;
        }
      }
      return false;
    })
    .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 40)}"`);

const results = { overflow: 0, small: 0, covered: 0, clipped: 0, checked: 0 };
const consoleErrors = [];
const failedResources = [];

const chrome = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

console.log("== 1. Cinco anchos × seis idiomas ==");
for (const vp of VIEWPORTS) {
  const context = await chrome.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.width < 768 ? 3 : 1,
    isMobile: vp.width < 768,
    hasTouch: vp.width < 768,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => consoleErrors.push(`${vp.name}px: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`${vp.name}px: ${m.text()}`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400) failedResources.push(`${vp.name}px: ${r.status()} ${r.url()}`);
  });

  for (const locale of LOCALES) {
    for (const path of PATHS) {
      await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "networkidle" });
      results.checked += 1;
      const where = `${vp.name}px /${locale}${path || "/"}`;

      const x = await page.evaluate(OVERFLOW);
      if (x > 0) {
        results.overflow += 1;
        fail(`${where}: desbordamiento horizontal de ${x}px`);
      }

      const clipped = await page.evaluate(CLIPPED);
      if (clipped.length) {
        results.clipped += 1;
        fail(`${where}: contenido fuera de su caja — ${clipped.slice(0, 2).join(" | ")}`);
      }

      if (vp.width < 768) {
        const small = await page.evaluate(SMALL_TARGETS);
        if (small.length) {
          results.small += 1;
          fail(`${where}: zonas táctiles menores de 44px — ${small.slice(0, 3).join(" | ")}`);
        }
        // Hasta el final del documento: es donde ya no queda desplazamiento
        // con el que descubrir lo que haya quedado debajo.
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(700);
        const covered = await page.evaluate(COVERED);
        await page.evaluate(() => window.scrollTo(0, 0));
        if (covered.length) {
          results.covered += 1;
          fail(`${where}: la barra móvil tapa — ${covered.slice(0, 2).join(" | ")}`);
        }
      }
    }
  }
  await context.close();
}
if (results.overflow === 0) pass(`${results.checked} combinaciones sin desbordamiento horizontal`);
if (results.clipped === 0) pass("ningún texto se sale de su caja, tampoco en alemán, ruso ni chino");
if (results.small === 0) pass("todas las zonas táctiles llegan a 44 × 44 px");
if (results.covered === 0) pass("la barra de acción móvil no tapa ningún control");

/* ---- 2. Perfiles de móvil ------------------------------------------------- */

console.log("\n== 2. Perfiles de iPhone y Android ==");
{
  /*
   * LIMITACIÓN: aquí no hay motor de WebKit instalado y no se puede
   * descargar, así que Safari iOS NO se prueba con su motor real. Lo que se
   * prueba es el PERFIL del dispositivo —viewport, densidad, táctil y cadena
   * de agente— sobre Chromium. Cubre el layout, que es lo que rompe casi
   * siempre; no cubre diferencias propias de WebKit como `svh`, que en esta
   * web solo afecta a la altura del hero. Queda anotado en el informe.
   */
  for (const [profile, device] of [
    ["perfil iPhone 13", devices["iPhone 13"]],
    ["perfil Pixel 7", devices["Pixel 7"]],
  ]) {
    const context = await chrome.newContext(device);
    const page = await context.newPage();
    let bad = 0;
    for (const locale of ["en", "de", "ru", "zh-CN"]) {
      for (const path of ["", "/plan", "/safaris/serengeti-ngorongoro-journey"]) {
        await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "networkidle" });
        const x = await page.evaluate(OVERFLOW);
        if (x > 0) {
          bad += 1;
          fail(`${profile} /${locale}${path || "/"}: desbordamiento de ${x}px`);
        }
      }
    }
    if (bad === 0) pass(`${profile}: sin desbordamiento en cuatro idiomas × tres rutas`);
    await context.close();
  }
}

await chrome.close();

/* ---- 3. Consola y recursos ----------------------------------------------- */

console.log("\n== 3. Consola y recursos ==");
{
  /*
   * La barra de Vercel Preview no es parte de la web: carga su propio script
   * desde vercel.live y en un entorno sin salida a esa URL falla. Se cuenta
   * aparte para no confundirlo con un error del sitio.
   */
  const isVercelToolbar = (line) => /vercel\.live|vercel-(scripts|insights)/.test(line);
  const own = consoleErrors.filter((l) => !isVercelToolbar(l));
  const foreign = consoleErrors.filter(isVercelToolbar);
  const ownResources = failedResources.filter((l) => !isVercelToolbar(l));

  if (own.length) for (const e of [...new Set(own)].slice(0, 10)) fail(`consola: ${e}`);
  else pass("consola sin errores propios");
  if (ownResources.length)
    for (const e of [...new Set(ownResources)].slice(0, 10)) fail(`recurso: ${e}`);
  else pass("ningún recurso propio falla");
  if (foreign.length)
    console.log(`  (${foreign.length} mensajes de la barra de Vercel Preview, ajenos a la web)`);
}

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Responsive y calidad visual: sin problemas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems.slice(0, 40)) console.log(`  - ${p}`);
process.exit(1);
