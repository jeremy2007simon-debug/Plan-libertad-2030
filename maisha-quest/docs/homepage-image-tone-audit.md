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
| Temperatura | 2600–7200 K |
| Saturación media | 14 %–42 % |
| Sombras (luminancia < 0,25) | hasta 55 % |
| Altas luces (> 0,85) | hasta 12 % |
| Monocroma | descartada salvo función editorial declarada |

## Medidas, de la más fría a la más cálida

| Fotografía | K | Lum. | Contr. | Sat. | Sombras | Altas | R/G/B | Mono | Fuera de rango |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | :-: | --- |
| `tanzania-wildlife-sunset-hero` | 2250 | 0.45 | 0.28 | 68 % | 27 % | 2 % | 51 %/29 %/20 % | — | muy cálida (2250 K), saturada (68 %) |
| `savannah-acacia-sunset` | 2264 | 0.25 | 0.15 | 63 % | 49 % | 0 % | 52 %/28 %/20 % | — | muy cálida (2264 K), saturada (63 %) |
| `zanzibar-dhow-sunset` | 2931 | 0.36 | 0.22 | 43 % | 37 % | 0 % | 48 %/34 %/18 % | — | saturada (43 %) |
| `serengeti-sunset` | 3265 | 0.38 | 0.20 | 40 % | 37 % | 0 % | 44 %/32 %/24 % | — | — |
| `safari-tent-accommodation` | 3438 | 0.30 | 0.24 | 63 % | 48 % | 1 % | 45 %/34 %/21 % | — | saturada (63 %) |
| `leopard-in-tree` | 4095 | 0.38 | 0.18 | 42 % | 24 % | 0 % | 41 %/35 %/24 % | — | — |
| `kilimanjaro-kibo` | 4164 | 0.66 | 0.16 | 33 % | 0 % | 1 % | 40 %/35 %/25 % | — | — |
| `lion-open-savannah` | 4511 | 0.47 | 0.17 | 43 % | 7 % | 0 % | 38 %/36 %/25 % | — | saturada (43 %) |
| `antelope-herd-grasslands` | 4550 | 0.45 | 0.22 | 37 % | 20 % | 0 % | 38 %/36 %/26 % | — | — |
| `balloon-serengeti` | 4572 | 0.61 | 0.21 | 34 % | 5 % | 0 % | 38 %/35 %/27 % | — | — |
| `flamingo-flock-in-motion` | 4639 | 0.50 | 0.23 | 27 % | 14 % | 4 % | 38 %/32 %/30 % | — | — |
| `maasai-boma-warm` | 4914 | 0.56 | 0.29 | 24 % | 14 % | 8 % | 37 %/34 %/29 % | — | — |
| `ngorongoro-zebras` | 5334 | 0.58 | 0.28 | 29 % | 14 % | 19 % | 35 %/36 %/29 % | — | altas luces 19 % |
| `serengeti-plains` | 5362 | 0.46 | 0.12 | 45 % | 1 % | 0 % | 35 %/35 %/30 % | — | saturada (45 %) |
| `giraffe-oxpecker-birds` | 5825 | 0.42 | 0.18 | 41 % | 20 % | 0 % | 35 %/33 %/32 % | — | — |
| `ngorongoro-crater` | 5844 | 0.47 | 0.17 | 30 % | 7 % | 0 % | 34 %/35 %/31 % | — | — |
| `african-elephant-portrait` | 5864 | 0.54 | 0.29 | 8 % | 12 % | 24 % | 34 %/34 %/32 % | sí | monocroma, altas luces 24 % |
| `giraffes-open-savannah` | 5914 | 0.56 | 0.19 | 30 % | 3 % | 4 % | 34 %/35 %/31 % | — | — |
| `tarangire-baobab` | 6109 | 0.54 | 0.30 | 26 % | 20 % | 13 % | 33 %/36 %/31 % | — | altas luces 13 % |
| `zanzibar-nungwi` | 6285 | 0.33 | 0.35 | 35 % | 53 % | 4 % | 33 %/36 %/32 % | — | — |
| `flamingos-tanzania-lake` | 6537 | 0.48 | 0.16 | 13 % | 10 % | 1 % | 33 %/33 %/33 % | — | apagada (13 %) |

## Dónde se usa cada una, y con qué derechos

| Fotografía | Sección | Recorte servido | Origen | Archivo original | Uso comercial | Autoría |
| --- | --- | --- | --- | --- | --- | --- |
| `tanzania-wildlife-sunset-hero` | Private journeys through Tanzania | escritorio 1449×857 · móvil 393×810 | Cliente | `x-X4.jpg` | Confirmados | Sin confirmar |
| `savannah-acacia-sunset` | Your story in Tanzania starts here. | escritorio 1512×708 · móvil 410×669 | Cliente | `image-X4-16.jpg` | Confirmados | Sin confirmar |
| `zanzibar-dhow-sunset` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 2.0 | — |
| `serengeti-sunset` | Three ways to travel Tanzania | escritorio 687×394 · móvil 371×260 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `safari-tent-accommodation` | Journeys worth remembering | escritorio 112×112 · escritorio 0×0 · móvil 0×0 · móvil 328×409 | Cliente | `image-X4-8.jpg` | Confirmados | Sin confirmar |
| `leopard-in-tree` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Cliente | `image-X4-4.jpg` | Confirmados | Sin confirmar |
| `kilimanjaro-kibo` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY 2.0 | — |
| `lion-open-savannah` | Three ways to travel Tanzania | escritorio 687×394 · móvil 371×260 | Cliente | `image-X4-6.jpg` | Confirmados | Sin confirmar |
| `antelope-herd-grasslands` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Cliente | `image-X4.jpg` | Confirmados | Sin confirmar |
| `balloon-serengeti` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 2.0 | — |
| `flamingo-flock-in-motion` | Let’s design your journey | escritorio 435×290 · móvil 0×0 | Cliente | `image-X4-12.jpg` | Confirmados | Sin confirmar |
| `maasai-boma-warm` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `ngorongoro-zebras` | How do you want to experience Tanzania? | escritorio 321×321 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `serengeti-plains` | Find your place in Tanzania | escritorio 527×297 · móvil 350×197 | Commons (provisional) | `—` | CC BY-SA 3.0 | — |
| `giraffe-oxpecker-birds` | Three ways to travel Tanzania | escritorio 687×394 · móvil 371×260 | Cliente | `image-X4-19.jpg` | Confirmados | Sin confirmar |
| `ngorongoro-crater` | Journeys worth remembering | escritorio 806×605 · escritorio 0×0 · móvil 0×0 · móvil 328×409 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `african-elephant-portrait` | ‘Maisha’ means life. | escritorio 640×704 · móvil 350×297 | Cliente | `image-X4-14.jpg` | Confirmados | Sin confirmar |
| `giraffes-open-savannah` | Your journey, in trusted hands | escritorio 554×369 · móvil 371×209 | Cliente | `image-X4-3.jpg` | Confirmados | Sin confirmar |
| `tarangire-baobab` | One country. Endless ways to feel alive. | escritorio 1440×696 · móvil 390×868 | Commons (provisional) | `—` | CC BY 4.0 | — |
| `zanzibar-nungwi` | Journeys worth remembering | escritorio 112×112 · escritorio 0×0 · móvil 0×0 · móvil 328×409 | Commons (provisional) | `—` | CC BY-SA 4.0 | — |
| `flamingos-tanzania-lake` | How do you want to experience Tanzania? | escritorio 321×428 · escritorio 0×0 · móvil 0×0 · móvil 289×385 | Cliente | `image-X4-1.jpg` | Confirmados | Sin confirmar |

## Discordantes que quedan por resolver

Ninguna.

## Marcadas por el umbral y aceptadas a propósito

Un umbral no distingue un atardecer de un error de color.

- `tanzania-wildlife-sunset-hero` (muy cálida (2250 K), saturada (68 %)) — Es un atardecer, y es el hero. Cálida y saturada es la dirección buscada, no un defecto.
- `savannah-acacia-sunset` (muy cálida (2264 K), saturada (63 %)) — Atardecer. Igual que el hero.
- `zanzibar-dhow-sunset` (saturada (43 %)) — Atardecer sobre el mar.
- `safari-tent-accommodation` (saturada (63 %)) — Hora dorada dentro de una tienda: la luz es esa.
- `lion-open-savannah` (saturada (43 %)) — Igual: sabana seca a media tarde.
- `ngorongoro-zebras` (altas luces 19 %) — El 19 % de altas luces es la bruma pálida del cráter, ya desaturada. Comprimirla más aplastaría el fondo.
- `serengeti-plains` (saturada (45 %)) — Ya armonizada; el 45 % restante es hierba verde de verdad.
- `african-elephant-portrait` (monocroma, altas luces 24 %) — Blanco y negro DELIBERADO: va sola en «‘Maisha’ significa vida», sin ninguna fotografía en color al lado con la que chocar. Las otras monocromas, que sí convivían con fotografías en color, se han retirado.
- `tarangire-baobab` (altas luces 13 %) — Ya armonizada: de 38 % a 13 % de altas luces.
- `flamingos-tanzania-lake` (apagada (13 %)) — Ya armonizada, de 9.128 K a 7.422 K. Más allá, el agua deja de ser agua.

## Repeticiones

Ninguna fotografía se repite en dos secciones de la portada.
