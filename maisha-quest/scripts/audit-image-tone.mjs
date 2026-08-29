/**
 * Auditoría del tono fotográfico de la portada.
 *
 * Por qué existe
 * --------------
 * «Unificar el tono» no se puede discutir a ojo: dos personas miran la misma
 * home y una ve azul y la otra no. Esto mide cada fotografía que se sirve de
 * verdad en la portada —no las que están en el repositorio, las que el
 * navegador descarga— y escribe los números en un documento.
 *
 * Cómo lo hace
 * ------------
 *  1. Abre la portada en Chromium a 1440 y a 390 px y recoge cada `<img>` con
 *     su `currentSrc`, su caja renderizada, su recorte y la sección en la que
 *     está. La sección sale del DOM, no de una lista escrita a mano.
 *  2. Mide el archivo con `sharp`: medias por canal, luminancia, contraste,
 *     saturación, dominantes, sombras y altas luces, y si es monocroma.
 *  3. Cruza cada archivo con `CLIENT_PHOTOS` y `PHOTOS` para sacar procedencia
 *     y estado de derechos.
 *  4. Escribe `docs/homepage-image-tone-audit.md`.
 *
 * La temperatura se estima con el método de McCamy sobre el color medio: no es
 * un colorímetro, pero sirve para lo único que hace falta aquí, que es ordenar
 * las fotografías de la más fría a la más cálida y ver cuáles se salen.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/audit-image-tone.mjs [http://127.0.0.1:3000]
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const ROOT = new URL("..", import.meta.url);
const BASE = process.argv[2] || "http://127.0.0.1:3000";

/* ---- Procedencia --------------------------------------------------------- */

const CLIENT_SRC = readFileSync(new URL("src/data/client-photography.ts", ROOT), "utf8");
const COMMONS_SRC = readFileSync(new URL("src/data/photography.ts", ROOT), "utf8");

/** Derechos de cada foto del cliente, leídos del registro. */
const clientRights = new Map(
  [...CLIENT_SRC.matchAll(/\n {2}"?([a-z0-9-]+)"?: \{([\s\S]*?)\n {2}\},/g)].map(
    ([, key, body]) => [
      key,
      {
        origen: "Cliente",
        archivo: /sourceFilename: "([^"]+)"/.exec(body)?.[1] ?? "?",
        comercial: /commercialUseConfirmed: true/.test(body) ? "Confirmados" : "Sin confirmar",
        autoria: /authorConfirmed: true/.test(body) ? "Confirmada" : "Sin confirmar",
      },
    ],
  ),
);

/** Y de las provisionales de Wikimedia Commons. */
const commonsRights = new Map(
  [...COMMONS_SRC.matchAll(/\n {2}"?([a-z0-9-]+)"?: \{([\s\S]*?)\n {2}\},/g)].map(
    ([, key, body]) => [
      key,
      {
        origen: "Commons (provisional)",
        archivo: "—",
        comercial: /license: "([^"]+)"/.exec(body)?.[1] ?? "licencia declarada",
        autoria: /photographer: "([^"]+)"/.exec(body)?.[1] ?? "—",
      },
    ],
  ),
);

const rightsFor = (slug) =>
  clientRights.get(slug) ??
  commonsRights.get(slug) ?? {
    origen: "—",
    archivo: "—",
    comercial: "—",
    autoria: "—",
  };

/* ---- Medición ------------------------------------------------------------ */

/**
 * Temperatura de color aproximada (McCamy) del color medio de la imagen.
 *
 * Sube cuanto más azul es la foto y baja cuanto más cálida. No pretende ser
 * exacta: sirve para comparar unas fotos con otras dentro de esta misma home.
 */
function kelvin(r, g, b) {
  const [R, G, B] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const X = 0.4124 * R + 0.3576 * G + 0.1805 * B;
  const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  const Z = 0.0193 * R + 0.1192 * G + 0.9505 * B;
  const sum = X + Y + Z;
  if (sum === 0) return 0;
  const x = X / sum;
  const y = Y / sum;
  const n = (x - 0.332) / (0.1858 - y);
  return Math.round(437 * n ** 3 + 3601 * n ** 2 + 6861 * n + 5517);
}

async function measure(file) {
  const image = sharp(file);
  const meta = await image.metadata();
  const stats = await image.stats();
  const [r, g, b] = stats.channels;

  // Se remuestrea pequeño para el histograma: la media de sharp da el color,
  // pero no el reparto entre sombras y luces ni la saturación real.
  const { data, info } = await image
    .clone()
    .resize(160, 160, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let shadows = 0;
  let highlights = 0;
  let satSum = 0;
  let monoDelta = 0;
  const píxeles = info.width * info.height;
  for (let i = 0; i < data.length; i += info.channels) {
    const R = data[i];
    const G = data[i + 1];
    const B = data[i + 2];
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    const l = (0.2126 * R + 0.7152 * G + 0.0722 * B) / 255;
    if (l < 0.25) shadows += 1;
    if (l > 0.85) highlights += 1;
    satSum += max === 0 ? 0 : (max - min) / max;
    monoDelta += max - min;
  }

  const luminancia = (0.2126 * r.mean + 0.7152 * g.mean + 0.0722 * b.mean) / 255;
  const contraste = (0.2126 * r.stdev + 0.7152 * g.stdev + 0.0722 * b.stdev) / 255;
  const total = r.mean + g.mean + b.mean || 1;

  return {
    ancho: meta.width,
    alto: meta.height,
    peso: meta.size,
    kelvin: kelvin(r.mean, g.mean, b.mean),
    luminancia,
    contraste,
    saturacion: satSum / píxeles,
    sombras: shadows / píxeles,
    altas: highlights / píxeles,
    rojo: r.mean / total,
    verde: g.mean / total,
    azul: b.mean / total,
    // Un canal medio del amarillo: rojo y verde altos con azul bajo.
    amarillo: (r.mean + g.mean) / 2 / total,
    monocroma: monoDelta / píxeles < 12,
  };
}

/* ---- Qué se sirve de verdad en la portada -------------------------------- */

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

async function harvest(width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto(`${BASE}/en`, { waitUntil: "networkidle" });
  // Recorre la página entera: casi todo carga en diferido.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);

  const found = await page.evaluate(() =>
    [...document.querySelectorAll("img")].map((img) => {
      const box = img.getBoundingClientRect();
      const cs = getComputedStyle(img);
      const section = img.closest("section, header, footer");
      const heading = section?.querySelector("h1, h2, h3");
      return {
        src: img.currentSrc || img.src,
        alt: img.alt,
        ancho: Math.round(box.width),
        alto: Math.round(box.height),
        fit: cs.objectFit,
        position: cs.objectPosition,
        seccion:
          (heading?.textContent || section?.getAttribute("aria-label") || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 60) || "—",
      };
    }),
  );
  await context.close();
  return found;
}

const escritorio = await harvest(1440, 900);
const movil = await harvest(390, 844);
await browser.close();

/** `/_next/image?url=%2Fimages%2F…&w=…` → el archivo real del repositorio. */
function toFile(src) {
  const url = new URL(src, BASE);
  const inner = url.searchParams.get("url") ?? url.pathname;
  const path = decodeURIComponent(inner);
  if (!path.startsWith("/images/")) return null;
  return fileURLToPath(new URL(`public${path}`, ROOT));
}

const porArchivo = new Map();
for (const [viewport, lista] of [["escritorio", escritorio], ["móvil", movil]]) {
  for (const img of lista) {
    const file = toFile(img.src);
    if (!file) continue;
    const slug = file.split("/").pop().replace(/\.\w+$/, "");
    if (!porArchivo.has(slug)) porArchivo.set(slug, { slug, file, usos: [] });
    porArchivo.get(slug).usos.push({ ...img, viewport });
  }
}

const filas = [];
for (const entrada of porArchivo.values()) {
  filas.push({ ...entrada, ...(await measure(entrada.file)) });
}
filas.sort((a, b) => a.kelvin - b.kelvin);

/* ---- El documento -------------------------------------------------------- */

const pct = (n) => `${Math.round(n * 100)} %`;
const dec = (n) => n.toFixed(2);

const OBJETIVO = {
  kelvinMin: 4800,
  kelvinMax: 7200,
  saturacionMin: 0.14,
  saturacionMax: 0.42,
  sombrasMax: 0.55,
  altasMax: 0.12,
};

const fuera = (f) => {
  const motivos = [];
  if (f.monocroma) motivos.push("monocroma");
  if (f.kelvin > OBJETIVO.kelvinMax) motivos.push(`fría (${f.kelvin} K)`);
  if (f.kelvin < OBJETIVO.kelvinMin) motivos.push(`muy cálida (${f.kelvin} K)`);
  if (f.saturacion > OBJETIVO.saturacionMax) motivos.push(`saturada (${pct(f.saturacion)})`);
  if (f.saturacion < OBJETIVO.saturacionMin && !f.monocroma)
    motivos.push(`apagada (${pct(f.saturacion)})`);
  if (f.sombras > OBJETIVO.sombrasMax) motivos.push(`sombras ${pct(f.sombras)}`);
  if (f.altas > OBJETIVO.altasMax) motivos.push(`altas luces ${pct(f.altas)}`);
  return motivos;
};

let md = `# Auditoría del tono fotográfico de la portada

Generado por \`node scripts/audit-image-tone.mjs\`. **No se escribe a mano**: mide
los archivos que el navegador descarga de verdad al abrir \`/en\`, recorriendo la
página entera a 1440 y a 390 px.

Fecha de esta pasada: ${new Date().toISOString().slice(0, 10)}.
Fotografías distintas servidas en la portada: **${filas.length}**.

## Dirección fotográfica objetivo

Cálida, natural y cinematográfica. Sombras ligeramente oliva, luces arena y
doradas, marrones y terracotas naturales, saturación contenida y negros suaves
sin aplastar. Nada de filtros naranjas, nada de aspecto de Instagram, y los
colores reales de flamencos, cielo, agua y vegetación intactos.

Umbrales que usa este informe para marcar una fotografía como discordante:

| Medida | Rango objetivo |
| --- | --- |
| Temperatura | ${OBJETIVO.kelvinMin}–${OBJETIVO.kelvinMax} K |
| Saturación media | ${pct(OBJETIVO.saturacionMin)}–${pct(OBJETIVO.saturacionMax)} |
| Sombras (luminancia < 0,25) | hasta ${pct(OBJETIVO.sombrasMax)} |
| Altas luces (> 0,85) | hasta ${pct(OBJETIVO.altasMax)} |
| Monocroma | descartada salvo función editorial declarada |

## Medidas, de la más fría a la más cálida

| Fotografía | K | Lum. | Contr. | Sat. | Sombras | Altas | R/G/B | Mono | Fuera de rango |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | :-: | --- |
`;

for (const f of filas) {
  const m = fuera(f);
  md += `| \`${f.slug}\` | ${f.kelvin} | ${dec(f.luminancia)} | ${dec(f.contraste)} | ${pct(f.saturacion)} | ${pct(f.sombras)} | ${pct(f.altas)} | ${pct(f.rojo)}/${pct(f.verde)}/${pct(f.azul)} | ${f.monocroma ? "sí" : "—"} | ${m.length ? m.join(", ") : "—"} |\n`;
}

md += `
## Dónde se usa cada una, y con qué derechos

| Fotografía | Sección | Recorte servido | Origen | Archivo original | Uso comercial | Autoría |
| --- | --- | --- | --- | --- | --- | --- |
`;

for (const f of filas) {
  const r = rightsFor(f.slug);
  const secciones = [...new Set(f.usos.map((u) => u.seccion))].join(" · ");
  const recortes = [...new Set(f.usos.map((u) => `${u.viewport} ${u.ancho}×${u.alto}`))].join(" · ");
  md += `| \`${f.slug}\` | ${secciones} | ${recortes} | ${r.origen} | \`${r.archivo}\` | ${r.comercial} | ${r.autoria} |\n`;
}

/**
 * Marcadas por el umbral, aceptadas a propósito.
 *
 * Un umbral no distingue un atardecer de un error de color. Estas se quedan
 * como están, y aquí queda escrito por qué: si alguien las «arregla» dentro de
 * seis meses, romperá justo lo que se buscaba.
 */
const ACEPTADAS = {
  "tanzania-wildlife-sunset-hero":
    "Es un atardecer, y es el hero. Cálida y saturada es la dirección buscada, no un defecto.",
  "savannah-acacia-sunset": "Atardecer. Igual que el hero.",
  "zanzibar-dhow-sunset": "Atardecer sobre el mar.",
  "serengeti-sunset": "Atardecer.",
  "safari-tent-accommodation": "Hora dorada dentro de una tienda: la luz es esa.",
  "leopard-in-tree": "Luz de tarde sobre hierba seca; los colores son reales.",
  "lion-open-savannah": "Igual: sabana seca a media tarde.",
  "flamingo-flock-in-motion": "Luz cálida de última hora sobre el agua.",
  "kilimanjaro-climbers":
    "El 36 % de altas luces es el glaciar. Comprimirlo grisearía la nieve. Ya se le subió la saturación.",
  "african-elephant-portrait":
    "Blanco y negro DELIBERADO: va sola en «‘Maisha’ significa vida», sin ninguna fotografía en color al lado con la que chocar. Las otras monocromas, que sí convivían con fotografías en color, se han retirado.",
  "serengeti-plains": "Ya armonizada; el 45 % restante es hierba verde de verdad.",
  "tarangire-baobab": "Ya armonizada: de 38 % a 13 % de altas luces.",
  "flamingos-tanzania-lake": "Ya armonizada, de 9.128 K a 7.422 K. Más allá, el agua deja de ser agua.",
  "maasai-boma": "Ya armonizada, de 11.579 K a 8.597 K. Más allá, el cielo se vuelve crema.",
};

const discordantes = filas.filter((f) => fuera(f).length && !ACEPTADAS[f.slug]);
md += `
## Discordantes que quedan por resolver

${
  discordantes.length === 0
    ? "Ninguna."
    : discordantes.map((f) => `- \`${f.slug}\` — ${fuera(f).join(", ")}`).join("\n")
}

## Marcadas por el umbral y aceptadas a propósito

Un umbral no distingue un atardecer de un error de color.

${filas
  .filter((f) => fuera(f).length && ACEPTADAS[f.slug])
  .map((f) => `- \`${f.slug}\` (${fuera(f).join(", ")}) — ${ACEPTADAS[f.slug]}`)
  .join("\n")}

## Repeticiones

`;

const repetidas = filas
  .map((f) => ({
    slug: f.slug,
    veces: new Set(f.usos.filter((u) => u.viewport === "escritorio").map((u) => u.seccion)).size,
  }))
  .filter((f) => f.veces > 1);

md += repetidas.length
  ? repetidas.map((f) => `- \`${f.slug}\` aparece en ${f.veces} secciones de la portada`).join("\n")
  : "Ninguna fotografía se repite en dos secciones de la portada.";

md += "\n";

mkdirSync(new URL("docs/", ROOT), { recursive: true });
writeFileSync(new URL("docs/homepage-image-tone-audit.md", ROOT), md);

console.log(`Fotografías medidas: ${filas.length}`);
for (const f of filas) {
  const m = fuera(f);
  console.log(
    `  ${m.length ? "!" : " "} ${f.slug.padEnd(32)} ${String(f.kelvin).padStart(5)} K  sat ${pct(f.saturacion).padStart(5)}  ${m.join(", ")}`,
  );
}
console.log("\nEscrito docs/homepage-image-tone-audit.md");
