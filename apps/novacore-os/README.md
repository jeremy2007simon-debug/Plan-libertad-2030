# NovaCore OS

El sistema operativo interno de NovaCore: clientes, proyectos, biblioteca de
modelos, prompts, presupuestos, automatizaciones, facturación y reportes en
un solo lugar.

## Stack

- **Frontend/Backend**: Next.js 16 (App Router, Turbopack)
- **UI**: Tailwind CSS v4, shadcn/ui, Lucide Icons, Framer Motion, Recharts
- **Base de datos y Auth**: Supabase (PostgreSQL + Supabase Auth vía `@supabase/ssr`)
- **Validación y formularios**: Zod + React Hook Form
- **Despliegue**: Vercel

## Arquitectura

```
app/
  login/                 Página de login (pública)
  auth/confirm/           Verificación de enlaces mágicos / OTP de Supabase
  (app)/                  Grupo de rutas protegido (requiere sesión)
    layout.tsx            Shell: Sidebar + Topbar
    dashboard/
    clientes/
    proyectos/
    biblioteca/[slug]/
    plantillas/
    prompts/
    presupuestos/
    automatizaciones/
    facturacion/
    reportes/
    configuracion/
components/
  ui/                     Primitivos shadcn/ui
  layout/                 Sidebar, Topbar, menú de usuario, command menu
  shared/                 PageHeader, StatCard, EmptyState, StatusBadge...
  features/<módulo>/      Componentes específicos de cada módulo
lib/
  supabase/               Clientes de Supabase (browser, server, proxy)
  types/database.types.ts Tipos generados a partir del esquema SQL
  validations/            Esquemas Zod por entidad
  actions/                Server Actions (mutaciones)
  data/                   Datos de ejemplo (Dashboard, Reportes)
supabase/
  migrations/             Esquema SQL versionado
  seed.sql                Datos de ejemplo para desarrollo local
proxy.ts                  Refresco de sesión y protección de rutas (Next.js 16
                          renombró `middleware.ts` a `proxy.ts`)
```

La regla de oro: **añadir un módulo nuevo no debería requerir tocar el shell,
el esquema de auth ni los componentes compartidos** — solo una carpeta nueva
en `app/(app)/`, `components/features/` y, si aplica, una tabla en
`supabase/migrations/`.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
# Rellena .env.local con las claves de tu proyecto Supabase
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Sin un proyecto Supabase real conectado, las pantallas que dependen de datos
en vivo (Clientes, Proyectos, Biblioteca, Prompts, Plantillas, Presupuestos,
Facturación, Automatizaciones) mostrarán un aviso de conexión en lugar de
fallar — el Dashboard y Reportes siguen funcionando con datos de ejemplo.

### Base de datos

En **Supabase → SQL Editor**, ejecuta en orden:

1. `supabase/migrations/0001_init_schema.sql`
2. `supabase/seed.sql` (opcional, datos de ejemplo para desarrollo)

En **Authentication → Providers**, activa Email/Password y crea al menos un
usuario de equipo (se le creará un `profile` automáticamente vía trigger).

## Desarrollo

```bash
npm run dev     # servidor de desarrollo (Turbopack)
npm run lint    # ESLint
npm run build   # build de producción + type-check
```
