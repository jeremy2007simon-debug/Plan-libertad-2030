"use client";

import { motion } from "framer-motion";

const NODES = [
  { label: "FRENOS", ref: "04", top: "6%", left: "78%", delay: 0.9 },
  { label: "TRANSMISIÓN", ref: "09", top: "32%", left: "94%", delay: 1.05 },
  { label: "SUSPENSIÓN", ref: "10", top: "70%", left: "88%", delay: 1.2 },
  { label: "ELECTRÓNICA", ref: "12", top: "88%", left: "58%", delay: 1.35 },
  { label: "ILUMINACIÓN", ref: "11", top: "4%", left: "30%", delay: 1.5 },
];

export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mx-auto aspect-square w-full max-w-[560px]"
    >
      <div className="absolute inset-[8%] rounded-full bg-blue/25 blur-[110px]" />

      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.circle
          cx="200"
          cy="200"
          r="168"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          strokeDasharray="2 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="rgba(127,162,255,0.35)"
          strokeWidth="1"
          animate={{ rotate: -360 }}
          transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <circle
          cx="200"
          cy="200"
          r="130"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />

        {/* aros de disco de freno, marca de fábrica del sector */}
        <circle cx="200" cy="200" r="92" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <circle cx="200" cy="200" r="68" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const x = (200 + Math.cos(angle) * 68).toFixed(2);
          const y = (200 + Math.sin(angle) * 68).toFixed(2);
          return (
            <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          );
        })}

        <motion.circle
          cx="200"
          cy="200"
          r="40"
          fill="rgba(37,99,255,0.12)"
          stroke="var(--blue-dim)"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />

        {NODES.map((node, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const x1 = (200 + Math.cos(angle) * 92).toFixed(2);
          const y1 = (200 + Math.sin(angle) * 92).toFixed(2);
          const x2 = (200 + Math.cos(angle) * 168).toFixed(2);
          const y2 = (200 + Math.sin(angle) * 168).toFixed(2);
          return (
            <motion.line
              key={node.ref}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: node.delay }}
            />
          );
        })}
      </motion.svg>

      {NODES.map((node) => (
        <motion.div
          key={node.ref}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-surface-border bg-bg/60 px-3 py-1.5 backdrop-blur-md"
          style={{ top: node.top, left: node.left }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: node.delay + 0.1 }}
        >
          <span className="font-mono text-[.62rem] text-blue-dim">{node.ref}</span>
          <span className="font-mono text-[.62rem] tracking-[0.1em] text-ink-dim uppercase">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
