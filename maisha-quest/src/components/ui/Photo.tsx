import Image from "next/image";
import type { Photo as PhotoType } from "@/data/photography";
import type { MediaImage } from "@/types/content";
import { CompassMark } from "./Compass";

/**
 * Fotografía y huecos de fotografía.
 *
 * `<Photo>` pinta una imagen real del registro; `<ImageSlot>` pinta el hueco
 * elegante que ocupa su sitio cuando todavía no hay foto. Los dos reservan el
 * mismo espacio, así que sustituir un hueco por una foto no mueve el diseño.
 */

export function Photo({
  photo,
  className = "",
  sizes = "100vw",
  priority = false,
  /** Alt alternativo cuando el contexto ya describe la imagen mejor. */
  alt,
}: {
  photo: PhotoType;
  className?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      className={`object-cover ${className}`}
    />
  );
}

/**
 * Hueco a la espera de fotografía real.
 *
 * Aparece donde una foto de archivo sería engañosa: retratos del equipo,
 * alojamientos, viajeros y proyectos de impacto. Es deliberadamente sobrio
 * —marfil, filete y brújula— para que no parezca un error de carga, y lleva
 * `role="img"` con su descripción para que un lector de pantalla sepa qué irá
 * ahí.
 */
export function ImageSlot({
  label,
  className = "",
  tone = "light",
}: {
  /** Qué fotografía irá aquí. Se usa como etiqueta accesible. */
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`${label} — photograph to follow`}
      className={`flex h-full w-full flex-col items-center justify-center gap-3 ${
        dark
          ? "bg-forest-deep text-on-dark-faint"
          : "bg-sand/25 text-ink-faint"
      } ${className}`}
    >
      <CompassMark
        className={`size-9 ${dark ? "text-sand/45" : "text-gold/50"}`}
        needle={false}
      />
      <span className="eyebrow max-w-[22ch] px-4 text-center leading-relaxed">
        {label}
      </span>
    </div>
  );
}

/**
 * Elige automáticamente entre foto y hueco según venga o no `src`.
 * Lo usan las secciones que mezclan contenido real y pendiente (equipo,
 * impacto, alojamientos) sin ramificar en cada componente.
 */
export function MediaFrame({
  media,
  label,
  className = "",
  sizes = "100vw",
  priority = false,
  tone = "light",
}: {
  media: MediaImage | PhotoType;
  /** Etiqueta del hueco si `media.src` es null. */
  label: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
}) {
  if (!media.src) {
    return <ImageSlot label={label} tone={tone} className={className} />;
  }
  const blur = "blurDataURL" in media ? media.blurDataURL : undefined;
  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
      className={`object-cover ${className}`}
    />
  );
}
