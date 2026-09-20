# Precio y transporte son dos decisiones separadas

**Fecha:** 20 de septiembre de 2026 · **Nada de esto está aplicado.** Las tarifas
y el umbral de envío gratuito siguen exactamente como estaban.

## Corrección

En el informe anterior escribí «¿El PVP es precio final?» mezclando dos
preguntas distintas. Son dos:

1. **¿El PVP de la ficha es el precio definitivo del producto?** Es una decisión
   de margen, y depende del coste de compra, que no tenemos.
2. **¿Ese precio incluye el transporte?** Es una decisión de logística, y
   depende de la tarifa del transportista, que tampoco tenemos.

Se pueden responder por separado y en cualquier orden.

## Dato corregido: el rango de precios

Dije «599–1.399 €». **Es un error mío**, no una diferencia entre exportaciones.
Ningún SKU del catálogo tiene 599 €. Comprobado sobre los 439 productos, con un
único precio por producto y una sola variante cada uno:

| Diámetro | PVP | Referencias |
|---|---|---|
| 16" | 649,00 € | 1 (`OYL260416005`) |
| 17" | 699,00 € | 18 |
| 18" | 799,00 € | 73 |
| 19" | 899,00 € | 123 |
| 20" | 999,00 € | 143 |
| 21" | 1.099,00 € | 37 |
| 22" | 1.249,00 € | 41 |
| 23" | 1.399,00 € | 3 |

- **Catálogo completo: 649,00 € – 1.399,00 €.**
- **Las 83 referencias seleccionadas: 699,00 € – 1.249,00 €** (no hay 16" ni 23"
  en la selección).
- El «599» aparecía en la columna `pvp_origen` de `tabla-decision-comercial.csv`
  y en mi resumen. Ya está corregido en el CSV.

## Las tres alternativas, preparadas para elegir

Ninguna está implementada. Las tres son compatibles con dejar los productos en
borrador.

### A · Precio del producto + transporte por destino

El cliente ve el precio de la llanta y, en el checkout, el transporte calculado
por zona.

- **Qué hace falta:** tarifa del transportista para bultos de 40–64 kg, por zona
  (península, Baleares, Canarias, Ceuta/Melilla, UE, resto).
- **Cómo se configura:** una zona de envío por territorio y tarifas por peso
  (`DeliveryMethodDefinition` con condición de peso) en lugar de la tarifa plana
  actual. Habría que **bajar el umbral de envío gratis de 55 € o quitarlo**,
  porque hoy lo supera cualquier pedido.
- **Ventaja:** el precio del producto es honesto y el transporte, real.
- **Riesgo:** un transporte de tres cifras en el checkout hace caer pedidos.

### B · Precio con transporte incluido, solo para destinos concretos

Se incorpora el coste de transporte al PVP, pero **solo en las zonas donde el
coste esté confirmado y sea estable** (por ejemplo, península y Baleares).

- **Qué hace falta:** el coste real por destino y la decisión de cuánto margen se
  come el transporte.
- **Cómo se configura:** tarifa 0 € para esas zonas, y el resto de zonas fuera de
  la cobertura o con presupuesto manual.
- **Ventaja:** un solo número en la ficha, sin sorpresas al final.
- **Condición innegociable:** solo se puede anunciar «transporte incluido» en los
  destinos donde realmente lo esté. La frase anterior lo prometía para todos y
  por eso se retiró.

### C · Presupuesto manual donde no haya tarifa confirmada

Para Canarias, Ceuta, Melilla e internacional mientras no haya tarifa: el
producto se puede ver, pero no se compra directamente; se pide presupuesto.

- **Cómo se configura:** esas zonas sin tarifa (Shopify bloquea el checkout) y un
  formulario de presupuesto en la ficha.
- **Ventaja:** ningún pedido sale con un transporte inventado.
- **Es la única de las tres que se puede tener sin ningún dato nuevo**, y encaja
  con el estado «Consultar disponibilidad y compatibilidad» del documento 18.

## Recomendación

**B para península y Baleares + C para el resto**, en cuanto haya una tarifa
confirmada para península. Es lo que menos promete y lo único que no obliga a
elegir entre mentir y perder el pedido. Pero es una decisión suya: yo no cambio
ninguna tarifa hasta que me lo diga.
