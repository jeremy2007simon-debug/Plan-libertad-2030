import { redirect } from "next/navigation"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { PageTransition } from "@/components/layout/page-transition"
import { Topbar } from "@/components/layout/topbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single()

  const userName = profile?.full_name?.trim() || user.email?.split("@")[0] || "Equipo"

  return (
    <SidebarProvider style={{ "--sidebar-width": "15rem" } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset>
        <Topbar
          userName={userName}
          userEmail={user.email ?? ""}
          userAvatarUrl={profile?.avatar_url}
        />
        <main className="flex flex-1 flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
