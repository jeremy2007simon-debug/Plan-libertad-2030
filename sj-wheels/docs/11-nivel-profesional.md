# Fase de acabado profesional — registro de trabajo

Tema de desarrollo: **SJ Wheels — DEV** (`gid://shopify/OnlineStoreTheme/196061626701`).
Vista previa: `https://4xhnw14lval3xsbb-99569205581.shopifypreview.com/es`
El tema no se publica. Horizon MAIN no se toca.

## 1. Identidad y SEO

| Qué | Dónde | Comprobación |
|---|---|---|
| Nombre de marca desacoplado del nombre de la tienda | `settings_schema.json` → `sjw_brand_name` | `<title>` y JSON-LD imprimen «SJ Wheels» |
| Título y descripción de portada | `sjw_seo_title` (57 car.), `sjw_seo_description` (144 car.) | vistos en el HTML de `/es` |
| Imagen para compartir | `sjw_share_image`, con respaldo en el logo | `og:image` y `twitter:image` |
| `hreflang` | `snippets/meta-tags.liquid` | `/es` declara `es`, `en` y `x-default` |
| Datos estructurados | `snippets/sjw-structured-data.liquid` | `WebSite` con `SearchAction`; `Product` **solo** en ficha de producto; sin `AggregateRating` |

En el dominio de vista previa `localization.available_languages` devuelve un solo
idioma aunque se esté sirviendo `/es`. Por eso el idioma activo se declara
siempre, además de recorrer la lista.

## 2. Enlaces internos

`snippets/sjw-url.liquid` resuelve toda ruta interna al idioma activo. Shopify
Liquid no tiene `starts_with`, así que se compara el primer carácter con
`slice: 0`.

Rastreador: `sj-wheels/tests/enlaces/crawl.js`. Recorre la tienda **renderizada**
y busca rutas mal concatenadas (`/espages`), dobles barras, pérdida del idioma,
`href` vacío, `#` sin comportamiento y 404.

```
PREVIEW=https://4xhnw14lval3xsbb-99569205581.shopifypreview.com \
  node sj-wheels/tests/enlaces/crawl.js
```

Resultado actual: **1150 enlaces en 17 páginas, 27 destinos únicos, sin problemas.**

Los destinos se comprueban navegando de verdad, no con `page.request.get`:
sin las cabeceras de un documento, `/es/account` devolvía 406 sin estar roto.

## 3. Estado vacío único

Horizon pintaba su propio bloque vacío en `snippets/product-grid.liquid` con dos
defectos: un enlace sin destino (`href` vacío) y el texto «prueba a utilizar
menos filtros» aunque no hubiera ningún filtro aplicado. Además se sumaba al de
la sección `sjw-catalog-state`, de modo que una colección vacía mostraba dos
mensajes distintos.

Ahora:

- **Colección** → lo escribe solo `sections/sjw-catalog-state.liquid`, que
  distingue catálogo sin publicar, colección vacía y filtros sin resultado.
  `product-grid` no imprime nada.
- **Búsqueda** → lo escribe `product-grid`, y distingue si hay filtros:
  - con filtros: texto de filtros y enlace real para quitarlos
    (`routes.search_url` + la consulta), solo si esa URL existe;
  - sin filtros: texto de búsqueda sin resultados, con enlace a la consulta de
    compatibilidad y al catálogo completo.

Comprobado en la vista previa sobre `/es/search?q=llanta`,
`/es/search?q=zzzxxqq` y `/es/collections/all`: un único bloque por página,
ningún `<a>` sin `href`.

### Claves de idioma duplicadas

`sjw.collection.empty_title` y `empty_body` estaban definidas **dos veces** en
`es.json` y en `en.default.json`. Ganaba la segunda, así que una colección vacía
mostraba el texto de los filtros. Se eliminó el par duplicado y se añadió el
bloque `sjw.search`.

## 4. Archivos de prueba obsoletos en el tema

Dos archivos se subieron para aislar rechazos silenciosos de Shopify y ya no
sirven. La API de temas disponible aquí **no permite borrar archivos**, así que
quedan vacíos (solo un comentario) y no los invoca ninguna plantilla:

- `snippets/sjw-sd-test.liquid`
- `sections/sjw-req-test.liquid` — lleva un esquema mínimo llamado
  «Obsoleta (borrar)» y sin `presets`, de modo que no aparece en el selector de
  secciones del editor.

**Pendiente del propietario:** borrarlos en Tienda online → Temas →
SJ Wheels — DEV → Editar código.

## 5. Archivos de Horizon modificados

Cada uno lleva un comentario que explica por qué. Una actualización de Horizon
los sobrescribiría, así que conviene revisarlos al actualizar el tema.

| Archivo | Motivo |
|---|---|
| `snippets/meta-tags.liquid` | marca, SEO de portada, `og:locale`, `hreflang` |
| `sections/header.liquid` | JSON-LD `Organization` con la marca y la URL del idioma |
| `snippets/product-grid.liquid` | estado vacío único, sin enlace sin destino |
| `blocks/footer-copyright.liquid` | el pie imprimía el nombre administrativo de la tienda |

## 6. Rechazos silenciosos de Shopify

`themeFilesUpsert` devuelve `userErrors: []` y no escribe el archivo. Hay que
comprobar siempre por checksum. Cuatro causas encontradas hasta ahora, las
cuatro con su comprobación automática en `qa.py`:

| Causa | Comprobación |
|---|---|
| Nombre de esquema de más de 25 caracteres | 16 |
| Llave literal `{` dentro de una cadena de Liquid | 17 |
| Operador `starts_with`, que Liquid no tiene | — (documentado) |
| Plantilla JSON con una sección fuera de `order` | 19 |

## 7. Estabilidad visual

Dos causas de salto medidas y corregidas:

- La barra de vehículo pintaba su botón vacío y el JavaScript lo rellenaba
  0,8 s después. En la colección eso valía **CLS 0,323**. Ahora el estado
  "sin vehículo" se pinta desde el servidor.
- El bloque `<style>` iba al final de cada sección: el navegador podía pintar
  sin él y la solicitud de compatibilidad saltaba 36 px (**CLS 0,138**).
  Movido delante del marcado en las 17 secciones y bloques propios, con la
  comprobación 20 de `qa.py` para que no vuelva.

## 8. Pruebas

Todo de una vez:

```
PREVIEW=https://4xhnw14lval3xsbb-99569205581.shopifypreview.com   bash sj-wheels/tests/todas.sh
```

| Prueba | Orden | Resultado |
|---|---|---|
| Revisión estática del tema | `python3 sj-wheels/tests/qa.py` | 20 comprobaciones, sin errores |
| Motor de compatibilidad | `node sj-wheels/tests/fitment.test.js` | 66 correctas, 0 fallidas |
| Guardia de compra | `node sj-wheels/tests/guard/guard.test.js` | 40 correctas, 0 fallidas |
| Enlaces del storefront | `node sj-wheels/tests/enlaces/crawl.js` | 1150 enlaces, sin problemas |
| Accesibilidad WCAG 2.2 AA | `node sj-wheels/tests/accesibilidad/axe.js` | 19 análisis, sin infracciones |
| Rendimiento y consola | `node sj-wheels/tests/rendimiento/medir.js` | sin errores del tema |
| Diseño adaptable | `node sj-wheels/tests/responsive/capturar.js` | 30 capturas, sin problemas |

La guardia de compra llevaba fallando desde antes de esta fase y nadie lo
había visto: el banco inyectaba el garaje con `addInitScript`, que
`setContent` no vuelve a ejecutar, así que la prueba medía un error del banco.
Corregido, y la guardia además aguanta ahora que el motor no llegue a cargar:
en ese caso deja la compra cerrada en lugar de romperse.

`shopify theme check` no está instalado en este entorno y no lo he podido
ejecutar. `qa.py` cubre las reglas del proyecto más las cuatro causas de
rechazo silencioso de arriba, que Theme Check no detecta.
