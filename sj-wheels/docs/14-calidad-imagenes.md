# Calidad de imagen medida a los tamaños reales de la tienda

**Fecha:** 19 de septiembre de 2026

## Cómo se ha medido (y por qué no se ha usado un corte de 1000 px)

Un umbral de píxeles por sí solo no dice nada: lo que importa es a qué tamaño
**muestra** el tema cada imagen. Se leyeron los tamaños reales en el código del
tema Horizon y se renderizó cada fotografía a esos tamaños exactos en un
navegador (Chromium, densidad 1x y 2x), en lugar de juzgar por el número:

| Sitio donde aparece | Ancho real en CSS |
|---|---|
| Tarjeta de colección, móvil a 390 px (2 columnas) | ≈ 171 px |
| Tarjeta de colección, escritorio (`medium` + `centered`) | 250 px |
| Galería de producto, móvil | ≈ 390 px |
| Galería de producto, escritorio | ≈ 660 px |

De ahí salen cuatro tramos, que son los que se han aplicado a las 131 familias:

| Ancho del archivo | Veredicto |
|---|---|
| **≥ 560 px** | Se ve bien en todo: tarjeta y galería, móvil y escritorio |
| **300 – 559 px** | Bien en tarjeta y en galería de móvil; blanda en la galería de escritorio |
| **190 – 299 px** | Solo sirve para la tarjeta de colección |
| **< 190 px** | No sirve a ningún tamaño real de la tienda |

Esto **corrige** el criterio de 800 px que usé en la primera pasada: era
arbitrario y descartaba familias que en pantalla se ven correctamente.

## Estado del catálogo

| Tramo | Familias (de 131) | Productos (de 439) |
|---|---|---|
| ≥ 560 px | 29 | 122 |
| 300 – 559 px | 11 | 32 |
| 190 – 299 px | 39 | 170 |
| < 190 px | 52 | 115 |

La peor del catálogo es `wheel-design-013`, con 120 × 116 px: a 250 px de tarjeta
ya se ve pixelada. Hay además dos referencias (`OYL260416...`, familia registrada
como `sin-diseno`) cuyo archivo no trae dimensiones legibles.

## Las diez familias seleccionadas

Las diez superan el tramo alto. **Ninguna necesita reemplazo para publicar**:

| Familia | Ancho × alto mínimo | Veredicto |
|---|---|---|
| SJW-038 | 927 × 899 | Apta en todo |
| SJW-040 | 916 × 873 | Apta en todo |
| SJW-049 | 915 × 873 | Apta en todo |
| SJW-043 | 908 × 888 | Apta en todo |
| SJW-048 | 897 × 906 | Apta en todo |
| SJW-041 | 893 × 890 | Apta en todo |
| SJW-044 | 882 × 868 | Apta en todo |
| SJW-074 | 728 × 678 | Apta en todo |
| SJW-124 | 634 × 596 | Apta en todo |
| SJW-059 | 624 × 591 | Apta en todo |

## Lo que sí hace falta, aunque no bloquee

1. **Una sola foto por producto, en las 439.** No hay segunda vista, ni detalle
   del radio, ni foto montada en coche. Una ficha de 999 € con una única
   fotografía de catálogo se queda corta frente a cualquier competidor.
2. **Las 91 familias por debajo de 300 px hay que rehacerlas**, no reescalarlas:
   ampliar un archivo de 150 px no añade información, solo lo emborrona. Se
   necesitan los originales del proveedor.
3. Fondo y encuadre son homogéneos dentro de cada familia, lo cual ayuda: la
   rejilla de colección se ve ordenada.

**Ninguna imagen se ha agrandado artificialmente.** Los archivos son los que
envió el proveedor.
