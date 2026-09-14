"use client";

import { useEffect, useRef } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Marca la visita a una plantilla server-rendered como uno de los cinco
 * eventos de `trackEvent` (ver ese archivo: hoy no manda nada a ningún
 * sitio). No pinta nada — es la forma de enganchar un evento de cliente
 * desde una página que no lleva `"use client"` sin convertirla entera.
 */
export function ViewTracker({ event, id }: { event: AnalyticsEvent; id: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent(event, { id });
  }, [event, id]);
  return null;
}
