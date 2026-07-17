import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  className,
}: {
  label: string
  value: string
  delta?: string
  icon: LucideIcon
  className?: string
}) {
  return (
    <Card className={cn("gap-3 py-5", className)}>
      <CardContent className="flex items-start justify-between px-5">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </span>
          {delta && (
            <span className="text-xs text-muted-foreground">{delta}</span>
          )}
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4.5" />
        </div>
      </CardContent>
    </Card>
  )
}
