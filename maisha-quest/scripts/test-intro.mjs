/**
 * La experiencia de vídeo opcional de la portada se comporta.
 *
 * Reescrito de arriba abajo: la versión anterior probaba una capa
 * `position: fixed` a pantalla completa que bloqueaba el scroll hasta
 * terminar o pulsar «saltar». Esa arquitectura ya no existe —el cliente pidió
 * expresamente lo contrario, un vídeo opcional que nunca bloquee el acceso al
 * sitio (ver `src/components/intro/Intro.tsx`)—, así que esta versión
 * comprueba el comportamiento nuevo:
 *
 *  1. Primera visita: el panel se activa DENTRO del hueco del hero (no a
 *     pantalla completa), el hero ya está pintado detrás, el scroll funciona
 *     desde el primer instante y la cabecera sigue siendo clicable.
 *  2. «Enter the website» cierra de inmediato —sin esperar al vídeo—, pausa
 *     el audio y devuelve el hero a interactivo.
 *  3. El botón de silencio alterna el audio real, con `aria-pressed` correcto.
 *  4. El botón discreto de «ver de nuevo» reinicia desde el principio,
 *     silenciado.
 *  5. Escape cierra de inmediato, igual que «Enter the website».
 *  6. No se repite en una segunda visita dentro de la misma sesión, ni al
 *     cambiar de idioma — pero el botón discreto sigue disponible.
 *  7. `prefers-reduced-motion`: no se ejecuta sola, pero se ofrece bajo
 *     demanda (el botón discreto sigue ahí).
 *  8. `saveData` y `navigator.webdriver`: no se ejecuta sola.
 *  9. Sin JavaScript: no se ve, no se pide el vídeo, la portada se ve entera.
 * 10. Si el vídeo falla (404 en los dos formatos), se entra en la página.
 * 11. Móvil: el marco respeta 16:9 exacto (el archivo real, 1920×1080) sin
 *     desbordar el viewport en ningún punto.
 * 12. Cero CLS al activarse.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-intro.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const problems = [];
const fail = (m) => { problems.push(m); console.log(`  FAIL  ${m}`); };
const pass = (m) => console.log(`  ok    ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

async function withEligible(context) {
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
}

console.log("\n== 1. Primera visita: panel activo, hero detrás, scroll libre desde el inicio ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  const state = await page.evaluate(() => ({
    eligible: document.documentElement.hasAttribute("data-intro-eligible"),
    panelInert: document.querySelector("[data-intro-panel]")?.inert,
    heroInert: document.querySelector("[data-intro-hero-content]")?.inert,
    overflow: getComputedStyle(document.documentElement).overflow,
    h1: document.querySelector("main h1")?.textContent?.trim(),
  }));
  if (!state.eligible) fail("no se activa en la primera visita");
  else pass("panel activo en la primera visita");
  if (state.panelInert) fail("el panel sigue inert estando activo");
  else pass("el panel deja de ser inert al activarse");
  if (!state.heroInert) fail("el hero no queda inert mientras el vídeo está activo");
  else pass("el hero queda inert (fuera del tabulador) mientras el vídeo está activo");
  if (state.overflow === "hidden") fail("el scroll está bloqueado");
  else pass(`overflow: ${state.overflow} — scroll no bloqueado`);
  if (!state.h1) fail("el hero no está pintado detrás");
  else pass("el hero ya está pintado detrás del panel");

  // Scroll funciona de verdad, con el vídeo aún reproduciéndose.
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => window.scrollY);
  if (after <= before) fail(`el scroll no avanza mientras el vídeo se reproduce (antes=${before}, después=${after})`);
  else pass(`scroll funciona con el vídeo activo (${before} → ${after})`);
  await page.mouse.wheel(0, -1200);
  await page.waitForTimeout(200);

  // El vídeo pide el archivo real, muted+playsInline.
  const video = await page.evaluate(() => {
    const v = document.getElementById("mq-intro-video");
    return v ? { src: v.currentSrc || v.src, muted: v.muted, playsInline: v.playsInline, paused: v.paused } : null;
  });
  // El navegador elige por sí solo cuál de los dos <source> reproduce: H.264
  // en casi todos, VP9 donde no (este mismo entorno de pruebas, comprobado:
  // el Chromium de código abierto que empaqueta Playwright no trae
  // descodificador H.264). Cualquiera de los dos es correcto aquí.
  if (!video || !/\/video\/optimized\/maisha-quest-intro-v2\.(mp4|webm)$/.test(video.src))
    fail(`el vídeo no pide el archivo esperado (${video?.src})`);
  else pass(`pide el archivo real (${video.src.split("/").pop()})`);
  if (!video?.muted) fail("no empieza silenciado");
  else pass("empieza silenciado (autoplay válido)");
  if (!video?.playsInline) fail("no lleva playsInline");
  else pass("playsInline activo");
  if (video?.paused) fail("el vídeo está pausado, no reproduciéndose");
  else pass("reproduciéndose");

  // Header sigue siendo clicable durante la reproducción.
  const headerClickable = await page.evaluate(() => {
    const link = document.querySelector("header a, nav a");
    if (!link) return false;
    const r = link.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!el && (el === link || link.contains(el) || el.contains(link));
  });
  if (!headerClickable) fail("un enlace de la cabecera no es el elemento superior en su propio punto (el vídeo lo tapa)");
  else pass("la cabecera sigue siendo el elemento superior — clicable durante la reproducción");

  await ctx.close();
}

console.log("\n== 2. Enter the website: cierre inmediato, sin esperar al vídeo ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const enter = page.locator("[data-intro-enter]");
  const box = await enter.boundingBox();
  if (!box || box.height < 44) fail(`el botón Enter mide ${box?.height ?? 0}px de alto`);
  else pass(`Enter the website visible, ${Math.round(box.height)}px alto`);
  await enter.click();
  await page.waitForTimeout(500);
  const state = await page.evaluate(() => ({
    eligible: document.documentElement.hasAttribute("data-intro-eligible"),
    videoPaused: document.getElementById("mq-intro-video")?.paused,
    videoMuted: document.getElementById("mq-intro-video")?.muted,
    heroInert: document.querySelector("[data-intro-hero-content]")?.inert,
  }));
  if (state.eligible) fail("el panel sigue activo tras pulsar Enter");
  else pass("Enter cierra el panel de inmediato");
  if (!state.videoPaused) fail("el vídeo sigue reproduciéndose tras salir");
  else pass("el vídeo se pausa al salir");
  if (!state.videoMuted) fail("el audio no vuelve a silenciarse al salir");
  else pass("el audio vuelve a silenciarse al salir");
  if (state.heroInert) fail("el hero sigue inert tras cerrar el panel");
  else pass("el hero vuelve a ser interactivo tras cerrar el panel");

  // El botón discreto de "ver de nuevo" aparece.
  const watchVisible = await page.evaluate(() => !document.querySelector("[data-intro-watch]")?.hidden);
  if (!watchVisible) fail("el botón de ver de nuevo no aparece tras cerrar");
  else pass("el botón discreto de ver de nuevo aparece tras cerrar");
  await ctx.close();
}

console.log("\n== 3. Silenciar / activar sonido ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const muteBtn = page.locator("[data-intro-mute]");
  const before = await page.evaluate(() => document.getElementById("mq-intro-video").muted);
  await muteBtn.click();
  await page.waitForTimeout(150);
  const after = await page.evaluate(() => document.getElementById("mq-intro-video").muted);
  const pressed = await muteBtn.getAttribute("aria-pressed");
  if (before === after) fail("el botón de silencio no cambia el estado del audio");
  else pass(`silencio alternado (${before} → ${after})`);
  if (String(after) !== pressed) fail(`aria-pressed (${pressed}) no coincide con el estado real (${after})`);
  else pass("aria-pressed coincide con el estado real");
  await ctx.close();
}

console.log("\n== 4. Ver de nuevo: reinicia desde cero, silenciado ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.locator("[data-intro-mute]").click(); // Con sonido...
  await page.locator("[data-intro-enter]").click(); // ...y salir.
  await page.waitForTimeout(400);
  const watchBtn = page.locator("[data-intro-watch]");
  await watchBtn.click();
  await page.waitForTimeout(500);
  const state = await page.evaluate(() => ({
    eligible: document.documentElement.hasAttribute("data-intro-eligible"),
    muted: document.getElementById("mq-intro-video").muted,
    currentTime: document.getElementById("mq-intro-video").currentTime,
    heroInert: document.querySelector("[data-intro-hero-content]")?.inert,
  }));
  if (!state.eligible) fail("el botón de ver de nuevo no reactiva el panel");
  else pass("reactiva el panel");
  if (!state.muted) fail("la repetición no empieza silenciada");
  else pass("la repetición empieza silenciada");
  if (state.currentTime > 2) fail(`no reinicia desde el principio (currentTime=${state.currentTime})`);
  else pass(`reinicia desde el principio (currentTime=${state.currentTime.toFixed(2)})`);
  if (!state.heroInert) fail("el hero no vuelve a quedar inert en la repetición");
  else pass("el hero vuelve a quedar inert en la repetición");
  await ctx.close();
}

console.log("\n== 5. Escape cierra de inmediato ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.keyboard.press("Escape");
  // El cierre pasa por una transición breve (~360ms, ver Intro.tsx) antes de
  // quitar `data-intro-eligible` de verdad — no es un corte instantáneo.
  await page.waitForTimeout(500);
  const eligible = await page.evaluate(() => document.documentElement.hasAttribute("data-intro-eligible"));
  if (eligible) fail("Escape no cierra el panel");
  else pass("Escape cierra el panel de inmediato (tras la transición breve)");
  await ctx.close();
}

console.log("\n== 6. Segunda visita en la misma sesión: no se repite, pero el botón discreto sigue disponible ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const state = await page.evaluate(() => ({
    eligible: document.documentElement.hasAttribute("data-intro-eligible"),
    watchHidden: document.querySelector("[data-intro-watch]")?.hidden,
  }));
  if (state.eligible) fail("se repite en la segunda visita dentro de la misma sesión");
  else pass("no se repite en la segunda visita dentro de la misma sesión");
  if (state.watchHidden) fail("el botón discreto no está disponible en la segunda visita");
  else pass("el botón discreto de ver el vídeo sigue disponible");

  // Y no se reinicia al cambiar de idioma tampoco (misma sessionStorage).
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const esState = await page.evaluate(() => document.documentElement.hasAttribute("data-intro-eligible"));
  if (esState) fail("se reinicia al cambiar de idioma dentro de la misma sesión");
  else pass("no se reinicia al cambiar de idioma dentro de la misma sesión");
  await ctx.close();
}

console.log("\n== 7. Movimiento reducido: no se ejecuta solo, pero se ofrece bajo demanda ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const state = await page.evaluate(() => ({
    eligible: document.documentElement.hasAttribute("data-intro-eligible"),
    watchHidden: document.querySelector("[data-intro-watch]")?.hidden,
    heroVisible: (() => {
      const h1 = document.querySelector("main h1");
      if (!h1) return false;
      const cs = getComputedStyle(h1);
      return cs.opacity !== "0" && cs.visibility !== "hidden";
    })(),
  }));
  if (state.eligible) fail("se ejecuta solo con movimiento reducido, incluso con ?intro=1");
  else pass("con movimiento reducido no se ejecuta solo, ni con ?intro=1");
  if (!state.heroVisible) fail("el hero no se ve con movimiento reducido");
  else pass("el hero se ve directamente");
  if (state.watchHidden) fail("el botón para verlo bajo demanda no está disponible con movimiento reducido");
  else pass("el vídeo sigue disponible bajo demanda (botón discreto visible)");
  await ctx.close();
}

console.log("\n== 8. saveData: no se ejecuta solo ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, "connection", { configurable: true, get: () => ({ saveData: true }) });
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);
  const eligible = await page.evaluate(() => document.documentElement.hasAttribute("data-intro-eligible"));
  if (eligible) fail("se ejecuta con saveData activado");
  else pass("con saveData no se ejecuta automáticamente");
  await ctx.close();
}

console.log("\n== 9. Automatizado (webdriver real de Playwright): no se ejecuta solo ==");
{
  // Sin el addInitScript que disimula webdriver — así es como llega
  // cualquier herramienta de verificación automatizada de verdad.
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);
  const eligible = await page.evaluate(() => document.documentElement.hasAttribute("data-intro-eligible"));
  if (eligible) fail("se ejecuta con navigator.webdriver=true");
  else pass("con navigator.webdriver=true no se ejecuta automáticamente");
  await ctx.close();
}

console.log("\n== 10. Sin JavaScript: no se ve, no se pide el vídeo ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  const responses = [];
  page.on("response", (r) => responses.push(r.url()));
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  const panelVisible = await page.evaluate(() => {
    const p = document.querySelector("[data-intro-panel]");
    // Reposo por defecto: `display: none` (ver globals.css) — no `opacity`,
    // que además de invisible debe sacarlo del todo de la caja/accesibilidad.
    return p ? getComputedStyle(p).display !== "none" : false;
  });
  if (panelVisible) fail("sin JavaScript el panel se ve");
  else pass("sin JavaScript el panel no se ve");
  if (responses.some((u) => u.includes("maisha-quest-intro-v2.mp4")))
    fail("sin JavaScript el vídeo se pide igualmente");
  else pass("sin JavaScript el vídeo no se pide");
  const heroOk = await page.evaluate(() => !!document.querySelector("main h1")?.textContent?.trim());
  if (!heroOk) fail("sin JavaScript la portada no se ve entera");
  else pass("sin JavaScript la portada se ve entera (el hero, con normalidad)");
  await ctx.close();
}

console.log("\n== 11. El vídeo falla: se entra en la página igualmente ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await withEligible(ctx);
  const page = await ctx.newPage();
  // Los DOS formatos, no solo uno: bloquear solo el mp4 no serviría en este
  // entorno de pruebas, donde el navegador ya prueba el webm directamente
  // (sin descodificador H.264) — el vídeo simplemente reproduciría igual.
  await page.route("**/video/optimized/maisha-quest-intro-v2.*", (route) => route.fulfill({ status: 404 }));
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4700);
  const state = await page.evaluate(() => ({
    eligible: document.documentElement.hasAttribute("data-intro-eligible"),
    heroInert: document.querySelector("[data-intro-hero-content]")?.inert,
  }));
  if (state.eligible) fail("si el vídeo falla, el panel se queda activo");
  else pass("si el vídeo falla (404), se entra en la página en ~4s");
  if (state.heroInert) fail("el hero sigue inert tras el fallo");
  else pass("el hero vuelve a ser interactivo tras el fallo");
  await ctx.close();
}

console.log("\n== 12. Móvil: marco 16:9 completo, sin desbordamiento, controles en el margen ==");
for (const perfil of ["iPhone 13", "Pixel 7"]) {
  const ctx = await browser.newContext({ ...devices[perfil] });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);
  const m = await page.evaluate(() => {
    const frame = document.querySelector(".mq-intro-video-frame");
    const v = document.getElementById("mq-intro-video");
    const fr = frame.getBoundingClientRect();
    return {
      objectFit: getComputedStyle(v).objectFit,
      ratio: fr.width / fr.height,
      width: fr.width,
      viewport: window.innerWidth,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });
  if (m.objectFit !== "cover") fail(`${perfil}: object-fit es "${m.objectFit}"`);
  else pass(`${perfil}: object-fit: cover dentro de un marco 16:9 — no recorta (proporciones iguales)`);
  if (Math.abs(m.ratio - 16 / 9) > 0.03)
    fail(`${perfil}: el marco mide ${m.ratio.toFixed(3)}, no 16:9 (${(16 / 9).toFixed(3)})`);
  else pass(`${perfil}: el marco respeta 16:9 (${m.ratio.toFixed(3)})`);
  if (m.width > m.viewport + 1) fail(`${perfil}: el marco (${m.width}px) desborda el viewport (${m.viewport}px)`);
  else pass(`${perfil}: el marco cabe en el viewport`);
  if (m.overflowX) fail(`${perfil}: desbordamiento horizontal de la página`);
  else pass(`${perfil}: sin desbordamiento horizontal`);
  await ctx.close();
}

console.log("\n== 13. CLS al activarse ==");
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  await withEligible(ctx);
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(`${BASE}/en?intro=1`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const cls = await page.evaluate(() => window.__cls);
  if (cls > 0.05) fail(`CLS de ${cls.toFixed(3)} al activarse`);
  else pass(`CLS ${cls.toFixed(3)} al activarse`);
  await ctx.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Introducción (experiencia de vídeo opcional): se comporta.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
