-- NovaCore OS — esquema inicial
-- Filosofía: una única organización interna (no multi-tenant). Cualquier
-- usuario autenticado en el proyecto de Supabase es miembro del equipo y
-- tiene acceso completo a los datos de la empresa. La separación por
-- cliente/proyecto es de negocio, no de aislamiento de datos.

-- ============================================================================
-- EXTENSIONS
-- ============================================================================
create extension if not exists "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================
create type public.member_role as enum ('owner', 'admin', 'member');

create type public.client_status as enum ('potencial', 'activo', 'pausado', 'finalizado');

create type public.project_status as enum ('pendiente', 'en_desarrollo', 'revision', 'entregado', 'archivado');

create type public.budget_status as enum ('borrador', 'enviado', 'aceptado', 'rechazado');

create type public.invoice_status as enum ('borrador', 'pendiente', 'pagada', 'vencida', 'cancelada');

create type public.automation_status as enum ('activo', 'pausado', 'error');

create type public.task_status as enum ('pendiente', 'completada');

-- ============================================================================
-- PROFILES — extiende auth.users con datos de perfil del equipo interno
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '',
  avatar_url text,
  role public.member_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Miembros del equipo interno de NovaCore.';

-- Crea automáticamente un perfil cuando se registra un nuevo usuario.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- CLIENTES
-- ============================================================================
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null default '',
  email text,
  phone text,
  status public.client_status not null default 'potencial',
  plan text,
  notes text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.clients is 'Clientes de la agencia (empresas contratantes).';

-- ============================================================================
-- BIBLIOTECA — sectores y modelos reutilizables
-- ============================================================================
create table public.sectors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.sectors is 'Sectores de negocio de la biblioteca (Restaurantes, Clínicas, Hoteles...).';

create table public.library_models (
  id uuid primary key default gen_random_uuid(),
  sector_id uuid not null references public.sectors (id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  image_url text,
  features text[] not null default '{}',
  avg_build_time_days integer,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (sector_id, slug)
);

comment on table public.library_models is 'Modelos/plantillas de proyecto dentro de cada sector de la biblioteca.';

-- ============================================================================
-- PROYECTOS
-- ============================================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_id uuid not null references public.clients (id) on delete cascade,
  status public.project_status not null default 'pendiente',
  library_model_id uuid references public.library_models (id) on delete set null,
  owner_id uuid references public.profiles (id) on delete set null,
  start_date date,
  due_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.projects is 'Proyectos entregados a clientes. Un cliente puede tener varios proyectos.';

create index projects_client_id_idx on public.projects (client_id);
create index projects_status_idx on public.projects (status);

-- ============================================================================
-- PLANTILLAS — plantillas internas de proceso/documento (distinto de Biblioteca)
-- ============================================================================
create table public.template_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table public.templates (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.template_categories (id) on delete set null,
  name text not null,
  description text,
  content text not null default '',
  usage_count integer not null default 0,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

comment on table public.templates is 'Plantillas internas reutilizables (contratos, propuestas, checklists...).';

-- ============================================================================
-- PROMPTS
-- ============================================================================
create table public.prompt_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  sort_order integer not null default 0
);

create table public.prompts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.prompt_categories (id) on delete cascade,
  title text not null,
  content text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.prompts is 'Biblioteca de prompts de IA, organizados por categoría.';

create index prompts_category_id_idx on public.prompts (category_id);

-- ============================================================================
-- PRESUPUESTOS — estructura base, sin lógica de cálculo todavía
-- ============================================================================
create table public.budgets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients (id) on delete set null,
  project_id uuid references public.projects (id) on delete set null,
  title text not null,
  status public.budget_status not null default 'borrador',
  amount numeric(12, 2) not null default 0,
  currency text not null default 'EUR',
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.budgets is 'Presupuestos enviados a clientes. Estructura base sin lógica de generación.';

-- ============================================================================
-- FACTURACIÓN
-- ============================================================================
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  number text not null unique,
  status public.invoice_status not null default 'borrador',
  amount numeric(12, 2) not null default 0,
  currency text not null default 'EUR',
  issued_at date,
  due_at date,
  created_at timestamptz not null default now()
);

comment on table public.invoices is 'Facturas emitidas a clientes.';

-- ============================================================================
-- AUTOMATIZACIONES
-- ============================================================================
create table public.automations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status public.automation_status not null default 'activo',
  trigger_label text,
  action_label text,
  last_run_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.automations is 'Automatizaciones internas (Zapier/Make/webhooks/agentes IA).';

-- ============================================================================
-- REUNIONES Y TAREAS — alimentan el Dashboard
-- ============================================================================
create table public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_id uuid references public.clients (id) on delete set null,
  starts_at timestamptz not null,
  location text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status public.task_status not null default 'pendiente',
  due_date date not null default current_date,
  assignee_id uuid references public.profiles (id) on delete set null,
  project_id uuid references public.projects (id) on delete set null,
  created_at timestamptz not null default now()
);

create index meetings_starts_at_idx on public.meetings (starts_at);
create index tasks_due_date_idx on public.tasks (due_date);

-- ============================================================================
-- updated_at automático
-- ============================================================================
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.clients for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.projects for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.templates for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.prompts for each row execute procedure public.set_updated_at();
create trigger set_updated_at before update on public.budgets for each row execute procedure public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- Herramienta interna de un único equipo: cualquier usuario autenticado del
-- proyecto Supabase tiene acceso completo. El aislamiento real está a nivel
-- de proyecto Supabase, no de filas.
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.sectors enable row level security;
alter table public.library_models enable row level security;
alter table public.projects enable row level security;
alter table public.template_categories enable row level security;
alter table public.templates enable row level security;
alter table public.prompt_categories enable row level security;
alter table public.prompts enable row level security;
alter table public.budgets enable row level security;
alter table public.invoices enable row level security;
alter table public.automations enable row level security;
alter table public.meetings enable row level security;
alter table public.tasks enable row level security;

create policy "Team members can read profiles" on public.profiles for select to authenticated using (true);
create policy "Team members can update their own profile" on public.profiles for update to authenticated using (auth.uid() = id);

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'clients', 'sectors', 'library_models', 'projects',
      'template_categories', 'templates', 'prompt_categories', 'prompts',
      'budgets', 'invoices', 'automations', 'meetings', 'tasks'
    ])
  loop
    execute format(
      'create policy "Team members full access" on public.%I for all to authenticated using (true) with check (true);',
      t
    );
  end loop;
end $$;
