
import { InventoryItem } from '@/types/inventory';

export function useInventoryItemFilters() {
  const filterItems = (items: InventoryItem[], searchTerm: string, activeTab: string) => {
    return items.filter(item => {
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

  return {
    filterItems
  };
}
