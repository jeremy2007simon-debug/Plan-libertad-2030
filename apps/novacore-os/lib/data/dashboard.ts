/**
 * Datos de ejemplo para el Dashboard. Misma forma que las filas de Supabase
 * que los sustituirán (clients, projects, meetings, tasks) — migrar a
 * queries reales es un cambio de origen de datos, no de UI.
 */

export const dashboardStats = {
  activeClients: {
    value: 24,
    delta: "+3 este mes",
    trend: [18, 19, 20, 21, 23, 24],
  },
  mrr: {
    value: 18450,
    currency: "EUR",
    delta: "+8.2% vs. mes anterior",
    trend: [11200, 12850, 12100, 14300, 15900, 18450],
  },
  activeProjects: {
    value: 11,
    delta: "3 en revisión",
    trend: [9, 10, 8, 9, 10, 11],
  },
  deliveredProjects: {
    value: 47,
    delta: "+5 este mes",
    trend: [30, 34, 37, 40, 43, 47],
  },
}

export const monthlyRevenue = [
  { month: "Feb", revenue: 11200 },
  { month: "Mar", revenue: 12850 },
  { month: "Abr", revenue: 12100 },
  { month: "May", revenue: 14300 },
  { month: "Jun", revenue: 15900 },
  { month: "Jul", revenue: 18450 },
]

export const recentActivity = [
  {
    id: "1",
    actor: "Marta Ruiz",
    action: "movió el proyecto",
    target: "Web Grupo Valladares a Revisión",
    timestamp: "Hace 20 min",
  },
  {
    id: "2",
    actor: "NovaCore",
    action: "generó una factura para",
    target: "Restaurante Azzurro",
    timestamp: "Hace 1 h",
  },
  {
    id: "3",
    actor: "Diego Torres",
    action: "creó el cliente",
    target: "Clínica Dental Sonrisa+",
    timestamp: "Hace 3 h",
  },
  {
    id: "4",
    actor: "NovaCore",
    action: "completó la automatización",
    target: "Recordatorio de reseñas Google",
    timestamp: "Ayer",
  },
]

export const upcomingMeetings = [
  {
    id: "1",
    title: "Kick-off proyecto web",
    client: "Clínica Dental Sonrisa+",
    day: "17",
    month: "JUL",
    time: "16:30",
  },
  {
    id: "2",
    title: "Revisión de diseño",
    client: "Amigos del Norte",
    day: "18",
    month: "JUL",
    time: "10:00",
  },
  {
    id: "3",
    title: "Presentación de presupuesto",
    client: "Hotel Beach Club Marbella",
    day: "20",
    month: "JUL",
    time: "12:00",
  },
]

export const todayTasks = [
  { id: "1", title: "Enviar propuesta a Grupo Valladares", done: true },
  { id: "2", title: "Revisar copys de la landing Azzurro", done: false },
  { id: "3", title: "Configurar dominio de Mexicano Guargacho", done: false },
  { id: "4", title: "Preparar demo de automatización de reseñas", done: false },
]
