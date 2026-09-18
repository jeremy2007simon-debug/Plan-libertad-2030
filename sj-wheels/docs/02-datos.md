# SJ Wheels — Capa de datos

## Definiciones creadas

**Metaobject `vehicle`** — `gid://shopify/MetaobjectDefinition/37568414029`
14 campos: `make`, `model`, `generation`, `year_start`, `year_end`, `engine`, `body_type`,
`bolt_pattern`, `center_bore`, `allowed_diameters`, `et_min`, `et_max`, `notes`,
`verification_status` (`verified` / `pending` / `unverified`).
Acceso storefront público, publicable. **0 entradas** — el propietario debe crearlas.

**16 metafields de producto** en el namespace `custom`:

| Clave | Tipo | Estado |
|---|---|---|
| `bolt_pattern` | single_line_text_field | **migrado 439/439** |
| `center_bore` | number_decimal | **migrado 439/439** |
| `wheel_diameter` | number_integer | **migrado 439/439** |
| `wheel_width` | number_decimal | **migrado 438/439** |
| `offset_et` | number_integer | **migrado 437/439** |
| `finish` | single_line_text_field | vacío — requiere tabla de traducción |
| `compatible_vehicles` | list.metaobject_reference | vacío — requiere base de vehículos |
| `requires_manual_verification` | boolean | vacío — el tema asume `true` si falta |
| `units_per_set` | number_integer | vacío — el tema asume 4 |
| `tires_included` | boolean | vacío — el tema asume `false` |
| `bolts_included` | boolean | vacío — el tema asume `false` |
| `estimated_delivery` | single_line_text_field | vacío — ajuste global del tema |
| `offset_et_min` / `offset_et_max` | number_integer | sin dato de origen |
| `load_rating` | number_integer | sin dato de origen |
| `compatibility_notes` | multi_line_text_field | no migrado a propósito (ver abajo) |

## Migración ejecutada

Origen: etiquetas del producto + la lista `<ul>` del `descriptionHtml`.
**2.192 metafields escritos en 439 productos. Verificado: 0 discrepancias** contra el origen.

Cero conflictos entre etiquetas y descripción: los datos eran internamente consistentes.

### Decisiones de seguridad durante la migración

1. **Campos constantes no escritos.** `units_per_set`, `tires_included`, `bolts_included` y
   `requires_manual_verification` se resuelven en el tema con valores por defecto seguros
   (ausente ⇒ requiere verificación, 4 unidades, sin neumáticos, sin tornillería). Así el
   valor por defecto es siempre el prudente y el propietario solo rellena las excepciones.

2. **`estimated_delivery` no escrito.** Los 439 productos tenían el mismo texto, así que es un
   ajuste global del tema, no un dato por producto.

3. **`compatibility_notes` no migrado.** Las notas del proveedor son abreviaturas como
   `AUDIA6/A8`, `BMW X5M/X6M`, `BENZ` o `Consultar`, y 283 de 439 contienen texto en chino.
   Mostrarlas al cliente se leería como una afirmación de compatibilidad que no podemos
   sostener. Se exportan aparte, sin tocar el producto.

4. **`wheel_width` omitido en 1 producto.** SKU `OYL260416367` tiene `Medida: 20X90` en origen.
   Una llanta de 90 pulgadas no existe; probablemente sea 9.0, pero **no lo doy por supuesto**.
   El campo queda vacío y la ficha mostrará el estado pendiente.

5. **`offset_et` omitido en 2 productos.** Sus etiquetas son `et-实际38打印42`
   ("ET real 38, impreso 42"). Dato contradictorio en origen, no se migra.

### Validación de rangos aplicada

| Campo | Rango aceptado | Fuera de rango |
|---|---|---|
| Diámetro | 15–26 pulgadas | 0 |
| Anchura | 5.0–14.0 pulgadas | 1 (excluido) |
| ET | −60 a +80 mm | 0 |
| Buje central | 50–120 mm | 0 |

## Ficheros para el propietario

- `data/acabados-pendientes-de-traducir.csv` — los 28 códigos de acabado del proveedor con su
  número de productos y una columna vacía para el nombre comercial en español.
  **Hasta rellenarlo, la faceta de acabado queda oculta.**
- `data/compatibilidad-proveedor-sin-verificar.csv` — las 439 filas con SKU, medidas migradas y
  el texto original de compatibilidad del proveedor, marcando cuáles contienen chino.
  Es la base de trabajo para construir los metaobjects `vehicle`.

## Cómo se actualiza

Fuente única de verdad: **los metafields del producto y los metaobjects `vehicle` en Shopify**.
El tema no guarda copias. No hay índice JSON duplicado que pueda contradecirlos.
