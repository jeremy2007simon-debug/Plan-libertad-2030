import type { Metadata } from "next"
import { FileStack } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { SupabaseConnectionNotice } from "@/components/shared/supabase-connection-notice"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Plantillas" }

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

export default async function PlantillasPage() {
  const supabase = await createClient()
  const { data: templates, error } = await supabase
    .from("templates")
    .select("*, template_categories(name)")
    .order("updated_at", { ascending: false })

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Plantillas"
        description="Documentos y procesos internos reutilizables (propuestas, contratos, onboarding)."
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {error ? (
          <SupabaseConnectionNotice resource="las plantillas" />
        ) : templates && templates.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="gap-3 py-5">
                <CardContent className="flex flex-col gap-2 px-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium">{template.name}</h3>
                    {template.template_categories?.name && (
                      <Badge variant="secondary">
                        {template.template_categories.name}
                      </Badge>
                    )}
                  </div>
                  {template.description && (
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.usage_count} usos</span>
                    <span>
                      Actualizado {dateFormatter.format(new Date(template.updated_at))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileStack}
            title="Todavía no hay plantillas"
            description="Añade plantillas de propuestas, contratos u onboarding en Supabase."
          />
        )}
      </div>
    </div>
  )
}
