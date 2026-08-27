"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Carrusel táctil accesible.
 *
 * Es scroll nativo con `scroll-snap`: el gesto en móvil, la rueda en
 * escritorio y las flechas del teclado funcionan sin JavaScript propio. El
 * script solo añade los botones de avance —ocultos a lectores de pantalla,
 * porque el contenido ya es navegable con el tabulador— y los desactiva al
 * llegar a cada extremo.
 *
 * La lista es una `<ul>` real, así que un lector de pantalla anuncia cuántos
 * elementos hay, y `aria-label` describe de qué es el carrusel.
 */
export function Carousel({
  children,
  label,
  className = "",
  itemClassName = "",
  tone = "light",
}: {
  children: ReactNode[];
  label: string;
  className?: string;
  itemClassName?: string;
  tone?: "light" | "dark";
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Avanza aproximadamente una tarjeta y media: deja ver que hay más.
    el.scrollBy({ left: direction * el.clientWidth * 0.72, behavior: "smooth" });
  };

  const dark = tone === "dark";
  const button = dark
    ? "border-on-dark-faint text-on-dark hover:bg-ivory hover:text-forest"
    : "border-forest/25 text-forest hover:bg-forest hover:text-ivory";

  return (
    <div className={`relative ${className}`}>
      <ul
        ref={trackRef}
        onScroll={sync}
        aria-label={label}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
      >
        {children.map((child, index) => (
          <li key={index} className={`snap-start shrink-0 ${itemClassName}`}>
            {child}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-2" aria-hidden="true">
        <button
          type="button"
          tabIndex={-1}
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          className={`flex size-11 items-center justify-center rounded-full border transition-colors duration-300 disabled:opacity-25 ${button}`}
        >
          <Chevron className="size-4 rotate-180" />
        </button>
        <button
          type="button"
          tabIndex={-1}
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          className={`flex size-11 items-center justify-center rounded-full border transition-colors duration-300 disabled:opacity-25 ${button}`}
        >
          <Chevron className="size-4" />
        </button>
      </div>
    </div>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="m6 3 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
