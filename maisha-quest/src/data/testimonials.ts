import type { Testimonial } from "@/types/content";

/**
 * Testimonios.
 *
 * VACÍO A PROPÓSITO. No se ha inventado ni una reseña: en un sector donde la
 * confianza lo es todo, una cita falsa es el peor error posible, y además es
 * verificable por cualquiera.
 *
 * La sección "Stories brought home" detecta este array vacío y muestra un
 * estado alternativo elegante — una invitación a hablar con el equipo y los
 * enlaces a los perfiles públicos donde sí hay opiniones — en lugar de un
 * hueco roto.
 *
 * Para activarla: añadir aquí los testimonios reales con su fuente
 * verificable (`source`). Todos los campos del modelo están soportados por el
 * componente: retrato, valoración, tipo de viaje, fecha y vídeo.
 */

export const TESTIMONIALS: Testimonial[] = [];

/**
 * Perfiles públicos donde el viajero puede comprobar opiniones por su cuenta
 * mientras no haya testimonios propios publicados. Son búsquedas, no enlaces
 * a fichas concretas: no afirmamos que exista un perfil con reseñas en cada
 * plataforma, solo damos el camino para buscarlo.
 */
/**
 * Perfiles públicos donde un viajero puede comprobar las reseñas por su cuenta.
 *
 * VACÍO A PROPÓSITO. Aquí había tres enlaces a *búsquedas* genéricas
 * ("buscar Maisha Quest en TripAdvisor"). Una búsqueda no es una reseña: puede
 * devolver cero resultados —o directamente a la competencia— desde una sección
 * que promete verificación. Se rellena cuando el cliente confirme las URLs
 * exactas de sus perfiles; hasta entonces la interfaz no pinta la lista y
 * ofrece hablar con el equipo, que sí es una acción real.
 */
export const REVIEW_SOURCES: { label: string; href: string }[] = [];
