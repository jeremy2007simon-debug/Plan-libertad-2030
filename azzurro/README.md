# Azzurro — propuesta de diseño

Propuesta conceptual de experiencia digital para **Restaurante Azzurro**
(Las Chafiras, San Miguel de Abona, Tenerife). Next.js 16 (App Router) +
TypeScript + Tailwind CSS v4 + Framer Motion.

> **Esto sigue siendo una propuesta de diseño**, no la web final conectada
> a servicios reales. Dirección, teléfono y Facebook son información
> pública verificada; el horario es provisional (ver más abajo) y la
> carta, las fotos y las integraciones de reservas están parcialmente
> completadas — el resto queda marcado explícitamente en el código.

Desplegada en Vercel como proyecto independiente, con "Root Directory"
apuntando a esta carpeta (`azzurro`).

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run lint    # ESLint
```

## Estructura

```
db/
  schema.sql                # esquema de referencia de la tabla `reservations`
src/
  app/
    page.tsx                # ensambla todas las secciones
    layout.tsx               # fuentes, metadata SEO global
    api/reservations/        # API route del formulario de reservas
    privacidad/               # política de privacidad (plantilla, revisar legalmente)
    sitemap.ts, robots.ts
  components/                 # una sección de la web por componente
    ui/                       # primitivas: Reveal, GlassCard, PlaceholderPanel, Icon...
  lib/
    constants.ts              # datos del restaurante (RESTAURANT, SPECIALTIES, AGGREGATE_REVIEWS...)
    site.ts                   # URL pública del sitio (NEXT_PUBLIC_SITE_URL)
    reservations/              # capa de reservas, ver más abajo
      store.ts                 # "base de datos" (hoy: en memoria)
      notify.ts                # notificación por correo (hoy: sin proveedor configurado)
      index.ts                 # orquestador createReservation()
    reviews.ts                # integración con Google Places (opcional)
  types/
```

## Identidad visual

- **Tipografía**: Bodoni Moda (display, editorial) + Inter (interfaz).
- **Color**: negro y grafito como base, blanco roto para el texto, dorado
  muy contenido como acento, un vino/burdeos apenas insinuado en
  degradados y sombras. Sin colores italianos literales (verde/rojo).
- **Superficies**: glassmorphism sutil (`glass-panel` en `globals.css`),
  glow muy suave, nunca saturado.
- **Fotografía**: sin fotos de stock. Todos los huecos de imagen usan
  `PlaceholderPanel` (degradado de marca + grano + monograma "A"), a la
  espera de fotografía oficial del local — usar stock ahí sería engañoso.
- **Vídeo**: el hero está preparado para un vídeo institucional real
  (`VideoBackground.tsx`, prop `src`). Sin vídeo, se genera un fondo
  cinematográfico animado en su lugar.

## Reservas — arquitectura pensada para crecer

El formulario de reservas (`src/components/Reservas.tsx`) llama a
`POST /api/reservations`, que delega en `src/lib/reservations/index.ts`.
Hoy el pipeline es:

```
Formulario → API → Base de datos (memoria) → Notificación por correo → Panel del restaurante (no implementado)
```

Cada solicitud se guarda (en memoria, ver `store.ts`) y se intenta
notificar por correo (`notify.ts`, sin efecto hasta configurar
`RESERVATION_NOTIFICATION_EMAIL`); el visitante ve una confirmación en
pantalla. El esquema de referencia de la tabla `reservations` está en
`db/schema.sql`, listo para conectar una base de datos real.

Puntos de conexión futuros, sin tocar el formulario:

- **Base de datos real** (Postgres/Supabase/etc.): sustituir
  `store.ts` por consultas reales (`DATABASE_URL` en `.env.local`).
- **Notificación por correo**: elegir proveedor (Resend, SMTP...) y
  completar `notify.ts` (`RESERVATION_NOTIFICATION_EMAIL` en
  `.env.example`).
- **NovaCore Reserve**: sustituir el cuerpo de `createReservation()` en
  `index.ts` por la llamada a su API (`NOVACORE_RESERVE_URL` /
  `NOVACORE_RESERVE_API_KEY`). Con NovaCore Reserve conectado, este
  pipeline entero podría delegar directamente en su API.
- **Bot IA por WhatsApp** y **confirmaciones/recordatorios
  automáticos**: se dispararían desde NovaCore Reserve en cuanto se crea
  la reserva, sin tocar esta web.
- **Panel privado del restaurante**: no implementado todavía. Cuando se
  desarrolle, viviría en una ruta protegida (p. ej. `src/app/panel/`, con
  autenticación) y leería las reservas desde la base de datos real (o
  desde NovaCore Reserve) en vez de duplicar almacenamiento.

## Reseñas

La sección "Opiniones" muestra la valoración agregada verificada en
Tripadvisor (`AGGREGATE_REVIEWS` en `src/lib/constants.ts`: nota y número
de opiniones, con enlace a Tripadvisor) — sin testimonios individuales
inventados. Si en el futuro se activa Google Places
(`GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` en `.env.example`), esa
integración pasa a tener prioridad y muestra reseñas individuales reales
de Google.

## Pendiente de completar

- **Horario**: las fuentes públicas no coinciden. Se usa un horario
  provisional (`RESTAURANT.hours` en `src/lib/constants.ts`, con
  `provisional: true` y una nota visible en la sección Ubicación) —
  **pendiente de confirmación directa con el restaurante**.
- **Instagram**: sin cuenta oficial confirmada. El botón queda oculto
  (`RESTAURANT.social.instagram`); en cuanto se confirme una cuenta,
  añadir la URL ahí y el botón aparece automáticamente.
- **Carta**: solo "Entrantes" tiene platos y precios reales. El resto de
  categorías (Pasta, Pizza, Carnes, Pescados, Arroces, Postres, Vinos,
  Bebidas) están creadas y preparadas, a la espera de la carta oficial
  completa (`SPECIALTIES` en `src/lib/constants.ts`).
- **Fotografía y vídeo real**: ver "Identidad visual" arriba.
- **Reservas**: ver arquitectura arriba — nada conectado todavía a un
  proveedor real.
- **Dominio real**: sin `NEXT_PUBLIC_SITE_URL` configurada, metadata,
  sitemap y robots usan `http://localhost:3000` (ver `src/lib/site.ts`).
  Define la variable en Vercel en cuanto haya un dominio real.
- **Política de privacidad**: plantilla genérica, debe revisarla un
  profesional legal antes de publicar.

## Despliegue

Proyecto Next.js estándar, listo para desplegar en Vercel apuntando el
"Root Directory" a `azzurro/` dentro de este repositorio.
