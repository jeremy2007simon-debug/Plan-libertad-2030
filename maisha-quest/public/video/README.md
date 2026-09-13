# Vídeo

Dos casos muy distintos conviven en este archivo: el vídeo de la introducción
cinematográfica, entregado por el cliente para ese uso exacto y ya publicado
(ver la primera sección), y los dos vídeos de «La película»/impacto, que
siguen pendientes por un motivo de consentimiento que no es técnico (segunda
sección, sin cambios respecto a la auditoría anterior).

## El vídeo de la introducción — publicado (v2, montaje completo de 35 s)

Sustituye al recorte de 15 s de la versión anterior de este documento. El
cliente entregó el montaje real y completo, y la introducción ha cambiado de
arquitectura al mismo tiempo: ya NO es una capa a pantalla completa que
bloquea el acceso al sitio, sino una experiencia de vídeo opcional dentro del
propio hueco del hero, con un botón «Enter the website» visible desde el
primer instante (ver `src/components/intro/Intro.tsx` para el porqué completo
del cambio).

`originals/maisha-quest-intro-v2.mp4` es el archivo **exactamente como lo
entregó el cliente**, sin recodificar — se conserva aparte, intacto, tal y
como pide la política de este repositorio de no tocar nunca el entregable
original. `optimized/maisha-quest-intro-v2.mp4` y `optimized/
maisha-quest-intro-v2.webm` son los dos derivados que de verdad sirve la web
(el `<video>` descarga solo UNO de los dos, nunca ambos), más el póster que
se ve mientras carga.

Ficha técnica del original entregado, medida con `ffprobe`:

| | |
| --- | --- |
| Resolución | 1920 × 1080 (Full HD real, no un `upscale`) |
| Duración | 35,4 s exactos — el montaje completo, sin recortar ni acelerar |
| Peso | 16,4 MB |
| Vídeo | H.264, ~59,94 fps, ~3,58 Mbps, `yuv420p` |
| Audio | AAC estéreo, 48 kHz, ~126 kbps — sonido ambiente real (comprobado con `ffmpeg -af volumedetect`: -12,4 dB de media, no está en silencio) |
| `moov` | Ya al principio del archivo (`faststart`): no hizo falta remuxar |
| SHA-256 | `63e36d1d983fef66ccc86be0e429113c5fccdf4462eef66e9c60bc47b57e43c3` |

**Contenido, comprobado fotograma a fotograma:** jirafa caminando con el
Kilimanjaro al fondo → elefante en primer plano → atardecer con ñus y una
acacia solitaria → retrato de un hombre masái → guepardo corriendo → león
tumbado en luz dorada → globos aerostáticos sobre la migración → punto de
vista desde un vehículo de safari → el rótulo `Maisha Quest`, manuscrito,
sobre una textura de piel de jirafa, incrustado en el propio archivo en sus
últimos ~3 s.

**Optimización — un solo derivado H.264, sin ganancia real en VP9 a menor
peso:**

| Receta | Peso | |
| --- | --- | --- |
| Original entregado | 16,4 MB | — |
| `-c copy -movflags +faststart` | 16,4 MB | El `moov` ya estaba al principio; copiar no cambia nada |
| `-crf 23 -preset slow` | 15,4 MB | Apenas ahorra: casi no queda margen a esa calidad |
| **`-crf 25 -preset slow` (el usado)** | **12,7 MB** | Comprobado fotograma a fotograma contra el original (incluido el rótulo final): sin artefactos visibles |
| VP9 a `-crf 32` (el usado para el `.webm`) | 15,8 MB | Más pesado que el H.264 a `-crf 25` — con esta fuente (60 fps, mucho movimiento) VP9 no gana en tamaño |

`optimized/maisha-quest-intro-v2.mp4` (H.264, `-crf 25 -preset slow`,
`-movflags +faststart`, mismos 1920×1080 y ~59,94 fps que el original — ni
resolución ni duración ni fps se han tocado) pesa **12,7 MB**, SHA-256
`dd3cc02e9a5f706d113d5684617bf6d09239185f6af2433604a9a10534f835b5`.

**`optimized/maisha-quest-intro-v2.webm` (VP9) se incluye pese a pesar más**
—15,8 MB, SHA-256
`03e160c17ce7df518555c7d7beaf1986f369b8f736ad046a00a362d7a3c936d4`—, al
revés que el criterio de «solo si pesa menos» de la sección de abajo: aquí lo
que importa es la compatibilidad de códec, no el peso, porque el navegador
descarga solo uno de los dos `<source>`, nunca los dos. Comprobado en este
mismo proceso: el Chromium de código abierto que empaqueta Playwright en este
entorno de pruebas **no trae descodificador H.264** (`canPlayType('video/mp4;
codecs="avc1..."')` devuelve vacío) y el `.mp4` se queda a medio cargar y
aborta a los pocos segundos; con el `.webm` como segundo `<source>`, el
`<video>` cae ahí solo y reproduce el montaje completo sin problema. Es
exactamente el mismo motivo, y la misma solución, que ya documentaba la
versión anterior de este archivo para el recorte de 15 s.

**Póster** — `optimized/maisha-quest-intro-v2-poster.webp`, fotograma a los
0,6 s (la jirafa, antes de que aparezca el elefante), SHA-256
`a56b560455f9143099c579476e123c10a7586a27b07677e64485de12a41ffb01`.

**El rótulo final** (`Maisha Quest` manuscrito sobre piel de jirafa, en los
últimos ~3 s) ya está incrustado en el propio archivo: no se superpone
ningún logo encima, ni el PNG dorado reconstruido de una versión muy anterior
de esta introducción (que ya no existe en el repositorio), ni ningún otro. El
cierre se deja exactamente como lo entregó el cliente.

⚠️ **Ese rótulo manuscrito es obra del cliente, distinto de la marca serif
con brújula que usa el resto del sitio** —el logotipo del `Header` sigue
siendo esa brújula, sin cambios—. Cuál de los dos usar hacia delante es una
decisión del cliente, no algo que este código deba resolver por su cuenta. La
reconstrucción tipográfica de ese rótulo hecha en una fase muy anterior de
este proyecto (relieve simulado por sombreado CSS, nunca una animación 3D
real) quedó descartada en cuanto se confirmó que el vídeo real ya lo trae
incrustado; si en algún documento anterior se la describió sin la palabra
«simulado», esta nota lo corrige.

**Formato — horizontal de origen, sin edición vertical dedicada.** El plano
es 16:9 (1920×1080): grabación de dron y cámara en mano en el
Serengeti/Kilimanjaro, ninguna toma pensada para un recorte 9:16. La
introducción muestra el marco 16:9 completo, sin recortar, tanto en
escritorio como en móvil (`object-fit: cover` dentro de un marco que fuerza
esa misma proporción, así que nunca se pierde nada de la imagen ni del
rótulo); en pantallas más altas que anchas eso dejaste texturas de Dark
Canopy a los lados. Un recorte a 9:16 real perdería la mitad de cada plano
panorámico (los globos, la migración, el propio rótulo) y NO se ha hecho.
**Si algún día se necesita una experiencia vertical a pantalla completa que
iguale de verdad un hero móvil sin barras laterales, hace falta un montaje
vertical dedicado del cliente — queda anotado aquí como recurso pendiente,
no resuelto por recorte.**

## Los dos vídeos de «La película» / impacto — pendientes

**Estado: uno de los dos archivos ya se ha entregado y está revisado; el otro
sigue sin existir. Ninguno de los dos se publica, y el entregado tampoco está
en el repositorio.** El motivo está abajo, y no es técnico.

La sección «La película» de la home sirve **cero elementos `<video>`** propios
—el de la introducción, arriba, es un caso aparte—, y hoy eso es correcto. El
módulo del reproductor está escrito y probado, y consulta
`hasPlayableVideo()` antes de pintarse; sin archivo no pinta nada. La sección
se recompone y no queda hueco, ni marco vacío, ni «Film to follow», ni
«Próximamente».

## Los dos archivos

| Archivo | Estado | Para qué |
| --- | --- | --- |
| `WhatsApp Video 2026-08-27 at 16.07.30.mp4` | **No entregado.** No existe en el repositorio ni en el entorno | Candidato a «La película» de la portada |
| `WhatsApp Video 2026-08-27 at 16.07.30 (1).mp4` | **Entregado y revisado el 29/08. BLOQUEADO: menores identificables** | Candidato al módulo de impacto |

## El archivo entregado

Ficha técnica, medida con `ffprobe` sobre el original:

| | |
| --- | --- |
| Resolución | 576 × 1024 — **vertical** |
| Duración | 41,1 s |
| Peso | 6,89 MB |
| Vídeo | H.264, perfil Baseline, 29,97 fps, ~1,27 Mbps |
| Audio | AAC-LC, 44,1 kHz, estéreo, ~63 kbps. Sonido continuo: ni un silencio de más de 0,8 s por debajo de −35 dB |
| Rotación | Sin metadatos de rotación: es vertical de origen, no un horizontal girado |
| SHA-256 | `b3a1a9962dbb509d1922bec0785dc500eb2e2f93a56df515cc1abff19a849a39` |

Contenido, visto fotograma a fotograma: una carretera con el monte Meru al
fondo, el interior en obra de una construcción, **un aula con niñas y niños de
primaria en uniforme**, una fuente de agua donde beben y se lavan las manos, y
dos planos finales en el patio con **una mujer adulta identificable rodeada de
una decena de menores**, todos de cara y a plena luz.

### Por qué no se publica

**Aparecen menores identificables, en un centro escolar, con la cara
perfectamente reconocible.** No se publica sin **autorización escrita de sus
tutores legales y del centro**. Difuminar o recortar las caras no es una
alternativa: el consentimiento es sobre grabar y publicar, no sobre reconocer
una cara. La mujer adulta que aparece necesita además su propia autorización.

### Por qué tampoco está en el repositorio

Este repositorio es **público** en GitHub, y todo lo que cuelga de `public/` lo
sirve Next.js en una URL directa. Meter el archivo en `public/video/originals/`
—aunque ningún componente lo enlazara— sería publicarlo dos veces: en el
repositorio y en el despliegue. Así que el original **no se ha añadido**. Con
las autorizaciones firmadas se sube entonces, y no antes.

Mientras tanto el archivo vive únicamente donde lo dejó quien lo entregó. El
contenedor de trabajo es efímero: **quien tenga el original debe conservarlo,
aquí no queda copia**.

### Compresión medida sobre este archivo

Los comandos de abajo son los correctos, pero este archivo concreto ya viene
comprimido por WhatsApp y es pequeño (576 px de ancho), así que el `-crf 24`
que sirve para un original de cámara **lo engorda**. Medido:

| Receta | Peso | |
| --- | --- | --- |
| Original entregado | 6,89 MB | — |
| `-c copy -movflags +faststart` | 6,91 MB | Solo mueve el índice al principio; no recodifica |
| `-crf 24` | 8,82 MB | **Peor que el original**: no usar con una fuente ya comprimida |
| `-crf 28` | 5,59 MB | Recomendado para este archivo |
| `-crf 30` | 4,49 MB | Si hace falta bajar más |

`scale='min(1080,iw)'` se queda en 576 px: **ninguna imagen se amplía**, que es
justo lo que se busca. El vertical se mantiene; en escritorio va en un marco
vertical junto al texto y en móvil a ancho completo con altura acotada. **No se
estira como hero horizontal.**

Y hay sonido de principio a fin. Si lleva voz, **no se publica sin subtítulos**
(ver más abajo).

## Antes de integrarlos: inspección obligatoria

Para el archivo que falta —y como registro de lo que ya se hizo con el
entregado, cuyas tres respuestas son **sí, sí y sí**—. Con el archivo delante,
antes de comprimir nada:

```bash
ffprobe -v error -show_entries \
  format=duration,size,bit_rate:stream=width,height,codec_name,r_frame_rate \
  -of default=noprint_wrappers=1 "public/video/originals/<archivo>.mp4"
```

Eso da duración, peso, resolución, orientación y códec. Después hay que mirar
el contenido y responder por escrito a tres preguntas:

1. **¿Aparecen menores identificables?** En el entregado, sí: un aula entera.
   El otro también está grabado en un colegio. **Si aparecen menores, no se publica sin autorización escrita de
   sus tutores y del centro.** Difuminar o recortar a los menores para esquivar
   el consentimiento no es una alternativa: el consentimiento es sobre grabar y
   publicar, no sobre reconocer una cara.
2. **¿Aparecen personas adultas identificables?** Misma regla, con su propia
   autorización.
3. **¿Es vertical?** El entregado lo es (576 × 1024) y el otro viene de
   WhatsApp, así que casi seguro también. Se
   mantiene el formato: en escritorio va en un marco vertical junto al texto y
   en móvil a ancho completo con altura acotada. **No se estira como hero
   horizontal.**

## Compresión

Todo va a `public/video/optimized/`. Los comandos son exactos y se pueden
copiar tal cual; solo cambia el nombre del archivo.

**1. MP4 / H.264 — el que reproduce todo el mundo.**

```bash
ffmpeg -i "public/video/originals/<archivo>.mp4" \
  -vf "scale='min(1080,iw)':-2" \
  -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 24 \
  -pix_fmt yuv420p \
  -c:a aac -b:a 96k -ac 1 \
  -movflags +faststart \
  "public/video/optimized/<nombre-semantico>.mp4"
```

`-movflags +faststart` mueve el índice al principio del archivo: sin eso el
navegador se descarga el vídeo entero antes de poder empezar. `-crf 24` con
`-preset slow` deja un vertical de 1080 px en torno a 1,5–2,5 MB por minuto,
holgadamente por debajo del tope de 4 MB.

**2. WebM / VP9 — opcional, solo si baja de peso de verdad.**

```bash
ffmpeg -i "public/video/originals/<archivo>.mp4" \
  -vf "scale='min(1080,iw)':-2" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 \
  -c:a libopus -b:a 96k -ac 1 \
  "public/video/optimized/<nombre-semantico>.webm"
```

Se compara con el MP4 y **se queda solo si pesa menos**: dos archivos que pesan
lo mismo son el doble de trabajo para el mismo resultado.

**3. Póster — el fotograma que se ve antes de darle a reproducir.**

```bash
ffmpeg -i "public/video/optimized/<nombre-semantico>.mp4" \
  -ss 00:00:01.5 -frames:v 1 \
  -vf "scale='min(1080,iw)':-2" \
  "public/video/optimized/<nombre-semantico>-poster.webp"
```

El póster es lo que fija el tamaño de la caja, así que evita el salto de
maquetación: sin él, el reproductor no reserva espacio y el CLS se dispara.
El segundo 1,5 evita el fotograma en negro del arranque.

**4. Subtítulos, si hay voz.**

Un `.vtt` junto al vídeo, y se declara en `captions` dentro de la entrada de
`src/data/impact.ts` o del vídeo de la portada. Si hay voz y todavía no hay
subtítulos, se anota como tarea pendiente y **no se publica el vídeo con voz
sin ellos**.

## Cómo se activa

Una vez comprimido y con los derechos resueltos, se rellena la entrada
correspondiente:

```ts
// src/data/impact.ts  (o el vídeo de la portada)
{
  mp4: "/video/optimized/<nombre-semantico>.mp4",
  webm: "/video/optimized/<nombre-semantico>.webm", // opcional
  poster: { src: "/video/optimized/<nombre-semantico>-poster.webp", … },
  captions: "/video/optimized/<nombre-semantico>.vtt",  // si hay voz
}
```

`hasPlayableVideo()` lo detecta y el módulo aparece solo. No hay que tocar
ningún componente.

El reproductor ya cumple, y está probado, todo lo que hace falta: carga
diferida por debajo del primer viewport, `preload="none"` —no se descarga nada
hasta que alguien lo pide—, sin autoplay y sin sonido automático, reproducción
iniciada por el usuario, botones de reproducir/pausar y silenciar con nombre
accesible, pausa al salir de pantalla, respeta `prefers-reduced-motion`, y no
entra en el cálculo del LCP porque el póster ocupa su sitio desde el principio.
