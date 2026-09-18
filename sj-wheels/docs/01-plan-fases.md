# SJ Wheels — Plan de trabajo por fases

Estado: **Fase 0 completada**. Fase 1 pendiente de aprobación.

Entorno de trabajo: tema `SJ Wheels — DEV (no publicar)`
(`gid://shopify/OnlineStoreTheme/196061626701`, rol `UNPUBLISHED`).
El tema `MAIN` (Horizon, `196025975117`) **no se toca en ninguna fase**.
La publicación es siempre una decisión manual del propietario.

| Fase | Contenido | Depende de |
|---|---|---|
| 0 | Auditoría, copia de trabajo segura, inventario de datos faltantes | — |
| 1 | Sistema visual y estructura global: tokens, header, navegación, footer, componentes, idioma español | Fase 0 |
| 2 | Portada: hero con selector, categorías, destacados, cómo funciona, guía, FAQ, CTA | Fases 1 y 5 |
| 3 | Catálogo: colecciones, tarjetas, filtros, orden, estados vacíos | Fases 1 y 5 |
| 4 | Ficha de producto: galería, panel técnico, compatibilidad, compra, acordeones | Fases 1 y 5 |
| 5 | Compatibilidad: modelo de datos, migración, buscador, persistencia, propiedades de línea | Fase 1 |
| 6 | Carrito y conversión: carrito, WhatsApp, comparador, sticky actions, confianza | Fases 4 y 5 |
| 7 | Páginas y contenido: guías, FAQ, contacto, envíos, políticas, blog | Fase 1 |
| 8 | SEO, rendimiento y accesibilidad | Fases 2–7 |
| 9 | QA y preparación para publicación | Todas |

**Nota de orden:** la Fase 5 (datos de compatibilidad) se adelanta en la práctica. Las fases 2, 3 y
4 consumen esos metafields, así que la creación de definiciones y la migración de datos se hace
justo después de la Fase 1, aunque el buscador completo se termine en la Fase 5.

---

## Fase 1 — Sistema visual y estructura global

### Objetivo

Dejar la tienda con identidad SJ Wheels y una estructura de navegación coherente, sin tocar todavía
portada, catálogo ni ficha. Al terminar, cualquier página del tema debe **parecer** SJ Wheels
aunque su contenido siga siendo el de Horizon por defecto.

### Archivos que voy a modificar

**Nuevos, en el tema DEV:**

```
assets/sjw-tokens.css               Design tokens: color, tipografía, espaciado, motion, z-index
assets/sjw-components.css           Botones, tarjetas, badges, formularios, focus ring, skeletons
assets/sjw-header.js                Header sticky con reducción de altura al hacer scroll
snippets/sjw-whatsapp-button.liquid Botón WhatsApp con mensaje contextual y URL codificada
snippets/sjw-badge.liquid           Badge de estado (icono + texto + color, nunca solo color)
sections/sjw-topbar.liquid          Barra superior de mensajes editables
locales/es.default.json             Español como idioma base del tema
locales/es.default.schema.json      Etiquetas del personalizador en español
locales/en.json                     Inglés como secundario
```

**Existentes, con cambios mínimos y aditivos:**

```
layout/theme.liquid                 Cargar sjw-tokens.css y sjw-components.css; lang correcto
config/settings_schema.json         Grupo "SJ Wheels": paleta, WhatsApp, mensajes, plazos
config/settings_data.json           Valores por defecto de la nueva paleta
sections/header-group.json          Barra superior + estructura de cabecera
sections/footer-group.json          Footer SJ Wheels
```

**Fuera del tema (configuración de tienda):**

```
Idioma principal  → es (inglés pasa a secundario)
Menús             → main-menu, footer, y submenús del mega menú, en español
```

### Funcionalidades

- **Design tokens** en `:root`, con la paleta del encargo (`#090A0C`, `#121418`, `#242830`,
  `#F5F5F2`, `#A7ABB3`, `#FF5A1F`) más verde/ámbar/rojo para los estados de compatibilidad.
  Se integran con el sistema `color_palette` de Horizon en lugar de duplicarlo.
- **Tipografía**: Horizon ya carga Inter desde la CDN de Shopify (sin coste de red adicional ni
  problema de licencia). Titulares con Inter 700–800, tracking negativo y caja alta selectiva para
  el carácter automovilístico. **No introduzco ninguna fuente externa en esta fase**; si más
  adelante se quiere una tipografía de titular propia, se evalúa aparte midiendo el impacto.
- **Header sticky** que reduce altura al hacer scroll, con hueco reservado para el selector de
  vehículo (se conecta en la Fase 5).
- **Navegación**: menú principal en español con mega menú (diámetro, marca, acabado, destacadas,
  guía). Móvil: buscador visible, "Seleccionar mi coche", WhatsApp, carrito.
- **Footer** SJ Wheels con los bloques del encargo. Los métodos de pago se dejan **ocultos** hasta
  que exista un proveedor de pagos real. Redes sociales, ocultas hasta tener las reales.
- **Componentes base**: botones primario/secundario/fantasma, tarjetas, badges de compatibilidad
  (icono + texto, nunca solo color), campos de formulario, focus ring visible, skeleton loaders.
- **Motion**: transiciones de 180–350 ms, con `@media (prefers-reduced-motion: reduce)` que las
  anula por completo.
- **Idioma**: español como base del tema y de la tienda, con la estructura de inglés preparada.
- **Barra superior** con mensajes editables desde el personalizador.

### Riesgos de esta fase

| Riesgo | Mitigación |
|---|---|
| Cambiar el idioma principal afecta a toda la tienda | Es una acción reversible y es un requisito. Se confirma antes de ejecutarla |
| Sobrescribir el sistema de color de Horizon | Los tokens se **mapean** sobre `settings.color_palette`, no lo sustituyen |
| Tocar `settings_schema.json` puede resetear ajustes | Solo se **añade** un grupo nuevo. Ningún ajuste existente cambia de `id` |
| Paleta muy oscura con contraste insuficiente | Todo par color/fondo se verifica contra WCAG AA antes de fijarlo |
| Footer mostrando pagos o redes inexistentes | Se dejan ocultos hasta tener el dato real |

### Criterios de aceptación

1. Los tokens se aplican en todas las páginas y son editables desde el personalizador.
2. Header sticky funciona en móvil, tablet y escritorio; la reducción de altura no provoca salto
   de contenido (CLS 0).
3. El mega menú se abre con teclado, tiene foco visible y se cierra con `Esc`.
4. Navegación móvil accesible con una sola mano desde 360 px.
5. Todo el texto de interfaz sale de archivos de traducción, ninguno escrito en JavaScript.
6. Con `prefers-reduced-motion: reduce`, ninguna animación se ejecuta.
7. Contraste WCAG AA verificado en texto normal y grande.
8. Sin errores de consola. Sin JS bloqueante añadido en la cabecera.
9. El tema `MAIN` sigue intacto y sin publicar nada.
10. Ningún método de pago ni red social falsos en el footer.

### Entregable

Commit único y reversible, informe de cambios, y vista previa del tema DEV.
