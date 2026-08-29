# Auditoría del tono fotográfico de la portada

Generado por `node scripts/audit-image-tone.mjs`. **No se escribe a mano**: mide
los archivos que el navegador descarga de verdad al abrir `/en`, recorriendo la
página entera a 1440 y a 390 px.

Fecha de esta pasada: 2026-08-29.
Fotografías distintas servidas en la portada: **21**.

## Dirección fotográfica objetivo

Cálida, natural y cinematográfica. Sombras ligeramente oliva, luces arena y
doradas, marrones y terracotas naturales, saturación contenida y negros suaves
sin aplastar. Nada de filtros naranjas, nada de aspecto de Instagram, y los
colores reales de flamencos, cielo, agua y vegetación intactos.

Umbrales que usa este informe para marcar una fotografía como discordante:

| Medida | Rango objetivo |
| --- | --- |
| Temperatura | 4800–7200 K |
| Saturación media | 14 %–42 % |
| Sombras (luminancia < 0,25) | hasta 55 % |
| Altas luces (> 0,85) | hasta 12 % |
| Monocroma | descartada salvo función editorial declarada |

## Medidas, de la más fría a la más cálida

| Fotografía | K | Lum. | Contr. | Sat. | Sombras | Altas | R/G/B | Mono | Fuera de rango |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | :-: | --- |
| `tanzania-wildlife-sunset-hero` | 2250 | 0.45 | 0.28 | 68 % | 27 % | 2 % | 51 %/29 %/20 % | — | muy cálida (2250 K), saturada (68 %) |
| `savannah-acacia-sunset` | 2264 | 0.25 | 0.15 | 63 % | 49 % | 0 % | 52 %/28 %/20 % | — | muy cálida (2264 K), saturada (63 %) |
| `zanzibar-dhow-sunset` | 2931 | 0.36 | 0.22 | 43 % | 37 % | 0 % | 48 %/34 %/18 % | — | muy cálida (2931 K), saturada (43 %) |
| `serengeti-sunset` | 3265 | 0.38 | 0.20 | 40 % | 37 % | 0 % | 44 %/32 %/24 % | — | muy cálida (3265 K) |
| `safari-tent-accommodation` | 3438 | 0.30 | 0.24 | 63 % | 48 % | 1 % | 45 %/34 %/21 % | — | muy cálida (3438 K), saturada (63 %) |
| `leopard-in-tree` | 4095 | 0.38 | 0.18 | 42 % | 24 % | 0 % | 41 %/35 %/24 % | — | muy cálida (4095 K) |
| `lion-open-savannah` | 4511 | 0.47 | 0.17 | 43 % | 7 % | 0 % | 38 %/36 %/25 % | — | muy cálida (4511 K), saturada (43 %) |
| `flamingo-flock-in-motion` | 4639 | 0.50 | 0.23 | 27 % | 14 % | 4 % | 38 %/32 %/30 % | — | muy cálida (4639 K) |
| `antelope-herd-grasslands` | 4832 | 0.43 | 0.22 | 36 % | 22 % | 0 % | 37 %/36 %/27 % | — | — |
| `balloon-serengeti` | 5040 | 0.59 | 0.21 | 28 % | 6 % | 0 % | 37 %/34 %/29 % | — | — |
| `serengeti-plains` | 5360 | 0.46 | 0.12 | 45 % | 1 % | 0 % | 35 %/35 %/30 % | — | saturada (45 %) |
| `kilimanjaro-climbers` | 5411 | 0.48 | 0.39 | 21 % | 47 % | 36 % | 36 %/34 %/31 % | — | altas luces 36 % |
| `giraffe-oxpecker-birds` | 5825 | 0.42 | 0.18 | 41 % | 20 % | 0 % | 35 %/33 %/32 % | — | — |
| `ngorongoro-crater` | 5844 | 0.47 | 0.17 | 30 % | 7 % | 0 % | 34 %/35 %/31 % | — | — |
| `african-elephant-portrait` | 5864 | 0.54 | 0.29 | 8 % | 12 % | 24 % | 34 %/34 %/32 % | sí | monocroma, altas luces 24 % |
| `giraffes-open-savannah` | 5913 | 0.56 | 0.19 | 30 % | 3 % | 4 % | 34 %/35 %/31 % | — | — |
| `ngorongoro-zebras` | 5927 | 0.55 | 0.25 | 34 % | 14 % | 2 % | 33 %/36 %/31 % | — | — |
| `tarangire-baobab` | 6107 | 0.54 | 0.30 | 26 % | 19 % | 13 % | 33 %/36 %/31 % | — | altas luces 13 % |
| `zanzibar-nungwi` | 6285 | 0.33 | 0.35 | 35 % | 53 % | 4 % | 33 %/36 %/32 % | — | — |
| `flamingos-tanzania-lake` | 7422 | 0.46 | 0.15 | 18 % | 13 % | 1 % | 32 %/33 %/35 % | — | fría (7422 K) |
| `maasai-boma` | 8597 | 0.46 | 0.27 | 25 % | 19 % | 8 % | 32 %/31 %/37 % | — | fría (8597 K) |

## Dónde se usa cada una, y con qué derechos

| Fotografía | Sección | Recorte servido | Origen | Archivo original | Uso comercial | Autoría |
| --- | --- | --- | --- | --- | --- | --- |
| `tanzania-wildlife-sunset-hero` | Private journeys through Tanzania | escritorio 1449×857 · móvil 392×810 | Cliente | `x-X4.jpg` | Confirmados | Sin confirmar |
| `savannah-acacia-sunset` | Your story in Tanzania starts here. | escritorio 1512×708 · móvil 410×669 | Cliente | `image-X4-16.jpg` | Confirmados | Sin confirmar |
| `zanzibar-dhow-sunset` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 2.0 | — |
| `serengeti-sunset` | Three ways to travel Tanzania | escritorio 687×394 · móvil 371×260 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `safari-tent-accommodation` | Journeys worth remembering | escritorio 112×112 · escritorio 0×0 · móvil 0×0 · móvil 328×409 | Cliente | `image-X4-8.jpg` | Confirmados | Sin confirmar |
| `leopard-in-tree` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Cliente | `image-X4-4.jpg` | Confirmados | Sin confirmar |
| `lion-open-savannah` | Three ways to travel Tanzania | escritorio 687×394 · móvil 371×260 | Cliente | `image-X4-6.jpg` | Confirmados | Sin confirmar |
| `flamingo-flock-in-motion` | Let’s design your journey | escritorio 435×290 · móvil 0×0 | Cliente | `image-X4-12.jpg` | Confirmados | Sin confirmar |
| `antelope-herd-grasslands` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Cliente | `image-X4.jpg` | Confirmados | Sin confirmar |
| `balloon-serengeti` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 2.0 | — |
| `serengeti-plains` | Find your place in Tanzania | escritorio 527×297 · móvil 350×197 | Commons (provisional) | `—` | CC BY-SA 3.0 | — |
| `kilimanjaro-climbers` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `giraffe-oxpecker-birds` | Three ways to travel Tanzania | escritorio 687×394 · móvil 371×260 | Cliente | `image-X4-19.jpg` | Confirmados | Sin confirmar |
| `ngorongoro-crater` | Journeys worth remembering | escritorio 806×605 · escritorio 0×0 · móvil 0×0 · móvil 328×409 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `african-elephant-portrait` | ‘Maisha’ means life. | escritorio 640×704 · móvil 350×297 | Cliente | `image-X4-14.jpg` | Confirmados | Sin confirmar |
| `giraffes-open-savannah` | Your journey, in trusted hands | escritorio 554×369 · móvil 371×209 | Cliente | `image-X4-3.jpg` | Confirmados | Sin confirmar |
| `ngorongoro-zebras` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `tarangire-baobab` | One country. Endless ways to feel alive. | escritorio 1440×696 · móvil 390×868 | Commons (provisional) | `—` | CC BY 4.0 | — |
| `zanzibar-nungwi` | Journeys worth remembering | escritorio 112×112 · escritorio 0×0 · móvil 0×0 · móvil 328×409 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `flamingos-tanzania-lake` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Cliente | `image-X4-1.jpg` | Confirmados | Sin confirmar |
| `maasai-boma` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |

## Discordantes que quedan por resolver

Ninguna.

## Marcadas por el umbral y aceptadas a propósito

Un umbral no distingue un atardecer de un error de color.

- `tanzania-wildlife-sunset-hero` (muy cálida (2250 K), saturada (68 %)) — Es un atardecer, y es el hero. Cálida y saturada es la dirección buscada, no un defecto.
- `savannah-acacia-sunset` (muy cálida (2264 K), saturada (63 %)) — Atardecer. Igual que el hero.
- `zanzibar-dhow-sunset` (muy cálida (2931 K), saturada (43 %)) — Atardecer sobre el mar.
- `serengeti-sunset` (muy cálida (3265 K)) — Atardecer.
- `safari-tent-accommodation` (muy cálida (3438 K), saturada (63 %)) — Hora dorada dentro de una tienda: la luz es esa.
- `leopard-in-tree` (muy cálida (4095 K)) — Luz de tarde sobre hierba seca; los colores son reales.
- `lion-open-savannah` (muy cálida (4511 K), saturada (43 %)) — Igual: sabana seca a media tarde.
- `flamingo-flock-in-motion` (muy cálida (4639 K)) — Luz cálida de última hora sobre el agua.
- `serengeti-plains` (saturada (45 %)) — Ya armonizada; el 45 % restante es hierba verde de verdad.
- `kilimanjaro-climbers` (altas luces 36 %) — El 36 % de altas luces es el glaciar. Comprimirlo grisearía la nieve. Ya se le subió la saturación.
- `african-elephant-portrait` (monocroma, altas luces 24 %) — Blanco y negro DELIBERADO: va sola en «‘Maisha’ significa vida», sin ninguna fotografía en color al lado con la que chocar. Las otras monocromas, que sí convivían con fotografías en color, se han retirado.
- `tarangire-baobab` (altas luces 13 %) — Ya armonizada: de 38 % a 13 % de altas luces.
- `flamingos-tanzania-lake` (fría (7422 K)) — Ya armonizada, de 9.128 K a 7.422 K. Más allá, el agua deja de ser agua.
- `maasai-boma` (fría (8597 K)) — Ya armonizada, de 11.579 K a 8.597 K. Más allá, el cielo se vuelve crema.

## Repeticiones

Ninguna fotografía se repite en dos secciones de la portada.
