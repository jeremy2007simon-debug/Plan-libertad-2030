import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

/**
 * Tipografía para chino simplificado, en su propio módulo.
 *
 * MEDIDO, PENDIENTE: `next/font` emite las reglas `@font-face` de toda fuente
 * declarada, y Google sirve las familias CJK troceadas en cientos de rangos
 * unicode. Son 363 kB de CSS (130 kB comprimidos) que hoy viajan en las seis
 * lenguas, incluidas las cinco que nunca usarán un hanzi.
 *
 * Sacarlas a este módulo no basta: Turbopack adjunta su CSS al fragmento del
 * layout, que es compartido, y probado con `await import()` dinámico el
 * resultado es el mismo. La solución real —servir los `@font-face` desde una
 * hoja propia enlazada solo en `/zh-CN`, o autoalojar un subconjunto de Noto
 * SC— es un cambio de infraestructura tipográfica, no de estilo, y no entra en
 * una ronda visual. Queda anotado con su medición para la siguiente.
 *
 * `preload: false` sí evita que los archivos de fuente se descarguen antes de
 * hacer falta: en las páginas no chinas no se baja ni un byte de fuente CJK.
 *
 * Cormorant Garamond no contiene ni un solo hanzi: forzarla dejaría toda la
 * versión china compuesta con la fuente de respaldo del sistema, distinta en
 * cada dispositivo. Noto Serif SC es la contraparte real —serif de asta
 * modulada, editorial, con el mismo aire— y Noto Sans SC hace de Manrope.
 */

export const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
});

export const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

/** Clases de variable tipográfica para el `<html>` de las páginas chinas. */
export const HAN_FONT_VARIABLES = `${notoSerifSC.variable} ${notoSansSC.variable}`;
