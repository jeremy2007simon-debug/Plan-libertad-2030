# 23 · Asistente de compatibilidad

23-09-2026. Un chat en la tienda que ayuda al cliente a averiguar qué llantas
pueden encajarle, y que responde también de envíos, precios, cómo comprar,
devoluciones y garantía. Conversa Claude; **decide el motor**.

La documentación operativa —qué hay en cada archivo, cómo desplegarlo y cómo
mantenerlo— está en [`sj-wheels/asistente/README.md`](../asistente/README.md).
Este documento recoge por qué está hecho así.

## El problema que había que resolver primero

La petición era «un bot que les diga cuál pueden elegir». En una tienda de
llantas eso choca de frente con lo que este proyecto lleva semanas sosteniendo:
que la compatibilidad no se afirma sin comprobarla. Y no es una precaución
abstracta —las 83 variantes tienen `requires_manual_verification: true`, la
base de vehículos está vacía y no hay un solo enlace vehículo↔variante
verificado. Un bot que contestara igualmente estaría inventando.

La salida no es no hacerlo. Es separar quién conversa de quién decide.

## Cómo se separa

`theme/assets/sjw-fitment.js` ya existía: 173 líneas, 66 pruebas, y una regla
escrita en su cabecera —las comprobaciones numéricas solo pueden **rechazar** o
**dejar en pendiente**; para llegar a «compatible» hace falta que el producto
referencie explícitamente ese vehículo y que la ficha del vehículo esté
verificada.

El backend del asistente **ejecuta ese mismo archivo**, cargado en Node igual
que lo cargan sus pruebas. No hay una segunda implementación de las reglas que
pueda discrepar con la ficha de producto, y las 66 pruebas que ya existían
cubren los dos caminos. Una prueba más falla si la copia que viaja al servidor
se queda atrás respecto al tema.

El modelo llama a ese motor como herramienta y cuenta lo que devuelve. **No
calcula la compatibilidad, así que no puede alucinarla.**

## Lo que puede y lo que no

| Puede | No puede |
|---|---|
| Descartar en firme una llanta cuyo anclaje no es el del coche | Decir que una llanta es compatible |
| Proponer candidatas a confirmar por SJ Wheels | Dar un precio, ni una cifra ni un rango |
| Citar envíos, devoluciones y garantía leyendo la página real | Inventar material, forja, peso, certificaciones o unidades incluidas |
| Dejar el formulario relleno con la referencia y el vehículo | Consultar ni comentar un pedido concreto |

Descartar es más útil de lo que parece: un anclaje que no es el del coche
elimina decenas de referencias sin margen de duda, y eso sí se puede decir con
seguridad.

## Tres decisiones que cierran puertas

**Los precios no entran en su contexto.** `datos/catalogo.json` no los lleva.
No es que el prompt le prohíba decirlos —también—, es que no los tiene.

**Las políticas se leen en vivo.** `consultar_politica` descarga la página de
la tienda en el momento. Cuesta una petición y evita el fallo más caro de un
bot de atención: contestar con una política que dejó de ser cierta hace tres
meses. Si la página no responde, lo dice en lugar de improvisar.

**No toca pedidos.** El alcance pedido incluía «estado del pedido y
devoluciones», y está cubierto explicando el procedimiento y pasando al
formulario, no consultando pedidos. Hacerlo de verdad exigiría identificar al
cliente, y un chat público sin autenticar no es el sitio: un número de pedido y
un correo bastarían para que cualquiera enumerase pedidos ajenos. Si se quiere,
se hace, pero detrás de la cuenta del cliente.

## Lo que lo hace mejorar solo

Cuando se carguen fichas de vehículo verificadas —que es para lo que existe
`tools/import-fitment.py`— el mismo motor empezará a devolver «compatible» para
esas parejas, y el asistente pasará a decirlo. **Sin tocar una línea del
asistente.** El techo de lo que puede contestar no lo pone el modelo: lo pone
la base de vehículos.

Ese es hoy el trabajo pendiente que más valor desbloquea.

## Para encenderlo

Hace falta una clave de Anthropic de la tienda y su coste por conversación. Los
cuatro pasos están en el README. Mientras el campo «Dirección del asistente»
esté vacío en el editor del tema, el asistente no aparece y la tienda funciona
exactamente igual que ahora.

### Dónde está desplegado

| Qué | Valor |
|---|---|
| Proyecto | `sjw-asistente` en Vercel |
| Endpoint | `https://sjw-asistente.vercel.app/api/chat` |
| Rama | `claude/focused-tesla-q9yurp`, carpeta `sj-wheels/asistente` |
| Variables | `ANTHROPIC_API_KEY` (cifrada), `SJW_TIENDA`, `SJW_ORIGEN`, `SJW_WORKSPACE` (opcional) |

La clave no está en el repositorio ni en ningún archivo del proyecto: vive
únicamente en el almacén cifrado de Vercel, que es donde le corresponde.

### La clave tiene que pertenecer a un workspace

Una clave creada a nivel de organización, sin asignar a ningún workspace, es
válida pero la API la rechaza con un 400:

> *This API key is not scoped to a workspace, so this request must include the
> `anthropic-workspace-id` header.*

El motivo es que la API no sabe a qué presupuesto cargar la conversación. Dos
salidas, y la primera es la buena:

1. **Crear la clave dentro de un workspace** en
   [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys):
   al crearla hay un desplegable de workspace; basta con elegir uno en lugar de
   dejar «Default». Esa clave ya no necesita cabecera, y el workspace permite
   además ponerle un límite de gasto propio al asistente, separado del resto.
2. Poner el identificador del workspace en la variable `SJW_WORKSPACE`. El
   endpoint lo manda entonces en la cabecera `anthropic-workspace-id`. Sirve
   igual, pero deja el límite de gasto fuera de la vista.

## Comprobaciones

| Qué | Resultado |
|---|---|
| Pruebas del asistente | 22, sin fallos, sin red |
| El motor nunca devuelve «compatible» | Probado con un vehículo fabricado para encajar |
| Un anclaje distinto descarta sin ambigüedad | Probado |
| `buscar_llantas` no devuelve cifras | Probado |
| Herramientas con `strict` y esquema cerrado | Probado, las cuatro |
| La copia del motor no ha derivado | Probado por MD5 contra el tema |
| Typecheck de TypeScript | Sin errores |
| Revisión estática del tema | 20 comprobaciones, sin errores |
| Motor de compatibilidad | 66 pruebas, sin fallos |
| Guardia de compra | 40 pruebas, sin fallos |

Lo que no está probado es la conversación en sí. El endpoint ya está desplegado
y responde —las peticiones entran, el bucle arranca y el error se comunica en
castellano en lugar de dejar el chat en blanco—, pero la llamada al modelo
devuelve el 400 del workspace descrito arriba, así que ninguna de las cinco
conversaciones de `tests/conversacion.mjs` ha llegado a ejercitar al modelo.

En cuanto la clave pertenezca a un workspace hay que lanzar:

```
node tests/conversacion.mjs https://sjw-asistente.vercel.app/api/chat
```

Son cinco casos con lo que el asistente **no** puede decir: que una llanta es
compatible, un precio, un dato de producto inventado, nada sobre un pedido
concreto. Hasta que esas cinco pasen, el campo «Dirección del asistente» del
editor del tema debe seguir vacío.
