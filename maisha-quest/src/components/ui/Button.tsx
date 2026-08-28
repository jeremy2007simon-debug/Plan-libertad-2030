import Link from "next/link";
import { type Locale, localeHref } from "@/i18n/config";
import type { ComponentProps, ReactNode } from "react";

/**
 * Un único botón para toda la web.
 *
 * La web actual duplica llamadas a la acción con estilos distintos; aquí sólo
 * hay tres jerarquías y quedan fijadas: `primary` (terracota, una sola por
 * pantalla), `secondary` (filete) y `quiet` (texto subrayado). El dorado no
 * se usa nunca como fondo de botón — solo como detalle.
 */

type Variant = "primary" | "secondary" | "quiet";
type Tone = "light" | "dark";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2.5 font-sans font-semibold tracking-[0.06em] uppercase " +
  "transition-colors duration-300 ease-out disabled:opacity-45 disabled:pointer-events-none " +
  // 44 px de alto mínimo: área táctil cómoda en móvil.
  "min-h-11 text-[0.7rem] sm:text-[0.73rem]";

const SIZES: Record<Size, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

/** Rectángulo con esquinas apenas suavizadas: nada de píldoras. */
const SHAPE = "rounded-[2px]";

const VARIANTS: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: "bg-terracotta text-white hover:bg-terracotta-deep",
    dark: "bg-terracotta text-white hover:bg-terracotta-deep",
  },
  secondary: {
    light:
      "border border-forest/35 text-forest hover:bg-forest hover:text-ivory hover:border-forest",
    dark: "border border-on-dark-faint text-on-dark hover:bg-ivory hover:text-forest hover:border-ivory",
  },
  quiet: {
    light: "text-forest underline underline-offset-[6px] decoration-forest/30 hover:decoration-terracotta hover:text-terracotta px-0 min-h-0 py-1",
    dark: "text-on-dark underline underline-offset-[6px] decoration-on-dark-faint hover:decoration-sand hover:text-sand px-0 min-h-0 py-1",
  },
};

function classes(variant: Variant, tone: Tone, size: Size, className: string) {
  const shape = variant === "quiet" ? "" : `${SHAPE} ${SIZES[size]}`;
  return `${BASE} ${shape} ${VARIANTS[variant][tone]} ${className}`.trim();
}

interface Common {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  className?: string;
}

/**
 * Botón-enlace.
 *
 * `locale` es obligatorio cuando el destino es interno: el prefijo de idioma
 * lo pone `localeHref`, nunca quien llama. Para destinos externos, `tel:` o
 * `mailto:` se pasa `locale={null}` y el href sale tal cual.
 */
export function ButtonLink({
  href,
  locale,
  children,
  variant = "primary",
  tone = "light",
  size = "md",
  className = "",
  ...rest
}: Common & { href: string; locale: Locale | null } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className"
  >) {
  return (
    <Link
      href={locale ? localeHref(locale, href) : href}
      className={classes(variant, tone, size, className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  tone = "light",
  size = "md",
  className = "",
  ...rest
}: Common & ComponentProps<"button">) {
  return (
    <button className={classes(variant, tone, size, className)} {...rest}>
      {children}
    </button>
  );
}
