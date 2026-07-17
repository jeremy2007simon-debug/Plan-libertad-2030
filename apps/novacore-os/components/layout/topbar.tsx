import { SidebarTrigger } from "@/components/ui/sidebar"
import { CommandMenu } from "@/components/layout/command-menu"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { UserMenu } from "@/components/layout/user-menu"
import type { MemberRole } from "@/lib/types/database.types"

export function Topbar({
  userName,
  userEmail,
  userAvatarUrl,
  userRole,
}: {
  userName: string
  userEmail: string
  userAvatarUrl?: string | null
  userRole?: MemberRole
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 bg-background/70 px-5 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="rounded-full text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-[var(--shadow-floating)]" />
      <div className="flex-1" />
      <div className="hidden md:block">
        <CommandMenu />
      </div>
      <div className="flex items-center gap-1 rounded-full bg-card p-1 shadow-[var(--shadow-floating)] ring-1 ring-foreground/[0.04]">
        <ThemeToggle />
        <UserMenu
          name={userName}
          email={userEmail}
          avatarUrl={userAvatarUrl}
          role={userRole}
        />
      </div>
    </header>
  )
}
