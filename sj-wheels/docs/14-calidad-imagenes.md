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

---

## Revisión del 20-09-2026 · mirando las fotos, no solo los píxeles

El corte de 560 px dice si una imagen **se ve nítida**. No dice si **sirve**. Al
abrir las diez y compararlas en una rejilla aparecen tres cosas que el número no
detectaba, y que corrigen mi conclusión anterior de que «ninguna necesita
sustitución».

### 1. Tres de las diez no son fotografías: son renders 3D

| Familia | Qué es | Vista | Fondo |
|---|---|---|---|
| SJW-038, 040, 041, 043, 044, 048, 049 | Fotografía de estudio | Frontal | Gris claro |
| **SJW-059, 074, 124** | **Render 3D** | Tres cuartos | Blanco recortado |

Los renders son limpios y están bien resueltos, pero **no prueban cómo es la
pieza real**, y mezclados con siete fotografías frontales en la misma rejilla de
colección se nota: cambia la perspectiva, la luz y el fondo de una tarjeta a la
siguiente.

### 2. Una sola imagen no puede representar dos acabados

Seis de las diez familias tienen más de un código de acabado, y todas las
referencias de la familia comparten la **misma** imagen:

| Familia | Códigos de acabado | Referencias que muestran una imagen que no les corresponde |
|---|---|---|
| SJW-038 | MB+L, YBZ | 1 de 6 |
| SJW-040 | MB, MG | 4 de 9 |
| SJW-041 | MBI, MB, MIB | 8 de 13 |
| SJW-044 | MB, MG | 1 de 9 |
| SJW-059 | B, MB | 2 de 8 |
| SJW-074 | MB, B | 7 de 12 |

En total, **23 de las 83 referencias enseñan una imagen que no es la de su
acabado**. Esto no se arregla con más resolución: hace falta una foto por
acabado. Es el motivo por el que la ficha dice «código de acabado del proveedor»
y no un nombre de color.

### 3. El margen sobre la galería de escritorio es mínimo en dos familias

La galería de escritorio ocupa unos 660 px. SJW-059 (624 px) y SJW-124 (634 px)
están **por debajo**: el navegador las estira un 5–6 %. Se ve bien, pero sin
margen, y en una pantalla de alta densidad se queda blando.

### Veredicto corregido

- **Publicables tal cual:** las siete fotografías de estudio (038, 040, 041, 043,
  044, 048, 049), con la salvedad del acabado.
- **Publicables pero conviene reemplazar:** 059, 074 y 124 — por ser renders y
  por quedarse justas de tamaño.
- **Hace falta pedir al proveedor**, y está en el mensaje del documento 19:
  originales de al menos 2000 px, una segunda vista por diseño y **una imagen por
  acabado**.
