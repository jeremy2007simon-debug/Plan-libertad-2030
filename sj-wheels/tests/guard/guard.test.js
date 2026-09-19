/**
 * Prueba de la guardia de compra en un navegador real.
 *
 * NO es una prueba del storefront: la tienda está protegida por contraseña.
 * Lo que se monta aquí es una ficha de producto mínima con el MISMO JavaScript
 * que sube al tema, incluido un botón acelerado como el que Shopify pinta con
 * el bloque accelerated-checkout. Sirve para demostrar que ninguna vía de
 * compra se salta la confirmación.
 *
 *   node sj-wheels/tests/guard/guard.test.js
 */
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');

const ASSETS = path.resolve(__dirname, '../../theme/assets');
const leer = (f) => fs.readFileSync(path.join(ASSETS, f), 'utf8');

const PRODUCTO = {
  sku: 'OYL260416001', boltPattern: '5x120', diameter: 19, width: 8.5, et: 35,
  centerBore: 72.6, requiresManualVerification: false, vehicleIds: ['gid://v/1']
};
const VEHICULO = {
  id: 'gid://v/1', make: 'BMW', model: 'Serie 3', generation: 'F30',
  boltPattern: '5x120', centerBore: 72.5, allowedDiameters: [17, 18, 19],
  etMin: 20, etMax: 45, verification: 'verified'
};

function pagina(producto) {
  return `<!doctype html><html lang="es"><body>
    <div data-sjw-product-main>
      <script type="application/json" class="sjw-fitment-data"
              data-product-id="1">${JSON.stringify(producto)}</script>
      <form action="/cart/add" method="post" id="f">
        <sjw-buy-guard data-product-id="1" data-pending-mode="allow">
          <p data-sjw-guard-message tabindex="-1" hidden></p>
          <div data-sjw-guard-blocked hidden></div>
          <div data-sjw-confirm-wrap hidden>
            <label><input type="checkbox" data-sjw-confirm> Confirmo</label>
          </div>
        </sjw-buy-guard>
        <button type="submit" name="add" id="add">Añadir al carrito</button>
        <shopify-accelerated-checkout id="acc">
          <button class="shopify-payment-button__button" id="shoppay">Comprar ahora</button>
        </shopify-accelerated-checkout>
      </form>
    </div>
  </body></html>`;
}

let pass = 0, fail = 0;
function t(nombre, real, esperado) {
  const ok = JSON.stringify(real) === JSON.stringify(esperado);
  if (ok) pass++; else { fail++; console.error(`FALLO: ${nombre}\n  esperado: ${JSON.stringify(esperado)}\n  obtenido: ${JSON.stringify(real)}`); }
}

(async () => {
  const browser = await chromium.launch();

  async function escenario(vehiculo, producto = PRODUCTO, marcarConfirmacion = false) {
    const page = await browser.newPage();
    // El garaje se inyecta como doble: aquí no se prueba localStorage.
    await page.addInitScript((v) => {
      window.SJWGarage = {
        _v: v, _subs: [],
        get() { return this._v; },
        label(x) { return [x.make, x.model, x.generation].filter(Boolean).join(' '); },
        subscribe(fn) { this._subs.push(fn); },
        set(x) { this._v = x; this._subs.forEach((f) => f()); }
      };
      window.SJWAnalytics = { track() {} };
      window.SJWStrings = {};
    }, vehiculo);
    await page.setContent(pagina(producto));
    await page.addScriptTag({ content: leer('sjw-fitment.js') });
    await page.addScriptTag({ content: leer('sjw-buy-guard.js') });
    await page.waitForTimeout(60);
    if (marcarConfirmacion) {
      await page.locator('[data-sjw-confirm]').check();
      await page.waitForTimeout(40);
    }
    return page;
  }

  /** ¿Se envió el formulario al pulsar este selector? */
  async function intentaComprar(page, selector) {
    await page.evaluate(() => {
      window.__enviado = false;
      document.getElementById('f').addEventListener('submit', (e) => { e.preventDefault(); window.__enviado = true; });
    });
    await page.locator(selector).dispatchEvent('click');
    await page.evaluate(() => { const f = document.getElementById('f'); if (!f.__probado) { f.__probado = 1; } });
    await page.waitForTimeout(40);
    return page.evaluate(() => window.__enviado === true);
  }

  const props = (page) => page.evaluate(() => {
    const o = {};
    document.querySelectorAll('#f input[type=hidden]').forEach((i) => {
      o[i.name.replace(/^properties\[|\]$/g, '')] = i.disabled ? null : i.value;
    });
    return o;
  });

  /* --- 1. Sin vehículo: todo cerrado ---------------------------------- */
  let p = await escenario(null);
  t('sin vehículo · añadir al carrito deshabilitado', await p.locator('#add').isDisabled(), true);
  t('sin vehículo · botón acelerado inerte',
    await p.locator('#acc').evaluate((e) => e.hasAttribute('inert')), true);
  t('sin vehículo · el clic en añadir no envía', await intentaComprar(p, '#add'), false);
  t('sin vehículo · el clic en el botón acelerado no envía', await intentaComprar(p, '#shoppay'), false);
  await p.close();

  /* --- 2. Con vehículo, sin marcar la confirmación --------------------- */
  p = await escenario(VEHICULO);
  t('sin confirmar · aparece la casilla',
    await p.locator('[data-sjw-confirm-wrap]').evaluate((e) => e.hidden), false);
  t('sin confirmar · añadir deshabilitado', await p.locator('#add').isDisabled(), true);
  t('sin confirmar · botón acelerado inerte',
    await p.locator('#acc').evaluate((e) => e.hasAttribute('inert')), true);
  t('sin confirmar · el botón acelerado no envía', await intentaComprar(p, '#shoppay'), false);
  await p.close();

  /* --- 3. Con vehículo y confirmación marcada -------------------------- */
  p = await escenario(VEHICULO, PRODUCTO, true);
  t('confirmado · añadir habilitado', await p.locator('#add').isDisabled(), false);
  t('confirmado · botón acelerado activo',
    await p.locator('#acc').evaluate((e) => e.hasAttribute('inert')), false);
  t('confirmado · el formulario se envía', await intentaComprar(p, '#add'), true);

  const pr = await props(p);
  t('confirmado · el vehículo se marca como indicado por el cliente',
    pr['Vehículo indicado por el cliente'], 'BMW Serie 3 F30');
  t('confirmado · el resultado dice "sin verificar"',
    /sin verificar/i.test(pr['Resultado mostrado en la web'] || ''), true);
  t('confirmado · ninguna propiedad dice "Compatible con tu vehículo" a secas',
    Object.values(pr).some((v) => v === 'Compatible con tu vehículo'), false);
  t('confirmado · la revisión técnica sale pendiente',
    /pendiente/i.test(pr['Revisión técnica'] || ''), true);
  await p.close();

  /* --- 4. Llanta que NO encaja: ni con la casilla marcada -------------- */
  const noEncaja = { ...PRODUCTO, boltPattern: '5x112' };
  p = await escenario(VEHICULO, noEncaja, false);
  t('no compatible · añadir deshabilitado', await p.locator('#add').isDisabled(), true);
  t('no compatible · botón acelerado inerte',
    await p.locator('#acc').evaluate((e) => e.hasAttribute('inert')), true);
  t('no compatible · la casilla de confirmación ni aparece',
    await p.locator('[data-sjw-confirm-wrap]').evaluate((e) => e.hidden), true);
  t('no compatible · el clic en añadir no envía', await intentaComprar(p, '#add'), false);
  t('no compatible · el clic en el acelerado no envía', await intentaComprar(p, '#shoppay'), false);
  await p.close();

  /* --- 5. Cambiar de vehículo después de confirmar --------------------- */
  p = await escenario(VEHICULO, PRODUCTO, true);
  t('antes del cambio · habilitado', await p.locator('#add').isDisabled(), false);
  await p.evaluate(() => window.SJWGarage.set({
    id: 'gid://v/2', make: 'Audi', model: 'A4', boltPattern: '5x112',
    centerBore: 66.5, allowedDiameters: [17, 18], etMin: 30, etMax: 45, verification: 'verified'
  }));
  await p.waitForTimeout(60);
  t('tras cambiar a un vehículo que no encaja · se vuelve a cerrar',
    await p.locator('#add').isDisabled(), true);
  t('tras cambiar · el botón acelerado vuelve a ser inerte',
    await p.locator('#acc').evaluate((e) => e.hasAttribute('inert')), true);
  const pr2 = await props(p);
  t('tras cambiar · la propiedad refleja el vehículo nuevo',
    pr2['Vehículo indicado por el cliente'], 'Audi A4');
  await p.close();

  /* --- 6. Producto sin verificación explícita: pendiente --------------- */
  const sinVerificar = { ...PRODUCTO };
  delete sinVerificar.requiresManualVerification;
  p = await escenario(VEHICULO, sinVerificar, true);
  const pr3 = await props(p);
  t('metafield ausente · el resultado es pendiente, no compatible',
    /confirmaci[oó]n t[eé]cnica/i.test(pr3['Resultado mostrado en la web'] || ''), true);
  await p.close();

  await browser.close();
  console.log(`\n${pass} correctas, ${fail} fallidas`);
  process.exit(fail ? 1 : 0);
})();
