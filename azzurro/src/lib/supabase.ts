import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente de Supabase para uso exclusivo en servidor (API routes) — usa la
// service role key, que nunca debe llegar al navegador ni exponerse con
// el prefijo NEXT_PUBLIC_. Azzurro no tiene login de usuarios, así que no
// hace falta el cliente con cookies de sesión que usa Tradelingo-ai
// (@supabase/ssr) — con supabase-js directo es suficiente.
//
// Sin SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY configuradas, devuelve
// null y quien lo use debe hacer su propio fallback (ver
// src/lib/reservations/store.ts).

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  return client;
}
