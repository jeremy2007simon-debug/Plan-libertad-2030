export function GlassCard({
  children,
  className = "",
  glow = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "gold" | "wine" | "none";
}) {
  const glowClass =
    glow === "gold"
      ? "hover:shadow-[0_30px_80px_-40px_var(--gold-glow)] hover:border-gold/25"
      : glow === "wine"
        ? "hover:shadow-[0_30px_80px_-40px_var(--wine-glow)] hover:border-wine/30"
        : "";

  return (
    <div
      className={`glass-panel rounded-sm transition-all duration-700 ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}
