# Fotografía

Esta propuesta no utiliza fotografía de stock. Todos los huecos de imagen
(hero, historia, galería) se resuelven con `PlaceholderPanel`
(`src/components/ui/PlaceholderPanel.tsx`): un panel con degradado de
marca, grano sutil y el monograma "A" en filigrana.

Se decidió así a propósito: una foto de stock de comida o de un salón
genérico transmitiría una identidad que no es la de este restaurante en
concreto, y contradiría la premisa del proyecto de no inventar nada sobre
el negocio.

Para sustituir una imagen por la fotografía real del local:

1. Añade el archivo a esta carpeta (`public/images/`).
2. Sustituye el `<PlaceholderPanel ... />` correspondiente por
   `<Image src="/images/archivo.jpg" alt="..." fill className="object-cover" />`
   de `next/image`.

Para el vídeo del hero, pasa la ruta del archivo real como prop `src` a
`VideoBackground` en `src/components/Hero.tsx`.
