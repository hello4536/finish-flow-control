
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import InventoryHeader from "./components/InventoryHeader";
import StatCards from "./components/StatCards";
import SearchBar from "./components/SearchBar";
import InventoryTabs from "./components/InventoryTabs";
import WarehouseSection from "./components/WarehouseSection";
import { useInventoryData } from "@/hooks/useInventoryData";
import { mockInventoryItems, mockWarehouses } from "./data/mockData"; // For seeding only
import { supabase } from "@/integrations/supabase/client";

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();
  const { 
    inventoryItems, 
    warehouses, 
    isLoading, 
    filterItems, 
    deleteInventoryItem,
    addInventoryItem,
    fetchInventoryData
  } = useInventoryData();

  // Filter inventory items based on search term and active tab
  const filteredItems = filterItems(searchTerm, activeTab);

  const handleSelectItem = (id: string) => {
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

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    
    try {
      for (const id of selectedItems) {
        await deleteInventoryItem(id);
      }
      
      setSelectedItems([]);
    } catch (error) {
      console.error("Failed to delete selected items", error);
    }
  };

  const seedSampleData = async () => {
    try {
      // Seed inventory items
      for (const item of mockInventoryItems) {
        await addInventoryItem({
          name: item.name,
          sku: item.sku + "-" + Date.now(), // Ensure uniqueness
          category: item.category,
          in_stock: item.inStock,
          allocated: item.allocated,
          available: item.available,
          location: item.location
        });
      }
      
      // Seed warehouses
      for (const warehouse of mockWarehouses) {
        await supabase.from('warehouses').insert({
          name: warehouse.name,
          location: warehouse.location,
          capacity: warehouse.capacity,
          utilized: warehouse.utilized
        });
      }
      
      toast({
        title: "Sample data added",
        description: "Sample inventory items and warehouses have been added to the database.",
      });
      
      await fetchInventoryData();
    } catch (error: any) {
      console.error("Error seeding sample data:", error);
      toast({
        title: "Error adding sample data",
        description: error.message || "Failed to add sample data",
        variant: "destructive",
      });
    }
  };

  // Calculate stats for the cards
  const categoryCount = new Set(inventoryItems.map(m => m.category)).size;
  const lowStockCount = inventoryItems.filter(m => m.available < 10).length;

  return (
    <div className="container mx-auto">
      <InventoryHeader />
      
      <div className="flex justify-end mb-4">
        <Button onClick={seedSampleData} variant="outline">
          Seed Sample Data
        </Button>
      </div>
      
      <StatCards 
        totalProducts={inventoryItems.length}
        categoryCount={categoryCount}
        lowStockCount={lowStockCount}
        warehouseCount={warehouses.length}
      />
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Inventory Items</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <p>Loading inventory data...</p>
          </div>
        ) : (
          <InventoryTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredItems={filteredItems}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectAll={handleSelectAll}
            handleDeleteSelected={handleDeleteSelected}
          />
        )}
      </div>

      <WarehouseSection warehouses={warehouses} isLoading={isLoading} />
    </div>
  );
};

export default InventoryPage;
