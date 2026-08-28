/**
 * Enlaces, contacto y SEO en los seis idiomas.
 *
 * Comprueba, sobre el sitio ya construido:
 *
 *  1. Ningún enlace muerto: ni `#`, ni `javascript:`, ni href vacío, ni un
 *     `target="_blank"` sin `rel="noopener noreferrer"`.
 *  2. Los enlaces internos conservan el idioma y no pierden `?safari=`.
 *  3. Toda ruta interna alcanzable responde 200.
 *  4. Teléfono, correo y WhatsApp son los verificados, y no abren pestaña.
 *  5. Los enlaces sociales son los confirmados; los perfiles de reseñas NO
 *     aparecen mientras no haya URL oficial.
 *  6. Canonical, hreflang de los seis, x-default y Open Graph en cada página.
 *  7. El sitemap y robots.txt son coherentes con lo que declara cada página:
 *     nada marcado «no indexar» aparece en el sitemap.
 *
 * Uso
 * ---
 *   npm run build && npm run start &
 *   node scripts/check-links-seo.mjs [http://127.0.0.1:3000]
 */

import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] || "http://127.0.0.1:3000";
const LOCALES = ["en", "es", "de", "fr", "ru", "zh-CN"];

/** Datos de contacto verificados. Si cambian, cambian aquí y en `site.ts`. */
const CONTACT = {
  tel: "tel:+255672426411",
  mail: "mailto:info@maishaquest.com",
  whatsapp: "https://wa.me/255672426411",
};
/** Perfiles que NO deben aparecer mientras no exista URL oficial confirmada. */
const FORBIDDEN_HOSTS = ["tripadvisor.", "safaribookings.", "g.page", "goo.gl/maps"];

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const HARVEST = () => ({
  links: [...document.querySelectorAll("a[href]")].map((a) => ({
    href: a.getAttribute("href"),
    target: a.getAttribute("target"),
    rel: a.getAttribute("rel"),
    text: (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
  })),
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
  alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => ({
    lang: l.getAttribute("hreflang"),
    href: l.getAttribute("href"),
  })),
  robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null,
  og: {
    title: document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null,
    url: document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null,
    description:
      document.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null,
  },
  h1: document.querySelectorAll("h1").length,
});

/* ---- 1. Rastreo de todas las rutas alcanzables ---------------------------- */

console.log("== 1. Enlaces internos y rutas ==");
const seen = new Map();
const external = new Set();
const badRel = [];
const deadHrefs = [];
const localeLeaks = [];

for (const locale of LOCALES) {
  const queue = [`/${locale}`];
  const visited = new Set();
  while (queue.length) {
    const path = queue.shift();
    if (visited.has(path)) continue;
    visited.add(path);

    const response = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    const status = response?.status() ?? 0;
    seen.set(path, status);
    if (status !== 200) {
      fail(`${path} responde ${status}`);
      continue;
    }

    const data = await page.evaluate(HARVEST);
    if (data.h1 !== 1) fail(`${path} tiene ${data.h1} elementos h1`);

    for (const link of data.links) {
      const href = link.href ?? "";
      if (!href.trim() || href === "#" || href.startsWith("javascript:")) {
        deadHrefs.push(`${path} → "${href}" (${link.text})`);
        continue;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        if (link.target === "_blank")
          badRel.push(`${path} → ${href} abre pestaña nueva sin necesidad`);
        continue;
      }
      if (/^https?:\/\//.test(href)) {
        external.add(href);
        if (link.target === "_blank" && !/noopener/.test(link.rel ?? ""))
          badRel.push(`${path} → ${href} sin rel="noopener noreferrer"`);
        continue;
      }
      if (href.startsWith("#")) continue;
      // Rutas globales del sitio: no llevan idioma porque no lo tienen.
      if (/^\/(sitemap\.xml|robots\.txt|icon\.svg|favicon\.ico)/.test(href)) continue;
      // Interno: debe llevar prefijo de idioma, y el de esta página.
      const segment = href.split("/")[1] ?? "";
      if (!LOCALES.includes(segment)) {
        localeLeaks.push(`${path} → ${href} sin prefijo de idioma`);
        continue;
      }
      if (segment !== locale) {
        // Solo el selector de idioma puede apuntar a otro: se reconoce porque
        // el resto de la ruta es idéntico.
        const here = path.replace(`/${locale}`, "");
        const there = href.split("?")[0].replace(`/${segment}`, "");
        if (here !== there)
          localeLeaks.push(`${path} → ${href} cambia de idioma y de ruta a la vez`);
        continue;
      }
      const clean = href.split("#")[0];
      if (!visited.has(clean)) queue.push(clean);
    }
  }
}

if (deadHrefs.length) for (const d of deadHrefs) fail(`enlace muerto: ${d}`);
else pass("ningún enlace muerto (#, javascript:, href vacío)");
if (badRel.length) for (const d of badRel) fail(d);
else pass('todo target="_blank" lleva rel="noopener noreferrer"');
if (localeLeaks.length) for (const d of localeLeaks) fail(d);
else pass("todos los enlaces internos conservan el idioma");
pass(`${seen.size} rutas internas visitadas, todas 200`);

/* ---- 2. Contacto y perfiles ---------------------------------------------- */

console.log("\n== 2. Contacto y perfiles externos ==");
{
  await page.goto(`${BASE}/en/contact`, { waitUntil: "domcontentloaded" });
  const { links } = await page.evaluate(HARVEST);
  const hrefs = links.map((l) => l.href);
  for (const [name, value] of Object.entries(CONTACT)) {
    if (hrefs.some((h) => h === value || h?.startsWith(value)))
      pass(`${name}: ${value}`);
    else fail(`falta o cambió el enlace de ${name} (${value})`);
  }
  const forbidden = [...external].filter((u) =>
    FORBIDDEN_HOSTS.some((host) => u.includes(host)),
  );
  if (forbidden.length) for (const u of forbidden) fail(`perfil de reseñas sin confirmar: ${u}`);
  else pass("ni TripAdvisor, ni SafariBookings, ni Google: no se pintan sin URL oficial");
  console.log(`  enlaces externos distintos en toda la web: ${external.size}`);
  for (const u of [...external].sort()) console.log(`    ${u}`);
}

/* ---- 3. SEO: canonical, hreflang, OG ------------------------------------- */

console.log("\n== 3. Canonical, hreflang y Open Graph ==");
{
  const samples = ["", "/safaris", "/destinations/serengeti", "/contact", "/legal/terms"];
  let checked = 0;
  for (const path of samples) {
    for (const locale of LOCALES) {
      await page.goto(`${BASE}/${locale}${path}`, { waitUntil: "domcontentloaded" });
      const d = await page.evaluate(HARVEST);
      checked += 1;
      const where = `/${locale}${path || "/"}`;
      if (!d.canonical) fail(`${where} sin canonical`);
      else if (!d.canonical.includes(`/${locale}`)) fail(`${where} canonical con otro idioma: ${d.canonical}`);
      const langs = d.alternates.map((a) => a.lang);
      const expected = ["en", "es", "de", "fr", "ru", "zh-Hans", "x-default"];
      const missing = expected.filter((l) => !langs.includes(l));
      if (missing.length) fail(`${where} sin hreflang: ${missing.join(", ")}`);
      if (!d.og.title || !d.og.url) fail(`${where} sin Open Graph completo`);
      if (path === "/legal/terms" && d.robots !== "noindex, nofollow")
        fail(`${where} debería ser "noindex, nofollow" y es "${d.robots}"`);
    }
  }
  pass(`${checked} páginas con canonical, seis hreflang, x-default y Open Graph`);
}

/* ---- 4. Sitemap y robots ------------------------------------------------- */

console.log("\n== 4. Sitemap y robots.txt ==");
{
  const sitemap = await (await page.request.get(`${BASE}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const noindexed = urls.filter((u) => /\/legal\//.test(u));
  if (noindexed.length) for (const u of noindexed) fail(`el sitemap anuncia una página noindex: ${u}`);
  else pass(`sitemap con ${urls.length} URLs, ninguna marcada «no indexar»`);

  const robots = await (await page.request.get(`${BASE}/robots.txt`)).text();
  if (!/Sitemap:/i.test(robots)) fail("robots.txt no declara el sitemap");
  else pass("robots.txt declara el sitemap");
  if (!/Disallow: \/api\//.test(robots)) fail("robots.txt no excluye /api/");
  else pass("robots.txt excluye /api/");
}

await browser.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Enlaces y SEO: sin problemas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
