# El Mexicano de Guargacho — web

Web premium de El Mexicano de Guargacho (San Miguel de Abona, Tenerife).
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

Este proyecto reutiliza la arquitectura del proyecto hermano
(`amigos-del-norte/`): misma estructura, mismos componentes reutilizables
y misma calidad de código, evolucionada visualmente hacia una experiencia
gastronómica mexicana premium — sin clichés folclóricos, con paleta
oscura (negro, grafito, arena, rojo vino, dorado, verde oliva sutil) y
una sección adicional ("Experiencia") centrada en las emociones de la
mesa, no en los platos.

Desplegada en Vercel como proyecto independiente, con "Root Directory"
apuntando a esta carpeta (`el-mexicano-de-guargacho`).

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
    page.tsx              # ensambla todas las secciones
    layout.tsx             # fuentes, metadata SEO global
    api/reservations/      # API route del formulario de reservas
    privacidad/             # política de privacidad (plantilla, revisar legalmente)
    sitemap.ts, robots.ts
  components/               # una sección de la web por componente
    ui/                     # primitivas: Button, Reveal, PlaceholderImage...
  lib/
    constants.ts            # datos reales del restaurante (nombre, teléfono, dirección...)
    reservations.ts         # capa de reservas — ver más abajo
  types/
```

## Fotografía y vídeo

El hero y "Nuestra historia" usan fotografía de stock provisional (ver
`public/images/CREDITOS.md`) — el hero está preparado para vídeo
cinematográfico: sustituir el `<Image>` de `Hero.tsx` por un `<video
autoPlay muted loop playsInline>` en cuanto haya material real.

El resto de huecos de interior/fachada (`Galeria.tsx`) usan
`PlaceholderImage` (`src/components/ui/PlaceholderImage.tsx`) a la espera
de fotografía real del local. Para sustituir una:

1. Añade el archivo a `public/images/`.
2. Reemplaza el `<PlaceholderImage label="..." />` correspondiente por
   `<Image src="/images/archivo.jpg" alt="..." fill className="object-cover" />`
   de `next/image`.

## Reservas — arquitectura pensada para crecer

El formulario de reservas (`src/components/Reservas.tsx`) llama a
`POST /api/reservations`, que a su vez delega en
`src/lib/reservations.ts`. Ese archivo es el único punto que hay que tocar
para conectar servicios reales, sin cambiar el formulario:

- **NovaCore Reserve**: sustituir el cuerpo de `createReservation()` por la
  llamada a su API (variables `NOVACORE_RESERVE_URL` /
  `NOVACORE_RESERVE_API_KEY` en `.env.local`, ver `.env.example`).
- **Bot de WhatsApp con IA**: puede dispararse desde NovaCore Reserve tras
  crear la reserva, sin tocar esta web.
- **Confirmación automática y recordatorios**: idem, orquestados por
  NovaCore Reserve una vez integrado.
- **Panel privado del restaurante**: leería las reservas desde el mismo
  proveedor en lugar de duplicar almacenamiento en esta web.

Hoy, mientras no hay integración, cada solicitud se registra en el log del
servidor y el visitante ve una confirmación en pantalla. También se ofrece
un enlace directo de WhatsApp y el teléfono como vía inmediata.

## Pendiente de completar con datos reales del restaurante

- **Instagram**: enlace vacío con `TODO` en el footer — añadir en
  `RESTAURANT.social.instagram` en cuanto se confirme.
- **Horario**: recopilado de fuentes públicas (Google Business,
  directorios) — confirmar con el restaurante y actualizar
  `RESTAURANT.hours` / `RESTAURANT.hoursSpec` en `src/lib/constants.ts`.
- **WhatsApp**: se usa el teléfono publicado (922 73 13 13, fijo). Un
  `wa.me` solo funciona si ese número tiene WhatsApp Business activo —
  confirmarlo o sustituirlo por el móvil correcto en `RESTAURANT.whatsappHref`.
- **Reseñas**: no hay reseñas curadas todavía (`CURATED_REVIEWS` vacío a
  propósito, para no inventar texto de clientes). Si se activa la Google
  Places API (`src/lib/reviews.ts`), la sección "Opiniones" las mostrará
  automáticamente; si el restaurante facilita capturas reales, se pueden
  transcribir en `CURATED_REVIEWS` como respaldo.
- **Fotografía y vídeo real**: ver sección anterior.
- **Especialidades**: tarjetas visuales sin precios ni platos concretos —
  añadir la carta real y, si se desea, enlazar una carta digital en
  `Especialidades.tsx`.
- **Política de privacidad**: es una plantilla genérica, debe revisarla un
  profesional legal antes de publicar.

## Despliegue

Proyecto Next.js estándar, listo para desplegar en Vercel apuntando el
"Root Directory" a `el-mexicano-de-guargacho/` dentro de este repositorio.
