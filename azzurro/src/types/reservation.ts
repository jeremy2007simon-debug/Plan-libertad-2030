export type Reservation = {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
  notes?: string;
};

export type ReservationResult =
  | { ok: true; id: string }
  | { ok: false; error: string };
