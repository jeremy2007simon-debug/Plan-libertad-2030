/**
 * Hace que las pruebas resuelvan './x.js' al './x.ts' que hay al lado.
 *
 * En producción los imports tienen que llevar .js: es lo que espera el
 * compilador de Vercel, que transpila cada .ts a un .js hermano. En las
 * pruebas no hay transpilación previa —Node quita los tipos al vuelo— así que
 * ese .js no existe todavía.
 *
 * El intento anterior fue poner .ts en los imports. Funcionaba en local y
 * rompía el despliegue: la función arrancaba y moría con ERR_MODULE_NOT_FOUND
 * buscando un .ts que Vercel nunca sube. Se arregla donde tiene que
 * arreglarse, en las pruebas, y no en el código que va a producción.
 */
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export async function resolve(especificador, contexto, siguiente) {
  if (/^\.{1,2}\//.test(especificador) && especificador.endsWith('.js')) {
    const comoTs = especificador.replace(/\.js$/, '.ts');
    const destino = new URL(comoTs, contexto.parentURL);
    if (fs.existsSync(fileURLToPath(destino))) {
      return siguiente(comoTs, contexto);
    }
  }
  return siguiente(especificador, contexto);
}
