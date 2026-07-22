import { cn } from "@/lib/utils"
import type { StatusTone } from "@/lib/status"

const toneClass: Record<StatusTone, string> = {
  good: "bg-status-good/10 text-status-good ring-status-good/15",
  warning: "bg-status-warning/12 text-amber-700 ring-status-warning/20 dark:text-status-warning",
  serious: "bg-status-serious/12 text-status-serious ring-status-serious/20",
  critical: "bg-status-critical/10 text-status-critical ring-status-critical/15",
  neutral: "bg-muted text-muted-foreground ring-foreground/[0.06]",
}

const toneDotClass: Record<StatusTone, string> = {
  good: "bg-status-good",
  warning: "bg-status-warning",
  serious: "bg-status-serious",
  critical: "bg-status-critical",
  neutral: "bg-muted-foreground",
}

export function StatusBadge({
  label,
  tone,
  className,
}: {
  label: string
  tone: StatusTone
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
        toneClass[tone],
        className
      )}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", toneDotClass[tone])}
        aria-hidden
      />
      {label}
    </span>
  )
}
