"use client";

import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { Icon } from "./ui/Icon";
import { useT } from "./i18n/LanguageProvider";

// Foto de stock provisional servida directamente desde Unsplash (licencia
// libre de uso comercial) — no es una foto real del restaurante. Ver
// public/images/CREDITOS.md para el crédito y el criterio de sustitución.
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1783451730116-7e9c994850a4?fm=jpg&q=80&w=2400&fit=crop";

// Fondo del hero preparado para vídeo cinematográfico: en cuanto haya
// material de vídeo real, sustituye este <Image> por un <video autoPlay
// muted loop playsInline poster={HERO_IMAGE_URL}> apuntando a
// /videos/hero.mp4 — el resto de la sección (overlays, texto) no
// necesita cambios.
//
// Nota de color: esta sección usa --carbon/--cream (tonos fijos, ver
// globals.css) en vez de --bg/--ink a propósito, para que el Hero se siga
// viendo exactamente igual sin importar el cambio de paleta clara/oscura
// del resto de la web.
export function Hero() {
  const t = useT();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_URL}
          alt=""
          fill
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon/75 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 pb-24 pt-40 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="flex items-center gap-3 text-[.72rem] font-semibold tracking-[0.3em] text-cream-dim uppercase">
              <span className="h-px w-8 bg-terracota" />
              {t.hero.kicker}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.03] font-light text-cream text-balance">
              {t.hero.titleLine1}
              <br />
              <span className="italic text-terracota">{t.hero.titleLine2}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-lg text-lg text-cream-dim">
              {t.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href="#reservas"
                className="group inline-flex items-center gap-2.5 rounded-full bg-cta px-8 py-4 text-sm font-semibold tracking-wide text-cream shadow-[0_10px_40px_-12px_var(--cta-glow)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_55px_-10px_var(--cta-glow)]"
              >
                {t.hero.reserve}
                <Icon
                  name="arrowRight"
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#especialidades"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold tracking-wide text-cream transition-all duration-500 hover:-translate-y-0.5 hover:border-terracota/50 hover:text-terracota"
              >
                {t.hero.viewMenu}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream-dim-2 md:flex">
        <span className="text-[.65rem] tracking-[0.25em] uppercase">
          {t.hero.scroll}
        </span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-terracota to-transparent" />
      </div>
    </section>
  );
}
