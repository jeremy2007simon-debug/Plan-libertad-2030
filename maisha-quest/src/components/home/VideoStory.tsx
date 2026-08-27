import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PHOTOS } from "@/data/photography";
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
 * y rellenar `JOURNEY_FILM` abajo. `LazyVideo` ya se encarga del resto:
 * carga diferida, reproducción solo en pantalla, sin sonido, inline y
 * respetando `prefers-reduced-motion`.
 */
export const JOURNEY_FILM: MediaVideo = {
  mp4: null,
  webm: null,
  orientation: "portrait",
  durationSeconds: 36,
  poster: {
    src: null,
    alt: "A Maisha Quest journey through Tanzania",
  },
};

const THREADS = [
  { label: "Wildlife", note: "The plains, and what moves across them." },
  { label: "Culture", note: "Time with the people who live here." },
  { label: "Adventure", note: "On foot, on water, on the mountain." },
  { label: "Ocean", note: "Where the journey slows down." },
  { label: "Connection", note: "The reason any of it matters." },
];

export function VideoStory() {
  return (
    <section className="dark-section relative isolate overflow-hidden bg-forest-deep py-24 text-on-dark sm:py-32">
      {/* Fondo fotográfico muy atenuado: da profundidad sin competir. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25">
        <Photo photo={PHOTOS["serengeti-sunset-wide"]} alt="" sizes="100vw" />
        <div className="absolute inset-0 bg-forest-deep/70" />
      </div>

      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Vídeo vertical */}
          <Reveal className="lg:col-span-5">
            <div className="mx-auto w-full max-w-[22rem] lg:max-w-none">
              <LazyVideo
                video={JOURNEY_FILM}
                label="Watch the Journey"
                posterLabel="Maisha Quest journey film — vertical"
                tone="dark"
                className="relative aspect-9/16 w-full bg-charcoal"
              />
            </div>
          </Reveal>

          {/* Texto */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-sand">The film</p>
              <h2 className="text-h1 mt-5 text-ivory">
                One country. Endless ways to feel alive.
              </h2>

              <ul className="mt-10 flex flex-col divide-y divide-rule-on-dark border-y border-rule-on-dark">
                {THREADS.map((thread) => (
                  <li
                    key={thread.label}
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4"
                  >
                    <span className="font-display min-w-[7.5rem] text-[1.3rem] text-ivory">
                      {thread.label}
                    </span>
                    <span className="text-[0.92rem] text-on-dark-soft">
                      {thread.note}
                    </span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/experiences"
                variant="secondary"
                tone="dark"
                className="mt-9"
              >
                Explore experiences
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
