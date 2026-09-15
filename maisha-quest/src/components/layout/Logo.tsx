import { CompassMark } from "@/components/ui/Compass";
import { type Locale, localeHref } from "@/i18n/config";

const ICON_SIZE = {
  sm: "size-7",
  md: "size-7 sm:size-8",
  lg: "size-9",
} as const;

const TEXT_SIZE = {
  sm: "text-[1.25rem]",
  md: "text-[1.18rem] sm:text-[1.32rem]",
  lg: "text-[1.45rem]",
} as const;

/**
 * Marca: brújula + nombre en serif. Es el mismo botón de inicio en la
 * cabecera, el menú del sitio y el pie — un solo componente para que los
 * tres compartan de verdad el enlace, no solo el aspecto.
 *
 * TODO (cliente): el logotipo oficial en SVG. Hasta entonces la marca se
 * compone tipográficamente en lugar de usar una imagen de baja resolución, lo
 * que además la deja nítida en cualquier pantalla y legible como texto.
 */
export function Logo({
  locale,
  homeLabel,
  tone = "light",
  size = "md",
  showCountry = true,
  iconClassName,
  className = "",
}: {
  locale: Locale;
  /**
   * "— Ir al inicio", ya traducido. La marca no se traduce.
   *
   * Solo se usa como ETIQUETA VISIBLE PARA LECTORES, no como `aria-label`.
   * Con `aria-label` el nombre accesible sustituía al texto de la marca, y ni
   * la mayúscula del descriptor ni el hecho de que los dos rótulos se
   * concatenan sin espacio coincidían con él: quien maneja el navegador por
   * voz y dice lo que lee en pantalla no acertaba el enlace. Es el criterio
   * 2.5.3 de WCAG, «etiqueta en el nombre». Dejando que el nombre salga del
   * propio texto, no pueden discrepar.
   */
  homeLabel: string;
  /** `light` = tinta oscura sobre marfil. `dark` = marfil sobre verde/foto. */
  tone?: "light" | "dark";
  /** Tamaño del icono y el nombre: cabecera (`md`), menú (`sm`), pie (`lg`). */
  size?: "sm" | "md" | "lg";
  /** El descriptor "Tanzania" bajo el nombre — solo tiene sitio en la cabecera. */
  showCountry?: boolean;
  /** Sustituye el color de icono que trae el `tone` — el pie usa dorado, no arena. */
  iconClassName?: string;
  className?: string;
}) {
  const color = tone === "dark" ? "text-parchment" : "text-forest";
  const accent = iconClassName ?? (tone === "dark" ? "text-sand" : "text-gold");

  return (
    <a
      href={localeHref(locale, "/")}
      // Ancla real, no `<Link>`: pulsar el logo tiene que ser una carga
      // completa siempre —incluso ya estando en la home—, para que arranque
      // desde arriba, dispare la animación de entrada (`Intro.tsx`, que solo
      // se activa en una carga real de la home) y cierre de raíz cualquier
      // overlay abierto (menú, vídeo con su audio) al desmontar el documento
      // entero. Un `<Link>` habría hecho justo lo contrario: una transición
      // de cliente sin recarga. Al ser un enlace normal, Ctrl/Cmd+clic sigue
      // abriendo en otra pestaña sin nada especial que mantener.
      className={`group inline-flex min-h-11 items-center gap-3 ${color} ${className}`}
    >
      <CompassMark
        className={`${ICON_SIZE[size]} shrink-0 transition-transform duration-700 ease-out group-hover:rotate-45 ${accent}`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display whitespace-nowrap tracking-[0.02em] ${TEXT_SIZE[size]}`}>
          Maisha Quest
        </span>
        {/* El descriptor se cae en pantallas estrechas: ahí compite con el
            menú y el selector de idioma por el mismo ancho. */}
        {showCountry && (
          <span className="eyebrow mt-1 hidden text-[0.55rem] opacity-70 sm:block">
            Tanzania
          </span>
        )}
      </span>
      {/* "— Ir al inicio", solo para lectores de pantalla: sin esto el
          enlace se anunciaría como el nombre de la marca a secas y no se
          sabría que lleva a la portada. */}
      <span className="sr-only">{homeLabel}</span>
    </a>
  );
}
