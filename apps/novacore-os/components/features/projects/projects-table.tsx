"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FolderKanban, MoreHorizontal, Plus, Search } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/shared/empty-state"
import { EntityAvatar } from "@/components/shared/entity-avatar"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/shared/status-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProjectFormDialog } from "@/components/features/projects/project-form-dialog"
import { deleteProjectRecord } from "@/lib/actions/projects"
import { projectStatusMap } from "@/lib/status"
import type { Tables } from "@/lib/types/database.types"

export type ProjectRow = Tables<"projects"> & {
  clients: Pick<Tables<"clients">, "company_name"> | null
  profiles: Pick<Tables<"profiles">, "full_name"> | null
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
})

export function ProjectsTable({
  projects,
  clients,
  libraryModels,
  members,
  initialLibraryModelId,
}: {
  projects: ProjectRow[]
  clients: Pick<Tables<"clients">, "id" | "company_name">[]
  libraryModels: Pick<Tables<"library_models">, "id" | "name">[]
  members: Pick<Tables<"profiles">, "id" | "full_name">[]
  initialLibraryModelId?: string
}) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [formOpen, setFormOpen] = React.useState(false)
  const [editingProject, setEditingProject] = React.useState<ProjectRow | undefined>()
  const [deletingProject, setDeletingProject] = React.useState<ProjectRow | undefined>()
  const [isDeleting, startDeleteTransition] = React.useTransition()
  const [handledModelId, setHandledModelId] = React.useState<string | undefined>()

  if (initialLibraryModelId && initialLibraryModelId !== handledModelId) {
    setHandledModelId(initialLibraryModelId)
    setEditingProject(undefined)
    setFormOpen(true)
  }

  React.useEffect(() => {
    if (handledModelId) {
      router.replace("/proyectos")
    }
  }, [handledModelId, router])

  const filtered = projects.filter((project) =>
    [project.name, project.clients?.company_name]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(query.toLowerCase()))
  )

  function openCreate() {
    setEditingProject(undefined)
    setFormOpen(true)
  }

  function openEdit(project: ProjectRow) {
    setEditingProject(project)
    setFormOpen(true)
  }

  function confirmDelete() {
    if (!deletingProject) return
    startDeleteTransition(async () => {
      const result = await deleteProjectRecord(deletingProject.id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Proyecto eliminado.")
      }
      setDeletingProject(undefined)
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar proyectos..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={openCreate} disabled={clients.length === 0}>
          <Plus />
          Nuevo proyecto
        </Button>
      </div>

      {clients.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Crea antes un cliente para poder asignarle proyectos.
        </p>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title={query ? "Sin resultados" : "Todavía no hay proyectos"}
          description={
            query
              ? "Prueba con otro término de búsqueda."
              : "Crea el primer proyecto para empezar a hacer seguimiento del trabajo entregado a tus clientes."
          }
          action={
            !query &&
            clients.length > 0 && (
              <Button onClick={openCreate} size="sm">
                <Plus />
                Nuevo proyecto
              </Button>
            )
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proyecto</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Entrega</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <EntityAvatar name={project.name} />
                      {project.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.clients?.company_name ?? "—"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={projectStatusMap[project.status].label}
                      tone={projectStatusMap[project.status].tone}
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.profiles?.full_name || "Sin asignar"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.due_date
                      ? dateFormatter.format(new Date(project.due_date))
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => openEdit(project)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => setDeletingProject(project)}
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ProjectFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        project={editingProject}
        clients={clients}
        libraryModels={libraryModels}
        members={members}
        presetLibraryModelId={editingProject ? undefined : initialLibraryModelId}
      />

      <AlertDialog
        open={Boolean(deletingProject)}
        onOpenChange={(open) => !open && setDeletingProject(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará <strong>{deletingProject?.name}</strong> y no se podrá
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
