# Decisiones del propietario antes de publicar

Este documento **no se publica en la tienda**. Es la lista de lo que no puedo
decidir yo porque es una decisión comercial, legal o de marca. Cada punto dice
qué está pasando ahora, qué hay que decidir y dónde se cambia.

Lo que falta como **dato** (razón social, NIF, teléfono, número de WhatsApp,
perfiles reales, horario) está en `05-datos-necesarios-del-propietario.md`. Aquí
solo van las **decisiones**.

Leyenda: 🔴 impide publicar · 🟠 la tienda abre con una función apagada · 🟡 mejora.

---

## 1 · Publicar el catálogo 🔴

**Ahora:** 440 productos en total. **439 en borrador** y **0 activos**. Los 439
tienen al menos una fotografía. El producto 440 está **archivado**:

| Campo | Valor |
|---|---|
| Título | Llanta deportiva de aleación 6x139.7 para SUV y 4x4 |
| SKU | `LLANTA-17-6X1397-ET20` |
| ID | `gid://shopify/Product/10895724151117` |
| Creado | 17/09/2026 |
| Fotografías | ninguna |
| Existencias | 0 |

**Decisión:** qué productos se publican y cuándo. No he activado ninguno: la
regla del encargo lo prohíbe expresamente.

**Consecuencia mientras siga así:** la colección, la ficha de producto, el
carrito, el pago y los filtros **no se pueden probar con datos reales**. La
tienda enseña el estado "catálogo en preparación", que es correcto pero
provisional. Y el producto archivado no se ve en ninguna parte: si debe
publicarse, hay que sacarlo de archivado primero.

**Dónde:** Productos → seleccionar → Estado → Activo.

---

## 2 · El nombre administrativo de la tienda 🔴

**Ahora:** el nombre de la tienda en Shopify es **«My Store 2»**. Lo que ve el
cliente dice «SJ Wheels» porque el tema usa un ajuste propio
(`Personalizador → SJ Wheels → Nombre de marca`) para el título, el pie y los
datos estructurados.

**Lo que ese ajuste no alcanza:** los correos transaccionales, el proceso de
pago y las facturas, que los escribe Shopify con el nombre administrativo.

**Decisión:** cambiarlo. No hay forma de hacerlo por API.

**Dónde:** Configuración → Detalles de la tienda → Nombre.

---

## 3 · El idioma predeterminado 🔴

**Ahora:** el español está publicado, pero el **predeterminado** sigue siendo
inglés. Shopify sirve la raíz en inglés y el español bajo `/es`.

**Decisión:** si la tienda vende en España, el predeterminado debería ser
español. Es un cambio con efectos en las URL ya indexadas, así que lo decide el
propietario.

**Dónde:** Configuración → Idiomas → Cambiar idioma predeterminado.

---

## 4 · «Tecnología de Shopify» en el pie 🟡

**La pregunta era si se puede quitar. Sí se puede.** No es una obligación legal
ni contractual: Shopify no exige la atribución en la tienda, y el propio tema
Horizon trae el interruptor.

**Ahora:** está **encendido**, y el pie dice «© 2026 SJ Wheels, Tecnología de
Shopify».

**Decisión:** apagarlo o dejarlo. No lo he tocado porque es la firma pública de
la tienda y eso lo decide su dueño.

**Dónde:** Personalizador → Pie de página → Utilidades → Copyright →
*Mostrar «Tecnología de Shopify»*.

---

## 5 · El número de WhatsApp 🟠

**Ahora:** vacío. En consecuencia:

- no se pinta ningún botón de WhatsApp en toda la tienda;
- el mensaje «Atención por WhatsApp» de la barra superior **no se muestra**, para
  no prometer un canal que no existe. Vuelve solo en cuanto haya número.

**Decisión:** si hay atención por WhatsApp, cuál es el número.

**Dónde:** Personalizador → SJ Wheels → WhatsApp.

---

## 6 · Dos afirmaciones comerciales que hoy están escritas 🟠

Estas frases ya se muestran al cliente y conviene confirmarlas o cambiarlas:

| Dónde | Lo que dice | Qué hay que confirmar |
|---|---|---|
| Ventajas de la portada y preguntas frecuentes | «El precio corresponde al juego de 4 llantas, salvo que la ficha indique otra cosa» | Que sea cierto para todo el catálogo, o qué productos son la excepción |
| Portada, envíos | «Envío a península y Canarias» | Que se envíe realmente a Canarias, y en qué condiciones |

No he inventado plazos, precios de envío ni garantías en ninguna parte. Donde
hacía falta un plazo, el texto dice qué se hace, no cuándo.

**Dónde:** Personalizador → Portada → Ventajas / Preguntas frecuentes, y la
página *Envíos*.

---

## 7 · Secciones que he retirado de la portada 🟡

Las dos se pueden devolver en un minuto desde el personalizador. Las retiré
porque, con el catálogo sin publicar, decían algo que no se puede cumplir o lo
repetían.

| Sección | Por qué | Cómo vuelve |
|---|---|---|
| «Cómo funciona» (tres pasos) | El paso 2 era «Elige tus llantas» y no hay ninguna que elegir. Además chocaba con los cuatro pasos de la consulta guiada, justo encima | Personalizador → Portada → Añadir sección → *Cómo funciona* |
| Barra de anuncio de Horizon | Decía «Compatibilidad revisada por una persona antes de cada envío», es decir casi lo mismo que el primer mensaje de la barra de SJ Wheels, y quedaban dos franjas seguidas | Personalizador → Cabecera → Añadir sección → *Barra de anuncios* |

«Comprar por diámetro» no la he retirado: se oculta sola mientras ninguna
colección tenga productos visibles y **reaparece cuando se publique el
catálogo**. Si se prefiere que se vea siempre, hay un interruptor en
Personalizador → Portada → Comprar por diámetro → *Ocultar mientras no haya
productos*.

---

## 8 · Dos archivos de prueba que hay que borrar a mano 🟡

Se usaron para averiguar por qué Shopify rechazaba en silencio dos archivos del
tema. Ya no los invoca ninguna plantilla y no imprimen nada: los dejé vacíos,
con un comentario que explica qué eran. **La API de temas disponible en este
entorno no permite borrar archivos**, así que el borrado es manual.

- `snippets/sjw-sd-test.liquid`
- `sections/sjw-req-test.liquid`

**Dónde:** Tienda online → Temas → SJ Wheels — DEV → Editar código.

---

## 9 · Publicar el tema 🔴

**Ahora:** todo el trabajo está en **SJ Wheels — DEV**, que no está publicado.
Horizon MAIN sigue intacto.

**Decisión:** cuándo se publica, y con qué de lo anterior ya resuelto. Antes de
publicar conviene tener cerrados, como mínimo, los puntos 1, 2 y 3.

**Dónde:** Tienda online → Temas → SJ Wheels — DEV → Publicar.
