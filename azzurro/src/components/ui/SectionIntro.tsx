export function SectionIntro({
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
      className={`flex items-center gap-3 text-[.7rem] font-medium tracking-[0.32em] text-ink-dim uppercase ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent shadow-[0_0_10px_var(--gold-soft)]" />
      {index && <span className="tabular-nums text-gold">{index}</span>}
      {children}
    </p>
  );
}
