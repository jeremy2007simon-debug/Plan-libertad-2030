/**
 * El catálogo que ve el asistente: las 83 referencias con su geometría.
 *
 * Es una instantánea (datos/catalogo.json) y no la tienda en vivo, por tres
 * razones: responder rápido, no depender de la API de Shopify en cada
 * mensaje, y que el asistente no pueda ver ningún dato que no hayamos
 * revisado. Se regenera con tools/exportar-catalogo.py.
 *
 * Lo que NO hay aquí, a propósito: precios. Están guardados en Shopify y bajo
 * consulta, y el asistente no debe poder decir una cifra ni aunque se la
 * pidan. Si el dato no está, no se puede filtrar.
 */
import catalogoJson from '../datos/catalogo.json' with { type: 'json' };
import type { Llanta } from './motor.js';

export interface Variante {
  sku: string;
  variantId: string;
  titulo: string;
  diametro: number;
  anchura: number;
  anclaje: string;
  et: number;
  buje: number;
  acabado: string;
  imagen: string;
  url: string;
  compraBloqueada: boolean;
  requiereVerificacion: boolean;
  vehiculosVerificados: string[];
}

export interface Diseno {
  diseno: string;
  handle: string;
  titulo: string;
  url: string;
  rasgos: string;
  variantes: Variante[];
}

interface Catalogo {
  generado: string;
  fuente: string;
  precios: string;
  nota: string;
  disenos: Diseno[];
}

export const catalogo = catalogoJson as Catalogo;

export const todasLasVariantes: Array<Variante & { diseno: string; disenoUrl: string }> =
  catalogo.disenos.flatMap((d) =>
    d.variantes.map((v) => ({ ...v, diseno: d.diseno, disenoUrl: d.url })),
  );

export function porSku(sku: string) {
  const buscado = sku.trim().toUpperCase();
  return todasLasVariantes.find((v) => v.sku.toUpperCase() === buscado);
}

/** Traduce una variante del catálogo a lo que espera el motor. */
export function comoLlanta(v: Variante): Llanta {
  return {
    boltPattern: v.anclaje,
    diameter: v.diametro,
    width: v.anchura,
    et: v.et,
    centerBore: v.buje,
    requiresManualVerification: v.requiereVerificacion,
    vehicleIds: v.vehiculosVerificados,
  };
}

export interface Filtros {
  anclaje?: string;
  diametro?: number;
  diametroMin?: number;
  diametroMax?: number;
  anchuraMin?: number;
  anchuraMax?: number;
  etMin?: number;
  etMax?: number;
  buje?: number;
  acabado?: string;
  diseno?: string;
}

/** Normaliza "5X112", "5*112", " 5x112 " → "5x112". */
export function normalizaAnclaje(valor: string): string | null {
  const m = valor.toLowerCase().replace(/\s+/g, '').match(/^(\d+)[x*×](\d+(?:[.,]\d+)?)$/);
  return m && m[1] && m[2] ? `${m[1]}x${parseFloat(m[2].replace(',', '.'))}` : null;
}

export function buscar(f: Filtros, limite = 25) {
  const anclaje = f.anclaje ? normalizaAnclaje(f.anclaje) : null;
  const resultado = todasLasVariantes.filter((v) => {
    if (anclaje && normalizaAnclaje(v.anclaje) !== anclaje) return false;
    if (f.diametro !== undefined && v.diametro !== f.diametro) return false;
    if (f.diametroMin !== undefined && v.diametro < f.diametroMin) return false;
    if (f.diametroMax !== undefined && v.diametro > f.diametroMax) return false;
    if (f.anchuraMin !== undefined && v.anchura < f.anchuraMin) return false;
    if (f.anchuraMax !== undefined && v.anchura > f.anchuraMax) return false;
    if (f.etMin !== undefined && v.et < f.etMin) return false;
    if (f.etMax !== undefined && v.et > f.etMax) return false;
    if (f.buje !== undefined && v.buje !== f.buje) return false;
    if (f.acabado && v.acabado.toUpperCase() !== f.acabado.trim().toUpperCase()) return false;
    if (f.diseno && v.diseno.toUpperCase() !== f.diseno.trim().toUpperCase()) return false;
    return true;
  });
  return { total: resultado.length, variantes: resultado.slice(0, limite) };
}
