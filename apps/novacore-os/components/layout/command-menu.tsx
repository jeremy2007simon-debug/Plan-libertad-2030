"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { primaryNav, secondaryNav } from "@/lib/nav-config"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="ghost"
        className="h-9 w-64 justify-start gap-2.5 rounded-full bg-card px-3.5 text-muted-foreground shadow-[var(--shadow-floating)] ring-1 ring-foreground/[0.04] transition-shadow duration-200 hover:bg-card hover:text-foreground hover:shadow-[var(--shadow-card-hover)]"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="text-sm">Buscar...</span>
        <kbd className="ml-auto hidden rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Ir a..." />
        <CommandList>
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandGroup heading="Módulos">
            {[...primaryNav, ...secondaryNav].map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => go(item.href)}
              >
                <item.icon />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
