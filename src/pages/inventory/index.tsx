
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockInventoryItems, mockWarehouses } from "./data/mockData";
import InventoryHeader from "./components/InventoryHeader";
import StatCards from "./components/StatCards";
import SearchBar from "./components/SearchBar";
import InventoryTabs from "./components/InventoryTabs";
import WarehouseSection from "./components/WarehouseSection";

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { toast } = useToast();

  // Filter inventory items based on search term and active tab
  const filteredItems = mockInventoryItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "furniture") return matchesSearch && item.category === "Furniture";
    if (activeTab === "kitchen") return matchesSearch && item.category === "Kitchen";
    if (activeTab === "low") return matchesSearch && item.available < 10;
    
    return matchesSearch;
  });

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    toast({
      title: "Items deleted",
      description: `${selectedItems.length} items have been removed from inventory.`,
    });
    
    setSelectedItems([]);
  };

  // Calculate stats for the cards
  const categoryCount = new Set(mockInventoryItems.map(m => m.category)).size;
  const lowStockCount = mockInventoryItems.filter(m => m.available < 10).length;

  return (
    <div className="container mx-auto">
      <InventoryHeader />
      
      <StatCards 
        totalProducts={mockInventoryItems.length}
        categoryCount={categoryCount}
        lowStockCount={lowStockCount}
        warehouseCount={mockWarehouses.length}
      />
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Inventory Items</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        
        <InventoryTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredItems={filteredItems}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
          handleSelectAll={handleSelectAll}
          handleDeleteSelected={handleDeleteSelected}
        />
      </div>

      <WarehouseSection warehouses={mockWarehouses} />
    </div>
  );
};

export default InventoryPage;
