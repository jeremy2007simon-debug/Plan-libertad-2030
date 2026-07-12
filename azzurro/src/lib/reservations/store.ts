import type { Reservation, ReservationRecord } from "@/types/reservation";
import { getSupabaseClient } from "@/lib/supabase";

// -----------------------------------------------------------------------
// Capa de almacenamiento ("base de datos") de reservas.
//
// Con SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY configuradas (ver
// .env.example), guarda en la tabla `reservations` de Supabase — esquema
// en supabase/migrations/001_reservations.sql.
//
// Sin esas variables, cae a un almacenamiento en memoria del proceso (se
// pierde al reiniciar el servidor) para que la web siga funcionando en
// local sin depender de Supabase.
//
// Si en su lugar se conecta NovaCore Reserve, esta capa podría dejar de
// ser necesaria: createReservation() (en ./index.ts) llamaría
// directamente a su API en vez de guardar aquí.
// -----------------------------------------------------------------------

const memoryStore: ReservationRecord[] = [];

type ReservationRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  people: number;
  comments: string | null;
  status: ReservationRecord["status"];
  created_at: string;
};

function rowToRecord(row: ReservationRow): ReservationRecord {
  return {
    name: row.name,
    phone: row.phone,
    email: row.email,
    guests: row.people,
    date: row.date,
    time: row.time,
    notes: row.comments ?? undefined,
    id: row.id,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function saveReservation(
  reservation: Reservation
): Promise<ReservationRecord> {
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        name: reservation.name,
        phone: reservation.phone,
        email: reservation.email,
        date: reservation.date,
        time: reservation.time,
        people: reservation.guests,
        comments: reservation.notes ?? null,
      })
      .select()
      .single();

    if (error || !data) {
      console.error("[reservas] Error al guardar en Supabase:", error);
      throw new Error("No se pudo guardar la reserva en la base de datos.");
    }

    console.log("[reservas] Nueva reserva guardada (Supabase):", data.id);
    return rowToRecord(data as ReservationRow);
  }

  const record: ReservationRecord = {
    ...reservation,
    id: `local-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  memoryStore.push(record);
  console.log(
    "[reservas] Supabase no configurado — reserva guardada en memoria:",
    record
  );

  return record;
}
