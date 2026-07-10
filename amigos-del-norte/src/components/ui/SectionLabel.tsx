export function SectionLabel({
  index,
  children,
  light = false,
  center = false,
}: {
  index?: string;
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[.72rem] font-semibold tracking-[0.28em] uppercase ${
        light ? "text-ink/70" : "text-ink-dim"
      } ${center ? "justify-center" : ""}`}
    >
      <span className="h-px w-6 bg-gold shadow-[0_0_8px_var(--gold-soft)]" />
      {index && <span className="text-gold tabular-nums">{index}</span>}
      {children}
    </p>
  );
}
