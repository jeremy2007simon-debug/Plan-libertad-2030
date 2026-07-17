# El Mexicano de Guargacho — web

Web premium de El Mexicano de Guargacho (San Miguel de Abona, Tenerife).
Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

Este proyecto reutiliza la arquitectura del proyecto hermano
(`amigos-del-norte/`): misma estructura, mismos componentes reutilizables
y misma calidad de código, evolucionada visualmente hacia una experiencia
gastronómica mexicana premium — sin clichés folclóricos (nada de
sombreros, cactus ni banderas), con paleta clara de identidad mexicana
tipo "hacienda elegante" (arena, blanco roto, terracota, verde oliva muy
sutil, y un rojo oscuro elegante reservado a las llamadas a la acción) y
una sección adicional ("Experiencia") centrada en las emociones de la
mesa, no en los platos.

El Hero es la única sección que se mantiene siempre oscura (foto +
overlay), a propósito — usa los tonos fijos `--carbon`/`--cream` de
`globals.css` en vez de `--bg`/`--ink`, para no depender de la paleta
clara/oscura del resto de la web (ver comentario en `Hero.tsx`).

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
    i18n/                   # diccionarios es/en — ver "Idiomas" más abajo
  types/
```

## Idiomas (i18n)

Selector de idioma (🇪🇸/🇬🇧) arriba a la derecha del header — cambia todo el
contenido de la página al instante, sin recargar. Español es el idioma por
defecto en cada visita (sin persistencia entre sesiones).

- `src/lib/i18n/es.ts` — diccionario fuente de verdad (define la forma de
  `Translations`, ver `types.ts`). Incluye también el contenido de la carta
  (`especialidades.categories`) y de la galería (`galeria.items`), para que
  se traduzcan junto con el resto de textos.
- `src/lib/i18n/en.ts` — traducción al inglés; tipado como `Translations`,
  así que si falta una clave o cambia la firma de una función el build
  falla en TypeScript.
- `src/components/i18n/LanguageProvider.tsx` — contexto React
  (`useT()` / `useLanguage()`) que expone el diccionario activo. Los
  componentes que muestran texto son Client Components por este motivo.
- `src/components/i18n/LanguageSwitcher.tsx` — los dos botones de bandera.

**Añadir un idioma nuevo**: crear `src/lib/i18n/<locale>.ts` tipado como
`Translations`, registrarlo en `dictionaries` (`src/lib/i18n/config.ts`) y
añadir su bandera/etiqueta en `LOCALE_META` (`LanguageSwitcher.tsx`).

Las reseñas de Google (`GoogleReviews.tsx`) no se traducen — son contenido
real de terceros, no copy de la web; solo se traducen los títulos que las
envuelven. La política de privacidad (`/privacidad`) tampoco se traduce
(plantilla legal genérica, ver más abajo).

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

El formulario de reservas (`src/components/Reservas.tsx`, incluye email
opcional además de nombre/teléfono/personas/fecha/hora/comentarios) llama
a `POST /api/reservations`, que a su vez delega en
`src/lib/reservations.ts`. Ese archivo es el único punto que hay que tocar
para conectar servicios reales, sin cambiar el formulario. Rutas de
integración previstas (no excluyentes entre sí):

- **API (NovaCore Reserve)**: sustituir el cuerpo de `createReservation()`
  por la llamada a su API (variables `NOVACORE_RESERVE_URL` /
  `NOVACORE_RESERVE_API_KEY` en `.env.local`, ver `.env.example`). NovaCore
  puede a su vez disparar confirmación y recordatorios por WhatsApp.
- **Base de datos**: tabla `reservations` con columnas `id`, `name`,
  `phone`, `email`, `date`, `time`, `people`, `comments`, `status`,
  `created_at`, y estados `pending` / `confirmed` / `cancelled` /
  `completed` — tipada ya en `src/types/reservation.ts`
  (`ReservationStatus`, `StoredReservation`; `guests` en el código
  corresponde a la columna `people`).
- **Email**: confirmación al cliente (si dejó su email) y aviso al
  restaurante tras crear la reserva.
- **Panel privado del restaurante**: leería las reservas desde la base de
  datos o desde NovaCore, sin duplicar almacenamiento en esta web.

Hoy, mientras no hay integración, cada solicitud se registra en el log del
servidor (con `id`, `status: "pending"` y `createdAt`) y el visitante ve
una confirmación en pantalla. También se ofrece un enlace directo de
WhatsApp y el teléfono como vía inmediata.

## Reseñas (Google Places)

`src/lib/reviews.ts` ya usa `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID`
(ver `.env.example`). `Opiniones.tsx` (`src/components/Opiniones.tsx`) es
un Server Component que solo llama a `getGoogleReviews()` y decide qué
renderizar. Si no hay integración activa, renderiza
`OpinionesPlaceholder.tsx` (Client Component, necesita `useT()`): una
sección premium con solo la valoración agregada pública (`REVIEWS_SUMMARY`
en `src/lib/constants.ts` — dato real, `rating` y `count`, no reseñas
individuales inventadas), un indicador "Conectando reseñas verificadas…" y
un botón "Ver opiniones". En cuanto `GOOGLE_PLACES_API_KEY` esté
configurada y `getGoogleReviews()` devuelva datos, `Opiniones.tsx` delega
automáticamente en `src/components/GoogleReviews.tsx` (mismo
`id="opiniones"`, sin más cambios) para mostrar las reseñas reales de
Google. Actualizar `REVIEWS_SUMMARY` si la valoración o el número de
opiniones cambian mientras tanto — la frase que lo envuelve
("Más de N opiniones verificadas" / "Over N verified reviews") vive en
`src/lib/i18n/{es,en}.ts` (`opiniones.countLabel`).

## Pendiente de confirmar con el restaurante

- **Horario** — ⚠️ procede de fuentes públicas, **no confirmado
  directamente por el restaurante**. Validar antes de publicar y
  actualizar `RESTAURANT.hoursSpec` (`src/lib/constants.ts`) junto con
  `ubicacion.hoursText` en **ambos** `src/lib/i18n/{es,en}.ts` (y quitar el
  aviso de "pendiente de confirmación" en los comentarios).
- **Facebook**: se enlaza la página pública localizada — confirmar que la
  URL es la definitiva antes del despliegue.
- **Instagram**: cuenta oficial confirmada, `@el.mexicano.de.guargacho_` —
  enlazada en el footer (`RESTAURANT.social.instagram`).
- **TikTok**: cuenta oficial confirmada, `@mexicanodeguargacho` —
  enlazada en el footer (`RESTAURANT.social.tiktok`).
- **WhatsApp**: se usa el teléfono publicado (922 73 13 13, fijo). Un
  `wa.me` solo funciona si ese número tiene WhatsApp Business activo —
  confirmarlo o sustituirlo por el móvil correcto en
  `RESTAURANT.whatsappHref`.
- **Carta**: `especialidades.categories` (`src/lib/i18n/es.ts` y `en.ts`)
  ya muestra platos y precios reales (Entrantes, Enchiladas, Postres)
  organizados en 8 categorías; Carnes, Especialidades y Bebidas siguen sin
  platos concretos verificados — añadir en ambos idiomas en cuanto se
  confirmen.
- **Fotografía y vídeo real**: hero e Historia siguen con foto de stock
  (ver `public/images/CREDITOS.md`); Galería sigue con `PlaceholderImage`.
  No existe vídeo oficial — el fondo del hero está preparado para
  sustituirse por `<video>` en cuanto haya material.
- **Logo**: el wordmark tipográfico se mantiene; el favicon
  (`src/app/icon.tsx`) es un monograma provisional a sustituir cuando el
  restaurante facilite su identidad visual.
- **Dominio**: `siteUrl` en `layout.tsx` / `sitemap.ts` / `robots.ts` usa
  `elmexicanodeguargacho.com` como placeholder — actualizar al dominio
  real antes de desplegar.
- **Política de privacidad**: es una plantilla genérica, debe revisarla un
  profesional legal antes de publicar.

## Despliegue

Proyecto Next.js estándar, listo para desplegar en Vercel apuntando el
"Root Directory" a `el-mexicano-de-guargacho/` dentro de este repositorio.
