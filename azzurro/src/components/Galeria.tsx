"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY_PLACEHOLDERS } from "@/lib/constants";
import { PlaceholderPanel } from "./ui/PlaceholderPanel";
import { Reveal } from "./ui/Reveal";
import { SectionIntro } from "./ui/SectionIntro";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";

export function Galeria() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null
          ? null
          : (i - 1 + GALLERY_PLACEHOLDERS.length) % GALLERY_PLACEHOLDERS.length
      ),
    []
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i + 1) % GALLERY_PLACEHOLDERS.length
      ),
    []
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, prev, next]);

  return (
    <section id="galeria" className="relative py-28 md:py-40">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionIntro index="03" center>
              Galería
            </SectionIntro>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-balance font-display text-[clamp(2rem,4.2vw,3.2rem)] font-light text-ink">
              Un vistazo a la casa
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {GALLERY_PLACEHOLDERS.map((item, i) => (
            <Reveal
              key={item.label}
              delay={(i % 6) * 0.05}
              className={
                i === 0
                  ? "col-span-2 md:col-span-4 md:row-span-2"
                  : "md:col-span-2"
              }
            >
              <button
                onClick={() => setOpenIndex(i)}
                className="group relative block h-full w-full overflow-hidden rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                aria-label={`Ampliar imagen: ${item.label}`}
              >
                <div className="h-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
                  <PlaceholderPanel
                    ratio={i === 0 ? "16/10" : item.ratio}
                    className="h-full"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="flex items-center gap-2 p-5 text-xs tracking-[0.14em] text-ink uppercase">
                    {item.label}
                  </span>
                </div>
                <span className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-ink opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                  <Icon name="arrowUpRight" className="size-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-6 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={close}
              className="absolute right-6 top-6 text-ink/70 transition-colors hover:text-ink"
              aria-label="Cerrar"
            >
              <Icon name="close" className="size-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 text-ink/60 transition-colors hover:text-ink md:left-8"
              aria-label="Imagen anterior"
            >
              <Icon name="chevronLeft" className="size-8" />
            </button>

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <PlaceholderPanel
                label={GALLERY_PLACEHOLDERS[openIndex].label}
                ratio="4/5"
                tone="gold"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 text-ink/60 transition-colors hover:text-ink md:right-8"
              aria-label="Imagen siguiente"
            >
              <Icon name="chevronRight" className="size-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
