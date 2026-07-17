"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export function RevenueChart({
  data,
}: {
  data: { month: string; revenue: number }[]
}) {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <AreaChart data={data} margin={{ left: 4, right: 4, top: 12 }}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.32} />
            <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 6" stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          className="text-xs"
        />
        <ChartTooltip
          cursor={{ stroke: "var(--color-revenue)", strokeWidth: 1, strokeDasharray: "4 4" }}
          content={
            <ChartTooltipContent
              formatter={(value) => `${Number(value).toLocaleString("es-ES")} €`}
            />
          }
        />
        <Area
          dataKey="revenue"
          type="monotone"
          fill="url(#fillRevenue)"
          stroke="var(--color-revenue)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
          animationDuration={900}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ChartContainer>
  )
}
