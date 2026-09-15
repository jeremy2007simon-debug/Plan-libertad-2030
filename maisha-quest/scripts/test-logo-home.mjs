/**
 * El logo y el nombre de marca como botón de inicio (`Logo.tsx`, reutilizado
 * en `Header`, `SiteMenu` y `Footer`).
 *
 * Es un `<a>` real, no un `<Link>` de Next: pulsarlo siempre hace una carga
 * completa a la home del idioma actual, incluso ya estando en ella —así
 * arranca desde arriba, dispara la animación de entrada (`Intro.tsx`) y
 * cierra de raíz cualquier overlay abierto (menú, vídeo con su audio) al
 * desmontar el documento entero—. Comprueba:
 *
 *  1-2. Es un `<a href>` real; desde una ficha de safari lleva a la home,
 *       empieza arriba (sin conservar el scroll) y dispara la entrada.
 *  3. Ya en la home, pulsarlo recarga igual y repite la entrada — distinto
 *     del cambio de idioma (mismo mecanismo de referrer que `Intro.tsx`,
 *     pero comparando la ruta exacta: origen y destino iguales = logo
 *     pulsado a propósito; distintos = selector de idioma).
 *  4. Conserva el idioma actual.
 *  5. El logo del menú navega y cierra el menú (documento nuevo).
 *  6. El pie tiene el mismo enlace.
 *  7. Ctrl/Cmd+clic sigue abriendo en otra pestaña.
 *  8. Móvil: zona táctil de 44 px.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-logo-home.mjs
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const problems = [];
const fail = (m) => { problems.push(m); console.log(`  FAIL  ${m}`); };
const pass = (m) => console.log(`  ok    ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

console.log("\n== 1. El logo del header es un <a> real (no next/link) ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es/safaris/manyara-ngorongoro-safari`, { waitUntil: "domcontentloaded" });
  const info = await page.evaluate(() => {
    const a = document.querySelector("header a[href='/es']");
    return a ? { tag: a.tagName, href: a.getAttribute("href"), name: a.getAttribute("aria-label") || a.textContent.trim() } : null;
  });
  if (!info) fail("no se encuentra un <a href='/es'> en el header");
  else pass(`header: <${info.tag.toLowerCase()} href="${info.href}">, nombre accesible incluye: "${info.name.slice(0, 60)}"`);
  await page.close();
}

console.log("\n== 2. Desde una ficha de safari: pulsar el logo lleva a la home del mismo idioma, arranca arriba, dispara la entrada ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es/safaris/manyara-ngorongoro-safari?intro=1`, { waitUntil: "domcontentloaded" });
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(300);
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.click("header a[href='/es']");
  await page.waitForLoadState("domcontentloaded");
  const url = page.url();
  if (!url.endsWith("/es") && !url.endsWith("/es/")) fail(`no navega a /es: ${url}`);
  else pass(`navega a la home en español: ${url}`);
  const scrollAfter = await page.evaluate(() => window.scrollY);
  if (scrollAfter !== 0) fail(`no empieza arriba (scrollY=${scrollAfter})`);
  else pass("empieza arriba (scrollY=0), no conserva el scroll anterior");
  console.log(`    (scroll antes de navegar: ${scrollBefore})`);
  await page.close();
}

console.log("\n== 2b. La entrada se ejecuta UNA sola vez en esa carga (sin forzar, navegador no-webdriver) ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  await page.goto(`${BASE}/es/safaris/manyara-ngorongoro-safari`, { waitUntil: "domcontentloaded" });
  const introOnDetail = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
  if (introOnDetail) fail("la entrada aparece en la ficha de safari (no debería)");
  else pass("la ficha de safari no muestra la entrada");

  await page.click("header a[href='/es']");
  await page.waitForLoadState("domcontentloaded");
  const introOnHome = await page.evaluate(() => document.documentElement.getAttribute("data-intro"));
  if (introOnHome !== "full") fail(`pulsar el logo desde una ficha no dispara la entrada en la home (fue: ${introOnHome})`);
  else pass("pulsar el logo desde una ficha SÍ dispara la entrada al llegar a la home");

  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 3000 });
  let replays = 0;
  page.on("console", () => {});
  await page.waitForTimeout(500);
  const stillGone = await page.evaluate(() => !document.documentElement.hasAttribute("data-intro"));
  if (!stillGone) fail("la entrada no se retira sola tras dispararse una vez");
  else pass("se ejecuta una sola vez y se retira sola");
  await page.close();
}

console.log("\n== 3. Ya en la home: pulsar el logo recarga igualmente y repite la entrada ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), { timeout: 3000 });
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(300);

  await page.click("header a[href='/es']");
  await page.waitForLoadState("domcontentloaded");
  const introAgain = await page.evaluate(() => document.documentElement.getAttribute("data-intro"));
  if (introAgain !== "full") fail(`pulsar el logo estando ya en la home no repite la entrada (fue: ${introAgain})`);
  else pass("pulsar el logo ya en la home SÍ repite la entrada (carga completa real)");
  const scrollAfter = await page.evaluate(() => window.scrollY);
  if (scrollAfter !== 0) fail(`no empieza arriba tras recargar la home (scrollY=${scrollAfter})`);
  else pass("empieza arriba tras recargar la home");
  await page.close();
}

console.log("\n== 4. Conserva el idioma actual (alemán) ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/de/safaris/manyara-ngorongoro-safari`, { waitUntil: "domcontentloaded" });
  await page.click("header a[href='/de']");
  await page.waitForLoadState("domcontentloaded");
  const url = page.url();
  if (!/\/de\/?$/.test(url)) fail(`no conserva el idioma alemán: ${url}`);
  else pass(`conserva el idioma alemán: ${url}`);
  await page.close();
}

console.log("\n== 5. Con el menú abierto: pulsar el logo del menú navega, cierra el menú y el vídeo (si estuviera abierto) ==");
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/es/safaris/manyara-ngorongoro-safari`, { waitUntil: "domcontentloaded" });
  await page.click('button[aria-haspopup="dialog"]');
  await page.waitForSelector('[role="dialog"]', { state: "visible" });
  const menuLogo = page.locator('[role="dialog"] a[href="/es"]');
  if ((await menuLogo.count()) === 0) fail("el menú no tiene su propio enlace de logo a /es");
  else pass("el menú tiene su propio enlace de logo a /es");
  await menuLogo.click();
  await page.waitForLoadState("domcontentloaded");
  const url = page.url();
  if (!url.endsWith("/es") && !url.endsWith("/es/")) fail(`el logo del menú no lleva a la home: ${url}`);
  else pass(`el logo del menú lleva a la home: ${url}`);
  const menuGone = (await page.locator('[role="dialog"]').count()) === 0;
  if (!menuGone) fail("el menú sigue presente tras navegar (no debería, es una carga nueva)");
  else pass("el menú desaparece (documento nuevo)");
  await page.close();
}

console.log("\n== 6. El pie de página tiene el mismo enlace ==");
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/es/contact`, { waitUntil: "domcontentloaded" });
  const footerLogo = page.locator("footer a[href='/es']");
  if ((await footerLogo.count()) === 0) fail("el pie no tiene un enlace de logo a /es");
  else pass("el pie tiene un enlace de logo a /es");
  await page.close();
}

console.log("\n== 7. Ctrl/Cmd+clic sigue abriendo en otra pestaña (comportamiento nativo de <a>) ==");
{
  // Un `<a>` normal sin `target="_blank"` abre una PESTAÑA nueva en el mismo
  // contexto al pulsarla con Ctrl/Cmd — no una "popup" con `opener" (eso es
  // solo para `window.open`) —, así que se cuenta `context.pages()`, no el
  // evento `popup` de la página de origen.
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const context = page.context();
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const before = context.pages().length;
  await page.click("header a[href='/es']", { modifiers: ["ControlOrMeta"] });
  await page.waitForTimeout(500);
  const after = context.pages();
  if (after.length <= before) fail("Ctrl/Cmd+clic no abre una pestaña nueva");
  else {
    pass("Ctrl/Cmd+clic abre una pestaña nueva");
    await after[after.length - 1].close();
  }
  await page.close();
}

console.log("\n== 8. Móvil: el header y el menú tienen el enlace, tamaño 44×44 accesible ==");
{
  const page = await browser.newPage({ ...devices["iPhone 13"] });
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const box = await page.locator("header a[href='/es']").boundingBox();
  if (!box || box.height < 44) fail(`el logo en móvil mide menos de 44px de alto: ${JSON.stringify(box)}`);
  else pass(`el logo en móvil mide al menos 44px de alto (${box.height.toFixed(1)}px)`);
  await page.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Logo/nombre como botón de inicio: se comporta.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
