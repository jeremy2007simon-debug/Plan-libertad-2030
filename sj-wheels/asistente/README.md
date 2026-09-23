# Asistente de compatibilidad de SJ Wheels

Un chat en la tienda que ayuda al cliente a averiguar qué llantas pueden
encajarle. Claude conversa; **la decisión de si una llanta encaja la toma el
motor determinista del tema**, no el modelo.

## Por qué está hecho así

En una tienda de llantas, afirmar una compatibilidad que no es cierta acaba en
una rueda que roza la pinza de freno. Por eso el reparto de papeles no es
negociable:

- El modelo entiende lo que pide el cliente, decide qué falta por preguntar y
  redacta la respuesta.
- `comprobar_compatibilidad` ejecuta `theme/assets/sjw-fitment.js` —el **mismo
  archivo** que corre en la ficha de producto— y devuelve su veredicto.
- El modelo cuenta ese veredicto. No lo calcula, así que no puede alucinarlo.

La regla de oro está escrita en el motor: las comprobaciones numéricas solo
pueden **rechazar** o **dejar en pendiente**. Para llegar a «compatible» hace
falta que el producto referencie explícitamente ese vehículo y que la ficha del
vehículo esté verificada.

**Hoy no se cumple para ninguna referencia**: la base de vehículos está vacía y
las 83 variantes tienen `requires_manual_verification: true`. En la práctica el
asistente puede:

| Puede | No puede |
|---|---|
| Descartar en firme una llanta cuyo anclaje no es el del coche | Decir que una llanta es compatible |
| Proponer candidatas a confirmar por SJ Wheels | Dar un precio, ni una cifra ni un rango |
| Citar envíos, devoluciones y garantía leyendo la página real | Inventar material, forja, peso o certificaciones |
| Dejar el formulario relleno con la referencia y el vehículo | Consultar ni comentar un pedido concreto |

Cuando se carguen fichas de vehículo verificadas, el mismo motor empezará a
devolver «compatible» para esas parejas y el asistente lo dirá, sin tocar
ninguna línea de este código.

## Qué hay aquí

```
api/chat.ts            Endpoint SSE. Bucle manual de herramientas.
src/motor.ts           Carga sjw-fitment.js en Node. Sin segunda implementación.
src/catalogo.ts        Las 83 referencias con su geometría. Sin precios.
src/paginas.ts         Lee las páginas de política de la tienda en vivo.
src/herramientas.ts    Las cuatro herramientas, todas con strict.
src/sistema.ts         Las instrucciones y las reglas que no se saltan.
datos/catalogo.json    Instantánea del catálogo (regenerable).
tools/exportar-catalogo.py   Rehace la instantánea desde Shopify.
tests/                 16 pruebas. La que importa: el motor nunca dice «ok».
```

El widget del escaparate es `theme/sections/sjw-asistente.liquid` +
`theme/assets/sjw-asistente.js`.

## Decisiones que conviene conocer

**Los precios no llegan al asistente.** No están en `catalogo.json`. Si el dato
no existe en su contexto, no puede decirlo por descuido.

**Las políticas se leen en vivo.** `consultar_politica` descarga
`/pages/envios` y compañía en el momento, con diez minutos de caché. Cuesta una
petición, pero evita el fallo más caro de un bot de atención: contestar con una
política que dejó de ser cierta hace tres meses. Si la página no responde, el
asistente lo dice en lugar de improvisar.

**No toca pedidos.** No tiene acceso ni debe pedir datos personales por el
chat. Para cualquier cosa de un pedido concreto explica el procedimiento y pasa
al formulario. Añadir consulta de pedidos exigiría identificar al cliente, y un
chat público no es el sitio.

**El historial no se guarda.** Viaja en cada petición y vive en la pestaña del
cliente. El servidor no tiene estado.

**Modelo y coste.** `claude-opus-5` con `effort: medium`. El trabajo difícil lo
hace el motor, así que no hace falta más profundidad; el cuidado se gasta en
cómo se redacta, que es donde está el riesgo. El prompt de sistema va con
`cache_control`, de modo que a partir del segundo mensaje de una conversación
se paga como lectura de caché.

## Ponerlo en marcha

1. **Clave de Anthropic.** Hace falta una y su coste corre por cuenta de la
   tienda. Se pone en el entorno como `ANTHROPIC_API_KEY`.

2. **Desplegar.**

   ```bash
   cd sj-wheels/asistente
   npm install
   npm test                     # 16 pruebas, sin red
   npx vercel deploy --prod
   ```

   `npm run prepare-deploy` copia `sjw-fitment.js` junto a la función; el
   `buildCommand` de `vercel.json` ya lo hace. Hay una prueba que falla si esa
   copia se queda atrás respecto al tema.

3. **Variables de entorno** en Vercel: las de `.env.example`. `SJW_ORIGEN`
   conviene fijarlo al dominio real de la tienda antes de abrirlo al público;
   con `*` responde a cualquiera.

4. **Encender el widget.** En el editor del tema, añadir la sección «Asistente
   SJ Wheels» y pegar la URL del endpoint en «Dirección del asistente».
   Mientras ese campo esté vacío, el asistente no aparece y el tema funciona
   igual.

## Mantenimiento

- **Si cambia el catálogo**, regenerar la instantánea:
  `python3 tools/exportar-catalogo.py --consulta` da la consulta GraphQL;
  lanzarla contra la tienda, guardar la respuesta y pasarla con `--entrada`.
- **Si cambia el motor** (`theme/assets/sjw-fitment.js`), ejecutar
  `npm run prepare-deploy` y volver a desplegar. La prueba de deriva avisa.
- **Si cambian las páginas de política**, no hay que hacer nada: se leen en vivo.
