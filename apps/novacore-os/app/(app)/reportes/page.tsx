import type { Metadata } from "next"
import { Clock3, Gauge, TicketPercent, UserPlus } from "lucide-react"

import { QuarterlyRevenueChart } from "@/components/features/reports/quarterly-revenue-chart"
import { StatusBarChart } from "@/components/features/reports/status-bar-chart"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { quarterlyRevenue, reportStats } from "@/lib/data/reports"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Reportes" }

export default async function ReportesPage() {
  const supabase = await createClient()

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const [
    { data: projectRows },
    { count: newClientsCount },
  ] = await Promise.all([
    supabase.from("projects").select("status, start_date, due_date"),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString()),
  ])

  const projects = projectRows ?? []
  const statusCounts = {
    pendiente: projects.filter((p) => p.status === "pendiente").length,
    en_desarrollo: projects.filter((p) => p.status === "en_desarrollo").length,
    revision: projects.filter((p) => p.status === "revision").length,
    entregado: projects.filter((p) => p.status === "entregado").length,
  }
  const totalProjects =
    statusCounts.pendiente +
    statusCounts.en_desarrollo +
    statusCounts.revision +
    statusCounts.entregado

  const deliveryRate =
    totalProjects > 0 ? Math.round((statusCounts.entregado / totalProjects) * 100) : 0

  const projectsWithDuration = projects.filter((p) => p.start_date && p.due_date)
  const avgProjectDays =
    projectsWithDuration.length > 0
      ? Math.round(
          projectsWithDuration.reduce((sum, p) => {
            const days =
              (new Date(p.due_date as string).getTime() -
                new Date(p.start_date as string).getTime()) /
              (1000 * 60 * 60 * 24)
            return sum + days
          }, 0) / projectsWithDuration.length
        )
      : 0

  const projectsByStatus = [
    { status: "Pendiente", count: statusCounts.pendiente, tone: "neutral" as const },
    { status: "En desarrollo", count: statusCounts.en_desarrollo, tone: "warning" as const },
    { status: "Revisión", count: statusCounts.revision, tone: "serious" as const },
    { status: "Entregado", count: statusCounts.entregado, tone: "good" as const },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title="Reportes"
        description="Métricas de negocio de NovaCore, trimestre a trimestre."
      />
      <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Tasa de entrega"
            value={deliveryRate}
            format="percent"
            icon={Gauge}
            iconColor="var(--status-good)"
          />
          <StatCard
            label="Ticket medio"
            value={reportStats.avgTicket.value}
            format="currency"
            delta={reportStats.avgTicket.delta}
            trendDirection="neutral"
            icon={TicketPercent}
            iconColor="var(--primary)"
          />
          <StatCard
            label="Duración media de proyecto"
            value={avgProjectDays}
            format="days"
            icon={Clock3}
            iconColor="var(--status-warning)"
          />
          <StatCard
            label="Clientes nuevos"
            value={newClientsCount ?? 0}
            icon={UserPlus}
            iconColor="var(--chart-1)"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos por trimestre</CardTitle>
            </CardHeader>
            <CardContent>
              <QuarterlyRevenueChart data={quarterlyRevenue} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Proyectos por estado</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusBarChart data={projectsByStatus} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
