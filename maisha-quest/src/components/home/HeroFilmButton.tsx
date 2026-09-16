"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
const POSTER_SRC = "/video/optimized/maisha-quest-intro-v2-poster.webp";

/**
 * Botón circular de la portada + reproductor del vídeo de 35 s bajo demanda.
 *
 * Es una invitación explícita, no un paso previo a la portada: el vídeo
 * completo (con su audio) es opcional y vive detrás de este botón, aparte
 * de la animación de entrada de la propia portada (`Intro.tsx`, que no
 * reproduce nada, solo revela el hero). La portada se ve y funciona de
 * inmediato.
 *
 * `play()` se llama de forma SÍNCRONA dentro del propio `onClick` del botón,
 * no en un efecto que reacciona al estado `open`. Con `open &&` montando el
 * `<video>` recién en el clic, `videoRef.current` no existe todavía en ese
 * instante: la llamada real a `.play()` quedaba en un efecto que React
 * ejecuta un instante después de que el DOM se actualice. La mayoría de
 * navegadores lo toleran iguel, pero algunos —notablemente Safari, con su
 * política de activación de usuario más estricta— pueden dejar de considerar
 * eso "resultado directo" del gesto y bloquear la reproducción con sonido en
 * silencio. Por eso el `<video>` vive montado de forma permanente (oculto
 * por CSS mientras `open` es `false`, no desmontado) desde que el componente
 * termina de hidratarse: así `.play()` se invoca en la misma pila de
 * llamadas que el propio clic, sin ningún salto de turno de por medio.
 * `preload="none"` sigue impidiendo cualquier descarga del archivo de vídeo
 * hasta esa llamada — un `<video>` montado y oculto no descarga nada por sí
 * solo, la descarga la dispara `.play()`/`.load()`, no el montaje.
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
/** No cambia tras el primer render: basta un snapshot fijo por lado. */
function subscribeNever() {
  return () => {};
}

export function HeroFilmButton({ t }: { t: HeroFilmStrings }) {
  // Evita renderizar el portal en el servidor, donde `document` no existe:
  // antes lo evitaba el propio `open &&` (siempre falso en el primer
  // render); ahora que el portal ya no depende de `open`, hace falta esta
  // comprobación aparte. `useSyncExternalStore` en vez de un efecto que
  // llama a `setState`: evita el render en cascada que eso provoca, para
  // un valor que de todas formas nunca vuelve a cambiar tras montar.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
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
    const media = videoRef.current;
    try {
      media?.pause();
    } catch {
      // Un `pause()` sobre un elemento que todavía no ha cargado nada puede
      // lanzar en algún navegador; cerrar el overlay no depende de que tenga
      // éxito.
    }
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null;
      setOpen(false);
      setClosing(false);
      try {
        // El `<video>` ya no se desmonta al cerrar (ver docblock): `load()`
        // es lo que de verdad libera el búfer decodificado y las conexiones
        // de red, dejándolo otra vez en el estado de `preload="none"" — sin
        // esto, un elemento que sigue montado podría retener el vídeo
        // decodificado en memoria aunque esté en pausa y oculto.
        media?.load();
      } catch {
        // Ídem: `load()` no tiene por qué tener éxito para que el overlay
        // se cierre.
      }
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
            // `play()` primero, en la misma pila de llamadas que el clic:
            // ver el docblock del componente. `setOpen` puede ir después,
            // ya diferido por React, sin perder el gesto.
            play();
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
      {mounted &&
        createPortal(
          <div
            ref={overlayRef}
            // Solo diálogo mientras está realmente abierto: el contenedor
            // vive montado de forma permanente (ver el docblock del
            // componente), pero un elemento oculto con `role="dialog"` fijo
            // seguiría respondiendo a `querySelector('[role="dialog"]')` en
            // cualquier otro sitio de la página —un `display: none` no
            // protege de eso, solo del árbol de accesibilidad— y podía
            // confundirse con un diálogo de verdad abierto en otro
            // componente (así se detectó: rompía la prueba del menú del
            // sitio, no algo hipotético).
            role={open ? "dialog" : undefined}
            aria-modal={open ? "true" : undefined}
            aria-label={open ? t.play : undefined}
            data-open={open || undefined}
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
                poster={POSTER_SRC}
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
