import type { Reservation, ReservationResult } from "@/types/reservation";

// -----------------------------------------------------------------------
// Capa de reservas.
//
// Hoy: valida y registra la solicitud en el log del servidor — esta web
// es una propuesta de diseño, todavía sin motor de reservas conectado.
// Mañana: este es el único punto que hay que tocar para enchufar un
// proveedor real, sin cambiar el formulario ni la API route que lo llama.
//
//   - NovaCore Reserve: sustituir el cuerpo de createReservation() por una
//     llamada a su API (guardar NOVACORE_RESERVE_API_KEY / _URL en .env).
//   - Bot IA por WhatsApp: NovaCore Reserve puede disparar la conversación
//     de confirmación por WhatsApp en cuanto se crea la reserva.
//   - Confirmaciones automáticas y recordatorios: orquestados por
//     NovaCore Reserve tras la creación, sin tocar esta web.
//   - Panel privado del restaurante: leería las reservas desde el mismo
//     proveedor en vez de duplicar almacenamiento aquí.
// -----------------------------------------------------------------------

export async function createReservation(
  reservation: Reservation
): Promise<ReservationResult> {
  // TODO(NovaCore Reserve): reemplazar por la integración real, p. ej.
  //
  // const res = await fetch(process.env.NOVACORE_RESERVE_URL!, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.NOVACORE_RESERVE_API_KEY}`,
  //   },
  //   body: JSON.stringify(reservation),
  // });
  // if (!res.ok) return { ok: false, error: "No se pudo crear la reserva." };
  // const { id } = await res.json();
  // return { ok: true, id };

  console.log("[reservas] Nueva solicitud de reserva:", reservation);

  return { ok: true, id: `local-${Date.now()}` };
}
