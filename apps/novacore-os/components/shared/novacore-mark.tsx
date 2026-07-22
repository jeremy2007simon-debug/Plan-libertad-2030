import { cn } from "@/lib/utils"

export function NovaCoreMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("text-primary", className)}
      aria-hidden
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M16 6.5 18.4 13.6 25.5 16 18.4 18.4 16 25.5 13.6 18.4 6.5 16 13.6 13.6 16 6.5Z"
        className="fill-primary-foreground"
      />
    </svg>
  )
}
