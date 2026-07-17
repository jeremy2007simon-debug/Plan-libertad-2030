import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { AnimatedNumber, type NumberFormatKind } from "@/components/shared/animated-number"
import { Sparkline } from "@/components/shared/sparkline"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  format = "number",
  delta,
  trendDirection = "up",
  trend,
  icon: Icon,
  iconColor = "var(--primary)",
  className,
}: {
  label: string
  value: number
  format?: NumberFormatKind
  delta?: string
  trendDirection?: "up" | "down"
  trend?: number[]
  icon: LucideIcon
  iconColor?: string
  className?: string
}) {
  const TrendIcon = trendDirection === "down" ? TrendingDown : TrendingUp

  return (
    <Card className={cn("gap-4 py-6", className)}>
      <CardContent className="flex items-center justify-between gap-4 px-6">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: iconColor }}
            >
              <Icon className="size-4" />
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
          <AnimatedNumber
            value={value}
            kind={format}
            className="text-3xl font-semibold tracking-tight tabular-nums"
          />
          {delta && (
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trendDirection === "down" ? "text-status-critical" : "text-status-good"
              )}
            >
              <TrendIcon className="size-3.5" />
              {delta}
            </span>
          )}
        </div>
        {trend && trend.length > 1 && (
          <Sparkline data={trend} color={iconColor} />
        )}
      </CardContent>
    </Card>
  )
}
