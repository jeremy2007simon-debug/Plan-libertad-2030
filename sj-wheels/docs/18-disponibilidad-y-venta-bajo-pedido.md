# Disponibilidad: venta bajo pedido con confirmación, no «En stock»

**Fecha:** 20 de septiembre de 2026

## De qué partimos

En los 439 productos: **inventario sin seguimiento** (`tracked = false`) y
política `CONTINUE`. Consecuencias reales:

- La tienda **nunca bloquea** una compra por falta de stock.
- El tema muestra el producto como comprable, que para el cliente equivale a
  «disponible».
- Un pedido no descuenta nada de ningún inventario, porque no hay inventario.
- No hay ni un dato de cuántas unidades tiene el proveedor ni en cuánto tiempo
  las sirve.

**Presentar esto como «En stock» sería falso.** Y aceptar el pago sería aceptar
dinero por algo que no sabemos si existe.

## El flujo correcto: bajo pedido con disponibilidad confirmada

```
Cliente ve la ficha
   │  estado: «Consultar disponibilidad y compatibilidad»
   ▼
Formulario  (vehículo + medida + datos de contacto)
   │
   ▼
SJ Wheels comprueba DOS cosas, por separado:
   ├── disponibilidad real con el proveedor  → unidades y plazo
   └── compatibilidad técnica del vehículo   → medida, ET, buje, frenos
   │
   ▼
Presupuesto en firme (precio + transporte al destino + plazo)
   │
   ▼
El cliente acepta  →  pedido y cobro
```

Dos reglas que no se saltan:

1. **La confirmación del cliente no sustituye a la nuestra.** Que el cliente diga
   «sí, es mi medida» no convierte una compatibilidad sin verificar en verificada,
   ni crea stock. El botón de comprar no se habilita por que el cliente insista.
2. **Los dos controles son independientes.** Puede haber stock sin compatibilidad
   confirmada, y al revés. Hacen falta los dos en verde.

## Lo que se ha preparado

- Metafield **`custom.availability_status`** escrito en las 83 referencias
  seleccionadas con el valor: *«Consultar disponibilidad: sin stock confirmado ni
  seguimiento de inventario»*.
- Metafield **`custom.requires_manual_verification` = true** en las 83.
- El bloque de tema para DEV está en
  `sj-wheels/theme-dev/sjw-consultar-disponibilidad.liquid`, listo para
  incorporarlo al tema **SJ Wheels — DEV**. Sustituye el botón de compra por el
  estado y el enlace al formulario cuando cualquiera de los dos metafields lo
  pide.

## Lo que falta para poder activarlo

1. La URL del formulario de consulta (página nueva o app de formularios).
2. Quién responde y en cuánto tiempo.
3. Los datos del proveedor: unidades disponibles y plazo de preparación.

Mientras tanto **no se activa ningún producto**: el estado «Consultar» solo tiene
sentido si detrás hay alguien que contesta.
