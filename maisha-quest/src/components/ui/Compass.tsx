/**
 * La brújula — hilo conductor visual de Maisha Quest.
 *
 * Geometría, no ilustración: círculo, rosa de cuatro puntas y una aguja. Se usa
 * en dosis pequeñas (marca, separadores, numeración de itinerario, puntos del
 * mapa) para que sugiera orientación sin convertir la web en una temática
 * literal de brújulas.
 */

export function CompassMark({
  className = "",
  strokeWidth = 1.1,
  needle = true,
}: {
  className?: string;
  strokeWidth?: number;
  /** La aguja marca el norte; se puede quitar para el uso más discreto. */
  needle?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      <circle cx="24" cy="24" r="21" opacity="0.55" />
      <circle cx="24" cy="24" r="15.5" opacity="0.28" />
      {/* Puntos cardinales */}
      <path d="M24 1.6v6M24 40.4v6M1.6 24h6M40.4 24h6" opacity="0.75" />
      {needle && (
        <>
          <path
            d="M24 10.5 27.4 24 24 37.5 20.6 24Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path d="M24 10.5 27.4 24 24 37.5 20.6 24Z" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

/**
 * La misma brújula, pero se dibuja al entrar en pantalla.
 *
 * Reutiliza el sistema `data-draw` ya existente para el trazo del mapa
 * (`pathLength={1}` normaliza cada trazo, así que no hay que medir nada en
 * JavaScript) en lugar de inventar un mecanismo propio: cada anillo y las
 * marcas cardinales se dibujan por separado, escalonados por `delay`. Sin
 * JavaScript, o con movimiento reducido, la marca aparece ya dibujada del
 * todo — es la misma regla que gobierna el resto del sistema de movimiento.
 *
 * El relleno de la aguja y su punto central no se animan: son un detalle
 * pequeño que no necesita su propia coreografía, y se ven desde el primer
 * instante mientras el contorno se traza alrededor.
 */
export function CompassMarkDraw({
  className = "",
  strokeWidth = 1.1,
  needle = true,
  /** Retardo en segundos, para dibujar después de un filete vecino. */
  delay = 0,
}: {
  className?: string;
  strokeWidth?: number;
  needle?: boolean;
  delay?: number;
}) {
  const at = (offset: number, duration: number) =>
    ({
      "--draw-duration": `${duration}s`,
      "--draw-delay": `${delay + offset}s`,
    }) as React.CSSProperties;
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
    >
      <circle cx="24" cy="24" r="21" opacity="0.55" pathLength={1} data-draw="" style={at(0, 0.8)} />
      <circle cx="24" cy="24" r="15.5" opacity="0.28" pathLength={1} data-draw="" style={at(0.08, 0.65)} />
      <path
        d="M24 1.6v6M24 40.4v6M1.6 24h6M40.4 24h6"
        opacity="0.75"
        pathLength={1}
        data-draw=""
        style={at(0.22, 0.4)}
      />
      {needle && (
        <>
          <path
            d="M24 10.5 27.4 24 24 37.5 20.6 24Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path
            d="M24 10.5 27.4 24 24 37.5 20.6 24Z"
            strokeLinejoin="round"
            pathLength={1}
            data-draw=""
            style={at(0.3, 0.5)}
          />
          <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

/**
 * Separador de sección: filete fino interrumpido por una rosa de los vientos.
 * Sustituye a los bloques de tarjetas apiladas como forma de marcar respiración
 * entre secciones.
 *
 * Los dos filetes crecen HACIA la brújula, como si la marca los emitiera, y
 * esta se dibuja al mismo tiempo. Los tres elementos comparten el observador
 * de movimiento y se revelan juntos, una sola vez, al entrar en pantalla.
 */
export function CompassDivider({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const line = tone === "dark" ? "bg-on-dark-faint/40" : "bg-rule";
  const mark = tone === "dark" ? "text-sand/70" : "text-gold";
  return (
    <div className={`flex items-center gap-5 ${className}`} aria-hidden="true">
      <span data-line="" className={`h-px flex-1 origin-right ${line}`} />
      <CompassMarkDraw className={`size-5 shrink-0 ${mark}`} needle={false} delay={0.1} />
      <span
        data-line=""
        className={`h-px flex-1 origin-left ${line}`}
        style={{ transitionDelay: "0.1s" }}
      />
    </div>
  );
}

/** Punto cardinal suelto, para numerar o marcar posiciones en el mapa. */
export function CompassPoint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6 0 7.1 4.9 12 6 7.1 7.1 6 12 4.9 7.1 0 6l4.9-1.1Z" />
    </svg>
  );
}
