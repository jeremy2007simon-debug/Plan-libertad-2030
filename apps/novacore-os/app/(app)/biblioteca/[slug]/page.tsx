import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LibraryBig } from "lucide-react"

import { ModelCard } from "@/components/features/library/model-card"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { createClient } from "@/lib/supabase/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return { title: slug }
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: sector } = await supabase
    .from("sectors")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!sector) notFound()

  const { data: models } = await supabase
    .from("library_models")
    .select("*")
    .eq("sector_id", sector.id)
    .order("name")

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[
          { label: "NovaCore OS", href: "/dashboard" },
          { label: "Biblioteca", href: "/biblioteca" },
        ]}
        title={sector.name}
        description={sector.description ?? undefined}
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {models && models.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {models.map((model) => (
              <ModelCard
                key={model.id}
                id={model.id}
                name={model.name}
                description={model.description}
                imageUrl={model.image_url}
                features={model.features}
                avgBuildTimeDays={model.avg_build_time_days}
                updatedAt={model.updated_at}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={LibraryBig}
            title="Sin modelos todavía"
            description="Añade modelos para este sector en Supabase."
          />
        )}
      </div>
    </div>
  )
}
