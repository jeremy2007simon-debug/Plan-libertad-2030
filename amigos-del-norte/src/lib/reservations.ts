import type { Reservation, ReservationResult } from "@/types/reservation";

// -----------------------------------------------------------------------
// Capa de reservas.
//
// Hoy: valida y registra la reserva en el log del servidor.
// Mañana: este es el único punto que hay que tocar para conectar un
// proveedor real, sin cambiar el formulario ni la API route que lo llama.
//
//   - NovaCore Reserve: sustituir el cuerpo de createReservation() por una
//     llamada a su API (guardar NOVACORE_RESERVE_API_KEY / _URL en .env).
//   - Bot de WhatsApp con IA: NovaCore Reserve puede disparar la
//     confirmación y los recordatorios por WhatsApp tras crear la reserva.
//   - Panel privado del restaurante: leería las reservas desde el mismo
//     proveedor en vez de duplicar el almacenamiento aquí.
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
