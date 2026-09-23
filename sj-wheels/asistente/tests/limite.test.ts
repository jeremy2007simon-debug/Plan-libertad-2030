import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dentroDelLimite, ipDe } from '../src/limite.js';

test('deja pasar hasta el tope y luego corta', () => {
  const ip = 'prueba-' + Math.random();
  let pasan = 0;
  for (let i = 0; i < 20; i++) if (dentroDelLimite(ip)) pasan++;
  assert.equal(pasan, 12, 'deberían pasar 12 peticiones por minuto y ninguna más');
});

test('cada IP lleva su propia cuenta', () => {
  const a = 'a-' + Math.random();
  const b = 'b-' + Math.random();
  for (let i = 0; i < 12; i++) dentroDelLimite(a);
  assert.equal(dentroDelLimite(a), false);
  assert.equal(dentroDelLimite(b), true, 'una IP agotada no puede bloquear a otra');
});

test('lee la IP de x-forwarded-for y se queda con la primera', () => {
  const req = new Request('https://x/', { headers: { 'x-forwarded-for': '1.2.3.4, 10.0.0.1' } });
  assert.equal(ipDe(req), '1.2.3.4');
});

test('sin cabeceras no revienta', () => {
  assert.equal(ipDe(new Request('https://x/')), 'desconocida');
});
