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
 * Separador de sección: filete fino interrumpido por una rosa de los vientos.
 * Sustituye a los bloques de tarjetas apiladas como forma de marcar respiración
 * entre secciones.
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
      <span className={`h-px flex-1 ${line}`} />
      <CompassMark className={`size-5 shrink-0 ${mark}`} needle={false} />
      <span className={`h-px flex-1 ${line}`} />
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
