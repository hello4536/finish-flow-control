
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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

    // Get all tables in the public schema
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public");

    if (tablesError) {
      throw tablesError;
    }

    // Delete data from each table
    for (const table of tables || []) {
      const tableName = table.table_name;
      // Skip certain system tables that shouldn't be cleared
      if (tableName.startsWith("_") || tableName === "location_paths") {
        continue;
      }
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Dummy condition to delete all

      if (error) {
        console.error(`Error clearing table ${tableName}:`, error);
      }
    }

    toast({
      title: "Reset complete",
      description: "All application data has been cleared successfully",
      variant: "success",
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
