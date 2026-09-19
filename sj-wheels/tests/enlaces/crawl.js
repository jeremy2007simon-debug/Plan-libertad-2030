/**
 * SJ Wheels — Rastreador de enlaces internos del storefront.
 *
 * Recorre la tienda renderizada (no el código) y comprueba cada enlace interno.
 * Detecta lo que un grep no puede ver: rutas mal concatenadas, pérdida del
 * idioma activo, dobles barras, anclas muertas y 404.
 *
 *   PREVIEW=https://…shopifypreview.com node sj-wheels/tests/enlaces/crawl.js
 *   PREVIEW=… LOCALE=/es node sj-wheels/tests/enlaces/crawl.js
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');

const PREVIEW = (process.env.PREVIEW || '').replace(/\/$/, '');
const LOCALE = process.env.LOCALE || '/es';
if (!PREVIEW) { console.error('Falta PREVIEW=https://…'); process.exit(2); }

const SPKI = process.env.SPKI || (() => {
  try { return fs.readFileSync(path.join(__dirname, 'spki.txt'), 'utf8').trim(); } catch { return ''; }
})();

const RUTAS = [
  '', '/collections/all', '/collections/llantas-19-pulgadas', '/collections/llantas-bmw',
  '/cart', '/search?q=llanta',
  '/pages/contact', '/pages/solicitud-de-compatibilidad', '/pages/guia-de-compatibilidad',
  '/pages/guia-de-medidas', '/pages/como-comprar', '/pages/envios',
  '/pages/cambios-y-devoluciones', '/pages/garantia', '/pages/seguimiento-del-pedido',
  '/pages/sobre-sj-wheels', '/pages/marcas',
];

/* Enlaces que salen del sitio o que Shopify gestiona fuera del tema. */
const EXTERNO = (h) => /^(https?:|mailto:|tel:|wa\.me|#)/.test(h) && !h.startsWith('#');

(async () => {
  const browser = await chromium.launch({
    args: SPKI ? ['--ignore-certificate-errors-spki-list=' + SPKI] : []
  });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-ES' });
  const page = await ctx.newPage();
  await page.goto(PREVIEW + '/', { waitUntil: 'domcontentloaded' });  // cookie de vista previa
  await page.waitForTimeout(400);

  /* Pestaña aparte para comprobar destinos.
     `page.request.get` no manda las cabeceras de un documento: /account devolvía
     406 sin estar roto. Se navega de verdad, que es lo que hace el cliente. */
  const sonda = await ctx.newPage();

  const problemas = [];
  const vistos = new Map();          // href -> {estado, origen}
  let totalEnlaces = 0;

  for (const r of RUTAS) {
    const url = PREVIEW + LOCALE + r;
    let estado = 0;
    try { estado = (await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })).status(); }
    catch (e) { problemas.push({ pagina: LOCALE + r, tipo: 'pagina_no_carga', detalle: e.message.slice(0, 80) }); continue; }
    await page.waitForTimeout(700);

    const enlaces = await page.evaluate(() => [...document.querySelectorAll('a')].map((a) => ({
      href: a.getAttribute('href'),
      texto: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 40),
      visible: !!a.offsetParent || getComputedStyle(a).position === 'fixed',
      enMenu: !!a.closest('nav, header, footer'),
    })));

    for (const e of enlaces) {
      totalEnlaces++;
      const h = e.href;

      if (h === null) { problemas.push({ pagina: LOCALE + r, tipo: 'sin_href', texto: e.texto }); continue; }
      if (h.trim() === '') { problemas.push({ pagina: LOCALE + r, tipo: 'href_vacio', texto: e.texto }); continue; }
      if (h === '#') { problemas.push({ pagina: LOCALE + r, tipo: 'href_almohadilla', texto: e.texto }); continue; }
      if (EXTERNO(h)) continue;
      if (h.startsWith('#')) {
        const existe = await page.evaluate((id) => !!document.getElementById(id), h.slice(1));
        if (!existe) problemas.push({ pagina: LOCALE + r, tipo: 'ancla_inexistente', href: h, texto: e.texto });
        continue;
      }
      if (!h.startsWith('/')) continue;

      if (/\/es(pages|collections|products|search|cart|account|blogs)/.test(h)) {
        problemas.push({ pagina: LOCALE + r, tipo: 'ruta_mal_concatenada', href: h, texto: e.texto }); continue;
      }
      if (/\/\//.test(h)) { problemas.push({ pagina: LOCALE + r, tipo: 'doble_barra', href: h, texto: e.texto }); continue; }
      if (LOCALE && !h.startsWith(LOCALE + '/') && h !== LOCALE) {
        problemas.push({ pagina: LOCALE + r, tipo: 'pierde_el_idioma', href: h, texto: e.texto }); continue;
      }

      if (!vistos.has(h)) {
        let st = 0;
        try {
          const resp = await sonda.goto(PREVIEW + h, { waitUntil: 'domcontentloaded', timeout: 30000 });
          st = resp ? resp.status() : 0;
        } catch { st = 0; }
        vistos.set(h, st);
      }
      const st = vistos.get(h);
      if (st >= 400 || st === 0) {
        problemas.push({ pagina: LOCALE + r, tipo: 'enlace_roto', href: h, estado: st, texto: e.texto });
      }
    }
    process.stdout.write(`  ${(LOCALE + r || '/').padEnd(42)} [${estado}] ${enlaces.length} enlaces\n`);
  }

  await browser.close();

  const porTipo = {};
  problemas.forEach((p) => { (porTipo[p.tipo] = porTipo[p.tipo] || []).push(p); });
  console.log(`\n${totalEnlaces} enlaces revisados en ${RUTAS.length} páginas · ${vistos.size} destinos únicos comprobados`);
  if (!problemas.length) { console.log('\nSin problemas de enlaces.'); process.exit(0); }
  console.log(`\n${problemas.length} problemas:`);
  for (const [tipo, lista] of Object.entries(porTipo)) {
    console.log(`\n-- ${tipo} (${lista.length}) --`);
    const unicos = new Map();
    lista.forEach((p) => unicos.set((p.href || p.texto) + p.tipo, p));
    [...unicos.values()].slice(0, 12).forEach((p) =>
      console.log(`   ${p.href || '(sin href)'}  ${p.estado || ''}  «${p.texto}»  en ${p.pagina}`));
  }
  process.exit(1);
})();
