"use client";

import { useEffect } from "react";

/**
 * Bloquea el scroll de fondo mientras `active` es `true` y lo restaura
 * exactamente donde estaba al desactivarse.
 *
 * `overflow: hidden` en solitario no basta: con `scroll-behavior: smooth`
 * activo en toda la web (ver `globals.css`), quitarle a la página su rango
 * de scroll anima suavemente la vuelta a 0 en vez de dejarla donde estaba
 * — el motivo real por el que abrir el vídeo o el menú a media página
 * devolvía a quien navegaba arriba del todo. En su lugar, se saca el
 * `<body>` del flujo con `position: fixed` y se compensa con un `top`
 * negativo: visualmente no se mueve nada, y al desactivarse se restaura la
 * posición real con un scroll instantáneo, nunca animado.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const body = document.body.style;
    const previous = {
      position: body.position,
      top: body.top,
      left: body.left,
      right: body.right,
      width: body.width,
    };

    body.position = "fixed";
    body.top = `-${scrollY}px`;
    body.left = "0";
    body.right = "0";
    body.width = "100%";

    return () => {
      body.position = previous.position;
      body.top = previous.top;
      body.left = previous.left;
      body.right = previous.right;
      body.width = previous.width;
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [active]);
}
