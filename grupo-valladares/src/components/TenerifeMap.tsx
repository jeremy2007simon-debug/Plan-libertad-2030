import { STORES } from "@/lib/constants";

// Silueta estilizada de Tenerife (no cartografía exacta) — suficiente para
// que el usuario reconozca la isla y ubique cada tienda de un vistazo.
const ISLAND_POINTS: [number, number][] = [
  [40, 150],
  [40, 150],
  [95, 90],
  [190, 55],
  [300, 48],
  [410, 62],
  [500, 90],
  [560, 115],
  [615, 145],
  [615, 145],
  [560, 200],
  [510, 255],
  [440, 300],
  [340, 338],
  [230, 315],
  [130, 270],
  [75, 210],
];

function smoothClosedPath(points: [number, number][]): string {
  const n = points.length;
  let d = `M ${points[0][0]} ${points[0][1]} `;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]} `;
  }
  return `${d}Z`;
}

const ISLAND_PATH = smoothClosedPath(ISLAND_POINTS);

// Posición aproximada de cada tienda dentro del viewBox de la isla.
const PIN_COORDS: Record<string, [number, number]> = {
  "santa-cruz": [552, 138],
  "los-majuelos": [508, 178],
  "las-chafiras": [300, 300],
  adeje: [168, 258],
  "la-orotava": [300, 74],
  "icod-de-los-vinos": [150, 94],
};

export function TenerifeMap() {
  return (
    <div className="bg-grid relative aspect-video w-full overflow-hidden rounded-2xl border border-surface-border bg-bg-elevated-2 lg:sticky lg:top-28">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue/20 blur-[110px]" />
      <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue/10 blur-[100px]" />

      <svg
        viewBox="0 0 660 380"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="islandFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <path
          d={ISLAND_PATH}
          fill="url(#islandFill)"
          stroke="var(--blue-dim)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />

        {STORES.map((store, i) => {
          const coord = PIN_COORDS[store.slug];
          if (!coord) return null;
          const [x, y] = coord;
          const labelAbove = y > 90;
          return (
            <g key={store.slug}>
              <circle cx={x} cy={y} r="9" fill="var(--blue)" fillOpacity="0.22">
                <animate attributeName="r" values="7;12;7" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                <animate attributeName="fill-opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <circle cx={x} cy={y} r="4" fill="var(--blue-dim)" stroke="var(--bg-elevated-2)" strokeWidth="1.5" />
              <text
                x={x}
                y={labelAbove ? y - 14 : y + 22}
                textAnchor="middle"
                className="fill-ink-dim font-mono uppercase"
                style={{ fontSize: "11px", letterSpacing: "0.05em" }}
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
