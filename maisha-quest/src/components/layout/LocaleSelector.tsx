"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import {
  LOCALES,
  rememberLocale,
  LOCALE_META,
  type Locale,
  stripLocale,
} from "@/i18n/config";

/**
 * Lectura de la query string del navegador como store externo.
 *
 * Definidos fuera del componente para que las referencias sean estables. El
 * snapshot de servidor es la cadena vacía: en el HTML prerenderizado no hay
 * query que conservar, y `useSyncExternalStore` se encarga de rehacer el
 * render con el valor real en cuanto hidrata, sin desajuste de hidratación.
 */
function subscribeToLocation(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}
function readSearch() {
  return window.location.search;
}
function readSearchOnServer() {
  return "";
}

export interface LocaleSelectorStrings {
  /** Nombre accesible del botón. */
  buttonLabel: string;
  /** Encabezado del menú. */
  menuLabel: string;
  /** Se anuncia junto al idioma activo. */
  current: string;
}

/**
 * Selector de idioma.
 *
 * Cambia de idioma CONSERVANDO la página: `/es/safaris/serengeti-under-canvas`
 * ↔ `/de/safaris/serengeti-under-canvas`, con los parámetros intactos — que es
 * lo que mantiene el safari elegido al llegar al planificador desde
 * `?safari=...`. Los slugs no se traducen justo para que esa equivalencia
 * exista siempre y no haga falta una tabla de rutas por idioma.
 *
 * Son enlaces reales, no botones: se pueden abrir en otra pestaña, el buscador
 * los sigue y funcionan sin JavaScript. El `onClick` solo guarda la
 * preferencia; la navegación la hace el propio enlace.
 *
 * Teclado: Enter/Espacio abren, Escape cierra y devuelve el foco al botón,
 * las flechas recorren la lista y el foco queda atrapado mientras está abierto.
 */
export function LocaleSelector({
  locale,
  t,
  tone = "light",
}: {
  locale: Locale;
  t: LocaleSelectorStrings;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  /**
   * Query string que hay que conservar al cambiar de idioma (`?safari=…` del
   * planificador, sobre todo).
   *
   * Se lee de `window.location` en un efecto y no con `useSearchParams` a
   * propósito: ese hook obliga a envolver el componente en un `<Suspense>` y a
   * renderizar el selector en cliente en todas las páginas estáticas, es
   * decir, a servir una cabecera con un hueco muerto mientras hidrata. Así el
   * HTML del servidor ya trae los seis enlaces completos y utilizables sin
   * JavaScript; la query se añade en cuanto hidrata, que es justo cuando puede
   * haberla (el planificador es un componente de cliente).
   */
  const suffix = useSyncExternalStore(subscribeToLocation, readSearch, readSearchOnServer);

  const { path } = stripLocale(pathname);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Tab") {
        return;
      }
      const items = Array.from(
        ref.current?.querySelectorAll<HTMLAnchorElement>("a[data-locale-option]") ?? [],
      );
      if (items.length === 0) return;
      const index = items.indexOf(document.activeElement as HTMLAnchorElement);

      if (event.key === "Tab") {
        // Foco atrapado: salir por el final vuelve al principio y al revés.
        if (!event.shiftKey && index === items.length - 1) {
          event.preventDefault();
          items[0].focus();
        } else if (event.shiftKey && index <= 0) {
          event.preventDefault();
          items[items.length - 1].focus();
        }
        return;
      }

      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const next = index < 0 ? 0 : (index + delta + items.length) % items.length;
      items[next].focus();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const remember = (next: Locale) => {
    rememberLocale(next);
    setOpen(false);
    router.refresh();
  };

  const dark = tone === "dark";
  const current = LOCALE_META[locale];

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={`${t.buttonLabel} — ${current.nativeName}`}
        className={`eyebrow flex min-h-11 items-center gap-1.5 px-2 transition-colors duration-300 ${
          dark ? "text-on-dark-soft hover:text-parchment" : "text-ink-soft hover:text-forest"
        }`}
      >
        <GlobeIcon className="size-4" />
        {/* Ancho reservado: "中文" y "EN" ocupan distinto y el botón no debe
            moverse al cambiar de idioma ni al abrir el menú. */}
        <span className="inline-block min-w-[2.4ch] text-left">{current.short}</span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={t.menuLabel}
          className="absolute right-0 top-full z-50 mt-2 w-56 border border-rule bg-cream p-2 shadow-[0_18px_48px_-24px_rgba(27,29,26,0.4)]"
        >
          {LOCALES.map((option) => {
            const meta = LOCALE_META[option];
            const active = option === locale;
            return (
              <a
                key={option}
                data-locale-option=""
                role="menuitem"
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                aria-current={active ? "true" : undefined}
                href={`/${option}${path === "/" ? "" : path}${suffix}`}
                onClick={() => remember(option)}
                className={`flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-sand/30 focus-visible:bg-sand/30 ${
                  active ? "text-forest" : "text-ink"
                }`}
              >
                <span>{meta.nativeName}</span>
                {active ? (
                  <span className="eyebrow text-terracotta-text">{t.current}</span>
                ) : (
                  <span className="eyebrow text-ink-faint">{meta.short}</span>
                )}
              </a>
            );
          })}
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
