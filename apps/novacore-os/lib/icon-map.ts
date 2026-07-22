import {
  Building2,
  Car,
  Stethoscope,
  BedDouble,
  Utensils,
  LibraryBig,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  car: Car,
  stethoscope: Stethoscope,
  "bed-double": BedDouble,
  "building-2": Building2,
}

export function resolveIcon(name: string | null | undefined): LucideIcon {
  if (!name) return LibraryBig
  return iconMap[name] ?? LibraryBig
}
