import { cn } from "@/lib/utils"
import type { StatusTone } from "@/lib/status"

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
        "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground",
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
