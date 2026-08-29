/**
 * Genera el patrón de piel de jirafa de la introducción.
 *
 * Por qué un generador y no un SVG dibujado a mano
 * ------------------------------------------------
 * La piel de una jirafa es un teselado: celdas grandes e irregulares separadas
 * por canales claros. Eso es exactamente un diagrama de Voronoi con las celdas
 * encogidas hacia su centro. Dibujarlo a mano da formas que se notan
 * repetidas; calcularlo da formas irregulares de verdad.
 *
 * El resultado se pega TAL CUAL en `GiraffePattern.tsx` como una constante.
 * No se calcula en el navegador: ni un byte de JavaScript para esto.
 *
 * Cómo se construye cada celda
 * ----------------------------
 *  1. Semillas en una rejilla con ruido: una rejilla pura daría hexágonos de
 *     panal, que no es piel de jirafa; el ruido rompe la regularidad.
 *  2. Celda de Voronoi por recorte de semiplanos: se parte del rectángulo
 *     completo y se corta por la mediatriz de cada par de semillas.
 *  3. Encogido hacia el centroide: abre el canal claro entre manchas.
 *  4. Esquinas redondeadas con curvas cuadráticas: la piel real no tiene
 *     vértices, y un polígono en punta se lee como cristal roto.
 *
 * Uso
 * ---
 *   node scripts/gen-giraffe-pattern.mjs > /tmp/paths.txt
 */

const W = 1000;
const H = 1000;
const COLS = 6;
const ROWS = 6;
/** Cuánto se encoge cada mancha: el canal claro entre manchas. */
const SHRINK = 0.86;
/** Radio del redondeo, en proporción a la arista. */
const ROUND = 0.28;

/** Ruido determinista: el patrón tiene que salir igual en cada ejecución. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const random = rng(20260829);

/** Semillas: rejilla con desplazamiento aleatorio de hasta media celda. */
const sites = [];
for (let y = 0; y < ROWS; y += 1) {
  for (let x = 0; x < COLS; x += 1) {
    const cw = W / COLS;
    const ch = H / ROWS;
    sites.push([
      (x + 0.5) * cw + (random() - 0.5) * cw * 0.85,
      (y + 0.5) * ch + (random() - 0.5) * ch * 0.85,
    ]);
  }
}

/** Recorta un polígono por un semiplano (Sutherland–Hodgman). */
function clip(poly, a, b, c) {
  // Se conserva lo que cumple a·x + b·y <= c.
  const out = [];
  for (let i = 0; i < poly.length; i += 1) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    const dp = a * p[0] + b * p[1] - c;
    const dq = a * q[0] + b * q[1] - c;
    if (dp <= 0) out.push(p);
    if ((dp < 0 && dq > 0) || (dp > 0 && dq < 0)) {
      const t = dp / (dp - dq);
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  }
  return out;
}

/** Celda de Voronoi de una semilla, recortada al lienzo. */
function cell(index) {
  let poly = [
    [0, 0],
    [W, 0],
    [W, H],
    [0, H],
  ];
  const [sx, sy] = sites[index];
  for (let j = 0; j < sites.length && poly.length; j += 1) {
    if (j === index) continue;
    const [tx, ty] = sites[j];
    // Mediatriz entre las dos semillas.
    const a = 2 * (tx - sx);
    const b = 2 * (ty - sy);
    const c = tx * tx + ty * ty - sx * sx - sy * sy;
    poly = clip(poly, a, b, c);
  }
  return poly;
}

const centroid = (poly) => {
  const n = poly.length;
  return [
    poly.reduce((s, p) => s + p[0], 0) / n,
    poly.reduce((s, p) => s + p[1], 0) / n,
  ];
};

/** Encoge hacia el centro y redondea las esquinas. */
function toPath(poly) {
  const [cx, cy] = centroid(poly);
  const p = poly.map(([x, y]) => [
    cx + (x - cx) * SHRINK,
    cy + (y - cy) * SHRINK,
  ]);
  const n = p.length;
  const at = (i) => p[(i + n) % n];
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

  let d = "";
  for (let i = 0; i < n; i += 1) {
    const prev = at(i - 1);
    const cur = at(i);
    const next = at(i + 1);
    const entrada = lerp(cur, prev, ROUND);
    const salida = lerp(cur, next, ROUND);
    const f = (v) => v.toFixed(1);
    if (i === 0) d += `M${f(entrada[0])} ${f(entrada[1])}`;
    else d += `L${f(entrada[0])} ${f(entrada[1])}`;
    d += `Q${f(cur[0])} ${f(cur[1])} ${f(salida[0])} ${f(salida[1])}`;
  }
  return `${d}Z`;
}

const paths = sites
  .map((_, i) => cell(i))
  .filter((poly) => poly.length >= 3)
  .map(toPath);

console.log(`${paths.length} manchas\n`);
console.log(paths.map((d) => `  "${d}",`).join("\n"));
