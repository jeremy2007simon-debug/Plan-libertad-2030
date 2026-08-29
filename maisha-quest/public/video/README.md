# Vídeo — assets pendientes

**Estado: uno de los dos archivos ya se ha entregado y está revisado; el otro
sigue sin existir. Ninguno de los dos se publica, y el entregado tampoco está
en el repositorio.** El motivo está abajo, y no es técnico.

La web sirve **cero elementos `<video>`**, y hoy eso es correcto. El módulo del
reproductor está escrito y probado, y consulta `hasPlayableVideo()` antes de
pintarse; sin archivo no pinta nada. La sección «La película» se recompone y no
queda hueco, ni marco vacío, ni «Film to follow», ni «Próximamente».

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
