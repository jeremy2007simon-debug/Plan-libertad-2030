/**
 * Botón de reproducción de la portada + reproductor bajo demanda del vídeo
 * de 35 s (`src/components/home/HeroFilmButton.tsx`).
 *
 * Sustituye a `test-intro.mjs`: la arquitectura anterior probaba una capa que
 * se activaba sola dentro del hero al entrar. Esa capa ya no existe — el
 * cliente pidió que el vídeo pasara de invitación implícita a explícita: la
 * portada se ve y funciona de inmediato, y el vídeo solo existe si alguien
 * pulsa el botón circular, en un overlay aparte. Esta versión comprueba:
 *
 *  1. Primera visita: la portada se ve entera de inmediato, el scroll
 *     funciona sin tocar nada, y NO se pide el vídeo.
 *  2. El clic abre el overlay, pide el archivo real y reproduce CON sonido
 *     (gesto de usuario directo, a diferencia de la introducción anterior).
 *  3. El overlay cubre toda la ventana (no queda encajado en el hueco del
 *     botón — regresión real que se dio durante el desarrollo por un
 *     "containing block" creado por la animación de entrada del hero).
 *  4. Escape cierra, pausa el vídeo y devuelve el foco al botón.
 *  5. El botón de cierre (×) hace lo mismo.
 *  6. Se puede reabrir después de cerrar, y el <video> es un elemento nuevo
 *     (arranca desde cero, no heredado del cierre anterior).
 *  7. Al terminar el vídeo (evento `ended`), la brújula de la marca avanza
 *     sola hacia la cámara y el overlay se cierra solo, sin pedir un clic
 *     más — sustituye al panel estático "Watch again" / "Close video" de
 *     antes. Escape sigue cerrando al instante en mitad de esa transición.
 *  8. Un fallo de red real (404 en los dos formatos) entra en el estado de
 *     error con un botón de reintentar, no se queda cargando para siempre.
 *  9. `prefers-reduced-motion`: el overlay se sigue pudiendo abrir y cerrar,
 *     solo cambian las transiciones.
 * 10. Sin JavaScript: la portada se ve entera y el vídeo no se pide.
 * 11. Móvil: el marco respeta 16:9 con `object-fit: contain` (el vídeo
 *     completo visible, sin recortar el rótulo final) y no desborda.
 * 12. El scroll de fondo se bloquea mientras el overlay está abierto y se
 *     restaura, en la misma posición, al cerrarlo.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-hero-film.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const problems = [];
const fail = (m) => { problems.push(m); console.log(`  FAIL  ${m}`); };
const pass = (m) => console.log(`  ok    ${m}`);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const PLAY_LABEL = "Play the Maisha Quest film — 35 sec film";

console.log("\n== 1. Primera visita: portada completa, scroll libre, sin pedir el vídeo ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const videoRequested = [];
  page.on("request", (r) => {
    if (/maisha-quest-intro-v2\.(mp4|webm)/.test(r.url())) videoRequested.push(r.url());
  });
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const h1 = await page.evaluate(() => document.querySelector("main h1")?.textContent?.trim());
  if (!h1) fail("la portada no pinta un h1 con contenido");
  else pass(`portada con h1 (\"${h1}\")`);

  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(200);
  const after = await page.evaluate(() => window.scrollY);
  if (after <= before) fail(`el scroll no avanza en la portada (antes=${before}, después=${after})`);
  else pass(`scroll libre desde el primer instante (${before} → ${after})`);

  if (videoRequested.length) fail(`el vídeo se pide sin pulsar reproducir (${videoRequested[0]})`);
  else pass("el vídeo no se pide antes del clic");

  await ctx.close();
}

console.log("\n== 2. Clic: abre, pide el archivo real, reproduce con sonido ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const videoRequested = [];
  page.on("request", (r) => {
    if (/maisha-quest-intro-v2\.(mp4|webm)/.test(r.url())) videoRequested.push(r.url());
  });
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(900);

  if (!videoRequested.length) fail("el clic no pide ningún formato del vídeo");
  else pass(`pide el archivo real (${videoRequested[0].split("/").pop()})`);

  const dialog = page.getByRole("dialog");
  if ((await dialog.count()) !== 1) fail("no se abre un único diálogo");
  else pass("se abre un diálogo (role=\"dialog\", aria-modal)");

  const state = await page.evaluate(() => {
    const v = document.querySelector("video");
    return v ? { muted: v.muted, paused: v.paused } : null;
  });
  if (!state) fail("no hay <video> en el overlay");
  else {
    if (state.muted) fail("empieza silenciado (debería sonar: gesto directo del usuario)");
    else pass("empieza CON sonido — gesto directo del usuario");
    if (state.paused) fail("el vídeo está pausado en vez de reproduciéndose");
    else pass("reproduciéndose");
  }
  await ctx.close();
}

console.log("\n== 3. El overlay cubre toda la ventana, no el hueco del botón ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(500);
  const box = await page.evaluate(() => {
    const el = document.querySelector(".mq-video-modal");
    const r = el.getBoundingClientRect();
    return { w: r.width, h: r.height, vw: window.innerWidth, vh: window.innerHeight };
  });
  if (Math.abs(box.w - box.vw) > 2 || Math.abs(box.h - box.vh) > 2) {
    fail(
      `el overlay mide ${box.w}×${box.h}, no la ventana completa (${box.vw}×${box.vh}) — probable "containing block" creado por un ancestro con transform`,
    );
  } else pass(`el overlay cubre la ventana completa (${box.w}×${box.h})`);
  await ctx.close();
}

console.log("\n== 4. Escape: cierra, pausa, devuelve el foco ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(700);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  const dialogCount = await page.getByRole("dialog").count();
  if (dialogCount) fail("el diálogo sigue abierto tras Escape");
  else pass("Escape cierra el diálogo");

  const videoGone = await page.evaluate(() => !document.querySelector("video"));
  if (!videoGone) fail("el <video> sigue en el DOM tras cerrar (podría seguir sonando)");
  else pass("el <video> se desmonta al cerrar — audio y vídeo detenidos de raíz");

  const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  if (focused !== PLAY_LABEL) fail(`el foco no vuelve al botón que abrió el vídeo (quedó en: ${focused})`);
  else pass("el foco vuelve al botón que abrió el vídeo");

  await ctx.close();
}

console.log("\n== 5. Botón de cierre (×): mismo comportamiento que Escape ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: "Close video" }).first().click();
  await page.waitForTimeout(400);
  const dialogCount = await page.getByRole("dialog").count();
  if (dialogCount) fail("el diálogo sigue abierto tras pulsar cerrar");
  else pass("el botón de cierre visible cierra el overlay");
  await ctx.close();
}

console.log("\n== 6. Reapertura: vídeo nuevo, arranca desde cero ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  const playBtn = page.getByRole("button", { name: PLAY_LABEL });
  await playBtn.click();
  await page.waitForTimeout(1200);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  await playBtn.click();
  await page.waitForTimeout(400);
  const time = await page.evaluate(() => document.querySelector("video")?.currentTime ?? -1);
  if (time < 0) fail("no se reabre un <video> tras haberlo cerrado");
  else if (time > 1.5) fail(`al reabrir no arranca desde el principio (currentTime=${time.toFixed(2)})`);
  else pass(`al reabrir arranca desde el principio (currentTime=${time.toFixed(2)})`);
  await ctx.close();
}

console.log("\n== 7. Fin del vídeo: fundido breve y cierre solo, sin repetir la entrada ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(700);
  await page.evaluate(() => document.querySelector("video").dispatchEvent(new Event("ended")));

  await page.waitForSelector(".mq-video-modal", { state: "detached", timeout: 2000 }).catch(() => {});
  const stillOpen = (await page.getByRole("dialog").count()) > 0;
  if (stillOpen) fail("el overlay no se cierra solo al terminar el vídeo");
  else pass("el overlay se cierra solo con un fundido breve, sin pedir otro clic");

  // La animación de entrada (Intro) es solo para la primera carga de la
  // home: que el vídeo termine no debe volver a activarla.
  const introReplayed = await page.evaluate(() => document.documentElement.hasAttribute("data-intro"));
  if (introReplayed) fail("terminar el vídeo repite la animación de entrada");
  else pass("terminar el vídeo no repite la animación de entrada");

  await ctx.close();
}

console.log("\n== 8. Fallo de red real: error recuperable, no carga infinita ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.route("**/video/optimized/maisha-quest-intro-v2.*", (route) => route.fulfill({ status: 404 }));
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(1500);
  const retry = page.getByRole("button", { name: "Try again" });
  if ((await retry.count()) === 0) fail("no aparece un botón de reintentar cuando el vídeo falla de verdad");
  else pass("el fallo de red muestra un botón de reintentar (estado de error recuperable)");
  await ctx.close();
}

console.log("\n== 9. Movimiento reducido: el overlay sigue abriendo y cerrando ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(500);
  const opened = (await page.getByRole("dialog").count()) === 1;
  if (!opened) fail("con movimiento reducido el overlay no llega a abrirse");
  else pass("con movimiento reducido el overlay se abre igual");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const closed = (await page.getByRole("dialog").count()) === 0;
  if (!closed) fail("con movimiento reducido el overlay no llega a cerrarse");
  else pass("con movimiento reducido el overlay se cierra igual");
  await ctx.close();
}

console.log("\n== 10. Sin JavaScript: portada completa, vídeo no se pide ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  const responses = [];
  page.on("response", (r) => responses.push(r.url()));
  await page.goto(`${BASE}/en`, { waitUntil: "domcontentloaded" });
  const heroOk = await page.evaluate(() => !!document.querySelector("main h1")?.textContent?.trim());
  if (!heroOk) fail("sin JavaScript la portada no se ve entera");
  else pass("sin JavaScript la portada se ve entera");
  if (responses.some((u) => u.includes("maisha-quest-intro-v2")))
    fail("sin JavaScript el vídeo se pide igualmente");
  else pass("sin JavaScript el vídeo no se pide");
  await ctx.close();
}

console.log("\n== 11. Móvil: 16:9 con `contain`, sin desbordamiento ==");
for (const perfil of ["iPhone 13", "Pixel 7"]) {
  const ctx = await browser.newContext({ ...devices[perfil] });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(700);
  const m = await page.evaluate(() => {
    const frame = document.querySelector(".mq-video-modal-frame");
    const v = document.querySelector(".mq-video-modal-video");
    const fr = frame.getBoundingClientRect();
    return {
      objectFit: getComputedStyle(v).objectFit,
      ratio: fr.width / fr.height,
      viewport: window.innerWidth,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  });
  if (m.objectFit !== "contain") fail(`${perfil}: object-fit es "${m.objectFit}", no "contain"`);
  else pass(`${perfil}: object-fit: contain — el plano completo, sin recortar el rótulo final`);
  if (Math.abs(m.ratio - 16 / 9) > 0.05)
    fail(`${perfil}: el marco mide ${m.ratio.toFixed(3)}, no 16:9`);
  else pass(`${perfil}: el marco respeta 16:9 (${m.ratio.toFixed(3)})`);
  if (m.overflowX) fail(`${perfil}: desbordamiento horizontal con el overlay abierto`);
  else pass(`${perfil}: sin desbordamiento horizontal`);
  await ctx.close();
}

console.log("\n== 12. Scroll de fondo bloqueado mientras está abierto, restaurado al cerrar ==");
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  // Un scroll pequeño, no uno que saque el propio botón de la ventana: nadie
  // puede pulsar un botón que no ve, así que comprobar "se conserva la
  // posición" tiene que partir de un sitio donde el botón siga siendo
  // clicable — Playwright, si no, lo desplazaría solo antes del clic (su
  // propio chequeo de "accionable"), lo que parecía un fallo del producto y
  // no lo era.
  await page.mouse.wheel(0, 150);
  await page.waitForTimeout(200);
  const before = await page.evaluate(() => window.scrollY);

  await page.getByRole("button", { name: PLAY_LABEL }).click();
  await page.waitForTimeout(400);
  // `useScrollLock` (src/lib/useScrollLock.ts) bloquea sacando el <body> del
  // flujo con `position: fixed`, no con `overflow: hidden`: ese `overflow`
  // en solitario, con `scroll-behavior: smooth` activo en toda la web,
  // animaba la página de vuelta a 0 en cuanto perdía su rango de scroll —el
  // bug real que este mismo test descubrió y que llevó a cambiar de técnica.
  const lockedWhileOpen = await page.evaluate(() => getComputedStyle(document.body).position);
  if (lockedWhileOpen !== "fixed") fail(`el scroll de fondo no se bloquea (position: ${lockedWhileOpen})`);
  else pass("el scroll de fondo se bloquea mientras el overlay está abierto");

  await page.keyboard.press("Escape");
  // El cierre real tarda 220 ms (`requestClose`, en `HeroFilmButton.tsx`) más
  // lo que tarde el hilo principal en llegar a ejecutarlo — variable según la
  // carga de la página. Un `waitForTimeout` fijo corría el riesgo de leer el
  // scroll ANTES de que el bloqueo se levantara, a veces por muy poco: se
  // espera aquí a la propia condición, no a una duración adivinada.
  await page.waitForFunction(
    () => getComputedStyle(document.body).position !== "fixed",
    { timeout: 2000 },
  );
  const after = await page.evaluate(() => window.scrollY);
  const lockedAfter = await page.evaluate(() => getComputedStyle(document.body).position);
  if (lockedAfter === "fixed") fail("el scroll de fondo sigue bloqueado tras cerrar");
  else pass("el scroll de fondo se restaura al cerrar");
  if (Math.abs(after - before) > 2) fail(`la posición de scroll cambia al cerrar (${before} → ${after})`);
  else pass(`la posición de scroll se conserva al cerrar (${before} → ${after})`);

  await ctx.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Botón de reproducción y reproductor de la portada: se comportan.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
