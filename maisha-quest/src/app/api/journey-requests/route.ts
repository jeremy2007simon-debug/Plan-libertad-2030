import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/planner";
import type { ContactRequest } from "@/types/content";

/**
 * Recepción de solicitudes de viaje.
 *
 * ESTADO: sin destino configurado. Mientras no exista `JOURNEY_REQUEST_WEBHOOK`
 * (o el conector definitivo: Supabase, CRM o email transaccional), este
 * endpoint responde 501 y la interfaz lo dice claramente y ofrece enviar el
 * mismo resumen por email o WhatsApp.
 *
 * Esto es deliberado: devolver 200 sin haber entregado nada significaría que
 * un viajero cree haber contactado con Maisha Quest cuando nadie va a leerlo.
 * Es el peor fallo posible en un formulario comercial.
 *
 * Para activarlo basta con definir `JOURNEY_REQUEST_WEBHOOK` en el entorno
 * (ver `.env.example`); el reenvío ya está escrito abajo.
 */

/**
 * Antispam: umbral por debajo del cual la cumplimentación es sospechosa.
 *
 * NO se descarta la solicitud por esto. Un viajero que vuelve a un borrador
 * guardado puede llegar al resumen y enviar en dos segundos —el cronómetro
 * arranca al montar el formulario, no cuando empezó a rellenarlo— y descartar
 * ese envío en silencio sería exactamente el fallo que esta web evita: alguien
 * cree haber contactado y nadie lo va a leer. La sospecha se marca en el
 * payload para que la triaje una persona.
 */
const SUSPICIOUS_ELAPSED_MS = 4_000;

/** Ventana y tope del limitador por IP. */
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;

/** Cuánto se recuerda una solicitud ya entregada, para no duplicarla. */
const DEDUPE_TTL_MS = 30 * 60_000;

/**
 * Memoria del proceso: envíos recientes por IP y solicitudes ya entregadas.
 *
 * LIMITACIÓN CONOCIDA, y conviene que esté escrita: en un despliegue sin
 * estado —Vercel entre ellos— cada instancia tiene su propio mapa, así que el
 * límite es por instancia y no global. Sirve contra el caso real, que es un
 * script machacando el formulario dentro de la misma conexión, y no pretende
 * ser una defensa distribuida. El día que haga falta eso, el sitio es un
 * almacén compartido (KV, Redis) y solo cambian estas dos funciones.
 */
const hits = new Map<string, number[]>();
const delivered = new Map<string, { reference: string; at: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    // Poda: sin esto el mapa crece sin fin en un proceso de larga vida.
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

/**
 * Registra el error sin guardar datos personales.
 *
 * Solo qué falló y con qué código. Nunca el nombre, el correo, el teléfono ni
 * el contenido de la solicitud: un log de servidor no es el sitio donde deben
 * acabar los datos de un viajero, y además queda fuera de lo que el visitante
 * ha consentido al marcar la casilla.
 */
function logFailure(reason: string, reference: string, status?: number): void {
  console.error(
    `[journey-requests] entrega fallida · ref=${reference} · motivo=${reason}` +
      (status === undefined ? "" : ` · respuesta=${status}`),
  );
}

/**
 * Estado del canal de entrega, sin exponer nada.
 *
 * Existe porque no había forma segura de averiguar si el webhook está
 * configurado en un despliegue concreto: la única señal era mandar una
 * solicitud completa, y eso significa enviarle al cliente una solicitud falsa
 * de un viajero que no existe. Esto responde a la pregunta sin efectos.
 *
 * Devuelve un booleano y nada más: ni la URL, ni el host, ni su longitud.
 */
export function GET() {
  return NextResponse.json(
    { configured: Boolean(process.env.JOURNEY_REQUEST_WEBHOOK) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  let payload: ContactRequest;

  try {
    payload = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json(
      { status: "error", message: "We could not read that request." },
      { status: 400 },
    );
  }

  // Trampa antispam: el campo está oculto y fuera del orden de tabulación, así
  // que solo lo rellena un bot. Se responde con éxito aparente para no
  // explicarle por qué ha fallado, pero no se reenvía nada. Es el ÚNICO caso
  // en el que se descarta una solicitud en silencio, y no puede darse por
  // accidente con una persona.
  if (payload.honeypot) {
    return NextResponse.json({ status: "ok", reference: "" });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "desconocida";

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        status: "error",
        message: "Too many enquiries from this connection. Please try again shortly.",
      },
      { status: 429, headers: { "Retry-After": String(RATE_WINDOW_MS / 1000) } },
    );
  }

  const suspectedBot =
    typeof payload.elapsedMs === "number" &&
    payload.elapsedMs < SUSPICIOUS_ELAPSED_MS;

  // Mismas reglas que en el cliente: nadie se salta la validación llamando
  // directamente al endpoint.
  const contact = payload.contact;
  if (!contact?.firstName?.trim() || !contact?.email?.trim()) {
    return NextResponse.json(
      { status: "error", message: "Name and email are required." },
      { status: 422 },
    );
  }
  if (!isValidEmail(contact.email)) {
    return NextResponse.json(
      { status: "error", message: "That email address does not look right." },
      { status: 422 },
    );
  }

  const webhook = process.env.JOURNEY_REQUEST_WEBHOOK;

  if (!webhook) {
    return NextResponse.json(
      {
        status: "not-configured",
        message:
          "No delivery destination is configured, so this enquiry was not sent.",
      },
      { status: 501 },
    );
  }

  /*
   * Envíos duplicados.
   *
   * El botón se desactiva mientras se envía, pero eso no cubre una conexión
   * que se corta después de entregar y antes de responder: el visitante ve un
   * error, vuelve a darle y el cliente recibe la misma solicitud dos veces. El
   * navegador manda un `requestId` estable por borrador, y una solicitud ya
   * entregada devuelve su misma referencia sin reenviarse.
   */
  const requestId = typeof payload.requestId === "string" ? payload.requestId : "";
  const now = Date.now();
  for (const [key, entry] of delivered) {
    if (now - entry.at > DEDUPE_TTL_MS) delivered.delete(key);
  }
  const already = requestId ? delivered.get(requestId) : undefined;
  if (already) {
    return NextResponse.json({ status: "ok", reference: already.reference });
  }

  const reference = buildReference();

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        receivedAt: new Date().toISOString(),
        /** Origen: de qué despliegue sale, para separar pruebas de producción. */
        origin: new URL(request.url).origin,
        // Se entrega igualmente, marcada: descartarla sería peor que revisarla.
        suspectedBot,
        ...payload,
      }),
      // Sin esto, un destino que no responde deja la solicitud colgada hasta
      // que el runtime la corta, y el visitante no sabe si se envió.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      logFailure("el destino respondió con error", reference, response.status);
      return NextResponse.json(
        { status: "error", message: "We could not deliver your enquiry just now." },
        { status: 502 },
      );
    }
  } catch (error) {
    const reason =
      error instanceof Error && error.name === "TimeoutError"
        ? "el destino agotó el tiempo de espera"
        : "no se pudo contactar con el destino";
    logFailure(reason, reference);
    return NextResponse.json(
      { status: "error", message: "We could not deliver your enquiry just now." },
      { status: 502 },
    );
  }

  if (requestId) delivered.set(requestId, { reference, at: Date.now() });

  return NextResponse.json({ status: "ok", reference });
}

/** Referencia legible para el viajero: MQ-YYMMDD-XXXX. */
function buildReference(): string {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MQ-${date}-${suffix}`;
}
