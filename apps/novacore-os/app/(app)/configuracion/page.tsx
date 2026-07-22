import type { Metadata } from "next"
import { KeyRound } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { IntegrationsList } from "@/components/features/settings/integrations-list"
import { ProfileForm } from "@/components/features/settings/profile-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Configuración" }

export default async function ConfiguracionPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single()
    : { data: null }

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title="Configuración"
        description="Perfil, empresa e integraciones de NovaCore OS."
      />
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <Tabs defaultValue="perfil">
          <TabsList>
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="empresa">Empresa</TabsTrigger>
            <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <ProfileForm
              fullName={profile?.full_name ?? ""}
              email={user?.email ?? ""}
            />
          </TabsContent>

          <TabsContent value="empresa">
            <div className="flex max-w-md flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Nombre de la empresa</Label>
                <Input defaultValue="NovaCore" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>CIF / NIF</Label>
                <Input placeholder="B00000000" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Dirección fiscal</Label>
                <Input placeholder="Calle, ciudad, país" />
              </div>
              <Button className="w-fit" disabled>
                Guardar cambios
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="integraciones">
            <IntegrationsList />
          </TabsContent>

          <TabsContent value="api-keys">
            <EmptyState
              icon={KeyRound}
              title="Próximamente"
              description="Aquí podrás generar y revocar API Keys para conectar NovaCore OS con herramientas externas."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
