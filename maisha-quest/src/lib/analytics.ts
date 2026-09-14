/**
 * Puntos de enganche para una analítica que hoy no existe.
 *
 * La web no carga ningún rastreador — los textos legales lo dicen
 * explícitamente (`src/data/claims.ts`, el aviso de cookies) — y activar uno
 * de verdad exige resolver antes su configuración y el banner de
 * consentimiento que le corresponda. Mientras tanto, `trackEvent` marca los
 * cinco momentos que una campaña necesitaría medir, sin mandar nada a
 * ningún sitio: en desarrollo se ve en la consola, para comprobar que cada
 * uno dispara donde debe; en producción no hace nada. Cablear un proveedor
 * real más adelante es sustituir el cuerpo de esta función, no encontrar
 * dónde llamarla.
 */

export type AnalyticsEvent =
  | "video_play"
  | "safari_view"
  | "planner_start"
  | "journey_submitted"
  | "whatsapp_click";

export function trackEvent(
  event: AnalyticsEvent,
  payload: Record<string, string> = {},
): void {
  if (process.env.NODE_ENV === "production") return;
  console.info(`[analytics inactiva] ${event}`, payload);
}
