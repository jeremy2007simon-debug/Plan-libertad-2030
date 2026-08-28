import type { ReactNode } from "react";
import { CompassPoint } from "./Compass";
import { Reveal } from "./motion";

/**
 * Encabezado de sección.
 *
 * Un único patrón para toda la web: antetítulo con punto cardinal, título
 * serif y entradilla opcional con ancho de lectura limitado. Tener uno solo es
 * lo que da la jerarquía visual que hoy falta.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Acciones a la derecha del título en escritorio (p. ej. "View all"). */
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <Reveal
      className={`${centered ? "flex flex-col items-center text-center" : ""} ${className}`}
    >
      <div
        className={`flex flex-col gap-5 ${
          children ? "md:flex-row md:items-end md:justify-between md:gap-10" : ""
        }`}
      >
        <div className={centered ? "flex flex-col items-center" : ""}>
          {eyebrow && (
            <p
              className={`eyebrow mb-4 flex items-center gap-2.5 ${
                dark ? "text-sand" : "text-terracotta-text"
              }`}
            >
              <CompassPoint className="size-2.5 shrink-0" />
              {eyebrow}
            </p>
          )}
          <Tag
            className={`text-h2 ${dark ? "text-parchment" : "text-forest"} ${
              centered ? "text-balance" : ""
            }`}
          >
            {title}
          </Tag>
          {lede && (
            <p
              className={`text-lede measure mt-5 ${
                dark ? "text-on-dark-soft" : "text-ink-soft"
              }`}
            >
              {lede}
            </p>
          )}
        </div>
        {children && <div className="shrink-0">{children}</div>}
      </div>
    </Reveal>
  );
}
