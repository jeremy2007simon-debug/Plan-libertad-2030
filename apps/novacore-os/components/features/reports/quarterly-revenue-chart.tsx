"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  revenue: {
    label: "Ingresos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function QuarterlyRevenueChart({
  data,
}: {
  data: { quarter: string; revenue: number }[]
}) {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart data={data} margin={{ left: 4, right: 4, top: 12 }}>
        <defs>
          <linearGradient id="fillQuarterlyRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.95} />
            <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0.55} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 6" stroke="var(--border)" />
        <XAxis dataKey="quarter" tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip
          cursor={{ fill: "var(--muted)", opacity: 0.5 }}
          content={
            <ChartTooltipContent
              formatter={(value) => `${Number(value).toLocaleString("es-ES")} €`}
            />
          }
        />
        <Bar
          dataKey="revenue"
          fill="url(#fillQuarterlyRevenue)"
          radius={[8, 8, 0, 0]}
          maxBarSize={56}
          animationDuration={800}
          animationEasing="ease-out"
        />
      </BarChart>
    </ChartContainer>
  )
}
