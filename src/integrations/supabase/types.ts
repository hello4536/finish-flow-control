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
      article_bookmarks: {
        Row: {
          article_id: number
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          article_id: number
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          article_id?: number
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      article_feedback: {
        Row: {
          article_id: number
          comment: string | null
          created_at: string
          id: string
          rating: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          article_id: number
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          article_id?: number
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          updated_at?: string
          user_id?: string | null
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
      booth_reservations: {
        Row: {
          booth_id: string
          created_at: string
          date: string
          end_time: string
          id: string
          job_reference: string | null
          notes: string | null
          priority: string
          reserved_by: string
          start_time: string
          status: string
          updated_at: string
        }
        Insert: {
          booth_id: string
          created_at?: string
          date: string
          end_time: string
          id?: string
          job_reference?: string | null
          notes?: string | null
          priority?: string
          reserved_by: string
          start_time: string
          status?: string
          updated_at?: string
        }
        Update: {
          booth_id?: string
          created_at?: string
          date?: string
          end_time?: string
          id?: string
          job_reference?: string | null
          notes?: string | null
          priority?: string
          reserved_by?: string
          start_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booth_reservations_booth_id_fkey"
            columns: ["booth_id"]
            isOneToOne: false
            referencedRelation: "spray_booths"
            referencedColumns: ["id"]
          },
        ]
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
      compliance_automation_settings: {
        Row: {
          created_at: string
          enabled: boolean | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean | null
          id?: string
          setting_key: string
          setting_value?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean | null
          id?: string
          setting_key?: string
          setting_value?: Json
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
      compliance_reports: {
        Row: {
          content: Json | null
          created_at: string
          due_date: string
          file_url: string | null
          generated_at: string | null
          id: string
          notes: string | null
          report_type: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          due_date: string
          file_url?: string | null
          generated_at?: string | null
          id?: string
          notes?: string | null
          report_type: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          due_date?: string
          file_url?: string | null
          generated_at?: string | null
          id?: string
          notes?: string | null
          report_type?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_tasks: {
        Row: {
          created_at: string
          description: string | null
          due_date: string
          due_time: string | null
          id: string
          priority: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date: string
          due_time?: string | null
          id?: string
          priority: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string
          due_time?: string | null
          id?: string
          priority?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
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
      equipment: {
        Row: {
          brand: string | null
          condition: string
          created_at: string
          id: string
          model: string | null
          name: string
          notes: string | null
          purchase_cost: number | null
          purchase_date: string | null
          serial_number: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          brand?: string | null
          condition?: string
          created_at?: string
          id?: string
          model?: string | null
          name: string
          notes?: string | null
          purchase_cost?: number | null
          purchase_date?: string | null
          serial_number?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          brand?: string | null
          condition?: string
          created_at?: string
          id?: string
          model?: string | null
          name?: string
          notes?: string | null
          purchase_cost?: number | null
          purchase_date?: string | null
          serial_number?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      equipment_assignments: {
        Row: {
          assigned_by: string
          assigned_date: string
          assigned_to: string
          created_at: string
          equipment_id: string
          id: string
          notes: string | null
          return_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          assigned_by: string
          assigned_date?: string
          assigned_to: string
          created_at?: string
          equipment_id: string
          id?: string
          notes?: string | null
          return_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_by?: string
          assigned_date?: string
          assigned_to?: string
          created_at?: string
          equipment_id?: string
          id?: string
          notes?: string | null
          return_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_assignments_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_maintenance: {
        Row: {
          cost: number | null
          created_at: string
          equipment_id: string
          id: string
          maintenance_date: string
          maintenance_type: string
          next_maintenance_date: string | null
          notes: string | null
          performed_by: string
          updated_at: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          equipment_id: string
          id?: string
          maintenance_date?: string
          maintenance_type: string
          next_maintenance_date?: string | null
          notes?: string | null
          performed_by: string
          updated_at?: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          equipment_id?: string
          id?: string
          maintenance_date?: string
          maintenance_type?: string
          next_maintenance_date?: string | null
          notes?: string | null
          performed_by?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_maintenance_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      hazardous_waste: {
        Row: {
          created_at: string
          disposal_date: string
          disposal_method: string
          handler: string
          id: string
          manifest_number: string | null
          material: string
          material_id: string | null
          notes: string | null
          quantity: number
          status: string
          unit: string
          updated_at: string
          waste_id: string
        }
        Insert: {
          created_at?: string
          disposal_date: string
          disposal_method: string
          handler: string
          id?: string
          manifest_number?: string | null
          material: string
          material_id?: string | null
          notes?: string | null
          quantity: number
          status: string
          unit: string
          updated_at?: string
          waste_id: string
        }
        Update: {
          created_at?: string
          disposal_date?: string
          disposal_method?: string
          handler?: string
          id?: string
          manifest_number?: string | null
          material?: string
          material_id?: string | null
          notes?: string | null
          quantity?: number
          status?: string
          unit?: string
          updated_at?: string
          waste_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hazardous_waste_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          allocated: number
          available: number
          barcode: string | null
          brand: string | null
          category: string
          cost_per_unit: number | null
          created_at: string
          expiration_date: string | null
          grit: number | null
          hazard_class: string | null
          id: string
          in_stock: number
          is_consumable: boolean | null
          location: string
          location_id: string | null
          min_quantity: number | null
          name: string
          product_type: string | null
          sds_link: string | null
          sku: string
          status: string | null
          storage_zone: string | null
          updated_at: string
          voc_content: number | null
        }
        Insert: {
          allocated?: number
          available?: number
          barcode?: string | null
          brand?: string | null
          category: string
          cost_per_unit?: number | null
          created_at?: string
          expiration_date?: string | null
          grit?: number | null
          hazard_class?: string | null
          id?: string
          in_stock?: number
          is_consumable?: boolean | null
          location: string
          location_id?: string | null
          min_quantity?: number | null
          name: string
          product_type?: string | null
          sds_link?: string | null
          sku: string
          status?: string | null
          storage_zone?: string | null
          updated_at?: string
          voc_content?: number | null
        }
        Update: {
          allocated?: number
          available?: number
          barcode?: string | null
          brand?: string | null
          category?: string
          cost_per_unit?: number | null
          created_at?: string
          expiration_date?: string | null
          grit?: number | null
          hazard_class?: string | null
          id?: string
          in_stock?: number
          is_consumable?: boolean | null
          location?: string
          location_id?: string | null
          min_quantity?: number | null
          name?: string
          product_type?: string | null
          sds_link?: string | null
          sku?: string
          status?: string | null
          storage_zone?: string | null
          updated_at?: string
          voc_content?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepted: boolean | null
          created_at: string
          email: string
          expires_at: string
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          token: string
        }
        Insert: {
          accepted?: boolean | null
          created_at?: string
          email: string
          expires_at: string
          id?: string
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"]
          token: string
        }
        Update: {
          accepted?: boolean | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          actual_total: number | null
          assigned_to: string | null
          created_at: string
          current_step: string | null
          due_date: string | null
          estimated_hours: number | null
          estimated_total: number | null
          hourly_rate: number | null
          id: string
          job_number: string
          labor_cost: number | null
          material_cost: number | null
          name: string
          overhead_cost: number | null
          profit_margin: number | null
          status: string
          trade: string
          updated_at: string
        }
        Insert: {
          actual_total?: number | null
          assigned_to?: string | null
          created_at?: string
          current_step?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          estimated_total?: number | null
          hourly_rate?: number | null
          id?: string
          job_number: string
          labor_cost?: number | null
          material_cost?: number | null
          name: string
          overhead_cost?: number | null
          profit_margin?: number | null
          status: string
          trade: string
          updated_at?: string
        }
        Update: {
          actual_total?: number | null
          assigned_to?: string | null
          created_at?: string
          current_step?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          estimated_total?: number | null
          hourly_rate?: number | null
          id?: string
          job_number?: string
          labor_cost?: number | null
          material_cost?: number | null
          name?: string
          overhead_cost?: number | null
          profit_margin?: number | null
          status?: string
          trade?: string
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          capacity: number
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          type: string
          updated_at: string
          utilized: number
        }
        Insert: {
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          type: string
          updated_at?: string
          utilized?: number
        }
        Update: {
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          type?: string
          updated_at?: string
          utilized?: number
        }
        Relationships: [
          {
            foreignKeyName: "locations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          created_at: string
          description: string | null
          equipment_id: string
          id: string
          resolved_at: string | null
          schedule_id: string | null
          severity: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          created_at?: string
          description?: string | null
          equipment_id: string
          id?: string
          resolved_at?: string | null
          schedule_id?: string | null
          severity?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          created_at?: string
          description?: string | null
          equipment_id?: string
          id?: string
          resolved_at?: string | null
          schedule_id?: string | null
          severity?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_alerts_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_alerts_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "maintenance_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_schedules: {
        Row: {
          alert_days_before: number | null
          automated_alert: boolean | null
          created_at: string
          equipment_id: string
          frequency_days: number
          id: string
          last_performed: string | null
          maintenance_type: string
          next_due: string
          notes: string | null
          priority: string
          status: string
          updated_at: string
        }
        Insert: {
          alert_days_before?: number | null
          automated_alert?: boolean | null
          created_at?: string
          equipment_id: string
          frequency_days?: number
          id?: string
          last_performed?: string | null
          maintenance_type: string
          next_due: string
          notes?: string | null
          priority?: string
          status?: string
          updated_at?: string
        }
        Update: {
          alert_days_before?: number | null
          automated_alert?: boolean | null
          created_at?: string
          equipment_id?: string
          frequency_days?: number
          id?: string
          last_performed?: string | null
          maintenance_type?: string
          next_due?: string
          notes?: string | null
          priority?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_schedules_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
        ]
      }
      material_compliance: {
        Row: {
          compliance_note: string | null
          created_at: string
          id: string
          material_id: string
          ppe_requirement_id: string | null
          updated_at: string
        }
        Insert: {
          compliance_note?: string | null
          created_at?: string
          id?: string
          material_id: string
          ppe_requirement_id?: string | null
          updated_at?: string
        }
        Update: {
          compliance_note?: string | null
          created_at?: string
          id?: string
          material_id?: string
          ppe_requirement_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_compliance_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_compliance_ppe_requirement_id_fkey"
            columns: ["ppe_requirement_id"]
            isOneToOne: false
            referencedRelation: "ppe_requirements"
            referencedColumns: ["id"]
          },
        ]
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
      material_usage_logs: {
        Row: {
          created_at: string
          id: string
          job_reference: string | null
          material_id: string
          notes: string | null
          quantity: number
          total_cost: number | null
          unit: string
          unit_cost: number | null
          used_at: string
          used_by: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_reference?: string | null
          material_id: string
          notes?: string | null
          quantity: number
          total_cost?: number | null
          unit: string
          unit_cost?: number | null
          used_at?: string
          used_by?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_reference?: string | null
          material_id?: string
          notes?: string | null
          quantity?: number
          total_cost?: number | null
          unit?: string
          unit_cost?: number | null
          used_at?: string
          used_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_usage_logs_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          cost_per_unit: number | null
          created_at: string
          disposal_method: string | null
          hazard_class: string | null
          id: string
          is_hazardous: boolean | null
          name: string
          quantity: number
          safety_data_sheet_url: string | null
          status: string
          type: string
          unit: string
          updated_at: string
        }
        Insert: {
          cost_per_unit?: number | null
          created_at?: string
          disposal_method?: string | null
          hazard_class?: string | null
          id?: string
          is_hazardous?: boolean | null
          name: string
          quantity?: number
          safety_data_sheet_url?: string | null
          status: string
          type: string
          unit: string
          updated_at?: string
        }
        Update: {
          cost_per_unit?: number | null
          created_at?: string
          disposal_method?: string | null
          hazard_class?: string | null
          id?: string
          is_hazardous?: boolean | null
          name?: string
          quantity?: number
          safety_data_sheet_url?: string | null
          status?: string
          type?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_sends: {
        Row: {
          clicked_at: string | null
          created_at: string
          delivery_status: string
          id: string
          newsletter_id: string
          opened_at: string | null
          sent_at: string
          subscriber_id: string
        }
        Insert: {
          clicked_at?: string | null
          created_at?: string
          delivery_status?: string
          id?: string
          newsletter_id: string
          opened_at?: string | null
          sent_at?: string
          subscriber_id: string
        }
        Update: {
          clicked_at?: string | null
          created_at?: string
          delivery_status?: string
          id?: string
          newsletter_id?: string
          opened_at?: string | null
          sent_at?: string
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_sends_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "newsletters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_sends_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "newsletter_subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          confirmation_token: string | null
          created_at: string
          email: string
          id: string
          status: string
          subscription_type: string
          unsubscribe_token: string
          updated_at: string
        }
        Insert: {
          confirmation_token?: string | null
          created_at?: string
          email: string
          id?: string
          status?: string
          subscription_type: string
          unsubscribe_token?: string
          updated_at?: string
        }
        Update: {
          confirmation_token?: string | null
          created_at?: string
          email?: string
          id?: string
          status?: string
          subscription_type?: string
          unsubscribe_token?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletters: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          newsletter_type: string
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          newsletter_type: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          newsletter_type?: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      org_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          stripe_customer_id: string | null
          subscription_end_date: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          stripe_customer_id?: string | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          stripe_customer_id?: string | null
          subscription_end_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_subscription_tier_fkey"
            columns: ["subscription_tier"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
        ]
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
      ppe_requirements: {
        Row: {
          created_at: string
          department: string
          equipment: string
          id: string
          last_inspection: string
          next_inspection: string
          notes: string | null
          required_by: string
          requirement_id: string
          standard: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          equipment: string
          id?: string
          last_inspection: string
          next_inspection: string
          notes?: string | null
          required_by: string
          requirement_id: string
          standard: string
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          equipment?: string
          id?: string
          last_inspection?: string
          next_inspection?: string
          notes?: string | null
          required_by?: string
          requirement_id?: string
          standard?: string
          status?: string
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
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
          description: string | null
          id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
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
      resource_reimbursements: {
        Row: {
          amount: number
          created_at: string
          date: string
          description: string | null
          employee_name: string
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          date: string
          description?: string | null
          employee_name: string
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          date?: string
          description?: string | null
          employee_name?: string
          id?: string
          status?: string
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
      safety_data_sheets: {
        Row: {
          created_at: string
          expiry_date: string | null
          file_name: string
          file_url: string
          id: string
          issue_date: string | null
          material_id: string
          updated_at: string
          version: string | null
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          file_name: string
          file_url: string
          id?: string
          issue_date?: string | null
          material_id: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          file_name?: string
          file_url?: string
          id?: string
          issue_date?: string | null
          material_id?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_data_sheets_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
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
      spray_booths: {
        Row: {
          booth_number: string
          capacity: number | null
          created_at: string
          id: string
          location: string | null
          name: string
          notes: string | null
          specifications: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          booth_number: string
          capacity?: number | null
          created_at?: string
          id?: string
          location?: string | null
          name: string
          notes?: string | null
          specifications?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          booth_number?: string
          capacity?: number | null
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          notes?: string | null
          specifications?: Json | null
          status?: string
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
      subscription_tiers: {
        Row: {
          created_at: string
          description: string
          features: Json
          id: string
          name: string
          price: number
          stripe_price_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          features?: Json
          id?: string
          name: string
          price: number
          stripe_price_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: Json
          id?: string
          name?: string
          price?: number
          stripe_price_id?: string
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
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      calculate_job_costs: {
        Args: { job_id: string }
        Returns: undefined
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_user_organization: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          user_id: string
          role_name: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "employee"
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
    Enums: {
      app_role: ["admin", "employee"],
    },
  },
} as const
