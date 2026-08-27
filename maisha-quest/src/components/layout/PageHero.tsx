import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
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
      <section className="border-b border-rule bg-page-alt pt-[calc(var(--header-h)+3.5rem)] pb-16">
        <Container width="wide">
          {eyebrow && <p className="eyebrow text-terracotta">{eyebrow}</p>}
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
    <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-charcoal">
      <div className="absolute inset-0 -z-10">
        <Photo photo={image} alt="" sizes="100vw" priority className="scale-105" />
        <div className="media-scrim absolute inset-0" />
        <div className="media-scrim-side absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

      <Container width="wide" className="pt-[calc(var(--header-h)+5rem)] pb-14">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-sand">{eyebrow}</p>}
          <h1 className="text-display mt-4 text-ivory">{title}</h1>
          {lede && (
            <p className="text-lede measure mt-5 text-ivory/85">{lede}</p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
