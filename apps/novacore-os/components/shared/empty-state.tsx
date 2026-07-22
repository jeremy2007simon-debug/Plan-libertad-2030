import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/40 py-20 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 via-primary/8 to-transparent text-primary ring-1 ring-primary/10">
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-medium">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
