# Fotografía de este sitio

## Estado: TODA la fotografía es provisional

Ninguna imagen de `public/images/tanzania/` es material de Maisha Quest. Son
fotografías documentales de Wikimedia Commons, bajo licencias Creative Commons,
usadas mientras no exista fotografía propia.

El listado completo con autor, licencia y enlace a la ficha original se genera
solo desde `src/data/photography.ts` y se publica en `/legal/credits`. Esa
página cumple la atribución que exigen las licencias CC BY y CC BY-SA.

## Criterio de selección

Cada archivo se eligió porque **su ficha en Commons acredita el país y el
sujeto**. No es un detalle: es lo que garantiza que no aparezca fauna ajena a
Tanzania. La web actual muestra un tigre —una especie asiática que no vive en
África— y ese tipo de error destruye la credibilidad de un operador de safaris
ante cualquier viajero informado.

## Qué NO tiene foto, y por qué

Estos huecos usan el componente `ImageSlot` (marfil, filete y brújula) en lugar
de una foto de archivo:

| Hueco | Motivo |
| --- | --- |
| Retratos del equipo | Son tres personas concretas. Una foto de stock sería directamente falsa. |
| Alojamientos | Implicaría afirmar acuerdos con campamentos y lodges concretos. |
| Proyectos de impacto | Ver el aviso de `src/data/impact.ts`: consentimiento de imagen de menores. |
| Viajeros y testimonios | Son clientes reales o no son nadie. |

Los huecos tienen la proporción exacta de la foto que irá en su sitio, así que
sustituirlos no mueve el diseño.

## Cómo sustituir por fotografía propia

1. Colocar los originales donde sea (fuera del repositorio).
2. Convertirlos con el mismo criterio que las actuales: WebP, calidad 74,
   máximo 2000 px de ancho en horizontal y 1200 px en vertical, más un LQIP de
   20 px en base64.

   ```bash
   npx --yes sharp-cli --input original.jpg --output public/images/tanzania/ \
     resize 2000 --withoutEnlargement -- format webp --quality 74
   ```

   (o el script equivalente con la librería `sharp`, que es como se generaron
   las actuales.)
3. Actualizar la entrada en `src/data/photography.ts`: `src`, `width`,
   `height`, `blurDataURL`, el `alt` descriptivo y —importante— quitar
   `provisional: true` y el bloque `credit`.
4. La imagen desaparece sola de `/legal/credits`.

## Vídeo

`public/video/` está vacío a propósito. Los dos vídeos entregados por el
cliente NO deben subirse con su peso actual (uno pesa ~45,5 MB). Las
instrucciones de compresión están en:

- `src/components/home/VideoStory.tsx` — vídeo de marca, 36 s, 1080×1920.
- `src/data/impact.ts` — vídeo de impacto, 41 s, 576×1024, **con una condición
  previa de consentimiento que hay que resolver antes de publicarlo**.

Los componentes funcionan sin los archivos: muestran el póster o su hueco y
anuncian el vídeo como pendiente, en lugar de romperse.
