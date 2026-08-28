# Vídeo — assets pendientes

**Estado: los dos archivos NO existen.** Comprobado en esta carpeta, en todo el
repositorio y en el entorno de trabajo:

```
$ ls public/video/
README.md

$ find / -iname "*WhatsApp Video 2026-08-27*"
(sin resultados)

$ find . -type f \( -iname '*.mp4' -o -iname '*.mov' -o -iname '*.webm' \)
(sin resultados)
```

La web sirve **cero elementos `<video>`**, y eso es correcto: no hay nada que
reproducir. El módulo del reproductor está escrito y probado, y consulta
`hasPlayableVideo()` antes de pintarse; sin archivo no pinta nada. La sección
«La película» se recompone y no queda hueco, ni marco vacío, ni «Film to
follow», ni «Próximamente».

## Los dos archivos que faltan

| Archivo que el cliente debe entregar | Dónde se sube | Para qué |
| --- | --- | --- |
| `WhatsApp Video 2026-08-27 at 16.07.30.mp4` | `public/video/originals/` | Candidato a «La película» de la portada |
| `WhatsApp Video 2026-08-27 at 16.07.30 (1).mp4` | `public/video/originals/` | Candidato al módulo de impacto |

Los originales **no se tocan nunca**: se conservan con su nombre y sus bytes,
igual que la fotografía. Los derivados se generan aparte, en
`public/video/optimized/`.

## Antes de integrarlos: inspección obligatoria

Con el archivo delante, antes de comprimir nada:

```bash
ffprobe -v error -show_entries \
  format=duration,size,bit_rate:stream=width,height,codec_name,r_frame_rate \
  -of default=noprint_wrappers=1 "public/video/originals/<archivo>.mp4"
```

Eso da duración, peso, resolución, orientación y códec. Después hay que mirar
el contenido y responder por escrito a tres preguntas:

1. **¿Aparecen menores identificables?** Uno de los dos está grabado en un
   colegio. **Si aparecen menores, no se publica sin autorización escrita de
   sus tutores y del centro.** Difuminar o recortar a los menores para esquivar
   el consentimiento no es una alternativa: el consentimiento es sobre grabar y
   publicar, no sobre reconocer una cara.
2. **¿Aparecen personas adultas identificables?** Misma regla, con su propia
   autorización.
3. **¿Es vertical?** Los dos vienen de WhatsApp, así que casi seguro sí. Se
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
