# 05 · Datos que necesito del propietario

Este documento es la lista completa de lo que falta para que SJ Wheels pueda abrirse.
Está escrito para que se pueda ir tachando.

Todo lo demás —diseño, plantillas, motor de compatibilidad, textos de interfaz, datos
técnicos del catálogo— ya está construido y probado en el tema de desarrollo. Lo que sigue
es información que **solo el propietario puede aportar** y que no se puede inventar sin
mentir al cliente.

Leyenda de la columna «Bloquea»:

| Marca | Significado |
|---|---|
| 🔴 | No se puede abrir la tienda sin esto |
| 🟠 | La tienda abre, pero una función queda desactivada o en estado seguro permanente |
| 🟡 | Mejora importante, no impide abrir |

---

## A · Identidad y configuración de la tienda

### 1. Nombre de la tienda 🔴
Hoy es **«My Store 2»**. Debe ser **SJ Wheels**.
No existe mutación en la Admin API: hay que hacerlo en *Configuración → Detalles de la tienda → Nombre*.
Afecta a: título del navegador, correos transaccionales, checkout, resultados de Google.

### 2. Idioma predeterminado 🔴
El español ya está **habilitado y publicado**, pero el idioma **predeterminado** sigue siendo inglés,
así que Shopify sirve `lang="en"` sobre contenido en español. Eso perjudica al SEO y a los lectores de pantalla.
*Configuración → Idiomas → Cambiar idioma predeterminado → Español.*
No lo he cambiado yo: es una configuración comercial importante y estaba fuera de mi encargo.

### 3. Razón social, CIF/NIF y domicilio fiscal 🔴
Formato: `Razón social · NIF/CIF · dirección completa · población · provincia · CP · país`.
Se usa en: aviso legal, términos de venta, pie de página, facturación.

### 4. Correo y teléfono de atención al cliente 🟠
Formato: un correo real que se lea, y un teléfono con prefijo `+34`.
Se usa en: página de contacto, correos de pedido, política de devoluciones.

### 5. Número de WhatsApp 🟠
Formato internacional sin espacios ni `+`: por ejemplo `34600111222`.
Se introduce en *Personalizador → SJ Wheels → WhatsApp*.
Mientras esté vacío **no se pinta ningún botón de WhatsApp en toda la tienda**. Está hecho a propósito:
no se inventa un número.

### 6. Perfiles de redes sociales reales 🟡
Formato: la URL completa de cada perfil de SJ Wheels.
Los enlaces que traía la plantilla Horizon apuntaban a las portadas de Facebook, Instagram, YouTube
y TikTok, no a perfiles de la tienda. Los he **vaciado**. El pie no muestra iconos vacíos.

### 7. Horario de atención 🟡
Formato: días y franja horaria, con zona horaria.
Se usa junto al botón de WhatsApp y en la página de contacto, para no prometer respuesta inmediata.

---

## B · Cobro, envío y fiscalidad

### 8. Proveedor de pagos 🔴
Hoy `supportedDigitalWallets` está **vacío**: la tienda no puede cobrar.
Hasta que haya un proveedor real, el pie **no muestra iconos de pago**. Un icono de Visa sin
pasarela activa es una promesa falsa.
No lo activo yo: configurar pagos estaba excluido expresamente del encargo.

### 9. Plazos de entrega reales 🔴
Formato: días laborables, por zona.

| Zona | Plazo | Transportista |
|---|---|---|
| Península | ? | ? |
| Baleares | ? | ? |
| **Canarias** | ? | ? |
| Ceuta y Melilla | ? | ? |
| Resto de la UE | ? | ? |

Se usa en: ficha de producto, carrito, página de envíos.

### 10. Costes de envío por zona 🔴
Formato: importe por pedido o por juego de 4 llantas, y a partir de qué importe hay envío gratuito.
Un juego de 4 llantas pesa 40–70 kg: el coste a Canarias no es el mismo que a Madrid.

### 11. Régimen fiscal Canarias / Península 🔴
Esto es lo más delicado del proyecto y **no lo puedo decidir yo**:

- ¿Los precios mostrados llevan **IGIC** o **IVA**?
- ¿Quién paga el **DUA** y los gastos de aduana en los envíos Canarias ↔ Península?
- ¿Se aplican precios distintos por mercado?

Mientras no se confirme, todo el texto fiscal de la tienda está marcado `[PENDIENTE DE CONFIRMAR]`.
Necesita **asesoría fiscal**, no una suposición.

### 12. Condiciones de devolución reales 🔴
Formato: plazo en días, quién paga el retorno, estado en que debe volver la mercancía,
qué pasa si la llanta ya se ha montado.
Ahora mismo **no existe** política de reembolso.

### 13. Garantía real ofrecida 🟠
Formato: duración, qué cubre, qué no cubre, cómo se reclama.
El producto de muestra que traía la tienda afirmaba «garantía de 1 año» **sin ningún respaldo**.
Ese producto está archivado y esa afirmación no se ha reutilizado en ninguna parte.

---

## C · Textos legales

### 14. Términos y condiciones de venta 🔴
### 15. Política de devoluciones y reembolso 🔴
### 16. Política de envíos 🔴
### 17. Aviso legal 🔴
### 18. Política de cookies 🔴

Sólo existe la política de privacidad **autogenerada por Shopify y en inglés**.

He dejado páginas creadas con la estructura y los apartados necesarios, todas marcadas como
borrador y con los huecos señalados. **No he escrito ni una sola cláusula definitiva**: los textos
legales de una tienda que vende un componente de seguridad los redacta una asesoría, no un asistente.

---

## D · Base de vehículos y compatibilidad *(el bloque más importante)*

Sin esto, el motor de compatibilidad funciona pero **nunca dirá «Compatible»**: todo el catálogo se
queda de forma permanente en «Necesita confirmación técnica». Es el estado seguro y correcto, pero
no es lo que se quiere vender.

### 19. Base de vehículos reales 🟠
Formato: un metaobject `vehicle` por generación de modelo. Columnas:

| Campo | Ejemplo | Obligatorio |
|---|---|---|
| `make` | BMW | Sí |
| `model` | Serie 3 | Sí |
| `generation` | G20 | Sí |
| `year_from` | 2019 | Sí |
| `year_to` | 2025 (vacío = en producción) | No |
| `bolt_pattern` | 5x112 | Sí |
| `center_bore` | 66.6 | Sí |
| `offset_min` | 30 | Sí |
| `offset_max` | 45 | Sí |
| `diameters` | 17,18,19,20 | Sí |
| `verification` | `verified` / `pending` | Sí |
| `source` | quién lo confirmó y cuándo | Sí |

En `sj-wheels/data/cola-vehiculos-prioritaria.csv` está la **cola de los 20 grupos de vehículo
prioritarios**, ordenada por cuántos productos del catálogo desbloquea cada uno.

**Origen de los datos:** deben venir de una fuente con licencia (el fabricante, un proveedor de
datos de recambio contratado, o medición propia). No he consultado ni extraído ninguna base de
datos de terceros, porque hacerlo sin licencia no es legal y el encargo lo prohibía expresamente.

### 20. Relación verificada producto ↔ vehículo 🟠
Formato: `sj-wheels/data/vehicle-fitment-import-template.csv`.
Una fila por pareja producto–vehículo **confirmada**, con quién la confirmó y con qué evidencia.

Regla que el motor aplica y que no se puede saltar:

> Una comprobación numérica aislada puede **descartar** una llanta, pero **no puede confirmar por sí
> sola** la compatibilidad. Para mostrar «Compatible» hacen falta las tres cosas a la vez:
> las medidas encajan, existe una relación explícita producto↔vehículo, y el vehículo está marcado
> como `verified`.

### 21. Traducción de las pistas de compatibilidad del proveedor 🟠
283 de los 439 productos traen en su descripción una línea con texto del proveedor **en chino**,
hoy visible para el cliente.
Archivo: `sj-wheels/data/compatibilidad-proveedor-sin-verificar.csv`.
Esas pistas están normalizadas en columnas internas, **marcadas como no verificadas** y no se
muestran como compatibilidad. Hace falta que alguien las traduzca y las valide una a una.

### 22. Anchuras traseras y configuraciones escalonadas 🟠
Formato: para cada SKU, si el juego es escalonado, la anchura y el ET traseros.
El motor ya admite configuraciones escalonadas; hoy no hay ni un solo dato de origen.

### 23. Carga soportada por llanta (kg) 🟠
Formato: número entero en kg por llanta.
Es un dato de seguridad. `custom.load_rating` está vacío en los 439 productos.

### 24. Homologaciones y certificados 🟠
Formato: tipo (TÜV, ECE, ISO, VIA, JWL…), número de expediente y PDF.
El producto de muestra afirmaba ISO, VIA, CE, TÜV y DOT **sin respaldo documental**.
Está archivado y esas afirmaciones no se han reutilizado. No se mostrará ningún sello
sin el documento que lo respalde.

---

## E · Catálogo

### 25. Tabla de acabados 🟠
Formato: `código del proveedor` → `nombre comercial en español` → `nombre en inglés` → `color de muestra`.
Archivo con los códigos pendientes: `sj-wheels/data/acabados-pendientes-de-traducir.csv`
(`mb`, `mg`, `miyb`, `b`, `p`, `s`, `gmf+chromeinsert`…).
Mientras no exista, la **faceta de acabado está desactivada**: no se le enseñan códigos de proveedor al cliente.

### 26. Fotografía de producto 🟠
El detalle completo está en `sj-wheels/docs/06-imagenes.md`, con la lista priorizada
(`data/prioridad-fotos.csv`) y la plantilla de subida (`data/plantilla-imagenes-nuevas.csv`).

Resumen: solo hay **130 diseños de foto distintos para 437 productos**, casi todas por debajo
de 800 px. Es el mayor límite para alcanzar el nivel visual premium del encargo.

### 27. Confirmación para publicar el catálogo 🔴
Los 439 productos están en `DRAFT`. La tienda no tiene **ningún** producto visible.
No los he publicado: activar productos estaba excluido del encargo.

### 28. Dos datos contradictorios en el origen 🟡

| SKU | Problema | Qué he hecho |
|---|---|---|
| `OYL260416367` | El origen indica `Medida: 20X90`. Una llanta de 90 pulgadas de ancho no existe. | **No he supuesto que sea 9.0.** El campo de anchura quedó vacío y la ficha muestra el estado pendiente. |
| 2 productos | Etiqueta `et-实际38打印42` («ET real 38, impreso 42»). | ET vacío. Dato contradictorio en origen: hace falta que el proveedor aclare cuál es el bueno. |

---

## Cómo entregarme estos datos

- **Tablas** (vehículos, compatibilidad, acabados): en CSV, con las plantillas que ya están en
  `sj-wheels/data/`. Respetar las cabeceras exactamente.
- **Textos legales**: en documento aparte. No los pegaré sin revisión.
- **Fotos**: con la convención de nombres de `06-imagenes.md`.
- **Configuración de la tienda** (nombre, idioma, pagos): la hace el propietario en el admin de
  Shopify. No tengo permiso para tocar esas tres cosas, y es correcto que sea así.

## Qué pasa mientras tanto

Nada se rompe. La tienda está construida para funcionar con datos incompletos:

- Sin vehículos → el selector muestra su estado vacío y explica por qué.
- Sin compatibilidad verificada → «Necesita confirmación técnica», nunca «Compatible».
- Sin WhatsApp → no aparece ningún botón de WhatsApp.
- Sin pasarela de pago → no aparece ningún icono de pago.
- Sin tabla de acabados → no aparece la faceta de acabado.
- Sin plazos confirmados → el texto aparece marcado como pendiente de confirmar.

Ninguno de estos estados inventa información para rellenar el hueco.
