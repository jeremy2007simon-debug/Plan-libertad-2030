import { NextResponse } from "next/server";
import { submitQuoteRequest } from "@/lib/quotes";
import type { QuoteRequest } from "@/types/quote";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<QuoteRequest> | null;

  if (!body || !body.name || !body.phone || !body.email || !body.part) {
    return NextResponse.json(
      { ok: false, error: "Faltan datos obligatorios." },
      { status: 400 }
    );
  }

  const result = await submitQuoteRequest({
    name: String(body.name).slice(0, 120),
    company: body.company ? String(body.company).slice(0, 120) : undefined,
    phone: String(body.phone).slice(0, 40),
    email: String(body.email).slice(0, 160),
    vehicle: body.vehicle ? String(body.vehicle).slice(0, 120) : undefined,
    plate: body.plate ? String(body.plate).slice(0, 20) : undefined,
    part: String(body.part).slice(0, 200),
    notes: body.notes ? String(body.notes).slice(0, 600) : undefined,
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result, { status: 201 });
}
