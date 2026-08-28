import type { MediaVideo } from "@/types/content";

/**
 * ¿Hay un archivo de vídeo que se pueda publicar?
 *
 * Vive aquí y no en `LazyVideo` porque ese componente es de cliente, y quien
 * necesita esta respuesta son componentes de SERVIDOR: deciden si el módulo de
 * vídeo llega a existir en el HTML, no si se pinta después.
 *
 * `false` significa que no se pinta NADA en su lugar: ni marco, ni póster
 * suelto, ni aviso. Ver `src/data/photography-wanted.ts`.
 */
export function hasPlayableVideo(video: MediaVideo | undefined | null): boolean {
  return Boolean(video && (video.mp4 || video.webm));
}
