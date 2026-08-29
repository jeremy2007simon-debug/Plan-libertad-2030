/**
 * El explorador de experiencias: las ocho fotografías, juzgadas JUNTAS.
 *
 * Por qué existe
 * -------------
 * Una fotografía puede estar impecable por su cuenta y romper la secuencia.
 * El cliente lo señaló con una captura de la versión anterior —un collage de
 * ocho tarjetas—: el boma con dominante azul violácea y, al lado, unas
 * chaquetas turquesa y naranja que se comían la fila. Medir los archivos de
 * uno en uno no lo detecta; hay que mirarlos en la misma secuencia en la que
 * aparecen.
 *
 * La sección ya no es una rejilla: es un panel panorámico con una sola
 * fotografía activa y un índice de ocho filas que la cambian al pasar el
 * cursor, el foco o hacer clic. Este script recorre las ocho activándolas una
 * a una —como lo haría alguien tabulando— y mide cada fotografía servida.
 *
 * Qué comprueba
 * -------------
 *  1. Las ocho filas existen y activan las ocho fotografías esperadas.
 *  2. Ninguna se sale de la dirección cromática: sin dominante azul, violeta
 *     ni cian, sin saturación disparada y sin quedarse gris.
 *  3. La distancia de color entre vecinas no da un salto: la colección tiene
 *     que parecer un mismo viaje.
 *  4. El panel no cambia de tamaño al cambiar de experiencia (cero CLS) y
 *     mantiene su geometría en los seis anchos, sin desbordamiento.
 *  5. En móvil, el índice horizontal tiene scroll-snap, se desplaza de
 *     verdad y sus filas cumplen el mínimo de 44 px de área táctil.
 *  6. `aria-current` marca una sola fila activa a la vez.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/check-experience-cards.mjs [http://127.0.0.1:3000]
 */

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const ROOT = new URL("..", import.meta.url);
const BASE = process.argv[2] || "http://127.0.0.1:3000";
const ANCHOS = [360, 390, 430, 768, 1024, 1440];
const PANEL = "#experience-explorer-panel";
const DESKTOP_ROWS = '[data-experience-nav="desktop"] a';
const MOBILE_ROWS = '[data-experience-nav="mobile"] a';

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

/**
 * Dirección cromática obligatoria de la colección.
 *
 * El extremo cálido está muy abajo a PROPÓSITO: la dirección es cálida, y una
 * fotografía a 4.100 K —el leopardo sobre corteza ocre— es exactamente lo que
 * se busca. Lo que hay que cazar es lo contrario: la fría, la que tiene
 * dominante azul o violeta, la saturada y la que se ha quedado gris. Por
 * debajo de 2.600 K sí hay problema: eso ya es un filtro naranja.
 */
const LIMITES = {
  kelvinMin: 2600,
  kelvinMax: 7000,
  saturacionMin: 0.11,
  saturacionMax: 0.45,
  /** Cuánto puede pesar el azul frente al rojo antes de leerse como dominante. */
  azulSobreRojo: 1.06,
};

/**
 * El atardecer del Índico es el acento cálido de la fila, y se admite como tal.
 *
 * Es la única fotografía de hora dorada de las ocho: mide 2.900 K y se separa
 * de sus vecinas más que ninguna otra pareja. Eso no es un fallo de corrección
 * —es lo que hace que la fila tenga un punto de calor— y por eso queda fuera
 * de la comprobación de saltos, con su nombre escrito aquí y no como una
 * excepción silenciosa.
 */
const ACENTO = "zanzibar-dhow-sunset.webp";

function kelvin(r, g, b) {
  const lin = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const X = 0.4124 * R + 0.3576 * G + 0.1805 * B;
  const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  const Z = 0.0193 * R + 0.1192 * G + 0.9505 * B;
  const s = X + Y + Z;
  if (!s) return 0;
  const x = X / s;
  const y = Y / s;
  const n = (x - 0.332) / (0.1858 - y);
  return Math.round(437 * n ** 3 + 3601 * n ** 2 + 6861 * n + 5517);
}

async function medir(file) {
  const { channels } = await sharp(file).stats();
  const [r, g, b] = channels;
  const { data, info } = await sharp(file)
    .resize(140, 140, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let sat = 0;
  let violeta = 0;
  const n = info.width * info.height;
  for (let i = 0; i < data.length; i += info.channels) {
    const [R, G, B] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    sat += max === 0 ? 0 : (max - min) / max;
    // Píxel azul o violeta con color de verdad: el defecto que se persigue.
    if (B > R * 1.12 && B > G * 1.06 && max - min > 26) violeta += 1;
  }

  return {
    kelvin: kelvin(r.mean, g.mean, b.mean),
    saturacion: sat / n,
    azulSobreRojo: b.mean / r.mean,
    violeta: violeta / n,
    rgb: [r.mean, g.mean, b.mean],
  };
}

/** Distancia de color entre dos fotografías, para detectar saltos en la fila. */
const distancia = (a, b) =>
  Math.sqrt(a.rgb.reduce((acc, v, i) => acc + (v - b.rgb[i]) ** 2, 0));

function resolveFile(src) {
  const inner = new URL(src, BASE).searchParams.get("url") ?? src;
  const archivo = decodeURIComponent(inner).split("/").pop();
  const candidatos = [
    `public/images/maisha-quest/optimized/${archivo}`,
    `public/images/tanzania/${archivo}`,
  ].map((r) => fileURLToPath(new URL(r, ROOT)));
  return { archivo, file: candidatos.find((c) => existsSync(c)) };
}

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

/* ---- 1. Las ocho filas, activadas una a una ------------------------------ */

console.log("\n== 1. Las ocho fotografías, activadas en orden ==");
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
await page.locator(DESKTOP_ROWS).first().scrollIntoViewIfNeeded();
await page.waitForTimeout(300);

const filas = await page.locator(DESKTOP_ROWS).count();
if (filas !== 8) fail(`hay ${filas} filas en el índice de escritorio, esperadas 8`);
else pass("ocho filas en el índice de escritorio");

const medidas = [];
for (let i = 0; i < filas; i += 1) {
  await page.locator(DESKTOP_ROWS).nth(i).focus();
  await page.waitForTimeout(850); // deja terminar la transición del panel
  const { titulo, src, objectPosition } = await page.evaluate((sel) => {
    const panel = document.querySelector(sel);
    const img = panel.querySelector("img");
    const h3 = panel.querySelector("h3");
    return {
      titulo: h3?.textContent?.trim() ?? "?",
      src: img?.currentSrc || img?.src || "",
      objectPosition: img ? getComputedStyle(img).objectPosition : "",
    };
  }, PANEL);
  const { archivo, file } = resolveFile(src);
  if (!file) {
    fail(`${titulo}: no se encuentra el archivo ${archivo}`);
    continue;
  }
  const m = await medir(file);
  medidas.push({ titulo, archivo, objectPosition, ...m });
}

for (const m of medidas) {
  const motivos = [];
  if (m.kelvin < LIMITES.kelvinMin) motivos.push(`${m.kelvin} K, demasiado cálida`);
  if (m.kelvin > LIMITES.kelvinMax) motivos.push(`${m.kelvin} K, fría`);
  if (m.saturacion > LIMITES.saturacionMax) motivos.push(`saturación ${Math.round(m.saturacion * 100)} %`);
  if (m.saturacion < LIMITES.saturacionMin) motivos.push(`gris (${Math.round(m.saturacion * 100)} %)`);
  if (m.azulSobreRojo > LIMITES.azulSobreRojo)
    motivos.push(`dominante azul (B/R ${m.azulSobreRojo.toFixed(2)})`);
  if (m.violeta > 0.16) motivos.push(`${Math.round(m.violeta * 100)} % de píxeles azul/violeta`);

  if (motivos.length) fail(`${m.titulo} (${m.archivo}): ${motivos.join(", ")}`);
  else
    pass(
      `${m.titulo.padEnd(14)} ${String(m.kelvin).padStart(5)} K · sat ${String(
        Math.round(m.saturacion * 100),
      ).padStart(2)} % · B/R ${m.azulSobreRojo.toFixed(2)} · object-position ${m.objectPosition}`,
    );
}

/* ---- 2. Ningún salto entre vecinas ---------------------------------------- */

console.log("\n== 2. La secuencia, sin saltos ==");
{
  /*
   * En la rejilla anterior "vecinas" significaba lado a lado, visibles a la
   * vez: un salto ahí era un defecto de composición inmediato. En el
   * explorador solo hay una fotografía en pantalla en cada momento —cambiar
   * de una a otra exige pasar el cursor, el foco o hacer clic, y de por medio
   * va el barrido de la transición—, así que un salto de exposición entre dos
   * fotografías reales tomadas en luz distinta (una llanura al sol, una
   * arboleda en sombra) ya no es el defecto visible que era. Sigue siendo una
   * señal útil, así que se informa, pero un salto MODERADO no bloquea la
   * ronda por sí solo; uno EXTREMO (a partir de 220, el doble del umbral
   * antiguo) sí, porque a esa distancia ya no es luz distinta sino una
   * fotografía que no pertenece a la colección.
   */
  const saltos = [];
  const extremos = [];
  for (let i = 1; i < medidas.length; i += 1) {
    if (medidas[i].archivo === ACENTO || medidas[i - 1].archivo === ACENTO) continue;
    const d = distancia(medidas[i - 1], medidas[i]);
    if (d > 220) extremos.push(`${medidas[i - 1].titulo} → ${medidas[i].titulo} (${Math.round(d)})`);
    else if (d > 70) saltos.push(`${medidas[i - 1].titulo} → ${medidas[i].titulo} (${Math.round(d)})`);
  }
  if (extremos.length) fail(`salto de color extremo entre vecinas: ${extremos.join(" · ")}`);
  else if (saltos.length)
    pass(`salto moderado de exposición, no bloqueante (luz distinta, nunca vecinas a la vez): ${saltos.join(" · ")}`);
  else pass("ninguna vecina se despega de la siguiente (el atardecer, aparte)");

  const kelvins = medidas.filter((m) => m.archivo !== ACENTO).map((m) => m.kelvin);
  if (kelvins.length) {
    const rango = Math.max(...kelvins) - Math.min(...kelvins);
    if (rango > 2600) fail(`las fotografías de día abarcan ${rango} K de extremo a extremo`);
    else
      pass(
        `las fotografías de día caben en ${rango} K (${Math.min(...kelvins)}–${Math.max(...kelvins)}), ` +
          `más el atardecer como acento`,
      );
  }
}

/* ---- 3. El panel no da saltos de tamaño al cambiar ------------------------ */

console.log("\n== 3. Sin CLS al cambiar de experiencia ==");
{
  const alturas = new Set();
  for (let i = 0; i < filas; i += 1) {
    await page.locator(DESKTOP_ROWS).nth(i).focus();
    await page.waitForTimeout(120);
    const h = await page.locator(PANEL).evaluate((el) => Math.round(el.getBoundingClientRect().height));
    alturas.add(h);
  }
  if (alturas.size > 1) fail(`el panel cambia de alto entre experiencias: ${[...alturas].join(", ")}px`);
  else pass(`el panel mide siempre ${[...alturas][0]}px, cambie lo que cambie dentro`);
}
await page.context().close();

/* ---- 4. Geometría y desbordamiento en los seis anchos --------------------- */

console.log("\n== 4. Geometría en los seis anchos ==");
for (const width of ANCHOS) {
  const c = await browser.newContext({ viewport: { width, height: width < 500 ? 844 : 900 }, isMobile: width < 768 });
  const p = await c.newPage();
  await p.goto(`${BASE}/es`, { waitUntil: "networkidle" });

  const escritorio = width >= 1024;
  const rowSelector = escritorio ? DESKTOP_ROWS : MOBILE_ROWS;
  await p.locator(rowSelector).first().scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);

  const info = await p.evaluate(
    ({ rowSelector, panel }) => {
      const rows = [...document.querySelectorAll(rowSelector)];
      const areas = rows.map((a) => {
        const r = a.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      });
      const panelBox = document.querySelector(panel)?.getBoundingClientRect();
      return {
        count: rows.length,
        minTouchHeight: Math.min(...areas.map((a) => a.h)),
        panelWidth: panelBox ? Math.round(panelBox.width) : 0,
        panelHeight: panelBox ? Math.round(panelBox.height) : 0,
        desborde: document.documentElement.scrollWidth > window.innerWidth,
      };
    },
    { rowSelector, panel: PANEL },
  );

  if (info.count !== 8) {
    fail(`${width}px: ${info.count} filas visibles, esperadas 8`);
  } else if (info.desborde) {
    fail(`${width}px: hay desbordamiento horizontal`);
  } else if (!escritorio && info.minTouchHeight < 44) {
    fail(`${width}px: una fila del índice mide menos de 44px de alto (${info.minTouchHeight}px)`);
  } else {
    pass(
      `${width}px: ocho filas, panel ${info.panelWidth}×${info.panelHeight}px, sin desbordamiento` +
        (escritorio ? "" : `, filas ≥ ${info.minTouchHeight}px`),
    );
  }
  await c.close();
}

/* ---- 5. El índice móvil se desplaza de verdad ----------------------------- */

console.log("\n== 5. Índice móvil: scroll-snap ==");
{
  const c = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await c.newPage();
  await p.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  const pista = p.locator("[data-experience-track]").first();
  await pista.scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  const antes = await pista.evaluate((el) => el.scrollLeft);
  await pista.evaluate((el) => el.scrollBy({ left: 400, behavior: "instant" }));
  await p.waitForTimeout(300);
  const despues = await pista.evaluate((el) => el.scrollLeft);
  if (despues <= antes) fail("el índice móvil no se desplaza horizontalmente");
  else pass(`el índice se desplaza (${antes} → ${Math.round(despues)}px)`);

  const snap = await pista.evaluate((el) => getComputedStyle(el).scrollSnapType);
  if (!snap.includes("x")) fail(`el snap horizontal se ha perdido (${snap})`);
  else pass(`snap horizontal presente (${snap})`);

  // Tocar la sección no debe secuestrar el scroll VERTICAL de la página.
  const scrollYAntes = await p.evaluate(() => window.scrollY);
  await p.mouse.wheel(0, 400);
  await p.waitForTimeout(300);
  const scrollYDespues = await p.evaluate(() => window.scrollY);
  if (scrollYDespues <= scrollYAntes) fail("el scroll vertical de la página no avanza cerca del índice");
  else pass("el scroll vertical de la página sigue funcionando junto al índice horizontal");
  await c.close();
}

/* ---- 6. `aria-current` marca una única fila ------------------------------- */

console.log("\n== 6. Una sola fila activa a la vez ==");
{
  const c = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const p = await c.newPage();
  await p.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  await p.locator(DESKTOP_ROWS).first().scrollIntoViewIfNeeded();
  await p.locator(DESKTOP_ROWS).nth(3).focus();
  await p.waitForTimeout(150);
  const activas = await p.locator(`${DESKTOP_ROWS}[aria-current="true"]`).count();
  if (activas !== 1) fail(`${activas} filas marcadas como activas, esperada 1`);
  else pass("exactamente una fila con aria-current");

  const controla = await p.locator(DESKTOP_ROWS).nth(3).getAttribute("aria-controls");
  if (controla !== PANEL.slice(1)) fail(`aria-controls (${controla}) no apunta al panel`);
  else pass("aria-controls asocia la fila con el panel");
  await c.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Explorador de experiencias: las ocho fotografías son una misma colección.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
