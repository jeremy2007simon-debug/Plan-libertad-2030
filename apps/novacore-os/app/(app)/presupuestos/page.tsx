import type { Metadata } from "next"
import { FileText } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { SupabaseConnectionNotice } from "@/components/shared/supabase-connection-notice"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { budgetStatusMap } from "@/lib/status"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Presupuestos" }

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
})

export default async function PresupuestosPage() {
  const supabase = await createClient()
  const { data: budgets, error } = await supabase
    .from("budgets")
    .select("*, clients(company_name)")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Presupuestos"
        description="Estructura base para presupuestos. La generación automática llegará más adelante."
        actions={
          <Tooltip>
            <TooltipTrigger render={<span tabIndex={0} />}>
              <Button disabled>Nuevo presupuesto</Button>
            </TooltipTrigger>
            <TooltipContent>Próximamente</TooltipContent>
          </Tooltip>
        }
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {error ? (
          <SupabaseConnectionNotice resource="los presupuestos" />
        ) : budgets && budgets.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgets.map((budget) => (
                  <TableRow key={budget.id}>
                    <TableCell className="font-medium">{budget.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {budget.clients?.company_name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        label={budgetStatusMap[budget.status].label}
                        tone={budgetStatusMap[budget.status].tone}
                      />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {currencyFormatter.format(budget.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="Todavía no hay presupuestos"
            description="Esta pantalla tiene la estructura lista; la creación guiada de presupuestos llegará en una futura iteración."
          />
        )}
      </div>
    </div>
  )
}
