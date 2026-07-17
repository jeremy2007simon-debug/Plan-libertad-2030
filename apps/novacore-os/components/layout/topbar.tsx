import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CommandMenu } from "@/components/layout/command-menu"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { UserMenu } from "@/components/layout/user-menu"

export function Topbar({
  userName,
  userEmail,
  userAvatarUrl,
}: {
  userName: string
  userEmail: string
  userAvatarUrl?: string | null
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border/60 bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-5" />
      <div className="flex-1" />
      <div className="hidden md:block">
        <CommandMenu />
      </div>
      <ThemeToggle />
      <Separator orientation="vertical" className="h-5" />
      <UserMenu name={userName} email={userEmail} avatarUrl={userAvatarUrl} />
    </header>
  )
}
