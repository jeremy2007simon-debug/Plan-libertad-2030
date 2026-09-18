# SJ Wheels — Fase 0: Auditoría técnica

**Fecha:** 2026-09-18
**Tienda:** `5y82gi-yt.myshopify.com` — nombre actual "My Store 2"
**Plan:** Basic · **Moneda:** EUR · **Zona horaria:** Atlantic/Canary · **País:** España
**Contacto:** novacoretenerife@gmail.com · Dirección fiscal declarada: 38611 Granadilla, Santa Cruz de Tenerife

---

## 1. Resumen del estado actual

La tienda está en un estado **pre-lanzamiento**: catálogo importado, tema sin tocar, contenido sin
escribir. No hay nada que "rescatar" a nivel de tema, y sí mucho que corregir a nivel de datos.

| Área | Estado |
|---|---|
| Tema | **Horizon** (theme store ID 2481), rol `MAIN`, **100 % por defecto** — 0 archivos personalizados |
| Arquitectura | Online Store 2.0 + **theme blocks** (Horizon), 13 plantillas JSON, 43 sections, 143 snippets |
| Productos | **440** (439 catálogo + 1 producto de prueba) |
| Estado productos | **439 en DRAFT**, **1 en ACTIVE** (y es el de prueba) |
| Colecciones | 9 — 8 por diámetro + "Home page". **Todas manuales, sin reglas automáticas** |
| Metafield definitions | **0** |
| Metaobject definitions | **0** |
| Páginas | **1** ("Contact") |
| Blog | "News", **0 artículos** |
| Políticas | **Solo Política de Privacidad**, autogenerada por Shopify, **en inglés** |
| Idiomas | **Solo `en` (inglés)** como idioma principal y publicado — todo el contenido está en español |
| Mercados | 1 — "Spain" (ES), activo |
| Pagos | **Ningún proveedor configurado** (`supportedDigitalWallets: []`) |
| Envíos | Perfil general con 3 zonas: España / UE / Internacional |
| Ubicaciones | 1 — "Shop location", España, sin ciudad |
| Apps | Shopify Messaging (Inbox), **DSers-AliExpress Dropshipping**, Shopify Claude Connector |
| Storefront | **Protegido por contraseña** (no público) |
| Código personalizado | Ninguno. Sin app embeds, sin theme app extensions |

**Copia de trabajo creada:** tema `SJ Wheels — DEV (no publicar)`
(`gid://shopify/OnlineStoreTheme/196061626701`, rol `UNPUBLISHED`).
Todo el desarrollo irá contra esta copia. El tema `MAIN` no se toca.

---

## 2. Problemas encontrados

Ordenados por gravedad. **P1 = bloquea el lanzamiento.**

### P1-A — No existe ningún dato técnico estructurado

Las 15 especificaciones que necesita la tienda (diámetro, anchura, PCD, ET, buje, acabado, peso,
unidades, etc.) **no existen como datos**. Están únicamente en dos sitios frágiles:

1. Dentro del `descriptionHtml`, como una lista `<ul><li><strong>Medida:</strong> 20X10</li>…`
2. En etiquetas: `5x112`, `et-46`, `llantas-20`, `color-mb`, `bmw`

Consecuencia directa: sin metafields **no se puede** construir el panel técnico, ni los filtros
por medida, ni el comparador, ni el motor de compatibilidad, ni datos estructurados correctos.
Cualquier intento de leerlo parseando HTML es exactamente lo que el encargo prohíbe.

### P1-B — No existe una base de compatibilidad fiable

El único dato de compatibilidad es una línea de texto libre heredada del proveedor, **sin traducir
y en muchos casos en chino**:

- `BMW 540i-2025(加拿大版)/改`  → "versión Canadá / modificado"
- `VW高尔夫GTI / 改`             → "Golf GTI / modificado"
- `VW西雅特Seat Cupra/改`        → "Seat/Cupra / modificado"
- `BENZ GLS/GLE 450豪华版-2025`  → "versión lujo"

Las propias descripciones la califican de **"Compatibilidad orientativa"**. El carácter `改`
indica pieza de modificación, no equipo original. **Esto no permite afirmar compatibilidad a
ningún cliente.** Las etiquetas de marca (`bmw`, `audi`…) tampoco: son la marca del vehículo del
proveedor, no una relación verificada marca/modelo/generación/año/motorización.

Cobertura de etiquetas de marca (439 productos, exactamente una marca cada uno):

| Marca | Productos |
|---|---|
| BMW | 177 |
| Mercedes-Benz | 145 |
| Audi | 79 |
| Volkswagen | 28 |
| `vehículos-europeos` (genérico) | 10 |

Nota: las descripciones mencionan Seat y Cupra, pero **no existen** como etiqueta de marca.

### P1-C — El único producto visible es un producto de prueba con afirmaciones no verificadas

`Llanta deportiva de aleación 6x139.7 para SUV y 4x4`
(`gid://shopify/Product/10895724151117`) — vendor **"Proveedor de prueba"**, **0 imágenes**,
y es **el único producto ACTIVE** y el único de la colección "Home page".

Su descripción contradice todo el modelo de negocio y contiene afirmaciones que no podemos
sostener:

- *"Precio por unidad, no por juego"* — contradice "juego de 4"
- *"Fabricadas según normas internacionales de seguridad: ISO, VIA, CE, TÜV y DOT"*
- *"Garantía de 1 año contra defectos de pintura"*
- Etiquetas `homologadas`, `oem`

**Recomendación:** archivar este producto. No lo toco sin autorización (regla 9).

### P1-D — Sin proveedor de pagos

`paymentSettings.supportedDigitalWallets` está vacío y no hay cuenta de Shopify Payments.
El encargo pide mostrar **"métodos de pago reales"** en footer, ficha y carrito. Hoy no hay
ninguno que mostrar: pintarlos sería inventarlos. Bloquea el lanzamiento comercial.

### P1-E — Idioma de la tienda mal configurado

El único idioma publicado es **inglés**. Todo el contenido real está en español. Esto hace que
Shopify sirva `<html lang="en">` sobre contenido español: penaliza SEO, rompe lectores de
pantalla y descuadra los textos del tema (que se sirven desde `locales/en.default.json`).
Debe ser español primario, con inglés preparado como secundario.

### P1-F — Políticas legales ausentes o inservibles

Solo existe la Política de Privacidad, autogenerada, **en inglés**, firmada como "My Store 2".
Faltan: términos, reembolso/devoluciones, envíos, aviso legal, política de cookies.

Para una tienda con sede en Canarias que vende a Península, UE y terceros países, esto es
territorio de riesgo real (IGIC vs IVA, aduanas, plazos, desistimiento). **No voy a redactar
condiciones legales inventadas**: las marcaré como pendientes de revisión.

### P2-A — Acabados inutilizables como faceta

Los acabados son códigos internos del proveedor, mezclados con nombres en inglés y con valores
corruptos. Muestra real de valores encontrados:

```
mb · b · mg · miyb · s · mbi · p · smh · mib · myb · cb · ms · ybz · g · w · sgmf
mb+l · mb+b · mb+x · b+p · mbi+c · miyb+r · mg-d · gmf+chromeinsert
"matte black" · "matt gunmetal machine" · "matt black machined"
color-          ← vacío (2 productos)
```

Más de 25 valores distintos para lo que en realidad son unos 6–8 acabados comerciales.
Necesita una **tabla de traducción código → acabado comercial**, que solo puede validar el
propietario.

### P2-B — Datos corruptos en etiquetas

- `et-实际38打印42` — literalmente "ET real 38, impreso 42". Etiqueta contaminada.
- `et-48.5` — decimal, rompe cualquier filtro numérico entero.
- `color-` — vacío.

### P2-C — Imágenes: calidad insuficiente para una tienda premium

- **1 sola imagen por producto** (439 de 440). Un producto con 0.
- Resoluciones bajas y **relación de aspecto variable**: 888×849, 625×592, 513×476, 641×595.
- **La misma imagen se reutiliza en varios productos** (p. ej. `wheel-design-126` aparece en el
  juego de 21" y en el de 22"; `wheel-design-129` en el de 18" y el de 19").
- Formato PNG sobre fondo, no fotografía de producto.

Con este material no existe "galería premium", ni imagen secundaria al pasar el ratón, ni zoom
útil. Es el mayor riesgo para el objetivo visual del proyecto.

### P2-D — SEO duplicado y contaminado

Los `title_tag` y `description_tag` se generan por plantilla, así que **se repiten entre
productos**: `Llantas 20" BMW | Juego de 4` aparece en decenas de fichas. Y las meta
descripciones arrastran el chino del proveedor:

> `…compatible de forma orientativa con BMW 540i-2025(加拿大版)/改. Precio cerrado…`

### P2-E — Precios por tramo de diámetro

Todos los precios siguen una escala fija por diámetro: 699 / 799 / 899 / 999 / 1099 / 1249 / 1399 €.
Ni un solo `compareAtPrice`. Parece precio calculado, no precio de proveedor. **No lo modifico**
(regla 9), pero conviene confirmar que es intencional antes de abrir la tienda.

### P2-F — Inventario y colecciones

- `tracksInventory: false` + `inventoryPolicy: CONTINUE` → todo vendible siempre, sin control.
  Coherente con "bajo pedido", pero exige que el plazo de entrega sea explícito y honesto.
- Las 8 colecciones por diámetro son **manuales**: cada producto nuevo habrá que añadirlo a mano.
  Deberían ser automáticas por metafield/etiqueta.
- Colección `frontpage` contiene únicamente el producto de prueba.

### P3 — Menor

- Menús por defecto en inglés (Home / Catalog / Contact).
- Dos métodos de envío con el mismo nombre "Estándar" en la zona España.
- La ubicación no tiene ciudad.
- Sin Shopify Search & Discovery instalado → sin filtros por metafield en colección.
- Nombre de la tienda sigue siendo "My Store 2".
- `vendor` = "NovaCore" en todo el catálogo: es el titular, no la marca de la llanta. No hay marca
  de llanta en ningún sitio, así que el menú "Marcas" solo puede ser **marcas de vehículo**.

---

## 3. Arquitectura propuesta

### 3.1 Tema

Trabajar **sobre Horizon**, no sustituirlo. Razones: es OS 2.0 con theme blocks, ya trae de serie
carrito drawer, búsqueda predictiva, facetas, galería con zoom, sticky add-to-cart, vistos
recientemente y view transitions. Reescribirlo desde cero tiraría todo eso a la basura y
multiplicaría el riesgo de rendimiento.

La personalización se hace **por adición**, con prefijo `sjw-`, para no chocar nunca con una
actualización de Horizon:

```
assets/sjw-tokens.css          Design tokens (paleta, espaciado, tipografía, motion)
assets/sjw-components.css      Botones, tarjetas, badges de compatibilidad, panel técnico
assets/sjw-garage.js           Estado del vehículo guardado (localStorage + eventos)
assets/sjw-fitment.js          Motor de evaluación de compatibilidad
assets/sjw-compare.js          Comparador (hasta 3)
blocks/sjw-*.liquid            Bloques nuevos (selector, estado, panel técnico, WhatsApp…)
sections/sjw-*.liquid          Secciones nuevas (hero con selector, cómo funciona, guía…)
snippets/sjw-*.liquid          Utilidades compartidas
locales/es.default.json        Español como idioma base del tema
```

Ningún archivo original de Horizon se borra. Los que haya que tocar (`layout/theme.liquid`,
`templates/*.json`, `config/settings_schema.json`) se modifican de forma mínima y aditiva.

### 3.2 Datos de compatibilidad

Una sola fuente de verdad, en Shopify, sin base de datos externa para el MVP:

- **Metaobject `vehicle`** — un registro por combinación marca/modelo/generación/años/motor, con
  sus restricciones técnicas (PCD, buje, diámetros admitidos, rango de ET).
- **Metafields de producto** — las medidas reales de cada juego de llantas.
- **Relación producto → vehículos** mediante un metafield de referencias a metaobjects.

La evaluación de compatibilidad se hace **comparando números**, no texto:

```
PCD producto        == PCD vehículo                    → obligatorio
diámetro producto   ∈  diámetros admitidos vehículo    → obligatorio
ET producto         ∈  [et_min, et_max] vehículo       → obligatorio
buje producto       >= buje vehículo                   → si es mayor, requiere centradores
```

Y los tres estados se derivan así:

| Estado | Condición |
|---|---|
| **Compatible con tu vehículo** | El producto referencia ese `vehicle` **y** las 4 comprobaciones numéricas pasan |
| **Necesita confirmación técnica** | Falta algún dato, o el producto no referencia ese vehículo pero las medidas encajan |
| **No compatible con tu vehículo** | Alguna comprobación numérica falla con datos completos |

**Por defecto, todo el catálogo arranca en "Necesita confirmación técnica"**, porque hoy no hay ni
un solo dato de compatibilidad verificado. Es la única postura honesta y es exactamente lo que
pide el encargo.

### 3.3 Escalado futuro (no MVP)

Cuando la base de vehículos crezca: app privada + Theme App Extension + App Proxy
(`/apps/fitment/lookup`) con caché. El tema quedará preparado para que solo haya que cambiar el
origen de datos del módulo `sjw-fitment.js`, sin rehacer nada más.

---

## 4. Metafields y metaobjects necesarios

Ninguno existe hoy — **no hay riesgo de duplicado**, se crean todos desde cero.

### Metaobject `vehicle`

| Campo | Tipo | Notas |
|---|---|---|
| `make` | single_line_text_field | Obligatorio |
| `model` | single_line_text_field | Obligatorio |
| `generation` | single_line_text_field | p. ej. "F30", "B9" |
| `year_start` | number_integer | Obligatorio |
| `year_end` | number_integer | Vacío = en producción |
| `engine` | single_line_text_field | Solo si afecta a la compatibilidad |
| `body_type` | single_line_text_field | Berlina, familiar, SUV… |
| `bolt_pattern` | single_line_text_field | Formato normalizado `5x112` |
| `center_bore` | number_decimal | mm |
| `allowed_diameters` | list.number_integer | p. ej. [17,18,19] |
| `et_min` | number_integer | |
| `et_max` | number_integer | |
| `notes` | multi_line_text_field | |
| `verification_status` | single_line_text_field | `verified` / `pending` / `unverified` |

### Metafields de producto (namespace `custom`)

| Clave | Tipo | Origen del dato |
|---|---|---|
| `bolt_pattern` | single_line_text_field | Migrable desde etiqueta `5x112` |
| `center_bore` | number_decimal | Migrable desde descripción |
| `wheel_diameter` | number_integer | Migrable desde etiqueta `llantas-20` |
| `wheel_width` | number_decimal | Migrable desde descripción ("20X10") |
| `offset_et` | number_integer | Migrable desde etiqueta `et-46` |
| `offset_et_min` | number_integer | **Sin dato** |
| `offset_et_max` | number_integer | **Sin dato** |
| `load_rating` | number_integer | **Sin dato** |
| `finish` | single_line_text_field | Requiere tabla de traducción del propietario |
| `compatible_vehicles` | list.metaobject_reference → `vehicle` | **Sin dato** |
| `requires_manual_verification` | boolean | Por defecto `true` en todo el catálogo |
| `units_per_set` | number_integer | `4` para todo el catálogo |
| `tires_included` | boolean | `false` para todo el catálogo |
| `bolts_included` | boolean | `false` para todo el catálogo |
| `estimated_delivery` | single_line_text_field | Migrable ("Canarias 25–30 días") |
| `compatibility_notes` | multi_line_text_field | **Traducir del chino antes de usar** |

**Lectura importante:** de los 16 metafields, **7 son migrables automáticamente** desde los datos
actuales, **5 se rellenan con un valor constante**, y **4 no tienen ningún dato de origen**.

---

## 5. Inventario de datos que faltan

Esto es lo que necesito del propietario. Sin ello, la tienda funciona pero se queda en
"Necesita confirmación técnica" de forma permanente.

| # | Dato que falta | Bloquea |
|---|---|---|
| 1 | Tabla acabado: `mb`, `mg`, `miyb`, `b`, `p`, `s`… → nombre comercial | Faceta de acabado, comparador, ficha |
| 2 | Base de vehículos reales (marca/modelo/generación/años/PCD/buje/ET) | Estado "Compatible" |
| 3 | Qué productos son realmente compatibles con qué vehículos | Estado "Compatible" |
| 4 | Traducción de las compatibilidades en chino | `compatibility_notes` |
| 5 | Anchuras de llanta trasera (¿hay configuraciones escalonadas?) | Panel técnico |
| 6 | Carga soportada (kg por llanta) | Panel técnico, seguridad |
| 7 | Número de WhatsApp real | Todos los CTA de WhatsApp |
| 8 | Proveedor de pagos activo | Iconos de pago reales |
| 9 | Plazos reales: Canarias / Península / UE | Ficha, carrito, página de envíos |
| 10 | Régimen fiscal: IGIC/IVA, quién paga aduana en Península | Precios, política de envíos |
| 11 | Condiciones de devolución reales | Política de reembolso |
| 12 | Garantía real ofrecida | Ficha, página de garantía |
| 13 | ¿Existen homologaciones/certificados? | El producto de prueba los afirma **sin respaldo** |
| 14 | Redes sociales reales | Footer |
| 15 | Fotografía de producto de calidad | Toda la dirección visual |
| 16 | Razón social, CIF/NIF, domicilio | Aviso legal |

---

## 6. Funciones que requieren una app personalizada

Nada del MVP la requiere. Se puede construir todo dentro del tema. La necesitarán, más adelante:

- Base de compatibilidad de miles de vehículos (el índice en cliente dejaría de ser viable).
- Registro persistente de búsquedas sin resultados (en MVP: solo evento de analítica).
- Aviso de reposición con envío de correo.
- Favoritos sincronizados entre dispositivos (en MVP: localStorage).
- Preguntas y respuestas en producto.

---

## 7. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| **Un cliente compra una llanta que no encaja** | Muy alto | Todo arranca en "Necesita confirmación técnica". Nunca se dice "Compatible" sin las 4 comprobaciones numéricas. Confirmación obligatoria antes de añadir al carrito, guardada como propiedad de línea |
| **Las imágenes no dan el nivel premium** | Alto | Encuadre uniforme por CSS + relación de aspecto fija. Aun así, se necesita fotografía nueva |
| **Los acabados no se pueden filtrar** | Medio | La faceta de acabado queda oculta hasta tener la tabla de traducción |
| **Afirmaciones legales/técnicas sin respaldo** | Alto | El producto de prueba se propone archivar. No se escribe ninguna certificación, garantía ni homologación no confirmada |
| **Fiscalidad Canarias/Península** | Alto | Todo el texto fiscal queda marcado `[PENDIENTE DE REVISIÓN]` hasta confirmación |
| **Actualización futura de Horizon** | Medio | Prefijo `sjw-` y cambios aditivos. Ningún archivo de Horizon se reescribe por completo |
| **Peso de JS del selector de vehículo** | Medio | Índice JSON servido aparte, carga diferida, sin librerías externas |

---

## 8. Decisiones pendientes del propietario

1. **Producto de prueba** (`Proveedor de prueba`, 6x139.7): ¿archivar? Es el único visible y afirma
   certificaciones sin respaldo.
2. **Activar el catálogo**: 439 productos están en DRAFT. ¿Se publican al terminar el tema, o por
   fases?
3. **Idioma**: confirmar el cambio de idioma principal de inglés a español.
4. **Nombre de la tienda**: "My Store 2" → "SJ Wheels".
5. **Marcas**: confirmar que "Marcas" significa **marcas de vehículo** (BMW, Audi…), ya que no hay
   dato de marca de llanta en ninguna parte.
6. **Precios**: confirmar que la escala por diámetro (699–1399 €) es intencional.
7. **Política de venta con compatibilidad pendiente**: ¿se permite comprar sujeto a verificación,
   o solo se permite consultar?
