"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsappHref, WHATSAPP_MESSAGE } from "@/lib/site";

/**
 * Barra de acción persistente en móvil.
 *
 * Aparece al pasar el hero para no tapar la primera pantalla, y desaparece en
 * el propio planificador —donde estorbaría al formulario— y en el pie.
 *
 * WhatsApp va aquí, integrado: mismo peso tipográfico que el resto de la
 * barra, sin burbuja verde flotante. Es el canal que de verdad usa un viajero
 * para preguntar algo rápido, pero no tiene por qué gritar.
 */
export function MobileCTABar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/plan") return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-rule-on-dark/30 bg-forest/97 backdrop-blur-md transition-transform duration-500 ease-out lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Fuera de pantalla no debe ser alcanzable con el tabulador.
      {...(visible ? {} : { inert: "" as unknown as boolean })}
    >
      <div className="flex items-stretch gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href="/plan"
          className="flex min-h-12 flex-1 items-center justify-center rounded-[2px] bg-terracotta px-5 text-[0.72rem] font-semibold tracking-[0.06em] text-white uppercase"
        >
          Plan My Safari
        </Link>
        <a
          href={whatsappHref(WHATSAPP_MESSAGE.en)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Maisha Quest on WhatsApp"
          className="flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-on-dark-faint px-4 text-[0.72rem] font-semibold tracking-[0.06em] text-ivory uppercase"
        >
          <WhatsAppGlyph className="size-4" />
          Chat
        </a>
      </div>
    </div>
  );
}

/** Glifo monocromo: hereda el color del texto, sin el verde de la marca. */
export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 0a8 8 0 0 0-6.9 12L0 16l4.1-1.1A8 8 0 1 0 8 0Zm0 1.5A6.5 6.5 0 1 1 4.6 13.6l-.3-.2-2.4.6.6-2.3-.2-.3A6.5 6.5 0 0 1 8 1.5Zm-2.6 3c-.2 0-.4 0-.6.3-.2.2-.8.7-.8 1.8s.8 2.1.9 2.2c.1.2 1.5 2.4 3.8 3.3 1.9.7 2.3.6 2.7.5.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.5-.3-1.4-.7c-.2 0-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.9-2.5c-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.4l-.7-1.6c-.1-.4-.3-.4-.4-.4h-.5Z" />
    </svg>
  );
}
