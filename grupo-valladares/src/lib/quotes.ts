import type { QuoteRequest, QuoteResult } from "@/types/quote";

// Punto único de entrada para procesar una solicitud de presupuesto.
// Hoy solo registra la solicitud; es el lugar donde enchufar en el futuro
// el envío a CRM, notificación al equipo o triaje por NovaCore Assistant,
// sin tocar la ruta de API ni el formulario.
export async function submitQuoteRequest(
  request: QuoteRequest
): Promise<QuoteResult> {
  const id = `Q-${Date.now().toString(36).toUpperCase()}`;

  console.log("[presupuesto] nueva solicitud", { id, ...request });

  return { ok: true, id };
}
