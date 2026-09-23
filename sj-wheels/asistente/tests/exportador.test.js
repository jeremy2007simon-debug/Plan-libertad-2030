/* Prueba del exportador: convierte la respuesta de Shopify sin inventar datos. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const mf = (pares) => ({ nodes: Object.entries(pares).map(([key, value]) => ({ key, value })) });

const respuesta = {
  data: { products: { nodes: [{
    handle: 'sjw-048',
    title: 'Llanta SJW-048 · 19"–20"',
    descriptionHtml: '<p>Cinco radios dobles.</p><p>Medidas…</p>',
    variants: { nodes: [
      { id: 'gid://shopify/ProductVariant/1', sku: 'AAA1', title: '19 × 8,5"',
        metafields: mf({ wheel_diameter: '19', wheel_width: '8.5', bolt_pattern: '5x112',
                         offset_et: '30', center_bore: '66.5', supplier_finish_code: 'MB',
                         requires_manual_verification: 'true' }) },
      // Sin medidas: tiene que quedarse fuera en lugar de colarse con huecos.
      { id: 'gid://shopify/ProductVariant/2', sku: 'AAA2', title: 'incompleta',
        metafields: mf({ supplier_finish_code: 'MB' }) },
    ] },
  }] } },
};

test('exporta lo comprobable y descarta lo que no tiene medidas', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sjw-'));
  const entrada = path.join(dir, 'in.json');
  const salida = path.join(dir, 'out.json');
  fs.writeFileSync(entrada, JSON.stringify(respuesta));

  execFileSync('python3', ['tools/exportar-catalogo.py', '--entrada', entrada, '--salida', salida],
    { stdio: ['ignore', 'pipe', 'pipe'] });

  const c = JSON.parse(fs.readFileSync(salida, 'utf8'));
  assert.equal(c.disenos.length, 1);
  assert.equal(c.disenos[0].variantes.length, 1, 'la variante sin medidas debería quedar fuera');

  const v = c.disenos[0].variantes[0];
  assert.equal(v.sku, 'AAA1');
  assert.equal(v.diametro, 19);
  assert.equal(v.anclaje, '5x112');
  assert.equal(v.url, '/products/sjw-048?variant=1');
  assert.equal(v.compraBloqueada, true);
  assert.equal(v.requiereVerificacion, true);
  assert.deepEqual(v.vehiculosVerificados, []);
  assert.equal('precio' in v, false, 'el exportador no debe sacar precios');
  assert.match(c.nota, /no puede afirmar/i);
});

test('cuando haya vehículos verificados, la nota lo dice', () => {
  const conVerificados = JSON.parse(JSON.stringify(respuesta));
  conVerificados.data.products.nodes[0].variants.nodes[0].metafields.nodes.push(
    { key: 'compatible_vehicles', value: '["gid://shopify/Metaobject/1"]' });

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sjw-'));
  const entrada = path.join(dir, 'in.json');
  const salida = path.join(dir, 'out.json');
  fs.writeFileSync(entrada, JSON.stringify(conVerificados));
  execFileSync('python3', ['tools/exportar-catalogo.py', '--entrada', entrada, '--salida', salida],
    { stdio: ['ignore', 'pipe', 'pipe'] });

  const c = JSON.parse(fs.readFileSync(salida, 'utf8'));
  assert.deepEqual(c.disenos[0].variantes[0].vehiculosVerificados, ['gid://shopify/Metaobject/1']);
  assert.match(c.nota, /solo esas pueden presentarse/i);
});
