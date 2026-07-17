"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlaceholderImage } from "./ui/PlaceholderImage";
import { Reveal } from "./ui/Reveal";
import { SectionLabel } from "./ui/SectionLabel";
import { Container } from "./ui/Container";
import { Icon } from "./ui/Icon";
import { useT } from "./i18n/LanguageProvider";

export function Galeria() {
  const t = useT();
  const items = t.galeria.items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + items.length) % items.length
      ),
    [items.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
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
    <section id="galeria" className="relative py-28 md:py-36">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <SectionLabel index="04" center>
              {t.galeria.label}
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-light text-ink text-balance">
              {t.galeria.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={(i % 6) * 0.05}>
              <button
                onClick={() => setOpenIndex(i)}
                className="group relative block w-full overflow-hidden rounded-[2px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracota"
                aria-label={t.galeria.expand(item.label)}
              >
                <div className="transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  <PlaceholderImage label={item.label} ratio={item.ratio} />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="p-4 text-xs tracking-wide text-cream">
                    {item.label}
                  </span>
                </div>
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 backdrop-blur-md p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-cream/70 transition-colors hover:text-cream"
              aria-label={t.galeria.close}
            >
              <Icon name="close" className="size-7" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 text-cream/60 transition-colors hover:text-cream md:left-8"
              aria-label={t.galeria.prev}
            >
              <Icon name="chevronLeft" className="size-8" />
            </button>

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <PlaceholderImage
                label={items[openIndex].label}
                ratio="4/5"
                tone="deep"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 text-cream/60 transition-colors hover:text-cream md:right-8"
              aria-label={t.galeria.next}
            >
              <Icon name="chevronRight" className="size-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
