"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Locale, localeHref } from "@/i18n/config";

/** Una experiencia ya resuelta en el idioma de la página. */
export interface ExplorerItem {
  /** Categoría (`wildlife`, `culture`…), usada como `id` de React. */
  id: string;
  slug: string;
  /** Nombre de la categoría, ya traducido (`t.categories[id]`). */
  label: string;
  shortDescription: string;
  objectPosition: string;
  image: { src: string; alt: string; blurDataURL: string };
}

const PANEL_ID = "experience-explorer-panel";

/**
 * "Experience Explorer".
 *
 * Sustituye a la rejilla de collage: una sola fotografía protagonista a la
 * izquierda y un índice editorial a la derecha, en lugar de ocho tarjetas
 * compitiendo a la vez. En móvil el índice pasa a ser una tira horizontal
 * bajo la fotografía, nunca ocho tarjetas apiladas.
 *
 * Cada fila del índice es un `<a>` real —no un botón—: el enlace es
 * rastreable y funciona sin JavaScript (lleva a la ficha de la experiencia).
 * Con JavaScript, pasar el cursor o el foco por encima cambia además la
 * fotografía protagonista; el clic sigue navegando, nunca se bloquea. Por
 * eso NO es un patrón ARIA de pestañas (`role="tab"`): un tab no navega, y
 * aquí el enlace sí debe hacerlo. El elemento activo se marca con
 * `aria-current`, la forma correcta de decir «este es el que se está
 * mostrando» sin prometer un contrato de pestañas que luego se rompe.
 *
 * Sin JavaScript, `useState` arranca en 0: se ve la primera experiencia y
 * las siete filas siguen siendo siete enlaces de verdad. No hay una sección
 * vacía esperando a que algo se hidrate.
 */
export function ExperienceExplorerPanel({
  items,
  locale,
  exploreLabel,
  selectorLabel,
}: {
  items: ExplorerItem[];
  locale: Locale;
  exploreLabel: string;
  selectorLabel: string;
}) {
  const [active, setActive] = useState(0);
  const item = items[active];

  if (!item) return null;

  /**
   * Flechas: mueven el FOCO a la fila anterior/siguiente dentro del mismo
   * índice (el de escritorio o el de móvil, nunca entre los dos). El cambio
   * de experiencia lo dispara el propio `onFocus` de la fila de llegada, no
   * esta función — así el comportamiento es idéntico al de Tab, solo que más
   * rápido.
   *
   * Busca los hermanos en el DOM en lugar de guardar una lista de referencias:
   * son ocho enlaces reales, recorrerlos cuando de verdad hace falta —al
   * pulsar una flecha— es más simple que mantener un array de referencias
   * sincronizado con cada fila.
   */
  const onArrowKey = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    const horizontal = event.key === "ArrowLeft" || event.key === "ArrowRight";
    const vertical = event.key === "ArrowUp" || event.key === "ArrowDown";
    if (!horizontal && !vertical) return;
    const nav = event.currentTarget.closest("[data-experience-nav]");
    if (!nav) return;
    const rows = Array.from(nav.querySelectorAll("a"));
    const index = rows.indexOf(event.currentTarget);
    if (index === -1) return;
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const next = forward ? Math.min(index + 1, rows.length - 1) : Math.max(index - 1, 0);
    if (next === index) return;
    event.preventDefault();
    (rows[next] as HTMLAnchorElement).focus();
  };

  const row = (
    entry: ExplorerItem,
    index: number,
    orientation: "vertical" | "horizontal",
  ) => {
    const isActive = index === active;
    return (
      <Link
        href={localeHref(locale, `/experiences/${entry.slug}`)}
        onMouseEnter={() => setActive(index)}
        onFocus={() => setActive(index)}
        onKeyDown={onArrowKey}
        aria-current={isActive ? "true" : undefined}
        aria-controls={PANEL_ID}
        className={
          orientation === "vertical"
            ? "group flex min-h-16 items-center gap-4 py-4 transition-colors duration-300"
            : "group flex min-h-11 items-center gap-3 border-b-2 py-2 pr-1 transition-colors duration-300"
        }
        style={
          orientation === "horizontal"
            ? { borderColor: isActive ? "var(--gold)" : "transparent" }
            : undefined
        }
      >
        {/* El número es decorativo: dentro de un `<ol>` real, quien use un
            lector de pantalla ya oye «7 de 8» por sí solo, y sin ocultarlo
            aquí se colaba en el nombre accesible del enlace pegado al
            nombre de la experiencia («07Kilimanjaro»), sin espacio entre
            los dos. */}
        <span
          aria-hidden="true"
          className={`tnum shrink-0 text-[0.8rem] transition-colors duration-300 ${
            isActive ? "text-[var(--gold)]" : "text-on-dark-faint"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`flex-1 text-[1rem] leading-snug font-medium transition-colors duration-300 ${
            isActive ? "text-parchment" : "text-on-dark-soft group-hover:text-parchment"
          } ${orientation === "horizontal" ? "whitespace-nowrap" : ""}`}
        >
          {entry.label}
        </span>
        {orientation === "vertical" && (
          <>
            <span
              aria-hidden="true"
              className={`hidden h-px shrink-0 origin-right bg-[var(--gold)] transition-all duration-300 sm:block ${
                isActive ? "w-8 opacity-100" : "w-0 opacity-0"
              }`}
            />
            <span
              aria-hidden="true"
              className={`shrink-0 text-on-dark-faint transition-transform duration-300 ${
                isActive ? "translate-x-1 text-[var(--gold)]" : "group-hover:translate-x-1"
              }`}
            >
              →
            </span>
          </>
        )}
      </Link>
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
      {/* Fotografía protagonista + ficha. Una sola vez en el DOM: en móvil
          ocupa el ancho completo y en escritorio se sitúa en la columna
          izquierda; no hay dos copias del mismo panel. */}
      <div className="lg:order-1 lg:col-span-8">
        <div
          id={PANEL_ID}
          key={item.id}
          className="relative h-[58vh] max-h-[440px] overflow-hidden bg-charcoal lg:h-[min(72vh,760px)] lg:max-h-none"
        >
          <span className="mq-explorer-mask absolute inset-0 block overflow-hidden">
            <Image
              key={item.id}
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 66vw"
              quality={72}
              placeholder="blur"
              blurDataURL={item.image.blurDataURL}
              style={{ objectPosition: item.objectPosition }}
              className="mq-explorer-zoom object-cover"
            />
          </span>
          {/* Barrido decorativo: independiente de la máscara, para que la luz
              cruce el encuadre sin quedar recortada por el propio borde que
              está revelando la fotografía. */}
          <span
            aria-hidden="true"
            className="mq-explorer-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-[var(--gold)]/30 to-transparent"
          />
          <div className="media-scrim-soft pointer-events-none absolute inset-0" />

          <div className="mq-explorer-caption pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <span className="tnum block text-[0.72rem] tracking-[0.24em] text-[var(--gold)]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-2.5 text-[1.6rem] leading-tight text-parchment sm:text-[1.9rem]">
              {item.label}
            </h3>
            <p className="mt-2.5 max-w-[38ch] text-[0.92rem] leading-relaxed text-parchment/85">
              {item.shortDescription}
            </p>
            <Link
              href={localeHref(locale, `/experiences/${item.slug}`)}
              className="pointer-events-auto tap-44 mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.06em] text-[var(--gold)] uppercase underline decoration-[var(--gold)]/40 underline-offset-[6px] transition-colors duration-300 hover:text-parchment hover:decoration-parchment/50"
            >
              {exploreLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Índice — escritorio: lista vertical. Es un `<ol>` real: quien use un
          lector de pantalla oye «7 de 8» al llegar a Kilimanjaro, así que el
          número visible es decorativo y no repite esa cuenta en el nombre
          accesible del enlace. */}
      <nav
        aria-label={selectorLabel}
        data-experience-nav="desktop"
        className="hidden lg:order-2 lg:col-span-4 lg:block"
      >
        <ol className="flex flex-col">
          {items.map((entry, index) => (
            <li
              key={entry.id}
              className="border-b border-rule-on-dark/40 first:border-t"
            >
              {row(entry, index, "vertical")}
            </li>
          ))}
        </ol>
      </nav>

      {/* Índice — móvil y tableta: tira horizontal con scroll-snap nativo. */}
      <nav aria-label={selectorLabel} data-experience-nav="mobile" className="lg:hidden">
        <ol
          data-experience-track=""
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8"
        >
          {items.map((entry, index) => (
            <li key={entry.id} className="shrink-0 snap-start">
              {row(entry, index, "horizontal")}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
