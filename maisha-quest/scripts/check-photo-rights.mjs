/**
 * Impide publicar en producción fotografía cuyos derechos no estén confirmados.
 *
 * Por qué existe
 * --------------
 * Las 22 fotografías que entregó el cliente están integradas, y desde el
 * 29/08/2026 hay confirmación escrita de uso comercial para las entregadas
 * (la declaración literal está copiada en cada entrada de
 * `src/data/client-photography.ts`, en `commercialUseSource`).
 *
 * El guardián se queda: una foto nueva entra por defecto sin confirmar, y un
 * comentario no impide nada —bastaría con que alguien apuntase el dominio a
 * este despliegue—. Sigue bloqueando además la que exige crédito y no lo tiene.
 *
 * Con `MAISHA_QUEST_PRODUCTION=1`, este script recorre el registro y falla si
 * encuentra una sola fotografía publicada con `commercialUseConfirmed: false`,
 * o con `creditRequired: true` y sin `creditText`. Sin esa variable no falla
 * nunca: la preview sigue funcionando igual y solo avisa.
 *
 * Se corrige poniendo `commercialUseConfirmed: true` en las fotografías cuyos
 * derechos haya confirmado el cliente POR ESCRITO — nunca por defecto y nunca
 * en bloque.
 *
 * Uso
 * ---
 *   node scripts/check-photo-rights.mjs                    # informa
 *   MAISHA_QUEST_PRODUCTION=1 node scripts/check-photo-rights.mjs   # bloquea
 */

import { readFileSync } from "node:fs";

const ROOT = new URL("..", import.meta.url);
const strict = process.env.MAISHA_QUEST_PRODUCTION === "1";

const source = readFileSync(new URL("src/data/client-photography.ts", ROOT), "utf8");

/** Cada entrada publicada del registro, con su bloque de procedencia. */
const entries = [...source.matchAll(/\n {2}"?([a-z0-9-]+)"?: \{([\s\S]*?)\n {2}\},/g)]
  .map(([, key, body]) => ({
    key,
    published: /src: "/.test(body),
    commercialUseConfirmed: /commercialUseConfirmed: true/.test(body),
    creditRequired: /creditRequired: true/.test(body),
    creditText: /creditText: "([^"]*)"/.exec(body)?.[1] ?? null,
  }))
  .filter((entry) => entry.published);

const unconfirmed = entries.filter((e) => !e.commercialUseConfirmed);
const missingCredit = entries.filter((e) => e.creditRequired && !e.creditText);

console.log(`Fotografía del cliente publicada: ${entries.length} imágenes.`);

if (unconfirmed.length === 0 && missingCredit.length === 0) {
  console.log("Derechos comerciales confirmados en todas.");
  process.exit(0);
}

const lines = [];
if (unconfirmed.length) {
  lines.push(
    `${unconfirmed.length} fotografías publicadas SIN confirmación escrita de uso comercial:`,
    ...unconfirmed.map((e) => `  - ${e.key}`),
  );
}
if (missingCredit.length) {
  lines.push(
    `${missingCredit.length} fotografías exigen crédito y no tienen texto de crédito:`,
    ...missingCredit.map((e) => `  - ${e.key}`),
  );
}

if (!strict) {
  console.log("\n" + lines.join("\n"));
  console.log(
    "\nLa preview puede seguir: es la única forma de que el cliente las revise.\n" +
      "Para producción, exportar MAISHA_QUEST_PRODUCTION=1 hace que esto falle.",
  );
  process.exit(0);
}

console.error("\nBLOQUEO DE PRODUCCIÓN\n");
console.error(lines.join("\n"));
console.error(
  "\nSe corrige poniendo `commercialUseConfirmed: true` en las fotografías cuyos\n" +
    "derechos haya confirmado el cliente por escrito. Nunca en bloque.\n",
);
process.exit(1);
