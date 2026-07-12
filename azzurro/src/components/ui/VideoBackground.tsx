"use client";

import { motion } from "framer-motion";

// Fondo de vídeo del hero. Pasa `src` cuando haya un vídeo institucional
// real (grabado o de producción) y se reproducirá en bucle, silenciado,
// como fondo. Mientras no exista, se muestra un fondo cinematográfico
// generado — degradados en movimiento lento + grano — para no depender
// de fotografía de stock genérica que no representa el local real.

export function VideoBackground({ src }: { src?: string }) {
  if (src) {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src={src}
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <motion.div
        aria-hidden
        className="absolute -inset-[15%]"
        style={{
          background:
            "radial-gradient(45% 40% at 25% 30%, rgba(182,138,78,0.16), transparent 65%), radial-gradient(40% 45% at 80% 70%, rgba(107,31,42,0.18), transparent 65%), radial-gradient(60% 60% at 50% 100%, rgba(255,255,255,0.03), transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grain-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,transparent,rgba(0,0,0,0.55))]" />
    </div>
  );
}
