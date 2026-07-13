export type Reservation = {
  name: string;
  phone: string;
  email?: string;
  guests: number;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  notes?: string;
};

export type ReservationResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

// Estados posibles de una reserva una vez haya persistencia real (ver
// src/lib/reservations.ts). No se usa todavía en la lógica — documentado
// para cuando se conecte la tabla `reservations`.
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

// Forma de una fila en la futura tabla `reservations` (ver "Base de
// datos" en src/lib/reservations.ts). `guests` aquí corresponde a la
// columna `people` de esa tabla; `createdAt` a `created_at`.
export type StoredReservation = Reservation & {
  id: string;
  status: ReservationStatus;
  createdAt: string; // ISO 8601
};
