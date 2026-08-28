"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { type Locale, localeHref, stripLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { MAIN_NAV } from "@/lib/nav";
import { LocaleSelector } from "./LocaleSelector";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Cabecera.
 *
 * Arranca transparente sobre el hero y, al hacer scroll, pasa a verde profundo
 * translúcido con un desenfoque ligero por detrás. El cambio se hace con una
 * clase, no midiendo en cada scroll: el listener es pasivo y solo escribe
 * estado cuando cruza el umbral, así que no cuesta fotogramas.
 *
 * El fondo oscuro es el mismo en las once secciones de la home y en el resto
 * de páginas, lo que evita el otro problema: una cabecera que cambia de claro
 * a oscuro según la sección que tenga debajo obliga a recalcular el contraste
 * de cada enlace en cada scroll y nunca queda del todo bien.
 *
 * Al fijarse, la cabecera se compacta de 76 a 62 px. Como es `fixed` y el
 * `--header-h` que usan los heros vive en `:root`, esa altura no desplaza ni
 * un píxel del documento: no hay salto de layout.
 *
 * Solo hay siete entradas en el nivel superior —el problema de la web actual
 * era tener catorce— y los tres tipos de paquete pasan a ser un submenú de
 * Safaris.
 */
export function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  // La ruta con la que se compara el estado activo va SIN prefijo de idioma:
  // `/es/safaris` y `/en/safaris` son la misma entrada de menú.
  const pathname = stripLocale(usePathname()).path;
  const [scrolled, setScrolled] = useState(false);
  /**
   * El submenú abierto se guarda junto a la ruta en la que se abrió, y se
   * considera cerrado en cuanto la ruta cambia. Derivarlo así evita un efecto
   * que llame a setState al navegar —y, con él, un render en cascada.
   */
  const [menuState, setMenuState] = useState<{ label: string; path: string } | null>(
    null,
  );
  const openMenu = menuState?.path === pathname ? menuState.label : null;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Las páginas con hero a sangre dejan la cabecera transparente al inicio.
   * El resto la necesitan sólida desde el primer píxel, o el texto flotaría
   * sobre el pergamino sin contraste.
   */
  const overHero = pathname === "/";
  const solid = scrolled || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openWithDelay = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuState({ label, path: pathname });
  };

  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // Margen para cruzar el hueco entre el enlace y el panel sin que se cierre.
    closeTimer.current = setTimeout(() => setMenuState(null), 140);
  };

  /* La cabecera es oscura en los dos estados, así que el tono de los hijos
     (logo, selector, botón de menú) no cambia nunca. */
  const tone = "dark" as const;
  const linkColor = "text-parchment/80 hover:text-parchment";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out)] ${
        solid
          ? "border-b border-[var(--rule-on-dark)] bg-[color-mix(in_srgb,var(--forest)_92%,transparent)] backdrop-blur-[10px] backdrop-saturate-125"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className="mx-auto flex w-full max-w-[88rem] items-center justify-between gap-6 px-5 transition-[height] duration-500 ease-[var(--ease-out)] sm:px-8"
        style={{ height: solid ? "62px" : "76px" }}
      >
        <Logo locale={locale} homeLabel={t.homeLabel} tone={tone} />

        {/* Navegación de escritorio */}
        <nav aria-label={t.mainNavLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {MAIN_NAV.map((item) => {
              const label = t.items[item.key as keyof typeof t.items];
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => item.children && openWithDelay(item.key)}
                  onMouseLeave={closeWithDelay}
                >
                  <Link
                    href={localeHref(locale, item.href)}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={item.children ? openMenu === item.key : undefined}
                    onFocus={() => item.children && openWithDelay(item.key)}
                    className={`relative flex min-h-11 items-center px-3.5 text-[0.82rem] font-medium tracking-[0.02em] transition-colors duration-[var(--dur-hover)] ${linkColor} ${
                      active ? "text-parchment" : ""
                    }`}
                  >
                    {label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 bottom-2 h-px bg-[var(--gold)]"
                      />
                    )}
                  </Link>

                  {item.children && openMenu === item.key && (
                    <div className="absolute left-0 top-full w-80 border border-[var(--rule-on-dark)] bg-[color-mix(in_srgb,var(--canopy)_96%,transparent)] p-2 backdrop-blur-[10px]">
                      <ul>
                        {item.children.map((child) => {
                          const description =
                            t.descriptions[
                              child.key as keyof typeof t.descriptions
                            ];
                          return (
                            <li key={child.key}>
                              <Link
                                href={localeHref(locale, child.href)}
                                className="block px-3.5 py-3 transition-colors duration-[var(--dur-hover)] hover:bg-[color-mix(in_srgb,var(--olive)_38%,transparent)]"
                              >
                                <span className="block text-[0.9rem] text-parchment">
                                  {t.items[child.key as keyof typeof t.items]}
                                </span>
                                {description && (
                                  <span className="mt-0.5 block text-[0.8rem] leading-snug text-on-dark-soft">
                                    {description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LocaleSelector locale={locale} tone={tone} t={t.language} />
          </div>
          {/* Envuelto en lugar de pasarle `hidden` al botón: `Button` lleva
              `inline-flex` en su clase base y, al estar ambas en la misma capa,
              Tailwind resuelve el empate por su propio orden, no por el del
              atributo — el botón se quedaría visible en móvil. */}
          <div className="hidden lg:block">
            <ButtonLink href="/plan" locale={locale} variant="primary" size="md">
              {t.planCta}
            </ButtonLink>
          </div>
          <MobileNav locale={locale} tone={tone} t={t} />
        </div>
      </div>
    </header>
  );
}
