import { Icon } from "./Icon";

// Bloque de imagen provisional: mantiene la proporción y el aspecto premium
// de la web mientras no hay fotografía real. Para sustituirlo, reemplaza
// este componente por <Image src="/images/..." alt="..." fill /> de
// next/image en el lugar donde se usa.

export function PlaceholderImage({
  label,
  ratio = "4/5",
  className = "",
  tone = "warm",
}: {
  label: string;
  ratio?: string;
  className?: string;
  tone?: "warm" | "deep";
}) {
  const gradient =
    tone === "warm"
      ? "from-[#2a1f14] via-[#171310] to-[#0a0908]"
      : "from-[#1a1613] via-[#100e0c] to-[#050403]";

  return (
    <div
      className={`relative overflow-hidden rounded-[2px] bg-gradient-to-br ${gradient} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-dim-2">
        <Icon name="camera" className="size-6 opacity-60" />
        <span className="px-6 text-center text-[.7rem] tracking-[0.14em] uppercase opacity-70">
          {label}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
    </div>
  );
}
