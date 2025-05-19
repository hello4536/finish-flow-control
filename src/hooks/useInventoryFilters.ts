
import { useState } from 'react';
import { InventoryItem } from '@/types/inventory';

type InventoryFilters = {
  category: string;
  productType: string;
  brand: string;
  hazardClass: string;
  minVoc: number | undefined;
  maxVoc: number | undefined;
  isConsumable: boolean | null;
};

export function useInventoryFilters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState<InventoryFilters>({
    category: "All",
    productType: "All",
    brand: "All",
    hazardClass: "All",
    minVoc: undefined,
    maxVoc: undefined,
    isConsumable: null,
  });

  // Enhanced filter function to handle auto body fields
  const applyFilters = (items: InventoryItem[]) => {
    // First apply search term and tab filters
    let filteredItems = items.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.product_type && item.product_type.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (activeTab === "all") return matchesSearch;
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
      if (activeTab === "basecoats") return matchesSearch && item.category === "Basecoats";
      if (activeTab === "clearcoats") return matchesSearch && item.category === "Clearcoats";
      if (activeTab === "abrasives") return matchesSearch && item.category === "Abrasives";
      
      return matchesSearch;
    });
    
    // Apply additional filters
    if (filters.category && filters.category !== "All") {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }
    
    if (filters.productType && filters.productType !== "All") {
      filteredItems = filteredItems.filter(item => item.product_type === filters.productType);
    }
    
    if (filters.brand && filters.brand !== "All") {
      filteredItems = filteredItems.filter(item => item.brand === filters.brand);
    }
    
    if (filters.hazardClass && filters.hazardClass !== "All") {
      filteredItems = filteredItems.filter(item => item.hazard_class === filters.hazardClass);
    }
    
    if (filters.minVoc !== undefined) {
      filteredItems = filteredItems.filter(item => item.voc_content === null || item.voc_content >= filters.minVoc!);
    }
    
    if (filters.maxVoc !== undefined) {
      filteredItems = filteredItems.filter(item => item.voc_content === null || item.voc_content <= filters.maxVoc!);
    }
    
    if (filters.isConsumable !== null) {
      filteredItems = filteredItems.filter(item => item.is_consumable === filters.isConsumable);
    }
    
    return filteredItems;
  };

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    applyFilters
  };
}
