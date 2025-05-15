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
