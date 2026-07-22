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
  SidebarGroupLabel,
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
  "relative z-10 gap-2.5 rounded-lg bg-transparent px-2.5 text-sidebar-foreground/65",
  "transition-colors duration-200 ease-out",
  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  "data-active:bg-transparent data-active:text-primary data-active:font-medium",
  "data-active:hover:bg-transparent"
)

function NavPill() {
  return (
    <motion.div
      layoutId="sidebar-active-pill"
      className="absolute inset-0 rounded-lg bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.35)]"
      transition={{ type: "spring", stiffness: 480, damping: 42, mass: 0.9 }}
    />
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-1 pt-4 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="gap-2.5 hover:bg-transparent"
              render={
                <Link href="/dashboard">
                  <NovaCoreMark className="size-7 shrink-0" />
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-semibold tracking-tight text-white">
                      NovaCore
                    </span>
                    <span className="truncate text-[11px] font-medium tracking-wide text-sidebar-foreground/50 uppercase">
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
        <SidebarGroupLabel className="px-2.5 text-[10px] font-semibold tracking-wider text-sidebar-foreground/40 uppercase">
          Cuenta
        </SidebarGroupLabel>
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
