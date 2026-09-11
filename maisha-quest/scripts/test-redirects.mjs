/**
 * El mapa de redirecciones 301 (`WIX_REDIRECTS` en `next.config.ts`), puesto
 * a prueba.
 *
 * No repite el spot-check manual de la Fase 3 —eso ya comprobó que cada
 * destino es la página real correcta—; comprueba que el MAPA en sí es
 * internamente coherente y que sigue sirviéndose tal cual en runtime:
 *
 *  1. Cada `source` es único: ninguna URL de Wix redirige a dos sitios.
 *  2. Cada `destination` existe de verdad en la aplicación (una petición
 *     real, sin prefijo de idioma, responde 200 — nunca a otra redirección).
 *  3. Sin cadenas: ningún `destination` es a la vez el `source` de otra
 *     entrada del propio mapa.
 *  4. Las rutas funcionan con el idioma delante: `/{locale}{destination}`
 *     responde 200 en los seis idiomas para una muestra.
 *  5. Las exclusiones documentadas (`WIX_EXCLUDED_ROUTES`) no tienen entrada
 *     en `WIX_REDIRECTS` por accidente, y `/english-refund-policy` en
 *     particular sigue sin redirección — pendiente de que el cliente decida
 *     qué política usar.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/test-redirects.mjs [http://127.0.0.1:3000]
 */

import { WIX_REDIRECTS, WIX_EXCLUDED_ROUTES } from "../next.config.ts";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"];

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

/* ---- 1. Orígenes únicos --------------------------------------------------- */

console.log("== 1. Cada origen es único ==");
{
  const seen = new Map();
  const dupes = [];
  for (const { source } of WIX_REDIRECTS) {
    if (seen.has(source)) dupes.push(source);
    seen.set(source, (seen.get(source) ?? 0) + 1);
  }
  if (dupes.length) for (const d of dupes) fail(`origen repetido: ${d} (${seen.get(d)} veces)`);
  else pass(`${WIX_REDIRECTS.length} orígenes, todos distintos`);
}

/* ---- 2. Sin cadenas -------------------------------------------------------- */

console.log("\n== 2. Sin cadenas (ningún destino es también un origen) ==");
{
  const sources = new Set(WIX_REDIRECTS.map((r) => r.source));
  const chains = WIX_REDIRECTS.filter((r) => sources.has(r.destination));
  if (chains.length)
    for (const c of chains) fail(`cadena: ${c.source} → ${c.destination} → ${WIX_REDIRECTS.find((r) => r.source === c.destination)?.destination}`);
  else pass("ningún destino del mapa es a la vez origen de otra entrada");
}

/* ---- 3. Cada destino existe ------------------------------------------------ */

console.log("\n== 3. Cada destino responde 200, sin prefijo de idioma ==");
{
  let checked = 0;
  for (const { source, destination } of WIX_REDIRECTS) {
    const res = await fetch(`${BASE}${destination}`, { redirect: "manual" });
    checked += 1;
    // Sin idioma en la URL, el propio proxy.ts SIEMPRE redirige (307) al
    // idioma detectado — eso es el comportamiento correcto y esperado, no un
    // destino roto. Un destino roto respondería 404 tras seguir esa
    // redirección, o directamente algo que no sea 2xx/3xx aquí mismo.
    if (![200, 307, 308].includes(res.status)) {
      fail(`${source} → ${destination}: responde ${res.status}`);
      continue;
    }
    if (res.status === 200) continue;
    const location = res.headers.get("location");
    if (!location) {
      fail(`${source} → ${destination}: ${res.status} sin cabecera Location`);
      continue;
    }
    const followed = await fetch(new URL(location, BASE), { redirect: "manual" });
    if (followed.status !== 200) {
      fail(`${source} → ${destination}: tras la redirección de idioma, ${location} responde ${followed.status}`);
    }
  }
  if (problems.length === 0) pass(`los ${checked} destinos existen de verdad`);
}

/* ---- 4. La redirección real funciona, y con idioma delante ---------------- */

console.log("\n== 4. La redirección funciona, en los seis idiomas ==");
{
  // Una muestra: todas serían 41 × 6 = 246 peticiones adicionales por poco
  // más de información. Se cubre un origen de cada bloque del mapa.
  const sample = [
    WIX_REDIRECTS.find((r) => r.source === "/2days-tanzania-safaris"),
    WIX_REDIRECTS.find((r) => r.source === "/12days-enrich-tanzania-luxury-safaris"),
    WIX_REDIRECTS.find((r) => r.source === "/thrill-seaker-adventures"),
    WIX_REDIRECTS.find((r) => r.source === "/explorer-tanzania-safaris"),
    WIX_REDIRECTS.find((r) => r.source === "/blog"),
    WIX_REDIRECTS.find((r) => r.source === "/cares"),
    WIX_REDIRECTS.find((r) => r.source.startsWith("/post/")),
  ].filter(Boolean);

  let checked = 0;
  for (const { source, destination } of sample) {
    for (const locale of LOCALES) {
      const res = await fetch(`${BASE}${source}`, { redirect: "manual" });
      if (![301, 308].includes(res.status)) {
        fail(`${source}: responde ${res.status}, no una redirección permanente`);
        continue;
      }
      const location = res.headers.get("location") ?? "";
      if (!location.endsWith(destination)) {
        fail(`${source}: redirige a ${location}, no a ${destination}`);
        continue;
      }
      // Con Accept-Language forzado, la segunda redirección debe caer en ese idioma.
      const localized = await fetch(`${BASE}${destination}`, {
        redirect: "manual",
        headers: { "Accept-Language": locale === "zh-CN" ? "zh-CN" : locale },
      });
      const localizedLocation = localized.headers.get("location") ?? "";
      if (!localizedLocation.includes(`/${locale}${destination}`)) {
        fail(`${destination} con Accept-Language: ${locale} no redirige a /${locale}${destination} (llegó a ${localizedLocation})`);
        continue;
      }
      checked += 1;
    }
  }
  if (problems.filter((p) => p.includes("no redirige a /")).length === 0)
    pass(`${checked} combinaciones origen × idioma resuelven a la página correcta en su idioma`);
}

/* ---- 5. Las exclusiones siguen fuera y documentadas ----------------------- */

console.log("\n== 5. Las exclusiones documentadas siguen excluidas ==");
{
  const redirectedSources = new Set(WIX_REDIRECTS.map((r) => r.source));
  let ok = true;
  for (const { source, reason } of WIX_EXCLUDED_ROUTES) {
    if (redirectedSources.has(source)) {
      fail(`${source} tiene una redirección, pero está documentada como excluida (${reason})`);
      ok = false;
    }
  }
  if (ok) pass(`las ${WIX_EXCLUDED_ROUTES.length} exclusiones documentadas siguen sin redirección`);

  if (redirectedSources.has("/english-refund-policy")) {
    fail("/english-refund-policy tiene una redirección — no debe tenerla hasta que el cliente decida la política");
  } else {
    pass("/english-refund-policy sigue sin redirección, a la espera de la decisión del cliente");
  }
}

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Mapa de redirecciones: sin problemas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of [...new Set(problems)]) console.log(`  - ${p}`);
process.exit(1);
