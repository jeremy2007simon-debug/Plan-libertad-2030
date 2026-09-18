# 07 · Vista previa y QA visual

Fecha: 2026-09-18
Tema de desarrollo: **`SJ Wheels — DEV (no publicar)`** · `gid://shopify/OnlineStoreTheme/196061626701`
Tema de producción: **`Horizon`** · `gid://shopify/OnlineStoreTheme/196025975117` · rol `MAIN` · **sin tocar**

---

## 1. Cómo ver la tienda sin quitar la contraseña

La tienda tiene la protección por contraseña **activada** (`onlineStore.passwordProtection.enabled: true`).
Eso es correcto: no se puede abrir al público hasta que estén los bloqueantes.
La contraseña **no** se expone en la Admin API, así que yo no puedo renderizar la tienda desde aquí.
Estas son las tres formas de verla sin desactivar nada:

### a) Vista previa desde el admin *(la recomendada)*

```
https://admin.shopify.com/store/5y82gi-yt/themes
```

En la lista de temas, en **`SJ Wheels — DEV (no publicar)`** → botón **···** → **Vista previa**.
Al estar con la sesión del admin abierta, la contraseña no se pide.

### b) Enlace para compartir con alguien que no tiene acceso al admin

Mismo menú **···** → **Compartir vista previa**. Shopify genera un enlace temporal que
**salta la contraseña** para quien lo reciba, sin desactivarla para el resto.
Es la vía correcta para enseñárselo a un cliente, a un fotógrafo o a la asesoría.

### c) URL directa *(hay que introducir la contraseña una vez)*

```
https://5y82gi-yt.myshopify.com/?preview_theme_id=196061626701
```

Sin sesión devuelve `302` a `/password`. Tras introducir la contraseña de la tienda una vez,
la URL de arriba muestra el tema de desarrollo.

### Enlaces directos a cada página, una vez dentro de la vista previa

| Página | Ruta |
|---|---|
| Portada | `/` |
| Catálogo completo | `/collections/all` |
| Colección por diámetro | `/collections/llantas-19-pulgadas` |
| Ficha de producto | `/products/oyl260416001-18-mercedes-benz` |
| Guía técnica | `/pages/guia-tecnica` |
| Envíos | `/pages/envios` |
| Contacto | `/pages/contacto` |
| Editor del tema | `https://admin.shopify.com/store/5y82gi-yt/themes/196061626701/editor` |

### Qué se verá y qué no

> **Importante.** Los 439 productos están en `DRAFT` y el idioma predeterminado sigue siendo inglés.
> En la vista previa, el catálogo aparecerá **vacío** y algunos textos de Horizon saldrán en inglés.
> No es un fallo del tema: son los bloqueantes 2 y 6 del checklist de lanzamiento.
> Para ver una ficha con contenido hay que abrir su URL directa (los borradores se ven en vista previa).

### Lista de comprobación por página

| Página | Qué mirar |
|---|---|
| Portada | Selector de vehículo con su estado vacío · beneficios · pasos · categorías por diámetro · guía técnica · FAQ · CTA final |
| Catálogo | Rejilla 1/2/3/4 columnas según el ancho · badge de compatibilidad en cada tarjeta · ficha técnica resumida · barra de vehículo pegada arriba |
| Producto | Panel técnico completo · estado de compatibilidad · confirmación obligatoria antes de añadir al carrito · acordeón de dudas |
| Comparador | Cajón lateral · tabla de medidas · botón flotante con el contador |
| Guía técnica | Diagrama de llanta · glosario de términos |
| Pie | Sin iconos de pago (no hay pasarela) · sin redes sociales (no hay perfiles reales) · sin WhatsApp (no hay número) |

---

## 2. QA visual: cómo se ha hecho

**No he podido renderizar la tienda real**: está protegida por contraseña y la Admin API no
la expone. Decirte lo contrario sería mentir sobre el alcance de la prueba.

Lo que sí he hecho es montar un **banco de pruebas** con Chromium que carga el CSS real del
tema y el marcado real de las 13 secciones y bloques, y lo mide a los seis anchos pedidos.

```
python3 sj-wheels/tests/visual/banco-visual.py   # genera el banco
node    sj-wheels/tests/visual/qa-visual.js      # mide y captura
```

Qué mide, en cada uno de los 6 anchos:

| Comprobación | Umbral |
|---|---|
| Desbordes horizontales | `scrollWidth` del documento igual al viewport; ningún elemento fuera del borde |
| Áreas táctiles | ≥ 44 px de alto en pantalla táctil (WCAG 2.5.8) |
| Tamaño de letra | ≥ 12 px reales, contando la escala de los SVG |
| Contraste de texto | 4.5:1 normal, 3:1 grande (WCAG 2.1 AA), componiendo capas semitransparentes |

Limitaciones que debes conocer:

- El Liquid se reduce a HTML de forma aproximada: los bucles rinden una sola pasada.
- La tipografía del banco no es la del tema (la sirve Horizon desde sus ajustes).
- No se prueban interacciones reales (abrir el cajón, elegir vehículo, añadir al carrito).
- **Sigue haciendo falta una pasada a ojo en la vista previa del admin** antes de publicar.

---

## 3. Problemas encontrados y corregidos

Todos eran defectos de maquetación o de accesibilidad, sin ninguna decisión comercial,
así que los he corregido directamente.

| # | Página / zona | Anchos afectados | Gravedad | Problema | Causa | Corrección |
|---|---|---|---|---|---|---|
| 1 | Todas las secciones `sjw-` | 360, 390, 768, 1024 | **Alta** | La página se desplazaba en horizontal: `scrollWidth` 498 px con viewport de 360 px | `.sjw-container` tiene `width:100%` + `padding-inline`, y mi CSS daba por hecho el `box-sizing: border-box` del reset de Horizon | Regla propia `[class*="sjw-"] { box-sizing: border-box }`: el cálculo de anchos deja de depender del tema base |
| 2 | Categorías, beneficios, pasos, selector, guía, FAQ, CTA, ficha técnica | 360, 390 | **Alta** | Un título largo de colección ensanchaba la columna y sacaba la rejilla del viewport | `repeat(N, 1fr)` es `minmax(auto, 1fr)`: la pista nunca baja del contenido | Todas las rejillas pasan a `repeat(N, minmax(0, 1fr))` |
| 3 | Tarjeta de categoría | 360, 390 | Media | La tarjeta desbordaba su propia rejilla | `.sjw-cat` y `.sjw-cat__body` son `display:grid` sin columnas declaradas → pista automática del tamaño del contenido | Columnas explícitas `minmax(0, 1fr)` y `min-width: 0` general para los elementos `sjw-` |
| 4 | Botones pequeños (`.sjw-btn--sm`) en barra de vehículo, selector, categorías, comparador y tarjeta | 360, 390, 768 | **Alta** | Altura de 38 px y uno de 26 px de ancho: por debajo del mínimo táctil | `.sjw-btn--sm` sobreescribía el `min-height: 48px` de `.sjw-btn` | `min-width: 44px` siempre y `min-height: 44px` bajo `@media (pointer: coarse)` |
| 5 | Texto secundario de toda la tienda (`--sjw-text-faint`) | Todos | **Alta** | Contraste 4.15:1 sobre el fondo y 3.87:1 sobre superficie metálica: **por debajo de AA**, en 38 elementos | El token `#6E737D` era demasiado oscuro para el fondo `#090A0C` | Token a `#8B919B`: 6.25:1 sobre el fondo y 4.61:1 sobre metal. Sigue siendo claramente jerarquía secundaria |
| 6 | Botones inactivos | Todos | Media | La etiqueta de un botón deshabilitado casi no se leía | `opacity: .45` aplicada a todo el botón, fondo y texto a la vez | Estado inactivo con superficie neutra y texto atenuado (`--sjw-metal-soft` + `--sjw-text-faint`), sin opacidad global |
| 7 | Antetítulos (`.sjw-eyebrow`) | 360, 390 | Baja | 11 px en mayúsculas con espaciado ancho, difícil de leer en móvil | `font-size: .6875rem` | 12 px (`.75rem`) |
| 8 | Guía técnica, diagrama SVG | 360, 390 | Baja | Las etiquetas «PCD» y «BUJE» bajaban a 10–11 px reales al escalar el SVG en móvil | `font-size="10"` y `"11"` en el viewBox de 320 px | Las tres etiquetas a `font-size="13"` |

### Resultado después de las correcciones

| Ancho | Desplazamiento horizontal | Desbordes | Áreas táctiles < 44 px | Texto < 12 px | Contraste AA |
|---|---|---|---|---|---|
| 360 px (táctil) | No | 0 | 0 | 0 | 0 fallos |
| 390 px (táctil) | No | 0 | 0 | 0 | 0 fallos |
| 768 px (táctil) | No | 0 | 0 | 0 | 0 fallos |
| 1024 px | No | 0 | 0 (*) | 0 | 0 fallos |
| 1440 px | No | 0 | 0 (*) | 0 | 0 fallos |
| 1920 px | No | 0 | 0 (*) | 0 | 0 fallos |

(*) Con ratón, los botones pequeños miden 38 px de alto. WCAG 2.5.8 pide 24 px como mínimo,
así que cumplen; en pantalla táctil suben a 44 px. No es un defecto pendiente.

---

## 4. Lo que este QA **no** cubre

| No probado | Por qué | Quién lo cierra |
|---|---|---|
| Render real de la tienda | Contraseña de tienda; la API no la expone | Propietario, en la vista previa del admin |
| Tipografía definitiva | La sirve Horizon desde sus ajustes | Revisión a ojo |
| Interacciones (cajón, selector, carrito) | El banco no ejecuta el JS del tema con datos reales | Revisión a ojo |
| Aspecto con productos publicados | Los 439 están en `DRAFT` | Tras el bloqueante 6 |
| Lector de pantalla | Requiere NVDA/VoiceOver sobre la tienda real | Revisión manual |
| Rendimiento real (LCP, CLS) | Necesita la tienda servida por Shopify | Lighthouse sobre la vista previa |

---

## 5. Shopify Search & Discovery

**No está instalada.** Aplicaciones presentes hoy en la tienda:

| App | Estado |
|---|---|
| Messaging | Instalada (venía con la tienda) |
| DSers-AliExpress Dropshipping | Instalada (venía con la tienda) |
| Shopify Claude Connector App | Instalada (es la conexión que uso yo) |

Search & Discovery es **gratuita** de Shopify, pero instalar una app requiere que el propietario
la autorice desde el admin: no se puede instalar desde la Admin API, y tampoco entra dentro de
lo que se me ha encargado tocar.

### Qué aporta y qué pasa mientras no esté

Sin ella, las colecciones solo ofrecen los filtros por defecto de Shopify
(disponibilidad y precio). **Los filtros por metafield no existen.**
Es decir: hoy el cliente no puede filtrar por diámetro, PCD, ET ni buje desde la barra lateral
de la colección; solo navegar por las colecciones de diámetro y usar el selector de vehículo.

### Instalación y configuración, paso a paso

1. Admin → **Aplicaciones** → buscar «Search & Discovery» → **Instalar** (gratuita).
2. **Filtros** → *Añadir filtro* → *Metacampo de producto*.
3. Activar, **en este orden**:

| Orden | Metafield | Etiqueta al cliente | Tipo de filtro |
|---|---|---|---|
| 1 | `custom.diameter` | Diámetro | Lista |
| 2 | `custom.bolt_pattern` | PCD (tornillería) | Lista |
| 3 | `custom.width` | Anchura | Lista |
| 4 | `custom.offset_et` | ET | Rango |
| 5 | `custom.center_bore` | Buje central | Lista |

4. **No activar** `custom.finish` (acabado). Los valores de origen son códigos del proveedor
   (`mb`, `gmf+chromeinsert`, `miyb`…) y se le mostrarían tal cual al cliente.
   La faceta sigue desactivada en el tema (`sjw_show_finish_facet: false`) y debe seguir así
   hasta que exista la tabla de traducción (`data/acabados-pendientes-de-traducir.csv`).
5. **No activar** `custom.compatible_vehicles` como filtro. La compatibilidad no se filtra:
   se decide en el motor, con las reglas de verificación. Un filtro daría a entender que
   cualquier resultado es compatible.

### Sinónimos de búsqueda recomendados (sección *Sinónimos* de la misma app)

| Término | Sinónimos |
|---|---|
| llanta | rin, aro, rueda |
| PCD | tornillería, bolt pattern, huella |
| ET | offset, desplazamiento |
| buje | center bore, centro |
| pulgadas | " |

Estos sinónimos no afirman nada sobre el producto: solo hacen que el buscador entienda
cómo habla el cliente.
