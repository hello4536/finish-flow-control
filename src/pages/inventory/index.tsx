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
import AddInventoryDialog from "./components/AddInventoryDialog";

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    productType: "All",
    brand: "All",
    hazardClass: "All",
    minVoc: undefined as number | undefined,
    maxVoc: undefined as number | undefined,
    isConsumable: null as boolean | null,
  });
  
  const {
    toast
  } = useToast();
  
  const {
    inventoryItems,
    warehouses,
    isLoading,
    filterItems,
    deleteInventoryItem,
    addInventoryItem,
    fetchInventoryData
  } = useInventoryData();

  // Enhanced filter function to handle new auto body fields
  const enhancedFilterItems = () => {
    let items = filterItems(searchTerm, activeTab);
    
    // Apply additional filters
    if (filters.category && filters.category !== "All") {
      items = items.filter(item => item.category === filters.category);
    }
    
    if (filters.productType && filters.productType !== "All") {
      items = items.filter(item => item.product_type === filters.productType);
    }
    
    if (filters.brand && filters.brand !== "All") {
      items = items.filter(item => item.brand === filters.brand);
    }
    
    if (filters.hazardClass && filters.hazardClass !== "All") {
      items = items.filter(item => item.hazard_class === filters.hazard_class);
    }
    
    if (filters.minVoc !== undefined) {
      items = items.filter(item => item.voc_content === null || item.voc_content >= filters.minVoc!);
    }
    
    if (filters.maxVoc !== undefined) {
      items = items.filter(item => item.voc_content === null || item.voc_content <= filters.maxVoc!);
    }
    
    if (filters.isConsumable !== null) {
      items = items.filter(item => item.is_consumable === filters.isConsumable);
    }
    
    return items;
  };

  // Apply all filters
  const filteredItems = enhancedFilterItems();
  
  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]);
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
      // Add some auto body shop specific data to the mock items
      const autoBodyItems = [
        {
          name: "Premium Basecoat - Deep Blue Metallic",
          sku: "BC-DB-M-" + Date.now(),
          category: "Basecoats",
          in_stock: 15,
          allocated: 3,
          available: 12,
          location: "Paint Room",
          product_type: "Paint",
          brand: "PPG",
          voc_content: 420,
          hazard_class: "Flammable",
          expiration_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          is_consumable: true,
          min_quantity: 5,
          storage_zone: "Flammable Cabinet A"
        },
        {
          name: "High-Build Primer - Gray",
          sku: "PR-HB-G-" + Date.now(),
          category: "Primers",
          in_stock: 8,
          allocated: 1,
          available: 7,
          location: "Paint Room",
          product_type: "Primer",
          brand: "Sherwin-Williams",
          voc_content: 250,
          hazard_class: "Harmful",
          expiration_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          is_consumable: true,
          min_quantity: 3,
          storage_zone: "Flammable Cabinet B"
        },
        {
          name: "Fine Grit Sandpaper - 2000",
          sku: "SP-FG-2000-" + Date.now(),
          category: "Abrasives",
          in_stock: 45,
          allocated: 0,
          available: 45,
          location: "Supply Room",
          product_type: "Sandpaper",
          brand: "3M",
          grit: 2000,
          hazard_class: "None",
          is_consumable: true,
          min_quantity: 10
        },
        {
          name: "HVLP Spray Gun - Premium",
          sku: "TL-HVLP-P-" + Date.now(),
          category: "Tools",
          in_stock: 3,
          allocated: 1,
          available: 2,
          location: "Tool Room",
          product_type: "Tool",
          brand: "SATA",
          hazard_class: "None",
          is_consumable: false,
          min_quantity: 1,
          storage_zone: "Tool Cabinet C"
        },
        {
          name: "Automotive Clear Coat",
          sku: "CC-AUTO-" + Date.now(),
          category: "Clearcoats",
          in_stock: 12,
          allocated: 2,
          available: 10,
          location: "Paint Room",
          product_type: "Clear Coat",
          brand: "PPG",
          voc_content: 350,
          hazard_class: "Flammable",
          expiration_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          is_consumable: true,
          min_quantity: 4,
          storage_zone: "Flammable Cabinet A",
          sds_link: "https://example.com/sds/clearcoat"
        }
      ];
      
      // Seed inventory items
      for (const item of [...mockInventoryItems, ...autoBodyItems]) {
        await supabase.from('inventory_items').insert({
          name: item.name,
          sku: item.sku ? item.sku : `SKU-${Date.now()}`,
          category: item.category,
          in_stock: item.in_stock || 0,
          allocated: item.allocated || 0,
          available: item.available || 0,
          location: item.location || "Main Storage",
          product_type: (item as any).product_type,
          brand: (item as any).brand,
          grit: (item as any).grit,
          voc_content: (item as any).voc_content,
          hazard_class: (item as any).hazard_class,
          expiration_date: (item as any).expiration_date,
          sds_link: (item as any).sds_link,
          is_consumable: (item as any).is_consumable !== undefined ? (item as any).is_consumable : true,
          min_quantity: (item as any).min_quantity || 5,
          storage_zone: (item as any).storage_zone
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
        description: "Sample inventory items and warehouses have been added to the database."
      });
      
      await fetchInventoryData();
    } catch (error: any) {
      console.error("Error seeding sample data:", error);
      toast({
        title: "Error adding sample data",
        description: error.message || "Failed to add sample data",
        variant: "destructive"
      });
    }
  };

  // Calculate stats for the cards
  const categoryCount = new Set(inventoryItems.map(m => m.category)).size;
  const lowStockCount = inventoryItems.filter(m => (m.available < (m.min_quantity || 5)) || (m.status === "Expiring")).length;
  const expiringSoonCount = inventoryItems.filter(m => m.status === "Expiring").length;
  
  return (
    <div className="container mx-auto">
      <InventoryHeader />
      
      <div className="flex justify-end mb-4">
        <div className="space-x-2">
          {inventoryItems.length === 0 && (
            <Button onClick={seedSampleData}>Seed Sample Data</Button>
          )}
          <Button onClick={() => setAddDialogOpen(true)}>Add Inventory Item</Button>
        </div>
      </div>
      
      <StatCards 
        totalProducts={inventoryItems.length} 
        categoryCount={categoryCount} 
        lowStockCount={lowStockCount} 
        warehouseCount={warehouses.length}
        expiringSoonCount={expiringSoonCount}
      />
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Inventory Items</h2>
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            filters={filters}
            setFilters={setFilters}
          />
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
      
      <AddInventoryDialog 
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={fetchInventoryData}
      />
    </div>
  );
};

export default InventoryPage;
