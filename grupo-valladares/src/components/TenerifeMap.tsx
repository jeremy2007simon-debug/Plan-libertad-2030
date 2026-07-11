import { STORES } from "@/lib/constants";

// Silueta esquemática de Tenerife (trazado poligonal, no cartografía
// exacta) — conserva los rasgos que hacen reconocible a la isla: la
// península de Anaga afilada al noreste, Teno más roma al noroeste, y una
// costa sur amplia y curva sin un pico pronunciado.
const ISLAND_POINTS: [number, number][] = [
  [55, 145], // Teno (punta noroeste, roma)
  [95, 200], // flanco sur de Teno
  [150, 255], // costa suroeste
  [230, 295], // costa sur (Adeje / Los Cristianos)
  [330, 315], // costa sur, punto más amplio (San Miguel / Las Chafiras)
  [430, 300], // costa sureste (Güímar)
  [490, 260], // costa este (Candelaria)
  [510, 200], // costa este, aproximándose a Anaga
  [520, 150], // base sur de Anaga (istmo)
  [640, 95], // Anaga (punta noreste, afilada)
  [500, 105], // base norte de Anaga (istmo, cierra la península)
  [430, 80], // costa norte (Santa Cruz / La Laguna)
  [330, 55], // costa norte-centro (La Orotava / Puerto de la Cruz)
  [220, 60], // costa norte (Los Realejos)
  [130, 85], // costa noroeste (Garachico / Buenavista)
];

const ISLAND_PATH = `M ${ISLAND_POINTS.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;

// Posición aproximada de cada tienda dentro del viewBox de la isla.
const PIN_COORDS: Record<string, [number, number]> = {
  "santa-cruz": [505, 135],
  "los-majuelos": [468, 168],
  "las-chafiras": [310, 290],
  adeje: [190, 270],
  "la-orotava": [330, 82],
  "icod-de-los-vinos": [175, 100],
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
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinejoin="round"
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
