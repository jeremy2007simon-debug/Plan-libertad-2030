"use client"

import { Cell, Pie, PieChart } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { StatusTone } from "@/lib/status"

const toneColor: Record<StatusTone, string> = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  serious: "var(--status-serious)",
  critical: "var(--status-critical)",
  neutral: "var(--muted-foreground)",
}

export function DonutChart({
  data,
}: {
  data: { status: string; count: number; tone: StatusTone }[]
}) {
  const total = data.reduce((sum, entry) => sum + entry.count, 0)

  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <div className="relative size-32 shrink-0">
        <ChartContainer config={{}} className="size-32">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius="72%"
              outerRadius="100%"
              paddingAngle={3}
              strokeWidth={0}
              animationDuration={700}
              animationEasing="ease-out"
            >
              {data.map((entry) => (
                <Cell key={entry.status} fill={toneColor[entry.tone]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight tabular-nums">
            {total}
          </span>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-3 gap-y-2">
        {data.map((entry) => (
          <div key={entry.status} className="flex min-w-0 items-center justify-between gap-2 text-xs">
            <span className="flex min-w-0 items-center gap-1.5 truncate text-muted-foreground">
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: toneColor[entry.tone] }}
                aria-hidden
              />
              <span className="truncate">{entry.status}</span>
            </span>
            <span className="shrink-0 font-medium tabular-nums">{entry.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
