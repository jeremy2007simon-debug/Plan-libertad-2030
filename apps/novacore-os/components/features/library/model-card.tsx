import Link from "next/link"
import { Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ModelCard({
  id,
  name,
  description,
  imageUrl,
  features,
  avgBuildTimeDays,
  updatedAt,
}: {
  id: string
  name: string
  description?: string | null
  imageUrl?: string | null
  features: string[]
  avgBuildTimeDays?: number | null
  updatedAt: string
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden py-0">
      <div
        className="flex h-32 items-center justify-center bg-gradient-to-br from-primary/25 via-primary/10 to-transparent text-sm font-medium text-primary/70"
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!imageUrl && name}
      </div>
      <CardContent className="flex flex-1 flex-col gap-3 px-5 pt-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {features.slice(0, 4).map((feature) => (
              <Badge key={feature} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
          {avgBuildTimeDays != null && (
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {avgBuildTimeDays} días de media
            </span>
          )}
          <span>
            Actualizado{" "}
            {new Intl.DateTimeFormat("es-ES", {
              day: "2-digit",
              month: "short",
            }).format(new Date(updatedAt))}
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5">
        <Button
          className="w-full"
          nativeButton={false}
          render={<Link href={`/proyectos?model=${id}`} />}
        >
          Crear proyecto
        </Button>
      </CardFooter>
    </Card>
  )
}
