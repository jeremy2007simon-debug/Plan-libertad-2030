import type { Metadata } from "next"
import { ArrowRight, Workflow } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { SupabaseConnectionNotice } from "@/components/shared/supabase-connection-notice"
import { Card, CardContent } from "@/components/ui/card"
import { automationStatusMap } from "@/lib/status"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Automatizaciones" }

const relativeFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
})

export default async function AutomatizacionesPage() {
  const supabase = await createClient()
  const { data: automations, error } = await supabase
    .from("automations")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Automatizaciones"
        description="Flujos y agentes que trabajan por ti en segundo plano."
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {error ? (
          <SupabaseConnectionNotice resource="las automatizaciones" />
        ) : automations && automations.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {automations.map((automation) => (
              <Card key={automation.id} className="gap-3 py-5">
                <CardContent className="flex flex-col gap-3 px-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium">{automation.name}</h3>
                    <StatusBadge
                      label={automationStatusMap[automation.status].label}
                      tone={automationStatusMap[automation.status].tone}
                    />
                  </div>
                  {automation.description && (
                    <p className="text-sm text-muted-foreground">
                      {automation.description}
                    </p>
                  )}
                  {(automation.trigger_label || automation.action_label) && (
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs">
                      <span className="font-medium">{automation.trigger_label}</span>
                      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {automation.action_label}
                      </span>
                    </div>
                  )}
                  {automation.last_run_at && (
                    <span className="text-xs text-muted-foreground">
                      Última ejecución{" "}
                      {relativeFormatter.format(new Date(automation.last_run_at))}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Workflow}
            title="Todavía no hay automatizaciones"
            description="Conecta tus primeros flujos (Zapier, Make, webhooks o agentes de IA) desde Supabase."
          />
        )}
      </div>
    </div>
  )
}
