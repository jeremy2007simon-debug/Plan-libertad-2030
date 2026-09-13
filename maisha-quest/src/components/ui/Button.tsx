import Link from "next/link";
import { type Locale, localeHref } from "@/i18n/config";
import type { ComponentProps, ReactNode } from "react";

/**
 * Un único botón para toda la web.
 *
 * Tres jerarquías, fijadas: `primary` (terracota, cápsula, una sola por
 * pantalla), `secondary` (contorno fino, radio más discreto) y `quiet` (texto
 * con subrayado que se dibuja al pasar por encima — ver `.mq-link` en
 * `globals.css`). El dorado no se usa nunca como fondo de botón — solo como
 * detalle.
 *
 * Segunda pasada de diseño (tras la primera entrega): la versión anterior
 * era un rectángulo casi recto (2 px de radio) en VERSALITAS con tracking
 * ancho en los tres tipos de botón — leía "aplicación de formularios", no
 * "safari premium". Ahora:
 *  - `primary` es una cápsula (`--radius-pill`): silueta suave, sin llegar a
 *    parecer una pastilla de interfaz técnica porque el resto de la página
 *    —fotografías, tarjetas, secciones— sigue con geometría recta.
 *  - El texto deja las versalitas: minúsculas con la inicial en mayúscula,
 *    como el resto de la web. Las versalitas siguen existiendo, pero solo en
 *    `.eyebrow` (antetítulos), un sistema tipográfico distinto y deliberado.
 *  - La pulsación se siente: un `scale(0.97)` de 140 ms (`.mq-tap`, en
 *    `globals.css`), no solo un cambio de color. Desactivado con
 *    `prefers-reduced-motion`.
 */

type Variant = "primary" | "secondary" | "quiet";
type Tone = "light" | "dark";
type Size = "md" | "lg";

const BASE =
  "mq-tap relative inline-flex items-center justify-center gap-2.5 font-sans font-semibold " +
  "disabled:opacity-45 disabled:pointer-events-none disabled:active:scale-100 " +
  // 44 px de alto mínimo: área táctil cómoda en móvil.
  "min-h-11 text-[0.85rem] sm:text-[0.9rem]";

const SIZES: Record<Size, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

const SHAPE: Record<Variant, string> = {
  /* Cápsula: silueta suave y elegante, la única forma redonda-del-todo del
     sistema —lo que la mantiene como una firma reconocible en vez de una
     regla aplicada a todo por igual. */
  primary: "rounded-[var(--radius-pill)]",
  /* Radio discreto, no cápsula: la jerarquía entre "acción principal" y
     "acción secundaria" también se lee en la forma, no solo en el color. */
  secondary: "rounded-[var(--radius-sm)]",
  quiet: "",
};

const VARIANTS: Record<Variant, Record<Tone, string>> = {
  /* La terracota de marca (#B56142) da 4,42:1 con blanco, por debajo de AA
     para una etiqueta pequeña. El botón usa por eso la variante profunda
     (5,73:1) y oscurece un paso más al pasar por encima, con un filete
     dorado que aparece por debajo. */
  primary: {
    light: "bg-terracotta-deep text-white hover:bg-[#874429] hover:shadow-[inset_0_-2px_0_var(--gold)]",
    dark: "bg-terracotta-deep text-white hover:bg-[#874429] hover:shadow-[inset_0_-2px_0_var(--gold)]",
  },
  secondary: {
    light:
      "border border-forest/35 text-forest hover:bg-forest hover:text-parchment hover:border-forest",
    dark: "border border-on-dark-faint text-on-dark hover:bg-parchment hover:text-forest hover:border-parchment",
  },
  /*
   * `tap-44`: la variante discreta es texto subrayado sin caja, así que su
   * zona táctil medía la altura de una línea. El pseudoelemento la lleva a
   * 44 px sin cambiar ni un píxel del diseño. Ver `globals.css`.
   *
   * `mq-link`: el subrayado se dibuja al pasar por encima o al recibir el
   * foco, en vez de estar siempre puesto — ver esa clase en `globals.css`
   * para el porqué completo.
   */
  quiet: {
    light: "mq-link tap-44 text-forest hover:text-terracotta-text px-0 min-h-0 py-1",
    dark: "mq-link tap-44 text-on-dark hover:text-sand px-0 min-h-0 py-1",
  },
};

function classes(variant: Variant, tone: Tone, size: Size, className: string) {
  const shape = variant === "quiet" ? "" : `${SHAPE[variant]} ${SIZES[size]}`;
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
  loading = false,
  disabled,
  ...rest
}: Common &
  Omit<ComponentProps<"button">, "children"> & {
    /**
     * Envío en curso: añade un pequeño aro giratorio antes del texto y
     * `aria-busy`, sin cambiar el texto por sí solo — quien llama decide qué
     * dice el botón mientras carga (`"Enviando…"`, en el planificador).
     * También deshabilita el botón, así que un segundo clic durante el envío
     * no manda la solicitud dos veces.
     */
    loading?: boolean;
  }) {
  return (
    <button
      className={classes(variant, tone, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="mq-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

/**
 * Botón de icono: circular, 44×44 px de área táctil real.
 *
 * Para acciones sin texto —silenciar el vídeo, avanzar el carrusel, sumar un
 * viajero— donde un rectángulo con las mismas esquinas que un botón de texto
 * leería como una casilla de aplicación. `aria-label` es obligatorio: no hay
 * texto visible que lo sustituya.
 */
export function IconButton({
  children,
  tone = "light",
  className = "",
  ...rest
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
} & ComponentProps<"button">) {
  return (
    <button
      className={`mq-tap mq-icon-btn ${tone === "dark" ? "on-dark" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
