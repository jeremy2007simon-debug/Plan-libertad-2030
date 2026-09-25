# La tabla de vehículos

Es lo que permite que el asistente, cuando un cliente dice «BMW Serie 3 de 2019»,
sepa qué anclaje, buje, diámetros y ET admite ese coche sin tener que
preguntárselo. Hoy está **vacía**, y por eso el bot sigue pidiendo las medidas.

## Por qué está vacía

Porque no se puede rellenar de memoria. Un anclaje equivocado manda a alguien
unas llantas que no atornillan en su coche. Cada fila necesita una fuente.

## Cómo se llena

Copia `vehiculos-plantilla.csv` a `data/vehiculos.csv`, borra la fila de
ejemplo y añade una por generación de coche. Luego:

```bash
# 1. Comprobar el CSV y generar la tabla del asistente
python3 sj-wheels/tools/vehiculos-a-json.py data/vehiculos.csv

# 2. Subir las mismas fichas a Shopify (simulación primero, sin --apply)
python3 sj-wheels/tools/import-fitment.py data/vehiculos.csv
```

El mismo CSV alimenta los dos sitios —la ficha de producto y el asistente— para
que no puedan decir cosas distintas del mismo coche.

## Las columnas

| Columna | Qué es |
|---|---|
| `accion` | `crear_vehiculo` para una ficha de coche |
| `vehiculo_id` | Identificador en minúsculas con guiones, único: `bmw-serie3-f30` |
| `marca`, `modelo`, `generacion` | Cómo se llama el coche |
| `anio_desde`, `anio_hasta` | Años que cubre. Vacío el final = sigue en producción |
| `pcd` | Anclaje, formato `5x112` |
| `buje_mm` | Buje central del coche, en mm |
| `et_min`, `et_max` | Rango de ET que admite. Sin esto el motor no puede descartar por ET |
| `diametros` | Diámetros admitidos, separados por `;` |
| `anchura_min`, `anchura_max` | Anchuras admitidas |
| `alias` | Cómo lo llama la gente: `f30\|320i\|serie 3`. Separados por `\|` |
| `verificacion` | `verified` o `pending` |
| `evidencia`, `verificado_por`, `fecha_verificacion` | Obligatorias para `verified` |

## La regla que el importador no deja saltarse

Una fila solo entra como `verified` si trae **evidencia, quién la verificó y la
fecha**. Sin las tres, entra como `pending` aunque pongas `verified`.

Una ficha `pending` sirve para **descartar** (si el anclaje no coincide, no
coincide) pero nunca para confirmar. Eso es justo lo que se quiere: el asistente
puede decir «esto no te vale» con seguridad, y «esto es candidata» con reservas.

## De dónde sacar los datos

Tres caminos, y son decisión del propietario:

1. **El proveedor.** Es quien vende las llantas y puede tener las tablas.
2. **Una base de datos de fitment con licencia** (Wheel-Size, TecDoc). Cubre
   todos los coches y se paga por suscripción. La API pública gratuita del
   gobierno de EE. UU. (NHTSA vPIC) **no sirve**: tiene marcas y modelos pero
   ni anclaje, ni buje, ni ET.
3. **A mano, solo para lo que el catálogo puede servir.** Las 83 referencias son
   únicamente `5x112` (buje 66,5) y `5x120` (buje 72,6 / 72,56). Los coches que
   SJ Wheels puede calzar son los de esos dos anclajes y nada más, así que la
   tabla útil es mucho más corta que «todos los coches del mercado».
