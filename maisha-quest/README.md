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

- [x] **Derechos comerciales de las fotografías publicadas** — confirmados
      por escrito el 29/08/2026: «Confirmo que Maisha Quest dispone de
      autorización para utilizar comercialmente en su página web las
      fotografías entregadas.» La declaración va copiada, con su fecha, en cada
      entrada de `src/data/client-photography.ts`.
      `MAISHA_QUEST_PRODUCTION=1 npm run build` ya la da por buena.
- [ ] **Autoría de esas fotografías** — no consta ninguna, y autorizar el uso
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
= 17 publicadas + 5 excluidas.**

De las 19 que llegaron a publicarse, dos se han retirado en la ronda visual de
agosto por continuidad cromática: de las fotografías del cliente, cinco son en
blanco y negro, y las dos que convivían con fotografías en color rompían la
secuencia. No es un problema de derechos —el original sigue intacto— y volver a
publicarlas es cambiar una línea. Ver `docs/homepage-image-tone-audit.md`.

| # | Archivo original | Nombre web | Estado | Uso | Derechos comerciales | Motivo de exclusión |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `x-X4.jpg` | `tanzania-wildlife-sunset-hero` | Publicada | 1 sitio · 2000×1125 | Confirmados | — |
| 2 | `image-X4.jpg` | `antelope-herd-grasslands` | Publicada | 3 sitios · 2000×1090 | Confirmados | — |
| 3 | `image-X4-14.jpg` | `african-elephant-portrait` | Publicada | 1 sitio · 1400×1750 | Confirmados | — |
| 4 | `image-X4-15.jpg` | `elephant-family-walking` | Publicada | 2 sitios · 2000×1601 | Confirmados | — |
| 5 | `image-X4-16.jpg` | `savannah-acacia-sunset` | Publicada | 1 sitio · 2000×1334 | Confirmados | — |
| 6 | `image-X4-17.jpg` | `lion-pair-calling` | Publicada | 1 sitio · 1600×1600 | Confirmados | — |
| 7 | `image-X4-19.jpg` | `giraffe-oxpecker-birds` | Publicada | 1 sitio · 2000×1000 | Confirmados | — |
| 8 | `Canon-2098745.jpg` | `flamingo-taking-flight` | Publicada | 2 sitios · 2000×1333 | Confirmados | — |
| 9 | `image-X4-1.jpg` | `flamingos-tanzania-lake` | Publicada | 2 sitios · 2000×1333 | Confirmados | — |
| 10 | `image-X4-2.jpg` | `male-lions-together` | Publicada | 4 sitios · 2000×1335 | Confirmados | — |
| 11 | `image-X4-3.jpg` | `giraffes-open-savannah` | Publicada | 3 sitios · 2000×1500 | Confirmados | — |
| 12 | `image-X4-4.jpg` | `leopard-in-tree` | Publicada | 1 sitio · 1600×1600 | Confirmados | — |
| 13 | `image-X4-5.jpg` | `zebra-herd-monochrome` | Publicada | 2 sitios · 2000×1000 | Confirmados | — |
| 14 | `image-X4-6.jpg` | `lion-open-savannah` | Publicada | 1 sitio · 2000×1000 | Confirmados | — |
| 15 | `image-X4-8.jpg` | `safari-tent-accommodation` | Publicada | 1 sitio · 2000×1320 | Confirmados | — |
| 16 | `image-X4-11.jpg` | `flamingo-low-flight` | Publicada | 1 sitio · 2000×1125 | Confirmados | — |
| 17 | `image-X4-12.jpg` | `flamingo-flock-in-motion` | Publicada | 2 sitios · 2000×1333 | Confirmados | — |
| 18 | `image-X4-13.jpg` | — | No publicada | Original conservado | Confirmados | Blanco y negro: rompía la continuidad cromática |
| 19 | `image-X4-7.jpg` | — | No publicada | Original conservado | Confirmados | Blanco y negro: rompía la continuidad cromática |
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

## Migración de contenido desde Wix (Fase 2)

Rama de trabajo: `claude/maisha-quest-wix-migration-2`, creada a partir de la
rama con el diseño premium ya terminado. **No toca producción, Vercel, el
dominio ni el DNS**; es contenido y documentación, verificado en cada paso con
`tsc`, `eslint` y `build`.

maishaquest.com (Wix) es la única fuente para todo lo que sigue. Donde el
sitio real no publica un dato, el código lo deja en `null`/pendiente en vez de
inventarlo — el mismo principio que ya regía el resto de la web.

### Los 18 paquetes reales de safari

Sustituyen a los 7 de demostración, conservados sin usarse en
`src/data/structure/safaris.legacy.ts`. Precio siempre "bajo consulta"
(ningún paquete de Wix publica precio) y los siete itinerarios llevan
`draft: true` con el sello "Sample itinerary" hasta validarlos con el cliente.

**Explorer — camping (6)**

| Slug | Días |
| --- | --- |
| `manyara-ngorongoro-safari` | 2 |
| `tarangire-manyara-ngorongoro-safari` | 3 |
| `serengeti-ngorongoro-manyara-safari` | 4 |
| `northern-circuit-camping-safari` | 5 |
| `six-day-camping-safari` | 6 — ver nota abajo |
| `extended-camping-safari` | 7 |

**Escape — lodge + Zanzíbar (6)**

| Slug | Días |
| --- | --- |
| `safari-zanzibar-escape` | 7 |
| `serengeti-zanzibar` | 8 |
| `big-three-zanzibar` | 9 |
| `safari-culture-zanzibar` | 10 |
| `luxury-safari-zanzibar` | 12 |
| `grand-safari-zanzibar` | 14 |

**Enrich — lodge, fauna + cultura, sin Zanzíbar (6)**

| Slug | Días |
| --- | --- |
| `tarangire-serengeti-ngorongoro-enrich` | 5 |
| `manyara-serengeti-ngorongoro-enrich` | 7 |
| `tarangire-manyara-serengeti-ngorongoro-enrich` | 8 |
| `cultural-safari-combo` | 10 |
| `extended-safari-cultural-immersion` | 11 |
| `wildlife-leisure-culture` | 12 — ver nota abajo |

Dos hallazgos de la propia web de Wix, documentados en la cabecera de
`safaris.ts` y no corregidos por nuestra cuenta:

- **`six-day-camping-safari`**: en `/explorer-tanzania-safaris` la tarjeta de
  6 días enlaza a la misma URL que el paquete de 5 días — un enlace roto del
  propio Wix. Se publica con el itinerario de 5 días completo más un sexto
  día abierto marcado `draft`, sin inventar actividad.
- **`wildlife-leisure-culture`**: la descripción promete una etapa en
  Zanzíbar que el itinerario día a día nunca cumple (termina en el aeropuerto
  de Kilimanjaro). Se publica el itinerario, que es el dato verificable, y
  queda anotado para que el cliente confirme cuál de los dos textos es el
  correcto.

### Las 5 categorías reales de experiencias

Sustituyen a las 8 categorías inventadas. maishaquest.com no tiene una página
por actividad individual — solo 5 páginas de categoría —, así que replicar
más slugs habría sido inventar una arquitectura de contenido que el sitio
real no tiene. Cada categoría es una única `Experience` cuya descripción
enumera, con nombre y lugar, las actividades reales listadas en su página de
origen (`src/data/structure/experiences.ts`, `i18n/content/*.ts`):

| Slug | Página de origen | Ejemplos reales enumerados |
| --- | --- | --- |
| `thrill-seeker-adventure` | `/thrill-seaker-adventures` | Skydiving en Kendwa Beach, tirolina en Mto wa Mbu, parapente en Monduli, ciclismo de montaña cerca de Moshi/Arusha |
| `water-activities` | `/water-activities` | Snorkel en Mnemba Atoll, submarinismo PADI, kitesurf en Paje Beach, motos acuáticas en Kendwa y Nungwi |
| `tours-and-safaris` | `/tours` | Museos de Arusha y Dar es Salaam, cataratas Materuni y Napuru, Meserani Snake Park, tours de café y tanzanita |
| `shopping-and-leisure` | `/shopping-and-leisure` | Maasai Market de Arusha, Stone Town, AIM Mall, Rock City Mall (Mwanza) |
| `nightlife` | `/nightlife` | Via Via y Rafiki Juice Bar (Arusha), Sky Bar y Full Moon Party en Kendwa Rocks (Zanzíbar) |

Las cinco fotografías siguen siendo **provisionales** (reutilizadas del pool
de fauna/paisaje existente): ninguna representa de verdad paracaidismo, un
mercado o una discoteca. Ver el inventario de medios más abajo.

### Learn y organización regional

Página nueva `/learn` (`src/app/[locale]/learn/page.tsx`), aditiva: no toca
el campo `region` de `DestinationStructure` que usa el mapa interactivo y el
planificador. Usa su propia relación `RegionStructure.destinationSlugs`.

- **6 temas** (`src/data/structure/learn.ts`): Geography, Culture, History,
  Wildlife and Conservation, Economy, Festivals — resúmenes fieles de
  `/learn`, no el volcado completo de cada página real.
- **5 regiones oficiales**, con los 9 destinos actuales repartidos donde de
  verdad caen, y honestos donde no hay página propia:

  | Región | Destinos actuales del sitio |
  | --- | --- |
  | Northern | Serengeti, Tarangire, Lake Manyara, Ngorongoro, Kilimanjaro, Arusha |
  | Central & Southern | Nyerere, Ruaha |
  | Lake Zone & Western | *(ninguno todavía — la tarjeta no enlaza a ningún destino)* |
  | Coastal | *(ninguno todavía — región continental, distinta de Zanzíbar)* |
  | Zanzibar Island | Zanzíbar |

### Los 3 artículos reales del blog

Sustituyen a los 3 de demostración, conservados sin usarse en
`src/data/structure/journal.legacy.ts`. Los tres son de Talisa Tufts (que
coincide con un miembro real del equipo), publicados el 29/04/2025, y son en
su mayoría texto promocional sobre la propia empresa — los tres mencionan la
migración del sitio a Wix como novedad, no son guías de viaje:

| Slug nuevo | URL original en Wix |
| --- | --- |
| `elevate-your-safari-experience` | `/post/elevate-your-safari-experience-maisha-quest-s-tailored-adventures` |
| `unleash-your-wanderlust` | `/post/unleash-your-wanderlust-maisha-quest-safari-adventures-await` |
| `discover-tanzanias-hidden-gems` | `/post/discover-tanzania-s-hidden-gems-maisha-quest-safari-experiences` |

Ninguna de las tres páginas originales tenía imagen descargable con
atribución clara: las fotografías siguen siendo del pool provisional.

### Impacto social: los dos programas reales

`/impact` mostraba antes cuatro pilares genéricos que no correspondían a
ningún programa con nombre propio de maishaquest.com. El sitio real solo
publica dos, y son los dos que quedan (`src/data/structure/impact.ts`):

- **Maisha Quest Cares** (`maishaquest.com/cares`) — Teenage Troubled Youth
  Program: vivienda segura, formación en oficios, patrocinio educativo y
  mentoría para adolescentes en riesgo.
- **Empowerment** (`maishaquest.com/empowerment`) — empleo justo y
  desarrollo de talento joven tanzano dentro de la empresa.

"Travel with Purpose" no tiene página propia en maishaquest.com (404) ni
aparece en su sitemap: no se incluye, por no existir contenido oficial que
migrar. Ningún `outcomes` lleva cifra — el sitio real no publica ninguna.

**La foto del tigre no se usa.** La página real de Cares muestra en el pie
una fotografía de un tigre, un animal que no existe en Tanzania; no se copia
por no ser de Maisha Quest y ser incoherente con el destino. `image.src`
queda en `null` en los dos programas hasta tener una fotografía propia y
coherente.

### Contenido pendiente de validar con el cliente

| Qué falta | Dónde |
| --- | --- |
| Confirmar itinerario real de `six-day-camping-safari` (día 6) | `safaris.ts` |
| Confirmar cuál texto es correcto en `wildlife-leisure-culture` (¿hay etapa en Zanzíbar o no?) | `safaris.ts` |
| Precios de los 18 paquetes | Todos "bajo consulta" hasta recibirlos |
| Página de destino para Lake Eyasi y visitas a poblados masái (aparecen en varios itinerarios) | Pendiente — sin página propia todavía |
| Fotografías reales de los 18 paquetes, las 5 categorías de experiencias, Learn/regiones y los 2 programas de impacto | Ver inventario de medios, abajo |
| `/english-refund-policy` no tiene página equivalente en el sitio actual | Decisión del cliente/asesor legal — no se inventa una política de reembolso |
| Spot-check final del mapa de redirecciones de los paquetes de safari antes de implementarlo | Ver mapa de redirecciones, abajo |

### Inventario de recursos multimedia pendientes de Wix

Ningún dato de este bloque incluye contraseñas ni credenciales de acceso al
panel de Wix — solo qué páginas/elementos del **Media Manager** de Wix hay
que localizar y descargar. El Media Manager de Wix es una biblioteca plana,
no por carpetas, así que se indica la página real donde vive cada imagen en
vez de una ruta de carpeta.

| Sección | Qué descargar | Dónde está en Wix |
| --- | --- | --- |
| Logo | Logotipo e icono de marca | Cualquier página — aparece en la cabecera y el pie de todo el sitio |
| 18 paquetes de safari | Foto de portada + galería de cada paquete | Cada una de las 18 páginas de paquete (ver el mapa de redirecciones para la URL de cada una) |
| 5 categorías de experiencias | Foto de portada de cada categoría | `/thrill-seaker-adventures`, `/water-activities`, `/tours`, `/shopping-and-leisure`, `/nightlife` |
| Learn (6 temas) y regiones (5) | Foto de portada de `/learn` y de cada una de las 5 páginas de región | `/learn`, `/northern-region`, `/central-and-southern-region`, `/lake-zone-and-western-zone`, `/coastal-region`, `/zanzibar-island` |
| 3 artículos del blog | Imagen de cabecera de cada post | Los 3 posts en `/blog` (URLs en la tabla de artículos, arriba) |
| Impacto social | Fotografía propia y coherente con Tanzania para Cares y Empowerment — **nunca la foto del tigre** de `/cares` | `/cares`, `/empowerment` |
| Equipo | Retratos de Talisa Tufts, Frank Lyatuu y Tina Ngabo | **No existen ni en el sitio real** — `/about-maisha-quest-item` tampoco muestra fotos de ninguno de los tres. No es un recurso que descargar de Wix: hacen falta fotografías nuevas del cliente. |
| Galería general | — | maishaquest.com **no tiene página de galería** (404 comprobado). No hay nada que migrar aquí; si el cliente quiere una, es contenido nuevo, no una migración. |
| Vídeos | Cualquier vídeo promocional publicado en el sitio de Wix, si existe | Revisar cada página de paquete/experiencia — no se ha confirmado ninguno en la auditoría |

### Mapa de redirecciones 301 (planificación — no implementado)

**Solo documentación.** Ninguna redirección se ha añadido a `next.config.js`
ni se ha tocado el dominio o el DNS — es lo que pide la decisión 9: preparar
el mapa, no implementarlo todavía.

Las 44 rutas vienen de `https://www.maishaquest.com/pages-sitemap.xml`
(comprobado por completo, no una muestra). Los 18 paquetes se emparejan por
duración + palabra clave de la URL (p. ej. `12days-enrich-...` → la única
etiquetada `Enrich`); son de alta confianza pero piden un **spot-check final**
contra las páginas en vivo antes de implementar la redirección real.

| Ruta original (maishaquest.com) | Ruta nueva | Nota |
| --- | --- | --- |
| `/` | `/` | — |
| `/learn` | `/learn` | — |
| `/northern-region` | `/learn` | Región dentro de la página única de Learn |
| `/central-and-southern-region` | `/learn` | — |
| `/lake-zone-and-western-zone` | `/learn` | Sin destino propio todavía |
| `/coastal-region` | `/learn` | Sin destino propio todavía |
| `/zanzibar-island` | `/learn` | — |
| `/experiences` | `/experiences` | — |
| `/thrill-seaker-adventures` | `/experiences/thrill-seeker-adventure` | — |
| `/water-activities` | `/experiences/water-activities` | — |
| `/tours` | `/experiences/tours-and-safaris` | — |
| `/shopping-and-leisure` | `/experiences/shopping-and-leisure` | — |
| `/nightlife` | `/experiences/nightlife` | — |
| `/explorer-tanzania-safaris` | `/collections/explorer` | — |
| `/escape-tanzania-safaris` | `/collections/escape` | — |
| `/enrich-tanzania-safaris` | `/collections/enrich` | — |
| `/2days-tanzania-safaris` | `/safaris/manyara-ngorongoro-safari` | — |
| `/3days-tanzania-safaris` | `/safaris/tarangire-manyara-ngorongoro-safari` | — |
| `/4days-tanzania-safaris` | `/safaris/serengeti-ngorongoro-manyara-safari` | — |
| `/4days-midrange-tanzania-safaris` | *(sin migrar)* | Página huérfana en el propio Wix; no corresponde a ninguno de los 18 |
| `/5days-tanzania-safaris` | `/safaris/northern-circuit-camping-safari` | Es la URL a la que enlaza (erróneamente) la tarjeta de 6 días en Wix |
| `/5days-tanzania-safari-adventures` | `/safaris/tarangire-serengeti-ngorongoro-enrich` | — |
| *(sin URL propia en Wix)* | `/safaris/six-day-camping-safari` | Su tarjeta de origen enlazaba a `/5days-tanzania-safaris`, no a una URL propia |
| `/7days-camping-tanzania-safaris` | `/safaris/extended-camping-safari` | — |
| `/7days-manyara-tanzania-safaris` | `/safaris/manyara-serengeti-ngorongoro-enrich` | — |
| `/7days-luxury-tanzania-safaris` | `/safaris/safari-zanzibar-escape` | — |
| `/7days-tanzania-safaris` | *(sin migrar)* | Página huérfana en el propio Wix; no corresponde a ninguno de los 18 |
| `/8days-tanzania-safaris` | `/safaris/tarangire-manyara-serengeti-ngorongoro-enrich` | — |
| `/8daystanzania-luxury-safaris` | `/safaris/serengeti-zanzibar` | — |
| `/9days-tanzania-safaris` | `/safaris/big-three-zanzibar` | Único paquete de 9 días — sin ambigüedad |
| `/10days-tanzania-safaris` | `/safaris/cultural-safari-combo` | — |
| `/10days-tanzania-luxury-safaris` | `/safaris/safari-culture-zanzibar` | — |
| `/11days-tanzania-luxury-safaris` | `/safaris/extended-safari-cultural-immersion` | Único paquete de 11 días — sin ambigüedad |
| `/12days-tanzania-safaris` | `/safaris/luxury-safari-zanzibar` | — |
| `/12days-enrich-tanzania-luxury-safaris` | `/safaris/wildlife-leisure-culture` | "Enrich" literal en la URL original |
| `/14days-tanzania-luxury-safaris` | `/safaris/grand-safari-zanzibar` | Único paquete de 14 días — sin ambigüedad |
| `/blog` | `/journal` | — |
| `/about-maisha-quest-item` | `/about/team` | — |
| `/contact-us` | `/contact` | — |
| `/book-online` | `/plan` | — |
| `/cares` | `/impact` | Programa Maisha Quest Cares |
| `/empowerment` | `/impact` | Programa Empowerment |
| `/english-terms-conditions` | `/legal/terms` | Borrador propio, no la plantilla genérica de Wix |
| `/english-privacy-policy` | `/legal/privacy` | Borrador propio, no la plantilla genérica de Wix |
| `/english-refund-policy` | *(pendiente)* | Sin página equivalente todavía — requiere decisión del cliente/asesor legal, no se inventa |

Los 3 artículos del blog no están en `pages-sitemap.xml` (viven en el
sitemap de posts de Wix) y se documentan aparte:

| Ruta original (maishaquest.com) | Ruta nueva |
| --- | --- |
| `/post/elevate-your-safari-experience-maisha-quest-s-tailored-adventures` | `/journal/elevate-your-safari-experience` |
| `/post/unleash-your-wanderlust-maisha-quest-safari-adventures-await` | `/journal/unleash-your-wanderlust` |
| `/post/discover-tanzania-s-hidden-gems-maisha-quest-safari-experiences` | `/journal/discover-tanzanias-hidden-gems` |

Todas las rutas nuevas llevan el prefijo de idioma (`/es/...`, `/de/...`,
etc.) salvo que el visitante ya esté en el idioma por defecto — igual que el
resto del sitio.

## Despliegue

Pensado para Vercel con **Root Directory = `maisha-quest`**, igual que
`amigos-del-norte` es un proyecto aparte. Añadir `JOURNEY_REQUEST_WEBHOOK` en
las variables de entorno para activar el formulario.
