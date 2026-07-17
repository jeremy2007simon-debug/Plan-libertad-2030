import type { Metadata } from "next"

import { ProjectsTable } from "@/components/features/projects/projects-table"
import { PageHeader } from "@/components/shared/page-header"
import { SupabaseConnectionNotice } from "@/components/shared/supabase-connection-notice"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Proyectos" }

export default async function ProyectosPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>
}) {
  const { model } = await searchParams
  const supabase = await createClient()

  const [projectsRes, clientsRes, libraryModelsRes, profilesRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*, clients(company_name), profiles(full_name)")
      .order("created_at", { ascending: false }),
    supabase.from("clients").select("id, company_name").order("company_name"),
    supabase.from("library_models").select("id, name").order("name"),
    supabase.from("profiles").select("id, full_name").order("full_name"),
  ])

  const error = projectsRes.error || clientsRes.error

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Proyectos"
        description="El trabajo en curso y entregado a cada cliente."
      />
      {error ? (
        <div className="p-4 sm:p-6">
          <SupabaseConnectionNotice resource="los proyectos" />
        </div>
      ) : (
        <ProjectsTable
          projects={projectsRes.data ?? []}
          clients={clientsRes.data ?? []}
          libraryModels={libraryModelsRes.data ?? []}
          members={profilesRes.data ?? []}
          initialLibraryModelId={model}
        />
      )}
    </div>
  )
}
