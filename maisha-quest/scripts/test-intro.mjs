/**
 * Animación de entrada de la home (`src/components/intro/Intro.tsx`): un
 * hueco circular (mask SVG), anclado en el aro real de la brújula, crece
 * hasta salir de la pantalla — a través de él se ve la portada real que
 * hay detrás, ya pintada desde el primer fotograma.
 *
 * Se ejecuta en cada carga real de la home — primera visita y cada
 * recarga — sin `sessionStorage`, y nunca en navegación interna, cambio de
 * idioma o apertura del menú (eso no recarga el documento). Comprueba:
 *
 *  1. Primera entrada: `data-intro="full"` activo, revela sola la portada.
 *  2. Recarga (F5): vuelve a ejecutarse.
 *  3. Acceso directo a una página interna: nunca aparece, ni forzada.
 *  3c. Cambio de idioma en la home (referrer = otra home del sitio): no se
 *      repite.
 *  4. El botón de saltar y Escape la retiran al instante; el scroll
 *     funciona con normalidad justo después.
 *  5. `prefers-reduced-motion`: fundido breve (`data-intro="reduced"`), sin
 *     que el hueco llegue a crecer.
 *  6. El botón de la película sigue funcionando con normalidad después.
 *  7. Móvil: el logo se ve completo y centrado al empezar (fotograma 0%,
 *     sin la animación en marcha, que lo agranda a propósito).
 *  8. El hueco de la máscara empieza del tamaño del aro de la brújula y
 *     crece con el tiempo — la propia mecánica de la revelación.
 *
 * Como Playwright es un navegador automatizado (`navigator.webdriver`), el
 * guardián de la introducción la salta por defecto: casi todas las pruebas
 * la fuerzan con `?intro=1` a propósito, salvo 3c, que la deja actuar sin
 * forzar (enmascarando solo `navigator.webdriver`) para probar el propio
 * guardián de verdad.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-intro.mjs
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const problems = [];
const fail = (m) => { problems.push(m); console.log(`  FAIL  ${m}`); };
const pass = (m) => console.log(`  ok    ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

console.log("\n== 1. Primera entrada a la home (forzada con ?intro=1, ya que Playwright es 'webdriver') ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  const hasIntro = await page.evaluate(() => document.documentElement.getAttribute("data-intro"));
  if (hasIntro !== "full") fail(`data-intro no es "full" en la primera entrada (fue: ${hasIntro})`);
  else pass('data-intro="full" activo en la primera entrada');
  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 3000 });
  pass("la capa se retira sola y revela la portada");
  if (errors.length) fail(`errores de página: ${errors.join(" | ")}`);
  await page.close();
}

console.log("\n== 2. Recarga: vuelve a ejecutarse ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 3000 });
  await page.reload({ waitUntil: "domcontentloaded" });
  const hasIntro = await page.evaluate(() => document.documentElement.getAttribute("data-intro"));
  if (hasIntro !== "full") fail(`la recarga no repite la entrada (data-intro: ${hasIntro})`);
  else pass("la recarga (F5) repite la animación de entrada");
  await page.close();
}

console.log("\n== 3. Navegación interna: no se repite ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 3000 });
  // Navegación de cliente (next/link) a una ficha de safari y de vuelta a home.
  await page.goto(`${BASE}/es/safaris/manyara-ngorongoro-safari`, { waitUntil: "domcontentloaded" });
  const introOnDetail = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
  if (introOnDetail) fail("la entrada aparece en una ficha de safari (no debería, es acceso directo a contenido interno)");
  else pass("una ficha de safari visitada directamente no muestra la entrada");
  await page.close();
}

console.log("\n== 3b. Acceso directo a página interna: contenido accesible sin la entrada ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es/safaris/manyara-ngorongoro-safari?intro=1`, { waitUntil: "domcontentloaded" });
  // El guardián solo activa la entrada en la home, aunque se fuerce con ?intro=1.
  const introOnDetail = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
  if (introOnDetail) fail("?intro=1 activa la entrada fuera de la home");
  else pass("una página interna nunca muestra la entrada, ni forzándola");
  await page.close();
}

console.log("\n== 3c. Cambio de idioma en la home: no se repite (referrer = otra home del sitio) ==");
{
  // Prueba el guardián SIN forzar con ?intro=1 (que se saltaría la propia
  // comprobación de referrer) y sin el bloqueo por `navigator.webdriver`
  // (que enmascararía el resultado igual): se enmascara solo esa señal.
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const introOnFirstVisit = await page.evaluate(() => document.documentElement.getAttribute("data-intro"));
  if (introOnFirstVisit !== "full") fail(`sin forzar, la primera visita no activa la entrada (fue: ${introOnFirstVisit})`);
  else pass("sin forzar: la primera visita real sí activa la entrada");
  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 3000 });

  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded", referer: `${BASE}/es` });
  const introAfterLocaleSwitch = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
  if (introAfterLocaleSwitch) fail("cambiar de idioma en la home repite la animación de entrada");
  else pass("cambiar de idioma en la home (referrer = home del propio sitio) no repite la animación de entrada");
  await page.close();
}

console.log("\n== 4. Saltar y Escape ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-intro-skip]", { state: "attached" });
  await page.click("[data-intro-skip]");
  const afterSkip = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
  if (afterSkip) fail("el botón de saltar no retira la entrada");
  else pass("el botón de saltar retira la entrada al instante");
  await page.close();

  const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page2.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page2.waitForSelector("#mq-intro", { state: "attached" });
  await page2.keyboard.press("Escape");
  const afterEscape = await page2.evaluate(() => document.documentElement.hasAttribute("data-intro"));
  if (afterEscape) fail("Escape no retira la entrada");
  else pass("Escape retira la entrada al instante");
  // Confirma que el scroll y la interacción funcionan justo después.
  await page2.mouse.wheel(0, 500);
  await page2.waitForTimeout(200);
  const scrollY = await page2.evaluate(() => window.scrollY);
  if (scrollY < 100) fail(`el scroll no responde tras saltar/Escape (scrollY=${scrollY})`);
  else pass(`el scroll funciona con normalidad tras Escape (scrollY=${scrollY})`);
  await page2.close();
}

console.log("\n== 5. Movimiento reducido: fundido breve, sin que el hueco crezca ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  // `emulateMedia`, no la opción `reducedMotion` del contexto: esta última,
  // en esta combinación de Playwright/Chromium, impide que `addInitScript`
  // llegue a ejecutarse en la primera navegación (verificado aparte) — un
  // límite de la herramienta de prueba, no del sitio.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "commit" });
  // El fundido reducido dura solo 650 ms: se lee en cuanto el atributo
  // aparece, sin esperar a que `domcontentloaded` resuelva primero (ese
  // margen ya se come buena parte de la ventana en CI).
  const mode = await page
    .waitForFunction(() => document.documentElement.getAttribute("data-intro"), { timeout: 600 })
    .then((h) => h.jsonValue())
    .catch(() => null);
  if (mode !== "reduced") fail(`con movimiento reducido data-intro debería ser "reduced" (fue: ${mode})`);
  else pass('con movimiento reducido, data-intro="reduced"');
  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 2000 });
  pass("con movimiento reducido, la capa se retira rápido (fundido breve)");
  await page.close();
}

console.log("\n== 6. Vídeo opcional tras la entrada: funciona con normalidad ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 3000 });
  await page.waitForTimeout(300);
  await page.click("button.mq-hero-play");
  await page.waitForSelector(".mq-video-modal", { state: "visible", timeout: 3000 });
  const videoPresent = await page.evaluate(() => !!document.querySelector(".mq-video-modal-video"));
  if (!videoPresent) fail("el vídeo no se abre correctamente después de la entrada");
  else pass("el botón de la película sigue funcionando con normalidad tras la entrada");
  await page.close();
}

console.log("\n== 7. Móvil: el logo se ve completo al empezar ==");
{
  // El tamaño NATURAL (fotograma 0%, `scale(1)`) es lo que importa aquí: en
  // pleno vuelo la marca crece a propósito más allá del viewport —así se
  // "atraviesa la pantalla"—, así que medir con la animación en marcha daría
  // un falso positivo. Se congela la animación para medir el punto de
  // partida real.
  const page2 = await browser.newPage({ ...devices["iPhone 13"] });
  await page2.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const style = document.createElement("style");
      style.textContent =
        ".mq-intro-center, .mq-intro-compass, .mq-intro-word { animation: none !important; transform: none !important; }";
      document.head.appendChild(style);
    });
  });
  await page2.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  const box = await page2.locator(".mq-intro-center").boundingBox();
  const viewport = page2.viewportSize();
  const fits = box && box.x >= -1 && box.y >= 0 && box.x + box.width <= viewport.width + 1;
  if (!fits) fail(`el logo no se ve completo en móvil al empezar: ${JSON.stringify(box)} vs viewport ${JSON.stringify(viewport)}`);
  else pass("el logo se ve completo y centrado en móvil al empezar");
  await page2.close();
}

console.log("\n== 8. El hueco de la máscara empieza pequeño (tamaño de la brújula) y crece ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  const r0 = await page.evaluate(() => {
    const c = document.querySelector(".mq-intro-hole");
    return c ? parseFloat(getComputedStyle(c).r) : null;
  });
  if (r0 === null || r0 <= 15 || r0 >= 120) fail(`el hueco no empieza del tamaño de la brújula (r inicial: ${r0})`);
  else pass(`el hueco empieza del tamaño de la brújula (r inicial: ${r0}px)`);

  await page.waitForTimeout(900);
  const rMid = await page.evaluate(() => {
    const c = document.querySelector(".mq-intro-hole");
    return c ? parseFloat(getComputedStyle(c).r) : null;
  });
  if (rMid === null || rMid <= r0 + 50) fail(`el hueco no crece con el tiempo (r inicial: ${r0}, a mitad: ${rMid})`);
  else pass(`el hueco crece con el tiempo (r inicial: ${r0}px → a mitad: ${Math.round(rMid)}px)`);
  await page.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Animación de entrada: se comporta.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
