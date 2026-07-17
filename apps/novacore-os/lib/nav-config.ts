import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  LibraryBig,
  FileStack,
  Sparkles,
  FileText,
  Workflow,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const primaryNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Proyectos", href: "/proyectos", icon: FolderKanban },
  { label: "Biblioteca", href: "/biblioteca", icon: LibraryBig },
  { label: "Plantillas", href: "/plantillas", icon: FileStack },
  { label: "Prompts", href: "/prompts", icon: Sparkles },
  { label: "Presupuestos", href: "/presupuestos", icon: FileText },
  { label: "Automatizaciones", href: "/automatizaciones", icon: Workflow },
  { label: "Facturación", href: "/facturacion", icon: CreditCard },
  { label: "Reportes", href: "/reportes", icon: BarChart3 },
]

export const secondaryNav: NavItem[] = [
  { label: "Configuración", href: "/configuracion", icon: Settings },
]
