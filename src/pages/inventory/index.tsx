
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import InventoryHeader from "./components/InventoryHeader";
import StatCards from "./components/StatCards";
import SearchBar from "./components/SearchBar";
import InventoryTabs from "./components/InventoryTabs";
import LocationsSection from "./components/LocationsSection";
import { useInventoryData } from "@/hooks/useInventoryData";
import AddInventoryDialog from "./components/AddInventoryDialog";
import { useInventoryFilters } from "@/hooks/useInventoryFilters";
import { useSelectedItems } from "@/hooks/useSelectedItems";
import SeedSampleData from "./components/SeedSampleData";

const InventoryPage: React.FC = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const {
    inventoryItems,
    locations,
    isLoading,
    deleteInventoryItem,
    fetchInventoryData
  } = useInventoryData();
  
  const {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    applyFilters
  } = useInventoryFilters();

  // Apply all filters
  const filteredItems = applyFilters(inventoryItems);
  const {
    selectedItems,
    handleSelectItem,
    handleSelectAll,
    clearSelections
  } = useSelectedItems(filteredItems);
  
  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    try {
      for (const id of selectedItems) {
        await deleteInventoryItem(id);
      }
      clearSelections();
    } catch (error) {
      console.error("Failed to delete selected items", error);
    }
  };

  // Calculate stats for the cards
  const categoryCount = new Set(inventoryItems.map(m => m.category)).size;
  const lowStockCount = inventoryItems.filter(m => m.available < (m.min_quantity || 5) || m.status === "Expiring").length;
  const expiringSoonCount = inventoryItems.filter(m => m.status === "Expiring").length;
  const locationCount = locations.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <InventoryHeader onAddNewClick={() => setAddDialogOpen(true)} />
        
        <div className="flex justify-end mb-4 space-x-2">
          <SeedSampleData onSuccess={fetchInventoryData} inventoryCount={inventoryItems.length} />
        </div>
        
        <StatCards 
          totalProducts={inventoryItems.length} 
          categoryCount={categoryCount} 
          lowStockCount={lowStockCount} 
          warehouseCount={locationCount} 
          expiringSoonCount={expiringSoonCount} 
        />
        
        <div className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inventory Items
              </h2>
              <p className="text-slate-600 mt-1 font-medium">
                Track and manage all inventory across your facility
              </p>
            </div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filters={filters} setFilters={setFilters} />
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

        <LocationsSection locations={locations} isLoading={isLoading} onLocationAdded={fetchInventoryData} />
        
        <AddInventoryDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onSuccess={fetchInventoryData} />
      </div>
    </div>
  );
};

export default InventoryPage;
