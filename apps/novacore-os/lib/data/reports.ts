export const reportStats = {
  deliveryRate: { value: 92, delta: "+4 pts vs. trimestre anterior" },
  avgTicket: { value: 4180, currency: "EUR", delta: "+320 € vs. trimestre anterior" },
  avgProjectDays: { value: 18, delta: "-2 días vs. trimestre anterior" },
  newClients: { value: 6, delta: "Este trimestre" },
}

export const quarterlyRevenue = [
  { quarter: "Q3 2025", revenue: 34200 },
  { quarter: "Q4 2025", revenue: 39850 },
  { quarter: "Q1 2026", revenue: 41300 },
  { quarter: "Q2 2026", revenue: 47650 },
]

export const projectsByStatus = [
  { status: "Pendiente", count: 4, tone: "neutral" as const },
  { status: "En desarrollo", count: 7, tone: "warning" as const },
  { status: "Revisión", count: 3, tone: "serious" as const },
  { status: "Entregado", count: 47, tone: "good" as const },
]
