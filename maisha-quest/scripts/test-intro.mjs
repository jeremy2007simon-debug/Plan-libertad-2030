/**
 * La introducción cinematográfica se comporta.
 *
 * Comprueba lo que el encargo pide, en el navegador:
 *
 *  1. Primera visita a la portada: se ejecuta, el vídeo cubre la pantalla,
 *     el hero ya está detrás, y al terminar de verdad (vídeo → rótulo →
 *     barrido) se desmonta sola y deja el scroll libre.
 *  2. Segunda visita dentro de la misma sesión: NO se ejecuta.
 *  3. `?intro=1`: se ejecuta aunque la marca de sesión exista.
 *  4. Nunca en una ruta interna, ni al volver a la portada navegando.
 *  5. `prefers-reduced-motion`: no se ejecuta, y la portada se ve entera.
 *  6. `saveData`: no se ejecuta —el vídeo pesa 2,3 MB, así que importa más
 *     que con la secuencia anterior en CSS.
 *  7. Sin JavaScript: no se ve, y la portada se ve entera. Tampoco se pide
 *     el vídeo: sin `src` en el HTML no hay red que comprobar.
 *  8. El botón de saltar y la tecla Escape la cierran de inmediato.
 *  9. No atrapa el foco ni hace que un lector lea el rótulo dos veces.
 * 10. En móvil el vídeo cubre el viewport exacto, centrado, sin desbordar.
 * 11. Cero CLS al abrirse.
 * 12. Si el vídeo falla (URL rota en los dos formatos), se entra en la
 *     página, como muy tarde a los 4 s.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-intro.mjs [http://127.0.0.1:3000]
 */

import { chromium, devices } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const KEY = "maisha-cinematic-intro-v3";
// Duración real del vídeo (15 s) + rótulo y barrido (~1,9 s) + margen.
const FULL_CYCLE_MS = 18500;

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

/* ---- 1. Primera visita, ciclo completo ------------------------------------ */

console.log("\n== 1. Primera visita: ciclo completo ==");
const sesion = await browser.newContext({ viewport: { width: 1280, height: 800 } });
// El guardián no ejecuta la introducción en un navegador automatizado —una
// capa a pantalla completa falsearía las demás herramientas—, así que aquí
// se disimula para poder probar la primera visita tal y como la vive una
// persona.
await sesion.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => false });
});
{
  const page = await sesion.newPage();
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const estado = await page.evaluate(introVisible);
  if (!estado.root || !estado.visible) fail("la introducción no se ejecuta en la primera visita");
  else pass("se ejecuta en la primera visita");

  const video = await page.evaluate(() => {
    const v = document.getElementById("mq-intro-video");
    return v ? { src: v.currentSrc || v.src, muted: v.muted, playsInline: v.playsInline } : null;
  });
  // El navegador elige por sí solo cuál de los dos <source> reproduce (ver
  // Intro.tsx): H.264 en casi todos, VP9 donde no. Cualquiera de los dos es
  // correcto aquí — lo que importa es que sea uno de los dos archivos reales.
  if (!video || !/\/video\/maisha-quest-intro\.(mp4|webm)$/.test(video.src))
    fail(`el vídeo no tiene el origen esperado (${video?.src})`);
  else pass(`el vídeo pide un archivo real (${video.src.split("/").pop()}), y solo tras decidir que se reproduce`);
  if (!video?.muted) fail("el vídeo no está silenciado");
  else pass("autoplay silenciado");
  if (!video?.playsInline) fail("el vídeo no lleva playsInline");
  else pass("playsInline activo");

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

  // A mitad del vídeo, todavía tiene que estar puesta.
  await page.waitForTimeout(7000);
  const mitad = await page.evaluate(introVisible);
  if (!mitad.visible) fail("la introducción se cierra antes de que termine el vídeo");
  else pass("sigue puesta a mitad del vídeo");

  // El vídeo termina, se revela el rótulo, y el barrido la desmonta sola.
  await page.waitForTimeout(FULL_CYCLE_MS - 7000);
  const despues = await page.evaluate(introVisible);
  if (despues.existe || despues.root) fail("la capa sigue en el DOM tras el ciclo completo");
  else pass("se desmonta del DOM al terminar el ciclo completo");

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
  const responses = [];
  page.on("response", (r) => responses.push(r.url()));
  await page.goto(`${BASE}/es`, { waitUntil: "domcontentloaded" });
  const oculto = await page.evaluate(() => {
    const node = document.getElementById("mq-intro");
    return !node || getComputedStyle(node).display === "none";
  });
  if (!oculto) fail("sin JavaScript la capa tapa la portada");
  else pass("sin JavaScript la capa no se ve");
  if (responses.some((u) => u.includes("maisha-quest-intro.mp4") || u.includes("maisha-quest-intro.webm")))
    fail("sin JavaScript el vídeo se pide igualmente");
  else pass("sin JavaScript el vídeo no se pide");
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
  else pass(`${via}: la cierra de inmediato y la retira del DOM, sin esperar al vídeo`);
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
      videoDentroDeOculto: !!node.querySelector("[aria-hidden='true'] #mq-intro-video"),
      botonFuera: !skip?.closest("[aria-hidden='true']"),
      focoInicial: document.activeElement === document.body,
    };
  });
  if (!info.escenarioOculto) fail("lo decorativo no está bajo aria-hidden");
  else pass("todo lo decorativo va bajo aria-hidden");
  if (!info.videoDentroDeOculto) fail("el vídeo de la introducción se anunciaría junto al del hero");
  else pass("el vídeo no se anuncia: no hay un segundo rótulo que leer");
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

/* ---- 9. Móvil: geometría del vídeo ----------------------------------------- */

console.log("\n== 9. Móvil ==");
for (const perfil of ["iPhone 13", "Pixel 7"]) {
  const context = await browser.newContext({ ...devices[perfil] });
  const page = await context.newPage();
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);

  const m = await page.evaluate(() => {
    const v = document.getElementById("mq-intro-video");
    const frame = document.querySelector(".mq-intro-frame");
    const node = document.getElementById("mq-intro");
    const vr = v ? v.getBoundingClientRect() : null;
    const fr = frame ? frame.getBoundingClientRect() : null;
    return {
      objectFit: v ? getComputedStyle(v).objectFit : "",
      frameAncho: fr ? fr.width : 0,
      frameAlto: fr ? fr.height : 0,
      videoAncho: vr ? Math.round(vr.width) : 0,
      videoIzquierda: vr ? vr.left : 0,
      videoDerecha: vr ? vr.right : 0,
      viewport: window.innerWidth,
      alto: node ? Math.round(node.getBoundingClientRect().height) : 0,
      ventana: window.innerHeight,
      desborde: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  // El vídeo en sí usa `cover`, pero dentro de un marco (`.mq-intro-frame`)
  // que fuerza la proporción exacta del plano (910×512): "llenarlo" y
  // "contenerlo" son la misma operación cuando las proporciones coinciden, así
  // que el rótulo manuscrito nunca se recorta por los lados en ninguna
  // pantalla, y el marco queda centrado por construcción.
  if (m.objectFit !== "cover") fail(`${perfil}: object-fit es "${m.objectFit}", no "cover"`);
  else pass(`${perfil}: object-fit: cover dentro de un marco 910:512 — nunca recorta`);
  const proporcion = m.frameAncho / m.frameAlto;
  const esperada = 910 / 512;
  if (Math.abs(proporcion - esperada) > 0.02)
    fail(`${perfil}: el marco mide ${proporcion.toFixed(3)}, no la proporción del plano (${esperada.toFixed(3)})`);
  else pass(`${perfil}: el marco respeta la proporción exacta del plano (${proporcion.toFixed(3)})`);
  if (m.videoAncho > m.viewport + 2)
    fail(`${perfil}: el vídeo (${m.videoAncho}px) desborda el viewport (${m.viewport}px)`);
  else pass(`${perfil}: el vídeo cabe siempre dentro del viewport`);
  const centrado = Math.abs(m.videoIzquierda - (m.viewport - m.videoDerecha)) <= 2;
  if (!centrado) fail(`${perfil}: el vídeo no queda centrado horizontalmente`);
  else pass(`${perfil}: sujeto y rótulo centrados (contain los centra por construcción)`);
  if (m.desborde) fail(`${perfil}: hay desbordamiento horizontal`);
  else pass(`${perfil}: sin desbordamiento horizontal`);
  if (Math.abs(m.alto - m.ventana) > 2) fail(`${perfil}: la capa mide ${m.alto} y la ventana ${m.ventana}`);
  else pass(`${perfil}: la capa cubre el viewport exacto (${m.alto} px)`);
  await context.close();
}

/* ---- 10. CLS ---------------------------------------------------------------
   Solo se mide la apertura: el cierre retira un nodo `position: fixed` que no
   participa del flujo, así que no puede provocar un salto de maquetación por
   construcción — esperar aquí al ciclo completo (~18,5 s) no añadiría nada. */

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
  await page.waitForTimeout(2500);
  const cls = await page.evaluate(() => window.__cls);
  if (cls > 0.02) fail(`CLS de ${cls.toFixed(3)} al abrirse la introducción`);
  else pass(`CLS ${cls.toFixed(3)} al abrirse la introducción`);
  await context.close();
}

/* ---- 11. El vídeo falla ----------------------------------------------------
   Se comprueba interceptando la petición de LOS DOS archivos (los dos
   <source>) con un 404 propio, en vez de confiar en que el de verdad falle:
   así la prueba no depende de la red y es la forma honesta de simular "el
   vídeo falla" sin tocar los archivos reales, que siguen sirviéndose bien en
   el resto de la suite. Bloquear solo uno de los dos no serviría: el
   navegador simplemente probaría el otro <source> y el vídeo se reproduciría
   igual.

   Con un 404 en los dos, Chromium deja `networkState` en `NETWORK_NO_SOURCE`
   pero, medido, NO siempre dispara el evento `error` del propio `<video>` —sí
   lo hace de forma fiable ante un códec no soportado, comprobado aparte—, así
   que quien de verdad garantiza la salida aquí es el segundo cinturón:
   "si a los 4 s no ha empezado a reproducir, se entra en la página" (ver
   Intro.tsx). De ahí que la espera de esta prueba pase de los 4 s. */

console.log("\n== 11. Si el vídeo falla, se entra en la página de inmediato ==");
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.route("**/video/maisha-quest-intro.*", (route) => route.fulfill({ status: 404 }));
  await page.goto(`${BASE}/es?intro=1`, { waitUntil: "domcontentloaded" });
  const antes = await page.evaluate(introVisible);
  if (!antes.visible) fail("la introducción no llega a mostrarse antes del fallo");
  await page.waitForTimeout(4500);
  const despues = await page.evaluate(introVisible);
  if (despues.existe || despues.root) fail("tras el fallo del vídeo, la capa sigue puesta");
  else pass("el vídeo falla (404 en los dos formatos) y se entra en la página, sin rótulo ni barrido");
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
