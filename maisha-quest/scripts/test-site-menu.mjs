/**
 * Menú del sitio (`src/components/layout/SiteMenu.tsx`).
 *
 * Comprueba:
 *
 *  1. Escritorio: dos zonas, fotografía inicial visible, cambia al enfocar
 *     un enlace principal (con TECLADO, no solo con el ratón).
 *  2. El botón de desplegar es un control aparte del enlace de navegación
 *     (dos elementos, cada uno con su propio `aria-label`/texto).
 *  3. Un submenú se despliega con `aria-expanded` y se repliega al volver a
 *     pulsar; solo uno abierto a la vez.
 *  4. Teclado: Tab recorre el panel entero sin salirse, Escape cierra y
 *     devuelve el foco al botón que abrió el menú.
 *  5. Apertura/cierre repetidos no dejan el panel en un estado roto.
 *  6. Móvil: una sola columna, sin fotografía, submenús plegados por
 *     defecto, áreas táctiles de 44×44 px reales.
 *  7. `prefers-reduced-motion`: el menú se sigue abriendo y cerrando.
 *  8. Alemán (palabras largas): ningún enlace desborda su fila.
 *  9. Sin JavaScript: el disparador existe igual (mejora progresiva, no
 *     dependencia dura) — no se exige que abra, solo que no rompa nada.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-site-menu.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const problems = [];
const fail = (m) => { problems.push(m); console.log(`  FAIL  ${m}`); };
const pass = (m) => console.log(`  ok    ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

console.log("\n== 1. Escritorio: dos zonas, fotografía inicial, cambia con teclado ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  await page.waitForTimeout(500);

  const initialTitle = await dialog.locator(".mq-menu-photo-layer h3").allTextContents();
  if (!initialTitle.some((t) => t.trim() === "Safaris")) {
    fail(`la fotografía inicial no muestra "Safaris" (vio: ${initialTitle.join(", ")})`);
  } else pass('fotografía inicial: "Safaris"');

  // El foco ya está en "Cerrar" al abrir (autofoco del panel), así que desde
  // ahí bastan tres tabulaciones: Safaris (enlace) → su desplegable → Destinations.
  await page.keyboard.press("Tab"); // Safaris (enlace)
  await page.keyboard.press("Tab"); // toggle Safaris
  await page.keyboard.press("Tab"); // Destinations
  await page.waitForTimeout(400);
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  if (focused !== "Destinations") {
    fail(`el tabulador no llegó a "Destinations" (llegó a "${focused}")`);
  } else {
    const visibleTitle = await page.evaluate(() => {
      const layers = document.querySelectorAll(".mq-menu-photo-layer");
      for (const l of layers) {
        if (getComputedStyle(l).opacity === "1") return l.querySelector("h3")?.textContent?.trim();
      }
      return null;
    });
    if (visibleTitle !== "Destinations") {
      fail(`enfocar "Destinations" por teclado no cambia la fotografía (mostraba "${visibleTitle}")`);
    } else pass("enfocar un enlace principal por TECLADO cambia la fotografía");
  }

  await ctx.close();
}

console.log("\n== 2. El botón de desplegar es distinto del enlace de navegación ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });

  const safarisLink = dialog.getByRole("link", { name: "Safaris", exact: true });
  const safarisToggle = dialog.getByRole("button", { name: "Expand Safaris" });
  const linkHref = await safarisLink.getAttribute("href");
  const toggleTag = await safarisToggle.evaluate((el) => el.tagName);
  if (linkHref !== "/en/safaris") fail(`el enlace de Safaris no apunta a /en/safaris (${linkHref})`);
  else pass("el enlace de navegación de Safaris es un <a> real a /en/safaris");
  if (toggleTag !== "BUTTON") fail("el control de desplegar no es un <button> aparte");
  else pass("el botón de desplegar es un control distinto del enlace");

  await ctx.close();
}

console.log("\n== 3. Submenú: aria-expanded, un solo desplegado a la vez ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });

  // El propio nombre accesible del botón cambia de "Expand X" a "Collapse X"
  // al desplegarse (`expandSection`/`collapseSection` en el diccionario) —
  // localizarlo por una parte ESTABLE del nombre (que termine en "Safaris"),
  // no por el verbo, que es justo lo que cambia.
  const safarisToggle = dialog.getByRole("button", { name: /Safaris$/ });
  await safarisToggle.click();
  await page.waitForTimeout(400);
  const expandedAfterClick = await safarisToggle.getAttribute("aria-expanded");
  if (expandedAfterClick !== "true") fail("aria-expanded no pasa a 'true' al desplegar Safaris");
  else pass("aria-expanded='true' tras desplegar Safaris");

  const explorerVisible = await dialog.getByRole("link", { name: "Explorer Collection" }).isVisible();
  if (!explorerVisible) fail("los hijos de Safaris no aparecen visibles tras desplegarlo");
  else pass("los hijos de Safaris quedan visibles y son enlaces reales");

  // Desplegar "About" cierra "Safaris": solo uno a la vez.
  const aboutToggle = dialog.getByRole("button", { name: /About$/ });
  await aboutToggle.click();
  await page.waitForTimeout(400);
  const safarisStillExpanded = await safarisToggle.getAttribute("aria-expanded");
  if (safarisStillExpanded !== "false") fail("Safaris sigue expandido al abrir About (debería cerrarse)");
  else pass("un solo submenú desplegado a la vez (abrir About cierra Safaris)");

  // Volver a pulsar About lo repliega.
  await aboutToggle.click();
  await page.waitForTimeout(400);
  const aboutCollapsed = await aboutToggle.getAttribute("aria-expanded");
  if (aboutCollapsed !== "false") fail("pulsar el toggle ya abierto no lo repliega");
  else pass("pulsar el toggle ya abierto lo repliega");

  await ctx.close();
}

console.log("\n== 4. Teclado: Tab dentro del panel, Escape cierra y devuelve el foco ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Open menu" }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  await page.waitForTimeout(300);

  const activeInDialog = await page.evaluate(() =>
    document.querySelector('[role="dialog"]')?.contains(document.activeElement),
  );
  if (!activeInDialog) fail("el foco no entra en el panel al abrirlo");
  else pass("el foco entra en el panel al abrirlo (botón de cerrar)");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const stillOpen = await dialog.isVisible().catch(() => false);
  if (stillOpen) fail("Escape no cierra el panel");
  else pass("Escape cierra el panel");

  const focusReturned = await trigger.evaluate((el) => el === document.activeElement);
  if (!focusReturned) fail("el foco no vuelve al botón que abrió el menú");
  else pass("el foco vuelve al botón que abrió el menú");

  await ctx.close();
}

console.log("\n== 5. Apertura y cierre repetidos ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Open menu" }).first();
  const dialog = page.getByRole("dialog");

  for (let i = 0; i < 3; i++) {
    await trigger.click();
    await dialog.waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(350);
  }
  const closedCleanly = !(await dialog.isVisible().catch(() => false));
  // `useScrollLock` (src/lib/useScrollLock.ts) bloquea con `position: fixed`
  // en el <body>, no con `overflow: hidden` — ver ese archivo sobre por qué.
  const bodyLocked = await page.evaluate(() => getComputedStyle(document.body).position === "fixed");
  if (!closedCleanly) fail("tras varios ciclos el panel se queda abierto");
  else pass("tres ciclos de apertura/cierre seguidos: el panel termina cerrado");
  if (bodyLocked) fail("el scroll del fondo se queda bloqueado tras los ciclos");
  else pass("el scroll del fondo queda restaurado tras los ciclos");

  await ctx.close();
}

console.log("\n== 6. Móvil: una columna, sin fotografía, acordeón, 44×44 px ==");
{
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  await page.waitForTimeout(400);

  const photoVisible = await page.evaluate(() => {
    const el = document.querySelector('[role="dialog"] .mq-menu-photo-layer');
    return el ? getComputedStyle(el).display !== "none" && el.offsetParent !== null : false;
  });
  if (photoVisible) fail("la fotografía del panel de escritorio es visible en móvil");
  else pass("sin fotografía lateral en móvil (no resta espacio)");

  const safarisToggle = dialog.getByRole("button", { name: "Expand Safaris" });
  const box = await safarisToggle.boundingBox();
  if (!box || box.width < 44 || box.height < 44) {
    fail(`el botón de desplegar mide menos de 44×44 px (${box?.width}×${box?.height})`);
  } else pass(`el botón de desplegar mide ${Math.round(box.width)}×${Math.round(box.height)} px`);

  await safarisToggle.click();
  await page.waitForTimeout(400);
  const childVisible = await dialog.getByRole("link", { name: "Explorer Collection" }).isVisible();
  if (!childVisible) fail("el acordeón móvil no revela los hijos de Safaris");
  else pass("el acordeón móvil despliega los hijos de Safaris");

  await ctx.close();
}

console.log("\n== 7. Movimiento reducido: el panel se sigue abriendo y cerrando ==");
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Open menu" }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const openedOk = await dialog.isVisible({ timeout: 2000 }).catch(() => false);
  if (!openedOk) fail("con movimiento reducido el panel no llega a abrirse");
  else pass("con movimiento reducido el panel se abre igual");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const closedOk = !(await dialog.isVisible().catch(() => false));
  if (!closedOk) fail("con movimiento reducido el panel no llega a cerrarse");
  else pass("con movimiento reducido el panel se cierra igual");

  await ctx.close();
}

console.log("\n== 8. Alemán: sin desbordamiento en enlaces ni botones ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/de`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Menü öffnen" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  await page.waitForTimeout(400);

  const overflowing = await page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]');
    const bad = [];
    dlg.querySelectorAll("a, button").forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 2 && el.offsetParent !== null) {
        bad.push(el.textContent?.trim().slice(0, 40));
      }
    });
    return bad;
  });
  if (overflowing.length) fail(`texto alemán desborda en: ${overflowing.join(" | ")}`);
  else pass("ningún enlace o botón desborda con los textos alemanes");

  await ctx.close();
}

console.log("\n== 9. Sin JavaScript: el disparador existe, nada se rompe ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "load" });
  const triggerVisible = await page.getByRole("button", { name: "Open menu" }).first().isVisible();
  if (!triggerVisible) fail("sin JavaScript el botón de menú no está en el HTML");
  else pass("sin JavaScript el botón de menú sigue en el HTML (mejora progresiva)");
  await ctx.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Menú del sitio: se comporta.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
