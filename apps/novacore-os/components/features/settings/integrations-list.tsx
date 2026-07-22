import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import { integrations } from "@/lib/data/integrations"

export function IntegrationsList() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {integrations.map((integration) => (
        <Card key={integration.id} className="gap-3 py-4">
          <CardContent className="flex items-center justify-between gap-3 px-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">{integration.name}</span>
              <span className="text-xs text-muted-foreground">
                {integration.description}
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <StatusBadge
                label={integration.connected ? "Conectado" : "No conectado"}
                tone={integration.connected ? "good" : "neutral"}
              />
              <Button variant="outline" size="sm" disabled>
                {integration.connected ? "Gestionar" : "Conectar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
