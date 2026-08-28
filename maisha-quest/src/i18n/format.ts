/**
 * Formateo de mensajes con variables, del lado del cliente.
 *
 * El diccionario está lleno de funciones de traducción, y es lo correcto: el
 * orden de las palabras y las reglas de plural no se resuelven con plantillas
 * de una sola forma. Pero una función NO puede cruzar la frontera
 * servidor→cliente de React, así que los pocos mensajes que se resuelven ya
 * dentro de un componente de cliente —los del planificador— se guardan como
 * datos y se formatean aquí.
 *
 * El resto del diccionario sigue usando funciones: se ejecutan en el servidor
 * y solo viaja el texto resultante.
 */

import { LOCALE_META, type Locale } from "./config";

/**
 * Formas de plural de un mensaje, con las categorías CLDR del idioma.
 * `other` es obligatoria porque es la única que existe en todos los idiomas
 * (en chino es la única; en ruso hacen falta `one`, `few` y `many`).
 */
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & {
  other: string;
};

/** Sustituye `{clave}` por su valor. Deja intacto lo que no reconoce. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/**
 * Elige la forma de plural con `Intl.PluralRules` —no con `n === 1`—, que es
 * lo que hace que el ruso reciba sus tres formas y el chino una sola.
 */
export function plural(
  locale: Locale,
  n: number,
  forms: PluralForms,
  vars: Record<string, string | number> = {},
): string {
  const rule = new Intl.PluralRules(LOCALE_META[locale].intl).select(n);
  const template = forms[rule] ?? forms.other;
  return fill(template, { n, ...vars });
}
