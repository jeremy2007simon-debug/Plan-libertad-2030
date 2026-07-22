/**
 * MRR e ingresos mensuales requieren la lógica de Facturación (todavía sin
 * creación de facturas), así que se quedan en 0 hasta que exista esa pieza.
 * El resto de datos del Dashboard (clientes, proyectos, reuniones, tareas)
 * se leen en vivo desde Supabase en app/(app)/dashboard/page.tsx.
 */

export const dashboardStats = {
  mrr: {
    value: 0,
    currency: "EUR",
    delta: "Sin datos todavía",
    trend: [0, 0, 0, 0, 0, 0],
  },
}

export const monthlyRevenue = [
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 0 },
  { month: "Abr", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "Jun", revenue: 0 },
  { month: "Jul", revenue: 0 },
]

export const recentActivity: {
  id: string
  actor: string
  action: string
  target: string
  timestamp: string
}[] = []
