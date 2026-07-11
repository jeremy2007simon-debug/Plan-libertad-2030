"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Adelanto visual de NovaCore Assistant (ver src/lib/roadmap.ts). No es
// funcional: comunica que la plataforma está preparada para incorporar
// atención por IA en una fase posterior.
export function NovaCoreTeaser() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 z-40 hidden md:block">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-64 rounded-2xl border border-surface-border bg-bg-elevated/95 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <p className="font-display text-sm font-medium tracking-tight text-ink">
              NovaCore Assistant
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-dim">
              Atención por IA para resolver dudas técnicas al instante.
              Próximamente en esta plataforma.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="NovaCore Assistant — próximamente"
        className="group flex items-center gap-2.5 rounded-full border border-surface-border bg-bg-elevated/90 py-3 pr-4 pl-3.5 text-ink shadow-[0_10px_35px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-blue-dim/40"
      >
        <span className="relative flex size-6 items-center justify-center rounded-full bg-blue/15 text-blue-dim">
          <Sparkles className="size-3.5" strokeWidth={1.6} />
        </span>
        <span className="text-xs font-medium">
          NovaCore Assistant
          <span className="ml-1.5 text-ink-dim-2">· próximamente</span>
        </span>
      </button>
    </div>
  );
}
