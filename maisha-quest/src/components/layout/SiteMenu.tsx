"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Photo } from "@/components/ui/Photo";
import { MagneticArrow } from "@/components/ui/motion";
import { type Locale, localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import type { PhotoAlt } from "@/i18n/alt";
import { MAIN_NAV, type NavNode } from "@/lib/nav";
import { COMPANY } from "@/lib/site";
import { useScrollLock } from "@/lib/useScrollLock";
import { LocaleSelector } from "./LocaleSelector";

/**
 * Menú del sitio.
 *
 * Segunda arquitectura de este menú (tras el panel de una sola lista, ver el
 * historial de este archivo): la referencia pedida por el cliente pasa de una
 * lista de ancho completo —siete filas separadas por líneas horizontales, la
 * cabecera y el pie repetidos en cada una— a una composición de dos zonas en
 * escritorio: la navegación a la izquierda y una fotografía editorial a la
 * derecha que cambia con el enlace que se está mirando o enfocando. En móvil
 * no hay sitio para una segunda columna, así que ahí sigue siendo una lista,
 * pero con los submenús plegados por defecto en vez de todos abiertos —la
 * `Safaris` de siete filas y media que salía en cualquier revisión del móvil.
 *
 * Un solo componente para las dos composiciones, no dos separados: comparten
 * el disparador, el `role="dialog"`, el cierre, el bloqueo de scroll y la
 * trampa de foco, y las dos ramas (`hidden lg:flex` / `lg:hidden`) están
 * siempre las dos en el DOM — la que no toca en ese ancho quesa con
 * `display: none`, que ya excluye sus enlaces del orden de tabulación y del
 * árbol de accesibilidad sin ningún atributo aparte. Es el mismo patrón que
 * ya usa `Header` para su CTA de icono en móvil.
 *
 * Portal a `document.body`, igual que `HeroFilmButton`: la cabecera aplica
 * `backdrop-filter` en cuanto la página deja de estar en su primer píxel
 * (`Header.tsx`, estado `solid`), y un `backdrop-filter` en un antecesor crea
 * su propio "containing block" para los descendientes `position: fixed` —tal
 * cual el `transform` que ya obligó a portar el vídeo de la portada—. Sin el
 * portal, el panel se quedaría encajado en la altura de la cabecera en vez de
 * cubrir la ventana entera, en cualquier página que no fuera la home sin
 * hacer scroll.
 */

export function SiteMenu({
  locale,
  t,
  hours,
  photoAlt,
  tone = "light",
  alwaysVisible = false,
}: {
  locale: Locale;
  t: Dictionary["nav"];
  /** Horario ya traducido (`t.company.hours`). */
  hours: string;
  /** Solo los textos alternativos que hacen falta: los de las fotografías del panel. */
  photoAlt: PhotoAlt;
  tone?: "light" | "dark";
  /** Ver el mismo prop en el `Header`: hoy siempre `true`, el panel es la única navegación. */
  alwaysVisible?: boolean;
}) {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;
  const [closing, setClosing] = useState(false);
  /** Único submenú abierto a la vez, en escritorio y en móvil por igual. */
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  /** Qué fotografía muestra el panel de la derecha. `null` hasta el primer hover/foco. */
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestClose = useCallback(() => {
    if (closeTimer.current) return;
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      setOpenForPath(null);
      setClosing(false);
      setExpandedKey(null);
      // `preventScroll`: sin esto, devolver el foco a un botón que ha quedado
      // fuera de la ventana (se abrió el menú, se hizo scroll dentro de él, se
      // cerró) salta la página de vuelta a él.
      triggerRef.current?.focus({ preventScroll: true });
    }, 240);
  }, []);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const visible = Array.from(focusables).filter((el) => el.offsetParent !== null);
      if (!visible.length) return;
      const first = visible[0];
      const last = visible[visible.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, requestClose]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const dark = tone === "dark";
  const toggle = (key: string) => setExpandedKey((current) => (current === key ? null : key));

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setOpenForPath(pathname);
          setActiveKey(MAIN_NAV[0]?.key ?? null);
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t.openMenu}
        className={`mq-tap flex min-h-11 items-center gap-2.5 rounded-[var(--radius-pill)] px-2.5 ${
          alwaysVisible ? "" : "lg:hidden"
        } ${dark ? "text-parchment" : "text-forest"}`}
      >
        <span className="eyebrow">{t.menu}</span>
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.siteMenu}
            data-closing={closing || undefined}
            className={`mq-site-menu dark-section fixed inset-0 z-[60] flex flex-col bg-forest text-parchment ${
              alwaysVisible ? "" : "lg:hidden"
            }`}
          >
            <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-5 sm:px-8 lg:px-10">
              <span className="flex items-center gap-3">
                <CompassMark className="size-7 text-sand" />
                <span className="font-display text-[1.25rem]">{COMPANY.name}</span>
              </span>
              <div className="flex items-center gap-2">
                <LocaleSelector locale={locale} tone="dark" t={t.language} />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={requestClose}
                  aria-label={t.closeMenu}
                  className="mq-tap flex min-h-11 items-center gap-2.5 rounded-[var(--radius-pill)] px-2.5 text-parchment"
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

            <DesktopMenu
              locale={locale}
              t={t}
              hours={hours}
              photoAlt={photoAlt}
              expandedKey={expandedKey}
              toggle={toggle}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
            <MobileMenu
              locale={locale}
              t={t}
              hours={hours}
              expandedKey={expandedKey}
              toggle={toggle}
            />
          </div>,
          document.body,
        )}
    </>
  );
}

/** Nodos de `MAIN_NAV` que aparecen en el panel de fotografía: cada elemento
    de primer nivel y sus hijos que no duplican su propio href. */
const PANEL_NODES: NavNode[] = MAIN_NAV.flatMap((item) => [
  item,
  ...(item.children?.filter((child) => child.href !== item.href) ?? []),
]);

function SubmenuToggle({
  expanded,
  label,
  t,
  onActivate,
  onToggle,
}: {
  expanded: boolean;
  label: string;
  t: Dictionary["nav"];
  onActivate?: () => void;
  onToggle: () => void;
}) {
  const template = expanded ? t.collapseSection : t.expandSection;
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-label={template.replace("{label}", label)}
      onClick={onToggle}
      onFocus={onActivate}
      className="mq-tap mq-submenu-toggle flex size-11 shrink-0 items-center justify-center text-on-dark-soft hover:text-parchment"
    >
      <svg
        viewBox="0 0 16 16"
        className={`size-3.5 transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] ${
          expanded ? "rotate-180" : ""
        }`}
        aria-hidden="true"
      >
        <path
          d="M3.5 6 8 10.5 12.5 6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
}

/* --------------------------------------------------------------------------
   Escritorio: 55 % navegación / 45 % fotografía.
   -------------------------------------------------------------------------- */
function DesktopMenu({
  locale,
  t,
  hours,
  photoAlt,
  expandedKey,
  toggle,
  activeKey,
  setActiveKey,
}: {
  locale: Locale;
  t: Dictionary["nav"];
  hours: string;
  photoAlt: PhotoAlt;
  expandedKey: string | null;
  toggle: (key: string) => void;
  activeKey: string | null;
  setActiveKey: (key: string) => void;
}) {
  const items = t.items as Record<string, string>;
  const descriptions = t.descriptions as Record<string, string>;

  return (
    <div data-menu-variant="desktop" className="hidden flex-1 overflow-hidden lg:flex">
      <div className="flex w-[55%] shrink-0 flex-col justify-center overflow-y-auto px-10 py-8 xl:px-16">
        <nav aria-label={t.mainNavLabel}>
          <ul className="flex flex-col">
            {MAIN_NAV.map((item, index) => {
              const expanded = expandedKey === item.key;
              const children = item.children?.filter((child) => child.href !== item.href) ?? [];
              return (
                <li
                  key={item.key}
                  className="mq-menu-item border-b border-rule-on-dark/25"
                  style={{ animationDelay: `${Math.min(index * 45, 300)}ms` }}
                >
                  <div className="flex items-center">
                    <Link
                      href={localeHref(locale, item.href)}
                      onMouseEnter={() => setActiveKey(item.key)}
                      onFocus={() => setActiveKey(item.key)}
                      className="mq-desktop-nav-link flex flex-1 items-center py-3 font-display text-[clamp(1.7rem,2.3vw,2.35rem)] text-parchment transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:text-sand"
                    >
                      {items[item.key]}
                    </Link>
                    {children.length > 0 && (
                      <SubmenuToggle
                        expanded={expanded}
                        label={items[item.key]}
                        t={t}
                        onActivate={() => setActiveKey(item.key)}
                        onToggle={() => toggle(item.key)}
                      />
                    )}
                  </div>

                  {children.length > 0 && (
                    <div
                      className="mq-submenu"
                      data-open={expanded || undefined}
                      // `grid-template-rows: 0fr` recorta VISUALMENTE el contenido, pero
                      // no lo saca del orden de tabulación: un enlace dentro de una fila
                      // a 0fr de alto sigue siendo alcanzable con Tab, invisible, lo que
                      // dejaría a quien navega por teclado en un enlace que no puede ver.
                      // `inert` (nativo, sin JavaScript propio) excluye la rama entera del
                      // foco y del árbol de accesibilidad mientras está plegada, sin tocar
                      // la animación de altura, que sigue viviendo solo en CSS.
                      inert={!expanded}
                    >
                      <ul className="overflow-hidden pb-2 pl-1">
                        {children.map((child) => (
                          <li key={child.key}>
                            <Link
                              href={localeHref(locale, child.href)}
                              onMouseEnter={() => setActiveKey(child.key)}
                              onFocus={() => setActiveKey(child.key)}
                              className="mq-tap flex min-h-11 items-center text-[1.02rem] text-on-dark-soft transition-colors duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:text-sand"
                            >
                              {items[child.key]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <ButtonLink href="/plan" locale={locale} variant="primary" size="lg">
            {t.planCta}
          </ButtonLink>
          <ButtonLink href="/contact" locale={locale} variant="secondary" tone="dark" size="lg">
            {t.speakToExpert}
          </ButtonLink>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[0.85rem] text-on-dark-soft">
          <a href={COMPANY.phoneHref} className="min-h-11 leading-[2.75rem]">
            {COMPANY.phone}
          </a>
          <a href={COMPANY.emailHref} className="min-h-11 leading-[2.75rem]">
            {COMPANY.email}
          </a>
          <p className="text-on-dark-faint">
            {hours} · {COMPANY.hours.timezone}
          </p>
        </div>
      </div>

      <div className="w-[45%] shrink-0 p-6 xl:p-8">
        <div className="relative size-full overflow-hidden rounded-[1.75rem]">
          {PANEL_NODES.map((node) => {
            if (!node.image) return null;
            const isActive = activeKey === node.key || (activeKey === null && node === PANEL_NODES[0]);
            return (
              <div
                key={node.key}
                className="mq-menu-photo-layer absolute inset-0"
                style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
              >
                <Photo
                  photo={node.image}
                  alt={photoAlt[node.image.altKey]}
                  sizes="45vw"
                  className="scale-105"
                />
                <div className="mq-menu-photo-scrim absolute inset-0" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-8 xl:p-10">
                  <h3 className="font-display text-[1.9rem] text-parchment">{items[node.key]}</h3>
                  {descriptions[node.key] && (
                    <p className="measure mt-2 text-[0.95rem] leading-relaxed text-on-dark-soft">
                      {descriptions[node.key]}
                    </p>
                  )}
                  <Link
                    href={localeHref(locale, node.href)}
                    className="mq-tap tap-44 group mt-4 inline-flex items-center gap-3 text-[0.9rem] font-semibold text-sand"
                  >
                    <span className="mq-link group-hover:text-parchment group-focus-visible:text-parchment">
                      {t.explore}
                    </span>
                    <MagneticArrow className="text-parchment" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Móvil: una columna, submenús plegados por defecto.
   -------------------------------------------------------------------------- */
function MobileMenu({
  locale,
  t,
  hours,
  expandedKey,
  toggle,
}: {
  locale: Locale;
  t: Dictionary["nav"];
  hours: string;
  expandedKey: string | null;
  toggle: (key: string) => void;
}) {
  const items = t.items as Record<string, string>;

  return (
    <nav
      data-menu-variant="mobile"
      aria-label={t.mainNavLabel}
      className="flex-1 overflow-y-auto px-5 pb-8 pt-2 lg:hidden sm:px-8"
    >
      <ul className="flex flex-col">
        {MAIN_NAV.map((item, index) => {
          const expanded = expandedKey === item.key;
          const children = item.children?.filter((child) => child.href !== item.href) ?? [];
          return (
            <li
              key={item.key}
              className="mq-menu-item border-b border-rule-on-dark/45"
              style={{ animationDelay: `${Math.min(index * 45, 300)}ms` }}
            >
              <div className="flex items-center">
                <Link
                  href={localeHref(locale, item.href)}
                  className="mq-tap flex min-h-14 flex-1 items-center font-display text-[1.6rem] text-parchment active:text-sand"
                >
                  {items[item.key]}
                </Link>
                {children.length > 0 && (
                  <SubmenuToggle
                    expanded={expanded}
                    label={items[item.key]}
                    t={t}
                    onToggle={() => toggle(item.key)}
                  />
                )}
              </div>
              {children.length > 0 && (
                <div className="mq-submenu" data-open={expanded || undefined} inert={!expanded}>
                  <ul className="flex flex-col overflow-hidden pb-3 pl-4">
                    {children.map((child) => (
                      <li key={child.key}>
                        <Link
                          href={localeHref(locale, child.href)}
                          className="mq-tap flex min-h-11 items-center text-[0.92rem] text-on-dark-soft active:text-sand"
                        >
                          {items[child.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-9 flex flex-col gap-3">
        <ButtonLink href="/plan" locale={locale} variant="primary" size="lg">
          {t.planCta}
        </ButtonLink>
        <ButtonLink href="/contact" locale={locale} variant="secondary" tone="dark" size="lg">
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
  );
}
