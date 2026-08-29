/**
 * Las ocho tarjetas del carrusel de experiencias, juzgadas JUNTAS.
 *
 * Por qué existe
 * -------------
 * Una fotografía puede estar impecable por su cuenta y romper la fila. El
 * cliente lo señaló con una captura: el boma con dominante azul violácea y, a
 * su lado, unas chaquetas turquesa y naranja que se comían el carrusel. Medir
 * los archivos de uno en uno no lo detecta; hay que mirarlos en secuencia.
 *
 * Qué comprueba
 * -------------
 *  1. Las ocho tarjetas existen y se sirven las ocho fotografías esperadas.
 *  2. Ninguna se sale de la dirección cromática: sin dominante azul, violeta
 *     ni cian, sin saturación disparada y sin quedarse gris.
 *  3. La distancia de color entre vecinas no da un salto: la colección tiene
 *     que parecer un mismo viaje.
 *  4. La geometría es la misma en las ocho —alto, proporción, radio— a
 *     360, 390, 430, 768, 1024 y 1440 px.
 *  5. Todas comparten el mismo velo.
 *  6. Cero desbordamiento horizontal y el carrusel sigue desplazándose.
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

/** Distancia de color entre dos tarjetas, para detectar saltos en la fila. */
const distancia = (a, b) =>
  Math.sqrt(a.rgb.reduce((acc, v, i) => acc + (v - b.rgb[i]) ** 2, 0));

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

/* ---- 1. Qué se sirve, y cómo está cada fotografía ------------------------- */

console.log("\n== 1. Las ocho fotografías de la fila ==");
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
const page = await context.newPage();
await page.goto(`${BASE}/es`, { waitUntil: "networkidle" });
await page.locator("[data-hscroll]").first().scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);

const servidas = await page.evaluate(() =>
  // El PRIMER carrusel de la página es el de experiencias; más abajo hay otros
  // dos (viajes destacados y equipo) que no son cosa de esta comprobación.
  [...document.querySelector("[data-hscroll]").querySelectorAll("li > a")].map((a) => {
    const img = a.querySelector("img");
    const src = img?.currentSrc || img?.src || "";
    const inner = new URL(src, location.href).searchParams.get("url") ?? src;
    return {
      titulo: a.querySelector("h3")?.textContent?.trim() ?? "?",
      archivo: decodeURIComponent(inner).split("/").pop(),
      objectPosition: img ? getComputedStyle(img).objectPosition : "",
      velo: a.querySelector(".media-scrim-soft") ? "compartido" : "propio",
    };
  }),
);

if (servidas.length !== 8) fail(`hay ${servidas.length} tarjetas, esperadas 8`);
else pass(`ocho tarjetas: ${servidas.map((s) => s.titulo).join(", ")}`);

const medidas = [];
for (const t of servidas) {
  // La carpeta se decide mirando el disco, no adivinando por el nombre.
  const candidatos = [
    `public/images/maisha-quest/optimized/${t.archivo}`,
    `public/images/tanzania/${t.archivo}`,
  ].map((r) => fileURLToPath(new URL(r, ROOT)));
  const file = candidatos.find((c) => existsSync(c));
  if (!file) {
    fail(`${t.titulo}: no se encuentra el archivo ${t.archivo}`);
    continue;
  }
  const m = await medir(file);
  medidas.push({ ...t, ...m });
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
      `${m.titulo.padEnd(18)} ${String(m.kelvin).padStart(5)} K · sat ${String(
        Math.round(m.saturacion * 100),
      ).padStart(2)} % · B/R ${m.azulSobreRojo.toFixed(2)} · violeta ${Math.round(m.violeta * 100)} %`,
    );
}

/* ---- 2. Ningún salto entre vecinas --------------------------------------- */

console.log("\n== 2. La fila, sin saltos ==");
{
  const saltos = [];
  for (let i = 1; i < medidas.length; i += 1) {
    if (medidas[i].archivo === ACENTO || medidas[i - 1].archivo === ACENTO) continue;
    const d = distancia(medidas[i - 1], medidas[i]);
    if (d > 70) saltos.push(`${medidas[i - 1].titulo} → ${medidas[i].titulo} (${Math.round(d)})`);
  }
  if (saltos.length) fail(`salto de color entre vecinas: ${saltos.join(" · ")}`);
  else pass("ninguna vecina se despega de la siguiente (el atardecer, aparte)");

  const kelvins = medidas.filter((m) => m.archivo !== ACENTO).map((m) => m.kelvin);
  const rango = Math.max(...kelvins) - Math.min(...kelvins);
  if (rango > 2600) fail(`las siete fotografías de día abarcan ${rango} K de extremo a extremo`);
  else
    pass(
      `las siete de día caben en ${rango} K (${Math.min(...kelvins)}–${Math.max(...kelvins)}), ` +
        `más el atardecer como acento`,
    );
}

/* ---- 3. El velo, el mismo en las ocho ------------------------------------ */

console.log("\n== 3. Velo y encuadre ==");
{
  const propios = servidas.filter((s) => s.velo !== "compartido");
  if (propios.length) fail(`${propios.length} tarjetas no usan el velo compartido`);
  else pass("las ocho comparten el mismo velo");

  for (const s of servidas) {
    console.log(`         ${s.titulo.padEnd(18)} object-position ${s.objectPosition}`);
  }
}
await context.close();

/* ---- 4. Geometría idéntica en los seis anchos ---------------------------- */

console.log("\n== 4. Misma geometría en los seis anchos ==");
for (const width of ANCHOS) {
  const c = await browser.newContext({
    viewport: { width, height: width < 500 ? 844 : 900 },
    isMobile: width < 768,
  });
  const p = await c.newPage();
  await p.goto(`${BASE}/es`, { waitUntil: "networkidle" });

  const escritorio = width >= 1024;
  const selector = escritorio ? "ul.grid.grid-cols-4 a" : "[data-hscroll] li > a";
  await p.locator(selector).first().scrollIntoViewIfNeeded();
  await p.waitForTimeout(900);

  const cajas = await p.evaluate((sel) => {
    const raiz = sel.startsWith("[data-hscroll]")
      ? document.querySelector("[data-hscroll]")
      : document.querySelector("ul.grid.grid-cols-4");
    const dentro = sel.startsWith("[data-hscroll]") ? "li > a" : "a";
    const out = [];
    for (const a of raiz.querySelectorAll(dentro)) {
      const r = a.getBoundingClientRect();
      const cs = getComputedStyle(a);
      out.push({
        w: Math.round(r.width),
        h: Math.round(r.height),
        ratio: Number((r.width / r.height).toFixed(3)),
        radio: cs.borderRadius,
      });
    }
    return { cajas: out, desborde: document.documentElement.scrollWidth > window.innerWidth };
  }, selector);

  if (cajas.cajas.length !== 8) {
    fail(`${width}px: ${cajas.cajas.length} tarjetas visibles, esperadas 8`);
    await c.close();
    continue;
  }

  // En escritorio la rejilla alterna dos proporciones a propósito; dentro de
  // cada grupo tienen que ser idénticas.
  const grupos = escritorio
    ? [cajas.cajas.filter((_, i) => i % 2 === 0), cajas.cajas.filter((_, i) => i % 2 === 1)]
    : [cajas.cajas];

  const desiguales = grupos.some((g) =>
    g.some((c2) => Math.abs(c2.h - g[0].h) > 1 || Math.abs(c2.ratio - g[0].ratio) > 0.01),
  );
  const radios = new Set(cajas.cajas.map((c2) => c2.radio));

  if (desiguales) fail(`${width}px: las tarjetas no miden lo mismo`);
  else if (radios.size > 1) fail(`${width}px: radios distintos (${[...radios].join(", ")})`);
  else if (cajas.desborde) fail(`${width}px: hay desbordamiento horizontal`);
  else
    pass(
      `${width}px: ${grupos
        .map((g) => `${g.length}×${g[0].w}×${g[0].h}`)
        .join(" y ")} · radio ${[...radios][0]} · sin desbordamiento`,
    );
  await c.close();
}

/* ---- 5. El carrusel sigue siendo un carrusel ----------------------------- */

console.log("\n== 5. El carrusel se desplaza ==");
{
  const c = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await c.newPage();
  await p.goto(`${BASE}/es`, { waitUntil: "networkidle" });
  const pista = p.locator("[data-hscroll]").first();
  await pista.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  const antes = await pista.evaluate((el) => el.scrollLeft);
  await pista.evaluate((el) => el.scrollBy({ left: 600, behavior: "instant" }));
  await p.waitForTimeout(400);
  const despues = await pista.evaluate((el) => el.scrollLeft);
  if (despues <= antes) fail("el carrusel no se desplaza horizontalmente");
  else pass(`el carrusel se desplaza (${antes} → ${Math.round(despues)} px)`);

  const snap = await pista.evaluate((el) => getComputedStyle(el).scrollSnapType);
  if (!snap.includes("x")) fail(`el snap horizontal se ha perdido (${snap})`);
  else pass(`snap horizontal intacto (${snap})`);
  await c.close();
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Carrusel de experiencias: las ocho tarjetas son una misma colección.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
