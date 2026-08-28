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
| Derechos de la fotografía del cliente | Sin confirmación escrita de uso comercial. Ver la sección siguiente. |
| Fotografía de relleno | 22 fotos documentales de Wikimedia Commons cubren los huecos que las 22 del cliente no alcanzan. Ver `public/images/CREDITS.md`. |
| Los dos vídeos | Ver `public/video/README.md`. **Uno tiene una condición de consentimiento previa.** |
| Textos legales | Borrador. Salen con `noindex, nofollow` y fuera del sitemap. Lo que hace falta para cerrarlos está en el cuadro de abajo. |
| Envío del formulario | `JOURNEY_REQUEST_WEBHOOK` sin configurar. Comprobado, no deducido: `GET /api/journey-requests` responde `{"configured": false}`. Sin él el formulario responde 501, lo dice y ofrece correo y WhatsApp. |

## Información que debe facilitar el cliente para cerrar los legales

Los tres documentos legales —condiciones, privacidad y cookies— **están en
borrador**. Salen con `noindex, nofollow`, no están en el sitemap y llevan un
aviso visible que dice que se están terminando con el asesor legal y que lo que
se aplica a una reserva es lo que figura por escrito en su confirmación.

Nada de lo de abajo se inventa ni se rellena con un valor «razonable». Un número
de licencia inventado en unas condiciones de venta es un problema legal, no un
detalle de maqueta. **Mientras esta tabla tenga huecos, la web no puede
declararse lista para producción.**

Cada fila indica dónde se escribe la respuesta. Los textos se traducen a los
seis idiomas sin cambiar su significado legal.

| # | Dato | Para qué | Dónde se escribe | Estado |
| --- | --- | --- | --- | --- |
| 1 | Razón social | Identificar al responsable del contrato | `legal.terms.sections` · `legal.privacy.sections` | Pendiente |
| 2 | Nombre comercial | Distinguir marca de sociedad | `COMPANY` en `src/lib/site.ts` | «Maisha Quest» |
| 3 | Número de registro mercantil | Identificación legal | `legal.terms.sections[0]` | Pendiente |
| 4 | Licencia TALA / TATO u otras | Acreditar la actividad de operador | `TRUST_CREDENTIALS` en `src/lib/site.ts` | Pendiente |
| 5 | Domicilio social | Notificaciones y sede | `legal.terms.sections[0]` | Solo consta «Arusha, Tanzania» |
| 6 | Correo para asuntos legales | Canal de reclamaciones | `COMPANY` en `src/lib/site.ts` | Pendiente (hoy solo `info@`) |
| 7 | Responsable del tratamiento | Base del aviso de privacidad | `legal.privacy.sections` | Pendiente |
| 8 | Encargados y servicios externos | Quién más ve los datos | `legal.privacy.sections` | Pendiente |
| 9 | Países donde se procesan los datos | Transferencias internacionales | `legal.privacy.sections` | Pendiente |
| 10 | Plazos de conservación | Cuánto se guarda cada dato | `legal.privacy.sections` | Pendiente |
| 11 | Bases jurídicas del tratamiento | Por qué es lícito tratar cada dato | `legal.privacy.sections` | Pendiente |
| 12 | Depósito y saldo | Condiciones de pago | `legal.terms.sections` | Pendiente |
| 13 | Cancelaciones | Plazos y penalizaciones | `legal.terms.sections` | Pendiente |
| 14 | Reembolsos | Qué se devuelve y cuándo | `legal.terms.sections` | Pendiente |
| 15 | Cambios de reserva | Qué se puede modificar y con qué coste | `legal.terms.sections` | Pendiente |
| 16 | Fuerza mayor | Qué ocurre ante causas ajenas | `legal.terms.sections` | Pendiente |
| 17 | Seguros | Cobertura exigida y cobertura propia | `legal.terms.sections` | Pendiente |
| 18 | Responsabilidad | Límites y exclusiones | `legal.terms.sections` | Pendiente |
| 19 | Ley y jurisdicción aplicables | Dónde se resuelve un conflicto | `legal.terms.sections` | Pendiente |
| 20 | Política sobre menores | Edad mínima, acompañamiento, consentimiento de imagen | `legal.terms.sections` · `legal.privacy.sections` | Pendiente |
| 21 | Cookies y analítica realmente usadas | Contenido real del aviso de cookies | `legal.cookies.sections` | Hoy la web NO instala ninguna cookie ni analítica; el texto lo dice así |

### Autorización de imagen

Aparte de la tabla, y con la misma condición de bloqueo:

- **Fotografía del cliente**: 22 archivos entregados, **sin confirmación escrita
  de uso comercial**. `MAISHA_QUEST_PRODUCTION=1 npm run check:rights` falla
  mientras siga habiendo una sola publicada sin confirmar.
- **Vídeo grabado en un colegio**: no se publica sin autorización escrita de
  los tutores de los menores y del centro. Difuminar o recortar a los menores
  para esquivar el consentimiento no es una alternativa.

## Client-supplied photography — commercial rights pending confirmation

El cliente entregó **22 fotografías**. **No hay confirmación escrita de
derechos de uso comercial**, así que ninguna se marca como autorizada: las
entradas de `src/data/client-photography.ts` llevan todas
`commercialUseConfirmed: false`, y `photographer`, `creditUrl` y `license`
quedan en `null` porque no se sabe quién las hizo ni bajo qué licencia. No se
inventa ninguno de esos tres campos, y en ningún sitio se afirma que las tomara
Maisha Quest.

`locationConfirmed: false` en todas: las asignaciones a destinos son temáticas,
no una afirmación de dónde se tomó cada foto, y por eso ningún `alt` nombra un
parque concreto. `subjectConfirmed` solo es `true` donde la especie es
inequívoca en la propia imagen.

**Antes del lanzamiento hay que resolver esto por escrito con el cliente.**
Nada de este control aparece en la interfaz pública.

### Los 22 originales entregados

Se conservan intactos —mismo nombre, mismos bytes, misma metadata— en
`public/images/maisha-quest/originals/`. Nunca se sobrescriben ni se comprimen.

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
sacarlos del despliegue —o moverlos fuera de `public/`— antes del lanzamiento**,
precisamente porque los derechos siguen sin confirmar.

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
