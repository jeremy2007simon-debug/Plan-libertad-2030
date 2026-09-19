/**
 * SJ Wheels — Capturas de la tienda real por resolución.
 *
 * Recorre las seis resoluciones del encargo sobre el storefront renderizado,
 * guarda una captura de página completa por página y resolución, y comprueba
 * lo que una captura no enseña: desbordamiento horizontal, texto que se sale
 * de su caja y objetivos táctiles por debajo de 44 px.
 *
 *   PREVIEW=https://…shopifypreview.com node sj-wheels/tests/responsive/capturar.js
 *
 * Las capturas se guardan en tests/responsive/capturas/ y están ignoradas por
 * git: pesan y se regeneran con un comando.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');

const PREVIEW = (process.env.PREVIEW || '').replace(/\/$/, '');
const LOCALE = process.env.LOCALE || '/es';
if (!PREVIEW) { console.error('Falta PREVIEW=https://…'); process.exit(2); }

const SALIDA = process.env.SALIDA || path.join(__dirname, 'capturas');
fs.mkdirSync(SALIDA, { recursive: true });

const SPKI = process.env.SPKI || (() => {
  try { return fs.readFileSync(path.join(__dirname, '..', 'enlaces', 'spki.txt'), 'utf8').trim(); } catch { return ''; }
})();

const RESOLUCIONES = [
  { nombre: '360x800',   width: 360,  height: 800,  tactil: true },
  { nombre: '390x844',   width: 390,  height: 844,  tactil: true },
  { nombre: '768x1024',  width: 768,  height: 1024, tactil: true },
  { nombre: '1024x768',  width: 1024, height: 768,  tactil: false },
  { nombre: '1440x900',  width: 1440, height: 900,  tactil: false },
  { nombre: '1920x1080', width: 1920, height: 1080, tactil: false },
];

const PAGINAS = [
  { nombre: 'portada', ruta: '' },
  { nombre: 'coleccion', ruta: '/collections/all' },
  { nombre: 'solicitud', ruta: '/pages/solicitud-de-compatibilidad' },
  { nombre: 'marcas', ruta: '/pages/marcas' },
  { nombre: 'carrito', ruta: '/cart' },
];

(async () => {
  const browser = await chromium.launch({
    args: SPKI ? ['--ignore-certificate-errors-spki-list=' + SPKI] : []
  });
  const problemas = [];
  const avisos = [];
  let capturas = 0;

  for (const res of RESOLUCIONES) {
    const ctx = await browser.newContext({
      viewport: { width: res.width, height: res.height },
      locale: 'es-ES',
      hasTouch: res.tactil,
      isMobile: res.tactil,
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(PREVIEW + '/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    for (const pag of PAGINAS) {
      try {
        await page.goto(PREVIEW + LOCALE + pag.ruta, { waitUntil: 'load', timeout: 45000 });
      } catch (e) {
        problemas.push(`${res.nombre} ${pag.nombre}: no carga (${e.message.slice(0, 50)})`);
        continue;
      }
      await page.waitForTimeout(2200);

      const medidas = await page.evaluate((tactil) => {
        const doc = document.documentElement;
        const ancho = doc.clientWidth;
        const desborda = doc.scrollWidth > ancho + 1;
        const culpables = [];
        if (desborda) {
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect();
            if (r.width === 0) continue;
            if (r.right > ancho + 1 || r.left < -1) {
              const cs = getComputedStyle(el);
              if (cs.position === 'fixed') continue;
              culpables.push(el.tagName + '.' + String(el.className).replace(/\s+/g, '.').slice(0, 50)
                + ' [' + Math.round(r.left) + '…' + Math.round(r.right) + ']');
              if (culpables.length >= 4) break;
            }
          }
        }

        /* Un texto escondido para lectores de pantalla se sale de su caja de
           1x1 px a propósito: no es un recorte. */
        const escondido = (el) => {
          const r = el.getBoundingClientRect();
          if (r.width <= 1 || r.height <= 1) return true;
          const cs = getComputedStyle(el);
          if (cs.clipPath !== 'none') return true;
          return el.closest('.visually-hidden, .sjw-visually-hidden') !== null;
        };

        /* Texto que se sale de su propia caja. */
        const recortado = [];
        for (const el of document.querySelectorAll('h1,h2,h3,p,span,a,button,li')) {
          if (el.children.length) continue;
          if (escondido(el)) continue;
          if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') {
            recortado.push((el.innerText || '').trim().slice(0, 30));
            if (recortado.length >= 4) break;
          }
        }

        /* Tamaño del objetivo, WCAG 2.2 SC 2.5.8 (AA): mínimo 24x24 CSS px,
           salvo que se cumpla la excepción de separación (un círculo de 24 px
           centrado en el objetivo no toca el de ningún otro) o que el enlace
           vaya dentro de una frase. Por debajo de 44 no incumple, pero se
           anota: 44 es el tamaño cómodo con el dedo. */
        const objetivos = [];
        for (const el of document.querySelectorAll('a,button,summary,input[type="submit"],[role="button"]')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (el.closest('#PBarFrame, .shopify-preview-bar')) continue;
          if (escondido(el)) continue;
          objetivos.push({ el, r, cx: r.left + r.width / 2, cy: r.top + r.height / 2 });
        }

        const enFrase = (el) => {
          if (el.tagName !== 'A') return false;
          const p = el.parentElement;
          if (!p) return false;
          if (!/^(P|LI|SPAN|TD|DD|DT|FIGCAPTION)$/.test(p.tagName)) return false;
          return (p.innerText || '').trim().length > (el.innerText || '').trim().length + 4;
        };

        const incumplen = [];
        const justos = [];
        for (const o of objetivos) {
          const etiqueta = ((o.el.innerText || o.el.getAttribute('aria-label') || '?').trim().slice(0, 24))
            + ' ' + Math.round(o.r.width) + 'x' + Math.round(o.r.height);
          if (o.r.width >= 24 && o.r.height >= 24) {
            /* 44 px es el tamaño cómodo con el dedo. Con ratón no hace falta,
               así que solo se anota en las resoluciones táctiles. */
            if (tactil && (o.r.width < 44 || o.r.height < 44)) justos.push(etiqueta);
            continue;
          }
          if (enFrase(o.el)) continue;
          const separado = objetivos.every((otro) => {
            if (otro === o) return true;
            const dx = otro.cx - o.cx, dy = otro.cy - o.cy;
            return Math.sqrt(dx * dx + dy * dy) >= 24;
          });
          if (!separado) incumplen.push(etiqueta);
        }

        return { ancho, scrollWidth: doc.scrollWidth, desborda, culpables, recortado,
                 incumplen: incumplen.slice(0, 6), justos: justos.slice(0, 6),
                 objetivos: objetivos.length };
      }, res.tactil);

      await page.screenshot({
        path: path.join(SALIDA, `${res.nombre}-${pag.nombre}.png`),
        fullPage: true,
      });
      capturas++;

      if (medidas.desborda) {
        problemas.push(`${res.nombre} ${pag.nombre}: desborda a lo ancho (${medidas.scrollWidth} > ${medidas.ancho}) → ${medidas.culpables.join(' | ')}`);
      }
      if (medidas.recortado.length) {
        problemas.push(`${res.nombre} ${pag.nombre}: texto recortado → ${medidas.recortado.join(' | ')}`);
      }
      if (medidas.incumplen.length) {
        problemas.push(`${res.nombre} ${pag.nombre}: objetivo por debajo de 24x24 sin separación (WCAG 2.5.8) → ${medidas.incumplen.join(' | ')}`);
      }
      if (medidas.justos.length) {
        avisos.push(`${res.nombre} ${pag.nombre}: entre 24 y 44 px → ${medidas.justos.join(' | ')}`);
      }

      process.stdout.write(`  ${res.nombre.padEnd(10)} ${pag.nombre.padEnd(11)} ${medidas.desborda ? 'DESBORDA' : 'ok'} · ${medidas.objetivos} objetivos\n`);
    }
    await ctx.close();
  }

  await browser.close();

  console.log(`\n${capturas} capturas en ${SALIDA}`);
  if (avisos.length) {
    console.log(`\n${avisos.length} avisos (cumplen AA, pero por debajo del tamaño cómodo de 44 px):`);
    avisos.forEach((a) => console.log('  · ' + a));
  }
  if (!problemas.length) { console.log('\nSin problemas de diseño adaptable.'); return; }
  console.log(`\n${problemas.length} problemas:`);
  problemas.forEach((p) => console.log('  ✗ ' + p));
  process.exitCode = 1;
})();
