import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { hasPlayableVideo } from "@/lib/media";
import { Photo } from "@/components/ui/Photo";
import { AnimatedLine, ImageReveal, TitleLines, Reveal, Stagger } from "@/components/ui/motion";
import { PHOTOS } from "@/data/photography";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import type { MediaVideo } from "@/types/content";

/**
 * "One country. Endless ways to feel alive."
 *
 * Bloque editorial construido alrededor del vídeo VERTICAL del cliente
 * ("WhatsApp Video 2026-08-27 at 16.07.30.mp4": 36 s, 1080×1920, ~45,5 MB —
 * arco, paisaje, playa, safari con elefantes y cierre de marca).
 *
 * Se usa en su proporción nativa 9:16, apoyado en fotografía a los lados. No
 * se estira como hero horizontal: un 1080×1920 recortado a pantalla completa
 * de escritorio pierde casi todo el encuadre.
 *
 * El archivo TODAVÍA NO ESTÁ en el repositorio y no debe subirse con su peso
 * actual. Para publicarlo:
 *
 *   ffmpeg -i original.mp4 -vf scale=720:-2 -c:v libx264 -crf 26 -preset slow \
 *          -movflags +faststart -an public/video/journey.mp4
 *   ffmpeg -i original.mp4 -vf scale=720:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 \
 *          -an public/video/journey.webm
 *   ffmpeg -i original.mp4 -ss 2 -frames:v 1 public/video/journey-poster.jpg
 *
 * y rellenar `JOURNEY_FILM` abajo. `LazyVideo` ya se encarga del resto.
 *
 * MIENTRAS TANTO NO SE PINTA NINGÚN MARCO. Antes había un rectángulo 9:16 con
 * la leyenda "Film to follow" y la duración escrita dentro; por bien resuelto
 * que estuviera, decía que la web está a medio hacer. Sin archivo, la sección
 * se recompone: el texto pasa a dos columnas sobre la fotografía de fondo, que
 * ya existía, y no queda ni un hueco.
 *
 * El día que `JOURNEY_FILM.mp4` tenga ruta, el vídeo aparece en su columna sin
 * tocar nada más: la condición ya está escrita.
 */
export const JOURNEY_FILM: MediaVideo = {
  mp4: null,
  webm: null,
  orientation: "portrait",
  durationSeconds: 36,
  poster: {
    src: null,
    altKey: "journey-film-poster",
  },
};

export function VideoStory({ locale, t }: { locale: Locale; t: Dictionary }) {
  const threads = t.home.film.threads;
  const showFilm = hasPlayableVideo(JOURNEY_FILM);
  return (
    <section className="dark-section relative isolate overflow-hidden bg-canopy py-20 text-on-dark sm:py-24">
      {/* Fondo fotográfico muy atenuado: da profundidad sin competir. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25">
        <Photo photo={PHOTOS["tarangire-baobab"]} alt="" sizes="100vw" />
        <div className="absolute inset-0 bg-canopy/70" />
      </div>
      {/* Halo cálido detrás del vídeo: una sola luz muy abierta, del color de
          la hora dorada. Es un degradado radial, no un filtro — no cuesta
          repintados y no se nota en móvil. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-[46rem] w-[46rem] -translate-x-1/3 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(196,147,79,0.16),transparent_62%)] lg:left-[18%] lg:top-1/2"
      />

      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Vídeo vertical. Solo existe si existe el archivo.

              En escritorio se queda como pieza vertical junto al texto, en su
              proporción nativa. En móvil ocupa el ancho completo con un techo
              de altura: un 9:16 a 390 px son 693 px, casi una pantalla entera
              para un solo elemento. */}
          {showFilm && (
            <ImageReveal className="mx-auto w-full max-w-[15rem] sm:max-w-[17rem] lg:col-span-5 lg:max-w-[20rem]">
              <div className="w-full">
                <LazyVideo
                  video={JOURNEY_FILM}
                  t={{
                    play: t.home.film.watch,
                    pause: t.video.pause,
                    unmute: t.video.unmute,
                    mute: t.video.mute,
                    label: t.video.label,
                  }}
                  className="relative aspect-9/16 w-full bg-charcoal"
                />
              </div>
            </ImageReveal>
          )}

          {/* Texto */}
          <div className={showFilm ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-8 lg:col-start-3"}>
            <Reveal>
              <p className="eyebrow text-sand">{t.home.film.eyebrow}</p>
              <h2 className="text-h1 mt-5 text-parchment">
                <TitleLines text={t.home.film.title} />
              </h2>
            </Reveal>

            <AnimatedLine tone="gold" className="mt-8 max-w-[12rem]" delay={0.12} />

            {/* Wildlife, Culture, Adventure, Ocean y Connection entran una a
                una, con 90 ms entre ellas: es lo que hace que se lean como
                cinco ideas y no como una lista. */}
            <ul
              className={`mt-8 border-b border-rule-on-dark ${
                showFilm
                  ? "flex flex-col divide-y divide-rule-on-dark"
                  : /* Cinco hilos en dos columnas dejan al último solo en su
                       fila; sin `col-span-2` su filete se cortaba a media
                       anchura y parecía un error de maquetación. */
                    "grid divide-y divide-rule-on-dark sm:grid-cols-2 sm:divide-y-0 sm:[&>*]:border-t sm:[&>*]:border-rule-on-dark sm:[&>*:last-child]:col-span-2"
              }`}
            >
              <Stagger as="li" step={0.09}>
                {threads.map((thread) => (
                  <span
                    key={thread.label}
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4"
                  >
                    <span className="font-display min-w-[7.5rem] text-[1.3rem] text-parchment">
                      {thread.label}
                    </span>
                    <span className="text-[0.92rem] text-on-dark-soft">
                      {thread.note}
                    </span>
                  </span>
                ))}
              </Stagger>
            </ul>

            <Reveal delay={0.2}>
              <ButtonLink
                href="/experiences"
                locale={locale}
                variant="secondary"
                tone="dark"
                className="mt-8"
              >
                {t.home.film.cta}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
