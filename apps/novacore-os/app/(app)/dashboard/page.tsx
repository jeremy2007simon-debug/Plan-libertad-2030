import type { Metadata } from "next"
import { CalendarClock, FolderKanban, PackageCheck, Users } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { RevenueChart } from "@/components/features/dashboard/revenue-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  dashboardStats,
  monthlyRevenue,
  recentActivity,
  todayTasks,
  upcomingMeetings,
} from "@/lib/data/dashboard"

export const metadata: Metadata = { title: "Dashboard" }

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title="Dashboard"
        description="El estado de NovaCore, de un vistazo."
      />
      <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Clientes activos"
            value={String(dashboardStats.activeClients.value)}
            delta={dashboardStats.activeClients.delta}
            icon={Users}
          />
          <StatCard
            label="MRR"
            value={currencyFormatter.format(dashboardStats.mrr.value)}
            delta={dashboardStats.mrr.delta}
            icon={PackageCheck}
          />
          <StatCard
            label="Proyectos activos"
            value={String(dashboardStats.activeProjects.value)}
            delta={dashboardStats.activeProjects.delta}
            icon={FolderKanban}
          />
          <StatCard
            label="Proyectos entregados"
            value={String(dashboardStats.deliveredProjects.value)}
            delta={dashboardStats.deliveredProjects.delta}
            icon={CalendarClock}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
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
                <div key={meeting.id} className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{meeting.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {meeting.client}
                  </span>
                  <span className="text-xs text-primary">{meeting.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
