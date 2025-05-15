
import React from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import InventoryTable from "./InventoryTable";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  inStock: number;
  allocated: number;
  available: number;
  location: string;
}

interface InventoryTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredItems: InventoryItem[];
  selectedItems: number[];
  handleSelectItem: (id: number) => void;
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
    <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All Items</TabsTrigger>
        <TabsTrigger value="furniture">Furniture</TabsTrigger>
        <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
        <TabsTrigger value="low">Low Stock</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
          </div>
          {selectedItems.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </Button>
          )}
        </div>
        <InventoryTable 
          items={filteredItems}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
          handleSelectAll={handleSelectAll}
        />
      </TabsContent>
      
      <TabsContent value="furniture" className="mt-4">
        <InventoryTable 
          items={filteredItems.filter(item => item.category === "Furniture")}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
          handleSelectAll={handleSelectAll}
        />
      </TabsContent>
      
      <TabsContent value="kitchen" className="mt-4">
        <InventoryTable 
          items={filteredItems.filter(item => item.category === "Kitchen")}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
          handleSelectAll={handleSelectAll}
        />
      </TabsContent>
      
      <TabsContent value="low" className="mt-4">
        <InventoryTable 
          items={filteredItems.filter(item => item.available < 10)}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
          handleSelectAll={handleSelectAll}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InventoryTabs;
