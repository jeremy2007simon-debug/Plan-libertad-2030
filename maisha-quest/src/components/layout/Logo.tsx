import Link from "next/link";
import { CompassMark } from "@/components/ui/Compass";
import { type Locale, localeHref } from "@/i18n/config";

/**
 * Marca: brújula + nombre en serif.
 *
 * TODO (cliente): el logotipo oficial en SVG. Hasta entonces la marca se
 * compone tipográficamente en lugar de usar una imagen de baja resolución, lo
 * que además la deja nítida en cualquier pantalla y legible como texto.
 */
export function Logo({
  locale,
  homeLabel,
  tone = "light",
  className = "",
}: {
  locale: Locale;
  /** "Maisha Quest — home", ya traducido. La marca nunca se traduce. */
  homeLabel: string;
  /** `light` = tinta oscura sobre marfil. `dark` = marfil sobre verde/foto. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-parchment" : "text-forest";
  const accent = tone === "dark" ? "text-sand" : "text-gold";

  return (
    <Link
      href={localeHref(locale, "/")}
      aria-label={homeLabel}
      // `min-h-11`: el logotipo es el enlace a la portada y su zona táctil
      // medía 28 px de alto en móvil.
      className={`group inline-flex min-h-11 items-center gap-3 ${color} ${className}`}
    >
      <CompassMark
        className={`size-7 shrink-0 transition-transform duration-700 ease-out group-hover:rotate-45 sm:size-8 ${accent}`}
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.18rem] whitespace-nowrap tracking-[0.02em] sm:text-[1.32rem]">
          Maisha Quest
        </span>
        {/* El descriptor se cae en pantallas estrechas: ahí compite con el
            menú y el selector de idioma por el mismo ancho. */}
        <span className="eyebrow mt-1 hidden text-[0.55rem] opacity-70 sm:block">
          Tanzania
        </span>
      </span>
    </Link>
  );
}
