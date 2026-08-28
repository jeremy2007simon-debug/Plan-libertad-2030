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
  preload = false,
  quality,
  alt,
}: {
  photo: PhotoType;
  className?: string;
  sizes?: string;
  /**
   * Solo para la imagen que es el LCP de la página.
   *
   * `priority` quedó obsoleto en Next 16 a favor de `preload`, y ya no marca
   * la prioridad de red: el `<link rel="preload">` salía sin
   * `fetchpriority="high"` y Lighthouse lo señalaba. Van los tres juntos —
   * preload, carga inmediata y prioridad alta— porque es lo que de verdad
   * adelanta el pintado del hero.
   */
  preload?: boolean;
  /** Calidad de compresión. Por defecto la de Next (75). */
  quality?: number;
  /**
   * Obligatorio, y en el idioma de la página.
   *
   * Ya no sale de los datos de la fotografía: allí solo hay una clave. Quien
   * pinta la imagen resuelve la descripción con `getPhotoAlt(locale)`, o pasa
   * cadena vacía si la imagen es decorativa y el texto de al lado ya la
   * describe. No hay valor por defecto a propósito: un alt por defecto sería
   * el inglés otra vez.
   */
  alt: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      loading={preload ? "eager" : "lazy"}
      fetchPriority={preload ? "high" : undefined}
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
  alt,
  className = "",
  sizes = "100vw",
  preload = false,
  quality,
}: {
  media: MediaImage | PhotoType;
  /** Ver `Photo`: obligatorio y en el idioma de la página. */
  alt: string;
  className?: string;
  sizes?: string;
  /** Ver `Photo`: solo para el LCP. */
  preload?: boolean;
  /** Calidad de compresión. Por defecto la de Next (75). */
  quality?: number;
}) {
  if (!media.src) return null;
  const blur = "blurDataURL" in media ? media.blurDataURL : undefined;
  return (
    <Image
      src={media.src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      loading={preload ? "eager" : "lazy"}
      fetchPriority={preload ? "high" : undefined}
      quality={quality}
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
      style={media.objectPosition ? { objectPosition: media.objectPosition } : undefined}
      className={`object-cover ${className}`}
    />
  );
}
