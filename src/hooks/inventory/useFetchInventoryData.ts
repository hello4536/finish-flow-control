
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

      // Fetch locations (new approach)
      // Instead of using the location_paths view which is causing SECURITY DEFINER issues,
      // we'll fetch from the locations table directly and handle the hierarchy in the frontend
      const { data: locationsData, error: locationsError } = await supabase
        .from('locations')
        .select('*');

      if (locationsError) throw locationsError;
      
      // Process the locations to create a similar structure to what we had before
      const processedLocations = processLocationHierarchy(locationsData || []);
      setLocations(processedLocations);

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

  // Helper function to process location hierarchy and create full paths
  const processLocationHierarchy = (locationsData: any[]): Location[] => {
    // Create a map of locations by id for easy lookup
    const locationMap = new Map();
    locationsData.forEach(location => {
      locationMap.set(location.id, {
        ...location,
        level: 0,
        path_array: [],
        full_path: location.name
      });
    });
    
    // Calculate levels and paths
    const processedLocations = locationsData.map(location => {
      let currentLocation = location;
      let level = 0;
      let path = [location.name];
      let parentChain = [];
      
      // Traverse up the parent chain
      while (currentLocation.parent_id && locationMap.has(currentLocation.parent_id)) {
        const parent = locationMap.get(currentLocation.parent_id);
        level++;
        path.unshift(parent.name);
        parentChain.push(parent);
        currentLocation = parent;
      }
      
      return {
        ...location,
        level,
        path_array: path,
        full_path: path.join(' > ')
      };
    });
    
    // Sort by level and name for consistent display
    return processedLocations.sort((a, b) => {
      if (a.level !== b.level) return a.level - b.level;
      return a.full_path.localeCompare(b.full_path);
    });
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
