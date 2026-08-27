"use client";

import { useEffect, useRef, useState } from "react";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/site";
import type { Locale } from "@/types/content";

/**
 * Selector de idioma.
 *
 * La arquitectura contempla seis idiomas, pero solo hay traducción en inglés.
 * En lugar de ofrecer idiomas que llevarían a texto sin traducir —o peor, a
 * una traducción automática inventada—, los pendientes se listan desactivados
 * y se explica en una línea que llegan pronto y que el equipo ya atiende en
 * varios idiomas. Es honesto y además comunica una ventaja real.
 *
 * Cuando existan las traducciones: poner `available: true` en `lib/site.ts` y
 * cambiar los `<button>` por enlaces a la ruta con prefijo de idioma.
 */
export function LocaleSelector({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [locale] = useState<Locale>(DEFAULT_LOCALE);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const dark = tone === "dark";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`eyebrow flex min-h-11 items-center gap-1.5 px-2 transition-colors duration-300 ${
          dark ? "text-on-dark-soft hover:text-ivory" : "text-ink-soft hover:text-forest"
        }`}
      >
        <GlobeIcon className="size-4" />
        {current.code.toUpperCase()}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-60 border border-rule bg-ivory-warm p-2 shadow-[0_18px_48px_-24px_rgba(27,29,26,0.4)]"
          role="menu"
        >
          {LOCALES.map((option) => (
            <button
              key={option.code}
              type="button"
              role="menuitem"
              disabled={!option.available}
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm text-ink transition-colors duration-200 hover:bg-sand/30 disabled:cursor-not-allowed disabled:text-ink-faint disabled:hover:bg-transparent"
            >
              <span>{option.label}</span>
              {option.available ? (
                option.code === locale && (
                  <span className="eyebrow text-terracotta">Current</span>
                )
              ) : (
                <span className="eyebrow text-ink-faint">Soon</span>
              )}
            </button>
          ))}
          <p className="border-t border-rule px-3 pb-1 pt-3 text-[0.78rem] leading-relaxed text-ink-soft">
            Translations are on their way. In the meantime we plan and host in
            English, Swahili, Russian and Mandarin Chinese — just tell us which
            you prefer.
          </p>
        </div>
      )}
    </div>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
      className={className}
    >
      <circle cx="8" cy="8" r="6.4" />
      <path d="M1.6 8h12.8M8 1.6c1.7 1.8 2.6 4 2.6 6.4S9.7 12.6 8 14.4C6.3 12.6 5.4 10.4 5.4 8S6.3 3.4 8 1.6Z" />
    </svg>
  );
}
