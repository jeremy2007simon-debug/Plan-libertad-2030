/**
 * SJ Wheels — Medición de rendimiento y consola sobre la tienda real.
 *
 * Mide lo que se puede medir de verdad desde aquí: tiempos de navegación,
 * LCP, CLS, peso transferido y número de peticiones. No inventa una
 * puntuación de Lighthouse: Lighthouse no está instalado en este entorno y
 * una puntuación aproximada no sirve de nada.
 *
 * También recoge los errores de consola y los separa en dos montones: los que
 * salen del tema y los que salen de la infraestructura de Shopify (píxeles,
 * banner de privacidad, shop.app), que no dependen de este trabajo.
 *
 *   PREVIEW=https://…shopifypreview.com node sj-wheels/tests/rendimiento/medir.js
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');

const PREVIEW = (process.env.PREVIEW || '').replace(/\/$/, '');
const LOCALE = process.env.LOCALE || '/es';
if (!PREVIEW) { console.error('Falta PREVIEW=https://…'); process.exit(2); }

const SPKI = process.env.SPKI || (() => {
  try { return fs.readFileSync(path.join(__dirname, '..', 'enlaces', 'spki.txt'), 'utf8').trim(); } catch { return ''; }
})();

/* Lo que es de Shopify y no del tema. */
const DE_SHOPIFY = [
  /\/web-pixels/, /privacy-banner/, /shop\.app/, /login_with_shop/,
  /\/api\/[\w.-]+\/graphql\.json/, /customer-account/, /shopifycloud/,
  /monorail/, /cdn\.shopify\.com\/shopifycloud/,
];
const esDeShopify = (t) => DE_SHOPIFY.some((r) => r.test(t));

const RUTAS = ['', '/collections/all', '/pages/solicitud-de-compatibilidad'];
const VISTAS = [
  { nombre: 'escritorio', width: 1440, height: 900 },
  { nombre: 'movil', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch({
    args: SPKI ? ['--ignore-certificate-errors-spki-list=' + SPKI] : []
  });

  const delTema = [];
  const deShopify = new Set();
  const filas = [];

  for (const vista of VISTAS) {
    const ctx = await browser.newContext({ viewport: { width: vista.width, height: vista.height }, locale: 'es-ES' });
    const cookie = await ctx.newPage();
    await cookie.goto(PREVIEW + '/', { waitUntil: 'domcontentloaded' });
    await cookie.waitForTimeout(400);
    await cookie.close();

    for (const r of RUTAS) {
      const page = await ctx.newPage();
      let bytes = 0, peticiones = 0;

      page.on('console', (m) => {
        if (m.type() !== 'error') return;
        const t = m.text();
        /* «Failed to load resource» no lleva la URL en el texto: viene en la
           localización del mensaje. Sin mirarla, un recurso de Shopify se
           contaría como error del tema. */
        const origen = (m.location() && m.location().url) || '';
        if (esDeShopify(t) || esDeShopify(origen)) {
          deShopify.add((origen ? origen.slice(0, 110) + ' · ' : '') + t.slice(0, 110));
        } else {
          delTema.push(`${vista.nombre} ${LOCALE}${r} · ${t.slice(0, 140)}${origen ? ' ← ' + origen.slice(0, 110) : ''}`);
        }
      });
      page.on('pageerror', (e) => {
        if (esDeShopify(e.message)) deShopify.add(e.message.slice(0, 120));
        else delTema.push(`${vista.nombre} ${LOCALE}${r} · pageerror: ${e.message.slice(0, 160)}`);
      });
      page.on('response', async (resp) => {
        peticiones++;
        if (resp.status() >= 400 && !esDeShopify(resp.url())) {
          delTema.push(`${vista.nombre} ${LOCALE}${r} · ${resp.status()} ${resp.url().slice(0, 120)}`);
        } else if (resp.status() >= 400) {
          deShopify.add(`${resp.status()} ${resp.url().slice(0, 110)}`);
        }
        try {
          const l = (await resp.headerValue('content-length')) || '0';
          bytes += parseInt(l, 10) || 0;
        } catch { /* respuesta ya descartada */ }
      });

      /* Observadores en marcha antes de navegar. */
      await page.addInitScript(() => {
        window.__sjw = { lcp: 0, cls: 0 };
        try {
          new PerformanceObserver((l) => {
            for (const e of l.getEntries()) window.__sjw.lcp = Math.max(window.__sjw.lcp, e.startTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (!e.hadRecentInput) window.__sjw.cls += e.value;
          }).observe({ type: 'layout-shift', buffered: true });
        } catch (e) { /* navegador sin soporte */ }
      });

      const t0 = Date.now();
      await page.goto(PREVIEW + LOCALE + r, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(3000);

      const m = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0] || {};
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        return {
          ttfb: Math.round(nav.responseStart || 0),
          domcl: Math.round(nav.domContentLoadedEventEnd || 0),
          load: Math.round(nav.loadEventEnd || 0),
          fcp: fcp ? Math.round(fcp.startTime) : null,
          lcp: Math.round(window.__sjw.lcp || 0),
          cls: Math.round((window.__sjw.cls || 0) * 1000) / 1000,
          recursos: performance.getEntriesByType('resource').length,
          transferido: performance.getEntriesByType('resource')
            .reduce((a, e) => a + (e.transferSize || 0), (performance.getEntriesByType('navigation')[0] || {}).transferSize || 0),
        };
      });

      filas.push({ vista: vista.nombre, ruta: LOCALE + (r || '/'), ...m, reloj: Date.now() - t0, peticiones });
      await page.close();
    }
    await ctx.close();
  }

  await browser.close();

  const kb = (b) => (b / 1024).toFixed(0) + ' kB';
  console.log('\n| Vista | Página | TTFB | FCP | LCP | CLS | DOM listo | load | Recursos | Transferido |');
  console.log('|---|---|---|---|---|---|---|---|---|---|');
  for (const f of filas) {
    console.log(`| ${f.vista} | ${f.ruta} | ${f.ttfb} ms | ${f.fcp} ms | ${f.lcp} ms | ${f.cls} | ${f.domcl} ms | ${f.load} ms | ${f.recursos} | ${kb(f.transferido)} |`);
  }

  console.log('\n--- Consola ---');
  if (delTema.length === 0) console.log('Del tema: ningún error.');
  else { console.log(`Del tema: ${delTema.length}`); delTema.forEach((x) => console.log('  ✗ ' + x)); }
  console.log(`De la infraestructura de Shopify (no depende del tema): ${deShopify.size}`);
  [...deShopify].forEach((x) => console.log('  · ' + x));

  if (delTema.length) process.exitCode = 1;
})();
