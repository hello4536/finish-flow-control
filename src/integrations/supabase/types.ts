export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_users: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login: string | null
          name: string
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_login?: string | null
          name: string
          role: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          name?: string
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          category: string
          created_at: string
          id: string
          notes: string | null
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          notes?: string | null
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          notes?: string | null
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          authority: string
          certification_id: string
          created_at: string
          expiry: string
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          authority: string
          certification_id: string
          created_at?: string
          expiry: string
          id?: string
          name: string
          status: string
          updated_at?: string
        }
        Update: {
          authority?: string
          certification_id?: string
          created_at?: string
          expiry?: string
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      compliance_issues: {
        Row: {
          assignee: string
          created_at: string
          date: string
          description: string
          id: string
          issue_id: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          assignee: string
          created_at?: string
          date: string
          description: string
          id?: string
          issue_id: string
          status: string
          type: string
          updated_at?: string
        }
        Update: {
          assignee?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          issue_id?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      efficiency_kpis: {
        Row: {
          created_at: string
          date_range: string
          full_mark: number
          id: string
          score: number
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_range: string
          full_mark?: number
          id?: string
          score: number
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_range?: string
          full_mark?: number
          id?: string
          score?: number
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      efficiency_reports: {
        Row: {
          created_at: string
          date: string
          date_range: string
          downtime: number
          efficiency: number
          id: string
          updated_at: string
          utilization: number
        }
        Insert: {
          created_at?: string
          date: string
          date_range: string
          downtime: number
          efficiency: number
          id?: string
          updated_at?: string
          utilization: number
        }
        Update: {
          created_at?: string
          date?: string
          date_range?: string
          downtime?: number
          efficiency?: number
          id?: string
          updated_at?: string
          utilization?: number
        }
        Relationships: []
      }
      inventory_items: {
        Row: {
          allocated: number
          available: number
          category: string
          created_at: string
          id: string
          in_stock: number
          location: string
          name: string
          sku: string
          updated_at: string
        }
        Insert: {
          allocated?: number
          available?: number
          category: string
          created_at?: string
          id?: string
          in_stock?: number
          location: string
          name: string
          sku: string
          updated_at?: string
        }
        Update: {
          allocated?: number
          available?: number
          category?: string
          created_at?: string
          id?: string
          in_stock?: number
          location?: string
          name?: string
          sku?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          assigned_to: string | null
          created_at: string
          current_step: string | null
          due_date: string | null
          id: string
          job_number: string
          name: string
          status: string
          trade: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          current_step?: string | null
          due_date?: string | null
          id?: string
          job_number: string
          name: string
          status: string
          trade: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          current_step?: string | null
          due_date?: string | null
          id?: string
          job_number?: string
          name?: string
          status?: string
          trade?: string
          updated_at?: string
        }
        Relationships: []
      }
      material_suppliers: {
        Row: {
          created_at: string
          id: string
          material_id: string
          supplier_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          supplier_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          supplier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_suppliers_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_suppliers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      material_usage: {
        Row: {
          category: string
          color: string
          created_at: string
          date_range: string
          id: string
          material: string
          updated_at: string
          value: number
        }
        Insert: {
          category: string
          color: string
          created_at?: string
          date_range: string
          id?: string
          material: string
          updated_at?: string
          value: number
        }
        Update: {
          category?: string
          color?: string
          created_at?: string
          date_range?: string
          id?: string
          material?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      materials: {
        Row: {
          created_at: string
          id: string
          name: string
          quantity: number
          status: string
          type: string
          unit: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          quantity?: number
          status: string
          type: string
          unit: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          quantity?: number
          status?: string
          type?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      paint_colors: {
        Row: {
          created_at: string
          hex_code: string
          id: string
          name: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          hex_code: string
          id?: string
          name: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          hex_code?: string
          id?: string
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      production_reports: {
        Row: {
          completed: number
          created_at: string
          date: string
          date_range: string
          id: string
          in_progress: number | null
          planned: number
          updated_at: string
        }
        Insert: {
          completed: number
          created_at?: string
          date: string
          date_range: string
          id?: string
          in_progress?: number | null
          planned: number
          updated_at?: string
        }
        Update: {
          completed?: number
          created_at?: string
          date?: string
          date_range?: string
          id?: string
          in_progress?: number | null
          planned?: number
          updated_at?: string
        }
        Relationships: []
      }
      quality_inspections: {
        Row: {
          created_at: string
          date: string
          id: string
          inspection_id: string
          inspector: string
          notes: string | null
          product: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          inspection_id: string
          inspector: string
          notes?: string | null
          product: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          inspection_id?: string
          inspector?: string
          notes?: string | null
          product?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      quality_metrics: {
        Row: {
          created_at: string
          date: string
          date_range: string
          defect_rate: number
          first_pass_yield: number
          id: string
          rework: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          date_range: string
          defect_rate: number
          first_pass_yield: number
          id?: string
          rework: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          date_range?: string
          defect_rate?: number
          first_pass_yield?: number
          id?: string
          rework?: number
          updated_at?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          created_at: string
          id: string
          instructions: string
          materials: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instructions: string
          materials: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instructions?: string
          materials?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      regulatory_compliance: {
        Row: {
          applies: boolean
          created_at: string
          feature_key: string
          id: string
          jurisdiction: string
          notes: string | null
          region: string
          requirement: string
          updated_at: string
        }
        Insert: {
          applies?: boolean
          created_at?: string
          feature_key: string
          id?: string
          jurisdiction: string
          notes?: string | null
          region: string
          requirement: string
          updated_at?: string
        }
        Update: {
          applies?: boolean
          created_at?: string
          feature_key?: string
          id?: string
          jurisdiction?: string
          notes?: string | null
          region?: string
          requirement?: string
          updated_at?: string
        }
        Relationships: []
      }
      resource_documents: {
        Row: {
          created_at: string
          id: string
          name: string
          size: number
          type: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          size: number
          type: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          size?: number
          type?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      resource_links: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      resource_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      resource_receipts: {
        Row: {
          amount: number
          category: string | null
          company: string
          created_at: string
          date: string
          file_url: string
          id: string
          name: string
          notes: string | null
          size: number
          type: string
          updated_at: string
        }
        Insert: {
          amount: number
          category?: string | null
          company: string
          created_at?: string
          date: string
          file_url: string
          id?: string
          name: string
          notes?: string | null
          size: number
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string | null
          company?: string
          created_at?: string
          date?: string
          file_url?: string
          id?: string
          name?: string
          notes?: string | null
          size?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      resource_vendors: {
        Row: {
          contact: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          contact?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          contact?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      schedule_events: {
        Row: {
          assigned_to: string | null
          created_at: string
          date: string
          description: string | null
          end_time: string | null
          event_id: string
          id: string
          location: string | null
          status: string
          time: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          date: string
          description?: string | null
          end_time?: string | null
          event_id: string
          id?: string
          location?: string | null
          status?: string
          time: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          date?: string
          description?: string | null
          end_time?: string | null
          event_id?: string
          id?: string
          location?: string | null
          status?: string
          time?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      stains: {
        Row: {
          brand: string
          color: string
          created_at: string
          id: string
          name: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          brand: string
          color: string
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          brand?: string
          color?: string
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          contact: string
          created_at: string
          id: string
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          contact: string
          created_at?: string
          id?: string
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          contact?: string
          created_at?: string
          id?: string
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      warehouses: {
        Row: {
          capacity: number
          created_at: string
          id: string
          location: string
          name: string
          updated_at: string
          utilized: number
        }
        Insert: {
          capacity?: number
          created_at?: string
          id?: string
          location: string
          name: string
          updated_at?: string
          utilized?: number
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          location?: string
          name?: string
          updated_at?: string
          utilized?: number
        }
        Relationships: []
      }
      workflows: {
        Row: {
          active_jobs: number
          created_at: string
          description: string | null
          id: string
          last_exported_at: string | null
          last_imported_at: string | null
          name: string
          status: string
          steps: Json
          trade: string
          updated_at: string
          workflow_number: string
        }
        Insert: {
          active_jobs?: number
          created_at?: string
          description?: string | null
          id?: string
          last_exported_at?: string | null
          last_imported_at?: string | null
          name: string
          status: string
          steps?: Json
          trade: string
          updated_at?: string
          workflow_number: string
        }
        Update: {
          active_jobs?: number
          created_at?: string
          description?: string | null
          id?: string
          last_exported_at?: string | null
          last_imported_at?: string | null
          name?: string
          status?: string
          steps?: Json
          trade?: string
          updated_at?: string
          workflow_number?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
