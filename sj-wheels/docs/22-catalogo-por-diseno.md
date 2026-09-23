# 22 · Un producto por diseño

21-09-2026. Reorganización del catálogo de SJ Wheels: las 83 referencias que
estaban publicadas como 83 fichas independientes pasan a ser **diez productos,
uno por diseño**, con sus medidas y configuraciones seleccionables dentro de la
ficha. Es una reorganización del catálogo, no una reducción de existencias: no
se ha eliminado ni una sola referencia y las 83 siguen ahí, ahora como variantes.

**Tema:** SJ Wheels — DEV (no publicar) · `196061626701` · sigue sin publicar.
**Vista previa:** `https://5y82gi-yt.myshopify.com/?preview_theme_id=196061626701`

---

## 1. Los diez productos

| Diseño | Variantes | Diámetros | Acabados | Precio guardado | Ficha |
|---|---|---|---|---|---|
| SJW-038 | 6  | 17"–21" | MB+L, YBZ     | 699 – 1.099 € | `/products/sjw-038` |
| SJW-040 | 9  | 18"–20" | MB, MG        | 799 – 999 €   | `/products/sjw-040` |
| SJW-041 | 13 | 18"–20" | MB, MBI, MIB  | 799 – 999 €   | `/products/sjw-041` |
| SJW-043 | 8  | 18"–21" | MB            | 799 – 1.099 € | `/products/sjw-043` |
| SJW-044 | 9  | 19"–22" | MB, MG        | 899 – 1.249 € | `/products/sjw-044` |
| SJW-048 | 7  | 19"–20" | MB            | 899 – 999 €   | `/products/sjw-048` |
| SJW-049 | 7  | 20"–21" | MB            | 999 – 1.099 € | `/products/sjw-049` |
| SJW-059 | 8  | 19"–20" | B, MB         | 899 – 999 €   | `/products/sjw-059` |
| SJW-074 | 12 | 18"–20" | B, MB         | 799 – 999 €   | `/products/sjw-074` |
| SJW-124 | 4  | 19"–20" | MG            | 899 – 999 €   | `/products/sjw-124` |

**83 variantes en total.** Coinciden una a una con las 83 referencias
anteriores: ni sobra ni falta ninguna, no hay SKU duplicados y no se ha
excluido ninguna referencia. La correspondencia completa está en
`data/mapa-migracion-83.csv`, con el producto y la variante de origen y de
destino de cada SKU.

Los precios son los que ya estaban guardados; no se ha tocado ninguno y
ninguno se muestra: la ficha sigue diciendo «Precio bajo consulta».

## 2. Cómo se eligen las medidas

Shopify admite tres opciones por producto y hasta 2.048 variantes. Seis
atributos (diámetro, anchura, anclaje, ET, buje y acabado) no caben como seis
opciones independientes, así que se agrupan en tres opciones compuestas:

| Opción | Ejemplo |
|---|---|
| **Medida**  | `19 × 8,5"` |
| **Montaje** | `5x112 · ET35 · Buje 66,6 mm` |
| **Acabado** | `Cód. proveedor MB` |

Se comprobó antes de definir la estructura que esas tres opciones producen
tripletas únicas en las diez familias: **cero colisiones**. La familia más
grande tiene 13 variantes, muy lejos del límite.

El buje viaja dentro de «Montaje» porque no varía de forma independiente: en
este catálogo va siempre atado al anclaje (5x112 → 66,5 mm; 5x120 → 72,6 mm),
salvo las pequeñas diferencias de redondeo del proveedor (66,45 / 66,5 / 66,56
y 72,5 / 72,56 / 72,6), que se conservan tal cual en lugar de unificarlas.

**Solo se crearon las combinaciones que existen.** El payload de `productSet`
lleva las variantes una a una, nunca el producto cartesiano de los valores:
SJW-043 tiene 8 valores de Medida × 5 de Montaje × 1 de Acabado = 40
combinaciones posibles y solo 8 variantes reales.

### El selector

`snippets/sjw-variant-picker.liquid` sustituye al de Horizon por un motivo
concreto. Horizon decide qué se puede elegir con `product_option_value.available`,
que en Shopify significa «hay alguna variante con este valor que se puede
comprar». Aquí ninguna se puede comprar todavía, así que ese campo es `false`
en todo el catálogo y el selector tachaba las tres columnas enteras y las
etiquetaba como agotadas. Ese era el aviso equivocado otra vez.

El selector propio hace otra pregunta: ¿existe una variante real con este valor
y el resto de la selección actual? Recorre `product.variants` y compara
posición a posición. Lo que no existe se tacha y se anuncia como «Sin esta
combinación»; lo que existe se puede elegir con normalidad aunque no se pueda
comprar. Ninguna selección lleva a una combinación inexistente.

Se puede enlazar directamente a una variante con `?variant=<id>`, que es lo que
hacen las redirecciones.

## 3. Qué conserva cada variante

Cada una de las 83 variantes guarda, en metafields propios:

`wheel_diameter`, `wheel_width`, `bolt_pattern`, `offset_et`, `center_bore`,
`supplier_finish_code`, `requires_manual_verification`, `set_weight_estimate_kg`,
`imagen_estado`, `supplier_note` y `origen_producto` (handle, id de producto y
de variante de la ficha de la que salió).

Más su SKU original, su precio guardado y su estado de inventario.

**El motor de compatibilidad comprueba la variante elegida, no la familia.**
`snippets/sjw-product-fitment-data.liquid` publica el anclaje, el diámetro, la
anchura, el ET y el buje de la variante seleccionada y solo cae al metafield
del producto cuando la variante no trae el dato. Usar la medida de la familia
daría un veredicto falso: en SJW-048 conviven 5x112 con buje 66,5 mm y 5x120
con buje 72,6 mm dentro de la misma ficha.

Al cambiar de variante, Horizon vuelve a renderizar la sección de producto, de
modo que se actualizan a la vez la tabla técnica, la referencia, la imagen, el
estado de compatibilidad y los datos que el botón envía al formulario. El botón
«Solicitar precio y compatibilidad» viaja con `ref` (el SKU de la variante),
`variante`, `medida`, `anclaje`, `et`, `buje` y `acabado` de esa variante.

El metafield `custom.compatible_vehicles` tiene ya definición a nivel de
variante (`PRODUCTVARIANT`), que es donde deben ir los vehículos verificados.

## 4. Las fotografías

El proveedor entregó **una sola imagen por diseño**: diez archivos distintos
para diez diseños. No hay ninguna imagen genérica repetida entre diseños
diferentes, y cada producto agrupado lleva la de su diseño en portada,
colecciones, búsqueda, ficha y galería. Las imágenes son las originales, con su
proporción y su detalle; no se ha generado, recoloreado ni borrado ninguna.

Lo que falta es fotografía **por acabado**. De las 83 variantes:

- **60** muestran una imagen que corresponde a su propio código de acabado.
- **23** muestran la del acabado retratado, identificada como tal en su
  metafield `imagen_estado` y en la ficha técnica («Imagen de referencia: la
  fotografía corresponde al acabado X, no al acabado Y de esta referencia»).
- **24** de las 83 son renders 3D del proveedor, no fotografías del producto
  real (familias SJW-059, SJW-074 y SJW-124). También se dice en la ficha.

Variantes que necesitan fotografía propia, por diseño y acabado:

| Diseño | Acabado retratado | Acabados sin fotografía propia | Variantes afectadas |
|---|---|---|---|
| SJW-038 | MB+L | YBZ | 1 |
| SJW-040 | MB   | MG  | 4 |
| SJW-041 | MBI  | MB, MIB | 8 |
| SJW-044 | MB   | MG  | 1 |
| SJW-059 | B    | MB  | 2 |
| SJW-074 | MB   | B   | 7 |

Los SKU concretos están en `data/control-imagenes-83.csv`, columna
`origen_de_la_correspondencia`. SJW-043, SJW-048, SJW-049 y SJW-124 tienen un
único acabado, así que no les falta ninguna.

## 5. Descripciones

Cada diseño tiene su propia descripción en español, escrita a partir de lo que
se ve en su fotografía: distribución y forma de los radios, acabado de la cara
y del aro, aspecto del conjunto. No se repite ningún párrafo entre familias.

Después, en todas: medidas y acabados disponibles según los datos, estado de la
imagen, aviso de comprobación de compatibilidad y la nota de que SJW-NNN es una
denominación interna, no una marca ni un modelo comercial.

No se afirma material, fabricación forjada, resistencia, ligereza,
certificaciones, origen, accesorios, unidades incluidas ni compatibilidad con
ninguna marca de vehículo. La tabla técnica de la ficha es dinámica y cambia
con la variante elegida.

**Fuera el distintivo «Juego de 4» de las tarjetas.** Salía del ajuste por
defecto del tema (`sjw_default_units_per_set = 4`) porque el metafield
`units_per_set` ya no existe, de modo que la tarjeta afirmaba un contenido del
pedido que el proveedor no ha documentado. Mientras esa decisión siga
pendiente, ni la tarjeta ni el comparador dicen cuántas unidades cubre el
precio.

## 6. La migración es recuperable

Antes de tocar nada se exportó todo: productos, variantes, medios, metafields,
colecciones e inventario.

| Archivo | Qué guarda |
|---|---|
| `data/backup-migracion/export-83-productos.jsonl` | Exportación completa previa (83 productos, 83 variantes, 83 imágenes, 249 pertenencias a colección, metafields) |
| `data/backup-migracion/filas-proveedor-83.json` | Las 83 filas con las que se construyó la agrupación |
| `data/mapa-migracion-83.csv` | SKU → producto y variante de origen y de destino, con URL antigua y nueva |
| `data/restaurar-catalogo-por-medida.json` | Mutaciones listas para deshacer la reorganización |
| `data/copia-inventario-antes-de-activar.csv` | Inventario anterior de las 83 |

**No se ha borrado ningún producto original.** Las 83 fichas siguen en la
tienda, en borrador, con sus imágenes y sus metafields intactos.

### Qué se hizo, y en qué orden

1. Exportación completa previa.
2. Creación de los diez productos agrupados **en borrador** y verificación de
   sus datos (SKU, precios, opciones, metafields de variante, medios,
   inventario) antes de tocar los originales.
3. Las 83 fichas originales pasan a **borrador**.
4. Los diez agrupados pasan a **activos** y se publican en Tienda online.

El orden importa: entre el paso 3 y el 4 no hay ningún momento en el que las
mismas referencias estén publicadas en las dos estructuras a la vez.

**Una limitación que conviene saber.** El servidor MCP de Shopify bloquea
`publishableUnpublish` («Unpublishing is blocked to prevent accidental
storefront catalog removal»), así que las 83 fichas se retiraron poniéndolas en
borrador, que es lo que las saca del escaparate: un producto en borrador
devuelve 404 y no aparece en ninguna colección ni en la búsqueda. Lo que sigue
figurando es su pertenencia al canal Tienda online en el panel. Si se quiere
dejar también eso limpio, hay que quitarlas del canal a mano desde el admin;
no cambia nada de lo que ve el cliente.

### Redirecciones

Las 83 URLs anteriores redirigen a la variante equivalente:

```
/products/sjw-048-19x8-5-5x120-et30-mb
  → /products/sjw-048?variant=54793343140173
```

Los menús y los enlaces internos no apuntaban a ningún producto: todos van a
colecciones y a páginas, así que no había nada que reescribir ahí.

### Los scripts de importación

`tools/agrupa-catalogo.py` es el script que construyó esta reorganización y el
que hay que usar en las actualizaciones siguientes. Existe por una razón
concreta: la carga inicial creó un producto por medida. La regla que aplica es

```
una fila del proveedor = una VARIANTE
un código de diseño    = un PRODUCTO
```

Se comprobó que reproduce exactamente los payloads que se enviaron a Shopify.

`tools/import-fitment.py` se adaptó al mismo cambio: `sku_producto` ya no
identifica un producto sino una variante, y el enlace vehículo↔llanta se aplica
sobre `custom.compatible_vehicles` de la variante. El SKU se resuelve con
`--mapa` (por defecto `data/mapa-migracion-83.csv`); los SKU que el mapa no
conozca se listan aparte junto con la consulta que los resuelve, en lugar de
adivinarlos.

## 7. Lo que no ha cambiado

- **La compra sigue bloqueada en los datos**, no con CSS: inventario seguido,
  0 unidades y política «dejar de vender» en las 83 variantes. Shopify devuelve
  `availableForSale: false` en todas. Comprobado producto a producto.
- **Precios guardados sin alterar** y presentados como «Precio bajo consulta».
- **Compatibilidad pendiente** en las 83 variantes, salvo evidencia verificada.
- **La contraseña de la tienda:** no la he tocado, pero el 23-09-2026 ya no
  está puesta. Ver el apartado 11.
- **El tema DEV sigue sin publicar** y no se ha tocado ningún archivo de
  Horizon MAIN.

## 8. Efecto en Horizon MAIN

La reorganización de productos es global: los productos y las colecciones son
de la tienda, no del tema. Horizon MAIN, que sigue siendo el tema publicado,
muestra ahora **diez productos en lugar de 83**, con el mismo cambio en la
portada, en `/collections/all`, en las colecciones por diámetro y en la
búsqueda.

En MAIN eso significa, en concreto:

- La portada de fábrica listaba los ocho primeros productos de
  `collections/all`, que eran seis variantes de SJW-038 y dos de SJW-040.
  Ahora lista diseños distintos, no repeticiones de la misma llanta.
- Las 83 fichas por medida devuelven 404 en MAIN y caen en las redirecciones
  hacia la variante equivalente.
- MAIN **no** tiene los ajustes de SJ Wheels: seguirá diciendo «Sold out» y
  mostrando el precio, porque esos cambios viven en los archivos del tema DEV.
  Es el mismo motivo por el que la tienda parecía estar agotada: el idioma
  principal de la tienda es el inglés y el tema publicado es MAIN.

Si se quiere que lo que se ve sin contraseña sea lo correcto, hay que publicar
el tema DEV. No se ha hecho: la instrucción es no publicarlo.

## 9. Comprobaciones

| Qué | Resultado |
|---|---|
| Un producto por diseño | 10 productos activos en toda la tienda, ninguno más |
| Correspondencia de los 83 SKU | 83 de 83, sin duplicados ni exclusiones |
| Opciones sin colisiones | 0 colisiones en las diez familias |
| Combinaciones inexistentes | No seleccionables; se tachan y se anuncian |
| Compra habilitada | Ninguna: `availableForSale: false` en las 83 variantes |
| Inventario | 0 unidades, seguido, política DENY, en las 83 |
| Foto correcta por diseño | 10 imágenes distintas, una por diseño |
| Colección principal | `seleccion-sj-wheels`: exactamente los diez |
| Colecciones por diámetro | 17"→1, 18"→5, 19"→9, 20"→10, 21"→4, 22"→1 diseños añadidos |
| Redirecciones | 83 creadas, cada una a su variante |
| Archivos del tema | 11 subidos y verificados por MD5 contra el repositorio |
| Revisión estática del tema | 20 comprobaciones, sin errores |
| Motor de compatibilidad | 66 pruebas, sin fallos |
| Guardia de compra | 40 pruebas, sin fallos |

La comprobación visual en móvil y escritorio está hecha: ver el apartado 11.

## 10. Lo que sigue pendiente

1. **Fotografía por acabado** de las 23 variantes de la tabla del apartado 4.
2. **Tabla de pesos del proveedor** — sigue sin llegar; `data/registro-pesos-pendientes.csv`
   espera la cifra, la unidad y el alcance.
3. **Contenido del pedido**: cuántas unidades cubre el precio, si incluye
   neumáticos, tornillería y centradores.
4. **Carta de colores**: mientras no llegue, el acabado se identifica por el
   código del proveedor y no se traduce a un nombre comercial.
5. **Validación comercial de los precios** antes de mostrarlos.
6. **Los dos archivos de textos** del repositorio, pendientes de traerse
   desde el tema antes del próximo despliegue (apartado 11).

---

## 11 · Comprobación visual y una divergencia con el tema

**La tienda ya no tiene contraseña.** El 23-09-2026 `/` responde 200 y no
redirige a `/password`; la API lo confirma (`passwordProtection.enabled:
false`). Yo no la he quitado. Conviene saberlo porque el tema publicado sigue
siendo Horizon MAIN, que no lleva los ajustes de SJ Wheels: lo que hoy ve
cualquiera sin contraseña es el catálogo con «Sold out» y con los precios a la
vista. La decisión de publicar el tema DEV o volver a poner la contraseña es
comercial y no la he tomado.

Como el escaparate es accesible, sí se ha podido hacer la comprobación visual
que faltaba, con Chromium sobre la vista previa del tema DEV, en 390×844
(móvil) y 1440×900 (escritorio), sobre portada, colección, ficha y ficha con
una variante concreta en la URL:

| Comprobación | Resultado |
|---|---|
| «Sold out» / «Agotado» en tarjetas o ficha | Ninguna aparición |
| «Juego de 4» / «Set of 4» | Ninguna aparición |
| Desbordamiento horizontal | Ninguno, en las dos resoluciones |
| Textos sin traducir | Ninguno |
| Símbolo de moneda visible | Ninguno |
| Datos estructurados con precio | No hay `Offer`; solo `Product` |
| Objetivos táctiles por debajo de 24 px | Dos, en el pie: el enlace «Política de privacidad» (19 px) y el selector de idioma (23 px). Son anteriores a esta reorganización y salen en todas las páginas |

En la ficha se leyó: «Precio bajo consulta», «Consultar disponibilidad»,
«Solicitar precio y compatibilidad», «La solicitud se envía con la referencia
**OYL260416157** · 19 × 8,5" / 5×112 · ET30 · Buje 66,5 mm / Cód. proveedor MB»
y una ficha técnica con esos mismos valores. Al pedir `?variant=…` de otra
configuración, todo eso cambia con ella.

El filtro de disponibilidad de la colección sí ofrece una casilla «Agotado».
Es la faceta de Shopify (`filter.v.availability`), no un distintivo de
producto, y en un catálogo donde todo está bajo consulta no aporta nada:
conviene quitarla desde los filtros de la colección en el panel.

### Otra sesión editó el tema después de este trabajo

El 23-09-2026 a las 15:59 UTC, después de mi despliegue del día 21, otra
sesión reescribió cinco archivos directamente en el tema, sin pasar por el
repositorio:

| Archivo | Qué cambió |
|---|---|
| `snippets/sjw-variant-picker.liquid` | El selector de tres columnas pasa a ser **un solo desplegable** con las configuraciones reales («19 × 8,5" / 5×112 · ET30 · Buje 66,5 mm / Cód. proveedor MB»), con botón de envío para que funcione sin JavaScript y 48 px de alto |
| `blocks/sjw-tech-panel.liquid` | Deja de pintar el panel de disponibilidad, que ya se pinta una vez desde su propio bloque |
| `snippets/sjw-solicitar-precio.liquid` | El enlace pasa por `sjw-url`, que respeta la ruta del idioma |
| `locales/es.json` · `locales/en.default.json` | Añaden `sjw.variantes.elegir` y `sjw.variantes.aplicar`, reescriben `ayuda`, y acortan `aviso_compra`, `peso_nota` y `acabado_nota` |

**El cambio es bueno y no lo he pisado.** Un desplegable que solo lista
variantes reales cumple mejor el encargo que mis tres columnas con tachaduras:
las combinaciones inexistentes no es que se tachen, es que no existen como
opción, y en móvil es un control en lugar de tres. Funciona sin JavaScript.

Los tres archivos Liquid están ya sincronizados en el repositorio y verificados
por MD5 contra el tema. **Los dos archivos de textos no**: el repositorio
conserva mis versiones, que difieren de las del tema en los textos de la tabla
de arriba. Están señalados aquí en lugar de darse por sincronizados porque no
he podido reproducirlos byte a byte y prefiero decirlo a aparentarlo.

Para que eso no acabe en un borrado, `deploy.py` anota ahora en
`.desplegado.json` el MD5 de cada archivo que sube y avisa cuando el
repositorio se ha movido desde el último despliegue. Antes de volver a subir
`locales/es.json` o `locales/en.default.json` hay que traerse la versión del
tema; si se suben tal cual están en el repositorio, se pierde ese trabajo.

Checksums del tema el 23-09-2026 16:00 UTC:

```
37a3ad8c718b273282b8116185f70051  locales/es.json            (29 337 B)
c072e974447de92286a86dee77bf428e  locales/en.default.json    (26 399 B)
2e491e89f0878e8e9db903816689d684  snippets/sjw-variant-picker.liquid
a1816541ace1fa9991ea038dd5018be3  blocks/sjw-tech-panel.liquid
bdad5ba8660b44dcdd125ec73aaa1767  snippets/sjw-solicitar-precio.liquid
```
