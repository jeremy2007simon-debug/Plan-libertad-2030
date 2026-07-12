"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./ui/Icon";

const LINKS = [
  { href: "#experiencia", label: "Experiencia" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#galeria", label: "Galería" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-hair bg-bg/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="#top"
          className="font-display text-xl tracking-[0.08em] text-ink"
        >
          AZZ<span className="italic text-gold">URRO</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[.8rem] tracking-wide text-ink-dim transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#reservas"
            className="inline-flex items-center rounded-full bg-gold px-6 py-2.5 text-sm font-medium tracking-wide text-bg shadow-[0_8px_30px_-10px_var(--gold-glow)] transition-transform duration-500 hover:-translate-y-0.5"
          >
            Reservar mesa
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-ink md:hidden"
          aria-label="Abrir menú"
        >
          <Icon name="menu" className="size-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display text-xl text-ink">
                AZZ<span className="italic text-gold">URRO</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-ink"
                aria-label="Cerrar menú"
              >
                <Icon name="close" className="size-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-9">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="font-display text-3xl font-light text-ink"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#reservas"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-bg"
              >
                Reservar mesa
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
