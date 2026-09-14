"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { type Locale, localeHref, stripLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";

/**
 * Cabecera.
 *
 * Tercera pasada de diseño (tras la de botones): la navegación de escritorio
 * —siete enlaces en fila junto al logotipo— competía con la marca por el
 * mismo espacio y dejaba la cabecera con tres densidades distintas (logo,
 * lista de enlaces, selector + CTA + menú móvil). La referencia pedida por el
 * cliente resuelve eso con tres zonas fijas: menú a la izquierda, marca
 * centrada, CTA a la derecha — un patrón habitual en operadores de safari de
 * gama alta. El menú de pantalla completa (`MobileNav`) ya estaba construido
 * y probado para móvil; aquí se activa en TODAS las anchuras en vez de
 * duplicar la navegación en dos sitios. El selector de idioma no desaparece:
 * vive dentro de ese mismo panel, visible nada más abrirlo, en vez de sumar
 * una cuarta pieza a una barra que se quería limpia.
 *
 * Arranca transparente sobre el hero y, al hacer scroll, pasa a verde profundo
 * translúcido con un desenfoque ligero por detrás. El cambio se hace con una
 * clase, no midiendo en cada scroll: el listener es pasivo y solo escribe
 * estado cuando cruza el umbral, así que no cuesta fotogramas.
 *
 * Al fijarse, la cabecera se compacta de 76 a 62 px. Como es `fixed` y el
 * `--header-h` que usan los heros vive en `:root`, esa altura no desplaza ni
 * un píxel del documento: no hay salto de layout.
 *
 * La rejilla de tres columnas (`1fr auto 1fr`) es lo que centra de verdad el
 * logotipo: un `flex justify-between` con dos grupos de anchos distintos a
 * los lados no lo deja exactamente en el centro, y aquí sí importa —es la
 * pieza más grande de la composición.
 */
export function Header({
  locale,
  t,
  hours,
}: {
  locale: Locale;
  t: Dictionary["nav"];
  /** Horario ya traducido; solo lo usa el menú móvil. Ver `Footer`. */
  hours: string;
}) {
  // La ruta con la que se decide la cabecera transparente va SIN prefijo de
  // idioma: `/es` y `/en` son la misma portada.
  const pathname = stripLocale(usePathname()).path;
  const [scrolled, setScrolled] = useState(false);

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

  /* La cabecera es oscura en los dos estados, así que el tono de los hijos
     (logo, botón de menú) no cambia nunca. */
  const tone = "dark" as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out)] ${
        solid
          ? "border-b border-[var(--rule-on-dark)] bg-[color-mix(in_srgb,var(--forest)_92%,transparent)] backdrop-blur-[10px] backdrop-saturate-125"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className="mx-auto grid w-full max-w-[88rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 transition-[height] duration-500 ease-[var(--ease-out)] sm:px-8"
        style={{ height: solid ? "62px" : "76px" }}
      >
        <div className="flex items-center justify-self-start">
          <MobileNav locale={locale} tone={tone} t={t} hours={hours} alwaysVisible />
        </div>

        <div className="justify-self-center">
          <Logo locale={locale} homeLabel={t.homeLabel} tone={tone} />
        </div>

        <div className="flex items-center justify-self-end">
          {/* Icono en móvil estrecho para no forzar el ancho de esta columna
              —igual que la de la izquierda, por la propia rejilla— y volver a
              partir el logotipo del centro real. Texto completo desde `sm`.
              Envuelto en lugar de pasarle `hidden` al propio botón: `Button`
              lleva `inline-flex` en su clase base y, al estar ambas en la
              misma capa, Tailwind resuelve el empate por su propio orden, no
              por el del atributo — el botón se quedaría visible en móvil. */}
          <div className="hidden sm:block">
            <ButtonLink href="/plan" locale={locale} variant="primary" size="md">
              {t.planCta}
            </ButtonLink>
          </div>
          <Link
            href={localeHref(locale, "/plan")}
            aria-label={t.planCta}
            className="mq-tap mq-icon-btn on-dark sm:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <rect
                x="4"
                y="5.5"
                width="16"
                height="14.5"
                rx="1.6"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M4 9.5h16M8 3.5v3.6M16 3.5v3.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
