# Catálogo inicial — por qué no he activado ningún producto

Auditoría completa de los 439 productos en borrador, hecha el 19/09/2026 sobre
los datos reales de la tienda (volcado por `bulkOperationRunQuery`, 7011 líneas).

Datos en `data/`:

- `auditoria-productos-publicacion-inicial.csv` — los 439 productos, 38 columnas.
- `ranking-familias-llantas.csv` — las 131 familias puntuadas de 0 a 100.
- `simulacion-publicacion.csv` — los 53 productos que se activarían, uno a uno.

**No he activado nada.** Tres hallazgos lo impiden, y los tres son decisiones
suyas, no problemas que yo pueda resolver.

---

## Bloqueante 1 · El precio no es un precio de venta, es una escalera por diámetro

Los 439 productos tienen exactamente ocho precios, y el precio depende **solo**
del diámetro. Ni el ancho, ni el acabado, ni el PCD, ni el diseño cambian nada:

| Diámetro | Productos | Precio | Peso |
|---|---|---|---|
| 16" | 1 | 649,00 € | 36 kg |
| 17" | 18 | 699,00 € | 40 kg |
| 18" | 73 | 799,00 € | 44 kg |
| 19" | 123 | 899,00 € | 48 kg |
| 20" | 143 | 999,00 € | 52 kg |
| 21" | 37 | 1.099,00 € | 56 kg |
| 22" | 41 | 1.249,00 € | 60 kg |
| 23" | 3 | 1.399,00 € | 64 kg |

Sin excepciones: 439 de 439. El peso sigue la misma escalera, 4 kg por pulgada.

Una 20x11 ET20 forjada en acabado bicolor no puede costar lo mismo que una
20x8.5 ET36 monocolor. **Esto es una escalera generada, no una lista de precios.**

Además:

- `compareAtPrice` está vacío en los 439.
- `unitCost` (coste del proveedor) está vacío en los 439.
- La descripción dice *«Precio cerrado con transporte, gestión aduanera y
  entrega a domicilio incluidos»*, lo que afirma que es un precio final para un
  juego de 4 — pero nada en los datos lo respalda.

**Decisión que necesito:** la lista de precios real, o la confirmación por
escrito de que esta escalera **es** el PVP final por juego de 4 con transporte
incluido. Sin una de las dos cosas no publico nada: la regla 4 del encargo
prohíbe inventar precios, y la validación 4 y 5 del paso 4 no se pueden superar.

---

## Bloqueante 2 · El transporte no está resuelto para un producto de 40–64 kg

> **Corrección del 19-09-2026.** La primera versión de este documento decía que
> España tenía «dos tarifas duplicadas» y que «no hay zona de Canarias». Las dos
> afirmaciones eran erróneas. Al volver a leer el perfil de envío con la API
> (`deliveryProfiles`) se ve lo siguiente, y es lo que vale.

Perfil de envío: **«Perfil general»**, el único, marcado como predeterminado.
Tres zonas:

| Zona | Países / provincias | Tarifa |
|---|---|---|
| España | ES completo: las 52 provincias, **incluidas Las Palmas, Santa Cruz de Tenerife, Ceuta, Melilla y Balears** | «Estándar» 6,99 € |
| España | las mismas | «Estándar» 0,00 € **cuando el pedido llega a 55 €** |
| UE (Unión Europea) | 26 países | «Estándar Internacional» 8,99 € |
| Internacional | 14 países (EE. UU., Canadá, Reino Unido, Japón, Australia…) | «Estándar» 12,99 € |

Las dos filas de España **no son dos tarifas duplicadas**: son la misma
definición de método (`DeliveryMethodDefinition/1294549385549`) con una
condición de precio. Shopify muestra la condición como una fila aparte. El
comportamiento real es: 6,99 € hasta 54,99 € de pedido y gratis a partir de
55 €.

Lo que sí es un problema, y es más grave que un duplicado:

1. **Todos los productos del catálogo cuestan 599 € o más.** Con el umbral en
   55 €, *ningún* pedido de una llanta pagaría nunca transporte: el cliente
   siempre vería **0,00 €**. La tarifa de 6,99 € no llega a aplicarse jamás en
   este catálogo.
2. **Canarias, Ceuta y Melilla están dentro de la zona «España»** y se
   facturan exactamente igual que la península, pese a estar fuera del
   territorio aduanero y del IVA de la Unión Europea. Un pedido a Las Palmas
   hoy saldría con transporte gratis y sin ninguna previsión de despacho de
   importación, impuestos locales (IGIC) ni sobrecoste insular.
3. **Ninguna tarifa tiene condición de peso.** Un juego de 4 llantas pesa entre
   40 y 64 kg según la estimación actual. Un envío así no se transporta gratis a
   ningún destino de España, y menos a las islas.
4. **El peso que hoy llevan las variantes es el peso estimado del juego**, y es
   el valor que Shopify usaría para calcular una tarifa por peso el día que se
   cree. Está documentado en `13-auditoria-pesos.md`: no es una medición, y no
   incluye el embalaje.

**Decisiones que necesito, concretas:**

- ¿El PVP incluye el transporte? Si es que sí, el umbral de envío gratis debe
  bajar a 0 € y la tarifa de 6,99 € debe desaparecer, porque hoy dice lo
  contrario de lo que decía la ficha. Si es que no, hay que dar una tarifa real.
- ¿Qué se cobra y en qué plazo a Canarias, Ceuta y Melilla? Mientras no haya una
  zona propia con su importe, no se puede publicar prometiendo entrega allí.
- ¿Qué transportista y qué tarifa por peso se contratan para bultos de 40–64 kg?

## Bloqueante 3 · Hay chino del proveedor a la vista del cliente

**386 de 439 fichas** llevan la nota de compatibilidad del proveedor sin
traducir, y aparece en dos sitios visibles:

- en la descripción del producto, dentro de *«Compatibilidad orientativa»*;
- en la **meta description**, que es lo que sale en Google.

Ejemplo real (`OYL260416005`): `VWPassat领驭 2005`. Otros: `迈巴赫威霆` (Maybach
Vito), `高尔夫` (Golf), `海外版` (versión de exportación), `前轮`/`后轮`
(eje delantero / trasero).

Esto **sí lo puedo arreglar yo**, y es lo que propongo: mover la nota original
íntegra a un metafield de proveedor, y dejar en la ficha solo lo verificable.
Pero no lo he tocado todavía porque reescribir las fichas depende de la
respuesta al bloqueante 1: el texto comercial tiene que decir si el precio es
por llanta o por juego, y hoy no lo sé.

---

## Lo que sí está listo

- **131 familias identificadas** por código de diseño del proveedor, confirmado
  contra el archivo de imagen y la secuencia de SKU. Ninguna fusión de SKU,
  ningún borrado: la estructura de un producto por medida se conserva.
- **6 familias superan el filtro de calidad** (no diez, y no voy a bajar el
  listón para llegar a diez: el propio encargo lo permite).
- **53 productos listos** para activarse en cuanto se resuelvan los bloqueantes.

### Por qué solo seis

El filtro exige: 4 o más medidas distintas, imagen de 800×800 como mínimo en
**todos** los productos de la familia, y los cinco campos técnicos completos.

De las 131 familias:

| Motivo de descarte | Familias |
|---|---|
| Imágenes por debajo de 800×800 | la mayoría |
| Menos de 4 medidas distintas | 85 |
| Algún campo técnico ausente | 4 productos sueltos |

**Ninguna imagen del catálogo llega a 1000 px de lado.** La mediana es 204 px y
la mejor es 929 px. Shopify recomienda 2048×2048 para ficha de producto. Las
seis familias seleccionadas son las únicas cuyas imágenes rondan los 870–900 px,
que es lo mínimo presentable. **Esto limita el techo de calidad de toda la
tienda** y conviene resolverlo con fotografía propia o con los originales del
proveedor a resolución completa.

### Cobertura por marca

| Marca | Productos en catálogo | Mejor familia | ¿Entra en la selección? |
|---|---|---|---|
| BMW | 177 | `wheel-design-074` (12 prod., img 678px) | sí, dos familias |
| Mercedes-Benz | 145 | `wheel-design-044` (11 prod., img 868px) | sí, cuatro familias |
| Audi | 79 | `wheel-design-038` (8 prod., img 899px) | **no** |
| Volkswagen | 28 | `wheel-design-052` (2 prod., img 181px) | **no** |

Audi se queda fuera por poco: `wheel-design-038` puntúa 76,9 y tiene 7 medidas
con imagen de 899 px, pero sus fichas arrastran el chino del proveedor y, al
aplicar el mismo baremo que al resto, queda por debajo del corte de calidad de
imagen en alguno de sus ocho productos. Con la nota del proveedor limpiada
entraría.

**Volkswagen no tiene ninguna familia publicable**: 19 familias, la mejor con 2
productos y una imagen de 181 px. No hay forma honesta de cubrir VW hoy.

### Duplicados encontrados

Cuatro pares de productos con diseño, medida, ET, PCD, buje y acabado idénticos:

| Familia | Medida | SKU duplicados |
|---|---|---|
| `wheel-design-044` | 20x8.5 ET36 5x112 66.5 MB | OYL260416137 / **OYL260416139** |
| `wheel-design-044` | 20x9.5 ET45 5x112 66.5 MB | OYL260416138 / **OYL260416140** |
| `wheel-design-067` | 18x8.0 ET38 5x114.3 MB | OYL260416245 / OYL260416246 |
| `wheel-design-104` | 20x9.0 ET35 5x112 SGMF | OYL260416375 / OYL260416376 |

No los he borrado. En la simulación quedan excluidos los dos de la familia 044
(los marcados en negrita) para no publicar la misma llanta dos veces.

### Otros datos del inventario

- **SKU**: 439 únicos, ninguno duplicado, uno por producto. Correcto.
- **Variantes**: una por producto, `Default Title`. No hay selector de medida.
- **Stock**: los 439 en 0, sin seguimiento, política `CONTINUE`. Es una política
  coherente (vender sin controlar stock), pero **no hay disponibilidad
  verificable**, así que la puntuación de stock es 0 para todas las familias.
- **Imágenes**: 437 con una imagen, **2 sin ninguna** (`OYL260416372`,
  `OYL260416377`). Una URL repetida entre dos productos.
- **Metafields**: solo `wheel_diameter`, `wheel_width`, `bolt_pattern`,
  `offset_et`, `center_bore`. **Faltan** los que la ficha de producto del tema
  ya sabe leer: acabado, carga, unidades por juego, neumáticos incluidos,
  verificación manual y vehículos compatibles.
- **Canales**: ningún producto está publicado en ningún canal.
- **HTML**: las 439 descripciones siguen la misma plantilla, sin etiquetas rotas.

---

## Qué pasa si se activan (simulación, paso 8)

- Se activarían **53 productos** de 6 familias, diámetros 18" a 22", PCD 5x112 y
  5x120, precios de 799 € a 1.249 €.
- La lista exacta, producto a producto, está en
  `data/simulacion-publicacion.csv`.
- **Afectaría a Horizon MAIN.** El tema publicado hoy es **Horizon**, no
  SJ Wheels — DEV. Publicar productos en el canal Tienda online los haría
  aparecer en las colecciones y la búsqueda de **Horizon MAIN**, que es lo que
  sirve la tienda. No modifica ningún archivo del tema, pero sí cambia lo que
  MAIN enseña. Conviene decidir esto antes.
- La tienda sigue **protegida por contraseña** (verificado:
  `passwordProtection.enabled = true`), así que nada sería público.

## Cómo revertir

Los 53 IDs están en `data/simulacion-publicacion.csv`. Para deshacer:

1. `productUpdate` con `status: DRAFT` sobre cada ID.
2. `publishableUnpublish` sobre la publicación `gid://shopify/Publication/341516321101`
   («Tienda online»).

Ninguna de las dos operaciones toca temas ni pedidos.
