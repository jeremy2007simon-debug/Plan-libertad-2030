import Link from "next/link"
import { ChevronRight, type LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function SectorCard({
  slug,
  name,
  description,
  icon: Icon,
  modelCount,
}: {
  slug: string
  name: string
  description?: string | null
  icon: LucideIcon
  modelCount: number
}) {
  return (
    <Link href={`/biblioteca/${slug}`}>
      <Card className="group h-full transition-colors hover:border-primary/40 hover:bg-accent/40">
        <CardContent className="flex items-start gap-4 px-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h3 className="font-medium">{name}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            <span className="mt-1 text-xs text-muted-foreground">
              {modelCount} {modelCount === 1 ? "modelo" : "modelos"}
            </span>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </Link>
  )
}
