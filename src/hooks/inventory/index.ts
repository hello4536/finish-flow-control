
import { useFetchInventoryData } from './useFetchInventoryData';
import { useInventoryItemOperations } from './useInventoryItemOperations';
import { useLocationOperations } from './useLocationOperations';
import { useInventoryItemFilters } from './useInventoryFilters';

export function useInventoryData() {
  const { 
    inventoryItems, 
    warehouses, 
    locations, 
    isLoading,
    fetchInventoryData 
  } = useFetchInventoryData();
  
  const { 
    addInventoryItem, 
    deleteInventoryItem 
  } = useInventoryItemOperations(fetchInventoryData);
  
  const { 
    addLocation, 
    updateLocation, 
    deleteLocation 
  } = useLocationOperations(fetchInventoryData);
  
  const { filterItems } = useInventoryItemFilters();

  return {
    // Data
    inventoryItems,
    warehouses,
    locations,
    isLoading,
    
    // Item operations
    addInventoryItem,
    deleteInventoryItem,
    
    // Location operations
    addLocation,
    updateLocation,
    deleteLocation,
    
    // Utilities
    fetchInventoryData,
    filterItems
  };
}

// Re-export all the individual hooks for direct use if needed
export { useFetchInventoryData } from './useFetchInventoryData';
export { useInventoryItemOperations } from './useInventoryItemOperations';
export { useLocationOperations } from './useLocationOperations';
export { useInventoryItemFilters } from './useInventoryFilters';
