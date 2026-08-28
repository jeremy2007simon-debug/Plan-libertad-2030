import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { ParallaxMedia } from "@/components/ui/motion";
import type { Photo as PhotoType } from "@/data/photography";
import type { ReactNode } from "react";

/**
 * Cabecera de página interior.
 *
 * Dos variantes: con fotografía a sangre (catálogos, destinos, safaris) y sin
 * ella (legales, FAQ). Mantiene el mismo ritmo tipográfico que la home para que
 * el interior no parezca otra web, que es lo que pasa hoy al entrar en las
 * páginas de paquetes.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  image?: PhotoType;
  /** Metadatos o acciones bajo la entradilla. */
  children?: ReactNode;
}) {
  if (!image) {
    return (
      <section className="texture-paper relative isolate border-b border-rule bg-page-alt pt-[calc(var(--header-h)+3.5rem)] pb-14">
        <Container width="wide">
          {eyebrow && <p className="eyebrow text-terracotta-text">{eyebrow}</p>}
          <h1 className="text-h1 mt-4 max-w-4xl text-forest">{title}</h1>
          {lede && (
            <p className="text-lede measure mt-6 text-ink-soft">{lede}</p>
          )}
          {children}
        </Container>
      </section>
    );
  }

  return (
    <section className="relative isolate flex min-h-[64svh] items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <ParallaxMedia strength={22} className="absolute -inset-y-8 inset-x-0">
          <Photo photo={image} alt="" sizes="100vw" priority className="scale-105" />
        </ParallaxMedia>
        <div className="media-scrim absolute inset-0" />
        <div className="media-scrim-side absolute inset-0" />
        <div className="media-scrim-top absolute inset-x-0 top-0 h-[7.5rem]" />
        <div className="grain absolute inset-0" />
        {/* Salida en degradado hacia la sección siguiente, no un corte recto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-[var(--page)]"
        />
      </div>

      <Container width="wide" className="pt-[calc(var(--header-h)+5rem)] pb-14">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-sand">{eyebrow}</p>}
          <h1 className="text-display mt-4 overflow-hidden text-parchment">
            <span className="animate-line-up block">{title}</span>
          </h1>
          {lede && (
            <p className="text-lede measure mt-5 text-parchment">{lede}</p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
