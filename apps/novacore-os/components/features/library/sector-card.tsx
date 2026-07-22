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
      <Card className="group h-full py-5">
        <CardContent className="flex items-start gap-4 px-5">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
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
          <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary" />
        </CardContent>
      </Card>
    </Link>
  )
}
