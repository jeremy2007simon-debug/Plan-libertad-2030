"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { primaryNav, secondaryNav } from "@/lib/nav-config"
import { NovaCoreMark } from "@/components/shared/novacore-mark"
import { cn } from "@/lib/utils"

const activeButtonClass = cn(
  "relative z-10 gap-2.5 rounded-lg bg-transparent px-2.5 text-sidebar-foreground/70",
  "transition-colors duration-200 ease-out",
  "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
  "data-active:bg-transparent data-active:text-primary data-active:font-medium",
  "data-active:hover:bg-transparent"
)

function NavPill() {
  return (
    <motion.div
      layoutId="sidebar-active-pill"
      className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/14 via-primary/8 to-primary/0 ring-1 ring-primary/10"
      transition={{ type: "spring", stiffness: 480, damping: 42, mass: 0.9 }}
    />
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/60">
      <SidebarHeader className="px-1 pt-3 pb-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="gap-2.5 hover:bg-transparent"
              render={
                <Link href="/dashboard">
                  <NovaCoreMark className="size-7 shrink-0" />
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-semibold tracking-tight">
                      NovaCore
                    </span>
                    <span className="truncate text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                      OS
                    </span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {primaryNav.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <SidebarMenuItem key={item.href} className="relative">
                    {isActive && <NavPill />}
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      className={activeButtonClass}
                      render={
                        <Link href={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {secondaryNav.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <SidebarMenuItem key={item.href} className="relative">
                {isActive && <NavPill />}
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.label}
                  className={activeButtonClass}
                  render={
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
