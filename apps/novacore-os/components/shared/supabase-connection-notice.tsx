import { DatabaseZap } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"

export function SupabaseConnectionNotice({ resource }: { resource: string }) {
  return (
    <EmptyState
      icon={DatabaseZap}
      title={`No se pudo cargar ${resource}`}
      description="Conecta un proyecto Supabase real en .env.local y ejecuta las migraciones de supabase/migrations para empezar a trabajar con datos en vivo."
    />
  )
}
