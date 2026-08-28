/**
 * Prueba de entrega del formulario contra un destino de prueba.
 *
 * NUNCA toca el destino real del cliente. Levanta un webhook de mentira en
 * localhost, arranca el servidor de Next apuntando ahí con
 * `JOURNEY_REQUEST_WEBHOOK`, y comprueba de extremo a extremo que lo que sale
 * del formulario llega entero al otro lado.
 *
 * Qué comprueba
 * -------------
 *  1. Sin webhook configurado: 501, y la interfaz NO finge un envío correcto.
 *  2. Con webhook: la solicitud llega completa, con idioma, fecha y origen.
 *  3. Solo se responde «enviado» después de que el destino confirme.
 *  4. Un destino que responde con error da 502, no un falso éxito.
 *  5. Un destino que no responde a tiempo da 502 y no deja la petición colgada.
 *  6. La trampa antispam no reenvía nada.
 *  7. Una solicitud repetida con el mismo identificador no se entrega dos veces.
 *  8. El limitador corta a partir del sexto envío desde la misma conexión.
 *  9. Los registros de error no contienen datos personales.
 *
 * Uso
 * ---
 *   node scripts/test-journey-delivery.mjs
 *
 * Arranca y para su propio servidor: no hace falta tener uno levantado.
 */

import { spawn } from "node:child_process";
import http from "node:http";

const APP_PORT = 3199;
const HOOK_PORT = 3198;
const APP = `http://127.0.0.1:${APP_PORT}`;

const problems = [];
const fail = (m) => {
  problems.push(m);
  console.log(`  FALLO  ${m}`);
};
const pass = (m) => console.log(`  ok     ${m}`);

/* ---- Webhook de prueba --------------------------------------------------- */

const received = [];
/** Cómo debe comportarse el destino en la siguiente llamada. */
let behaviour = "ok";

const hook = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    received.push({ at: Date.now(), body: safeParse(body) });
    if (behaviour === "error") {
      res.writeHead(500).end("nope");
      return;
    }
    if (behaviour === "timeout") {
      // Se deja colgada: el endpoint debe cortar por su cuenta.
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" }).end('{"ok":true}');
  });
});
const safeParse = (s) => {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
};

await new Promise((r) => hook.listen(HOOK_PORT, "127.0.0.1", r));

/* ---- Servidor de la web -------------------------------------------------- */

let server = null;
const logs = [];

/** ¿Contesta algo en el puerto de la aplicación? */
async function portBusy() {
  try {
    await fetch(`${APP}/api/journey-requests`, { signal: AbortSignal.timeout(1500) });
    return true;
  } catch {
    return false;
  }
}

async function startApp(env) {
  if (await portBusy()) {
    throw new Error(
      `el puerto ${APP_PORT} ya está ocupado: la prueba hablaría con otro servidor`,
    );
  }
  // `detached` para poder matar el grupo entero: `npx` lanza a `next` como
  // hijo y una señal solo a `npx` deja el servidor escuchando, de modo que la
  // siguiente parte de la prueba hablaría con el servidor anterior.
  server = spawn("npx", ["next", "start", "-p", String(APP_PORT)], {
    env: { ...process.env, ...env },
    stdio: ["ignore", "pipe", "pipe"],
    detached: true,
  });
  server.stdout.on("data", (d) => logs.push(String(d)));
  server.stderr.on("data", (d) => logs.push(String(d)));
  for (let i = 0; i < 60; i += 1) {
    try {
      const r = await fetch(`${APP}/api/journey-requests`);
      if (r.ok) return;
    } catch {
      /* todavía no escucha */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("el servidor no llegó a arrancar");
}

async function stopApp() {
  if (!server) return;
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    server.kill("SIGTERM");
  }
  for (let i = 0; i < 40; i += 1) {
    await new Promise((r) => setTimeout(r, 250));
    if (!(await portBusy())) {
      server = null;
      return;
    }
  }
  throw new Error(`el servidor del puerto ${APP_PORT} no se paró`);
}

/** Solicitud completa y válida, con datos claramente de prueba. */
const enquiry = (over = {}) => ({
  tripType: "wildlife",
  destinationSlugs: ["serengeti"],
  travelMonth: "2026-07",
  durationDays: "8-10",
  travellers: { adults: 2, children: 1 },
  accommodationStyle: "classic",
  budgetPerPerson: "open",
  contact: {
    firstName: "Prueba",
    lastName: "Automatizada",
    email: "prueba.automatizada@example.invalid",
    phone: "+00 000 000 000",
    country: "España",
  },
  specialRequests: "Solicitud de prueba: NO es un viajero real.",
  preferredLanguage: "es",
  locale: "es",
  honeypot: "",
  elapsedMs: 60_000,
  requestId: `prueba-${Math.random().toString(36).slice(2)}`,
  ...over,
});

/**
 * Cada bloque envía desde su propia IP simulada.
 *
 * El limitador cuenta por IP; compartiéndola, el bloque que lo prueba dejaría
 * a los siguientes recibiendo 429 y midiendo otra cosa.
 */
let clientIp = "203.0.113.1";
const post = (payload) =>
  fetch(`${APP}/api/journey-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": clientIp },
    body: JSON.stringify(payload),
  });

/* ---- 1. Sin webhook ------------------------------------------------------ */

console.log("\n== 1. Sin destino configurado ==");
await startApp({ JOURNEY_REQUEST_WEBHOOK: "" });
{
  const status = await (await fetch(`${APP}/api/journey-requests`)).json();
  if (status.configured !== false) fail("GET dice que hay webhook cuando no lo hay");
  else pass("GET informa correctamente de que no hay destino");

  const r = await post(enquiry());
  const body = await r.json();
  if (r.status !== 501) fail(`sin webhook responde ${r.status}, esperado 501`);
  else if (body.status !== "not-configured")
    fail(`sin webhook el estado es "${body.status}", esperado "not-configured"`);
  else pass("sin webhook responde 501 y no finge un envío");
  if (received.length !== 0) fail("se entregó algo sin destino configurado");
}
await stopApp();

/* ---- 2-9. Con webhook de prueba ------------------------------------------ */

console.log("\n== 2. Entrega real contra el destino de prueba ==");
clientIp = "203.0.113.2";
await startApp({ JOURNEY_REQUEST_WEBHOOK: `http://127.0.0.1:${HOOK_PORT}/hook` });
{
  const status = await (await fetch(`${APP}/api/journey-requests`)).json();
  if (status.configured !== true) fail("GET no ve el webhook configurado");
  else pass("GET informa de que hay destino configurado");

  received.length = 0;
  const payload = enquiry();
  const r = await post(payload);
  const body = await r.json();

  if (r.status !== 200 || body.status !== "ok")
    fail(`la entrega respondió ${r.status} / ${body.status}`);
  else pass("responde 200 tras confirmar el destino");

  if (!/^MQ-\d{6}-[A-Z0-9]{4}$/.test(body.reference ?? ""))
    fail(`referencia con formato inesperado: ${body.reference}`);
  else pass(`devuelve una referencia legible (${body.reference})`);

  if (received.length !== 1) fail(`el destino recibió ${received.length} solicitudes`);
  else {
    const got = received[0].body;
    const expected = {
      "todas las respuestas": got?.tripType === "wildlife" && got?.durationDays === "8-10",
      "los viajeros": got?.travellers?.adults === 2 && got?.travellers?.children === 1,
      "el contacto": got?.contact?.email === payload.contact.email,
      "las notas": got?.specialRequests === payload.specialRequests,
      "el idioma de la página": got?.locale === "es",
      "el idioma de respuesta": got?.preferredLanguage === "es",
      "la fecha": typeof got?.receivedAt === "string" && !Number.isNaN(Date.parse(got.receivedAt)),
      "el origen": typeof got?.origin === "string" && got.origin.includes(String(APP_PORT)),
      "la referencia": got?.reference === body.reference,
    };
    for (const [what, ok] of Object.entries(expected)) {
      if (ok) pass(`el destino recibe ${what}`);
      else fail(`al destino le falta ${what}`);
    }
  }
}

console.log("\n== 3. Destino que responde con error ==");
clientIp = "203.0.113.3";
{
  received.length = 0;
  behaviour = "error";
  const r = await post(enquiry());
  const body = await r.json();
  behaviour = "ok";
  if (r.status !== 502) fail(`un destino con error responde ${r.status}, esperado 502`);
  else if (body.status === "ok") fail("un destino con error devuelve éxito");
  else pass("un destino con error da 502 y un mensaje claro");
}

console.log("\n== 4. Destino que no responde ==");
clientIp = "203.0.113.4";
{
  received.length = 0;
  behaviour = "timeout";
  const started = Date.now();
  const r = await post(enquiry());
  const elapsed = Date.now() - started;
  behaviour = "ok";
  if (r.status !== 502) fail(`un destino colgado responde ${r.status}, esperado 502`);
  else if (elapsed > 15_000) fail(`tardó ${Math.round(elapsed / 1000)} s en cortar`);
  else pass(`corta a los ${Math.round(elapsed / 1000)} s y responde 502`);
}

console.log("\n== 5. Trampa antispam ==");
clientIp = "203.0.113.5";
{
  received.length = 0;
  const r = await post(enquiry({ honeypot: "http://spam.example" }));
  const body = await r.json();
  if (received.length !== 0) fail("la trampa antispam reenvió la solicitud");
  else if (body.status !== "ok") fail("la trampa antispam revela que ha fallado");
  else pass("la trampa antispam no entrega nada y no se delata");
}

console.log("\n== 6. Envío duplicado ==");
clientIp = "203.0.113.6";
{
  received.length = 0;
  const payload = enquiry();
  const first = await (await post(payload)).json();
  const second = await (await post(payload)).json();
  if (received.length !== 1)
    fail(`una solicitud repetida se entregó ${received.length} veces`);
  else if (first.reference !== second.reference)
    fail("una solicitud repetida recibe dos referencias distintas");
  else pass("una solicitud repetida no se entrega dos veces y mantiene su referencia");
}

console.log("\n== 7. Límite de envíos ==");
{
  received.length = 0;
  const codes = [];
  for (let i = 0; i < 8; i += 1) {
    const r = await fetch(`${APP}/api/journey-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "198.51.100.9" },
      body: JSON.stringify(enquiry()),
    });
    codes.push(r.status);
  }
  const limited = codes.filter((c) => c === 429).length;
  if (limited === 0) fail(`el limitador no cortó ninguno: ${codes.join(", ")}`);
  else pass(`el limitador corta ${limited} de 8 envíos seguidos (${codes.join(", ")})`);
}

console.log("\n== 8. Validación en servidor ==");
clientIp = "203.0.113.7";
{
  const sinCorreo = await post(enquiry({ contact: { firstName: "A", lastName: "", email: "" } }));
  const correoMalo = await post(enquiry({ contact: { firstName: "A", lastName: "", email: "no-es-un-correo" } }));
  if (sinCorreo.status !== 422) fail(`sin correo responde ${sinCorreo.status}, esperado 422`);
  else pass("sin nombre o correo responde 422");
  if (correoMalo.status !== 422) fail(`correo inválido responde ${correoMalo.status}, esperado 422`);
  else pass("un correo con formato inválido responde 422");
}

console.log("\n== 9. Los registros no llevan datos personales ==");
{
  const texto = logs.join("\n");
  const leaks = [
    "prueba.automatizada@example.invalid",
    "Automatizada",
    "+00 000 000 000",
    "NO es un viajero real",
  ].filter((needle) => texto.includes(needle));
  if (leaks.length) fail(`los registros contienen datos personales: ${leaks.join(", ")}`);
  else pass("los registros de error no contienen nombre, correo, teléfono ni notas");

  const failures = texto.match(/\[journey-requests\][^\n]*/g) ?? [];
  if (failures.length === 0) fail("no se registró ningún fallo de entrega");
  else pass(`se registraron ${failures.length} fallos con su motivo y referencia`);
}

await stopApp();
hook.close();

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Entrega del formulario: sin problemas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
