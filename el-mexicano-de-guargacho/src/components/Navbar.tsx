"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./ui/Icon";
import { useT } from "./i18n/LanguageProvider";
import { LanguageSwitcher } from "./i18n/LanguageSwitcher";

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El header flota transparente sobre el Hero (foto oscura) al principio,
  // y se vuelve sólido sobre el resto de la web (fondo arena claro) al
  // hacer scroll — el texto tiene que seguir leyéndose en ambos casos.
  const textClass = scrolled ? "text-ink" : "text-cream";
  const dimClass = scrolled
    ? "text-ink-dim hover:text-ink"
    : "text-cream-dim hover:text-cream";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-hair"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="#top"
          className={`font-display text-lg tracking-wide transition-colors duration-500 ${textClass}`}
        >
          El <span className="text-terracota italic">Mexicano</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[.85rem] transition-colors duration-300 ${dimClass}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher variant={scrolled ? "onLight" : "onDark"} />

          <a
            href="#reservas"
            className="hidden items-center rounded-full bg-cta px-6 py-2.5 text-sm font-semibold text-cream shadow-[0_8px_30px_-10px_var(--cta-glow)] transition-transform duration-500 hover:-translate-y-0.5 md:inline-flex"
          >
            {t.nav.reserve}
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`transition-colors duration-500 md:hidden ${textClass}`}
            aria-label={t.nav.openMenu}
          >
            <Icon name="menu" className="size-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display text-lg text-ink">
                El <span className="text-terracota italic">Mexicano</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-ink"
                aria-label={t.nav.closeMenu}
              >
                <Icon name="close" className="size-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {t.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservas"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center rounded-full bg-cta px-8 py-3.5 text-sm font-semibold text-cream"
              >
                {t.nav.reserve}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
