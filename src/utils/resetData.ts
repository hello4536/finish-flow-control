
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { seedUsers } from "./seedUsers";

/**
 * Resets all application data in Supabase
 * This will clear all tables in the database
 */
export const resetAllData = async (): Promise<boolean> => {
  try {
    // Display toast notification
    toast({
      title: "Resetting data...",
      description: "Clearing all application data",
    });

    // List of tables to clear (instead of dynamically querying)
    const tablesToClear = [
      "app_users",
      "bookmarks",
      "certifications",
      "compliance_issues",
      "daily_tasks",
      "efficiency_kpis",
      "efficiency_reports",
      "hazardous_waste",
      "inventory_items",
      "jobs",
      "material_compliance",
      "material_suppliers",
      "material_usage",
      "material_usage_logs",
      "materials",
      "paint_colors",
      "ppe_requirements",
      "production_reports",
      "quality_inspections",
      "quality_metrics",
      "recipes",
      "regulatory_compliance",
      "resource_documents",
      "resource_links",
      "resource_notes",
      "resource_receipts",
      "resource_reimbursements",
      "resource_vendors",
      "safety_data_sheets",
      "schedule_events",
      "stains",
      "suppliers",
      "warehouses",
      "workflows",
    ] as const;

    // Delete data from each table
    for (const tableName of tablesToClear) {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Dummy condition to delete all

      if (error) {
        console.error(`Error clearing table ${tableName}:`, error);
      }
    }
    
    // Re-seed essential data
    await seedUsers();

    toast({
      title: "Reset complete",
      description: "All application data has been cleared successfully",
      variant: "default",
    });

    return true;
  } catch (error) {
    console.error("Error resetting data:", error);
    toast({
      title: "Reset failed",
      description: "There was an error clearing the application data",
      variant: "destructive",
    });
    return false;
  }
};

/**
 * Resets the application data silently without UI elements
 * Used for initialization and testing purposes
 */
export const silentReset = async (): Promise<boolean> => {
  try {
    // Use the same reset functionality but without toasts
    const tablesToClear = [
      "app_users",
      "bookmarks",
      "certifications",
      "compliance_issues",
      "daily_tasks",
      "efficiency_kpis", 
      "efficiency_reports",
      "hazardous_waste",
      "inventory_items",
      "jobs",
      "material_compliance",
      "material_suppliers",
      "material_usage",
      "material_usage_logs",
      "materials",
      "paint_colors",
      "ppe_requirements",
      "production_reports",
      "quality_inspections",
      "quality_metrics",
      "recipes",
      "regulatory_compliance",
      "resource_documents",
      "resource_links",
      "resource_notes",
      "resource_receipts",
      "resource_reimbursements",
      "resource_vendors",
      "safety_data_sheets",
      "schedule_events",
      "stains",
      "suppliers",
      "warehouses",
      "workflows",
    ] as const;

    // Delete data from each table
    for (const tableName of tablesToClear) {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (error) {
        console.error(`Error clearing table ${tableName}:`, error);
      }
    }
    
    // Re-seed essential data
    await seedUsers();
    
    return true;
  } catch (error) {
    console.error("Error silently resetting data:", error);
    return false;
  }
};
