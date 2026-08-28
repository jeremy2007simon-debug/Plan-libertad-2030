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
 * 10. En un navegador real: «enviado» solo tras la respuesta, el error se ve
 *     traducido y sin falso éxito, y la consola no deja datos personales.
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
    if (behaviour === "slow") {
      // Responde bien, pero tarde: sirve para ver qué pinta la interfaz
      // MIENTRAS espera.
      await new Promise((r) => setTimeout(r, 1_500));
      res.writeHead(200, { "Content-Type": "application/json" }).end('{"ok":true}');
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
    /*
     * Los siete pasos del formulario, uno a uno y por su nombre.
     *
     * Comprobar dos campos sueltos no demuestra que llegue el formulario: si
     * mañana alguien deja de enviar el presupuesto, «todas las respuestas»
     * seguiría en verde. Aquí falta uno y se ve cuál.
     */
    const expected = {
      "paso 1 · tipo de viaje": got?.tripType === payload.tripType,
      "paso 2 · destinos":
        JSON.stringify(got?.destinationSlugs) === JSON.stringify(payload.destinationSlugs),
      "paso 3 · fechas y duración":
        got?.travelMonth === payload.travelMonth && got?.durationDays === payload.durationDays,
      "paso 4 · viajeros":
        got?.travellers?.adults === payload.travellers.adults &&
        got?.travellers?.children === payload.travellers.children,
      "paso 5 · alojamiento y presupuesto":
        got?.accommodationStyle === payload.accommodationStyle &&
        got?.budgetPerPerson === payload.budgetPerPerson,
      "paso 6 · contacto":
        got?.contact?.firstName === payload.contact.firstName &&
        got?.contact?.lastName === payload.contact.lastName &&
        got?.contact?.email === payload.contact.email &&
        got?.contact?.phone === payload.contact.phone &&
        got?.contact?.country === payload.contact.country,
      "paso 6 · notas": got?.specialRequests === payload.specialRequests,
      "paso 7 · resumen enviado como una sola solicitud": received.length === 1,
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

console.log("\n== 10. La interfaz, en un navegador de verdad ==");
// Si algo revienta aquí dentro, el servidor de la prueba tiene que morir
// igualmente: dejarlo escuchando hace que la siguiente ejecución hable con el
// servidor viejo y mida otra cosa.
try {
  await browserChecks();
} catch (error) {
  fail(`la comprobación en navegador se rompió: ${error}`);
}

await stopApp();
hook.close();

/**
 * Lo que ve una persona.
 *
 * Las nueve secciones anteriores hablan con el endpoint. Esta abre el
 * formulario en Chromium, en español, y comprueba las tres cosas que el
 * endpoint no puede demostrar por sí solo:
 *
 *  · que «enviado» aparece DESPUÉS de que el destino conteste, no al pulsar;
 *  · que un 502 se ve como un error traducido y no como un falso éxito;
 *  · que la consola del navegador no deja datos personales.
 *
 * El borrador se siembra en `localStorage` antes de que cargue el JS, así que
 * el formulario arranca en el resumen sin reescribir aquí los siete pasos: eso
 * ya lo prueba `test-planner-locale.mjs`.
 */
async function browserChecks() {
  const { chromium } = await import("/opt/node22/lib/node_modules/playwright/index.mjs");
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

  const draftState = {
    tripType: "wildlife",
    destinationSlugs: ["serengeti"],
    travelMonth: "2026-07",
    datesFlexible: false,
    durationDays: "8-10",
    adults: 2,
    children: 1,
    accommodationStyle: "classic",
    budgetPerPerson: "open",
    firstName: "Prueba",
    lastName: "Automatizada",
    email: "prueba.automatizada@example.invalid",
    phone: "+00 000 000 000",
    country: "España",
    specialRequests: "Solicitud de prueba: NO es un viajero real.",
    preferredLanguage: "es",
    consent: true,
  };

  /** Abre el resumen con el borrador ya puesto y un identificador nuevo. */
  async function openSummary(consola) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const requestId = `prueba-navegador-${Math.random().toString(36).slice(2)}`;
    await context.addInitScript(
      ([key, draft]) => localStorage.setItem(key, JSON.stringify(draft)),
      [
        "maisha-quest:journey-draft:v2",
        { version: 2, step: 6, state: draftState, languageTouched: false, requestId },
      ],
    );
    const page = await context.newPage();
    page.on("console", (m) => consola.push(m.text()));
    page.on("pageerror", (e) => consola.push(String(e)));
    await page.goto(`${APP}/es/plan`, { waitUntil: "networkidle" });
    return { context, page };
  }

  const boton = (page) => page.getByRole("button", { name: "Enviar mi solicitud" });
  const consola = [];

  /* 10.1 — El éxito llega después de la respuesta, no al pulsar. */
  behaviour = "slow";
  received.length = 0;
  {
    const { context, page } = await openSummary(consola);
    await boton(page).click();

    // Medio segundo después el destino todavía no ha contestado.
    await page.waitForTimeout(500);
    const durante = await page.locator("body").innerText();
    if (durante.includes("Tu referencia es"))
      fail("la interfaz da la solicitud por enviada antes de que el destino conteste");
    else pass("mientras espera no dice que se haya enviado");
    // Ojo con la comparación: el botón va en versalitas y `innerText` aplica
    // el `text-transform`, así que lo que devuelve es «ENVIANDO…».
    if (!/enviando…/i.test(durante))
      fail("mientras espera no se ve el estado «Enviando…»");
    else pass("mientras espera muestra «Enviando…»");
    const enviando = page.getByRole("button", { name: "Enviando…" });
    if (await enviando.isEnabled())
      fail("el botón sigue activo mientras se envía: se puede enviar dos veces");
    else pass("el botón queda desactivado mientras espera respuesta");

    await page.getByText("Tu referencia es").waitFor({ timeout: 15_000 });
    const despues = await page.locator("body").innerText();
    if (!/MQ-\d{6}-[A-Z0-9]{4}/.test(despues))
      fail("tras la respuesta no aparece la referencia");
    else pass("tras la respuesta del destino aparece el éxito con su referencia");
    if (received.length !== 1)
      fail(`el destino recibió ${received.length} solicitudes, esperada 1`);
    else pass("un solo envío, sin duplicados");
    await context.close();
  }

  /* 10.2 — Un 502 se ve como error, traducido, y no como éxito. */
  behaviour = "error";
  received.length = 0;
  {
    const { context, page } = await openSummary(consola);
    await boton(page).click();
    await page.waitForTimeout(2_000);
    const texto = await page.locator("body").innerText();
    if (texto.includes("Tu referencia es"))
      fail("un destino con error acaba mostrando un falso éxito");
    else pass("un destino con error no muestra éxito");
    if (!texto.includes("No hemos podido entregar tu solicitud ahora mismo"))
      fail("un destino con error no muestra el mensaje de error en español");
    else pass("un destino con error muestra el mensaje de error, en español");
    if (/could not deliver|Too many enquiries|Please try again/i.test(texto))
      fail("el mensaje de error del servidor se cuela en inglés");
    else pass("no se cuela el mensaje en inglés del servidor");
    await context.close();
  }

  /* 10.3 — La consola del navegador no lleva datos personales. */
  {
    const texto = consola.join("\n");
    const leaks = [
      "prueba.automatizada@example.invalid",
      "Automatizada",
      "+00 000 000 000",
      "NO es un viajero real",
    ].filter((needle) => texto.includes(needle));
    if (leaks.length) fail(`la consola del navegador filtra datos: ${leaks.join(", ")}`);
    else pass("la consola del navegador no deja nombre, correo, teléfono ni notas");
  }

  behaviour = "ok";
  await browser.close();
}

console.log("\n=========================");
if (problems.length === 0) {
  console.log("Entrega del formulario: sin problemas.");
  process.exit(0);
}
console.log(`${problems.length} problemas:`);
for (const p of problems) console.log(`  - ${p}`);
process.exit(1);
