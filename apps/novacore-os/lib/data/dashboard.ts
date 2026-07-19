/**
 * Datos de ejemplo para el Dashboard. Misma forma que las filas de Supabase
 * que los sustituirán (clients, projects, meetings, tasks) — migrar a
 * queries reales es un cambio de origen de datos, no de UI.
 */

export const dashboardStats = {
  activeClients: {
    value: 0,
    delta: "Sin datos todavía",
    trend: [0, 0, 0, 0, 0, 0],
  },
  mrr: {
    value: 0,
    currency: "EUR",
    delta: "Sin datos todavía",
    trend: [0, 0, 0, 0, 0, 0],
  },
  activeProjects: {
    value: 0,
    delta: "Sin datos todavía",
    trend: [0, 0, 0, 0, 0, 0],
  },
  deliveredProjects: {
    value: 0,
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

export const upcomingMeetings: {
  id: string
  title: string
  client: string
  day: string
  month: string
  time: string
}[] = []

export const todayTasks: { id: string; title: string; done: boolean }[] = []
