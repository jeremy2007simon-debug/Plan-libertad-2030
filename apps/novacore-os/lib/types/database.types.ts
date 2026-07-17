/**
 * Tipos generados a mano a partir de supabase/migrations/0001_init_schema.sql,
 * siguiendo el formato exacto de `supabase gen types typescript`.
 *
 * Cuando el proyecto Supabase esté provisionado, reemplazar por:
 *   npx supabase gen types typescript --project-id <id> > lib/types/database.types.ts
 */

type Relationship = {
  foreignKeyName: string
  columns: string[]
  isOneToOne: boolean
  referencedRelation: string
  referencedColumns: string[]
}

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          role: Database["public"]["Enums"]["member_role"]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string
          avatar_url?: string | null
          role?: Database["public"]["Enums"]["member_role"]
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>
        Relationships: []
      }
      clients: {
        Row: {
          id: string
          company_name: string
          contact_name: string
          email: string | null
          phone: string | null
          status: Database["public"]["Enums"]["client_status"]
          plan: string | null
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          contact_name?: string
          email?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["client_status"]
          plan?: string | null
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "clients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          description: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          description?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["sectors"]["Insert"]>
        Relationships: []
      }
      library_models: {
        Row: {
          id: string
          sector_id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          features: string[]
          avg_build_time_days: number | null
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          sector_id: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          features?: string[]
          avg_build_time_days?: number | null
          updated_at?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["library_models"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "library_models_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          id: string
          name: string
          client_id: string
          status: Database["public"]["Enums"]["project_status"]
          library_model_id: string | null
          owner_id: string | null
          start_date: string | null
          due_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          client_id: string
          status?: Database["public"]["Enums"]["project_status"]
          library_model_id?: string | null
          owner_id?: string | null
          start_date?: string | null
          due_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          Relationship & {
            foreignKeyName: "projects_library_model_id_fkey"
            columns: ["library_model_id"]
            isOneToOne: false
            referencedRelation: "library_models"
            referencedColumns: ["id"]
          },
          Relationship & {
            foreignKeyName: "projects_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      template_categories: {
        Row: { id: string; name: string; slug: string }
        Insert: { id?: string; name: string; slug: string }
        Update: Partial<
          Database["public"]["Tables"]["template_categories"]["Insert"]
        >
        Relationships: []
      }
      templates: {
        Row: {
          id: string
          category_id: string | null
          name: string
          description: string | null
          content: string
          usage_count: number
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          description?: string | null
          content?: string
          usage_count?: number
          updated_at?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["templates"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "template_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          sort_order?: number
        }
        Update: Partial<
          Database["public"]["Tables"]["prompt_categories"]["Insert"]
        >
        Relationships: []
      }
      prompts: {
        Row: {
          id: string
          category_id: string
          title: string
          content: string
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          title: string
          content: string
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["prompts"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "prompts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "prompt_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          id: string
          client_id: string | null
          project_id: string | null
          title: string
          status: Database["public"]["Enums"]["budget_status"]
          amount: number
          currency: string
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          project_id?: string | null
          title: string
          status?: Database["public"]["Enums"]["budget_status"]
          amount?: number
          currency?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["budgets"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "budgets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          Relationship & {
            foreignKeyName: "budgets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          id: string
          client_id: string
          project_id: string | null
          number: string
          status: Database["public"]["Enums"]["invoice_status"]
          amount: number
          currency: string
          issued_at: string | null
          due_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          project_id?: string | null
          number: string
          status?: Database["public"]["Enums"]["invoice_status"]
          amount?: number
          currency?: string
          issued_at?: string | null
          due_at?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          Relationship & {
            foreignKeyName: "invoices_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      automations: {
        Row: {
          id: string
          name: string
          description: string | null
          status: Database["public"]["Enums"]["automation_status"]
          trigger_label: string | null
          action_label: string | null
          last_run_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: Database["public"]["Enums"]["automation_status"]
          trigger_label?: string | null
          action_label?: string | null
          last_run_at?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["automations"]["Insert"]>
        Relationships: []
      }
      meetings: {
        Row: {
          id: string
          title: string
          client_id: string | null
          starts_at: string
          location: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          client_id?: string | null
          starts_at: string
          location?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["meetings"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "meetings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          id: string
          title: string
          status: Database["public"]["Enums"]["task_status"]
          due_date: string
          assignee_id: string | null
          project_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          status?: Database["public"]["Enums"]["task_status"]
          due_date?: string
          assignee_id?: string | null
          project_id?: string | null
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["tasks"]["Insert"]>
        Relationships: [
          Relationship & {
            foreignKeyName: "tasks_assignee_id_fkey"
            columns: ["assignee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          Relationship & {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      member_role: "owner" | "admin" | "member"
      client_status: "potencial" | "activo" | "pausado" | "finalizado"
      project_status:
        | "pendiente"
        | "en_desarrollo"
        | "revision"
        | "entregado"
        | "archivado"
      budget_status: "borrador" | "enviado" | "aceptado" | "rechazado"
      invoice_status:
        | "borrador"
        | "pendiente"
        | "pagada"
        | "vencida"
        | "cancelada"
      automation_status: "activo" | "pausado" | "error"
      task_status: "pendiente" | "completada"
    }
    CompositeTypes: Record<string, never>
  }
}

export type MemberRole = Database["public"]["Enums"]["member_role"]
export type ClientStatus = Database["public"]["Enums"]["client_status"]
export type ProjectStatus = Database["public"]["Enums"]["project_status"]
export type BudgetStatus = Database["public"]["Enums"]["budget_status"]
export type InvoiceStatus = Database["public"]["Enums"]["invoice_status"]
export type AutomationStatus = Database["public"]["Enums"]["automation_status"]
export type TaskStatus = Database["public"]["Enums"]["task_status"]

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
