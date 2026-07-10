# Restaurante Amigos del Norte — web

Web premium del Restaurante Amigos del Norte (Las Chafiras, San Miguel de
Abona, Tenerife). Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 +
Framer Motion.

Desplegada en Vercel como proyecto independiente, con "Root Directory"
apuntando a esta carpeta (`amigos-del-norte`).

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

## Fotografía

Todas las imágenes son marcadores de posición (`PlaceholderImage`,
`src/components/ui/PlaceholderImage.tsx`) a la espera de fotografía real.
Para sustituir una:

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

- **Horario**: no se ha facilitado, se muestra "consulta llamando" en su
  lugar (`src/lib/constants.ts` → `RESTAURANT.hours`).
- **Instagram / Facebook**: enlaces vacíos con `TODO` en el footer —
  añadir en `RESTAURANT.social`.
- **WhatsApp**: se usa el teléfono facilitado (922 73 56 19, fijo). Un
  `wa.me` solo funciona si ese número tiene WhatsApp Business activo —
  confirmarlo o sustituirlo por el móvil correcto en `RESTAURANT.whatsappHref`.
- **Reseñas de Google**: sección preparada con marcadores de posición, sin
  testimonios inventados — conectar la Google Places API cuando se quiera.
- **Fotografía real**: ver sección anterior.
- **Política de privacidad**: es una plantilla genérica, debe revisarla un
  profesional legal antes de publicar.

## Despliegue

Proyecto Next.js estándar, listo para desplegar en Vercel apuntando el
"Root Directory" a `amigos-del-norte/` dentro de este repositorio.
