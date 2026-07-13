# Fotografía provisional

El hero y "Nuestra historia" usan fotografía de stock (no del
restaurante) mientras no hay fotografía real, servida directamente desde
la CDN de Unsplash (ver `HERO_IMAGE_URL` en `Hero.tsx` y
`HISTORIA_IMAGE_URL` en `Historia.tsx`; dominio permitido en
`next.config.ts` → `images.remotePatterns`). Todas bajo licencia Unsplash
(uso comercial libre, sin atribución obligatoria).

| Usada en | Fuente |
| --- | --- |
| `Hero.tsx` (fondo principal, preparado para vídeo) | Angelica Hasbon — https://unsplash.com/photos/four-delicious-tacos-and-dipping-sauce-on-a-dark-table-pxq4ESv_Csk |
| `Historia.tsx` ("Nuestra historia") | Paul Hermann — https://unsplash.com/photos/gray-metal-tong-and-grilled-meat-with-fire-jeiqzOgwwKU |

Para sustituir por fotografía propia: añade el archivo a
`public/images/`, cambia el `src` de la `<Image>` correspondiente a la
ruta local (`/images/archivo.jpg`) y, si ya no queda ninguna imagen
remota, puedes quitar `images.remotePatterns` de `next.config.ts`.

La Galería (`Galeria.tsx`) y el resto de huecos de interior/fachada
siguen con `PlaceholderImage` a la espera de fotos reales del local —
usar fotos de stock ahí sería engañoso porque esas secciones muestran
específicamente el espacio de este restaurante, no comida genérica.
