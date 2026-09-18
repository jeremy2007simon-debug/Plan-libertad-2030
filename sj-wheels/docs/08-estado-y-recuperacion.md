# 08 · Estado verificado, historial y punto de restauración

Fecha de verificación: **2026-09-18 20:40**

---

## 1. Producción: intacta

| Comprobación | Resultado |
|---|---|
| Tema publicado | `Horizon` · `gid://shopify/OnlineStoreTheme/196025975117` · rol `MAIN` |
| Última modificación del tema publicado | **`2026-09-17T21:08:15Z`** |
| Inicio de mi trabajo | `2026-09-18T17:41:31Z` |
| Archivos `sjw-*` en el tema publicado | **0** |
| Conclusión | El tema de producción **no se ha tocado**. Su marca de tiempo es anterior a que yo empezara. |

| Tema de desarrollo | Valor |
|---|---|
| Nombre | `SJ Wheels — DEV (no publicar)` |
| ID | **`gid://shopify/OnlineStoreTheme/196061626701`** (numérico: `196061626701`) |
| Rol | `UNPUBLISHED` |
| Creado | `2026-09-18T17:41:31Z` |
| Última subida verificada | `2026-09-18T20:01:26Z` |

Cada subida se verifica por **checksum MD5** contra el archivo local. `themeFilesUpsert` puede
devolver `userErrors: []` y aun así no escribir el archivo (pasó dos veces con errores de Liquid),
así que no basta con mirar la respuesta de la mutación.

---

## 2. Estado de git

| Dato | Valor |
|---|---|
| Rama | `claude/focused-tesla-q9yurp` |
| Base | `ca9373e` (último commit de `main` antes de empezar) |
| Commits propios | 9 |
| Árbol de trabajo | limpio tras cada commit |
| Historial ajeno | **sin reescribir**. No hay rebase, ni amend, ni force-push |
| Trabajo ajeno | intacto: nada fuera de `sj-wheels/` y `.gitignore` se ha modificado |

---

## 3. Historial completo de commits

| # | Hash | Mensaje | Fase | Archivos principales | Fecha | Subido | ¿Revertible? |
|---|---|---|---|---|---|---|---|
| 1 | `591bdcc` | Añade la auditoría Fase 0 de SJ Wheels y el plan por fases | Fase 0 | `docs/00-auditoria.md`, `docs/01-plan-fases.md` | 2026-09-18 17:44 | Sí | Sí. Solo documentación |
| 2 | `5324627` | Registra las acciones autorizadas tras la auditoría Fase 0 | Fase 0 | `docs/00-auditoria.md` | 2026-09-18 17:47 | Sí | Sí. Solo documentación |
| 3 | `ca76855` | Crea la capa de datos de compatibilidad y migra el catálogo | Fase 1 | `docs/02-datos.md`, `data/acabados-pendientes-de-traducir.csv`, `data/compatibilidad-proveedor-sin-verificar.csv` | 2026-09-18 18:17 | Sí | El commit sí. **Los 2.192 metafields migrados en Shopify, no**: hay que borrarlos desde el admin |
| 4 | `0152da6` | Añade el sistema visual y el motor de compatibilidad | Fase 2–3 | 23 archivos de `theme/` (tokens, componentes, motor, secciones), `tests/fitment.test.js` | 2026-09-18 18:33 | Sí | Sí. El tema de desarrollo se puede borrar entero sin tocar producción |
| 5 | `a1c06cc` | Construye portada, catálogo, navegación y comparador | Fase 4–6 | 22 archivos de `theme/` (plantillas JSON, secciones, bloques), `tests/qa.py` | 2026-09-18 18:52 | Sí | Sí, igual que el anterior. Las páginas y colecciones creadas en Shopify hay que borrarlas a mano |
| 6 | `e53b07b` | Añade el checklist de lanzamiento | Fase 7 | `docs/04-checklist-lanzamiento.md` | 2026-09-18 18:53 | Sí | Sí. Solo documentación |
| 7 | `7583fa3` | Recupera las 76 fichas cuya imagen no llegó a importarse | Estabilización | `data/auditoria-imagenes.csv`, `data/prioridad-fotos.csv`, `data/plantilla-imagenes-nuevas.csv`, `docs/06-imagenes.md` | 2026-09-18 19:53 | Sí | El commit sí. **Las 76 imágenes subidas a Shopify, no**: se quitan desde el admin, producto a producto |
| 8 | `6f7da35` | Amplía el motor y añade las herramientas de datos reales | Estabilización | `theme/assets/sjw-fitment.js`, `tools/import-fitment.py`, `data/compatibilidad-proveedor-normalizada.csv`, `data/cola-vehiculos-*.csv`, `docs/05-…` | 2026-09-18 20:01 | Sí | Sí. Solo afecta al tema de desarrollo |
| 9 | `dd52149` | Corrige 8 defectos de maquetación y accesibilidad | Estabilización | 9 archivos de `theme/`, `tests/visual/`, `docs/07-…`, `.gitignore` | 2026-09-18 20:35 | Sí | Sí. Solo afecta al tema de desarrollo |

Ningún commit toca archivos fuera de `sj-wheels/` salvo `.gitignore`, que es nuevo.

---

## 4. Punto de restauración

### 4.1 Qué hay que saber antes de deshacer nada

El trabajo vive en **dos sitios distintos** y se deshacen de forma distinta:

| Dónde | Qué hay | Cómo se deshace |
|---|---|---|
| Git | Código del tema, documentación, datos, herramientas | `git revert` / borrar la rama |
| Shopify | Metafields, medios, páginas, colecciones, tema de desarrollo | A mano en el admin, o con las mutaciones inversas |

**Revertir un commit no deshace lo que ya está escrito en Shopify.**

### 4.2 Restaurar el código

```bash
# Ver el estado exacto de este punto
git log --oneline ca9373e..claude/focused-tesla-q9yurp

# Deshacer solo el último cambio visual, conservando el resto
git revert dd52149

# Volver al punto anterior a todo mi trabajo, sin borrar el historial
git checkout -b recuperacion ca9373e
```

`ca9373e` es el último commit que **no** es mío. Todo lo mío está por encima.

### 4.3 Restaurar el tema

El tema de producción nunca ha cambiado, así que **no hay nada que restaurar en producción**.

Para descartar todo el trabajo del tema:

> Admin → *Tienda online* → *Temas* → `SJ Wheels — DEV (no publicar)` → **···** → *Eliminar*.

Eso no afecta a `Horizon`. Para volver a generarlo:

```bash
python3 sj-wheels/deploy.py          # sube todos los archivos del tema
```

### 4.4 Qué queda escrito en Shopify

| Qué | Cantidad | Reversible desde | Riesgo si se deja |
|---|---|---|---|
| Definiciones de metafield de producto | 16 | Admin → Configuración → Metacampos | Ninguno: 5 tienen datos, 11 están vacías esperando datos del propietario |
| Valores de metafield migrados | 2.192 en 439 productos | Admin, producto a producto, o mutación inversa | Ninguno: son datos técnicos reales extraídos de las etiquetas y descripciones del propio catálogo |
| Definición de metaobjeto `vehicle` | 1 (14 campos) | Admin → Configuración → Metaobjetos | Ninguno: **0 vehículos creados** |
| Medios de producto recuperados | 76 imágenes | Admin, producto a producto | Ninguno: son las imágenes originales del propietario, que no habían llegado a importarse |
| Medios rotos eliminados | 76 registros `FAILED` | Se pueden recrear desde `data/imagenes-fallidas.csv` | Ninguno: eran registros sin imagen |
| Páginas creadas | 9 (borrador) | Admin → Contenido → Páginas | Ninguno: todas con los textos legales marcados como pendientes |
| Colecciones creadas | 12 | Admin → Productos → Colecciones | Ninguno |
| Producto de muestra archivado | 1 | Admin → Productos → Archivados → Desarchivar | Ninguno. Afirmaba certificaciones sin respaldo |
| Idioma español | habilitado y publicado | Admin → Configuración → Idiomas | Ninguno. **No** se ha cambiado el idioma predeterminado |
| Tema de desarrollo | 1, sin publicar | Admin → Temas → Eliminar | Ninguno |

**Nada de esto es irreversible y nada afecta a la tienda pública**, que sigue cerrada por
contraseña y con los 439 productos en borrador.

---

## 5. Auditoría de metafields

### 5.1 Definiciones de producto

| Namespace.key | Nombre | Tipo | Productos con valor | Sin valor | Estado |
|---|---|---|---|---|---|
| `custom.bolt_pattern` | PCD (anclaje) | `single_line_text_field` | **439** | 0 | Completo |
| `custom.center_bore` | Buje central (mm) | `number_decimal` | **439** | 0 | Completo |
| `custom.wheel_diameter` | Diámetro (pulgadas) | `number_integer` | **439** | 0 | Completo |
| `custom.wheel_width` | Anchura (pulgadas) | `number_decimal` | **438** | 1 | 1 anomalía en origen (`20X90`) |
| `custom.offset_et` | ET (desplazamiento) | `number_integer` | **437** | 2 | 2 con dato contradictorio en origen |
| `custom.offset_et_min` | ET mínimo admitido | `number_integer` | 0 | 439 | Sin dato de origen |
| `custom.offset_et_max` | ET máximo admitido | `number_integer` | 0 | 439 | Sin dato de origen |
| `custom.load_rating` | Carga soportada (kg) | `number_integer` | 0 | 439 | **Dato de seguridad pendiente** |
| `custom.finish` | Acabado | `single_line_text_field` | 0 | 439 | Esperando la tabla de traducción |
| `custom.compatible_vehicles` | Vehículos compatibles | `list.metaobject_reference` | 0 | 439 | **Vacío a propósito**: sin evidencia técnica no se crea ninguna relación |
| `custom.requires_manual_verification` | Requiere verificación manual | `boolean` | 0 | 439 | Ausente = `true`. El motor lo trata como verificación obligatoria |
| `custom.units_per_set` | Unidades por juego | `number_integer` | 0 | 439 | El tema usa 4 por defecto y lo dice |
| `custom.tires_included` | Neumáticos incluidos | `boolean` | 0 | 439 | Sin confirmar: no se afirma nada |
| `custom.bolts_included` | Tornillería incluida | `boolean` | 0 | 439 | Sin confirmar: no se afirma nada |
| `custom.estimated_delivery` | Plazo estimado de entrega | `single_line_text_field` | 0 | 439 | Esperando plazos reales |
| `custom.compatibility_notes` | Notas de compatibilidad | `multi_line_text_field` | 0 | 439 | **Vacío a propósito**: no se migró el texto del proveedor en chino |

Total de valores escritos: **2.192** en 439 productos, migrados con **0 discrepancias** entre
etiquetas y descripción.

### 5.2 Estado por producto

| Estado | Productos |
|---|---|
| Completo (los 5 campos con dato) | **436** |
| Incompleto | **3** |

Los 3 incompletos, con su motivo exacto:

| SKU | Campo ausente | Por qué |
|---|---|---|
| `OYL260416367` | `wheel_width` | El origen dice `Medida: 20X90`. Una llanta de 90 pulgadas de ancho no existe. **No se ha supuesto que sea 9.0** |
| 2 productos con etiqueta `et-实际38打印42` | `offset_et` | «ET real 38, impreso 42»: dato contradictorio en origen. No se elige uno por nuestra cuenta |

**Datos anómalos escritos: 0.** Ningún valor imposible ha llegado a Shopify; los tres casos
dudosos quedaron vacíos y sus fichas muestran el estado pendiente.

### 5.3 Definición de metaobjeto `vehicle`

14 campos: `make`, `model`, `generation`, `year_start`, `year_end`, `engine`, `body_type`,
`bolt_pattern`, `center_bore`, `allowed_diameters`, `et_min`, `et_max`, `notes`,
`verification_status`.

Obligatorios: `make`, `model`, `year_start`, `verification_status`.

**Vehículos creados: 0.** Y así debe seguir hasta que existan datos con licencia y verificados.
Mientras tanto, el selector muestra su estado vacío y **todo el catálogo permanece en
«Necesita confirmación técnica»**, que es el estado seguro.

---

## 6. Colecciones y páginas creadas

| Colección | Productos | Tipo |
|---|---|---|
| Llantas 16 pulgadas | 1 | Manual |
| Llantas 17 pulgadas | 18 | Manual |
| Llantas 18 pulgadas | 73 | Manual |
| Llantas 19 pulgadas | 123 | Manual |
| Llantas 20 pulgadas | 143 | Manual |
| Llantas 21 pulgadas | 37 | Manual |
| Llantas 22 pulgadas | 41 | Manual |
| Llantas 23 pulgadas | 3 | Manual |
| Llantas para BMW | 177 | Automática (etiqueta `bmw`) |
| Llantas para Mercedes-Benz | 145 | Automática (etiqueta `mercedes-benz`) |
| Llantas para Audi | 79 | Automática (etiqueta `audi`) |
| Llantas para Volkswagen | 28 | Automática (etiqueta `volkswagen`) |

> Las de diámetro son **manuales**: cada producto nuevo hay que añadirlo a mano.
> Se pueden pasar a automáticas cuando Search & Discovery permita reglas por metafield.

Páginas creadas (todas en borrador, con los huecos legales marcados):
`guia-de-compatibilidad`, `guia-de-medidas`, `como-comprar`, `solicitud-de-compatibilidad`,
`envios`, `cambios-y-devoluciones`, `garantia`, `sobre-sj-wheels`, `seguimiento-del-pedido`.
