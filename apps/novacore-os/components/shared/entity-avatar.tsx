import { cn } from "@/lib/utils"

const palette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--primary)",
]

function hashString(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function EntityAvatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const color = palette[hashString(name) % palette.length]
  const initial = name.trim().charAt(0).toUpperCase() || "?"

  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-medium text-white",
        className
      )}
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {initial}
    </div>
  )
}
