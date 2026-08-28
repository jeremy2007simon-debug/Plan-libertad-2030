import { ButtonLink } from "@/components/ui/Button";
import { CompassMark } from "@/components/ui/Compass";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { ParallaxMedia } from "@/components/ui/motion";
import { CLIENT_PHOTOS } from "@/data/client-photography";
import { HOME_COORDINATES } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/messages/en";
import type { MediaVideo } from "@/types/content";

/**
 * Hero.
 *
 * Sin JavaScript: la entrada es CSS puro (opacidad y un desplazamiento corto,
 * escalonados) y la fotografía hace un zoom lentísimo con `transform`, así que
 * no hay reflow ni trabajo en el hilo principal. Con `prefers-reduced-motion`
 * todo queda quieto y colocado.
 *
 * El titular entra línea a línea, con las líneas definidas en el diccionario:
 * el corte es una decisión editorial de cada idioma, no un salto automático
 * que en alemán o en ruso caería en mitad de una palabra larga.
 *
 * El paralaje del fondo solo se activa en escritorio con puntero fino. En
 * móvil no hay ninguno: `background-attachment: fixed` no funciona en iOS y
 * un paralaje por scroll a esa altura de imagen se ve a tirones.
 *
 * La imagen lleva `priority`: es el LCP de la página y debe empezar a
 * descargarse en el primer viaje al servidor.
 *
 * VÍDEO: el cliente entregó dos vídeos verticales sin comprimir; ninguno sirve
 * como hero horizontal de escritorio (estirar un 1080×1920 a pantalla completa
 * se ve mal y pesa 45 MB). Cuando exista el montaje horizontal comprimido, se
 * pasa por la prop `video` y este componente lo reproduce sobre la fotografía,
 * que se queda como póster. Hasta entonces, foto real.
 */
export function Hero({
  locale,
  t,
  video,
}: {
  locale: Locale;
  t: Dictionary;
  video?: MediaVideo;
}) {
  // Fotografía del cliente: siluetas de fauna cruzando el horizonte al
  // atardecer. Su `objectPosition` mantiene el sol y las siluetas dentro del
  // recorte también en vertical, donde el hero pierde el 70 % del ancho.
  const image = CLIENT_PHOTOS["tanzania-wildlife-sunset-hero"];

  return (
    <section className="relative isolate flex min-h-[84svh] flex-col justify-end overflow-hidden bg-charcoal">
      {/* Fotografía */}
      <div className="absolute inset-0 -z-10">
        <ParallaxMedia strength={34} className="absolute -inset-y-12 inset-x-0">
          <div className="animate-hero-zoom absolute inset-0 origin-center">
            <Photo photo={image} priority sizes="100vw" />
          </div>
        </ParallaxMedia>
        {video?.mp4 && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={image.src}
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
          >
            {video.webm && <source src={video.webm} type="video/webm" />}
            <source src={video.mp4} type="video/mp4" />
          </video>
        )}
        {/* Dos velos cruzados: uno vertical que asienta el pie del encuadre y
            otro lateral bajo el texto. Juntos dan contraste AA sobre el cielo
            del amanecer sin bajar la fotografía a un gris plano. */}
        <div className="media-scrim absolute inset-0" />
        <div className="media-scrim-side absolute inset-0" />
        {/* Banda bajo la cabecera transparente. */}
        <div className="media-scrim-top absolute inset-x-0 top-0 h-[7.5rem]" />
        <div className="grain absolute inset-0" />
        {/* Transición hacia la siguiente sección: la fotografía se funde en el
            pergamino en lugar de terminar en un corte recto. Va dentro de esta
            capa (`-z-10`) para quedar por debajo del texto. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-[var(--page)] sm:h-32" />
      </div>

      <Container width="wide" className="pb-14 pt-32 sm:pb-20">
        <div className="max-w-3xl">
          <div className="animate-compass-in flex items-center gap-4">
            <CompassMark className="size-11 text-sand" />
            <span className="tnum text-[0.68rem] tracking-[0.22em] text-parchment uppercase">
              {HOME_COORDINATES.label}
            </span>
            {/* Línea de brújula: se dibuja desde el punto de coordenadas
                hacia el borde, como el rumbo trazado sobre una carta. */}
            <span
              aria-hidden="true"
              className="animate-compass-line hidden h-px flex-1 origin-left bg-linear-to-r from-sand/60 to-transparent sm:block"
            />
          </div>

          <h1 className="text-display mt-8 text-parchment">
            {t.home.hero.headline.map((line, index) => (
              /* Cada línea sube desde su propia máscara. El `overflow-hidden`
                 va en el contenedor y el movimiento en el hijo, para que la
                 animación no recorte los descendentes de la tipografía. */
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  className="animate-line-up block"
                  style={{ animationDelay: `${160 + index * 120}ms` }}
                >
                  {line}
                  {index < t.home.hero.headline.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-fade-up text-lede measure mt-6 text-parchment"
            style={{ animationDelay: "480ms" }}
          >
            {t.home.hero.subline}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "640ms" }}
          >
            <ButtonLink href="/plan" locale={locale} variant="primary" size="lg">
              {t.home.hero.designCta}
            </ButtonLink>
            <ButtonLink
              href="/safaris"
              locale={locale}
              variant="secondary"
              tone="dark"
              size="lg"
            >
              {t.home.hero.exploreCta}
            </ButtonLink>
          </div>

          <ul
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-5 gap-y-1.5 sm:gap-x-5"
            style={{ animationDelay: "800ms" }}
          >
            {t.home.hero.pillars.map(
              (item, index) => (
                <li key={item} className="flex items-center gap-3 sm:gap-5">
                  {index > 0 && (
                    <span aria-hidden="true" className="hidden text-sand/50 sm:inline">
                      ·
                    </span>
                  )}
                  <span className="eyebrow text-parchment">{item}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </Container>

      {/* Indicación de scroll: decorativa, oculta a lectores de pantalla. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 right-6 hidden flex-col items-center gap-3 sm:flex"
      >
        <span className="eyebrow [writing-mode:vertical-rl] text-parchment/80">
          {t.home.hero.scroll}
        </span>
        <span className="animate-scroll-hint h-10 w-px bg-linear-to-b from-parchment/60 to-transparent" />
      </div>
    </section>
  );
}
