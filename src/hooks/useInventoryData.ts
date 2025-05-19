
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InventoryItem, Warehouse } from '@/types/inventory';

export function useInventoryData() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchInventoryData = async () => {
    setIsLoading(true);
    try {
      // Fetch inventory items
      const { data: itemsData, error: itemsError } = await supabase
        .from('inventory_items')
        .select('*');

      if (itemsError) throw itemsError;
      setInventoryItems(itemsData || []);
      
      // Fetch warehouses
      const { data: warehousesData, error: warehousesError } = await supabase
        .from('warehouses')
        .select('*');

      if (warehousesError) throw warehousesError;
      setWarehouses(warehousesData || []);

    } catch (error: any) {
      console.error('Error fetching inventory data:', error);
      toast({
        title: "Error fetching data",
        description: error.message || "Failed to load inventory data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter inventory items based on search term and active tab
  const filterItems = (searchTerm: string, activeTab: string) => {
    return inventoryItems.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.product_type && item.product_type.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (activeTab === "all") return matchesSearch;
      if (activeTab === "furniture") return matchesSearch && item.category === "Furniture";
      if (activeTab === "kitchen") return matchesSearch && item.category === "Kitchen";
      if (activeTab === "basecoats") return matchesSearch && item.category === "Basecoats";
      if (activeTab === "clearcoats") return matchesSearch && item.category === "Clearcoats";
      if (activeTab === "primers") return matchesSearch && item.category === "Primers";
      if (activeTab === "abrasives") return matchesSearch && item.category === "Abrasives";
      if (activeTab === "tools") return matchesSearch && item.category === "Tools";
      if (activeTab === "ppe") return matchesSearch && item.category === "PPE";
      if (activeTab === "low") {
        return matchesSearch && (
          item.available < (item.min_quantity || 5) || 
          item.status === "Expiring" ||
          item.status === "Low Stock" ||
          item.status === "Out of Stock"
        );
      }
      if (activeTab === "expiring") {
        return matchesSearch && item.status === "Expiring";
      }
      
      return matchesSearch;
    });
  };

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

  useEffect(() => {
    fetchInventoryData();

    // Set up realtime subscription
    const itemsChannel = supabase
      .channel('public:inventory_items')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory_items' }, 
        () => fetchInventoryData())
      .subscribe();

    const warehousesChannel = supabase
      .channel('public:warehouses')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'warehouses' },
        () => fetchInventoryData())
      .subscribe();
      
    return () => {
      supabase.removeChannel(itemsChannel);
      supabase.removeChannel(warehousesChannel);
    };
  }, []);

  return {
    inventoryItems,
    warehouses,
    isLoading,
    filterItems,
    addInventoryItem,
    deleteInventoryItem,
    fetchInventoryData
  };
}
