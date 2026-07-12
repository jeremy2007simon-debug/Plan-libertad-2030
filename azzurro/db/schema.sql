-- Esquema de referencia para la tabla de reservas.
--
-- No conectado todavía: la app usa un almacenamiento en memoria
-- (src/lib/reservations/store.ts) hasta que haya una base de datos real.
-- Ejecuta esto (o el equivalente en el proveedor elegido, p. ej. Supabase)
-- al conectar Postgres, y sustituye store.ts para que lea/escriba aquí.
--
-- Nota: la columna `people` corresponde al campo `guests` del tipo
-- Reservation en src/types/reservation.ts.

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  date date not null,
  time time not null,
  people integer not null,
  comments text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_date_idx on reservations (date);
create index if not exists reservations_status_idx on reservations (status);
