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
 * Tercera pasada de diseño (tras la de composición del menú): la cápsula
 * `primary` llevaba el texto centrado y nada más — correcta, pero sin ningún
 * gesto que la distinguiera de un botón de formulario. Ahora el extremo
 * derecho lleva un círculo integrado con una flecha: mismo enlace, mismo
 * control, no un segundo botón —el círculo no lleva su propio `aria-label` ni
 * puede recibir foco por separado—. `quiet` gana la misma flecha, ya
 * existente como `MagneticArrow` en `motion.tsx` y reutilizada aquí en vez de
 * crear un segundo icono con el mismo trabajo.
 *
 * Segunda pasada (tras la primera entrega): la versión anterior era un
 * rectángulo casi recto (2 px de radio) en VERSALITAS con tracking ancho en
 * los tres tipos de botón. Ahora:
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
  "mq-tap group relative inline-flex items-center font-sans font-semibold " +
  "disabled:opacity-45 disabled:pointer-events-none disabled:active:scale-100 " +
  // 44 px de alto mínimo: área táctil cómoda en móvil.
  "min-h-11 text-[0.85rem] sm:text-[0.9rem]";

/* Ningún `justify-*` vive en BASE a propósito: Tailwind resuelve un empate
   entre dos utilidades de la misma propiedad por su propio orden interno, no
   por el del className (ver la nota de este mismo problema en Header.tsx),
   así que cada variante lleva UNA sola clase `justify-*`, nunca dos a la vez.

   `primary` usa `justify-between`: cuando el botón se estira a lo ancho de su
   contenedor —la lista de CTAs del menú móvil, por ejemplo— el círculo tiene
   que quedarse pegado al borde derecho de la cápsula, no flotar cerca del
   centro. Con ancho automático (la mayoría de los usos) no cambia nada frente
   a `justify-center`: no sobra espacio que repartir.

   El círculo deja más aire a la izquierda del texto que a la derecha: el
   propio círculo ya aporta su margen visual, así que un padding simétrico
   dejaría un hueco de más en ese lado. `secondary` no lleva círculo y
   mantiene el padding simétrico de siempre, centrado. */
const PRIMARY_SIZES: Record<Size, string> = {
  md: "justify-between py-1.5 pl-6 pr-1.5 gap-3",
  lg: "justify-between py-2 pl-8 pr-2 gap-3.5",
};

const SIZES: Record<Size, string> = {
  md: "justify-center px-6 py-3 gap-2.5",
  lg: "justify-center px-8 py-4 gap-2.5",
};

const ARROW_CIRCLE: Record<Size, string> = {
  md: "size-8",
  lg: "size-9",
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
     (5,73:1) y oscurece un paso más al pasar por encima. */
  primary: {
    light: "bg-terracotta-deep text-white hover:bg-[#874429]",
    dark: "bg-terracotta-deep text-white hover:bg-[#874429]",
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
   */
  quiet: {
    light: "tap-44 text-forest hover:text-terracotta-text px-0 min-h-0 py-1 gap-1.5",
    dark: "tap-44 text-on-dark hover:text-sand px-0 min-h-0 py-1 gap-1.5",
  },
};

function outerClasses(variant: Variant, tone: Tone, size: Size, className: string) {
  if (variant === "quiet") return `${BASE} ${VARIANTS.quiet[tone]} ${className}`.trim();
  const sizing = variant === "primary" ? PRIMARY_SIZES[size] : SIZES[size];
  return `${BASE} ${SHAPE[variant]} ${sizing} ${VARIANTS[variant][tone]} ${className}`.trim();
}

/**
 * Flecha en un círculo integrado, solo para `primary`.
 *
 * Decorativa: el enlace o botón que la envuelve ya lleva el texto y el
 * `aria-label` si hace falta, así que esto no necesita ninguno propio.
 * `group-hover`/`group-focus-visible` la desplazan unos píxeles y aclaran el
 * círculo — el gesto vive en el padre (`.mq-tap.group`), no aquí.
 */
function ArrowCircle({ size }: { size: Size }) {
  return (
    <span
      aria-hidden="true"
      className={`${ARROW_CIRCLE[size]} mq-btn-arrow inline-flex shrink-0 items-center justify-center rounded-full bg-white/15 transition-[transform,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:bg-white/25 group-focus-visible:translate-x-1 group-focus-visible:bg-white/25`}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
        <path
          d="M3 8h9.5M9 4.2 13 8l-4 3.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}

/**
 * Flecha de texto, para `quiet`.
 *
 * Mismo dibujo que `MagneticArrow` (`motion.tsx`) pero inline aquí: ese
 * componente exige un ancestro `.group` propio y aquí el ancestro ya es el
 * propio enlace (`BASE` incluye `group`), así que reimplementar el mismo
 * `group-hover`/`group-focus-visible` evita depender de un `<span>`
 * intermedio adicional.
 */
function TextArrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
    >
      →
    </span>
  );
}

function Content({ variant, size, children }: { variant: Variant; size: Size; children: ReactNode }) {
  if (variant === "primary") {
    return (
      <>
        <span>{children}</span>
        <ArrowCircle size={size} />
      </>
    );
  }
  if (variant === "quiet") {
    return (
      <>
        <span className="mq-link">{children}</span>
        <TextArrow />
      </>
    );
  }
  return <>{children}</>;
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
      className={outerClasses(variant, tone, size, className)}
      {...rest}
    >
      <Content variant={variant} size={size}>
        {children}
      </Content>
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
      className={outerClasses(variant, tone, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="mq-spinner" aria-hidden="true" />}
      <Content variant={variant} size={size}>
        {children}
      </Content>
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
