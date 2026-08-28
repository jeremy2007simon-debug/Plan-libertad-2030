import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

/**
 * Tipografía para chino simplificado, en su propio módulo.
 *
 * MEDIDO, PENDIENTE: `next/font` emite las reglas `@font-face` de toda fuente
 * declarada, y Google sirve las familias CJK troceadas en cientos de rangos
 * unicode. Ese CSS viaja en las seis lenguas, incluidas las cinco que nunca
 * usarán un hanzi.
 *
 * Medición: con cuatro y tres pesos eran 635 kB sin comprimir (229 kB en
 * gzip). Recortados a los pesos que la maqueta usa de verdad —ninguna regla
 * pide 300 ni 700— quedan 362 kB (132 kB en gzip). El CSS total de la portada
 * pasa de 244 a 145 kB comprimidos, y de esos 145 solo 12 son estilos del
 * sitio: el resto siguen siendo `@font-face` chinos.
 *
 * Sacarlas a este módulo no basta: Turbopack adjunta su CSS al fragmento del
 * layout, que es compartido, y probado con `await import()` dinámico el
 * resultado es el mismo. La solución real —servir los `@font-face` desde una
 * hoja propia enlazada solo en `/zh-CN`, autoalojar un subconjunto de Noto SC,
 * o componer el chino con la pila del sistema (PingFang SC, Songti SC,
 * Microsoft YaHei), que cambiaría el aspecto de la versión china y por tanto
 * es decisión vuestra— es un cambio de infraestructura tipográfica. Queda
 * anotado con su medición.
 *
 * Los pesos declarados aquí y en `layout.tsx` son los que aparecen en el CSS:
 * 400 para el cuerpo y los titulares, 500 para la navegación, 600 para los
 * antetítulos. Añadir uno obliga a añadirlo también aquí, o el chino se
 * compondrá con ese peso sintetizado por el navegador.
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
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

export const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

/** Clases de variable tipográfica para el `<html>` de las páginas chinas. */
export const HAN_FONT_VARIABLES = `${notoSerifSC.variable} ${notoSansSC.variable}`;
