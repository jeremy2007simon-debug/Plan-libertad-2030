# 22 · Un producto por diseño

21-09-2026. Reorganización del catálogo de SJ Wheels: las 83 referencias que
estaban publicadas como 83 fichas independientes pasan a ser **diez productos,
uno por diseño**, con sus medidas y configuraciones seleccionables dentro de la
ficha. Es una reorganización del catálogo, no una reducción de existencias: no
se ha eliminado ni una sola referencia y las 83 siguen ahí, ahora como variantes.

**Tema:** SJ Wheels — DEV (no publicar) · `196061626701` · sigue sin publicar.
**Vista previa:** `https://5y82gi-yt.myshopify.com/?preview_theme_id=196061626701`
(la tienda mantiene su contraseña; hay que introducirla antes de ver nada).

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
- **La contraseña de la tienda sigue puesta.**
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

La comprobación visual en móvil y escritorio sigue pendiente y no la puedo
hacer desde aquí: la tienda está protegida por contraseña y la API de
administración no la expone, así que cualquier petición a la vista previa
termina en `/password`. Hace falta abrir el enlace de la vista previa con la
contraseña de la tienda.

## 10. Lo que sigue pendiente

1. **Fotografía por acabado** de las 23 variantes de la tabla del apartado 4.
2. **Tabla de pesos del proveedor** — sigue sin llegar; `data/registro-pesos-pendientes.csv`
   espera la cifra, la unidad y el alcance.
3. **Contenido del pedido**: cuántas unidades cubre el precio, si incluye
   neumáticos, tornillería y centradores.
4. **Carta de colores**: mientras no llegue, el acabado se identifica por el
   código del proveedor y no se traduce a un nombre comercial.
5. **Validación comercial de los precios** antes de mostrarlos.
6. **Comprobación visual** en móvil y escritorio con la contraseña.
