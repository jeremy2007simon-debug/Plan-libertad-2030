# SJ Wheels — Checklist antes de publicar

El tema está en `SJ Wheels — DEV (no publicar)`. **No se ha publicado nada.**
Esta lista es lo que falta para poder hacerlo.

## Bloqueantes (sin esto no se puede abrir la tienda)

| # | Qué falta | Por qué bloquea | Quién |
|---|---|---|---|
| 1 | **Proveedor de pagos** | Hoy `supportedDigitalWallets` está vacío: no se puede cobrar, y el footer no muestra iconos de pago porque no hay ninguno real | Propietario |
| 2 | **Idioma predeterminado → Español** | Español ya está habilitado y publicado, pero el predeterminado sigue siendo inglés, así que Shopify sirve `lang="en"` sobre contenido español. *Configuración → Idiomas* | Propietario |
| 3 | **Número de WhatsApp** | Sin él no se pinta ningún botón de WhatsApp en toda la tienda. *Personalizador → SJ Wheels* | Propietario |
| 4 | **Políticas legales** | Solo existe la de privacidad, autogenerada y en inglés. Faltan términos, reembolso, envíos, aviso legal y cookies | Asesoría legal |
| 5 | **Fiscalidad Canarias / Península** | IGIC, IVA y aduanas afectan al precio final. Está marcado `[PENDIENTE DE CONFIRMAR]` en la página de envíos | Asesoría fiscal |
| 6 | **Publicar el catálogo** | Los 439 productos están en `DRAFT`. La tienda no tiene ningún producto visible | Propietario |
| 7 | **Nombre de la tienda → SJ Wheels** | Sigue siendo "My Store 2". No hay mutación para esto: *Configuración → Detalles de la tienda* | Propietario |

## Importantes (la tienda funciona, pero cojea)

| # | Qué falta | Efecto mientras tanto |
|---|---|---|
| 8 | **Base de vehículos** (metaobjects `vehicle`) | El selector muestra su estado vacío y **todo el catálogo queda en "Necesita confirmación técnica"**. Es el estado seguro, pero nadie verá nunca "Compatible" |
| 9 | **Relación producto ↔ vehículo** (`custom.compatible_vehicles`) | Igual que arriba: sin esta relación verificada no se puede afirmar compatibilidad |
| 10 | **Traducción de acabados** | La faceta de acabado está desactivada (`sjw_show_finish_facet: false`) para no mostrar códigos del proveedor como `mb` o `gmf+chromeinsert`. Fichero: `data/acabados-pendientes-de-traducir.csv` |
| 11 | **Fotografía de producto** | Una sola imagen por producto, baja resolución, proporción variable y reutilizada entre referencias. Es el mayor límite del objetivo visual |
| 12 | **Descripciones con texto en chino** | 283 de 439 fichas incluyen la línea "Compatibilidad orientativa" con texto del proveedor sin traducir, visible para el cliente. No las he reescrito: son 439 ediciones de contenido del propietario |
| 13 | **Redes sociales** | Vaciadas a propósito. Los enlaces que traía Horizon apuntaban a las portadas de Facebook, Instagram, YouTube y TikTok, no a perfiles de SJ Wheels |
| 14 | **Shopify Search & Discovery** (app gratuita de Shopify) | Sin ella no hay filtros por metafield en las colecciones: solo los filtros por defecto |

## Datos sueltos pendientes

- SKU `OYL260416367`: el origen dice `Medida: 20X90`. Una llanta de 90 pulgadas no existe. **No he supuesto que sea 9.0**: el campo de anchura quedó vacío y la ficha muestra el estado pendiente.
- 2 productos con etiqueta `et-实际38打印42` ("ET real 38, impreso 42"). Dato contradictorio en origen: su ET quedó vacío.
- Producto de prueba `Llanta deportiva de aleación 6x139.7` archivado. Afirmaba certificaciones ISO/VIA/CE/TÜV/DOT y garantía de 1 año sin respaldo.
- Colecciones por diámetro: siguen siendo **manuales**. Cada producto nuevo hay que añadirlo a mano. Las de marca sí son automáticas por etiqueta.
- Carga soportada (`custom.load_rating`) y rango de ET (`offset_et_min` / `offset_et_max`): sin dato de origen en todo el catálogo.

## Pruebas hechas

| Prueba | Resultado |
|---|---|
| Motor de compatibilidad (20 casos) | `node sj-wheels/tests/fitment.test.js` → **20/20** |
| QA estático (14 comprobaciones) | `python3 sj-wheels/tests/qa.py` → **0 errores** |
| Validación Liquid de Shopify | Todos los archivos aceptados. Rechazó 2 en el camino y se corrigieron |
| Migración de metafields | 439/439 productos verificados contra el origen, **0 discrepancias** |
| Rangos técnicos | Diámetro, ET y buje: 0 fuera de rango. Anchura: 1 caso, excluido |
| Paridad de traducciones | 85 claves idénticas en español e inglés |

## Lo que NO he podido probar

**El renderizado real del storefront.** La tienda está protegida por contraseña y la Admin API
no expone esa contraseña, así que la vista previa devuelve un 302 a la página de acceso.

Lo que sí respalda que el tema está sano: Shopify valida el Liquid al subir cada archivo y
rechaza los que tienen errores —lo hizo dos veces con archivos míos, que corregí—, más las 14
comprobaciones estáticas y las 20 pruebas unitarias.

**Antes de publicar, hay que abrir la vista previa y comprobarlo a ojo.**

## Cómo previsualizar

1. Admin → *Tienda online → Temas*
2. En `SJ Wheels — DEV (no publicar)`, botón **Vista previa**
3. O directamente: `https://5y82gi-yt.myshopify.com/?preview_theme_id=196061626701`
   (pedirá la contraseña de la tienda)

Qué mirar primero:

- Portada: barra de mensajes, buscador de vehículo (debe mostrar su estado vacío), beneficios,
  categorías, destacados, cómo funciona, guía técnica, FAQ y CTA.
- Colección: barra de vehículo pegajosa, medidas y badge en cada tarjeta, botón de comparar.
- Producto: badge de compatibilidad **antes** del botón de compra, panel técnico con datos
  reales, y el botón de añadir al carrito deshabilitado mientras no haya vehículo.
- Comparador: añadir dos llantas y abrir el panel; las filas que difieren se resaltan.
- Con el teclado: recorrer el mega menú, el acordeón de FAQ y el panel del comparador.

## Aplicaciones recomendadas (ninguna instalada)

| App | Para qué | Coste |
|---|---|---|
| **Shopify Search & Discovery** | Filtros por metafield en colección: diámetro, anchura, PCD, ET, buje | Gratuita, de Shopify |
| Shopify Forms | Solicitud de compatibilidad y aviso de reposición con anti-spam | Gratuita, de Shopify |
| Shopify Email | Newsletter | Gratuita hasta cierto volumen |
| App de reseñas | Solo si va a haber reseñas auténticas. Sin ellas, no se emiten datos estructurados de valoración | De pago, **no instalar sin autorización** |

## Funciones no construidas

Interfaz y datos listos, pero fuera de lo entregado: favoritos, galería de coches de clientes,
preguntas y respuestas en producto, calculadora de medidas, blog técnico y aviso de reposición.
Ninguna es bloqueante y todas encajan sobre la arquitectura actual.
