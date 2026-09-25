/**
 * La tabla de vehículos: qué anclaje, buje, diámetros y ET admite un coche.
 *
 * Existe para que el cliente no tenga que saberse el PCD de su coche. Dice
 * «BMW Serie 3 de 2019» y de ahí salen las medidas que el motor necesita.
 *
 * La tabla se llena desde `data/vehiculos.csv`, la misma fuente que alimenta
 * los metaobjetos `vehicle` de Shopify, para que la ficha de producto y el
 * asistente no puedan contradecirse. Hoy está vacía: una ficha inventada manda
 * a alguien una llanta que no atornilla en su coche.
 *
 * Lo que este módulo NO hace, a propósito: adivinar. Si un coche no está en la
 * tabla, la respuesta es que no está, no una estimación.
 */
import tablaJson from '../datos/vehiculos.json' with { type: 'json' };

export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  generacion: string;
  anioDesde: number;
  anioHasta: number | null;
  anclaje: string;
  buje: number;
  diametros: number[];
  etMin: number | null;
  etMax: number | null;
  anchuraMin: number | null;
  anchuraMax: number | null;
  verificacion: 'verified' | 'pending';
  /** Cómo llama la gente a este coche: «f30», «320i», «serie 3». */
  alias: string[];
}

interface Tabla {
  generado: string | null;
  origen: string;
  nota: string;
  vehiculos: Vehiculo[];
}

export const tabla = tablaJson as unknown as Tabla;
export const vehiculos: Vehiculo[] = tabla.vehiculos ?? [];

/** Sin acentos, sin signos y sin dobles espacios: «Citroën C4» y «citroen c4» son lo mismo. */
export function normaliza(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Las formas en que alguien puede escribir un coche: su modelo, su generación
 * y los alias que traiga la ficha. «Serie 3», «serie3», «F30» y «320i» llevan
 * todos al mismo sitio.
 */
function formas(v: Vehiculo): string[] {
  const crudas = [v.modelo, v.generacion, ...(v.alias ?? [])];
  const salida: string[] = [];
  for (const c of crudas) {
    if (!c) continue;
    const n = normaliza(c);
    if (!n) continue;
    salida.push(n);
    // «serie 3» debe encontrarse también escrito «serie3».
    const pegado = n.replace(/ /g, '');
    if (pegado !== n) salida.push(pegado);
  }
  return salida;
}

function cubreElAnio(v: Vehiculo, anio: number | undefined): boolean {
  if (anio === undefined) return true;
  if (anio < v.anioDesde) return false;
  return v.anioHasta === null || anio <= v.anioHasta;
}

export interface Busqueda {
  /** Fichas que encajan con lo que ha dicho el cliente. */
  coincidencias: Vehiculo[];
  /** Había fichas de ese coche, pero ninguna cubre el año pedido. */
  fueraDeAnio: Vehiculo[];
}

/**
 * Busca un coche por marca, modelo y año.
 *
 * El modelo se compara en los dos sentidos: quien escribe «320i» encuentra la
 * ficha «320i», y quien escribe «Serie 3 320i» también, porque una contiene a
 * la otra. Es deliberadamente generoso: devolver dos candidatas y preguntar
 * cuál es mejor que no encontrar nada.
 */
export function busca(
  marca: string,
  modelo: string,
  anio?: number,
  /* La lista se puede inyectar para poder probar la búsqueda con coches de
     prueba sin meter ni una medida inventada en la tabla de verdad. */
  tablaDeBusqueda: Vehiculo[] = vehiculos,
): Busqueda {
  const m = normaliza(marca);
  const mo = normaliza(modelo);
  const moPegado = mo.replace(/ /g, '');
  if (!m || !mo) return { coincidencias: [], fueraDeAnio: [] };

  const deLaMarca = tablaDeBusqueda.filter((v) => {
    const vm = normaliza(v.marca);
    return vm === m || vm.includes(m) || m.includes(vm);
  });

  const encajanPorModelo = deLaMarca.filter((v) =>
    formas(v).some((f) => f === mo || f === moPegado || f.includes(mo) || mo.includes(f)),
  );

  return {
    coincidencias: encajanPorModelo.filter((v) => cubreElAnio(v, anio)),
    fueraDeAnio: encajanPorModelo.filter((v) => !cubreElAnio(v, anio)),
  };
}

/** Las marcas que la tabla cubre hoy, para poder decirlo sin inventar. */
export function marcasCubiertas(): string[] {
  return [...new Set(vehiculos.map((v) => v.marca))].sort();
}

export function anios(v: Vehiculo): string {
  return v.anioHasta === null ? `${v.anioDesde}–` : `${v.anioDesde}–${v.anioHasta}`;
}
