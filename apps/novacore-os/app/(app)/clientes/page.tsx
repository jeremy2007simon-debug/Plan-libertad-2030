import type { Metadata } from "next"

import { ClientsTable } from "@/components/features/clients/clients-table"
import { PageHeader } from "@/components/shared/page-header"
import { SupabaseConnectionNotice } from "@/components/shared/supabase-connection-notice"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Clientes" }

export default async function ClientesPage() {
  const supabase = await createClient()
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        crumbs={[{ label: "NovaCore OS", href: "/dashboard" }]}
        title="Clientes"
        description="Empresas con las que trabaja NovaCore."
      />
      {error ? (
        <div className="p-4 sm:p-6">
          <SupabaseConnectionNotice resource="los clientes" />
        </div>
      ) : (
        <ClientsTable clients={clients ?? []} />
      )}
    </div>
  )
}
