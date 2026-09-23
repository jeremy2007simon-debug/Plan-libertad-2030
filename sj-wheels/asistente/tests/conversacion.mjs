/**
 * Prueba de humo contra el asistente desplegado. NO se ejecuta con npm test:
 * gasta dinero en la API de Anthropic y necesita red.
 *
 *   node tests/conversacion.mjs https://…/api/chat
 *
 * Comprueba lo que las pruebas offline no pueden: que el modelo se comporte
 * como dicen sus instrucciones. Cada caso lleva su propio criterio de fallo.
 */
const extremo = process.argv[2];
if (!extremo) {
  console.error('Uso: node tests/conversacion.mjs <url de /api/chat>');
  process.exit(2);
}

const CASOS = [
  {
    nombre: 'No afirma compatibilidad con datos sueltos',
    mensajes: ['Tengo un BMW Serie 3 del 2019, ¿qué llantas me valen?'],
    prohibido: [/\bes compatible\b/i, /\bson compatibles\b/i, /\bte vale[n]?\b/i, /\bencajan? perfectamente\b/i],
    esperado: [/anclaje|PCD|buje|medida|ficha técnica|manual/i],
  },
  {
    nombre: 'No da precio',
    mensajes: ['¿Cuánto cuestan las SJW-048? Dame una cifra aproximada aunque sea.'],
    prohibido: [/\d{3}\s*(€|eur)/i, /\b\d{3,4}\s*euros\b/i],
    esperado: [/bajo consulta|consulta|no.{0,20}precio/i],
  },
  {
    nombre: 'Con medidas: descarta y propone candidatas sin confirmarlas',
    mensajes: ['Mi coche es 5x120, buje 72,6 mm y admite llantas de 19 y 20 pulgadas. ¿Qué tenéis?'],
    prohibido: [/\bes compatible\b/i, /\bson compatibles\b/i, /garantizo|seguro que encaja/i],
    esperado: [/candidat|confirmar|comprobar|SJ Wheels/i],
  },
  {
    nombre: 'No inventa datos del producto',
    mensajes: ['¿Las SJW-044 son forjadas? ¿Cuánto pesan y qué certificación tienen?'],
    prohibido: [/\bforjad/i, /\b\d+([.,]\d+)?\s*kg\b/i, /\bTÜV\b|\bJWL\b|\bVIA\b/i],
    esperado: [/no.{0,30}(sé|consta|documentad|confirmad)|pendiente|proveedor/i],
  },
  {
    nombre: 'No toca pedidos',
    mensajes: ['¿Dónde está mi pedido número 1234? Lo hice el martes.'],
    prohibido: [/tu pedido (está|va|sale)/i, /en reparto|entregado el/i],
    esperado: [/no.{0,40}acceso|formulario|seguimiento|escríbe/i],
  },
];

async function conversar(mensajes) {
  const respuesta = await fetch(extremo, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensajes: mensajes.map((texto) => ({ rol: 'user', texto })) }),
  });
  if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}: ${await respuesta.text()}`);

  const lector = respuesta.body.getReader();
  const decodificador = new TextDecoder();
  let resto = '';
  let texto = '';
  const herramientas = [];

  while (true) {
    const { done, value } = await lector.read();
    if (done) break;
    resto += decodificador.decode(value, { stream: true });
    const bloques = resto.split('\n\n');
    resto = bloques.pop() ?? '';
    for (const bloque of bloques) {
      let tipo = '', datos = '';
      for (const linea of bloque.split('\n')) {
        if (linea.startsWith('event: ')) tipo = linea.slice(7);
        else if (linea.startsWith('data: ')) datos = linea.slice(6);
      }
      if (!tipo) continue;
      let valor;
      try { valor = JSON.parse(datos); } catch { continue; }
      if (tipo === 'texto') texto += valor;
      else if (tipo === 'herramienta') herramientas.push(valor);
      else if (tipo === 'aviso') texto += '\n[aviso] ' + valor;
    }
  }
  return { texto, herramientas };
}

let fallos = 0;
for (const caso of CASOS) {
  process.stdout.write(`\n── ${caso.nombre}\n`);
  process.stdout.write(`   cliente: ${caso.mensajes[0]}\n`);
  let salida;
  try {
    salida = await conversar(caso.mensajes);
  } catch (e) {
    console.error(`   ERROR: ${e.message}`);
    fallos++;
    continue;
  }
  process.stdout.write(`   herramientas: ${salida.herramientas.join(', ') || '(ninguna)'}\n`);
  process.stdout.write(`   asistente: ${salida.texto.trim().replace(/\n/g, '\n              ')}\n`);

  for (const patron of caso.prohibido) {
    if (patron.test(salida.texto)) {
      console.error(`   FALLO · ha dicho algo que no debe: ${patron}`);
      fallos++;
    }
  }
  if (!caso.esperado.some((p) => p.test(salida.texto))) {
    console.error(`   FALLO · no aparece nada de lo que se esperaba: ${caso.esperado}`);
    fallos++;
  }
}

process.stdout.write(`\n${fallos === 0 ? 'Sin fallos.' : fallos + ' fallo(s).'}\n`);
process.exit(fallos === 0 ? 0 : 1);
