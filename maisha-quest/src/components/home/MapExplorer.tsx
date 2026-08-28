"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type Locale, localeHref } from "@/i18n/config";
import { CompassMark } from "@/components/ui/Compass";
import { MAP_VIEWBOX, TANZANIA_PATHS } from "@/lib/map";

/**
 * Mapa interactivo de Tanzania.
 *
 * Decisiones que sostienen esta sección:
 *
 * 1. No depende de ningún proveedor de mapas. La silueta es un SVG estático
 *    generado desde Natural Earth, así que no hay clave de API, ni peticiones,
 *    ni un mapa gris si el servicio falla.
 * 2. Los puntos son `<button>` de HTML colocados por porcentaje sobre el SVG,
 *    no formas dentro del SVG: se tabulan, se anuncian y tienen área táctil
 *    real. El SVG es decorativo (`aria-hidden`).
 * 3. En móvil el mapa se sustituye por una lista de destinos con la misma
 *    información — no es un mapa encogido.
 * 4. Al elegir un destino se traza la ruta del viaje relacionado sobre el
 *    mapa: es el motivo de la sección, no un adorno.
 */

export interface MapStrings {
  eyebrow: string;
  title: string;
  lede: string;
  bestTime: string;
  wildlife: string;
  experiences: string;
  journeysHere: string;
  chooseDestination: string;
}

/**
 * Destino ya preparado para el cliente.
 *
 * Las etiquetas que dependen de una regla de plural (`durationLabel`) o del
 * nombre del destino (`moreOnLabel`) llegan ya resueltas como cadenas: una
 * función de traducción no puede cruzar la frontera servidor→cliente de React,
 * y resolverlas arriba mantiene el diccionario completo fuera del bundle.
 */
export interface MapDestination {
  slug: string;
  name: string;
  moreOnLabel: string;
  region: string;
  shortDescription: string;
  description: string;
  bestTime: string;
  wildlife: string[];
  coordinates: string;
  mapPosition: { x: number; y: number };
  image: { src: string; alt: string; width: number; height: number; blurDataURL: string };
  experiences: { slug: string; name: string }[];
  safaris: {
    slug: string;
    name: string;
    durationDays: number;
    durationLabel: string;
    route: string;
  }[];
}

export function MapExplorer({
  destinations,
  locale,
  t,
}: {
  destinations: MapDestination[];
  locale: Locale;
  t: MapStrings;
}) {
  /**
   * Abre por el Serengeti. `DESTINATIONS` ya lo pone primero justamente para
   * esto —así en móvil el chip activo es también el primero de la fila y se ve
   * sin desplazar—, y la búsqueda explícita es la red de seguridad por si
   * alguien reordena el array más adelante.
   */
  const [activeSlug, setActiveSlug] = useState(
    destinations.find((d) => d.slug === "serengeti")?.slug ??
      destinations[0]?.slug ??
      "",
  );
  const active =
    destinations.find((d) => d.slug === activeSlug) ?? destinations[0];

  /**
   * Ruta dibujada: la del primer safari que pasa por el destino activo. Se
   * traza siguiendo las posiciones reales de sus paradas.
   */
  const routeLine = useMemo(() => {
    const safari = active?.safaris[0];
    if (!safari) return null;
    const stops = safari.route
      .split(" · ")
      .map((name) => destinations.find((d) => d.name === name))
      .filter((d): d is MapDestination => Boolean(d));
    if (stops.length < 2) return null;
    return {
      key: safari.slug,
      d:
        "M" +
        stops
          .map((s) => `${s.mapPosition.x.toFixed(1)} ${s.mapPosition.y.toFixed(1)}`)
          .join(" L"),
      stops,
    };
  }, [active, destinations]);

  if (!active) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Mapa — solo escritorio */}
      <div className="hidden lg:col-span-6 lg:block xl:col-span-7">
        <div className="relative">
          <svg
            viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
            aria-hidden="true"
            className="mx-auto h-auto max-h-[28rem] w-full overflow-visible"
          >
            {/* Retícula de brújula, muy tenue */}
            <g stroke="currentColor" className="text-forest/12" strokeWidth="1">
              <line
                x1={active.mapPosition.x}
                y1="0"
                x2={active.mapPosition.x}
                y2={MAP_VIEWBOX.height}
              />
              <line
                x1="0"
                y1={active.mapPosition.y}
                x2={MAP_VIEWBOX.width}
                y2={active.mapPosition.y}
              />
            </g>

            {/* País.

                Dos capas: el relleno aparece con una transición de opacidad y
                el contorno se DIBUJA con `stroke-dashoffset`. `pathLength=1`
                normaliza la longitud, así que no hace falta medir el trazado
                en JavaScript. Sin JavaScript, o con movimiento reducido, la
                silueta se ve terminada desde el primer momento. */}
            {Object.entries(TANZANIA_PATHS).map(([key, d]) => (
              <path
                key={`${key}-fill`}
                d={d}
                data-reveal=""
                data-reveal-from="none"
                className="fill-parchment"
              />
            ))}
            {Object.entries(TANZANIA_PATHS).map(([key, d], index) => (
              <path
                key={`${key}-line`}
                d={d}
                pathLength={1}
                data-draw=""
                fill="none"
                className="stroke-forest/55"
                strokeWidth="1.6"
                strokeLinejoin="round"
                style={
                  {
                    "--draw-duration": "2.2s",
                    "--draw-delay": `${index * 0.12}s`,
                  } as React.CSSProperties
                }
              />
            ))}

            {/* Ruta del viaje relacionado */}
            {routeLine && (
              <g key={routeLine.key}>
                {/* La ruta se traza cada vez que cambia el destino activo:
                    el `key` del grupo fuerza el remontaje y la animación
                    arranca de cero. No se repite en bucle. */}
                <path
                  d={routeLine.d}
                  pathLength={1}
                  fill="none"
                  className="animate-route stroke-terracotta"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {routeLine.stops.map((stop, index) => (
                  <circle
                    key={stop.slug}
                    cx={stop.mapPosition.x}
                    cy={stop.mapPosition.y}
                    r="5"
                    className="animate-fade fill-terracotta"
                    style={{ animationDelay: `${400 + index * 180}ms` }}
                  />
                ))}
              </g>
            )}
          </svg>

          {/* Puntos: botones HTML sobre el SVG */}
          {destinations.map((destination) => {
            const isActive = destination.slug === active.slug;
            return (
              <button
                key={destination.slug}
                type="button"
                onClick={() => setActiveSlug(destination.slug)}
                aria-pressed={isActive}
                /* La etiqueta va a la derecha del punto salvo en el tercio
                   oriental del mapa, donde se voltea a la izquierda: si no,
                   Kilimanjaro y Arusha —que caen casi en el borde— escriben
                   sus nombres encima del vecino. `flex-row-reverse` mantiene
                   el mismo marcado y el mismo orden de lectura. */
                className={`group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 p-2 ${
                  destination.mapPosition.x > MAP_VIEWBOX.width * 0.66
                    ? "flex-row-reverse"
                    : ""
                }`}
                style={{
                  left: `${(destination.mapPosition.x / MAP_VIEWBOX.width) * 100}%`,
                  top: `${(destination.mapPosition.y / MAP_VIEWBOX.height) * 100}%`,
                }}
              >
                <span
                  className={`block size-2.5 rotate-45 border transition-all duration-500 ease-[var(--ease-out)] ${
                    isActive
                      ? "animate-point-pulse scale-125 border-terracotta bg-terracotta"
                      : "border-forest/60 bg-cream group-hover:border-terracotta group-hover:bg-terracotta/25"
                  }`}
                />
                <span
                  className={`text-[0.78rem] whitespace-nowrap transition-colors duration-300 ${
                    isActive
                      ? "font-semibold text-forest"
                      : "text-ink-soft group-hover:text-forest"
                  }`}
                >
                  {destination.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector en lista — la alternativa accesible en móvil */}
      <div className="lg:hidden">
        <p className="eyebrow mb-3 text-ink-faint">{t.chooseDestination}</p>
        <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {destinations.map((destination) => {
            const isActive = destination.slug === active.slug;
            return (
              <li key={destination.slug} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveSlug(destination.slug)}
                  aria-pressed={isActive}
                  className={`min-h-11 border px-4 py-2.5 text-[0.85rem] whitespace-nowrap transition-colors duration-300 ${
                    isActive
                      ? "border-terracotta-deep bg-terracotta-deep text-white"
                      : "border-rule text-ink-soft"
                  }`}
                >
                  {destination.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Ficha del destino */}
      <div className="lg:col-span-6 xl:col-span-5">
        {/* `key` fuerza el remontaje: la ficha entra con una transición suave
            en lugar de cambiar el texto de golpe. */}
        <article key={active.slug} className="animate-panel-in">
          <div className="relative aspect-3/2 overflow-hidden">
            <Image
              src={active.image.src}
              alt={active.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              placeholder="blur"
              blurDataURL={active.image.blurDataURL}
              className="object-cover"
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 bg-parchment/92 px-3 py-1.5">
              <CompassMark className="size-3.5 text-gold" needle={false} />
              <span className="tnum text-[0.68rem] tracking-[0.1em] text-forest">
                {active.coordinates}
              </span>
            </div>
          </div>

          <p className="eyebrow mt-6 text-terracotta-text">{active.region}</p>
          <h3 className="text-h2 mt-2.5 text-forest">{active.name}</h3>
          <p className="measure mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
            {active.description}
          </p>

          <dl className="mt-7 grid gap-x-8 gap-y-5 border-t border-rule pt-6 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-ink-faint">{t.bestTime}</dt>
              <dd className="mt-1.5 text-[0.92rem] text-forest">{active.bestTime}</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-faint">{t.wildlife}</dt>
              <dd className="mt-1.5 text-[0.92rem] text-forest">
                {active.wildlife.join(", ")}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="eyebrow text-ink-faint">{t.experiences}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {active.experiences.map((experience) => (
                  <Link
                    key={experience.slug}
                    href={localeHref(locale, `/experiences/${experience.slug}`)}
                    className="border border-rule px-3 py-1.5 text-[0.78rem] text-ink-soft transition-colors duration-300 hover:border-forest hover:text-forest"
                  >
                    {experience.name}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>

          {active.safaris.length > 0 && (
            <div className="mt-7 border-t border-rule pt-6">
              <p className="eyebrow text-ink-faint">{t.journeysHere}</p>
              <ul className="mt-3 flex flex-col divide-y divide-rule">
                {active.safaris.slice(0, 3).map((safari) => (
                  <li key={safari.slug}>
                    <Link
                      href={localeHref(locale, `/safaris/${safari.slug}`)}
                      className="flex items-baseline justify-between gap-4 py-3 transition-colors duration-300 hover:text-terracotta-text"
                    >
                      <span className="font-display text-[1.08rem] text-forest">
                        {safari.name}
                      </span>
                      <span className="tnum shrink-0 text-[0.8rem] text-ink-faint">
                        {safari.durationLabel}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={localeHref(locale, `/destinations/${active.slug}`)}
            className="mt-7 inline-flex text-[0.72rem] font-semibold tracking-[0.06em] text-forest uppercase underline decoration-forest/30 underline-offset-[6px] transition-colors duration-300 hover:text-terracotta-text hover:decoration-terracotta-text"
          >
            {active.moreOnLabel}
          </Link>
        </article>
      </div>
    </div>
  );
}
