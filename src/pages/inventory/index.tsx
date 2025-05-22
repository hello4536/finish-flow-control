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
  const {
    toast
  } = useToast();
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
  return <div className="container mx-auto">
      <InventoryHeader />
      
      <div className="flex justify-end mb-4 space-x-2">
        <SeedSampleData onSuccess={fetchInventoryData} inventoryCount={inventoryItems.length} />
        <Button onClick={() => setAddDialogOpen(true)} className="bg-purple-600 hover:bg-purple-500">Add Inventory Item</Button>
      </div>
      
      <StatCards totalProducts={inventoryItems.length} categoryCount={categoryCount} lowStockCount={lowStockCount} warehouseCount={locationCount} expiringSoonCount={expiringSoonCount} />
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-blue-600">Inventory Items</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filters={filters} setFilters={setFilters} />
        </div>
        
        {isLoading ? <div className="flex justify-center p-8">
            <p>Loading inventory data...</p>
          </div> : <InventoryTabs activeTab={activeTab} setActiveTab={setActiveTab} filteredItems={filteredItems} selectedItems={selectedItems} handleSelectItem={handleSelectItem} handleSelectAll={handleSelectAll} handleDeleteSelected={handleDeleteSelected} />}
      </div>

      <LocationsSection locations={locations} isLoading={isLoading} onLocationAdded={fetchInventoryData} />
      
      <AddInventoryDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onSuccess={fetchInventoryData} />
    </div>;
};
export default InventoryPage;