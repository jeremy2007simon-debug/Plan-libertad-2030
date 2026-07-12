import type { Reservation, ReservationResult } from "@/types/reservation";
import { saveReservation } from "./store";
import { sendReservationNotification } from "./notify";

// -----------------------------------------------------------------------
// Punto de entrada de la capa de reservas.
//
// Pipeline actual:
//
//   Formulario (Reservas.tsx) → API (app/api/reservations/route.ts)
//     → Base de datos (./store.ts) → Notificación por correo (./notify.ts)
//     → Panel del restaurante (no implementado todavía, ver README)
//
// Mañana, con NovaCore Reserve conectado, esta función pasaría a delegar
// directamente en su API en lugar de orquestar los pasos de abajo:
//
//   - NovaCore Reserve: sustituir el cuerpo de createReservation() por
//     una llamada a su API, p. ej.
//
//     const res = await fetch(process.env.NOVACORE_RESERVE_URL!, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NOVACORE_RESERVE_API_KEY}`,
//       },
//       body: JSON.stringify(reservation),
//     });
//     if (!res.ok) return { ok: false, error: "No se pudo crear la reserva." };
//     const { id } = await res.json();
//     return { ok: true, id };
//
//     (variables NOVACORE_RESERVE_URL / NOVACORE_RESERVE_API_KEY en
//     .env.local, ver .env.example)
//
//   - Bot IA por WhatsApp: NovaCore Reserve puede disparar la
//     confirmación por WhatsApp en cuanto se crea la reserva.
//   - Confirmaciones automáticas y recordatorios: idem, orquestados por
//     NovaCore Reserve tras la creación.
//   - Panel privado del restaurante: leería las reservas desde la base
//     de datos (o desde NovaCore Reserve) en vez de duplicar
//     almacenamiento — no implementado todavía.
// -----------------------------------------------------------------------

export async function createReservation(
  reservation: Reservation
): Promise<ReservationResult> {
  try {
    const record = await saveReservation(reservation);
    await sendReservationNotification(record);

    return { ok: true, id: record.id };
  } catch (error) {
    console.error("[reservas] No se pudo crear la reserva:", error);
    return {
      ok: false,
      error: "No se pudo guardar la reserva. Inténtalo de nuevo.",
    };
  }
}
