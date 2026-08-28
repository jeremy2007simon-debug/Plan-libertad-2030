/**
 * Inventario de las 22 fotografías entregadas por el cliente.
 *
 * Genera la tabla del README leyendo los datos, no a mano. Una tabla escrita a
 * mano deja de ser cierta en cuanto alguien mueve una foto, y esta es
 * exactamente la que decide qué puede salir a producción.
 *
 * Contrasta tres fuentes y se queja si no cuadran:
 *
 *  1. Los archivos que hay de verdad en `originals/`.
 *  2. Las entradas publicadas de `CLIENT_PHOTOS`.
 *  3. Las entradas excluidas de `EXCLUDED_CLIENT_PHOTOS`.
 *
 * Uso
 * ---
 *   node scripts/report-client-photos.mjs            # comprueba y resume
 *   node scripts/report-client-photos.mjs --markdown # imprime la tabla
 */

import { readFileSync, readdirSync } from "node:fs";

const ROOT = new URL("..", import.meta.url);
const SRC = readFileSync(new URL("src/data/client-photography.ts", ROOT), "utf8");
const ORIGINALS = readdirSync(new URL("public/images/maisha-quest/originals/", ROOT)).sort();

/** Bloques publicados: llevan `src`. */
const published = [...SRC.matchAll(/\n {2}"?([a-z0-9-]+)"?: \{([\s\S]*?)\n {2}\},/g)]
  .map(([, key, body]) => ({ key, body }))
  .filter((e) => /src: "/.test(e.body))
  .map((e) => ({
    key: e.key,
    sourceFilename: /sourceFilename: "([^"]+)"/.exec(e.body)?.[1] ?? "?",
    status: /publicationStatus: "([^"]+)"/.exec(e.body)?.[1] ?? "?",
    commercial: /commercialUseConfirmed: true/.test(e.body),
    author: /authorConfirmed: true/.test(e.body),
    width: /width: (\d+)/.exec(e.body)?.[1] ?? "?",
    height: /height: (\d+)/.exec(e.body)?.[1] ?? "?",
  }));

/** Bloque de excluidas. */
const excludedBlock = /EXCLUDED_CLIENT_PHOTOS[\s\S]*?\n\];/.exec(SRC)?.[0] ?? "";
const excluded = [...excludedBlock.matchAll(/\{([\s\S]*?)\n {2}\},/g)].map(([, body]) => ({
  key: "—",
  sourceFilename: /sourceFilename: "([^"]+)"/.exec(body)?.[1] ?? "?",
  status: /publicationStatus: "([^"]+)"/.exec(body)?.[1] ?? "?",
  commercial: /commercialUseConfirmed: true/.test(body),
  author: /authorConfirmed: true/.test(body),
  note: (/note:\s*([\s\S]*?),\n/.exec(body)?.[1] ?? "")
    .replace(/"\s*\+\s*\n\s*"/g, "")
    .replace(/^"|"$/g, "")
    .trim(),
}));

/** Dónde se usa cada foto publicada, buscando su clave en el código. */
const CODE = [
  "src/data/structure",
  "src/components",
  "src/app",
]
  .flatMap((dir) => walk(new URL(dir + "/", ROOT)))
  .map((f) => readFileSync(f, "utf8"))
  .join("\n");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? walk(new URL(e.name + "/", dir))
      : /\.tsx?$/.test(e.name)
        ? [new URL(e.name, dir)]
        : [],
  );
}

const usageCount = (key) =>
  (CODE.match(new RegExp(`CLIENT_PHOTOS\\["${key}"\\]`, "g")) ?? []).length;

/* ---- Comprobaciones -------------------------------------------------------- */

const problems = [];
const declared = [...published, ...excluded].map((e) => e.sourceFilename);

for (const file of ORIGINALS) {
  if (!declared.includes(file)) problems.push(`${file}: está en originals/ y no se declara`);
}
for (const name of declared) {
  if (!ORIGINALS.includes(name)) problems.push(`${name}: se declara y no está en originals/`);
}
const duplicates = declared.filter((n, i) => declared.indexOf(n) !== i);
for (const d of new Set(duplicates)) problems.push(`${d}: declarado dos veces`);
for (const entry of published) {
  if (usageCount(entry.key) === 0)
    problems.push(`${entry.key}: publicada y sin usar en ninguna página`);
}

const REASON = {
  published: "—",
  "excluded-duplicate": "Duplicado exacto de otro archivo entregado",
  "excluded-watermark": "Marca de agua de un tercero impresa en la imagen",
  "excluded-resolution": "Resolución por debajo del mínimo del diseño",
  "excluded-rights": "Derechos que impiden publicarla",
};

if (process.argv.includes("--markdown")) {
  console.log("| # | Archivo original | Nombre web | Estado | Uso | Derechos comerciales | Motivo de exclusión |");
  console.log("| --- | --- | --- | --- | --- | --- | --- |");
  let n = 0;
  for (const e of published) {
    n += 1;
    const uses = usageCount(e.key);
    console.log(
      `| ${n} | \`${e.sourceFilename}\` | \`${e.key}\` | Publicada | ${uses} ${uses === 1 ? "sitio" : "sitios"} · ${e.width}×${e.height} | ${e.commercial ? "Confirmados" : "**Sin confirmar**"} | — |`,
    );
  }
  for (const e of excluded) {
    n += 1;
    console.log(
      `| ${n} | \`${e.sourceFilename}\` | — | No publicada | Original conservado | ${e.commercial ? "Confirmados" : "**Sin confirmar**"} | ${REASON[e.status] ?? e.status} |`,
    );
  }
  process.exit(problems.length ? 1 : 0);
}

console.log(`Originales entregados:  ${ORIGINALS.length}`);
console.log(`Publicadas:             ${published.length}`);
console.log(`Excluidas:              ${excluded.length}`);
for (const e of excluded) console.log(`  · ${e.sourceFilename} — ${REASON[e.status] ?? e.status}`);
console.log(
  `Derechos comerciales confirmados: ${published.filter((e) => e.commercial).length} de ${published.length}`,
);
console.log(
  `Autoría confirmada:               ${published.filter((e) => e.author).length} de ${published.length}`,
);

if (problems.length) {
  console.error(`\n${problems.length} incoherencias:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log("\nInventario coherente: los archivos, las publicadas y las excluidas cuadran.");
