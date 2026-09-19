# 10 · Corrección de la experiencia real de la tienda

Fecha: **2026-09-19**
Tema: `SJ Wheels — DEV (no publicar)` · `gid://shopify/OnlineStoreTheme/196061626701`
Rama: `claude/focused-tesla-q9yurp`
Vista previa usada: `https://4xhnw14lval3xsbb-99569205581.shopifypreview.com`

> Todo lo de este documento se ha verificado **en esa vista previa**, con Liquid y
> recursos reales, no en un banco de pruebas. Lo que no se ha podido probar está
> en §5 con el motivo exacto.

**La experiencia en español está en `/es`.** El idioma predeterminado de la tienda
sigue siendo inglés, así que la raíz `/` sirve inglés. Ejemplo:
`https://4xhnw14lval3xsbb-99569205581.shopifypreview.com/es`

---

## 1. Errores corregidos, con evidencia

| # | Qué se veía | Causa real | Corrección | Cómo se comprueba |
|---|---|---|---|---|
| 1 | El selector de vehículo no arrancaba | `sjw-selector.js` se carga en su sección, antes que `sjw-analytics.js` del pie, y llamaba a `SJWAnalytics.track` cuando aún no existía: `TypeError: Cannot read properties of undefined (reading 'track')` | Cola de analítica en el `<head>` que el archivo real vacía al cargar | Consola de `/es` sin errores de JavaScript |
| 2 | Cabecera y copyright decían «My Store 2» | Horizon pinta `shop.name` | Wordmark propio como logotipo y ajuste `sjw_brand_name` para el nombre accesible y el copyright | `/es`: 0 apariciones de «My Store 2» en texto visible |
| 3 | Barra superior «Welcome to our store» | Texto por defecto de Horizon | Sustituido por el mensaje de SJ Wheels | Visible en la cabecera |
| 4 | Logotipo ausente | No había archivo | `sj-wheels-wordmark.png` (2118×492, Inter, la familia del tema) y favicon con el monograma | Cabecera 130×30 px, pie, favicon |
| 5 | Ilustración de paisaje recortada y hueco negro enorme | Bloque `hero` de Horizon con imagen de ejemplo | Sección propia `sjw-hero` | Portada |
| 6 | La acción principal caía muy abajo | El hero forzaba altura y alineación al fondo | Composición en dos columnas, CTA dentro de la primera pantalla | Portada a 1440 y a 390 px |
| 7 | La misma frase repetida en bloques sucesivos | Hero y selector compartían titular | El selector pasa a «¿Qué coche tienes?» | Portada |
| 8 | «Comprar por diámetro» sin opciones | Las colecciones tienen 0 productos visibles y el bucle las filtraba, dejando un `<ul>` vacío | Estado vacío explicado + acción real | Portada |
| 9 | Ocho «Product title» a 19,99 € | Sección `product-list` de Horizon sin catálogo | Retirada de portada, carrito y 404 | 0 apariciones en las 12 páginas |
| 10 | CTA final «Buscar llantas compatibles» → `/` | URL sin configurar | → `/pages/solicitud-de-compatibilidad` | Portada |
| 11 | Selectores vacíos y botón desactivado | El formulario se pintaba siempre y JavaScript intentaba ocultarlo después | Se decide en Liquid: sin vehículos, el formulario no se pinta | `/es`: 0 `<select>` en el selector |
| 12 | «Remove vehicle» sin vehículo | Mismo origen | Resuelto con lo anterior | Verificado a 390 y 1440 px |
| 13 | WhatsApp ofrecido sin número configurado | El estado vacío lo ofrecía como acción | La acción es el formulario; el WhatsApp solo aparece si hay número | Portada |
| 14 | `/collections/all` con cero productos y «prueba a quitar los filtros» sin filtros | Texto genérico de Horizon | Sección `sjw-catalog-state`: distingue catálogo sin publicar, colección vacía y filtros sin resultado | `data-sjw-estado="catalogo_no_publicado"` en las tres colecciones probadas |
| 15 | «Marcas» abría `/collections` con «Home page» dentro | El menú apuntaba al índice de colecciones | «Marcas de vehículo» → `/collections/all`, y las 4 colecciones de marca publicadas en el canal | Menú y `/es/collections/llantas-bmw` |
| 16 | «Products», «Sort», «Select my car»… en inglés | Idioma predeterminado inglés | La experiencia española se sirve en `/es`, ya completa | 12/12 páginas con `lang="es"` |
| 17 | «Translation missing: en.accessibility.close» | El comparador usaba una clave que no existe en Horizon | Clave propia `sjw.compare.close` | `aria-label="Cerrar el comparador"` |
| 18 | Diálogo del comparador sin comprobar | — | Abre, cierra con Escape, cierra con el botón | Probado con datos sembrados |
| 19 | Al cerrar el comparador el foco se perdía | `lastFocus.focus()` fallaba si el elemento ya no era enfocable, y el foco se quedaba en el botón de cerrar, oculto | El foco vuelve al disparador | Tras Escape el foco está en el botón del comparador |
| 20 | El logotipo del pie pegado al título de la newsletter | Los dos textos estaban en el grupo de marca | Grupo de marca y grupo de newsletter separados | Pie a 1440 px |
| 21 | Columna izquierda pegada al borde | `page_width` valía `'full'`, que **no es una opción del esquema** (`narrow\|normal\|wide`) | `page_width: 'wide'` | Pie y todas las páginas |
| 22 | «Menú del pie» como título público | El bloque mostraba el título del menú | Columnas «Catálogo» y «Ayuda» con menús propios | Pie |
| 23 | Contacto genérico: «Name», «Phone», «Comment», «Submit» | Página de contacto por defecto de Shopify | Formulario propio con motivo, vehículo, medida actual y referencia | `/es/pages/contact` |
| 24 | Carrito vacío en inglés | — | «Tu carrito está vacío», con el acento corregido en la traducción | `/es/cart` |
| 25 | Páginas con instrucciones internas y `[PENDIENTE DE CONFIRMAR]` | Redacción anterior | Las 9 páginas reescritas separando lo confirmado de lo que no | 0 marcadores en las 12 páginas |
| 26 | «Canarias 25–30 días» sin fuente acreditada | Venía de las descripciones importadas del proveedor | Retirado de la ficha y de la página de envíos. Ver §4 | 0 apariciones en el tema |
| 27 | «Una llanta encaja cuando coinciden cuatro medidas» | Redacción anterior | Reescrito: las cuatro descartan, no confirman. Se nombran anchura, carga, freno, neumático, ejes, tornillería y montaje | `/es/pages/guia-de-compatibilidad` |
| 28 | «Sobre nosotros» describía un buscador operativo | Redacción anterior | Dice en qué punto está la tienda | `/es/pages/sobre-sj-wheels` |
| 29 | `#sjw-vehicle-picker` no llevaba a ninguna parte | **El ancla no existía en ningún archivo** | Añadida a la sección del selector, con `scroll-margin` para que la cabecera pegajosa no la tape | Barra de vehículo y ficha |
| 30 | La búsqueda no tenía H1 | Horizon la envolvía en `<h3>` | Pasa a `<h1>` | `/es/search` |
| 31 | 404 en inglés | Texto del template | «Esta página no existe», botón «Volver al inicio» | `/es/no-existe` |
| 32 | Dos H1 en la portada | Horizon pintaba un `<h1>` oculto con `shop.name` | Pasa a `<p>` con el nombre de marca del tema | 12/12 páginas con exactamente un H1 |

### Resultado de la verificación final

```
✓ home · coleccion · c19 · bmw · carrito · contacto · solicitud
✓ envios · guia · sobre · busqueda · 404
12/12 páginas limpias
```

Criterios comprobados en cada una: **un solo H1**, `lang="es"`, **cero**
`Translation missing`, cero «Product title», cero «19,99 €», cero «My Store 2»,
cero «Menú del pie», cero `[PENDIENTE DE CONFIRMAR]`, cero errores de JavaScript
y **sin desplazamiento horizontal a 360, 768 y 1440 px**.

No se ha usado `overflow-x: hidden` en ningún sitio: el desbordamiento se
corrigió en su origen (`box-sizing`, `minmax(0, 1fr)` y `page_width`).

---

## 2. Diagnósticos de consola: no son del tema

Los dos mensajes que aparecían en la sesión de vista previa se han rastreado
hasta su archivo de origen. **Ninguno viene de SJ Wheels.**

| Mensaje | Archivo que lo emite | Causa |
|---|---|---|
| `Error initializing banner: Could not reach the server` | `cdn/shopifycloud/privacy-banner/storefront-banner.js` | El banner de privacidad de Shopify llama a `/api/unstable/graphql.json`, que devuelve **400** en el dominio de vista previa |
| `[shopify-account] Menu "customer-account-main-menu" not found in Storefront API` | `cdn.shopify.com/storefront/web-components/account.js` | Mismo motivo. El menú **sí existe** en el admin, con «Orders» y «Profile»; lo que falla es la consulta a la Storefront API desde `shopifypreview.com` |

También fallan, por el mismo dominio, los píxeles web (`/web-pixels@…`, 404),
`/api/collect`, `monorail` y `otlp-http-production.shopifysvc.com`.

**Conclusión:** son limitaciones del dominio `shopifypreview.com`, no defectos.
Hay que volver a comprobarlos en el dominio real antes de darlos por resueltos.
No se ha tocado nada por ellos.

---

## 3. Pruebas realizadas y pruebas bloqueadas

### Realizadas en la vista previa real

| Prueba | Resultado |
|---|---|
| 12 páginas a 360 / 768 / 1440 px | Sin desbordes ni mezcla de idiomas |
| Portada a 360, 390, 768, 1024 y 1440 px | Composición correcta, CTA en la primera pantalla |
| Consola de JavaScript en todas las rutas | Sin errores del tema |
| Selector sin vehículos (Modo A) | No pinta formulario; ofrece el formulario manual |
| Estados del catálogo | `catalogo_no_publicado` en las tres colecciones probadas |
| Comparador: abrir, Escape, botón de cerrar, foco | Correcto (datos sembrados, ver abajo) |
| Formularios: destino, campos, etiquetas asociadas | `POST /contact` nativo, `form_type=contact`, todas las etiquetas asociadas |
| Foco visible al tabular | Anillo naranja de 2 px con separación |
| Enlaces del menú y del pie | Todos resuelven |

### Bloqueadas, con el motivo exacto

| Prueba | Bloqueo |
|---|---|
| Ficha de producto | Los 439 productos están en `DRAFT` y sin publicar en el canal. `/products/<handle>` devuelve **404** incluso en la vista previa. No se activan productos |
| Galería, precio, unidades, peso, disponibilidad, plazo en ficha | Igual |
| Añadir al carrito con confirmación | Requiere una ficha accesible |
| Datos del vehículo por línea de carrito | Igual |
| Dos vehículos distintos · mismo SKU para vehículos distintos · cambio posterior de vehículo | Igual |
| Recargar carrito, cambiar cantidades, quitar productos | Sin líneas que crear |
| Compra rápida, sticky button y botones acelerados | Requiere ficha accesible. El guardia que los cubre está probado en navegador con DOM sintético (`tests/guard/guard.test.js`), que **no** sustituye a la prueba real |
| Comparador con 1, 2 y 3 productos reales | Se probó el mecanismo con datos sembrados en `localStorage`. Con productos reales, pendiente |
| Envío real de los formularios | No se envían pruebas a personas sin autorización. Se verificó el destino, no el envío |
| Rendimiento (LCP, CLS) | No medido. No se dan puntuaciones sin medirlas |
| Lector de pantalla | Requiere NVDA o VoiceOver sobre la tienda real |

---

## 4. El plazo de Canarias

**Origen localizado.** «Canarias 25–30 días» aparece en la descripción importada
de los 439 productos, por ejemplo en `OYL260416001`. De ahí pasó al ajuste del
tema `sjw_default_delivery` y a la página de envíos.

**No está acreditado.** No hay transportista configurado, ni tiempo de
preparación, ni perfil de envío que lo respalde. La única fuente es el texto del
proveedor.

**Contradicción encontrada, que no he tocado:**

| Dónde | Qué dice |
|---|---|
| Descripción de los 439 productos | «Precio cerrado con transporte, gestión aduanera y entrega a domicilio incluidos» |
| Perfil de envío, zona España | Dos tarifas «Estándar» activas a la vez: **6,99 €** y **0 €** |
| Zona UE | **8,99 €** |
| Zona internacional | **12,99 €** |

Un cliente leería «transporte incluido» y pagaría 6,99 € en el checkout. Además,
la dirección fiscal de la tienda está en **Granadilla, Santa Cruz de Tenerife**,
así que los envíos a Península cruzan aduana.

**Qué he hecho:** retirar el plazo de la ficha y de la página de envíos, y
sustituirlo por una consulta real. **Qué no he tocado:** precios, tarifas y
configuración fiscal.

---

## 5. Recursos compartidos que se han modificado

Las páginas, los menús y las colecciones **no pertenecen al tema**: los comparten
todos los temas de la tienda. Estos cambios afectarían también a `Horizon` si se
publicara.

| Recurso | Cambio | Reversible |
|---|---|---|
| 9 páginas | Cuerpos reescritos | Sí, desde el admin |
| Página `contact` | Título «Contact» → «Contacto», plantilla `contacto` | Sí |
| Menú `main-menu` | «Marcas» → «Marcas de vehículo», primer elemento «Consultar compatibilidad» | Sí |
| Menús `sjw-catalogo` y `sjw-ayuda` | **Nuevos**, no tocan los existentes | Sí, eliminándolos |
| 4 colecciones de marca | Publicadas en el canal Tienda online | Sí, despublicándolas |
| Archivos | `sj-wheels-wordmark.png` y `sj-wheels-favicon.png` **nuevos** | Sí |

Lo que sí queda aislado en el tema DEV: plantillas, secciones, ajustes,
traducciones y el logotipo, porque `settings_data.json` es por tema.

### Un error que cometí y corregí

Al poner la plantilla de contacto me equivoqué de identificador y renombré la
página **«Cómo comprar»** como «Contacto». Lo detecté en la misma respuesta y lo
revertí: la página conserva su título y su contenido.

---

## 6. Archivos del tema modificados de Horizon

Hasta ahora todo era aditivo. Estos tres archivos de Horizon sí se han tocado, de
forma mínima y comentada en el propio archivo:

| Archivo | Cambio |
|---|---|
| `sections/header.liquid` | El `<h1>` oculto con `shop.name` pasa a `<p>` con el nombre de marca del tema |
| `blocks/footer-copyright.liquid` | El copyright usa el nombre de marca del tema |
| `sections/search-header.liquid` | El título de resultados pasa de `<h3>` a `<h1>` |

Los tres están en el repositorio, así que una actualización de Horizon que los
sobrescriba se detecta en el diff.

---

## 7. Lo que hace falta para lanzar

### Solo lo puede hacer el propietario, en el admin

1. **Nombre de la tienda** → «SJ Wheels». Hoy sigue siendo «My Store 2» y aparece
   en los datos estructurados (`schema.org`) y en los correos.
2. **Idioma predeterminado** → Español. *Configuración → Idiomas → Cambiar idioma
   predeterminado*. Mientras tanto, la experiencia española vive en `/es`.
3. **Proveedor de pagos.** Sin él no se puede cobrar.
4. **Publicar el catálogo.** 439 productos en `DRAFT`, sin los cuales no se puede
   probar ficha, carrito ni compra.
5. **Instalar Shopify Search & Discovery** para los filtros por metafield.

### Decisiones comerciales o legales

6. **Plazos de entrega reales** por zona, con su fuente.
7. **Resolver la contradicción** entre «transporte incluido» en las descripciones
   y las tarifas del checkout, y la duplicidad de 6,99 € / 0 € en España.
8. **Fiscalidad Canarias ↔ Península**: IGIC, IVA y quién paga la aduana.
9. **Textos legales definitivos**: términos, devoluciones, garantía, aviso legal
   y cookies.
10. **Razón social, CIF y domicilio fiscal**.

### Para que la tienda haga lo que promete

11. **Base de vehículos verificados.** Sin ella el buscador no puede existir y
    todo el catálogo se queda en «Necesita confirmación técnica».
12. **Fotografía de producto.** 130 diseños distintos para 437 productos.
13. **El logotipo real de SJ Wheels.** El wordmark actual es tipográfico y
    provisional: se sustituye subiendo el archivo en *Personalizador →
    Configuración → SJ Wheels → Logotipo*, sin tocar código. Si el archivo trae
    fondo propio, conviene una versión **horizontal y con fondo transparente**
    para la cabecera.
14. **Carga soportada** por llanta. Dato de seguridad hoy vacío.
