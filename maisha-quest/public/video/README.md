# Vídeos

Vacío a propósito. Los dos vídeos del cliente no están en el repositorio y no
deben subirse con su peso actual.

| Origen | Duración | Resolución | Peso | Dónde va |
| --- | --- | --- | --- | --- |
| `WhatsApp Video 2026-08-27 at 16.07.30.mp4` | 36 s | 1080×1920 | ~45,5 MB | Sección "One country. Endless ways to feel alive." |
| `WhatsApp Video 2026-08-27 at 16.07.30 (1).mp4` | 41 s | 576×1024 | ~6,9 MB | Sección de impacto (`Maisha Quest Cares`) |

## Antes de publicar el segundo vídeo

Contiene imágenes de un colegio y de menores identificables. Hay que confirmar
por escrito la autorización de imagen de sus tutores y del centro, y conservar
ese consentimiento. Sin él, el vídeo no se publica. Ver `src/data/impact.ts`.

## Compresión

```bash
# MP4 (H.264) — sin audio, con el índice al principio para que empiece antes
ffmpeg -i original.mp4 -vf scale=720:-2 -c:v libx264 -crf 26 -preset slow \
       -movflags +faststart -an journey.mp4

# WebM (VP9) — el navegador lo prefiere si está disponible
ffmpeg -i original.mp4 -vf scale=720:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 \
       -an journey.webm

# Póster
ffmpeg -i original.mp4 -ss 2 -frames:v 1 journey-poster.jpg
```

Después, rellenar las rutas en `JOURNEY_FILM` (`src/components/home/VideoStory.tsx`)
o en `IMPACT_VIDEO` (`src/data/impact.ts`). El componente `LazyVideo` ya se
encarga de la carga diferida, de reproducir solo en pantalla, de silenciar el
audio, de `playsInline` y de respetar `prefers-reduced-motion`.

El hero de escritorio necesita además un montaje **horizontal**: un 1080×1920
recortado a pantalla completa pierde casi todo el encuadre. Cuando exista, se
pasa por la prop `video` de `<Hero>`.
