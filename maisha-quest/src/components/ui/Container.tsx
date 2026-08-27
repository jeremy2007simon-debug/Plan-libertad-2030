import type { ElementType, ReactNode } from "react";

const WIDTHS = {
  /** Texto editorial a una columna. */
  prose: "max-w-3xl",
  /** Ancho por defecto del contenido. */
  default: "max-w-6xl",
  /** Rejillas amplias y carruseles. */
  wide: "max-w-[88rem]",
} as const;

export function Container({
  children,
  width = "default",
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  width?: keyof typeof WIDTHS;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={`mx-auto w-full px-5 sm:px-8 ${WIDTHS[width]} ${className}`}>
      {children}
    </Tag>
  );
}
