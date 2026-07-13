import type {
  Reservation,
  ReservationResult,
  StoredReservation,
} from "@/types/reservation";

// -----------------------------------------------------------------------
// Capa de reservas.
//
// Hoy: valida y registra la reserva en el log del servidor. Este es el
// único punto que hay que tocar para conectar servicios reales, sin
// cambiar el formulario (Reservas.tsx) ni la API route que lo llama.
//
// Rutas de integración futuras, no excluyentes entre sí:
//
//   - API (NovaCore Reserve): sustituir el cuerpo de createReservation()
//     por una llamada a su API (guardar NOVACORE_RESERVE_API_KEY / _URL
//     en .env). NovaCore puede a su vez disparar confirmación y
//     recordatorios por WhatsApp.
//   - Base de datos: tabla `reservations` con columnas
//     id, name, phone, email, date, time, people, comments, status,
//     created_at — y estados pending / confirmed / cancelled / completed
//     (ver ReservationStatus / StoredReservation en types/reservation.ts).
//     Insertar aquí la fila en lugar de (o además de) llamar a NovaCore.
//   - Email: enviar confirmación al cliente (si dejó `email`) y aviso al
//     restaurante tras crear la reserva.
//   - Panel privado del restaurante: leería las reservas desde la misma
//     base de datos o desde NovaCore, sin duplicar almacenamiento aquí.
// -----------------------------------------------------------------------

export async function createReservation(
  reservation: Reservation
): Promise<ReservationResult> {
  // TODO(NovaCore Reserve / Base de datos / Email): reemplazar por la
  // integración real. Ejemplo con NovaCore Reserve:
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
  //
  // Ejemplo de fila para una base de datos propia (tabla `reservations`):
  //
  // const row: StoredReservation = {
  //   ...reservation,
  //   id: crypto.randomUUID(),
  //   status: "pending",
  //   createdAt: new Date().toISOString(),
  // };
  // await db.insertInto("reservations").values(row).execute();
  // if (reservation.email) await sendConfirmationEmail(reservation.email, row);

  const stored: StoredReservation = {
    ...reservation,
    id: `local-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  console.log("[reservas] Nueva solicitud de reserva:", stored);

  return { ok: true, id: stored.id };
}
