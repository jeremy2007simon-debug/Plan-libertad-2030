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
export const REVIEW_SOURCES = [
  {
    label: "TripAdvisor",
    href: `https://www.tripadvisor.com/Search?q=${encodeURIComponent("Maisha Quest Arusha")}`,
  },
  {
    label: "SafariBookings",
    href: `https://www.safaribookings.com/operators?q=${encodeURIComponent("Maisha Quest")}`,
  },
  {
    label: "Google",
    href: `https://www.google.com/search?q=${encodeURIComponent("Maisha Quest Arusha reviews")}`,
  },
];
