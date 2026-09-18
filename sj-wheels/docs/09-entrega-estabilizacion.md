# 09 · Entrega de la fase de estabilización

Fecha: **2026-09-18**
Rama: `claude/focused-tesla-q9yurp` · Tema: `SJ Wheels — DEV (no publicar)` (`196061626701`)

> **Nada se ha publicado.** El tema de producción `Horizon` sigue con su marca de tiempo
> original y sin un solo archivo mío. Los 439 productos siguen en borrador. No se han
> configurado pagos, no se ha cambiado el idioma predeterminado, no se ha tocado ninguna
> política legal, no se ha activado ninguna compatibilidad.

---

## 1 · Verificación del trabajo anterior

| Comprobación | Resultado |
|---|---|
| Producción sin tocar | ✅ `Horizon` MAIN, `updatedAt 2026-09-17T21:08:15Z`, 0 archivos `sjw-` |
| ID del tema de desarrollo | `gid://shopify/OnlineStoreTheme/196061626701` |
| Estado de git | Rama limpia, 10 commits propios, historial ajeno sin reescribir |
| Auditoría de metafields | 16 definiciones, 2.192 valores, **0 datos anómalos**, 3 productos incompletos documentados |
| Punto de restauración | Documentado, con lo que git **no** deshace |

Detalle completo: **`docs/08-estado-y-recuperacion.md`**.

## 2 · Historial de commits

Tabla con hash, mensaje, fase, archivos, fecha, estado de subida y reversibilidad:
**`docs/08-estado-y-recuperacion.md` §3**.

## 3 · Vista previa

Tres formas de ver la tienda **sin desactivar la contraseña**, con enlaces por página y una
advertencia sobre lo que se verá vacío y por qué: **`docs/07-vista-previa-y-qa-visual.md` §1**.

La más rápida:
`https://admin.shopify.com/store/5y82gi-yt/themes` → `SJ Wheels — DEV` → ··· → **Vista previa**.

## 4 · QA visual a 6 anchos

Banco de pruebas con Chromium sobre el CSS y el marcado reales, a 360, 390, 768, 1024, 1440
y 1920 px. **8 defectos encontrados y corregidos** (2 de gravedad alta por desbordes
horizontales, 1 de áreas táctiles, 1 de contraste AA en 38 elementos, 4 menores).

Resultado final: **0 desbordes, 0 áreas táctiles pequeñas, 0 texto < 12 px, 0 fallos de
contraste AA** en los seis anchos. Detalle y limitaciones:
**`docs/07-vista-previa-y-qa-visual.md` §2–4**.

```
python3 sj-wheels/tests/visual/banco-visual.py
node    sj-wheels/tests/visual/qa-visual.js
```

## 5 · Imágenes

**78 → 2 productos sin imagen.** Las fotos del propietario existían pero su importación había
fallado con un 403 intermitente del origen. Se descargaron con reintentos y se subieron al CDN
de Shopify. No se ha generado ni sustituido ninguna imagen.

- `data/auditoria-imagenes.csv` — los 439 productos clasificados
- `data/prioridad-fotos.csv` — 131 grupos de foto por orden de prioridad
- `data/plantilla-imagenes-nuevas.csv` — plantilla de subida, 439 filas
- `docs/06-imagenes.md` — convención de nombres, resolución, fondo y encuadre

Hallazgo que conviene no perder de vista: **solo hay 130 diseños de foto distintos para 437
productos**, casi todos por debajo de 800 px.

## 6 · Pistas del proveedor normalizadas

`data/compatibilidad-proveedor-normalizada.csv` — 14 columnas internas, 6 estados cerrados:

| Estado | Filas | Significado |
|---|---|---|
| `pista_ilegible` | 283 | Texto del proveedor en chino sin traducir. **No se interpreta** |
| `pista_sin_verificar` | 131 | Legible y específica, pendiente de validación técnica |
| `pista_generica` | 25 | Solo marca o «Consultar»: no identifica modelo |
| `pista_contradictoria` | 0 | La marca de la pista no coincide con la del producto |
| `verificado` | 0 | **Solo lo puede poner el propietario, con evidencia** |

Ninguna pista se ha convertido en compatibilidad confirmada. Ninguna es visible para el cliente
como afirmación.

## 7 · Cola de vehículos prioritaria

`data/cola-vehiculos-prioritaria.csv` — los **20 grupos** que más catálogo desbloquean,
con 11 columnas (PCD, diámetros, rango de ET y bujes observados, y los SKU exactos).
Los 108 grupos completos están en `data/cola-vehiculos-completa.csv`.

Los tres primeros: BMW 3/5系 (25 productos), BMW 5系 (25), Mercedes-Benz E级 (21).
Las familias en chino se conservan **literales**: traducirlas por mi cuenta sería inventar.

## 8 · Importador de compatibilidad

`tools/import-fitment.py` + `data/vehicle-fitment-import-template.csv` (19 columnas).

- **Simulación por defecto.** Sin `--apply` no escribe nada en Shopify.
- Valida rango, formato, duplicados, coherencia de años, de ET y de anchuras.
- Acumula todos los fallos de cada fila en vez de parar en el primero.
- **Degrada a `pending` cualquier fila marcada como `verified` que no traiga evidencia,
  autor y fecha.**
- Las mutaciones que genera validan contra el esquema real de la tienda.
- El script no lleva ningún token: `--apply` lo ejecuta el propietario con sus credenciales.

## 9 · Motor de compatibilidad

**66 pruebas, todas correctas** (antes eran 20). Lo que se ha añadido y corregido:

| Caso | Antes | Ahora |
|---|---|---|
| `"72,6"` (coma decimal del proveedor) | `parseFloat` devolvía **72** en silencio | 72.6 |
| `"8.5 J"`, `"20X90"` | se leían como 8.5 y 20 | dato ausente → ficha en pendiente |
| Anchura de 90 pulgadas | se daba por buena | anomalía → pendiente |
| Año fuera de la generación | no se comprobaba | rechazo con motivo `year` |
| Generación en producción (sin año final) | no se contemplaba | admitida |
| Eje trasero escalonado | no se comprobaba | ET, diámetro, buje y anchura traseros validados |
| Límites exactos de ET (20 y 45) | — | admitidos; 45.1 rechazado |

La regla de oro no cambia:

> Una comprobación numérica aislada puede **descartar** una llanta, pero **no puede confirmar
> por sí sola** la compatibilidad. «Compatible» exige, además, relación explícita
> producto↔vehículo y vehículo verificado.

## 10 · Search & Discovery

**No está instalada.** Es gratuita, pero la instala el propietario desde el admin.
Sin ella no hay filtros por metafield en las colecciones. El orden de activación recomendado y,
sobre todo, **qué no activar** (acabado y compatibilidad) está en
**`docs/07-vista-previa-y-qa-visual.md` §5**.

## 11 · Datos que necesito del propietario

**`docs/05-datos-necesarios-del-propietario.md`** — 28 puntos agrupados en identidad, cobro y
fiscalidad, textos legales, base de vehículos, y catálogo. Cada uno con su formato, dónde se usa
y si bloquea la apertura.

## 12 · Bloqueantes: ninguno activado

| Bloqueante | Estado |
|---|---|
| Publicar el tema | ❌ No hecho |
| Publicar los productos DRAFT | ❌ No hecho |
| Configurar pagos | ❌ No hecho |
| Mostrar iconos de pago | ❌ No hecho (no hay proveedor) |
| Cambiar el idioma predeterminado | ❌ No hecho |
| Escribir políticas legales definitivas | ❌ No hecho |
| Añadir un WhatsApp | ❌ No hecho (no hay número real) |
| Añadir perfiles sociales | ❌ No hecho (los genéricos se vaciaron) |
| Activar compatibilidades sin verificar | ❌ No hecho (0 vehículos, 0 relaciones) |
| Cambiar precios, stock o dominio | ❌ No hecho |
| Instalar aplicaciones | ❌ No hecho |

---

## 13 · Qué falta y en qué orden

### Lo que solo puede hacer el propietario

1. Nombre de la tienda → **SJ Wheels** *(admin)*
2. Idioma predeterminado → **Español** *(admin)*
3. **Proveedor de pagos** *(admin)*
4. **Textos legales** *(asesoría jurídica)*
5. **Fiscalidad Canarias / Península** *(asesoría fiscal)*
6. Plazos y costes de envío reales
7. Número de WhatsApp
8. Instalar **Search & Discovery** y activar los filtros en el orden indicado

### Lo que desbloquea el producto

9. **Base de vehículos** de los 20 grupos prioritarios → con esto el selector deja de estar vacío
10. **Relaciones producto↔vehículo verificadas** → con esto aparece el primer «Compatible»
11. **Fotografía**: los 10 primeros grupos de `prioridad-fotos.csv` cubren ~100 productos
12. Tabla de **acabados** → activa la faceta de acabado
13. **Carga soportada** por llanta → dato de seguridad hoy vacío

### Lo que queda por hacer del lado técnico

14. Revisión a ojo en la vista previa del admin, con productos publicados
15. Lighthouse sobre la vista previa (rendimiento real, LCP y CLS)
16. Prueba con lector de pantalla
17. Traducción al inglés del catálogo (la interfaz ya tiene las 85 claves en los dos idiomas)

---

## Cómo comprobar todo esto

```bash
node   sj-wheels/tests/fitment.test.js     # 66 correctas, 0 fallidas
python3 sj-wheels/tests/qa.py              # 14 comprobaciones, sin errores
python3 sj-wheels/tests/visual/banco-visual.py && node sj-wheels/tests/visual/qa-visual.js
python3 sj-wheels/tools/import-fitment.py sj-wheels/data/vehicle-fitment-import-template.csv
```

## Índice de la documentación

| Archivo | Contenido |
|---|---|
| `00-auditoria.md` | Auditoría Fase 0 y acciones autorizadas |
| `01-plan-fases.md` | Plan por fases |
| `02-datos.md` | Capa de datos y migración del catálogo |
| `03-despliegue.md` | Despliegue del tema y errores de Liquid aprendidos |
| `04-checklist-lanzamiento.md` | Bloqueantes antes de publicar |
| `05-datos-necesarios-del-propietario.md` | Los 28 datos que faltan |
| `06-imagenes.md` | Auditoría de imagen, prioridades y requisitos de foto |
| `07-vista-previa-y-qa-visual.md` | Vista previa, QA a 6 anchos, Search & Discovery |
| `08-estado-y-recuperacion.md` | Estado verificado, commits y punto de restauración |
| `09-entrega-estabilizacion.md` | Este documento |
