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

  const reference = buildReference();

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        receivedAt: new Date().toISOString(),
        // Se entrega igualmente, marcada: descartarla sería peor que revisarla.
        suspectedBot,
        ...payload,
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}`);
    }
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "We could not deliver your enquiry just now.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ status: "ok", reference });
}

/** Referencia legible para el viajero: MQ-YYMMDD-XXXX. */
function buildReference(): string {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MQ-${date}-${suffix}`;
}
