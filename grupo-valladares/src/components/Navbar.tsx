"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex size-8 items-center justify-center rounded-md border border-surface-border bg-surface">
            <span className="size-2 rounded-[2px] bg-blue transition-transform duration-500 group-hover:scale-125" />
          </span>
          <span className="font-display text-[.95rem] font-semibold tracking-tight text-ink">
            GRUPO <span className="text-blue-dim">VALLADARES</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[.84rem] font-medium text-ink-dim transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:"
            className="text-[.84rem] font-medium text-ink-dim transition-colors duration-300 hover:text-ink"
          >
            Localizar tienda
          </a>
          <a
            href="#presupuesto"
            className="group inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_30px_-10px_var(--blue-glow)] transition-transform duration-500 hover:-translate-y-0.5"
          >
            Solicitar presupuesto
            <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-ink lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="size-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display text-[.95rem] font-semibold tracking-tight text-ink">
                GRUPO <span className="text-blue-dim">VALLADARES</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-ink"
                aria-label="Cerrar menú"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-medium tracking-tight text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#presupuesto"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue px-8 py-3.5 text-sm font-medium text-white"
              >
                Solicitar presupuesto
                <ArrowRight className="size-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
