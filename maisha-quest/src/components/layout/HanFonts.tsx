/**
 * Tipografía china: dos caras propias, y solo en `/zh-CN`.
 *
 * Lo que había antes
 * ------------------
 * `next/font/google` con Noto Serif SC y Noto Sans SC. Google sirve las
 * familias CJK troceadas en más de doscientos rangos unicode por familia, y
 * `next/font` emite una regla `@font-face` por trozo. Medido en la preview:
 *
 *   · 134 kB comprimidos de CSS en las SEIS lenguas, no solo en chino, porque
 *     esas reglas acaban en la hoja compartida del layout. Lighthouse las
 *     marcaba como CSS 100 % sin utilizar en `/en` y como 1,4 s de pintado
 *     bloqueado en móvil.
 *   · 2,48 MB de fuentes en 41 peticiones al abrir `/zh-CN`.
 *
 * Lo que hay ahora
 * ----------------
 * El texto chino de esta web es finito y vive en el repositorio, así que las
 * fuentes se recortan a los caracteres que se usan de verdad —1.196— y se
 * sirven desde `/fonts`. `scripts/subset-han-fonts.py` las genera y hay que
 * volver a ejecutarlo al cambiar el texto en chino; el build comprueba que no
 * falte ningún carácter y falla si falta alguno.
 *
 *   · 0 kB de CSS de tipografía china en las cinco lenguas que no la usan.
 *   · 460 kB en 2 peticiones en `/zh-CN`, frente a 2,48 MB en 41.
 *
 * Las reglas van en línea y no en `globals.css` a propósito: en la hoja
 * global volverían a viajar en las seis lenguas, que es el problema que se
 * está resolviendo. Son dos bloques; el peso de esta etiqueta es despreciable
 * frente a lo que ahorra.
 *
 * `font-display: swap` deja el texto legible con la fuente del sistema
 * mientras llegan; el chino no queda invisible en ningún momento.
 */
export function HanFonts() {
  return (
    <style>{`
@font-face{font-family:'Noto Serif SC Subset';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/noto-serif-sc.woff2) format('woff2')}
@font-face{font-family:'Noto Sans SC Subset';font-style:normal;font-weight:400 600;font-display:swap;src:url(/fonts/noto-sans-sc-var.woff2) format('woff2-variations')}
:root[data-script="han"]{--font-display:'Noto Serif SC Subset',"Songti SC","Source Han Serif SC",serif;--font-sans:'Noto Sans SC Subset',"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif}
`}</style>
  );
}
