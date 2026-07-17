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
      <BarChart data={data} margin={{ left: 4, right: 4, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56}>
          {data.map((entry) => (
            <Cell key={entry.status} fill={toneColor[entry.tone]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
