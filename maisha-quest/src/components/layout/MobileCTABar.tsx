"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { type Locale, localeHref, stripLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { whatsappHref } from "@/lib/site";

/**
 * Barra de acción persistente en móvil.
 *
 * Está clavada al borde inferior de la pantalla y no se mueve: ni al empezar
 * la página, ni durante el scroll, ni al llegar al pie, ni cuando Safari
 * pliega y despliega sus barras. Toda la mecánica —y por qué antes sí se
 * movía— está en `.mobile-action-bar`, en `globals.css`.
 *
 * Sigue sin aparecer en el planificador: allí estorbaría a un formulario de
 * siete pasos que ya tiene sus propios botones abajo.
 *
 * WhatsApp va aquí, integrado: mismo peso tipográfico que el resto de la
 * barra, sin burbuja verde flotante. Es el canal que de verdad usa un viajero
 * para preguntar algo rápido, pero no tiene por qué gritar.
 */
export function MobileCTABar({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["nav"];
}) {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  /**
   * ¿Hay un campo de texto con el foco?
   *
   * Con el teclado del móvil abierto, la barra se quedaría flotando sobre el
   * campo o sobre los botones del formulario. Mientras alguien escribe se
   * esconde, y vuelve en cuanto suelta el campo. No hay salto de maquetación:
   * el hueco que reserva el pie sale de una variable CSS y no cambia.
   */
  const [typing, setTyping] = useState(false);

  /**
   * Publica la altura REAL de la barra en `--mobile-action-bar-height`.
   *
   * El valor por defecto del CSS es el correcto para las seis lenguas, pero
   * una etiqueta larga puede partir los botones en dos líneas y entonces el
   * hueco del pie se queda corto. Se ignora una altura de 0: es lo que mide
   * mientras está oculta, y escribirla dejaría el pie pegado a la barra.
   */
  const measure = useCallback(() => {
    const height = bar.current?.offsetHeight ?? 0;
    if (height > 0) {
      document.documentElement.style.setProperty(
        "--mobile-action-bar-height",
        `${height}px`,
      );
    }
  }, []);

  useEffect(() => {
    const node = bar.current;
    if (!node) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const isField = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      target.matches("input, textarea, select, [contenteditable='true']");

    const onFocusIn = (event: FocusEvent) => {
      if (isField(event.target)) setTyping(true);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (isField(event.target)) setTyping(false);
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  if (stripLocale(pathname).path === "/plan") return null;

  return (
    <div
      ref={bar}
      // Lo lee `scripts/check-responsive.mjs` para comprobar que la barra no
      // tapa ningún control alcanzable.
      data-mobile-cta=""
      hidden={typing}
      className="mobile-action-bar border-t border-rule-on-dark/30 bg-forest"
    >
      <div className="flex items-stretch gap-3">
        <Link
          href={localeHref(locale, "/plan")}
          className="flex min-h-12 flex-1 items-center justify-center rounded-[2px] bg-terracotta-deep px-5 text-[0.72rem] font-semibold tracking-[0.06em] text-white uppercase"
        >
          {t.planShort}
        </Link>
        <a
          href={whatsappHref(t.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsappLabel}
          className="flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-on-dark-faint px-4 text-[0.72rem] font-semibold tracking-[0.06em] text-parchment uppercase"
        >
          <WhatsAppGlyph className="size-4" />
          {t.chat}
        </a>
      </div>
    </div>
  );
}

/** Glifo monocromo: hereda el color del texto, sin el verde de la marca. */
export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0a8 8 0 0 0-6.9 12L0 16l4.1-1.1A8 8 0 1 0 8 0Zm0 1.5A6.5 6.5 0 1 1 4.6 13.6l-.3-.2-2.4.6.6-2.3-.2-.3A6.5 6.5 0 0 1 8 1.5Zm-2.6 3c-.2 0-.4 0-.6.3-.2.2-.8.7-.8 1.8s.8 2.1.9 2.2c.1.2 1.5 2.4 3.8 3.3 1.9.7 2.3.6 2.7.5.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.5-.3-1.4-.7c-.2 0-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.9-2.5c-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.4l-.7-1.6c-.1-.4-.3-.4-.4-.4h-.5Z" />
    </svg>
  );
}
