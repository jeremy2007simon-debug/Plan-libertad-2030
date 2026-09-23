/**
 * Preparar la respuesta del modelo para volver a mandársela.
 *
 * En un bucle de herramientas, cada respuesta vuelve a la API como mensaje del
 * asistente en la vuelta siguiente. Pero los bloques que la API devuelve no son
 * exactamente los que acepta: los de texto traen un campo `parsed` que solo
 * tiene sentido de salida, y reenviarlo tal cual tumba la petición entera con
 * un 400 «Extra inputs are not permitted».
 *
 * Se limpian únicamente los de texto. Los de pensamiento viajan intactos a
 * propósito: llevan una firma que la API verifica, y tocarlos los invalida.
 */
import type Anthropic from '@anthropic-ai/sdk';

export function paraReenviar(
  bloques: Anthropic.Beta.BetaContentBlock[],
): Anthropic.Beta.BetaContentBlockParam[] {
  return bloques.map((bloque) => {
    if (bloque.type !== 'text') return bloque as Anthropic.Beta.BetaContentBlockParam;
    const limpio: Anthropic.Beta.BetaTextBlockParam = { type: 'text', text: bloque.text };
    if (bloque.citations?.length) limpio.citations = bloque.citations;
    return limpio;
  });
}
