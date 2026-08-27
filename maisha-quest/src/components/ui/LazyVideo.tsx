"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaVideo } from "@/types/content";
import { CompassMark } from "./Compass";
import { MediaFrame } from "./Photo";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Reproductor de vídeo editorial.
 *
 * Los vídeos del cliente llegan en vertical y sin comprimir (uno de ~45 MB).
 * Este componente está construido para no cargar nunca ese peso de más:
 *
 * - No pide el vídeo hasta que la sección se acerca a la pantalla
 *   (IntersectionObserver + `preload="none"`).
 * - Reproduce solo mientras está visible; al salir, pausa y libera decodificación.
 * - Sin sonido y `playsInline`: nada arranca con audio ni salta a pantalla completa.
 * - Ofrece WebM antes que MP4 y usa el póster como primer fotograma.
 * - Con `prefers-reduced-motion` no reproduce nada: se queda el póster y el
 *   botón para verlo a petición.
 * - Si aún no hay archivo (`mp4: null`), muestra el póster o su hueco y anuncia
 *   el vídeo como pendiente, sin romper la sección.
 */
export function LazyVideo({
  video,
  label,
  posterLabel,
  className = "",
  tone = "dark",
}: {
  video: MediaVideo;
  /** Texto del botón de reproducción. */
  label: string;
  /** Descripción del hueco de póster si tampoco hay póster todavía. */
  posterLabel: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [nearViewport, setNearViewport] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const hasFile = Boolean(video.mp4 || video.webm);

  // Carga diferida: nada de red hasta acercarse a la pantalla.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !hasFile) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasFile]);

  // Reproduce solo mientras está a la vista; pausa al salir.
  useEffect(() => {
    const el = containerRef.current;
    const media = videoRef.current;
    if (!el || !media || !nearViewport || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          media.play().then(
            () => setPlaying(true),
            // Autoplay bloqueado por el navegador: el botón sigue disponible.
            () => setPlaying(false),
          );
        } else {
          media.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [nearViewport, reduced]);

  const handleButton = () => {
    const media = videoRef.current;
    if (!media) return;
    setShowControls(true);
    if (media.paused) {
      media.muted = false;
      media.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      media.pause();
      setPlaying(false);
    }
  };

  const dark = tone === "dark";

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {hasFile && nearViewport ? (
        <video
          ref={videoRef}
          poster={video.poster.src ?? undefined}
          muted
          loop
          playsInline
          preload="none"
          controls={showControls}
          aria-label={video.poster.alt}
          className="absolute inset-0 size-full object-cover"
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
          {video.captions && (
            <track kind="captions" src={video.captions} srcLang="en" label="English" default />
          )}
        </video>
      ) : video.poster.src ? (
        <MediaFrame
          media={video.poster}
          label={posterLabel}
          tone={tone}
          sizes="(max-width: 768px) 100vw, 40vw"
          className="absolute inset-0"
        />
      ) : (
        /* Marco de película a la espera del montaje.
           Antes esto era el hueco genérico de imagen, que en 9:16 dejaba un
           rectángulo enorme y mudo. Con el filete interior y la duración
           anunciada se lee como un fotograma reservado, no como un error. */
        <div
          role="img"
          aria-label={`${posterLabel} — film to follow`}
          className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
            dark ? "bg-forest-deep text-on-dark-faint" : "bg-sand/25 text-ink-faint"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-4 border ${
              dark ? "border-on-dark-faint/25" : "border-rule"
            }`}
          />
          <CompassMark
            className={`size-8 ${dark ? "text-sand/45" : "text-gold/50"}`}
            needle={false}
          />
          <span className="eyebrow max-w-[20ch] px-6 text-center leading-relaxed">
            {posterLabel}
          </span>
          {video.durationSeconds && (
            <span className="tnum text-[0.7rem] tracking-[0.14em]">
              {Math.floor(video.durationSeconds / 60)}:
              {String(video.durationSeconds % 60).padStart(2, "0")}
            </span>
          )}
        </div>
      )}

      {/* Botón de reproducción. Si no hay archivo, informa en lugar de mentir. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
        {hasFile ? (
          <button
            type="button"
            onClick={handleButton}
            className={`inline-flex min-h-11 items-center gap-3 rounded-[2px] px-5 py-3 text-[0.7rem] font-semibold tracking-[0.06em] uppercase backdrop-blur-sm transition-colors duration-300 ${
              dark
                ? "bg-ivory/12 text-ivory hover:bg-ivory hover:text-forest"
                : "bg-forest/85 text-ivory hover:bg-forest"
            }`}
          >
            <PlayIcon playing={playing} className="size-3.5" />
            {playing ? "Pause" : label}
          </button>
        ) : (
          <p
            className={`eyebrow rounded-[2px] px-3 py-2 ${
              dark ? "bg-forest-deep/70 text-on-dark-faint" : "bg-ivory/85 text-ink-faint"
            }`}
          >
            Film to follow
          </p>
        )}
        {video.durationSeconds && hasFile && (
          <span
            className={`tnum text-[0.7rem] tracking-[0.12em] ${
              dark ? "text-on-dark-faint" : "text-ink-faint"
            }`}
          >
            {Math.floor(video.durationSeconds / 60)}:
            {String(video.durationSeconds % 60).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}

function PlayIcon({ playing, className }: { playing: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" className={className}>
      {playing ? (
        <path d="M2 1h3v10H2zM7 1h3v10H7z" />
      ) : (
        <path d="M2 1l9 5-9 5z" />
      )}
    </svg>
  );
}
