import type { Metadata } from "next"
import { CreditCard } from "lucide-react"

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
import { invoiceStatusMap } from "@/lib/status"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Facturación" }

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
})
const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export default async function FacturacionPage() {
  const supabase = await createClient()
  const { data: invoices, error } = await supabase
    .from("invoices")
    .select("*, clients(company_name)")
    .order("issued_at", { ascending: false })

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Facturación"
        description="Facturas emitidas a clientes."
        actions={
          <Tooltip>
            <TooltipTrigger render={<span tabIndex={0} />}>
              <Button disabled>Nueva factura</Button>
            </TooltipTrigger>
            <TooltipContent>Próximamente</TooltipContent>
          </Tooltip>
        }
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {error ? (
          <SupabaseConnectionNotice resource="la facturación" />
        ) : invoices && invoices.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Emitida</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.number}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {invoice.clients?.company_name ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        label={invoiceStatusMap[invoice.status].label}
                        tone={invoiceStatusMap[invoice.status].tone}
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {invoice.issued_at
                        ? dateFormatter.format(new Date(invoice.issued_at))
                        : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {invoice.due_at
                        ? dateFormatter.format(new Date(invoice.due_at))
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {currencyFormatter.format(invoice.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState
            icon={CreditCard}
            title="Todavía no hay facturas"
            description="En cuanto factures a un cliente, aparecerá aquí."
          />
        )}
      </div>
    </div>
  )
}
