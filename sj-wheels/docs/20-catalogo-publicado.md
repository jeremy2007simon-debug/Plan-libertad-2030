# 20 · Catálogo publicado: las 83 referencias activas

> **Actualizado el 21-09-2026.** El catálogo se reorganizó en diez productos,
> uno por diseño, con las 83 referencias como variantes. Lo que este documento
> cuenta sobre las 83 fichas independientes describe el estado anterior; el
> actual está en [22-catalogo-por-diseno.md](22-catalogo-por-diseno.md).


**Fecha:** 20-09-2026 · **Tienda:** `5y82gi-yt.myshopify.com`
**Tema de trabajo:** «SJ Wheels — DEV (no publicar)» (`196061626701`), **sigue sin publicar**.
**Tema publicado:** Horizon (`196025975117`), **sin tocar**.
**Contraseña de la tienda:** **activada** (verificado: `passwordProtection.enabled = true`
y `https://5y82gi-yt.myshopify.com/` responde `302 → /password`).

---

## 0. Lo primero: la tabla de pesos no llegó

El punto 4 del encargo dice «Carga ahora la tabla adjunta como datos de referencia del
proveedor, sin volver a pedirme permiso para guardarla». **La tabla no venía adjunta al
mensaje.** No hay ningún archivo, ninguna imagen y ningún texto con diámetros y pesos medios
en la conversación, así que no se ha cargado nada: inventar diez cifras «de referencia del
proveedor» sería exactamente lo contrario de lo que pide el punto.

Lo que sí se ha hecho, que era la otra mitad del punto:

- La ficha dice **«Peso pendiente de confirmación»**, con la nota de que falta la cifra, la
  unidad y el alcance (por llanta, por juego o por bulto).
- La estimación anterior sigue guardada **solo como dato interno trazable**, en
  `custom.set_weight_estimate_kg` y `custom.weight_source`, que dice literalmente que es una
  estimación de SJ Wheels calculada a partir del diámetro y no una medición del fabricante.
- El panel técnico **ya no divide** el peso entre un número de unidades sin confirmar: esa
  división producía un «peso por llanta» inventado dos veces.
- `data/registro-pesos-pendientes.csv` mantiene los cinco campos por SKU, todos en
  «PENDIENTE (proveedor)», listos para recibir la tabla cuando llegue.

Cuando envíes la tabla, se carga tal cual: diámetro, valor medio comunicado, fuente, unidad
pendiente de confirmar y alcance pendiente. **23 pulgadas no se rellenará por interpolación**;
si no está en la tabla, se queda vacío.

---

## 1. Preparación de la publicación

Antes de activar nada se montó una restricción de compra real, a nivel de datos:

| Ajuste | Antes | Ahora |
|---|---|---|
| Seguimiento de inventario | `tracked: false` | `tracked: true` |
| Unidades disponibles | 0 | 0 |
| Política de venta sin stock | `CONTINUE` (seguir vendiendo) | `DENY` (dejar de vender) |
| Resultado en Shopify | comprable | `availableForSale: false` |

Esto **no es un botón oculto**: es el propio Shopify el que devuelve «no disponible», así que
no hay forma de añadir la referencia al carrito ni de forzar el checkout desde ningún canal.

- **Copia de los valores anteriores:** `data/copia-inventario-antes-de-activar.csv`, con las 83
  filas (sku, product_id, variant_id, inventory_item_id, precio, política anterior, tracked
  anterior, disponible anterior y ubicación). Revertir es volver a poner esos valores.
- **Ubicaciones:** solo existe una, «Shop location» (`113224188237`), con
  `fulfillsOnlineOrders: true`. No hay una segunda ubicación por la que se escape stock.
- **Canales:** publicaciones activas «Tienda online», «Shop» y «Point of Sale». Las 83 se han
  publicado **solo en Tienda online**. Como el bloqueo está en el dato del producto y no en el
  tema, tampoco serían comprables si alguien las publicara en otro canal.
- **Verificación previa a activar:** se comprobaron dos referencias de los dos extremos de la
  selección (`OYL260416094`, 17", y `OYL260416429`, 20") y ambas devolvían
  `availableForSale: false`, `inventoryPolicy: DENY`, `inventoryQuantity: 0`,
  `inventoryItem.tracked: true`. Solo después se activaron las 83.
- **Ningún producto se ha quedado en borrador por este motivo:** la configuración sí impide la
  compra, así que las 83 se han podido activar.

## 2. Catálogo visible

**83 referencias ACTIVAS y publicadas en «Tienda online».** Ninguna fusión de productos,
ningún SKU perdido: los 83 SKU del proveedor siguen uno por producto.

Estructura nueva:

| Colección | Referencias | Enlace |
|---|---|---|
| Selección SJ Wheels | 83 | `/collections/seleccion-sj-wheels` |
| Diseño SJW-038 · 17"–21" · 5x112 | 6 | `/collections/diseno-sjw-038` |
| Diseño SJW-040 · 18"–20" · 5x112 | 9 | `/collections/diseno-sjw-040` |
| Diseño SJW-041 · 18"–20" · 5x112 | 13 | `/collections/diseno-sjw-041` |
| Diseño SJW-043 · 18"–21" · 5x112 | 8 | `/collections/diseno-sjw-043` |
| Diseño SJW-044 · 19"–22" · 5x112 | 9 | `/collections/diseno-sjw-044` |
| Diseño SJW-048 · 19"–20" · 5x112 y 5x120 | 7 | `/collections/diseno-sjw-048` |
| Diseño SJW-049 · 20"–21" · 5x112 y 5x120 | 7 | `/collections/diseno-sjw-049` |
| Diseño SJW-059 · 19"–20" · 5x112 y 5x120 | 8 | `/collections/diseno-sjw-059` |
| Diseño SJW-074 · 18"–20" · 5x112 y 5x120 | 12 | `/collections/diseno-sjw-074` |
| Diseño SJW-124 · 19"–20" · 5x112 | 4 | `/collections/diseno-sjw-124` |

Las diez colecciones de diseño son automáticas, por la etiqueta `diseno-sjw-NNN`: una
referencia nueva del mismo diseño entra sola. Cada una lleva imagen y una descripción que dice
cuántas referencias tiene, qué diámetros, qué anclajes y qué códigos de acabado.

Las colecciones por diámetro (17" a 22") ya existían y se han publicado en Tienda online; las
83 estaban ya dentro. En el storefront solo se ven los productos activos, así que muestran
exactamente las referencias de la selección.

- **Portada:** nueva sección «Diez diseños, 83 referencias» con las diez colecciones y su
  imagen, encima del selector de vehículo, y la parrilla por diámetro ampliada a 17"–22".
  El hero y los botones llevan ahora a `/collections/seleccion-sj-wheels`.
- **Menú principal:** grupo «Diseños» con las diez familias y sus rangos de medida, y grupo
  «Medidas» con los seis diámetros.
- **Grupo «Marcas» retirado del menú.** Llevaba a cuatro colecciones (BMW, Audi,
  Mercedes-Benz, Volkswagen) que ahora están vacías en el storefront, porque las etiquetas de
  marca se quitaron al no estar confirmada la compatibilidad. Un menú «Llantas para BMW» que
  lleva a una página vacía promete justo lo que no se puede prometer. Las colecciones siguen
  existiendo y volverán al menú cuando haya compatibilidad verificada.
- **El mensaje «catálogo todavía no publicado» desaparece solo.** La sección
  `sjw-catalog-state` lo mostraba cuando `collections.all.products_count == 0`. Ahora son 83,
  así que ese estado ya no se cumple y la sección no se pinta. No hay que tocar nada.

Listado completo: `data/catalogo-activado-83.csv` (familia, SKU, handle, URL de ficha, medida,
PCD, ET, código de acabado, precio guardado, estado y si es comprable).

## 3. Precios

**Ningún precio se ha modificado.** Siguen guardados en cada variante tal cual estaban
(699,00 € a 1.249,00 € en la selección). Lo que cambia es que **no se muestran**.

- `snippets/sjw-precio-modo.liquid` es el interruptor único. Está en `consulta`.
- `snippets/price.liquid` consulta ese interruptor: en modo consulta escribe
  **«Precio bajo consulta»** y no pinta ninguna cifra. Como todo el tema pasa por ese snippet,
  el texto sale igual en la ficha, en las tarjetas de colección, en el buscador, en los
  productos recomendados y en la compra rápida.
- `snippets/sjw-structured-data.liquid` solo declara `offers` si el producto está disponible
  **y** el tema está mostrando precios. Con cualquiera de las dos condiciones sin cumplir, el
  JSON-LD no lleva precio: Google no recibe una cifra que SJ Wheels no ha validado.
- **No aparece 0 €, ni descuentos, ni «transporte incluido» en ninguna parte.** Tampoco hay
  `compare_at_price` en ninguna de las 83.
- La ficha permite pedir presupuesto con la referencia ya cargada (punto 6).
- **Para volver a precios visibles:** cambiar `false` por `true` en la única línea `assign
  sjw_precios_visibles` de `snippets/sjw-precio-modo.liquid`. Nada más.

## 4. Pesos del proveedor

Ver el apartado 0. La tabla no llegó; el estado «pendiente» sí está implementado.

## 5. Fichas

Cada una de las 83 fichas lleva ahora:

- Imagen del proveedor con texto alternativo propio.
- Nombre del diseño, medida (diámetro × anchura), PCD, ET y buje, desde metafields.
- Código de acabado **tal cual lo envía el proveedor**, con la nota de que SJ Wheels no tiene
  la carta de colores y no lo traduce a un nombre comercial ni lo deduce de una fotografía.
- SKU visible en el panel técnico.
- Descripción propia por referencia, distinta en cada una.
- «Necesita confirmación técnica», en el panel y en el aviso del botón.
- Botón **«Solicitar precio y compatibilidad»**.
- «Peso pendiente de confirmación» y «Contenido del pedido: pendiente de documentar».

Qué se ha quitado de la vista del cliente:

- **La nota del proveedor en chino** (`custom.supplier_note`, del tipo «BMW 5系») ya no aparece
  en ninguna descripción. Sigue guardada como metafield interno.
- **Las filas «Unidades: 4», «Neumáticos: no incluidos» y «Tornillería: no incluida».** El
  panel las pintaba con valores por defecto del tema aunque los metafields se hubieran
  borrado. Ahora hay una sola fila, «Contenido del pedido», que dice que está pendiente.

Imágenes marcadas:

| Caso | Referencias | Texto en la ficha |
|---|---|---|
| Fotografía que corresponde a este acabado | 45 | «Imagen: fotografía de estudio del proveedor, correspondiente a este código de acabado (X)» |
| Fotografía de **otro** acabado | 14 | «Imagen de referencia: otro acabado… la imagen sirve para ver el diseño, no el color» |
| **Render 3D** de este acabado | 15 | «Imagen de referencia: render 3D… no muestra el producto real» |
| **Render 3D de otro acabado** | 9 | las dos advertencias juntas |

Los tres diseños con render son SJW-059, SJW-074 y SJW-124, como recogía
`14-calidad-imagenes.md`.

## 6. Formulario

El snippet `sjw-consultar-disponibilidad.liquid` ya **no apunta a una página que no existe**.
Apunta a `/pages/solicitud-de-compatibilidad`, que es la página real con el formulario
localizado, y se pinta desde `blocks/sjw-tech-panel.liquid`, que sí está en la plantilla de
producto. También queda `blocks/sjw-disponibilidad.liquid` por si se prefiere colocarlo en otro
punto de la ficha desde el editor de temas.

El enlace de la ficha lleva, ya cargados: **producto, SKU, medida, anclaje, ET y código de
acabado**. Al pulsar, el script añade **cantidad** (del selector de la ficha) y **vehículo** (si
el cliente lo ha guardado). El formulario pide además **destino del envío** (Península,
Baleares, Canarias, Ceuta, Melilla, otro país) y **código postal**, los dos obligatorios,
porque el transporte y los impuestos dependen del territorio.

Todos los campos precargados quedan **visibles y editables**: el cliente puede corregir lo que
se ha cargado.

**No se ha enviado ninguna solicitud de prueba.** El formulario usa `{% form 'contact' %}`, que
manda un correo real al propietario, así que probarlo enviaría una consulta falsa. La
comprobación se ha hecho leyendo el marcado y el script.

## 7. Verificación

Lo que **sí** se ha verificado, contra los datos reales de la tienda:

| Comprobación | Resultado |
|---|---|
| Productos activos | 83 |
| Publicados en «Tienda online» | 83 de 83 |
| `availableForSale` | `false` en las 83 |
| `inventoryPolicy` | `DENY` en las 83 |
| `inventoryItem.tracked` | `true` en las 83 |
| Precios guardados | sin cambios (699,00 – 1.249,00 €) |
| Colección «Selección SJ Wheels» | 83 productos |
| Colecciones de diseño | 6+9+13+8+9+7+7+8+12+4 = 83 |
| SKU duplicados entre las 83 | ninguno |
| Contraseña de la tienda | activada; `/` responde 302 a `/password` |
| Tema DEV | sigue sin publicar |
| Tema publicado | Horizon, sin modificar |
| Descripciones con texto del proveedor en chino | ninguna |
| Archivos del tema subidos | 10, sin errores de Shopify |
| Equilibrio de etiquetas Liquid | correcto en los 9 archivos editados |

Lo que **no** se ha podido verificar, y por qué:

**El render real de la tienda.** La tienda está protegida por contraseña, el encargo dice
mantenerla, y la Admin API no expone esa contraseña. Desde aquí `https://5y82gi-yt.myshopify.com/`
devuelve `302 → /password`, igual con `?preview_theme_id=`. Es la misma limitación que ya
recogía `07-vista-previa-y-qa-visual.md`. Por tanto **no he visto con mis ojos** la portada, las
colecciones, el buscador, las fichas, la navegación entre medidas ni el comportamiento en móvil
y escritorio. Lo que se ha comprobado es el dato y el código, no el píxel.

**Cómo verlo tú, sin quitar la contraseña:**

1. Admin → Tienda online → Temas → «SJ Wheels — DEV (no publicar)» → **Vista previa**.
   Con la sesión de admin abierta no pide contraseña.
2. O `https://5y82gi-yt.myshopify.com/?preview_theme_id=196061626701`, que pedirá la contraseña
   una vez.

Recorrido sugerido: portada → «Ver los diez diseños» → una colección de diseño → una ficha →
botón «Solicitar precio y compatibilidad» → comprobar que el formulario llega con la referencia
cargada → volver y buscar «SJW-074» en el buscador → comprobar que sale «Precio bajo consulta».

**No se ha hecho ningún pedido ni ningún cobro.**

---

## Lo que falta para poder vender

Una sola lista, en orden:

1. **Precio.** Validar la tarifa (hoy 699–1.249 € en la selección, generada a partir del
   diámetro en la carga inicial) y decidir la alternativa de transporte de
   `17-precio-y-transporte-alternativas.md`. Después: cambiar una línea en
   `sjw-precio-modo.liquid`.
2. **Contenido del pedido.** Que el proveedor documente por escrito cuántas unidades cubre cada
   referencia y si incluye neumáticos, tornillería y centradores. Borrador listo en
   `19-mensaje-al-proveedor-borrador.md` y tabla de los 83 SKU en
   `data/solicitud-proveedor-83-skus.csv`. **Sin enviar.**
3. **Pesos.** La tabla del proveedor (la que no llegó adjunta), con unidad y alcance
   confirmados, antes de tocar el peso logístico de Shopify.
4. **Compatibilidad.** Ninguna referencia tiene compatibilidad verificada. Hasta que exista una
   base de vehículos comprobados, todo el catálogo está en «necesita confirmación técnica» y la
   única vía real es el formulario.
5. **Carta de colores.** Sin ella los acabados siguen siendo códigos del proveedor (MB, MBI,
   MIB, MG, B, YBZ, MB+L) y no nombres comerciales.
6. **Imágenes.** 23 de las 83 muestran el acabado de otra referencia y 24 son renders 3D
   (45 + 14 + 15 + 9 = 83; los 23 de «otro acabado» son 14 fotografías y 9 renders).
   Detalle en `14-calidad-imagenes.md`.
7. **Disponibilidad.** Definir el proceso de venta bajo pedido de
   `18-disponibilidad-y-venta-bajo-pedido.md`: quién confirma, en cuánto tiempo y con qué
   plazo de entrega.
8. **Territorios y transporte.** Cerrar las condiciones por destino
   (`16-destinos-fiscalidad-y-aduanas.md`), especialmente Canarias, Ceuta y Melilla.
9. **Textos del tema.** Los literales nuevos de los snippets de SJ Wheels están en castellano
   dentro del propio archivo, no en `locales/`. Si la tienda va a ser multilingüe, hay que
   moverlos.
10. **Publicar.** Solo entonces: publicar el tema DEV, quitar la contraseña y devolver las
    variantes a la política de venta que corresponda.
