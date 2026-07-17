"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { StatusTone } from "@/lib/status"

const toneColor: Record<StatusTone, string> = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  serious: "var(--status-serious)",
  critical: "var(--status-critical)",
  neutral: "var(--muted-foreground)",
}

export function StatusBarChart({
  data,
}: {
  data: { status: string; count: number; tone: StatusTone }[]
}) {
  return (
    <ChartContainer config={{}} className="h-64 w-full">
      <BarChart data={data} margin={{ left: 4, right: 4, top: 12 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 6" stroke="var(--border)" />
        <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip cursor={{ fill: "var(--muted)", opacity: 0.5 }} content={<ChartTooltipContent />} />
        <Bar
          dataKey="count"
          radius={[8, 8, 0, 0]}
          maxBarSize={56}
          animationDuration={800}
          animationEasing="ease-out"
        >
          {data.map((entry) => (
            <Cell key={entry.status} fill={toneColor[entry.tone]} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
