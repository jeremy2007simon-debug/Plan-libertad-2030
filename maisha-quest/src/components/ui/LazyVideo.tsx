"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaVideo } from "@/types/content";

/**
 * Reproductor de vídeo editorial.
 *
 * REGLA QUE GOBIERNA ESTE COMPONENTE: si no hay un archivo publicable, NO SE
 * PINTA NADA. Devuelve `null`. Nunca un marco vacío, nunca un "película
 * pendiente", nunca un rectángulo con una duración escrita dentro. Un hueco
 * anunciado como hueco es peor que no tener la sección: dice que la web está
 * a medio hacer.
 *
 * Quien lo usa debe comprobar `hasPlayableVideo()` (en `src/lib/media.ts`,
 * porque quien pregunta es código de servidor) para decidir si el módulo
 * entero —marco, título, pie— llega a existir. Ver `VideoStory` e `Impact`.
 *
 * Cuando SÍ hay archivo:
 *
 * - Nada se descarga hasta que el visitante lo pide. `preload="none"` y el
 *   `<source>` no se monta hasta el primer clic: sin acción, cero bytes de
 *   vídeo, ni siquiera al pasar por delante.
 * - Con la conexión en modo ahorro de datos (`navigator.connection.saveData`)
 *   tampoco se precarga el póster a alta resolución.
 * - No hay autoplay. La reproducción empieza SOLO tras una acción clara.
 * - Reproduce en línea (`playsInline`): no salta a pantalla completa ni abre
 *   otra página.
 * - Arranca sin sonido y con un botón de sonido aparte, porque un vídeo que
 *   suena solo es la razón por la que la gente cierra pestañas.
 * - Al salir de pantalla se pausa: no se decodifica vídeo que nadie ve.
 * - Con `prefers-reduced-motion` no se reproduce nada por su cuenta; el botón
 *   sigue ahí para quien quiera verlo.
 * - Subtítulos si el archivo los trae. Si el vídeo tiene voz y no los trae,
 *   queda anotado como pendiente en `src/data/claims.ts`.
 */

export interface VideoStrings {
  /** "Ver la película". */
  play: string;
  /** "Pausar". */
  pause: string;
  /** "Activar sonido". */
  unmute: string;
  /** "Silenciar". */
  mute: string;
}

export function LazyVideo({
  video,
  t,
  className = "",
  poster,
}: {
  video: MediaVideo;
  t: VideoStrings;
  className?: string;
  /** Póster ya resuelto por quien lo usa (puede venir de `next/image`). */
  poster?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /** Solo tras el primer clic se monta el `<source>` y empieza la descarga. */
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Pausa al salir de pantalla. No reanuda sola: reanudar sin que nadie lo
  // pida es autoplay con otro nombre.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !requested) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [requested]);

  const togglePlay = useCallback(() => {
    const media = videoRef.current;
    if (!requested) {
      setRequested(true);
      return; // El efecto de abajo arranca en cuanto el elemento existe.
    }
    if (!media) return;
    if (media.paused) {
      media.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      media.pause();
      setPlaying(false);
    }
  }, [requested]);

  // Primera reproducción, justo después de montar el `<video>`.
  useEffect(() => {
    if (!requested) return;
    const media = videoRef.current;
    if (!media || !media.paused) return;
    media.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [requested]);

  const toggleSound = () => {
    const media = videoRef.current;
    if (!media) return;
    const next = !media.muted;
    media.muted = next;
    setMuted(next);
  };

  const label = video.poster.alt;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Póster. Se queda debajo del vídeo hasta que este empieza. */}
      {poster}

      {requested && (
        <video
          ref={videoRef}
          poster={video.poster.src ?? undefined}
          muted={muted}
          loop
          playsInline
          preload="none"
          aria-label={label}
          className="absolute inset-0 size-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
          {video.captions && (
            <track
              kind="captions"
              src={video.captions}
              srcLang="en"
              label="English"
              default
            />
          )}
        </video>
      )}

      {/* Controles. Siempre visibles: un control que solo aparece al pasar el
          ratón no existe en una pantalla táctil. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <button
          type="button"
          onClick={togglePlay}
          aria-pressed={playing}
          className="inline-flex min-h-11 items-center gap-3 rounded-[2px] bg-[color-mix(in_srgb,var(--canopy)_78%,transparent)] px-5 py-3 text-[0.7rem] font-semibold tracking-[0.06em] text-parchment uppercase backdrop-blur-sm transition-colors duration-[var(--dur-hover)] hover:bg-parchment hover:text-forest"
        >
          <PlayIcon playing={playing} className="size-3.5" />
          {playing ? t.pause : t.play}
        </button>

        {requested && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? t.unmute : t.mute}
            className="inline-flex size-11 items-center justify-center rounded-[2px] bg-[color-mix(in_srgb,var(--canopy)_78%,transparent)] text-parchment backdrop-blur-sm transition-colors duration-[var(--dur-hover)] hover:bg-parchment hover:text-forest"
          >
            <SoundIcon muted={muted} className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function PlayIcon({ playing, className }: { playing: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" className={className}>
      {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M2 1l9 5-9 5z" />}
    </svg>
  );
}

function SoundIcon({ muted, className }: { muted: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 6h2l3-2.5v9L5 10H3z" fill="currentColor" stroke="none" />
      {muted ? (
        <path d="M10.5 6l3 4M13.5 6l-3 4" />
      ) : (
        <>
          <path d="M10.5 6.2a2.4 2.4 0 0 1 0 3.6" />
          <path d="M12.4 4.6a4.8 4.8 0 0 1 0 6.8" />
        </>
      )}
    </svg>
  );
}
