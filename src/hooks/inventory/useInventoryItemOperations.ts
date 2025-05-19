
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InventoryItem } from '@/types/inventory';

export function useInventoryItemOperations(fetchInventoryData: () => Promise<void>) {
  const { toast } = useToast();

  const addInventoryItem = async (item: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase.from('inventory_items').insert(item);
      
      if (error) throw error;
      
      toast({
        title: "Item added",
        description: `${item.name} has been added to inventory.`,
      });
      
      await fetchInventoryData();
      return true;
    } catch (error: any) {
      console.error('Error adding inventory item:', error);
      toast({
        title: "Error adding item",
        description: error.message || "Failed to add inventory item",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteInventoryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Item deleted",
        description: "The inventory item has been removed.",
      });
      
      await fetchInventoryData();
      return true;
    } catch (error: any) {
      console.error('Error deleting inventory item:', error);
      toast({
        title: "Error deleting item",
        description: error.message || "Failed to delete inventory item",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    addInventoryItem,
    deleteInventoryItem
  };
}
