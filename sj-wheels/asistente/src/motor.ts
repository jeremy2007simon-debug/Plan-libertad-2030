/**
 * Carga el motor de compatibilidad del tema y lo expone a Node.
 *
 * No hay una segunda implementación de las reglas. Este módulo ejecuta el
 * MISMO archivo que corre en el navegador del cliente —
 * theme/assets/sjw-fitment.js — de la misma forma que lo hacen sus 66
 * pruebas: creando un `window` de mentira y evaluándolo. Así el asistente y
 * la ficha de producto no pueden discrepar, y las pruebas que ya existen
 * cubren los dos.
 *
 * La regla que hace que esto importe está escrita en ese archivo: las
 * comprobaciones numéricas solo pueden RECHAZAR o DEJAR EN PENDIENTE. Para
 * llegar a «compatible» hacen falta dos cosas que hoy no existen en la
 * tienda: que el producto referencie explícitamente ese vehículo y que la
 * ficha del vehículo esté verificada. El asistente hereda esa garantía en
 * lugar de prometer nada por su cuenta.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

export type Estado = 'ok' | 'pending' | 'no' | 'unknown';

export interface Llanta {
  boltPattern: string | null;
  diameter: number | null;
  width: number | null;
  et: number | null;
  centerBore: number | null;
  requiresManualVerification: boolean;
  vehicleIds: string[];
}

export interface Vehiculo {
  id: string;
  boltPattern: string | null;
  centerBore: number | null;
  allowedDiameters: number[];
  etMin: number | null;
  etMax: number | null;
  verification: 'verified' | 'pending';
}

export interface Veredicto {
  status: Estado;
  reasons: string[];
  missing: string[];
  needsSpacers: boolean;
}

interface MotorSJW {
  STATUS: Record<string, Estado>;
  evaluate(llanta: Llanta, vehiculo: Vehiculo | null): Veredicto;
  normalizeBoltPattern(valor: unknown): string | null;
  toNumber(valor: unknown): number | null;
}

function cargar(): MotorSJW {
  const aqui = path.dirname(fileURLToPath(import.meta.url));
  // En Vercel el archivo viaja junto a la función; en desarrollo está en el tema.
  const candidatos = [
    path.join(aqui, '..', 'datos', 'sjw-fitment.js'),
    path.join(aqui, '..', '..', 'theme', 'assets', 'sjw-fitment.js'),
  ];
  const origen = candidatos.find((p) => fs.existsSync(p));
  if (!origen) {
    throw new Error(
      'No encuentro sjw-fitment.js. Copia theme/assets/sjw-fitment.js a asistente/datos/ ' +
        'antes de desplegar: el asistente no puede decidir compatibilidad sin el motor.',
    );
  }
  const contexto: { window: { SJWFitment?: MotorSJW } } = { window: {} };
  vm.createContext(contexto);
  vm.runInContext(fs.readFileSync(origen, 'utf8'), contexto, { filename: origen });
  const motor = contexto.window.SJWFitment;
  if (!motor) throw new Error('sjw-fitment.js no expuso window.SJWFitment');
  return motor;
}

export const motor: MotorSJW = cargar();

/** Convierte lo que cuenta el cliente en la ficha de vehículo que espera el motor. */
export function vehiculoDelCliente(datos: {
  anclaje?: string | null;
  buje?: number | null;
  diametros?: number[] | null;
  etMin?: number | null;
  etMax?: number | null;
}): Vehiculo {
  return {
    // Un vehículo que describe el cliente NUNCA lleva un id del catálogo, así que
    // jamás coincidirá con vehicleIds y el motor no podrá devolver «compatible».
    // Es deliberado: lo que cuenta el cliente no es una verificación.
    id: 'cliente:sin-verificar',
    boltPattern: datos.anclaje ?? null,
    centerBore: datos.buje ?? null,
    allowedDiameters: datos.diametros ?? [],
    etMin: datos.etMin ?? null,
    etMax: datos.etMax ?? null,
    verification: 'pending',
  };
}
