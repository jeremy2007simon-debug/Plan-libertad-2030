"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { type Locale, localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { MAIN_NAV } from "@/lib/nav";
import { COMPANY } from "@/lib/site";
import { LocaleSelector } from "./LocaleSelector";

/**
 * Menú móvil.
 *
 * Panel a pantalla completa con una sola lista: las colecciones aparecen
 * indentadas bajo Safaris en lugar de abrir un segundo nivel, porque en móvil
 * un acordeón dentro de un menú es una trampa de usabilidad.
 *
 * Accesibilidad: bloquea el scroll de fondo, cierra con Escape, devuelve el
 * foco al botón al cerrar y atrapa el tabulador dentro del panel mientras está
 * abierto.
 */
export function MobileNav({
  locale,
  t,
  hours,
  tone = "light",
}: {
  locale: Locale;
  t: Dictionary["nav"];
  /**
   * Horario ya traducido (`t.company.hours`).
   *
   * Llega como prop y no desde una clave propia de esta sección: el texto vive
   * en un solo sitio del diccionario y quien lo necesita lo recibe. Duplicarlo
   * en tres secciones sería garantizar que un día digan cosas distintas.
   */
  hours: string;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();
  /**
   * El panel se guarda con la ruta en la que se abrió y se considera cerrado
   * en cuanto la ruta cambia. Derivarlo evita un efecto que llame a setState
   * al navegar, y además cierra el menú en el mismo render que la navegación.
   */
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;
  const setOpen = (value: boolean) => setOpenForPath(value ? pathname : null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenForPath(null);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const dark = tone === "dark";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label={t.openMenu}
        className={`flex min-h-11 items-center gap-2.5 px-2 lg:hidden ${
          dark ? "text-parchment" : "text-forest"
        }`}
      >
        <span className="eyebrow">{t.menu}</span>
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.siteMenu}
          className="fixed inset-0 z-[60] flex flex-col bg-forest text-parchment lg:hidden"
        >
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-5 sm:px-8">
            <span className="flex items-center gap-3">
              <CompassMark className="size-7 text-sand" />
              <span className="font-display text-[1.25rem]">Maisha Quest</span>
            </span>
            <div className="flex items-center gap-2">
              <LocaleSelector locale={locale} tone="dark" t={t.language} />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label={t.closeMenu}
                className="flex min-h-11 items-center gap-2.5 px-2 text-parchment"
              >
                <span className="eyebrow">{t.close}</span>
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                  <path
                    d="m3 3 10 10M13 3 3 13"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <nav
            aria-label={t.mainNavLabel}
            className="flex-1 overflow-y-auto px-5 pb-8 pt-4 sm:px-8"
          >
            <ul className="flex flex-col">
              {MAIN_NAV.map((item) => (
                <li key={item.key} className="border-b border-rule-on-dark/45">
                  <Link
                    href={localeHref(locale, item.href)}
                    className="flex min-h-14 items-center font-display text-[1.6rem] text-parchment"
                  >
                    {t.items[item.key as keyof typeof t.items]}
                  </Link>
                  {item.children && (
                    <ul className="-mt-1 flex flex-col pb-4 pl-4">
                      {item.children
                        .filter((child) => child.href !== item.href)
                        .map((child) => (
                          <li key={child.key}>
                            <Link
                              href={localeHref(locale, child.href)}
                              className="flex min-h-11 items-center text-[0.92rem] text-on-dark-soft"
                            >
                              {t.items[child.key as keyof typeof t.items]}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3">
              <ButtonLink href="/plan" locale={locale} variant="primary" size="lg">
                {t.planShort}
              </ButtonLink>
              <ButtonLink
                href="/contact"
                locale={locale}
                variant="secondary"
                tone="dark"
                size="lg"
              >
                {t.speakToExpert}
              </ButtonLink>
            </div>

            <div className="mt-9 flex flex-col gap-1.5 text-[0.85rem] text-on-dark-soft">
              <a href={COMPANY.phoneHref} className="min-h-11 leading-[2.75rem]">
                {COMPANY.phone}
              </a>
              <a href={COMPANY.emailHref} className="min-h-11 leading-[2.75rem]">
                {COMPANY.email}
              </a>
              <p className="mt-2 text-on-dark-faint">
                {hours} · {COMPANY.hours.timezone}
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
