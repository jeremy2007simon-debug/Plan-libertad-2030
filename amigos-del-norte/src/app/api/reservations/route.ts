import { NextResponse } from "next/server";
import { createReservation } from "@/lib/reservations";
import type { Reservation } from "@/types/reservation";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<Reservation> | null;

  if (
    !body ||
    !body.name ||
    !body.phone ||
    !body.guests ||
    !body.date ||
    !body.time
  ) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios." },
      { status: 400 }
    );
  }

  const result = await createReservation({
    name: String(body.name).slice(0, 120),
    phone: String(body.phone).slice(0, 40),
    guests: Number(body.guests),
    date: String(body.date),
    time: String(body.time),
    notes: body.notes ? String(body.notes).slice(0, 600) : undefined,
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result, { status: 201 });
}
