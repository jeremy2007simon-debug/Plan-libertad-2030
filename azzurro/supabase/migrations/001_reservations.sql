-- ════════════════════════════════════════════════════
-- Azzurro — Reservas
-- ════════════════════════════════════════════════════
-- Ejecutar en el SQL Editor del proyecto de Supabase (o con
-- `supabase db push` si usas el CLI). src/lib/reservations/store.ts
-- escribe aquí en cuanto SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY estén
-- configuradas; sin ellas, la web sigue funcionando con un fallback en
-- memoria.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS reservations (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  date        DATE NOT NULL,
  time        TIME NOT NULL,
  people      INTEGER NOT NULL CHECK (people > 0),
  comments    TEXT,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reservations_date_idx ON reservations (date);
CREATE INDEX IF NOT EXISTS reservations_status_idx ON reservations (status);

-- RLS activado sin políticas: la API solo escribe/lee con la service role
-- key (que siempre la esquiva), así que ningún cliente con la clave
-- pública (anon) puede leer ni escribir reservas ajenas.
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
