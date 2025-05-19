
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import InventoryTable from "./InventoryTable";
import { InventoryItem } from "@/types/inventory";

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
      <div className="flex justify-between items-center mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-fit">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto">
            <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
            <TabsTrigger value="low" className="text-xs md:text-sm">Low Stock</TabsTrigger>
            <TabsTrigger value="expiring" className="text-xs md:text-sm">Expiring</TabsTrigger>
            <TabsTrigger value="basecoats" className="hidden md:flex text-xs md:text-sm">Basecoats</TabsTrigger>
            <TabsTrigger value="clearcoats" className="hidden md:flex text-xs md:text-sm">Clearcoats</TabsTrigger>
            <TabsTrigger value="abrasives" className="hidden md:flex text-xs md:text-sm">Abrasives</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {selectedItems.length > 0 && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDeleteSelected}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete ({selectedItems.length})
          </Button>
        )}
      </div>

      <TabsContent value={activeTab} className="mt-0">
        <InventoryTable
          items={filteredItems}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
          handleSelectAll={handleSelectAll}
        />
      </TabsContent>
    </div>
  );
};

export default InventoryTabs;
