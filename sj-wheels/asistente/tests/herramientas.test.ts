/**
 * Pruebas del asistente. Ejecutar: npm test
 *
 * Lo que se comprueba aquí no es que el bot conteste bonito: es que no pueda
 * afirmar una compatibilidad. Esa es la única promesa que en este negocio
 * sale cara si se rompe.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ejecutar, HERRAMIENTAS } from '../src/herramientas.js';
import { paraReenviar } from '../src/mensajes.js';
import { catalogo, todasLasVariantes, porSku, normalizaAnclaje } from '../src/catalogo.js';

const args = (extra: Record<string, unknown> = {}) => ({
  anclaje: null, diametro: null, diametroMin: null, diametroMax: null,
  anchuraMin: null, anchuraMax: null, etMin: null, etMax: null,
  buje: null, acabado: null, diseno: null, skus: null, ...extra,
});

test('el catálogo tiene las 83 referencias, en diez diseños', () => {
  assert.equal(catalogo.disenos.length, 10);
  assert.equal(todasLasVariantes.length, 83);
});

test('ninguna variante trae precio: no se puede filtrar ni decir por lo que no está', () => {
  for (const v of todasLasVariantes) {
    assert.equal('precio' in v, false, `${v.sku} lleva un precio en el catálogo del asistente`);
  }
});

test('ninguna variante tiene compatibilidad verificada', () => {
  for (const v of todasLasVariantes) {
    assert.deepEqual(v.vehiculosVerificados, [], `${v.sku} dice tener vehículos verificados`);
    assert.equal(v.requiereVerificacion, true, `${v.sku} no pide verificación manual`);
  }
});

test('comprobar_compatibilidad NUNCA devuelve una llanta como compatible', async () => {
  // Un vehículo hecho a medida para encajar: mismo anclaje, buje y ET que una variante real.
  const v = porSku('OYL260416157')!;
  const salida = JSON.parse(await ejecutar('comprobar_compatibilidad', args({
    anclaje: v.anclaje, buje: v.buje, diametros: [v.diametro],
    etMin: v.et - 5, etMax: v.et + 5, skus: [v.sku],
  })));
  assert.equal(salida.descartadas.total, 0, 'una medida que encaja no debería descartarse');
  assert.equal(salida.candidatas.total, 1);
  const texto = JSON.stringify(salida);
  assert.equal(/"status"\s*:\s*"ok"/.test(texto), false, 'ha salido un veredicto "ok"');
  assert.match(salida.lectura, /nunca como|no están confirmadas/i);
});

test('un anclaje que no es el del coche descarta la llanta sin ambigüedad', async () => {
  const salida = JSON.parse(await ejecutar('comprobar_compatibilidad', args({
    anclaje: '5x120', diametros: [19], skus: ['OYL260416157'], // esa referencia es 5x112
  })));
  assert.equal(salida.descartadas.total, 1);
  assert.equal(salida.candidatas.total, 0);
});

test('sin anclaje no se comprueba nada: se pide el dato', async () => {
  const salida = JSON.parse(await ejecutar('comprobar_compatibilidad', args({ anclaje: '' })));
  assert.match(salida.error, /anclaje/i);
});

test('un anclaje mal escrito no se adivina', async () => {
  const salida = JSON.parse(await ejecutar('comprobar_compatibilidad', args({ anclaje: '5 tornillos' })));
  assert.match(salida.error, /no entiendo/i);
});

test('comprobar todo el catálogo separa descartadas de candidatas', async () => {
  const salida = JSON.parse(await ejecutar('comprobar_compatibilidad', args({
    anclaje: '5x120', diametros: [19, 20],
  })));
  assert.equal(salida.comprobadas, 83);
  assert.ok(salida.descartadas.total > 0, 'con un 5x120 tienen que caer las 5x112');
  assert.equal(salida.descartadas.total + salida.candidatas.total, 83);
});

test('buscar_llantas no devuelve cifras de precio', async () => {
  const salida = JSON.parse(await ejecutar('buscar_llantas', args({ anclaje: '5x112', diametro: 19 })));
  assert.ok(salida.total > 0);
  for (const v of salida.variantes) {
    assert.equal(v.precio, 'bajo consulta');
    assert.equal(/\d{3}/.test(String(v.precio)), false);
  }
});

test('el anclaje se normaliza igual que en el tema', () => {
  assert.equal(normalizaAnclaje('5X112'), '5x112');
  assert.equal(normalizaAnclaje(' 5*112 '), '5x112');
  assert.equal(normalizaAnclaje('5x112.0'), '5x112');
  assert.equal(normalizaAnclaje('cinco por ciento doce'), null);
});

test('preparar_consulta rellena el formulario con los datos de la variante', async () => {
  const salida = JSON.parse(await ejecutar('preparar_consulta', {
    motivo: 'compatibilidad', sku: 'OYL260416157', vehiculo: 'BMW Serie 5 G30 2019', nota: null,
  }));
  assert.match(salida.url, /^\/pages\/solicitud-de-compatibilidad\?/);
  assert.match(salida.url, /ref=OYL260416157/);
  assert.match(salida.url, /anclaje=5x112/);
  assert.match(salida.url, /vehiculo=BMW\+Serie\+5\+G30\+2019/);
});

type Esquema = {
  additionalProperties?: boolean;
  required?: string[];
  properties?: Record<string, { type?: unknown; anyOf?: unknown }>;
};

test('ningún esquema admite propiedades que no declara', () => {
  for (const h of HERRAMIENTAS) {
    const esquema = h.input_schema as Esquema;
    assert.equal(esquema.additionalProperties, false, `${h.name} admite propiedades extra`);
  }
});

test('la herramienta que alimenta al motor va con strict', () => {
  // Es la única cuyo argumento decide algo: si llega mal formado, el veredicto
  // sale mal. Las demás, como mucho, buscan peor.
  const motor = HERRAMIENTAS.find((h) => h.name === 'comprobar_compatibilidad');
  assert.ok(motor, 'falta comprobar_compatibilidad');
  assert.equal(motor.strict, true);
});

test('las herramientas con strict listan todas sus propiedades en required', () => {
  for (const h of HERRAMIENTAS.filter((h) => h.strict)) {
    const esquema = h.input_schema as Esquema;
    assert.deepEqual(
      new Set(esquema.required), new Set(Object.keys(esquema.properties ?? {})),
      `${h.name}: strict exige que required liste todas las propiedades`,
    );
  }
});

test('los parámetros con unión caben en el límite de la API', () => {
  // La API rechaza la petición entera —no la herramienta culpable— si entre
  // todas suman más de 16 parámetros con `anyOf` o con `type` en array. Se
  // descubrió en producción; esta prueba lo descubre antes.
  const LIMITE = 16;
  let uniones = 0;
  for (const h of HERRAMIENTAS) {
    const esquema = h.input_schema as Esquema;
    for (const prop of Object.values(esquema.properties ?? {})) {
      if (Array.isArray(prop.type) || prop.anyOf) uniones++;
    }
  }
  assert.ok(uniones <= LIMITE, `${uniones} parámetros con unión, el límite es ${LIMITE}`);
});

test('una herramienta desconocida no rompe el bucle', async () => {
  const salida = JSON.parse(await ejecutar('formatear_disco', {}));
  assert.match(salida.error, /desconocida/i);
});

test('la copia del motor que viaja al backend es idéntica a la del tema', async () => {
  const fs = await import('node:fs');
  const crypto = await import('node:crypto');
  const md5 = (p: string) => crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');
  assert.equal(
    md5('datos/sjw-fitment.js'),
    md5('../theme/assets/sjw-fitment.js'),
    'datos/sjw-fitment.js se ha quedado atrás. Ejecuta npm run prepare-deploy: si el ' +
      'asistente y la ficha usan motores distintos, pueden dar veredictos distintos.',
  );
});

test('reenviar la respuesta quita lo que la API no acepta de vuelta', () => {
  // El campo `parsed` de un bloque de texto es de salida. Reenviarlo tumbaba la
  // segunda vuelta de cualquier conversación con herramientas con un 400.
  const conExtra = [
    { type: 'text', text: 'Voy a mirarlo.', citations: null, parsed: { algo: 1 } },
    { type: 'tool_use', id: 'tu_1', name: 'buscar_llantas', input: { diseno: 'SJW-048' } },
  ] as unknown as Parameters<typeof paraReenviar>[0];

  const salida = paraReenviar(conExtra) as Array<Record<string, unknown>>;
  assert.deepEqual(salida[0], { type: 'text', text: 'Voy a mirarlo.' });
  assert.equal('parsed' in salida[0]!, false);
  assert.equal('citations' in salida[0]!, false, 'citations a null no debe viajar');
});

test('reenviar no toca los bloques de pensamiento', () => {
  // Llevan firma y la API la verifica: cualquier retoque los invalida.
  const pensado = [
    { type: 'thinking', thinking: 'el anclaje no cuadra', signature: 'firma-abc' },
  ] as unknown as Parameters<typeof paraReenviar>[0];

  assert.deepEqual(paraReenviar(pensado)[0], {
    type: 'thinking', thinking: 'el anclaje no cuadra', signature: 'firma-abc',
  });
});
