# Azzurro — propuesta de diseño

Propuesta conceptual de experiencia digital para **Azzurro**, restaurante
italiano. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer
Motion.

> **Esto es una propuesta de diseño**, no la web final del restaurante. No
> contiene datos reales del negocio (dirección, teléfono, horario, carta,
> reseñas, historia): cada uno de esos huecos está marcado explícitamente
> como pendiente en el código (ver más abajo) y debe sustituirse por
> información real antes de publicar.

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
    constants.ts              # datos del restaurante — hoy, todo marcador de posición
    reservations.ts           # capa de reservas, ver más abajo
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
  espera de fotografía real del local — usar stock ahí sería engañoso.
- **Vídeo**: el hero está preparado para un vídeo institucional real
  (`VideoBackground.tsx`, prop `src`). Sin vídeo, se genera un fondo
  cinematográfico animado en su lugar.

## Reservas — arquitectura pensada para crecer

El formulario de reservas (`src/components/Reservas.tsx`) llama a
`POST /api/reservations`, que delega en `src/lib/reservations.ts`. Ese
archivo es el único punto que hay que tocar para conectar servicios
reales, sin cambiar el formulario:

- **NovaCore Reserve**: sustituir el cuerpo de `createReservation()` por
  la llamada a su API (variables `NOVACORE_RESERVE_URL` /
  `NOVACORE_RESERVE_API_KEY` en `.env.local`, ver `.env.example`).
- **Bot IA por WhatsApp**: se dispararía desde NovaCore Reserve en cuanto
  se crea la reserva, sin tocar esta web.
- **Confirmaciones automáticas y recordatorios**: idem, orquestados por
  NovaCore Reserve una vez integrado.
- **Panel privado del restaurante**: leería las reservas desde el mismo
  proveedor en lugar de duplicar almacenamiento aquí.

Hoy, mientras no hay integración, cada solicitud se registra en el log del
servidor y el visitante ve una confirmación en pantalla.

## Pendiente de completar con datos reales

Todo lo siguiente es un marcador de posición explícito en el código —
nada se ha inventado:

- **Dirección, teléfono, horario**: `src/lib/constants.ts` → `RESTAURANT`.
  Mientras falten, la web muestra "pendiente de confirmar" en vez de un
  dato falso, y el mapa de Ubicación queda desactivado.
- **Carta**: `Especialidades` muestra solo categorías (Pizza, Pasta,
  Carnes, Pescados, Postres, Vinos) sin platos ni precios.
- **Reseñas**: sin testimonios inventados. La sección "Opiniones" queda
  lista para Google Places (`src/lib/reviews.ts`, `GOOGLE_PLACES_API_KEY`
  en `.env.example`) y mientras tanto muestra un estado de espera.
- **Instagram / Facebook**: enlaces vacíos con `TODO` en el footer.
- **Fotografía y vídeo real**: ver sección "Identidad visual" arriba.
- **Política de privacidad**: plantilla genérica, debe revisarla un
  profesional legal antes de publicar.

## Despliegue

Proyecto Next.js estándar, listo para desplegar en Vercel apuntando el
"Root Directory" a `azzurro/` dentro de este repositorio.
