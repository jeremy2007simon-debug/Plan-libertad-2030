/**
 * SJ Wheels — Auditoría de accesibilidad sobre la tienda renderizada.
 *
 * Pasa axe-core por las páginas reales del storefront, en escritorio y en
 * móvil, y también con el cajón del menú abierto. Solo mide WCAG 2.0/2.1/2.2
 * hasta nivel AA, que es el compromiso del proyecto.
 *
 *   PREVIEW=https://…shopifypreview.com \
 *     AXE=/tmp/claude-0/node_modules/axe-core/axe.min.js \
 *     node sj-wheels/tests/accesibilidad/axe.js
 *
 * Devuelve 1 si hay alguna infracción.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');

const PREVIEW = (process.env.PREVIEW || '').replace(/\/$/, '');
const LOCALE = process.env.LOCALE || '/es';
const AXE = process.env.AXE || path.join(__dirname, '..', '..', '..', 'node_modules', 'axe-core', 'axe.min.js');
if (!PREVIEW) { console.error('Falta PREVIEW=https://…'); process.exit(2); }
if (!fs.existsSync(AXE)) { console.error('No encuentro axe-core en ' + AXE); process.exit(2); }

const SPKI = process.env.SPKI || (() => {
  try { return fs.readFileSync(path.join(__dirname, '..', 'enlaces', 'spki.txt'), 'utf8').trim(); } catch { return ''; }
})();

const AXE_FUENTE = fs.readFileSync(AXE, 'utf8');

const ETIQUETAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/* La barra de vista previa de Shopify se inyecta en el documento y trae su
   propio iframe sin nombre accesible. No es del tema y no existe en la tienda
   publicada, así que se deja fuera de la medición y se dice por qué. */
const AJENOS = ['#PBarNextFrame', '#PBarFrame', '#preview-bar-iframe'];

const RUTAS = [
  '', '/collections/all', '/search?q=llanta', '/cart',
  '/pages/solicitud-de-compatibilidad', '/pages/guia-de-medidas',
  '/pages/marcas', '/pages/envios', '/pages/contact',
];

const VISTAS = [
  { nombre: 'escritorio', width: 1440, height: 900 },
  { nombre: 'movil', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch({
    args: SPKI ? ['--ignore-certificate-errors-spki-list=' + SPKI] : []
  });

  const infracciones = new Map();   // id -> {impacto, descripcion, donde: Set, ejemplo}
  let analisis = 0;

  async function medir(page, donde) {
    const r = await page.evaluate(async ({ etiquetas, ajenos }) => {
      const res = await window.axe.run(
        { exclude: ajenos.map((s) => [s]) },
        {
          runOnly: { type: 'tag', values: etiquetas },
          resultTypes: ['violations'],
        }
      );
      return res.violations.map((v) => ({
        id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl,
        nodos: v.nodes.slice(0, 3).map((n) => n.target.join(' ') + ' → ' + (n.failureSummary || '').split('\n').slice(1, 3).join(' ').trim()),
        total: v.nodes.length,
      }));
    }, { etiquetas: ETIQUETAS, ajenos: AJENOS });
    analisis++;
    for (const v of r) {
      if (!infracciones.has(v.id)) {
        infracciones.set(v.id, { impacto: v.impact, ayuda: v.help, url: v.helpUrl, donde: new Set(), ejemplos: [], total: 0 });
      }
      const e = infracciones.get(v.id);
      e.donde.add(donde);
      e.total += v.total;
      for (const n of v.nodos) if (e.ejemplos.length < 4 && !e.ejemplos.includes(n)) e.ejemplos.push(n);
    }
    return r.length;
  }

  for (const vista of VISTAS) {
    const ctx = await browser.newContext({ viewport: { width: vista.width, height: vista.height }, locale: 'es-ES' });
    const page = await ctx.newPage();
    await page.goto(PREVIEW + '/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    for (const r of RUTAS) {
      const donde = `${vista.nombre} ${LOCALE}${r || '/'}`;
      try {
        await page.goto(PREVIEW + LOCALE + r, { waitUntil: 'load', timeout: 40000 });
      } catch (e) {
        console.log(`  !  no carga  ${donde}`);
        continue;
      }
      await page.waitForTimeout(1500);
      await page.addScriptTag({ content: AXE_FUENTE });
      const n = await medir(page, donde);
      process.stdout.write(`  ${donde.padEnd(48)} ${n === 0 ? 'sin infracciones' : n + ' tipos'}\n`);
    }

    // El cajón del menú solo existe abierto: se mide también así.
    if (vista.nombre === 'movil') {
      await page.goto(PREVIEW + LOCALE, { waitUntil: 'load' });
      await page.waitForTimeout(1200);
      const disparador = await page.$('summary[aria-label="Menú"]');
      if (disparador) {
        await disparador.click();
        await page.waitForTimeout(800);
        await page.addScriptTag({ content: AXE_FUENTE });
        const n = await medir(page, 'movil menú abierto');
        process.stdout.write(`  ${'movil menú abierto'.padEnd(48)} ${n === 0 ? 'sin infracciones' : n + ' tipos'}\n`);
      }
    }
    await ctx.close();
  }

  await browser.close();

  console.log(`\n${analisis} análisis · etiquetas: ${ETIQUETAS.join(', ')}`);
  console.log(`Fuera de la medición: ${AJENOS.join(', ')} (barra de vista previa de Shopify, no es del tema).`);
  if (infracciones.size === 0) {
    console.log('\nSin infracciones de WCAG 2.2 AA.');
    return;
  }

  const orden = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  const lista = [...infracciones.entries()].sort((a, b) => (orden[a[1].impacto] ?? 9) - (orden[b[1].impacto] ?? 9));
  console.log(`\n${lista.length} tipos de infracción:\n`);
  for (const [id, e] of lista) {
    console.log(`-- ${id}  (${e.impacto}) · ${e.total} elementos --`);
    console.log(`   ${e.ayuda}`);
    console.log(`   páginas: ${[...e.donde].join(', ')}`);
    e.ejemplos.forEach((x) => console.log(`     · ${x.slice(0, 150)}`));
    console.log(`   ${e.url}\n`);
  }
  process.exitCode = 1;
})();
