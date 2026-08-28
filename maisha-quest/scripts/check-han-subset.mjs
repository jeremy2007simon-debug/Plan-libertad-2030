/**
 * Comprueba que el subconjunto de tipografía china cubre todo el texto chino.
 *
 * Las fuentes de `/public/fonts` están recortadas a los caracteres que la web
 * usa hoy (ver `scripts/subset-han-fonts.py`). Si alguien añade una frase en
 * chino con un carácter que no estaba, el navegador lo compone con la fuente
 * del sistema: no falla nada, pero se ve un carácter distinto en mitad de una
 * línea y nadie se entera hasta que lo ve un lector chino.
 *
 * Así que falla el build. Se corrige volviendo a generar el subconjunto.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const covered = new Set(
  readFileSync(join(ROOT, "public/fonts/CARACTERES.txt"), "utf8"),
);

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const missing = new Map();
for (const file of walk(join(ROOT, "src"))) {
  if (![".ts", ".tsx"].includes(extname(file))) continue;
  for (const ch of readFileSync(file, "utf8")) {
    if (ch.codePointAt(0) <= 0x2000 || covered.has(ch)) continue;
    if (!missing.has(ch)) missing.set(ch, file.slice(ROOT.length + 1));
  }
}

if (missing.size > 0) {
  console.error(
    `\nFaltan ${missing.size} caracteres en el subconjunto de tipografía china:\n`,
  );
  for (const [ch, file] of missing) {
    console.error(`  ${ch}  U+${ch.codePointAt(0).toString(16).toUpperCase()}  (${file})`);
  }
  console.error(
    "\nVuelve a generarlo:  python3 scripts/subset-han-fonts.py <carpeta-con-los-ttf>\n" +
      "Las fuentes de origen están en scripts/subset-han-fonts.py.\n",
  );
  process.exit(1);
}

console.log(`Subconjunto chino: ${covered.size} caracteres, ninguno sin cubrir.`);
