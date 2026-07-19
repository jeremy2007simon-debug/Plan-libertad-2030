import type { Metadata } from "next"
import { CalendarClock, FolderKanban, PackageCheck, Users } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { RevenueChart } from "@/components/features/dashboard/revenue-chart"
import { DonutChart } from "@/components/features/dashboard/donut-chart"
import { TodayTasksList } from "@/components/features/dashboard/today-tasks-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardStats, monthlyRevenue, recentActivity } from "@/lib/data/dashboard"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Dashboard" }

const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "short" })
const dayFormatter = new Intl.DateTimeFormat("es-ES", { day: "2-digit" })
const timeFormatter = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
})

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const todayIso = new Date().toISOString().slice(0, 10)

  const [
    { data: profile },
    { count: activeClientsCount },
    { data: projectRows },
    { data: meetingRows },
    { data: taskRows },
  ] = await Promise.all([
    user
      ? supabase.from("profiles").select("full_name").eq("id", user.id).single()
      : Promise.resolve({ data: null }),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("status", "activo"),
    supabase.from("projects").select("status"),
    supabase
      .from("meetings")
      .select("id, title, starts_at, clients(company_name)")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(3),
    supabase
      .from("tasks")
      .select("id, title, status, due_date")
      .lte("due_date", todayIso)
      .order("due_date", { ascending: true })
      .limit(8),
  ])

  const firstName =
    profile?.full_name?.trim().split(" ")[0] || user?.email?.split("@")[0] || "de nuevo"

  const projects = projectRows ?? []
  const statusCounts = {
    pendiente: projects.filter((p) => p.status === "pendiente").length,
    en_desarrollo: projects.filter((p) => p.status === "en_desarrollo").length,
    revision: projects.filter((p) => p.status === "revision").length,
    entregado: projects.filter((p) => p.status === "entregado").length,
  }
  const activeProjectsCount =
    statusCounts.pendiente + statusCounts.en_desarrollo + statusCounts.revision
  const deliveredProjectsCount = statusCounts.entregado

  const projectsByStatus = [
    { status: "Pendiente", count: statusCounts.pendiente, tone: "neutral" as const },
    { status: "En desarrollo", count: statusCounts.en_desarrollo, tone: "warning" as const },
    { status: "Revisión", count: statusCounts.revision, tone: "serious" as const },
    { status: "Entregado", count: statusCounts.entregado, tone: "good" as const },
  ]

  const upcomingMeetings = (meetingRows ?? []).map((meeting) => {
    const date = new Date(meeting.starts_at)
    return {
      id: meeting.id,
      title: meeting.title,
      client: meeting.clients?.company_name ?? "—",
      day: dayFormatter.format(date),
      month: monthFormatter.format(date).replace(".", "").toUpperCase(),
      time: timeFormatter.format(date),
    }
  })

  const todayTasks = (taskRows ?? []).map((task) => ({
    id: task.id,
    title: task.title,
    done: task.status === "completada",
  }))

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title={`¡Bienvenido, ${firstName}! 👋`}
        description="Aquí tienes el resumen de tu negocio hoy."
      />
      <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Clientes activos"
            value={activeClientsCount ?? 0}
            icon={Users}
            iconColor="var(--status-good)"
          />
          <StatCard
            label="MRR"
            value={dashboardStats.mrr.value}
            format="currency"
            delta={dashboardStats.mrr.delta}
            trend={dashboardStats.mrr.trend}
            trendDirection="neutral"
            icon={PackageCheck}
            iconColor="var(--primary)"
          />
          <StatCard
            label="Proyectos activos"
            value={activeProjectsCount}
            icon={FolderKanban}
            iconColor="var(--status-warning)"
          />
          <StatCard
            label="Proyectos entregados"
            value={deliveredProjectsCount}
            icon={CalendarClock}
            iconColor="var(--chart-1)"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Ingresos mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart data={monthlyRevenue} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de proyectos</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <DonutChart data={projectsByStatus} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tareas de hoy</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <TodayTasksList tasks={todayTasks} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border/60">
              {recentActivity.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Sin actividad reciente todavía.
                </p>
              ) : (
                recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <p className="flex-1 text-sm">
                      <span className="font-medium">{item.actor}</span>{" "}
                      <span className="text-muted-foreground">{item.action}</span>{" "}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.timestamp}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas reuniones</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {upcomingMeetings.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Sin reuniones próximas.
                </p>
              ) : (
                upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-muted">
                      <span className="text-[10px] font-semibold tracking-wide text-primary uppercase">
                        {meeting.month}
                      </span>
                      <span className="text-sm font-semibold tabular-nums">
                        {meeting.day}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">{meeting.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {meeting.client} · {meeting.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
