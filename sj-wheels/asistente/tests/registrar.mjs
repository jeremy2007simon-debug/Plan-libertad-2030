/* Engancha el resolutor de arriba antes de cargar las pruebas. */
import { register } from 'node:module';
register('./resolver-ts.mjs', import.meta.url);
