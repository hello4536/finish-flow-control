
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InventoryItem, Warehouse, Location } from '@/types/inventory';

export function useFetchInventoryData() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
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
      
      // Fetch warehouses (legacy)
      const { data: warehousesData, error: warehousesError } = await supabase
        .from('warehouses')
        .select('*');

      if (warehousesError) throw warehousesError;
      setWarehouses(warehousesData || []);

      // Fetch locations (new)
      const { data: locationsData, error: locationsError } = await supabase
        .from('location_paths') // Use the view to get hierarchical data
        .select('*')
        .order('level', { ascending: true })
        .order('full_path', { ascending: true });

      if (locationsError) throw locationsError;
      // Cast the data to Location[] type since it comes from the view
      setLocations((locationsData || []) as Location[]);

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
      
    const locationsChannel = supabase
      .channel('public:locations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'locations' },
        () => fetchInventoryData())
      .subscribe();
      
    return () => {
      supabase.removeChannel(itemsChannel);
      supabase.removeChannel(warehousesChannel);
      supabase.removeChannel(locationsChannel);
    };
  }, []);

  return {
    inventoryItems,
    warehouses,
    locations,
    isLoading,
    fetchInventoryData,
  };
}
