
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import InventoryTable from "./InventoryTable";
import { InventoryItem } from "@/types/inventory";
import SelectedItemsActions from "./SelectedItemsActions";

interface InventoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredItems: InventoryItem[];
  selectedItems: string[];
  handleSelectItem: (id: string) => void;
  handleSelectAll: () => void;
  handleDeleteSelected: () => void;
}

const InventoryTabs: React.FC<InventoryTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredItems,
  selectedItems,
  handleSelectItem,
  handleSelectAll,
  handleDeleteSelected,
}) => {
  return (
    <div>
      <SelectedItemsActions 
        selectedItems={selectedItems} 
        onDelete={handleDeleteSelected} 
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto">
          <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
          <TabsTrigger value="low" className="text-xs md:text-sm">Low Stock</TabsTrigger>
          <TabsTrigger value="expiring" className="text-xs md:text-sm">Expiring</TabsTrigger>
          <TabsTrigger value="basecoats" className="hidden md:flex text-xs md:text-sm">Basecoats</TabsTrigger>
          <TabsTrigger value="clearcoats" className="hidden md:flex text-xs md:text-sm">Clearcoats</TabsTrigger>
          <TabsTrigger value="abrasives" className="hidden md:flex text-xs md:text-sm">Abrasives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-2">
          <InventoryTable
            items={filteredItems}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectAll={handleSelectAll}
          />
        </TabsContent>
        
        <TabsContent value="low" className="mt-2">
          <InventoryTable
            items={filteredItems}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectAll={handleSelectAll}
          />
        </TabsContent>
        
        <TabsContent value="expiring" className="mt-2">
          <InventoryTable
            items={filteredItems}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectAll={handleSelectAll}
          />
        </TabsContent>
        
        <TabsContent value="basecoats" className="mt-2">
          <InventoryTable
            items={filteredItems}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectAll={handleSelectAll}
          />
        </TabsContent>
        
        <TabsContent value="clearcoats" className="mt-2">
          <InventoryTable
            items={filteredItems}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectAll={handleSelectAll}
          />
        </TabsContent>
        
        <TabsContent value="abrasives" className="mt-2">
          <InventoryTable
            items={filteredItems}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
            handleSelectAll={handleSelectAll}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryTabs;
