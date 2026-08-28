import type { MediaVideo } from "@/types/content";

/**
 * Maisha Quest Cares — impacto social.
 *
 * ⚠️ AVISO INTERNO, NO MOSTRAR EN LA INTERFAZ ⚠️
 *
 * El vídeo de impacto facilitado por el cliente ("WhatsApp Video 2026-08-27 at
 * 16.07.30 (1).mp4", 41 s, 576×1024) contiene imágenes de un colegio y de
 * menores identificables. ANTES DEL LANZAMIENTO hay que confirmar por escrito
 * la autorización de imagen de los menores que aparecen —de sus tutores y del
 * centro— y conservar ese consentimiento. Sin él, el vídeo no se publica: el
 * componente está preparado para funcionar sin vídeo y no rompe la sección.
 *
 * Por la misma razón, los huecos de fotografía de esta sección se quedan
 * vacíos. No se ha puesto ni una sola foto de archivo de niños o de aulas:
 * presentarla como el trabajo comunitario de esta empresa sería falso, y el
 * problema de consentimiento sería exactamente el mismo.
 *
 * `outcomes` está vacío en todos los proyectos a propósito. No hay ni una
 * cifra de impacto inventada: en cuanto el cliente facilite datos reales
 * (colegios, alumnos, hectáreas, empleos), se rellenan aquí y la interfaz los
 * muestra sin tocar ningún componente.
 */

export const IMPACT_VIDEO: MediaVideo = {
  mp4: null,
  webm: null,
  captions: null,
  orientation: "portrait",
  durationSeconds: 41,
  poster: {
    src: null,
    altKey: "impact-community",
  },
};
