# SJ Wheels — Despliegue del tema

## Tema de trabajo

`SJ Wheels — DEV (no publicar)` · `gid://shopify/OnlineStoreTheme/196061626701` · rol `UNPUBLISHED`.
El tema `MAIN` (Horizon, `196025975117`) **no se toca en ningún momento**.

## Cómo se sube

`sj-wheels/deploy.py` sube el contenido por HTTPS a los destinos firmados de Shopify y deja en
`deploy-vars.json` las variables listas para `themeFilesUpsert`, que referencia cada archivo por
URL. Así el despliegue no depende de pegar el contenido de los archivos en ninguna parte.

```bash
python3 sj-wheels/deploy.py assets/sjw-tokens.css sections/sjw-vehicle-selector.liquid
# luego: themeFilesUpsert con el contenido de deploy-vars.json
```

Los destinos firmados caducan a las 24 h. Para renovarlos, pide más con `stagedUploadsCreate`
(recurso `BULK_MUTATION_VARIABLES`) y reemplaza `.targets.json`.

## Validación del lado de Shopify

`themeFilesUpsert` rechaza en silencio los archivos con Liquid inválido: devuelve
`userErrors: []` pero el archivo no aparece en el tema. **Hay que verificar siempre** que el
archivo existe y con el tamaño esperado después de subirlo.

Dos errores reales detectados así durante la Fase 1:

1. `case ... when X then ...` no existe en Liquid. Dentro de `{% liquid %}` la sintaxis es
   `case` / `when` / (instrucción en línea aparte) / `endcase`. Se sustituyó por una clave de
   traducción construida con `append`.
2. **Los filtros no se admiten en los argumentos de `render`.**
   `{% render 'x', label: 'clave' | t %}` rompe el archivo. Hay que asignar antes:
   `{%- assign label = 'clave' | t -%}` y luego `{% render 'x', label: label %}`.

## Archivos propios

Todos llevan prefijo `sjw-` y son aditivos: ningún archivo original de Horizon se ha borrado.

```
assets/sjw-tokens.css          Design tokens (color, espaciado, motion, foco)
assets/sjw-components.css      Botones, tarjetas, badges, campos, chips, acordeón,
                               drawer, skeletons, estados vacíos
assets/sjw-garage.js           Vehículo guardado (localStorage + eventos)
assets/sjw-fitment.js          Motor de compatibilidad
assets/sjw-status.js           Pintado de badges y etiquetas de vehículo
assets/sjw-selector.js         Selector de vehículo en 5 pasos
assets/sjw-buy-guard.js        Bloqueo de compra y propiedades de línea
assets/sjw-whatsapp.js         Mensajes contextuales de WhatsApp
assets/sjw-analytics.js        Eventos, con lista blanca y filtro de datos personales
snippets/sjw-vehicle-catalog   Catálogo de metaobjects `vehicle` en JSON
snippets/sjw-product-fitment-data  Ficha técnica del producto en JSON
snippets/sjw-fitment-badge     Badge de estado (icono + texto, nunca solo color)
snippets/sjw-whatsapp          Botón de WhatsApp
snippets/sjw-spec              Fila del panel técnico
snippets/sjw-strings           Puente traducciones → JavaScript
sections/sjw-vehicle-selector  Buscador por vehículo
blocks/sjw-fitment             Compatibilidad y guardia de compra (ficha de producto)
blocks/sjw-tech-panel          Panel técnico (ficha de producto)
```

## Archivos de Horizon modificados (cambios mínimos y aditivos)

| Archivo | Cambio |
|---|---|
| `layout/theme.liquid` | Carga de `sjw-tokens.css`, `sjw-components.css` y `sjw-strings`; clase `sjw-root` en `<body>`; núcleo JS diferido al cierre. Nada eliminado |
| `config/settings_schema.json` | Grupo nuevo "SJ Wheels" al final. Ningún ajuste existente cambia de `id` |
| `config/settings_data.json` | Paleta oscura, ancho de página completo, radios de 14 px y valores por defecto de SJ Wheels |
| `locales/es.json` | Grupo `sjw` con 83 claves |
| `locales/en.default.json` | Grupo `sjw` con las mismas 83 claves. Comentarios originales conservados |
