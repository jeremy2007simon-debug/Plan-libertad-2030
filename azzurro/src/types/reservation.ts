export type Reservation = {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  notes?: string;
};

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

// Forma de una reserva ya guardada — corresponde a una fila de la tabla
// `reservations` (ver db/schema.sql).
export type ReservationRecord = Reservation & {
  id: string;
  status: ReservationStatus;
  createdAt: string; // ISO 8601
};

export type ReservationResult =
  | { ok: true; id: string }
  | { ok: false; error: string };
