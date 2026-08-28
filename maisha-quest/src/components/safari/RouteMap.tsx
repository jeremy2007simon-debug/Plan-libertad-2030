import { CompassMark } from "@/components/ui/Compass";
import { MAP_VIEWBOX, TANZANIA_PATHS } from "@/lib/map";
import type { Dictionary } from "@/i18n/messages/en";
import type { Destination } from "@/types/content";

/**
 * Encuadre ajustado a la ruta.
 *
 * Casi todos los viajes del circuito norte caben en una esquina del país: con
 * el encuadre completo, las cuatro paradas se amontonan en un rincón y el 80 %
 * del dibujo queda vacío. Aquí el viewBox se calcula desde las paradas, con
 * margen suficiente para que siga reconociéndose la silueta de Tanzania, y con
 * un tamaño mínimo para que una ruta de dos paradas cercanas no acabe con un
 * zoom absurdo.
 */
function frameFor(stops: Destination[]) {
  const xs = stops.map((s) => s.mapPosition.x);
  const ys = stops.map((s) => s.mapPosition.y);
  const padX = MAP_VIEWBOX.width * 0.2;
  const padY = MAP_VIEWBOX.height * 0.14;

  let minX = Math.min(...xs) - padX;
  let minY = Math.min(...ys) - padY;
  let width = Math.max(...xs) - Math.min(...xs) + padX * 2;
  let height = Math.max(...ys) - Math.min(...ys) + padY * 2;

  // Nunca por debajo de un tercio del país: mantiene el contexto geográfico.
  const minWidth = MAP_VIEWBOX.width * 0.42;
  const minHeight = MAP_VIEWBOX.height * 0.42;
  if (width < minWidth) {
    minX -= (minWidth - width) / 2;
    width = minWidth;
  }
  if (height < minHeight) {
    minY -= (minHeight - height) / 2;
    height = minHeight;
  }

  // Cuadra la proporción para que el dibujo no salga deformado.
  const ratio = MAP_VIEWBOX.width / MAP_VIEWBOX.height;
  if (width / height > ratio) {
    const target = width / ratio;
    minY -= (target - height) / 2;
    height = target;
  } else {
    const target = height * ratio;
    minX -= (target - width) / 2;
    width = target;
  }

  return { minX, minY, width, height, scale: width / MAP_VIEWBOX.width };
}

/**
 * Mapa de ruta de un safari.
 *
 * SVG estático, sin JavaScript ni proveedor externo: dibuja el país, une las
 * paradas en orden y las numera. Como usa las mismas coordenadas proyectadas
 * que el mapa de la home, la ruta que se ve es la ruta real del viaje —sale de
 * `routeDestinationSlugs`, la misma fuente que el texto de la ruta— y no puede
 * contradecirlo.
 */
export function RouteMap({
  stops,
  t,
}: {
  stops: Destination[];
  t: Dictionary;
}) {
  if (stops.length === 0) return null;

  const line =
    "M" +
    stops
      .map((s) => `${s.mapPosition.x.toFixed(1)} ${s.mapPosition.y.toFixed(1)}`)
      .join(" L");

  const frame = frameFor(stops);
  // Los trazos y textos se escalan con el encuadre para que su grosor aparente
  // sea el mismo tanto en una ruta del norte como en una que cruce el país.
  const unit = frame.scale;

  return (
    <figure>
      <svg
        viewBox={`${frame.minX.toFixed(1)} ${frame.minY.toFixed(1)} ${frame.width.toFixed(1)} ${frame.height.toFixed(1)}`}
        role="img"
        aria-label={t.safari.routeMapLabel(
          stops.map((s) => s.name).join(t.safari.routeMapJoin),
        )}
        className="h-auto w-full"
      >
        {Object.entries(TANZANIA_PATHS).map(([key, d]) => (
          <path
            key={key}
            d={d}
            className="fill-sand/20 stroke-forest/35"
            strokeWidth={1.6 * unit}
            strokeLinejoin="round"
          />
        ))}

        <path
          d={line}
          fill="none"
          className="stroke-terracotta"
          strokeWidth={2.8 * unit}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${7 * unit} ${10 * unit}`}
        />

        {stops.map((stop, index) => (
          <g key={stop.slug}>
            <circle
              cx={stop.mapPosition.x}
              cy={stop.mapPosition.y}
              r={7 * unit}
              className="fill-parchment stroke-terracotta"
              strokeWidth={2.6 * unit}
            />
            {/* Las etiquetas alternan lado para que dos paradas próximas —el
                cráter y el Serengeti, por ejemplo— no se pisen. */}
            <text
              x={stop.mapPosition.x + (index % 2 === 0 ? 15 : -15) * unit}
              y={stop.mapPosition.y + 6 * unit}
              textAnchor={index % 2 === 0 ? "start" : "end"}
              className="fill-forest"
              style={{ fontSize: `${20 * unit}px`, fontWeight: 500 }}
            >
              {index + 1}. {stop.name}
            </text>
          </g>
        ))}
      </svg>

      <figcaption className="mt-4 flex items-center gap-2.5 text-[0.8rem] text-ink-faint">
        <CompassMark className="size-4 text-gold" needle={false} />
        {t.safari.mapScale}
      </figcaption>
    </figure>
  );
}
