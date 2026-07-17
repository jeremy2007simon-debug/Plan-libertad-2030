import type { LucideIcon } from "lucide-react"

import { AnimatedNumber, type NumberFormatKind } from "@/components/shared/animated-number"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  format = "number",
  delta,
  icon: Icon,
  className,
}: {
  label: string
  value: number
  format?: NumberFormatKind
  delta?: string
  icon: LucideIcon
  className?: string
}) {
  return (
    <Card className={cn("gap-4 py-6", className)}>
      <CardContent className="flex items-start justify-between px-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          <AnimatedNumber
            value={value}
            kind={format}
            className="text-3xl font-semibold tracking-tight tabular-nums"
          />
          {delta && (
            <span className="text-xs text-muted-foreground">{delta}</span>
          )}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 text-primary ring-1 ring-primary/10">
          <Icon className="size-4.5" />
        </div>
      </CardContent>
    </Card>
  )
}
