
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Location } from '@/types/inventory';

export function useLocationOperations(fetchInventoryData: () => Promise<void>) {
  const { toast } = useToast();

  // Add a new location
  const addLocation = async (location: Omit<Location, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase.from('locations').insert(location);
      
      if (error) throw error;
      
      toast({
        title: "Location added",
        description: `${location.name} has been added to inventory locations.`,
      });
      
      await fetchInventoryData();
      return true;
    } catch (error: any) {
      console.error('Error adding location:', error);
      toast({
        title: "Error adding location",
        description: error.message || "Failed to add location",
        variant: "destructive",
      });
      return false;
    }
  };

  // Update an existing location
  const updateLocation = async (id: string, location: Partial<Omit<Location, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('locations')
        .update(location)
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Location updated",
        description: "The location has been updated successfully.",
      });
      
      await fetchInventoryData();
      return true;
    } catch (error: any) {
      console.error('Error updating location:', error);
      toast({
        title: "Error updating location",
        description: error.message || "Failed to update location",
        variant: "destructive",
      });
      return false;
    }
  };

  // Delete a location
  const deleteLocation = async (id: string) => {
    try {
      // First check if there are any inventory items using this location
      const { data: itemsUsingLocation, error: checkError } = await supabase
        .from('inventory_items')
        .select('id')
        .eq('location_id', id);
      
      if (checkError) throw checkError;
      
      if (itemsUsingLocation && itemsUsingLocation.length > 0) {
        throw new Error(`Cannot delete location: ${itemsUsingLocation.length} inventory items are using this location.`);
      }
      
      // Check if there are any sub-locations
      const { data: subLocations, error: subLocError } = await supabase
        .from('locations')
        .select('id')
        .eq('parent_id', id);
        
      if (subLocError) throw subLocError;
      
      if (subLocations && subLocations.length > 0) {
        throw new Error(`Cannot delete location: ${subLocations.length} sub-locations exist within this location.`);
      }
      
      // Proceed with deletion
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Location deleted",
        description: "The location has been removed.",
      });
      
      await fetchInventoryData();
      return true;
    } catch (error: any) {
      console.error('Error deleting location:', error);
      toast({
        title: "Error deleting location",
        description: error.message || "Failed to delete location",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    addLocation,
    updateLocation,
    deleteLocation
  };
}
