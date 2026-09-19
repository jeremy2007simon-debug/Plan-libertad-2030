# Auditoría de pesos · de dónde sale cada kilo

**Fecha:** 19 de septiembre de 2026
**Fuente:** exportación masiva del catálogo (439 productos, 439 variantes),
campo `inventoryItem.measurement.weight` de cada variante.

## Qué hay hoy en la tienda

Los 439 productos tienen un peso y **ninguno es una medición**. El peso es una
función exacta del diámetro, sin una sola excepción en 439 referencias:

| Diámetro | Peso declarado | PVP |
|---|---|---|
| 16" | 36,0 kg | 649,00 € |
| 17" | 40,0 kg | 699,00 € |
| 18" | 44,0 kg | 799,00 € |
| 19" | 48,0 kg | 899,00 € |
| 20" | 52,0 kg | 999,00 € |
| 21" | 56,0 kg | 1.099,00 € |
| 22" | 60,0 kg | 1.249,00 € |
| 23" | 64,0 kg | 1.399,00 € |

La regla es `peso = 36 + 4 × (diámetro − 16)`. Una llanta de 20x8.5 y una de
20x11.5 pesan lo mismo en la ficha, lo cual no puede ser cierto: tres pulgadas de
anchura son varios kilos por rueda. **Es una escalera generada, igual que la de
precios.**

## Los tres pesos que hay que distinguir, y cuál tenemos

| Peso | ¿Lo tenemos? | Dónde debería estar |
|---|---|---|
| **Por llanta** | **No.** No hay ni un dato | Metafield propio, para la ficha técnica |
| **Del juego de 4** | Solo la estimación de la tabla de arriba | `custom.set_weight_estimate_kg` (ya escrito) |
| **Embalado para el envío** | **No.** Nadie ha pesado una caja | Campo de peso de la variante, que es el que usa el transporte |

Hoy el campo de peso de la variante —el que Shopify usa para calcular tarifas por
peso— contiene **la estimación del juego sin embalaje**. Es el peor sitio posible
para un número inventado: el día que se cree una tarifa por peso, ese número
decide lo que paga el cliente.

## Qué se ha hecho

1. La estimación se ha copiado a `custom.set_weight_estimate_kg`, que es un
   metafield y no alimenta ningún cálculo de transporte.
2. Se ha escrito `custom.weight_source` en las 83 referencias preparadas con el
   texto: *«Estimación de SJ Wheels calculada a partir del diámetro; no es una
   medición del fabricante ni el peso embalado para el envío»*.
3. La descripción de las 439 fichas dice, en texto visible para el cliente:
   *«El peso del juego es una estimación, no una medición: el peso por llanta y
   el peso embalado para el envío están pendientes de determinar»*.
4. **No se ha tocado el peso de ninguna variante.** Cambiarlo sin una medición
   sería sustituir una cifra inventada por otra.

## Lo que hace falta del proveedor

- Peso por llanta de cada referencia, o al menos por familia y medida.
- Peso y medidas del bulto embalado (4 llantas), que es lo que cotiza el
  transportista.
- Confirmación de si el embalaje va en palé o en cajas sueltas.

Hasta entonces: **la estimación no puede presentarse como dato real ni usarse
para calcular un envío.** Es el motivo por el que ninguna tarifa de la tienda
lleva todavía condición de peso.
