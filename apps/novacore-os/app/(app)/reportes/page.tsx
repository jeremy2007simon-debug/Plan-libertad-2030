import type { Metadata } from "next"
import { Clock3, Gauge, TicketPercent, UserPlus } from "lucide-react"

import { QuarterlyRevenueChart } from "@/components/features/reports/quarterly-revenue-chart"
import { StatusBarChart } from "@/components/features/reports/status-bar-chart"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  projectsByStatus,
  quarterlyRevenue,
  reportStats,
} from "@/lib/data/reports"

export const metadata: Metadata = { title: "Reportes" }

export default function ReportesPage() {
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
            value={reportStats.deliveryRate.value}
            format="percent"
            delta={reportStats.deliveryRate.delta}
            icon={Gauge}
          />
          <StatCard
            label="Ticket medio"
            value={reportStats.avgTicket.value}
            format="currency"
            delta={reportStats.avgTicket.delta}
            icon={TicketPercent}
          />
          <StatCard
            label="Duración media de proyecto"
            value={reportStats.avgProjectDays.value}
            format="days"
            delta={reportStats.avgProjectDays.delta}
            icon={Clock3}
          />
          <StatCard
            label="Clientes nuevos"
            value={reportStats.newClients.value}
            delta={reportStats.newClients.delta}
            icon={UserPlus}
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
