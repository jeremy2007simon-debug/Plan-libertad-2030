/**
 * Armonización tonal de las fotografías discordantes de la portada.
 *
 * Qué hace, y qué NO hace
 * -----------------------
 * Ajusta el color de UNAS POCAS fotografías —las que la auditoría marca fuera
 * de rango— para que la portada tenga una sola dirección fotográfica: cálida,
 * natural y cinematográfica, con sombras ligeramente oliva y luces arena.
 *
 * No toca los animales ni el paisaje, no añade ni quita nada, no hace HDR, no
 * suaviza, no recorta y no sobrescribe ningún original. Cada fotografía lleva
 * su propia receta: no hay un filtro global, porque un filtro global es
 * exactamente lo que hace que una web parezca un preset de Instagram.
 *
 * Las recetas son suaves a propósito. Se expresan con tres operaciones:
 *
 *   saturación   `modulate` — contiene el verde y el cian sin apagar la foto.
 *   ganancia     `linear` multiplicador por canal — la temperatura. Más rojo y
 *                menos azul calienta; al revés enfría.
 *   pedestal     `linear` desplazamiento por canal — levanta los negros y les
 *                da el sesgo oliva. Un desplazamiento pesa mucho en las
 *                sombras y casi nada en las luces, que es justo lo que se
 *                busca: negros suaves sin lavar la imagen.
 *
 * Un multiplicador por debajo de 1 con un desplazamiento positivo comprime las
 * altas luces y recupera detalle en los cielos quemados.
 *
 * De dónde sale el píxel
 * ----------------------
 * De la mejor fuente disponible, en este orden: el original del cliente en
 * `originals/`, un original de Commons en la carpeta que se pase con `--raw`,
 * o el derivado publicado. El script dice cuál ha usado en cada caso.
 *
 * Uso
 * ---
 *   node scripts/harmonize-photos.mjs --raw <carpeta-con-originales-commons>
 *   node scripts/harmonize-photos.mjs --dry     # solo dice qué haría
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url);
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const RAW = (() => {
  const i = args.indexOf("--raw");
  return i === -1 ? null : args[i + 1];
})();

/**
 * Las recetas.
 *
 * Solo entran aquí fotografías que la auditoría marca fuera de rango, y cada
 * una dice POR QUÉ. Los atardeceres del cliente no están: son cálidos y
 * saturados porque son atardeceres, y esa es la dirección buscada, no un
 * defecto.
 */
const RECIPES = {
  "tanzania/maasai-boma": {
    motivo:
      "11.579 K: con diferencia la más fría de la portada, azul de sombra abierta " +
      "en mitad de un carrusel cálido.",
    saturation: 0.9,
    gain: [1.02, 1.0, 0.955],
    pedestal: [3, 3, 1],
  },
  "tanzania/tarangire-baobab": {
    motivo:
      "38 % de altas luces: el cielo se va a blanco en una banda a sangre de " +
      "1440 px, y encima lleva texto.",
    saturation: 0.97,
    gain: [0.93, 0.905, 0.865],
    pedestal: [8, 9, 4],
  },
  "tanzania/kilimanjaro-climbers": {
    motivo:
      "13 % de saturación: es la más apagada y fría de la portada. Sus altas " +
      "luces (36 %) NO se tocan: son el glaciar, y comprimirlas grisearía la " +
      "nieve, que es justo lo que el encargo prohíbe.",
    saturation: 1.12,
    gain: [0.99, 0.965, 0.92],
    pedestal: [4, 5, 1],
  },
  "tanzania/serengeti-plains": {
    motivo: "51 % de saturación: verdes y cielo por encima del resto de la portada.",
    saturation: 0.88,
    gain: [1.03, 0.99, 0.94],
    pedestal: [6, 6, 2],
  },
  "maisha-quest/flamingos-tanzania-lake": {
    motivo:
      "9.128 K: el agua del lago se va al cian y es la foto más fría de la " +
      "portada después de la boma. El rosa de los flamencos no se toca.",
    saturation: 1.04,
    gain: [1.03, 1.005, 0.945],
    pedestal: [4, 4, 1],
  },
  "maisha-quest/giraffes-open-savannah": {
    motivo:
      "6.438 K: entra nueva en la portada —sustituye a la monocroma— y llega " +
      "un punto más fría que el resto. Ajuste mínimo: el cielo sigue siendo " +
      "azul y la hierba, hierba.",
    saturation: 0.97,
    gain: [1.02, 1.0, 0.96],
    pedestal: [3, 4, 1],
  },
  "tanzania/ngorongoro-zebras": {
    motivo: "6.719 K con verdes fríos: se aparta del oliva del resto.",
    saturation: 0.94,
    gain: [1.035, 1.0, 0.945],
    pedestal: [5, 6, 2],
  },
};

/**
 * El nombre del archivo original de cada fotografía del cliente.
 *
 * El derivado se llama `giraffes-open-savannah.webp` y el original,
 * `image-X4-3.jpg`. La correspondencia está en el registro, que es donde tiene
 * que estar: aquí solo se lee.
 */
const ORIGINALES = new Map(
  [
    ...readFileSync(new URL("src/data/client-photography.ts", ROOT), "utf8").matchAll(
      /\n {2}"?([a-z0-9-]+)"?: \{([\s\S]*?)\n {2}\},/g,
    ),
  ].map(([, key, body]) => [key, /sourceFilename: "([^"]+)"/.exec(body)?.[1] ?? null]),
);

/** Dónde está el píxel de mejor calidad para cada destino. */
function sourceFor(slug) {
  const [carpeta, nombre] = slug.split("/");
  if (carpeta === "maisha-quest") {
    // Los originales del cliente viven en el repositorio y NO se tocan nunca:
    // esto solo los lee.
    const original = ORIGINALES.get(nombre);
    if (original) {
      const f = fileURLToPath(
        new URL(`public/images/maisha-quest/originals/${original}`, ROOT),
      );
      if (existsSync(f)) return { file: f, origen: `original del cliente (${original})` };
    }
  }
  if (RAW) {
    for (const ext of ["jpg", "jpeg", "png", "webp"]) {
      const f = `${RAW.replace(/\/$/, "")}/${nombre}.${ext}`;
      if (existsSync(f)) return { file: f, origen: "original de Commons" };
    }
  }
  const publicado = fileURLToPath(
    new URL(
      carpeta === "maisha-quest"
        ? `public/images/maisha-quest/optimized/${nombre}.webp`
        : `public/images/${slug}.webp`,
      ROOT,
    ),
  );
  if (existsSync(publicado)) return { file: publicado, origen: "derivado publicado" };
  return null;
}

/** Las mismas medidas que usa la auditoría, para poder comparar antes/después. */
async function measure(input) {
  const { channels } = await sharp(input).stats();
  const [r, g, b] = channels;
  const { data, info } = await sharp(input)
    .resize(160, 160, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let sombras = 0;
  let altas = 0;
  let sat = 0;
  const n = info.width * info.height;
  for (let i = 0; i < data.length; i += info.channels) {
    const [R, G, B] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    const l = (0.2126 * R + 0.7152 * G + 0.0722 * B) / 255;
    if (l < 0.25) sombras += 1;
    if (l > 0.85) altas += 1;
    sat += max === 0 ? 0 : (max - min) / max;
  }
  const kelvinDe = (r_, g_, b_) => {
    const lin = (v) => {
      const s = v / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const [R, G, B] = [lin(r_), lin(g_), lin(b_)];
    const X = 0.4124 * R + 0.3576 * G + 0.1805 * B;
    const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    const Z = 0.0193 * R + 0.1192 * G + 0.9505 * B;
    const s = X + Y + Z;
    if (!s) return 0;
    const x = X / s;
    const y = Y / s;
    const nn = (x - 0.332) / (0.1858 - y);
    return Math.round(437 * nn ** 3 + 3601 * nn ** 2 + 6861 * nn + 5517);
  };

  return {
    kelvin: kelvinDe(r.mean, g.mean, b.mean),
    saturacion: sat / n,
    sombras: sombras / n,
    altas: altas / n,
    luminancia: (0.2126 * r.mean + 0.7152 * g.mean + 0.0722 * b.mean) / 255,
  };
}

const pct = (v) => `${Math.round(v * 100)} %`;
const salida = [];

for (const [slug, receta] of Object.entries(RECIPES)) {
  // Las del cliente se publican en `optimized/`; las de Commons, sueltas.
  const rutaDestino = slug.startsWith("maisha-quest/")
    ? `public/images/maisha-quest/optimized/${slug.split("/")[1]}.webp`
    : `public/images/${slug}.webp`;
  const destino = fileURLToPath(new URL(rutaDestino, ROOT));
  const fuente = sourceFor(slug);
  if (!fuente) {
    console.error(`  FALTA  ${slug}: no hay de dónde sacar el píxel`);
    process.exitCode = 1;
    continue;
  }

  // El derivado conserva EXACTAMENTE su tamaño: cambiarlo movería la
  // maquetación y el `blurDataURL` dejaría de encajar.
  const { width, height } = await sharp(destino).metadata();
  // Se guarda el derivado actual EN MEMORIA antes de tocar nada: es la mitad
  // izquierda de la comparación, y en cuanto se escribe el archivo ya no está.
  const previo = await sharp(destino).toBuffer();
  const antes = await measure(previo);

  const procesada = sharp(fuente.file)
    .resize(width, height, { fit: "cover", withoutEnlargement: false })
    .modulate({ saturation: receta.saturation })
    .linear(receta.gain, receta.pedestal);

  const buffer = await procesada.webp({ quality: 78 }).toBuffer();
  const despues = await measure(buffer);

  salida.push({ slug, fuente: fuente.origen, receta, antes, despues, bytes: buffer.length });

  console.log(
    `${DRY ? "· " : "✓ "}${slug.padEnd(30)} ${fuente.origen.padEnd(22)} ` +
      `${antes.kelvin} → ${despues.kelvin} K · sat ${pct(antes.saturacion)} → ${pct(despues.saturacion)} · ` +
      `altas ${pct(antes.altas)} → ${pct(despues.altas)}`,
  );

  if (!DRY) {
    await sharp(buffer).toFile(destino);

    // Comparación antes/después, para que la decisión se pueda revisar sin
    // tener que fiarse de una tabla de números.
    const dir = new URL("docs/tone/", ROOT);
    mkdirSync(dir, { recursive: true });
    const alto = 340;
    const ancho = Math.round((width / height) * alto);
    const [izquierda, derecha] = await Promise.all([
      sharp(previo).resize(ancho, alto, { fit: "cover" }).toBuffer(),
      sharp(buffer).resize(ancho, alto, { fit: "cover" }).toBuffer(),
    ]);
    await sharp({
      create: { width: ancho * 2 + 8, height: alto, channels: 3, background: "#142019" },
    })
      .composite([
        { input: izquierda, left: 0, top: 0 },
        { input: derecha, left: ancho + 8, top: 0 },
      ])
      .webp({ quality: 72 })
      .toFile(fileURLToPath(new URL(`${slug.split("/")[1]}-antes-despues.webp`, dir)));
  }
}

if (!DRY) {
  // El documento se escribe SOLO: una tabla a mano deja de ser cierta en
  // cuanto alguien cambia una receta.
  const pct2 = (v) => `${Math.round(v * 100)} %`;
  let md = `# Armonización tonal — qué se ha ajustado y por qué

Generado por \`node scripts/harmonize-photos.mjs\`. Complementa
\`docs/homepage-image-tone-audit.md\`, que es quien mide y quien decide qué
fotografía se sale de la dirección fotográfica.

**Ninguna fotografía original se ha modificado.** Los originales del cliente
siguen intactos en \`public/images/maisha-quest/originals/\`; lo que cambia es
el derivado web, que se regenera desde el original cada vez que se ejecuta esto.

Los ajustes son de color y solo de color: temperatura, saturación, negros y
altas luces. No se ha recortado, ni retocado, ni añadido o quitado nada, ni se
ha cambiado el color real de ningún animal. Los atardeceres cálidos del cliente
NO se tocan: son cálidos porque son atardeceres, y esa es la dirección buscada.

Fecha de esta pasada: ${new Date().toISOString().slice(0, 10)}.

La columna «antes» compara con el derivado que estaba publicado en el momento
de ejecutarlo: si se vuelve a lanzar sin cambiar la receta no hay diferencia,
porque el resultado se regenera siempre desde el mismo original. El número que
motivó cada ajuste es el que aparece en la columna «Por qué», medido sobre la
portada antes de tocar nada.

| Fotografía | Por qué | Fuente | Temperatura | Saturación | Altas luces |
| --- | --- | --- | ---: | ---: | ---: |
`;
  for (const e of salida) {
    md += `| \`${e.slug}\` | ${e.receta.motivo} | ${e.fuente} | ${e.antes.kelvin} → ${e.despues.kelvin} K | ${pct2(e.antes.saturacion)} → ${pct2(e.despues.saturacion)} | ${pct2(e.antes.altas)} → ${pct2(e.despues.altas)} |\n`;
  }

  md += `
## Recetas exactas

| Fotografía | Saturación | Ganancia R/G/B | Pedestal R/G/B |
| --- | ---: | --- | --- |
`;
  for (const e of salida) {
    md += `| \`${e.slug}\` | ${e.receta.saturation} | ${e.receta.gain.join(" / ")} | ${e.receta.pedestal.join(" / ")} |\n`;
  }

  md += `
La ganancia multiplica cada canal —más rojo y menos azul calienta— y el
pedestal lo desplaza, que pesa en las sombras y casi nada en las luces: negros
levantados con un sesgo oliva. Una ganancia por debajo de 1 con pedestal
positivo comprime las altas luces y recupera detalle en un cielo quemado.

## Comparación antes / después

`;
  for (const e of salida) {
    const nombre = e.slug.split("/")[1];
    md += `### \`${nombre}\`\n\n![Antes y después de ${nombre}](tone/${nombre}-antes-despues.webp)\n\n`;
  }

  writeFileSync(new URL("docs/homepage-image-harmonisation.md", ROOT), md);
  console.log("\nComparaciones en docs/tone/ y resumen en docs/homepage-image-harmonisation.md.");
}
