export const reportStats = {
  deliveryRate: { value: 0, delta: "Sin datos todavía" },
  avgTicket: { value: 0, currency: "EUR", delta: "Sin datos todavía" },
  avgProjectDays: { value: 0, delta: "Sin datos todavía" },
  newClients: { value: 0, delta: "Sin datos todavía" },
}

export const quarterlyRevenue = [
  { quarter: "Q3 2025", revenue: 0 },
  { quarter: "Q4 2025", revenue: 0 },
  { quarter: "Q1 2026", revenue: 0 },
  { quarter: "Q2 2026", revenue: 0 },
]

export const projectsByStatus = [
  { status: "Pendiente", count: 0, tone: "neutral" as const },
  { status: "En desarrollo", count: 0, tone: "warning" as const },
  { status: "Revisión", count: 0, tone: "serious" as const },
  { status: "Entregado", count: 0, tone: "good" as const },
]
