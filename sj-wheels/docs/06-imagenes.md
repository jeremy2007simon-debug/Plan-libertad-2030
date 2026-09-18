# 06 · Auditoría e instrucciones de imagen de producto

Fecha de la auditoría: 2026-09-18
Alcance: los **439 productos** del catálogo (no incluye el producto de muestra archivado).
Fuente de datos: `sj-wheels/data/auditoria-imagenes.csv` (una fila por producto).

---

## 1. Qué se ha reparado en esta fase

En la auditoría anterior se detectaron **78 productos sin imagen**. La causa no era la
ausencia de fotos del propietario: las 54 imágenes de origen existían, pero la importación
original a Shopify había fallado.

| Dato | Valor |
|---|---|
| Estado del medio en Shopify | `FAILED` |
| Error registrado | `The file does not exist (Unsuccessful HTTP response code: 403, reason: Forbidden)` |
| Origen | `https://novacore-wheel-images.vercel.app/llantas/wheel-design-NNN.png` |
| Diagnóstico | 403 **intermitente** (limitación de frecuencia del origen), no permanente. La misma URL devolvió 200 y 403 en peticiones consecutivas. |

Actuación (no se ha generado ninguna imagen nueva ni se ha sustituido ninguna imagen real):

1. Descarga de las 54 imágenes de origen con reintentos y espera progresiva.
2. Exclusión de `wheel-design-104.png`: el archivo de origen mide **176 × 39 px** y es una
   franja rota, no una llanta. No se sube algo que no representa el producto.
3. Subida de las 53 imágenes válidas al CDN de Shopify (`stagedUploadsCreate` + `productCreateMedia`).
4. Texto alternativo derivado del **título real** de cada producto. No se ha inventado ningún texto.
5. Eliminación de los 76 registros de medio `FAILED` que quedaban huérfanos (registros rotos,
   sin imagen asociada; sus URL de origen quedan registradas en `data/imagenes-fallidas.csv`,
   por lo que la operación es reproducible).

Resultado:

| Antes | Después |
|---|---|
| 78 productos sin imagen | **2 productos sin imagen** |

Los 2 restantes son `OYL260416372` y `OYL260416377`, que dependen del archivo roto
`wheel-design-104.png`. **Requieren una foto nueva del propietario.**

---

## 2. Clasificación actual de los 439 productos

| Clasificación | Productos | Criterio |
|---|---|---|
| Baja resolución | 362 | lado menor < 800 px |
| Imagen repetida | 74 | lado menor ≥ 800 px pero la misma foto se usa en más de un producto |
| Mejorable | 1 | lado menor entre 800 y 1600 px y foto exclusiva |
| Correcta | 0 | lado menor ≥ 1600 px, foto exclusiva |
| Sin imagen | 2 | sin medio válido |

La columna `imagen_repetida` del CSV es independiente de la clasificación, porque la
repetición y la baja resolución se dan a la vez en casi todo el catálogo:

> **394 de los 437 productos con foto comparten su imagen con otro producto.**
> Solo hay **130 diseños de origen distintos** para 437 productos.

Reutilizaciones mayores: `wheel-design-072` y `wheel-design-030` (16 productos cada una),
`wheel-design-041` (13), `wheel-design-074` (12), `wheel-design-044` (11), `wheel-design-081` (10).

### Por qué esto importa antes de publicar

Un catálogo de llantas se compra por el aspecto. Con imágenes de 150–900 px y compartidas
entre 16 referencias, el cliente no puede distinguir un producto de otro ni ampliar el
detalle del radio. Es el mayor bloqueo comercial pendiente que **no** depende de
desarrollo, sino de fotografía.

---

## 3. Lista priorizada de fotos a producir

Archivo: `sj-wheels/data/prioridad-fotos.csv` — **131 grupos de foto**.

La lista está agrupada por **diseño de origen**, no por producto: una sola sesión de foto
de un diseño resuelve todos los productos que hoy comparten esa imagen.

| Columna | Contenido |
|---|---|
| `prioridad` | 1 = primero |
| `diseno_origen` | archivo actual compartido, o `(ninguno)` si no hay imagen |
| `productos_afectados` | cuántos productos quedan resueltos con esa foto |
| `ancho_px` / `alto_px` | resolución actual |
| `severidad` | critica / alta / media / baja |
| `motivo` | por qué entra en la lista |
| `skus` | SKU exactos afectados |

Orden: primero severidad, después número de productos afectados, después resolución.

| Severidad | Grupos | Definición |
|---|---|---|
| Crítica | 91 | sin imagen, o lado menor < 300 px |
| Alta | 27 | lado menor < 800 px |
| Media | 13 | lado menor < 1600 px |

Las 10 primeras posiciones cubren aproximadamente **100 productos**.

---

## 4. Convención de nombres de archivo

```
<SKU>_<vista>_<orden>.<ext>
```

Ejemplos:

```
OYL260416089_frontal_01.jpg
OYL260416089_tresCuartos_02.jpg
OYL260416089_perfil_03.jpg
OYL260416089_detalle_04.jpg
OYL260416089_montada_05.jpg
```

Reglas:

- **SKU exactamente como está en Shopify**, en mayúsculas, sin espacios ni acentos.
- Vistas admitidas: `frontal`, `tresCuartos`, `perfil`, `detalle`, `montada`, `embalaje`.
- `orden` con dos dígitos; `01` es la imagen principal de la ficha y la que sale en el listado.
- Extensión en minúsculas: `jpg` para foto, `png` solo si hay transparencia real.
- Sin acentos, sin `ñ`, sin espacios, sin paréntesis. El guion bajo separa los tres campos.
- Si un mismo diseño sirve a varios SKU, se nombra con el SKU de menor número y se indica
  en la columna `notas_del_propietario` de la plantilla qué SKU lo comparten.

---

## 5. Requisitos técnicos de la foto

| Parámetro | Recomendación | Mínimo aceptable |
|---|---|---|
| Resolución | 2048 × 2048 px | 1600 × 1600 px |
| Proporción | 1:1 cuadrada | 1:1 |
| Formato | JPG calidad 85–90 | JPG / PNG |
| Peso por archivo | < 500 KB | < 2 MB |
| Perfil de color | sRGB | sRGB |
| Fondo | blanco puro `#FFFFFF` o gris muy claro `#F5F5F2`, liso y uniforme | blanco liso |
| Sombra | sombra de contacto suave bajo la llanta | sin sombra dura |
| Encuadre | llanta centrada, margen libre del 8–10 % por lado | llanta completa visible |
| Enfoque | radios y borde exterior nítidos | sin desenfoque de movimiento |
| Iluminación | dos fuentes difusas laterales; sin reflejos que oculten el acabado | sin quemados |

Por qué 2048 px: Shopify genera las miniaturas a partir del original y el zoom de la ficha
se sirve a 1445–2048 px en pantallas grandes. Por debajo de 1600 px el zoom se ve borroso.

### Series por producto

| Orden | Vista | Obligatoria |
|---|---|---|
| 01 | Frontal, llanta de cara, radios centrados | Sí |
| 02 | Tres cuartos, 30–40° | Sí |
| 03 | Perfil, para mostrar el ET y la profundidad | Recomendada |
| 04 | Detalle del acabado y del buje | Recomendada |
| 05 | Montada en vehículo | Opcional |

Consistencia: misma distancia focal, misma altura de cámara y mismo fondo en todo el
catálogo. Una llanta no debe verse mayor que otra por el encuadre, solo por su diámetro real.

---

## 6. Plantilla de subida

Archivo: `sj-wheels/data/plantilla-imagenes-nuevas.csv` — **439 filas, una por producto**,
ya ordenadas por prioridad.

| Columna | Qué hacer |
|---|---|
| `sku` | ya rellena. No modificar. |
| `handle` | ya rellena. No modificar. |
| `nombre_archivo` | ya propuesta siguiendo la convención. Cambiar la extensión si la foto es PNG. |
| `vista` | `frontal` por defecto. |
| `orden` | `1` por defecto. |
| `alt_es` | ya rellena con el título real del producto. Mejorar si se quiere. |
| `alt_en` | vacía. Se rellenará al traducir el catálogo. |
| `estado_actual` | informativa: clasificación actual de la imagen. |
| `prioridad` / `severidad` | informativas: en qué orden conviene fotografiar. |
| `notas_del_propietario` | libre. |

Para añadir vistas adicionales a un producto, se duplica su fila y se cambian `vista`,
`orden` y `nombre_archivo`.

**El texto alternativo nunca debe describir compatibilidades.** «Llanta de 19" acabado
negro brillante» es correcto. «Llanta para BMW Serie 3» no lo es mientras la compatibilidad
no esté verificada.

---

## 7. Lo que no se ha hecho, y por qué

| Acción | Motivo |
|---|---|
| Generar imágenes nuevas con IA | Prohibido por el encargo, y falsearía el producto. |
| Escalar las imágenes de 150 px | Un reescalado no añade detalle; produce una foto borrosa presentada como buena. |
| Sustituir imágenes reales del propietario | Prohibido por el encargo. |
| Subir `wheel-design-104.png` | El archivo de origen está roto (176 × 39 px). |
| Eliminar productos sin foto | Prohibido por el encargo. Quedan en borrador. |
