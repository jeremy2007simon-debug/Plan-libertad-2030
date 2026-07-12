// Placeholder premium para los huecos de fotografía. En vez de una caja
// gris con un icono de cámara, es un panel con degradado de marca, grano
// sutil y el monograma "A" en filigrana — pensado para sostener el tono
// de la web mientras no hay fotografía real. Para sustituirlo, cambia el
// lugar donde se usa por <Image src="/images/..." alt="..." fill /> de
// next/image.

export function PlaceholderPanel({
  label,
  ratio = "4/5",
  className = "",
  tone = "graphite",
}: {
  label?: string;
  ratio?: string;
  className?: string;
  tone?: "graphite" | "wine" | "gold";
}) {
  const gradient =
    tone === "wine"
      ? "from-[#2a1015] via-[#120809] to-[#060606]"
      : tone === "gold"
        ? "from-[#241b0e] via-[#141009] to-[#060606]"
        : "from-[#1c1d1f] via-[#101112] to-[#060606]";

  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${gradient} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="grain-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 30% 20%, rgba(182,138,78,0.16), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-[clamp(3rem,9vw,6rem)] font-light italic text-white/[0.05] select-none">
          A
        </span>
      </div>
      {label && (
        <span className="absolute bottom-4 left-4 text-[.65rem] tracking-[0.18em] text-ink-dim-2 uppercase opacity-70">
          {label}
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
    </div>
  );
}
