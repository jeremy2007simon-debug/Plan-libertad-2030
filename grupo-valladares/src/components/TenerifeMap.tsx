import { STORES } from "@/lib/constants";

// Silueta de Tenerife trazada punto a punto sobre la referencia real de la
// isla (contorno recortado, mismo encuadre casi cuadrado que el original):
// Anaga afilada arriba a la derecha, istmo estrecho hacia Santa Cruz, costa
// este con el saliente de Candelaria, vientre sur ancho y recortado, punta
// de Teno a la izquierda y costa norte larga y sinuosa de vuelta a Anaga.
const ISLAND_POINTS: [number, number][] = [
  [686, 140], [655, 172], [624, 156], [601, 187], [569, 172], [546, 203],
  [515, 187], [491, 218], [468, 211],
  [507, 289], [515, 320], [491, 343], [499, 367],
  [476, 390], [491, 421], [468, 445], [484, 476], [460, 499], [476, 523],
  [452, 546], [468, 577],
  [445, 601], [460, 632], [429, 647], [445, 679],
  [406, 671], [390, 694], [359, 679], [343, 694], [320, 679], [296, 686],
  [273, 663], [250, 679], [226, 663], [211, 671],
  [195, 647], [172, 624], [179, 601], [156, 577], [164, 554], [140, 530],
  [148, 507], [125, 484], [133, 460], [109, 437], [117, 413],
  [78, 343],
  [101, 312], [94, 289], [117, 281], [109, 250], [133, 242], [125, 211],
  [148, 203], [148, 179],
  [179, 179], [187, 156], [218, 164], [226, 133], [257, 148], [265, 117],
  [296, 133], [304, 109], [335, 125], [343, 101], [374, 117], [382, 94],
  [413, 109], [421, 86], [452, 101], [460, 78], [491, 94], [499, 70],
  [530, 86], [538, 78], [562, 94], [569, 86], [593, 101], [601, 94],
  [624, 109], [632, 101], [655, 117], [663, 125],
];

const ISLAND_PATH = `M ${ISLAND_POINTS.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;

// Posición aproximada de cada tienda dentro del viewBox de la isla.
const PIN_COORDS: Record<string, [number, number]> = {
  "santa-cruz": [498, 300],
  "los-majuelos": [472, 355],
  "las-chafiras": [318, 672],
  adeje: [192, 600],
  "la-orotava": [335, 122],
  "icod-de-los-vinos": [172, 195],
};

export function TenerifeMap() {
  return (
    <div className="bg-grid relative aspect-square w-full overflow-hidden rounded-2xl border border-surface-border bg-bg-elevated-2 lg:sticky lg:top-28">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue/20 blur-[110px]" />
      <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue/10 blur-[100px]" />

      <svg
        viewBox="55 55 655 665"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="islandFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <path
          d={ISLAND_PATH}
          fill="url(#islandFill)"
          stroke="var(--blue-dim)"
          strokeOpacity="0.75"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {STORES.map((store, i) => {
          const coord = PIN_COORDS[store.slug];
          if (!coord) return null;
          const [x, y] = coord;
          const labelAbove = y > 200;
          return (
            <g key={store.slug}>
              <circle cx={x} cy={y} r="12" fill="var(--blue)" fillOpacity="0.22">
                <animate attributeName="r" values="9;16;9" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                <animate attributeName="fill-opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <circle cx={x} cy={y} r="6" fill="var(--blue-dim)" stroke="var(--bg-elevated-2)" strokeWidth="2.5" />
              <text
                x={x}
                y={labelAbove ? y - 18 : y + 28}
                textAnchor="middle"
                className="fill-ink-dim font-mono uppercase"
                style={{ fontSize: "16px", letterSpacing: "0.05em" }}
              >
                {String(i + 1).padStart(2, "0")} · {store.name.split(" (")[0]}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-hair bg-bg/60 px-5 py-3 backdrop-blur-md">
        <span className="font-mono text-[.68rem] tracking-[0.1em] text-ink-dim-2 uppercase">
          Tenerife — vista esquemática
        </span>
        <span className="font-mono text-[.68rem] text-ink-dim-2">
          {STORES.length} tiendas
        </span>
      </div>
    </div>
  );
}
