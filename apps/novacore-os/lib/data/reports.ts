/**
 * El ticket medio y los ingresos por trimestre requieren la lógica de
 * Facturación (todavía sin creación de facturas), así que se quedan en 0.
 * El resto de Reportes se calcula en vivo en app/(app)/reportes/page.tsx.
 */

export const reportStats = {
  avgTicket: { value: 0, currency: "EUR", delta: "Sin datos todavía" },
}

export const quarterlyRevenue = [
  { quarter: "Q3 2025", revenue: 0 },
  { quarter: "Q4 2025", revenue: 0 },
  { quarter: "Q1 2026", revenue: 0 },
  { quarter: "Q2 2026", revenue: 0 },
]
