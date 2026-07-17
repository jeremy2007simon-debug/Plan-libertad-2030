"use client"

import * as React from "react"
import { MoreHorizontal, Plus, Search, Users } from "lucide-react"
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
import { ClientFormDialog } from "@/components/features/clients/client-form-dialog"
import { deleteClientRecord } from "@/lib/actions/clients"
import { clientStatusMap } from "@/lib/status"
import type { Tables } from "@/lib/types/database.types"

export function ClientsTable({ clients }: { clients: Tables<"clients">[] }) {
  const [query, setQuery] = React.useState("")
  const [formOpen, setFormOpen] = React.useState(false)
  const [editingClient, setEditingClient] = React.useState<Tables<"clients"> | undefined>()
  const [deletingClient, setDeletingClient] = React.useState<Tables<"clients"> | undefined>()
  const [isDeleting, startDeleteTransition] = React.useTransition()

  const filtered = clients.filter((client) =>
    [client.company_name, client.contact_name, client.email]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(query.toLowerCase()))
  )

  function openCreate() {
    setEditingClient(undefined)
    setFormOpen(true)
  }

  function openEdit(client: Tables<"clients">) {
    setEditingClient(client)
    setFormOpen(true)
  }

  function confirmDelete() {
    if (!deletingClient) return
    startDeleteTransition(async () => {
      const result = await deleteClientRecord(deletingClient.id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Cliente eliminado.")
      }
      setDeletingClient(undefined)
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={openCreate}>
          <Plus />
          Nuevo cliente
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title={query ? "Sin resultados" : "Todavía no hay clientes"}
          description={
            query
              ? "Prueba con otro término de búsqueda."
              : "Crea tu primer cliente para empezar a organizar proyectos y facturación."
          }
          action={
            !query && (
              <Button onClick={openCreate} size="sm">
                <Plus />
                Nuevo cliente
              </Button>
            )
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <EntityAvatar name={client.company_name} />
                      {client.company_name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex flex-col">
                      <span>{client.contact_name || "—"}</span>
                      <span className="text-xs">
                        {client.email || client.phone || ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={clientStatusMap[client.status].label}
                      tone={clientStatusMap[client.status].tone}
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {client.plan || "—"}
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
                        <DropdownMenuItem onSelect={() => openEdit(client)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => setDeletingClient(client)}
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

      <ClientFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        client={editingClient}
      />

      <AlertDialog
        open={Boolean(deletingClient)}
        onOpenChange={(open) => !open && setDeletingClient(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará <strong>{deletingClient?.company_name}</strong> y no se
              podrá deshacer.
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
