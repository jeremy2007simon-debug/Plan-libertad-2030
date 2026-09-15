"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { useScrollLock } from "@/lib/useScrollLock";

export interface HeroFilmStrings {
  /** Nombre accesible del botón circular y del propio `<video>`. */
  play: string;
  /** Etiqueta visible junto al botón — 35 s reales, medidos sobre el archivo. */
  duration: string;
  close: string;
  loading: string;
  error: string;
  retry: string;
  watchAgain: string;
}

type Status = "loading" | "playing" | "error";

const MP4_SRC = "/video/optimized/maisha-quest-intro-v2.mp4";
const WEBM_SRC = "/video/optimized/maisha-quest-intro-v2.webm";

/**
 * Botón circular de la portada + reproductor del vídeo de 35 s bajo demanda.
 *
 * Sustituye a la introducción anterior (`src/components/intro/Intro.tsx`,
 * retirada): el cliente pidió que el vídeo dejara de ser un paso previo a la
 * portada —con o sin reproducción automática— y pasara a ser una invitación
 * explícita. Aquí la portada se ve y funciona de inmediato; el `<video>` no
 * existe en el DOM hasta el primer clic, así que no se descarga ni un byte
 * antes de eso, ni siquiera el póster: el botón es interfaz propia, no una
 * miniatura del vídeo.
 *
 * Controles nativos (`controls`) en vez de unos hechos a mano: dan pausa,
 * avance, volumen y pantalla completa accesibles por teclado sin reinventar
 * ninguno de los cuatro. Lo único que añade este componente es el cierre
 * —que el vídeo nativo no tiene— y los estados de carga, error y fin.
 *
 * El clic que abre el overlay es el mismo gesto de usuario que arranca la
 * reproducción con sonido: por eso empieza sin `muted`, a diferencia del
 * vídeo de fondo de la introducción anterior, que arrancaba solo y necesitaba
 * silenciarse para que el navegador lo permitiera.
 */
export function HeroFilmButton({ t }: { t: HeroFilmStrings }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cierre normal (Escape, botón de cierre) Y fin del vídeo comparten el
  // mismo fundido breve de 220 ms: la animación de la brújula que avanza
  // hacia la cámara vive solo en la entrada a la portada (`Intro.tsx`) —
  // repetirla aquí la duplicaría.
  const requestClose = useCallback(() => {
    if (closeTimer.current) return;
    setClosing(true);
    try {
      videoRef.current?.pause();
    } catch {
      // Un `pause()` sobre un elemento que todavía no ha cargado nada puede
      // lanzar en algún navegador; cerrar el overlay no depende de que tenga
      // éxito.
    }
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      setOpen(false);
      setClosing(false);
      // `{ preventScroll: true }`: sin esto, devolver el foco a un botón que
      // ha quedado fuera de la ventana (se abrió el vídeo, se hizo scroll, se
      // cerró) salta la página de vuelta a él — justo lo contrario de
      // "conserva la posición de scroll" que pide el encargo.
      triggerRef.current?.focus({ preventScroll: true });
    }, 220);
  }, []);

  const play = useCallback(() => {
    const media = videoRef.current;
    if (!media) return;
    setStatus("loading");
    media.currentTime = 0;
    media.play().catch(() => setStatus("error"));
  }, []);

  const retry = useCallback(() => {
    const media = videoRef.current;
    if (!media) return;
    setStatus("loading");
    media.load();
    media.play().catch(() => setStatus("error"));
  }, []);

  // Arranca en cuanto el <video> existe en el DOM — el propio montaje
  // condicional (`open &&` más abajo) es lo que retrasa la descarga hasta
  // este momento, nunca antes.
  useEffect(() => {
    if (!open) return;
    play();
  }, [open, play]);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    // `{ preventScroll: true }`: aunque el botón de cierre está siempre
    // dentro de la ventana (vive en un overlay `position: fixed`), enfocarlo
    // sin esto saltaba el documento de fondo hacia arriba igualmente —el
    // propio salto que `useScrollLock` existe para evitar.
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
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
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, requestClose]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <>
      <span className="inline-flex flex-col items-center gap-2.5">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setOpen(true);
            trackEvent("video_play");
          }}
          aria-haspopup="dialog"
          aria-label={`${t.play} — ${t.duration}`}
          className="mq-tap mq-hero-play"
        >
          <svg viewBox="0 0 24 24" className="mq-hero-play-icon size-6" aria-hidden="true">
            <path d="M8.5 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
          </svg>
        </button>
        {/* Visible, no solo en el `aria-label`: el encargo pide que el botón
            "indique su duración", no solo que lo anuncie a lectores de
            pantalla. */}
        <span aria-hidden="true" className="eyebrow text-[0.7rem] text-parchment/75">
          {t.duration}
        </span>
      </span>

      {/* Portal a `document.body`: el botón vive dentro de una fila con
          `.animate-fade-up` (entrada compartida del hero), y tras terminar su
          animación de entrada Chrome deja `transform` en una matriz identidad
          en vez del valor `none` — que basta para convertir esa fila en el
          "containing block" de cualquier descendiente `position: fixed`. Sin
          el portal, el overlay quedaría encajado en el hueco de esa fila en
          vez de cubrir la ventana entera. */}
      {open &&
        createPortal(
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.play}
            data-closing={closing || undefined}
            className="mq-video-modal"
            onClick={(event) => {
              if (event.target === event.currentTarget) requestClose();
            }}
          >
            <div className="mq-video-modal-frame">
              <video
                ref={videoRef}
                className="mq-video-modal-video"
                playsInline
                controls
                preload="none"
                aria-label={t.play}
                onPlaying={() => setStatus("playing")}
                onWaiting={() => setStatus("loading")}
                onError={() => setStatus("error")}
                onEnded={requestClose}
              >
                <source src={MP4_SRC} type="video/mp4" />
                <source src={WEBM_SRC} type="video/webm" />
              </video>

              {status === "loading" && (
                <div className="mq-video-modal-state" aria-live="polite">
                  <span className="mq-spinner text-2xl" aria-hidden="true" />
                  <p>{t.loading}</p>
                </div>
              )}

              {status === "error" && (
                <div className="mq-video-modal-state" role="alert">
                  <p>{t.error}</p>
                  <Button type="button" variant="secondary" tone="dark" size="md" onClick={retry}>
                    {t.retry}
                  </Button>
                </div>
              )}
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={requestClose}
              aria-label={t.close}
              className="mq-tap mq-icon-btn on-dark mq-video-modal-close"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                <path
                  d="m3 3 10 10M13 3 3 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
