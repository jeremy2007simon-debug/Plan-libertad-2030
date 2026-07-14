export function SectionLabel({
  index,
  children,
  center = false,
}: {
  index?: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[.72rem] font-medium tracking-[0.28em] text-ink-dim uppercase ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-blue">
        <span className="absolute inset-0 rounded-full bg-blue blur-[4px]" />
      </span>
      {index && <span className="text-ink-dim-2 tabular-nums">{index}</span>}
      {children}
    </p>
  );
}
