# Duplicados y referencias · qué se conserva y qué se aparta

**Fecha:** 19 de septiembre de 2026

## Regla aplicada

Se conservan **los 439 SKU tal como vienen del proveedor**. No se ha borrado, ni
fusionado, ni renumerado ninguno. Un duplicado se aparta de la selección, no del
catálogo.

Se considera duplicado una referencia que coincide con otra en **todo** lo que la
define: familia de diseño, diámetro, anchura, anclaje, ET, buje y código de
acabado. Si cambia aunque sea el acabado, son productos distintos.

## Duplicados encontrados: 4 pares, 8 referencias

| Familia | Medida | ET | Acabado | Se publica | Se aparta |
|---|---|---|---|---|---|
| SJW-044 | 20x8.5 5x112 | 36 | MB | `OYL260416137` | `OYL260416139` |
| SJW-044 | 20x9.5 5x112 | 45 | MB | `OYL260416138` | `OYL260416140` |
| SJW-067 | 18x8.0 5x114.3 | 38 | MB | `OYL260416245` | `OYL260416246` |
| SJW-104 | 20x9.0 5x112 | 35 | SGMF | `OYL260416375` | `OYL260416376` |

De los cuatro, solo SJW-044 está en la selección: por eso esa familia publica
9 de sus 11 referencias.

Las cuatro apartadas **siguen en la tienda, en borrador, sin tocar**. Si el
proveedor confirma que son artículos distintos (por ejemplo, dos lotes o dos
fábricas), vuelven a entrar sin trabajo adicional.

## Referencias apartadas por ficha incompleta

| SKU | Familia | Qué le falta |
|---|---|---|
| `OYL260416095` | SJW-038 | Sin ET, sin buje, sin acabado. Nota del proveedor: «Consultar» |
| `OYL260416098` | SJW-038 | Sin ET, sin buje, sin acabado. Nota del proveedor: «Consultar» |

No se publican porque una llanta sin ET no se puede montar con seguridad, y
rellenar ese hueco con el ET de su «hermana» de 18" sería inventarlo. Tampoco se
borran.

## Comprobaciones sobre los identificadores

- **439 SKU distintos**, uno por producto. Ninguno se repite.
- **Los handles antiguos se han cambiado solo en las 83 referencias
  seleccionadas**, para sacar la marca de coche de la URL. El SKU, que es el
  identificador con el que se habla con el proveedor, no se ha tocado en ninguna.
- Las referencias de una misma familia son contiguas en casi todos los casos. En
  SJW-038 y algún otro diseño no lo son, lo cual puede significar que el
  proveedor agrupó dos moldes bajo la misma foto. Está anotado en el ranking
  (`data/ranking-familias-v2.csv`, columna `problemas`) para preguntárselo.
