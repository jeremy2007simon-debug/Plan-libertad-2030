import type { Metadata } from "next"
import { CalendarClock, FolderKanban, PackageCheck, Users } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { RevenueChart } from "@/components/features/dashboard/revenue-chart"
import { DonutChart } from "@/components/features/dashboard/donut-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  dashboardStats,
  monthlyRevenue,
  recentActivity,
  todayTasks,
  upcomingMeetings,
} from "@/lib/data/dashboard"
import { projectsByStatus } from "@/lib/data/reports"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase.from("profiles").select("full_name").eq("id", user.id).single()
    : { data: null }

  const firstName =
    profile?.full_name?.trim().split(" ")[0] || user?.email?.split("@")[0] || "de nuevo"

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
            value={dashboardStats.activeClients.value}
            delta={dashboardStats.activeClients.delta}
            trend={dashboardStats.activeClients.trend}
            icon={Users}
            iconColor="var(--status-good)"
          />
          <StatCard
            label="MRR"
            value={dashboardStats.mrr.value}
            format="currency"
            delta={dashboardStats.mrr.delta}
            trend={dashboardStats.mrr.trend}
            icon={PackageCheck}
            iconColor="var(--primary)"
          />
          <StatCard
            label="Proyectos activos"
            value={dashboardStats.activeProjects.value}
            delta={dashboardStats.activeProjects.delta}
            trend={dashboardStats.activeProjects.trend}
            trendDirection="down"
            icon={FolderKanban}
            iconColor="var(--status-warning)"
          />
          <StatCard
            label="Proyectos entregados"
            value={dashboardStats.deliveredProjects.value}
            delta={dashboardStats.deliveredProjects.delta}
            trend={dashboardStats.deliveredProjects.trend}
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
              {todayTasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-muted/60"
                >
                  <Checkbox defaultChecked={task.done} />
                  <span
                    className={
                      task.done ? "text-muted-foreground line-through" : ""
                    }
                  >
                    {task.title}
                  </span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border/60">
              {recentActivity.map((item) => (
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
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas reuniones</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {upcomingMeetings.map((meeting) => (
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
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
