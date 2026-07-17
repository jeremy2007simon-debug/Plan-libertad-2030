import type { Metadata } from "next"
import { LibraryBig } from "lucide-react"

import { SectorCard } from "@/components/features/library/sector-card"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { SupabaseConnectionNotice } from "@/components/shared/supabase-connection-notice"
import { resolveIcon } from "@/lib/icon-map"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Biblioteca" }

export default async function BibliotecaPage() {
  const supabase = await createClient()
  const { data: sectors, error } = await supabase
    .from("sectors")
    .select("*, library_models(count)")
    .order("sort_order")

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Biblioteca"
        description="Sectores y modelos reutilizables para lanzar proyectos más rápido."
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {error ? (
          <SupabaseConnectionNotice resource="la biblioteca" />
        ) : sectors && sectors.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sectors.map((sector) => (
              <SectorCard
                key={sector.id}
                slug={sector.slug}
                name={sector.name}
                description={sector.description}
                icon={resolveIcon(sector.icon)}
                modelCount={sector.library_models?.[0]?.count ?? 0}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={LibraryBig}
            title="Todavía no hay sectores"
            description="Añade sectores y modelos en Supabase para empezar a construir la biblioteca de NovaCore."
          />
        )}
      </div>
    </div>
  )
}
