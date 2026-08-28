import Image from "next/image";
import type { Photo as PhotoType } from "@/data/photography";
import type { MediaImage } from "@/types/content";

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
  quality,
  /** Alt alternativo cuando el contexto ya describe la imagen mejor. */
  alt,
}: {
  photo: PhotoType;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Calidad de compresión. Por defecto la de Next (75). */
  quality?: number;
  alt?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={alt ?? photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder="blur"
      blurDataURL={photo.blurDataURL}
      // El encuadre se define por fotografía: el centro geométrico casi nunca
      // es el centro de interés, y en recortes verticales un sujeto a un
      // tercio del cuadro desaparece.
      style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
      className={`object-cover ${className}`}
    />
  );
}

/**
 * Fotografía que puede no existir todavía.
 *
 * Sin `src` NO PINTA NADA: devuelve `null`. Antes devolvía un marco con la
 * leyenda "photograph to follow" y una brújula dentro; por cuidado que fuera
 * el marco, decía que la web está a medio hacer. Quien lo usa debe montar su
 * layout de forma que la ausencia se recomponga —una columna que se ensancha,
 * una fila que desaparece— en lugar de dejar un rectángulo vacío.
 *
 * Qué fotografía falta y dónde entra cada una: `src/data/photography-wanted.ts`.
 */
export function MediaFrame({
  media,
  className = "",
  sizes = "100vw",
  priority = false,
  quality,
}: {
  media: MediaImage | PhotoType;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Calidad de compresión. Por defecto la de Next (75). */
  quality?: number;
}) {
  if (!media.src) return null;
  const blur = "blurDataURL" in media ? media.blurDataURL : undefined;
  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
      style={media.objectPosition ? { objectPosition: media.objectPosition } : undefined}
      className={`object-cover ${className}`}
    />
  );
}
