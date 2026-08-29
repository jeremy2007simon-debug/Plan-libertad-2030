# Maisha Quest

Web prémium de **Maisha Quest**, operador de safaris privados con sede en
Arusha, Tanzania.

> Private journeys through Tanzania.
> Guided by local experts. Designed around your story.

Proyecto independiente dentro de este repositorio, como `amigos-del-norte/`.
No comparte código ni despliegue con la landing de NovaCore de la raíz.

## Ejecutar

```bash
cd maisha-quest
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm run start   # producción
npm run lint                     # ESLint
npm run typecheck                # TypeScript
```

Requiere Node 20 o superior. Sin variables de entorno la web funciona entera;
solo el envío del formulario queda desactivado a propósito (ver más abajo).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS 4.

Sin librería de animación, sin proveedor de mapas, sin librería de iconos y sin
gestor de estado. Todo eso está resuelto con CSS, SVG y componentes de
servidor: solo tres componentes envían JavaScript al navegador (el mapa, el
carrusel y el planificador).

## Estructura

```
src/
  app/             Rutas (App Router) + sitemap, robots y el endpoint del formulario
  components/
    home/          Las trece secciones de la portada
    layout/        Cabecera, menú móvil, pie, barra de acción y cabecera interior
    safari/        Tarjeta, itinerario y mapa de ruta — reutilizados en varias páginas
    planner/       Planificador por pasos
    ui/            Primitivas: botón, contenedor, brújula, foto, carrusel, vídeo
    seo/           Datos estructurados schema.org
  data/            ÚNICA FUENTE DE CONTENIDO
  lib/             Acceso a datos, configuración del sitio, mapa y planificador
  types/           Modelos TypeScript
```

### La fuente única de datos

Ningún componente escribe a mano el nombre de un safari, una duración o una
ruta: todo sale de `src/data/*` a través de `src/lib/content.ts`. Esa capa es
`async` desde el principio para que conectar Supabase o un CMS solo suponga
cambiar el cuerpo de sus funciones, sin tocar un componente.

`content.ts` valida además la coherencia **en tiempo de compilación**: si un
safari declara siete días y trae un itinerario de seis, o apunta a un destino
que no existe, `npm run build` falla. Es la respuesta directa al problema de la
web actual, donde nombres, rutas y duraciones se contradicen entre páginas.

## Qué es real y qué está pendiente

La web no inventa nada sobre el negocio. Lo verificable se publica; lo demás
espera, y se nota que espera.

**Real:** teléfono, email, horario, zona horaria, sede, redes sociales, los
nombres y los idiomas del equipo, la geografía de Tanzania (parques,
coordenadas, temporadas y fauna) y la silueta del mapa (Natural Earth).

**Pendiente, y marcado como tal en el código:**

| Qué falta | Dónde se rellena |
| --- | --- |
| Precios reales | `price` en `src/data/safaris.ts`. Sin ellos la ficha dice "Price on request", nunca una cifra. |
| Itinerarios validados | Los siete safaris llevan `draft: true`; la interfaz muestra el sello "Sample itinerary" y desaparece solo al quitar la marca. |
| Testimonios | `src/data/testimonials.ts` está vacío **a propósito**. La sección detecta el vacío y muestra un estado alternativo honesto. |
| Cifras de impacto | `outcomes` vacío en cada proyecto de `src/data/impact.ts`. |
| Licencias y acreditaciones | `TRUST_CREDENTIALS` en `src/lib/site.ts`. La franja no se pinta si está vacío. |
| Autoría de la fotografía del cliente | El uso comercial está confirmado por escrito (29/08/2026); la autoría no. La web no nombra a ningún autor. Ver la sección siguiente. |
| Fotografía de relleno | 22 fotos documentales de Wikimedia Commons cubren los huecos que las 22 del cliente no alcanzan. Ver `public/images/CREDITS.md`. |
| Los dos vídeos | Ver `public/video/README.md`. Uno está entregado y revisado, y **bloqueado por consentimiento de menores**; el otro no se ha entregado. Ninguno se publica. |
| Textos legales | Borrador. Salen con `noindex, nofollow` y fuera del sitemap. Lo que hace falta para cerrarlos está en el cuadro de abajo. |
| Envío del formulario | `JOURNEY_REQUEST_WEBHOOK` sin configurar. Comprobado, no deducido: `GET /api/journey-requests` responde `{"configured": false}`. Sin él el formulario responde 501, lo dice y ofrece correo y WhatsApp. |

## Production launch — client information required

Lo que falta para poder decir `READY FOR PRODUCTION`. Cada punto lo tiene que
facilitar el cliente o su asesor jurídico: **nada de esto se inventa ni se
rellena con un valor razonable**. Un número de licencia inventado en unas
condiciones de venta es un problema legal, no un detalle de maqueta.

Mientras la casilla siga sin marcar, la web se entrega como
`PREVIEW READY — PRODUCTION BLOCKED`.

### Identidad de la empresa

- [ ] **Razón social** — nombre legal completo de la sociedad
- [ ] **Nombre comercial** — hoy se publica «Maisha Quest»; confirmar que es el correcto
- [ ] **Número de registro mercantil** — identificación de la sociedad
- [ ] **Licencia de operador turístico** — TALA, TATO u otras, con número y vigencia
- [ ] **Asociaciones oficiales** — TATO, ATTA, KPAP u otras, y desde cuándo
- [ ] **Domicilio legal** — hoy solo consta «Arusha, Tanzania»
- [ ] **Correo jurídico** — canal de reclamaciones; hoy solo hay `info@`

### Protección de datos

- [ ] **Responsable del tratamiento** — quién responde legalmente de los datos
- [ ] **Proveedores que procesan datos** — CRM, correo, alojamiento, analítica
- [ ] **Política de conservación** — cuánto se guarda cada dato y por qué
- [ ] **Bases jurídicas** — por qué es lícito tratar cada dato
- [ ] **Países donde se procesan** — transferencias internacionales

### Condiciones de venta

- [ ] **Condiciones de depósito y saldo** — importes, plazos y forma de pago
- [ ] **Cancelaciones y reembolsos** — plazos, penalizaciones y qué se devuelve
- [ ] **Cambios de reserva** — qué se puede cambiar, con qué antelación y coste
- [ ] **Fuerza mayor** — qué ocurre ante causas ajenas a las partes
- [ ] **Seguro obligatorio** — cobertura exigida al viajero y cobertura propia
- [ ] **Responsabilidad** — límites y exclusiones
- [ ] **Ley y jurisdicción aplicables** — dónde se resuelve un conflicto
- [ ] **Política sobre menores** — edad mínima, acompañamiento, consentimiento de imagen
- [ ] **Cookies y analítica realmente usadas** — hoy la web no instala ninguna

### Aprobación

- [ ] **Texto aprobado por asesor jurídico** — los tres documentos, en su versión final

Dónde se escribe cada respuesta: `legal.terms.sections` y
`legal.privacy.sections` en los seis `src/i18n/messages/*.ts`;
`TRUST_CREDENTIALS` y `COMPANY` en `src/lib/site.ts`. Los textos se traducen a
los seis idiomas sin cambiar su significado legal.

### Fuera de los legales, con la misma condición de bloqueo

- [x] **Derechos comerciales de las 19 fotografías publicadas** — confirmados
      por escrito el 29/08/2026: «Confirmo que Maisha Quest dispone de
      autorización para utilizar comercialmente en su página web las
      fotografías entregadas.» La declaración va copiada, con su fecha, en cada
      entrada de `src/data/client-photography.ts`.
      `MAISHA_QUEST_PRODUCTION=1 npm run build` ya la da por buena.
- [ ] **Autoría de esas 19 fotografías** — no consta ninguna, y autorizar el uso
      no es declarar la autoría. Hasta que conste, la web no nombra a ningún
      autor ni afirma que las tomara Maisha Quest.
- [ ] **Autor y crédito de la leona con crías** (`image-X4-18.jpg`) — lleva la
      marca de agua de un tercero. No se publica hasta saber quién es y con qué
      texto acreditarlo, o hasta tener una copia sin marca.
- [ ] **`JOURNEY_REQUEST_WEBHOOK`** — sin configurar. Comprobado, no deducido:
      `GET /api/journey-requests` responde `{"configured": false}`.
- [ ] **Autorización de los menores del vídeo entregado** — el archivo
      `WhatsApp Video 2026-08-27 at 16.07.30 (1).mp4` se entregó el 29/08 y está
      revisado: 41 s, vertical, con **un aula de menores identificables y una
      adulta identificable**. No se publica sin autorización escrita de tutores,
      centro y de la adulta, y **no se ha añadido al repositorio**, que es
      público. Ver `public/video/README.md`.
- [ ] **El segundo vídeo** — `WhatsApp Video 2026-08-27 at 16.07.30.mp4` sigue
      sin entregarse.

## Las 22 fotografías entregadas por el cliente

Generada con `node scripts/report-client-photos.mjs --markdown`. La tabla NO se
escribe a mano: el script contrasta los archivos que hay en `originals/`, las
entradas publicadas y las excluidas, y se queja si no cuadran. **22 entregadas
= 19 publicadas + 3 excluidas.**

| # | Archivo original | Nombre web | Estado | Uso | Derechos comerciales | Motivo de exclusión |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `x-X4.jpg` | `tanzania-wildlife-sunset-hero` | Publicada | 1 sitio · 2000×1125 | Confirmados | — |
| 2 | `image-X4.jpg` | `antelope-herd-grasslands` | Publicada | 3 sitios · 2000×1090 | Confirmados | — |
| 3 | `image-X4-13.jpg` | `elephant-herd-protecting-calf` | Publicada | 1 sitio · 2000×1384 | Confirmados | — |
| 4 | `image-X4-14.jpg` | `african-elephant-portrait` | Publicada | 1 sitio · 1400×1750 | Confirmados | — |
| 5 | `image-X4-15.jpg` | `elephant-family-walking` | Publicada | 2 sitios · 2000×1601 | Confirmados | — |
| 6 | `image-X4-16.jpg` | `savannah-acacia-sunset` | Publicada | 1 sitio · 2000×1334 | Confirmados | — |
| 7 | `image-X4-17.jpg` | `lion-pair-calling` | Publicada | 1 sitio · 1600×1600 | Confirmados | — |
| 8 | `image-X4-19.jpg` | `giraffe-oxpecker-birds` | Publicada | 1 sitio · 2000×1000 | Confirmados | — |
| 9 | `Canon-2098745.jpg` | `flamingo-taking-flight` | Publicada | 2 sitios · 2000×1333 | Confirmados | — |
| 10 | `image-X4-1.jpg` | `flamingos-tanzania-lake` | Publicada | 1 sitio · 2000×1333 | Confirmados | — |
| 11 | `image-X4-2.jpg` | `male-lions-together` | Publicada | 3 sitios · 2000×1335 | Confirmados | — |
| 12 | `image-X4-3.jpg` | `giraffes-open-savannah` | Publicada | 2 sitios · 2000×1500 | Confirmados | — |
| 13 | `image-X4-4.jpg` | `leopard-in-tree` | Publicada | 1 sitio · 1600×1600 | Confirmados | — |
| 14 | `image-X4-5.jpg` | `zebra-herd-monochrome` | Publicada | 2 sitios · 2000×1000 | Confirmados | — |
| 15 | `image-X4-6.jpg` | `lion-open-savannah` | Publicada | 1 sitio · 2000×1000 | Confirmados | — |
| 16 | `image-X4-7.jpg` | `giraffe-patterns-monochrome` | Publicada | 2 sitios · 2000×1126 | Confirmados | — |
| 17 | `image-X4-8.jpg` | `safari-tent-accommodation` | Publicada | 1 sitio · 2000×1320 | Confirmados | — |
| 18 | `image-X4-11.jpg` | `flamingo-low-flight` | Publicada | 1 sitio · 2000×1125 | Confirmados | — |
| 19 | `image-X4-12.jpg` | `flamingo-flock-in-motion` | Publicada | 2 sitios · 2000×1333 | Confirmados | — |
| 20 | `image-X4-18.jpg` | — | No publicada | Original conservado | Confirmados | Marca de agua de un tercero impresa en la imagen |
| 21 | `image-XL.jpg` | — | No publicada | Original conservado | Confirmados | Resolución por debajo del mínimo del diseño |
| 22 | `image-X4-9.jpg` | — | No publicada | Original conservado | Confirmados | Duplicado exacto de otro archivo entregado |

**Uso comercial: confirmado por escrito el 29/08/2026.** La declaración es:

> Confirmo que Maisha Quest dispone de autorización para utilizar comercialmente
> en su página web las fotografías entregadas.

Va copiada literalmente, con su fecha, en cada entrada de
`src/data/client-photography.ts` (`commercialUseSource` y
`commercialUseConfirmedAt`): un `true` sin origen no vale nada.
`MAISHA_QUEST_PRODUCTION=1 npm run build` ya pasa esta comprobación.

**Lo que esa declaración no dice: quién hizo las fotografías.** Autorizar el uso
no es declarar la autoría, así que `authorConfirmed` sigue en `false` en las 22
y la web no nombra a ningún autor. Por eso la página de créditos sigue sin decir
que sean «material propio de la empresa» —eso afirmaría una titularidad que no
consta— y dice:

> Fotografías suministradas por Maisha Quest. La titularidad, autoría y
> condiciones de uso se mantienen según la documentación facilitada por la
> empresa.

Cada entrada de `src/data/client-photography.ts` lleva seis campos de derechos:
`sourceFilename`, `publicationStatus`, `commercialUseConfirmed`,
`authorConfirmed`, `creditRequired` y `creditText`, más `locationConfirmed`,
`subjectConfirmed` y, desde la confirmación, `commercialUseSource` y
`commercialUseConfirmedAt`. Lo que no se sabe se declara `null` o `false`; no se
inventa ni un fotógrafo ni una licencia.

La leona con crías (`image-X4-18.jpg`) sigue sin publicarse aunque el uso
comercial esté confirmado: lleva impresa la marca de agua de un tercero, y eso
es otra pregunta —quién es y con qué texto hay que acreditarlo—. Su entrada
mantiene `creditRequired: true` con `creditText: null`, que bloquea la
publicación por sí solo. Se desbloquea con el nombre y el crédito exacto, o con
una copia sin marca.

## Detalle por archivo de los 22 originales

Complemento de la tabla de arriba: píxeles, peso y dónde se usa cada una.
Los originales se conservan intactos —mismo nombre, mismos bytes, misma
metadata— en `public/images/maisha-quest/originals/`. Nunca se sobrescriben
ni se comprimen.

| # | Original | Píxeles | Peso | Nombre semántico | Derivado web | Dónde se usa |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `x-X4.jpg` | 2048×1152 | 180 kB | `tanzania-wildlife-sunset-hero` | `tanzania-wildlife-sunset-hero.webp` · 2000×1125 · 36 kB | Home — hero |
| 2 | `image-X4.jpg` | 2048×1116 | 590 kB | `antelope-herd-grasslands` | `antelope-herd-grasslands.webp` · 2000×1090 · 211 kB | Experiencia *Walking safari* (tarjeta *Adventure* de la home) · Galería Tarangire · Galería *Serengeti & Zanzibar* |
| 3 | `image-XL.jpg` | 1024×656 | 60 kB | `flamingos-shallow-water` | — | **Reservada.** 1024 px de ancho: por debajo del mínimo de cualquier hueco. |
| 4 | `image-X4-13.jpg` | 2048×1417 | 1301 kB | `elephant-herd-protecting-calf` | `elephant-herd-protecting-calf.webp` · 2000×1384 · 684 kB | Experiencia *Family safari* (tarjeta *Family* de la home) |
| 5 | `image-X4-14.jpg` | 1638×2048 | 1174 kB | `african-elephant-portrait` | `african-elephant-portrait.webp` · 1400×1750 · 462 kB | Home — «*Maisha* means life» |
| 6 | `image-X4-15.jpg` | 2048×1639 | 1990 kB | `elephant-family-walking` | `elephant-family-walking.webp` · 2000×1601 · 1293 kB | Destino Tarangire — cabecera · Galería *Serengeti & Ngorongoro Journey* |
| 7 | `image-X4-16.jpg` | 2048×1366 | 840 kB | `savannah-acacia-sunset` | `savannah-acacia-sunset.webp` · 2000×1334 · 66 kB | Home — cierre |
| 8 | `image-X4-17.jpg` | 2048×2048 | 894 kB | `lion-pair-calling` | `lion-pair-calling.webp` · 1600×1600 · 221 kB | Galería *Serengeti & Ngorongoro Journey* |
| 9 | `image-X4-18.jpg` | 2048×1152 | 635 kB | `lioness-resting-with-cubs` | — | **Reservada.** Marca de agua de un tercero impresa en la imagen. |
| 10 | `image-X4-19.jpg` | 2048×1024 | 775 kB | `giraffe-oxpecker-birds` | `giraffe-oxpecker-birds.webp` · 2000×1000 · 312 kB | Home — colección *Enrich* |
| 11 | `Canon-2098745.jpg` | 2048×1365 | 490 kB | `flamingo-taking-flight` | `flamingo-taking-flight.webp` · 2000×1333 · 98 kB | Experiencia *Birdwatching* · Galería *Highlands & Communities* |
| 12 | `image-X4-1.jpg` | 2048×1365 | 493 kB | `flamingos-tanzania-lake` | `flamingos-tanzania-lake.webp` · 2000×1333 · 121 kB | Destino Lake Manyara — cabecera |
| 13 | `image-X4-2.jpg` | 2048×1367 | 889 kB | `male-lions-together` | `male-lions-together.webp` · 2000×1335 · 328 kB | Cabecera de /experiences · Galería Serengeti · Galería *Serengeti Under Canvas* |
| 14 | `image-X4-3.jpg` | 2048×1536 | 1151 kB | `giraffes-open-savannah` | `giraffes-open-savannah.webp` · 2000×1500 · 555 kB | Galería Tarangire · Galería *Serengeti & Ngorongoro Journey* |
| 15 | `image-X4-4.jpg` | 2048×2048 | 1334 kB | `leopard-in-tree` | `leopard-in-tree.webp` · 1600×1600 · 287 kB | Experiencia *Game drives* (y tarjeta *Wildlife* de la home) |
| 16 | `image-X4-5.jpg` | 2048×1024 | 701 kB | `zebra-herd-monochrome` | `zebra-herd-monochrome.webp` · 2000×1000 · 106 kB | Galería Serengeti · Galería *Tanzania in Depth* |
| 17 | `image-X4-6.jpg` | 2047×1024 | 686 kB | `lion-open-savannah` | `lion-open-savannah.webp` · 2000×1000 · 273 kB | Home — colección *Explorer* |
| 18 | `image-X4-7.jpg` | 2047×1152 | 1055 kB | `giraffe-patterns-monochrome` | `giraffe-patterns-monochrome.webp` · 2000×1126 · 560 kB | Home — «Your journey, in trusted hands» · Experiencia *Photographic safari* |
| 19 | `image-X4-8.jpg` | 2048×1352 | 860 kB | `safari-tent-accommodation` | `safari-tent-accommodation.webp` · 2000×1320 · 361 kB | Safari *Serengeti Under Canvas* — cabecera (y destacado en la home) |
| 20 | `image-X4-11.jpg` | 2048×1152 | 326 kB | `flamingo-low-flight` | `flamingo-low-flight.webp` · 2000×1125 · 53 kB | Journal — «In defence of the green season» |
| 21 | `image-X4-12.jpg` | 2048×1365 | 780 kB | `flamingo-flock-in-motion` | `flamingo-flock-in-motion.webp` · 2000×1333 · 208 kB | Home — planificador · Galería Lake Manyara |
| 22 | `image-X4-9.jpg` | 2048×1365 | 493 kB | — | — | **Duplicado exacto** de `image-X4-1.jpg` (mismo SHA-256). Original conservado, sin derivado propio. |

19 derivados publicados. Los originales correspondientes suman 16,1 MB; sus
derivados WebP, 6,1 MB. Los 22 originales completos ocupan 17,3 MB.

⚠️ La ruta `public/images/maisha-quest/originals/` es la pedida en el encargo,
pero todo lo que cuelga de `public/` lo sirve Next.js: los originales quedan
accesibles por URL directa. Ningún componente los enlaza y no aparecen en
sitemap ni en `srcset`, así que no se descargan al navegar, pero **conviene
sacarlos del despliegue —o moverlos fuera de `public/`— antes del lanzamiento**:
son los archivos de cámara completos, sin recortar y con su metadata, y no hay
ninguna razón para servirlos.

### Por qué hay derivados y no se sirven los originales

`next/image` optimiza en tiempo de ejecución, pero no resuelve tres cosas que
sí necesitábamos, y por eso el paso de generación existe:

1. **Los componentes no pueden depender de `image-X4-13.jpg`.** Un nombre así no
   dice nada y ata el diseño al orden en que llegó un ZIP. El derivado lleva
   nombre semántico; el original conserva el suyo.
2. **El LQIP en base64** de cada foto necesita un paso de build de todos modos.
3. **Peso servido:** 16,1 MB de JPEG frente a 6,1 MB de WebP. Lo que descarga
   un visitante sale siempre del derivado, nunca del original.

Sobre el derivado, `next/image` sigue haciendo su trabajo: `srcset`, `sizes` y
formato por navegador. No hay duplicación de esfuerzo, solo un paso previo.

Los derivados se generaron con `sharp`: `resize` a 2000 px de ancho máximo (1400
en vertical) **con `withoutEnlargement`** —ninguna imagen se amplía—, WebP
calidad 78, y metadata eliminada solo en la copia optimizada.

## El formulario no finge

`/api/journey-requests` responde **501** mientras no exista
`JOURNEY_REQUEST_WEBHOOK` (ver `.env.example`), y la interfaz lo dice: informa
de que la solicitud no se ha enviado y ofrece mandar el mismo resumen por email
o WhatsApp, ya redactado. Devolver un "gracias, te contactaremos" sin haber
entregado nada es el peor fallo posible en un formulario comercial.

El planificador guarda un borrador en `localStorage` en cada cambio, valida al
avanzar (no al teclear), mueve el foco al título de cada paso y filtra spam con
campo trampa y tiempo de cumplimentación, sin CAPTCHA.

## Rendimiento y accesibilidad

- Todas las secciones son componentes de servidor salvo las tres que necesitan
  estado.
- El revelado al hacer scroll es un `data-attribute` más un
  IntersectionObserver de quince líneas en el `<head>`. El HTML sale **visible**
  del servidor: la animación es un añadido, nunca un requisito para ver el
  contenido.
- Imágenes en WebP con `srcset`, `sizes` y un LQIP en base64 por imagen.
- Vídeo con carga diferida, póster, sin sonido, `playsInline` y reproducción
  solo mientras está en pantalla.
- `prefers-reduced-motion` desactiva todo el movimiento, incluido el revelado.
- HTML semántico, un solo `h1` por página, jerarquía de encabezados sin saltos,
  foco visible, áreas táctiles de 44 px, menú móvil con trampa de foco y
  `<details>` nativo para itinerarios y FAQ.

## Despliegue

Pensado para Vercel con **Root Directory = `maisha-quest`**, igual que
`amigos-del-norte` es un proyecto aparte. Añadir `JOURNEY_REQUEST_WEBHOOK` en
las variables de entorno para activar el formulario.
