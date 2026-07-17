import type { es } from "./es";

// El español (es.ts) es la fuente de verdad de la forma del diccionario.
// Cualquier idioma nuevo debe tipar como `Translations` — si le falta una
// clave o cambia la firma de una función, TypeScript lo marca en el build.
export type Translations = typeof es;

export type Locale = "es" | "en";
