"use client";

import { useSyncExternalStore } from "react";

/**
 * ¿El sistema pide movimiento reducido?
 *
 * Se lee con `useSyncExternalStore`, que es la API pensada para suscribirse a
 * un sistema externo del navegador: React lee el valor en cada render en lugar
 * de copiarlo a estado desde un efecto, así que no hay render en cascada ni
 * riesgo de quedarse con un valor viejo si el usuario cambia la preferencia
 * con la página abierta.
 *
 * En el servidor devuelve `false`, que es el valor seguro: quien lo consulta
 * solo lo usa para DEJAR de reproducir un vídeo, y nada se reproduce antes de
 * que el cliente haya leído el valor real.
 *
 * Sustituye a `useReducedMotion` de framer-motion, que era lo último que
 * quedaba de esa librería: quitarla ahorra ~50 kB comprimidos en toda la web.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
