import type { Reservation, ReservationRecord } from "@/types/reservation";

// -----------------------------------------------------------------------
// Capa de almacenamiento ("base de datos") de reservas.
//
// Hoy: guarda las reservas en memoria del proceso — se pierden al
// reiniciar el servidor. Suficiente para esta propuesta de diseño, no
// para producción. El esquema de referencia de la tabla real está en
// db/schema.sql (tabla `reservations`).
//
// Mañana, para conectar una base de datos real (Postgres/Supabase/etc.):
//
//   1. Define DATABASE_URL en .env.local (ver .env.example).
//   2. Sustituye el cuerpo de saveReservation() por un INSERT real, p. ej.
//
//      const [row] = await db
//        .insertInto("reservations")
//        .values({ ...reservation, status: "pending" })
//        .returningAll()
//        .execute();
//      return row;
//
// Si en su lugar se conecta NovaCore Reserve, esta capa podría dejar de
// ser necesaria: createReservation() (en ./index.ts) llamaría
// directamente a su API en vez de guardar aquí.
// -----------------------------------------------------------------------

const memoryStore: ReservationRecord[] = [];

export async function saveReservation(
  reservation: Reservation
): Promise<ReservationRecord> {
  const record: ReservationRecord = {
    ...reservation,
    id: `local-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  memoryStore.push(record);
  console.log("[reservas] Nueva reserva guardada (memoria):", record);

  return record;
}
