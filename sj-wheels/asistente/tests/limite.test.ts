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
  assert.equal(ipDe({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }), '1.2.3.4');
});

test('acepta la cabecera repetida, como la entrega Node', () => {
  assert.equal(ipDe({ 'x-forwarded-for': ['5.6.7.8, 10.0.0.1', '9.9.9.9'] }), '5.6.7.8');
});

test('cae a x-real-ip si no hay x-forwarded-for', () => {
  assert.equal(ipDe({ 'x-real-ip': '4.3.2.1' }), '4.3.2.1');
});

test('sin cabeceras no revienta', () => {
  assert.equal(ipDe({}), 'desconocida');
});
