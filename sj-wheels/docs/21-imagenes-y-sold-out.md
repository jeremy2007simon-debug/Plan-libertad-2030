# 21 · «Sold out» y las fotografías repetidas

**Fecha:** 21-09-2026 · **Tema corregido:** «SJ Wheels — DEV (no publicar)» (`196061626701`).
Tema publicado (Horizon, `196025975117`): **sin tocar**. Contraseña: **activada**.
Precios: **bajo consulta**. Compra: **bloqueada**.

---

## 0. Qué tema estabas mirando

Casi con seguridad **Horizon MAIN, el tema publicado**, no SJ Wheels — DEV. Tres indicios:

1. **La tienda está en inglés.** El idioma principal de la tienda es `en`
   (`shopLocales`: `en` primary, `es` publicado como secundario). Por eso el
   storefront dice «Sold out» y no «Agotado»: no es el tema, es el idioma por
   defecto de la tienda. Esto afecta también a DEV.
2. **La portada de Horizon MAIN** es la de fábrica: un hero que dice
   *«Browse our latest products»* con un botón *«Shop all»*, y debajo una
   rejilla `product-list` de la colección `all` limitada a **8 productos**.
3. **Esos 8 primeros productos** de `all` son **6 referencias de SJW-038 y 2 de
   SJW-040**. SJW-038 tiene una sola fotografía para sus seis medidas, así que
   la rejilla muestra **seis tarjetas con la misma foto** y todas con «Sold out».
   Es exactamente lo que describiste.

La portada de DEV no se parece a eso: lleva «Diez diseños, 83 referencias»,
el selector de vehículo y las secciones de SJ Wheels.

**Enlace exacto del tema corregido:**
`https://5y82gi-yt.myshopify.com/?preview_theme_id=196061626701`
(mejor: Admin → Tienda online → Temas → «SJ Wheels — DEV (no publicar)» → Vista previa).

---

## 1. «Sold out» → «Consultar disponibilidad»

El bloqueo de compra **no se ha tocado**: las 83 variantes siguen con inventario
seguido, 0 unidades y política «dejar de vender». No se ha añadido stock ficticio
ni se ha activado «seguir vendiendo sin existencias». Lo que cambia es el texto.

**Cómo se distingue** una referencia bajo consulta de un artículo realmente
agotado: por el **estado comercial explícito del producto**, el metafield
`custom.availability_status`. Si existe, es venta bajo consulta. Si no existe,
el producto está agotado de verdad y se conserva el texto original de Horizon.
No se oculta ningún indicador por CSS.

| Dónde | Antes | Ahora | Archivo |
|---|---|---|---|
| Distintivo de la tarjeta (colecciones, portada, recomendados, resultados de búsqueda) | «Sold out» / «Agotado» | «Consultar disponibilidad» | `blocks/_product-card-gallery.liquid` |
| Precio en tarjeta, colección, buscador y búsqueda predictiva | — | «Precio bajo consulta» + «Consultar disponibilidad» | `snippets/price.liquid` |
| Botón de la ficha | botón apagado «Agotado» | «Solicitar precio y compatibilidad» | `snippets/add-to-cart-button.liquid` → `sjw-solicitar-precio` |
| Panel de estado de la ficha | — | «Consultar disponibilidad y compatibilidad» con sus motivos | `snippets/sjw-consultar-disponibilidad.liquid` |
| Barra fija de compra | oculta por CSS, y con «Agotado» debajo | se muestra, con «Solicitar precio y compatibilidad» | `sections/product-information.liquid` |
| Compra rápida en tarjeta | «Sold out» | no se pinta (Horizon solo la muestra si el producto está disponible) | `snippets/quick-add.liquid` (sin cambios) |

**Textos en `locales/`.** Se ha añadido el grupo `sjw.disponibilidad` a
`locales/es.json` y `locales/en.default.json`, con las 19 claves nuevas
(`badge`, `estado`, `cta`, `precio_consulta`, `aviso_compra`, los cinco
`motivo_*`, `peso_pendiente`, `peso_nota`, `acabado_titulo`, `acabado_nota`,
`sku`, `contenido_titulo`, `contenido_pendiente`, `confirmacion_titulo`,
`confirmacion_cuerpo`, `imagen_referencia`). De paso, los textos que en la
entrega anterior estaban escritos a fuego dentro de los snippets de SJ Wheels
han pasado a esas claves.

Los dos archivos de idioma se han reescrito completos para insertar el bloque
(Shopify no permite añadir claves sueltas). Shopify ha validado el JSON y el
tamaño crece exactamente lo que ocupa el bloque nuevo (+1.889 bytes en `es`,
+1.762 en `en`), pero conviene que des un vistazo al editor de idiomas del
admin.

**Corrección a lo que te dije en la entrega anterior.** Afirmé que los datos
estructurados no publicaban ningún precio. No era del todo cierto:
`sections/product-information.liquid` emitía además el
`{{ product | structured_data }}` automático de Shopify, que sí declara un
`Offer` con precio y disponibilidad. Ahora solo se emite cuando el tema está en
modo de precios visibles.

---

## 2. Las fotografías

### Qué he comprobado

1. **Imágenes asignadas hoy en Shopify** a cada uno de los 83 productos.
2. **Imágenes originales del propietario**, tomadas de
   `data/auditoria-productos-publicacion-inicial.csv`, que es el volcado del
   catálogo **anterior a cualquier cambio mío**.
3. **Correspondencia SKU → diseño → acabado → archivo.**
4. **Contenido real de los 83 archivos**: descargados de la CDN y comparados por
   huella SHA-256.

### Qué he encontrado

**Tus imágenes están intactas.** Las 83 URLs asignadas hoy son exactamente las
83 de la auditoría inicial, una por producto, ninguna repetida como archivo, y
el nombre de cada archivo (`wheel-design-0NN_…png`) coincide con la familia del
producto en los 83 casos. **No se ha alterado ninguna asignación.**

**Tampoco hay un fallo del tema**: no hay imagen fija, ni fallback, ni error de
contexto Liquid. La tarjeta pinta `product.featured_media`, que es la que tiene
asignada cada producto.

**Lo que pasa de verdad:** los 83 archivos contienen **solo 10 imágenes
distintas, una por diseño**. El proveedor entregó una sola fotografía por
diseño, y al cargar el catálogo se subió una copia de ese archivo a cada
producto de la familia. Por eso dentro de una familia todas las referencias
enseñan la misma foto.

| Huella | Productos | Familia |
|---|---|---|
| `e0b4f4cf` | 13 | SJW-041 |
| `854d01e2` | 12 | SJW-074 |
| `ff18768f` | 9 | SJW-040 |
| `0f812671` | 9 | SJW-044 |
| `57ee08dc` | 8 | SJW-043 |
| `fc32acc6` | 8 | SJW-059 |
| `de7d7427` | 7 | SJW-048 |
| `95aad111` | 7 | SJW-049 |
| `8482ae5d` | 6 | SJW-038 |
| `73ff3b57` | 4 | SJW-124 |

**Ningún par de diseños distintos comparte fotografía.** Los diez son
visualmente diferentes; se ven uno al lado de otro en
`docs/img/diez-disenos.png`.

Lo que sí se repite es dentro de una misma familia:
`docs/img/sjw-041-trece-referencias.png` muestra las 13 referencias de SJW-041
con la misma imagen, aunque sus códigos de acabado son MB, MBI y MIB.

### Qué he hecho con eso

Compartir imagen dentro de una familia es legítimo **cuando representa
fielmente el diseño**, y ese es el caso: el diseño es el mismo. Lo que no
representa fielmente es el **acabado**. Así que cada diferencia queda
identificada, referencia a referencia:

| Resultado | Referencias |
|---|---|
| Correcta (fotografía del acabado de esa referencia) | 45 |
| Correcta, pero es un render 3D y no una fotografía | 15 |
| **Referencia de otro acabado** (fotografía) | 14 |
| **Referencia de otro acabado** (render 3D) | 9 |

Las 23 de «otro acabado» y las 24 de render ya lo dicen en su descripción, con
el código del acabado retratado y el de la referencia. Hoja de control completa,
con las 83 filas: **`data/control-imagenes-83.csv`** (SKU, familia, handle,
código de acabado, archivo, huella, URL asignada, texto alternativo, origen de
la correspondencia y resultado).

### Lo que falta, y qué SKU

**No falta ninguna correspondencia**: los 83 productos tienen imagen y esa
imagen es la de su diseño. Lo que falta es **material**: el proveedor no ha
enviado una fotografía por acabado.

Para cerrarlo hacen falta **7 fotografías nuevas**, una por cada combinación de
diseño y acabado no retratada:

| Diseño | Acabado sin fotografía propia | SKU afectados |
|---|---|---|
| SJW-038 | YBZ | OYL260416097 |
| SJW-040 | MG | OYL260416106, 107, 108, 110 |
| SJW-041 | MB | OYL260416115, 116, 120, 121, 122, 123 |
| SJW-041 | MIB | OYL260416124, 125 |
| SJW-044 | MG | OYL260416145 |
| SJW-059 | MB | OYL260416205, 206 |
| SJW-074 | B | OYL260416283, 285, 289, 290, 291, 292, 293 |

Y **3 diseños completos** (SJW-059, SJW-074, SJW-124, 24 referencias) siguen con
render 3D en lugar de fotografía.

No he generado ninguna imagen, no he recoloreado ninguna, no he borrado ningún
archivo y no he asignado nada por parecido.

---

## 3. Verificación

**Comprobado con datos reales:**

| Comprobación | Resultado |
|---|---|
| Productos activos | 83 |
| Imágenes asignadas hoy = imágenes originales del propietario | 83 de 83 |
| Nombre de archivo coincide con la familia | 83 de 83 |
| Archivos distintos entre sí | 83 (ninguno duplicado como archivo) |
| Imágenes distintas por contenido | 10, una por diseño |
| Diseños distintos que comparten fotografía | **0** |
| Productos sin imagen | 0 |
| Productos con más de una imagen | 0 |
| `availableForSale` | `false` en las 83 |
| Precios guardados | sin cambios |
| Archivos del tema subidos | 8, sin errores |
| Equilibrio de etiquetas Liquid | correcto en los archivos editados |

**No comprobado, y por qué:** el render real en colección y ficha, en móvil y en
escritorio. La tienda sigue protegida por contraseña —como pediste— y la Admin
API no la expone, así que desde aquí `/` responde `302 → /password`. He
verificado el dato y el código; el píxel tienes que verlo tú, con el enlace de
arriba.

## 4. Dos cosas que decide el propietario

1. **El idioma principal de la tienda es el inglés.** Mientras siga así, un
   visitante sin preferencia verá la tienda en inglés, con el catálogo en
   castellano dentro. Se cambia en Admin → Configuración → Idiomas.
2. **La portada de Horizon MAIN** sigue siendo la de fábrica, en inglés y con
   ocho productos de la colección `all`. Es lo que ve cualquiera que entre sin
   el parámetro de vista previa.
