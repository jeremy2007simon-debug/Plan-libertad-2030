import { STORES } from "@/lib/constants";

// Silueta de Tenerife trazada a partir del contorno real de la isla
// (costa recortada, no suavizada) — orientación estándar de mapa: Anaga
// afilada al noreste (arriba-derecha), Teno al noroeste (izquierda), costa
// sur amplia y jugosa en la parte inferior.
const ISLAND_POINTS: [number, number][] = [
  // Anaga: punta noreste
  [695, 148],
  // Anaga: flanco sur, bajando hacia el istmo (jagged)
  [660, 176], [634, 164], [614, 196], [588, 188], [572, 216],
  [548, 206], [528, 236], [512, 224],
  // istmo de Santa Cruz
  [500, 258], [508, 288], [486, 308], [496, 334],
  // costa este, bajando (Candelaria)
  [476, 364], [492, 390], [470, 414], [482, 444],
  [456, 464], [468, 494], [442, 514], [452, 544],
  // costa sureste, aproximándose al sur
  [422, 570], [432, 600], [400, 614], [412, 644],
  // costa sur, el vientre ancho de la isla (San Miguel / Las Chafiras / Los Cristianos)
  [372, 634], [356, 660], [320, 644], [300, 660],
  [270, 634], [250, 650], [220, 620], [200, 630],
  // costa suroeste (Adeje / Guía de Isora)
  [180, 600], [160, 570], [170, 540], [146, 520],
  [156, 490], [130, 470], [140, 440], [116, 420],
  [122, 390], [96, 375], [106, 350],
  // Teno: punta noroeste
  [75, 335],
  // costa norte, subiendo desde Teno (Garachico / Icod / La Orotava / La Laguna) — larga y jugosa
  [100, 306], [90, 280], [116, 266], [106, 236],
  [130, 226], [126, 196], [156, 190], [150, 166],
  [180, 166], [186, 146], [216, 150], [226, 130],
  [256, 140], [270, 120], [300, 135], [320, 115],
  [350, 130], [376, 115], [406, 130], [430, 115],
  [460, 130], [486, 118], [516, 135], [540, 122],
  [566, 140], [590, 128], [616, 145], [640, 135],
  [666, 150],
];

const ISLAND_PATH = `M ${ISLAND_POINTS.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;

// Posición aproximada de cada tienda dentro del viewBox de la isla.
const PIN_COORDS: Record<string, [number, number]> = {
  "santa-cruz": [515, 285],
  "los-majuelos": [488, 335],
  "las-chafiras": [335, 630],
  adeje: [195, 555],
  "la-orotava": [335, 145],
  "icod-de-los-vinos": [175, 205],
};

export function TenerifeMap() {
  return (
    <div className="bg-grid relative aspect-video w-full overflow-hidden rounded-2xl border border-surface-border bg-bg-elevated-2 lg:sticky lg:top-28">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue/20 blur-[110px]" />
      <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue/10 blur-[100px]" />

      <svg
        viewBox="40 90 700 610"
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
          strokeOpacity="0.7"
          strokeWidth="3"
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
              <circle cx={x} cy={y} r="5.5" fill="var(--blue-dim)" stroke="var(--bg-elevated-2)" strokeWidth="2" />
              <text
                x={x}
                y={labelAbove ? y - 18 : y + 28}
                textAnchor="middle"
                className="fill-ink-dim font-mono uppercase"
                style={{ fontSize: "15px", letterSpacing: "0.05em" }}
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
