/**
 * La tabla de vehículos: que encuentre el coche escrito como lo escriba el
 * cliente, y que NO se invente el que no tiene.
 *
 * Los coches de estas pruebas son inventados a propósito, con marcas que no
 * existen. Si algún día alguien copia una fila de aquí a la tabla de verdad,
 * que se note a la primera.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { busca, normaliza, vehiculos, type Vehiculo } from '../src/vehiculos.js';
import { ejecutar, HERRAMIENTAS } from '../src/herramientas.js';
import { SISTEMA } from '../src/sistema.js';

const FICTICIOS: Vehiculo[] = [
  {
    id: 'inventado-modelo-uno-p1', marca: 'Inventádez', modelo: 'Modelo Uno',
    generacion: 'P1', anioDesde: 2012, anioHasta: 2018,
    anclaje: '5x100', buje: 57.1, diametros: [17, 18], etMin: 30, etMax: 45,
    anchuraMin: 7, anchuraMax: 8.5, verificacion: 'verified', alias: ['p1', 'm1 uno'],
  },
  {
    id: 'inventado-modelo-uno-p2', marca: 'Inventádez', modelo: 'Modelo Uno',
    generacion: 'P2', anioDesde: 2019, anioHasta: null,
    anclaje: '5x112', buje: 66.5, diametros: [18, 19, 20], etMin: 25, etMax: 45,
    anchuraMin: 8, anchuraMax: 9.5, verificacion: 'pending', alias: ['p2'],
  },
];

test('normaliza quita acentos, signos y dobles espacios', () => {
  assert.equal(normaliza('Citroën  C4!'), 'citroen c4');
  assert.equal(normaliza('  BMW  '), 'bmw');
});

test('encuentra el coche por su modelo y el año elige la generación', () => {
  const r = busca('Inventádez', 'Modelo Uno', 2015, FICTICIOS);
  assert.equal(r.coincidencias.length, 1);
  assert.equal(r.coincidencias[0]!.generacion, 'P1');
  assert.equal(r.coincidencias[0]!.anclaje, '5x100');
});

test('el mismo modelo en otro año da la otra generación, con otro anclaje', () => {
  const r = busca('inventadez', 'modelo uno', 2021, FICTICIOS);
  assert.equal(r.coincidencias.length, 1);
  assert.equal(r.coincidencias[0]!.generacion, 'P2');
  assert.equal(r.coincidencias[0]!.anclaje, '5x112');
});

test('sin año devuelve las dos generaciones, para poder preguntar', () => {
  const r = busca('Inventádez', 'Modelo Uno', undefined, FICTICIOS);
  assert.equal(r.coincidencias.length, 2);
});

test('encuentra por alias y por generación', () => {
  assert.equal(busca('Inventádez', 'P2', undefined, FICTICIOS).coincidencias.length, 1);
  assert.equal(busca('Inventádez', 'p1', undefined, FICTICIOS).coincidencias.length, 1);
});

test('da igual cómo se escriba: acentos, mayúsculas y espacios', () => {
  for (const escrito of ['MODELO UNO', 'modelouno', 'Modelo  Uno']) {
    assert.equal(busca('inventadez', escrito, 2015, FICTICIOS).coincidencias.length, 1, escrito);
  }
});

test('un año que ninguna ficha cubre se informa aparte, no se estira', () => {
  const r = busca('Inventádez', 'Modelo Uno', 1998, FICTICIOS);
  assert.equal(r.coincidencias.length, 0);
  assert.equal(r.fueraDeAnio.length, 2, 'hay fichas del coche, pero de otros años');
});

test('un coche que no está en la tabla no aparece', () => {
  assert.equal(busca('Marcainexistente', 'Nada', 2020, FICTICIOS).coincidencias.length, 0);
});

test('la herramienta existe y pide marca y modelo', () => {
  const h = HERRAMIENTAS.find((h) => h.name === 'buscar_vehiculo');
  assert.ok(h, 'falta buscar_vehiculo');
  const esquema = h.input_schema as { required?: string[]; additionalProperties?: boolean };
  assert.deepEqual(new Set(esquema.required), new Set(['marca', 'modelo']));
  assert.equal(esquema.additionalProperties, false);
});

test('con la tabla vacía NO devuelve medidas de ningún coche real', async () => {
  // Esta es la prueba que importa. Un modelo de lenguaje "sabe" qué anclaje
  // lleva un Serie 3, y esa es justo la fuente que no puede usar.
  const salida = await ejecutar('buscar_vehiculo', { marca: 'BMW', modelo: 'Serie 3', anio: 2019 });
  const r = JSON.parse(salida);
  assert.equal(r.encontrado, false);
  assert.equal(vehiculos.length, 0, 'la tabla de verdad debe seguir vacía hasta que haya evidencia');
  assert.equal(r.tablaVacia, true);
  assert.equal(/5x\d{3}/.test(salida), false, 'no puede colarse ningún anclaje');
  assert.match(r.lectura, /no las deduzcas|NO las deduzcas/i);
});

test('sin marca o sin modelo, la herramienta no adivina', async () => {
  const r = JSON.parse(await ejecutar('buscar_vehiculo', { marca: 'BMW' }));
  assert.match(r.error, /marca y el modelo/i);
});

test('el sistema prohíbe sacar el anclaje de la memoria del modelo', () => {
  assert.match(SISTEMA, /buscar_vehiculo/);
  assert.match(SISTEMA, /nunca de tu memoria/i);
});
