import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import InventoryTable from "./InventoryTable";
import { InventoryItem } from "@/types/inventory";
import SelectedItemsActions from "./SelectedItemsActions";
import { useCustomCategories } from "@/hooks/useCustomCategories";

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
  const { customCategories } = useCustomCategories();

  // Define which tabs to show based on available data
  const hasCustomCategories = customCategories.length > 0;
  const dynamicTabs = hasCustomCategories ? customCategories.slice(0, 2) : []; // Show first 2 custom categories as tabs

  return (
    <div>
      <SelectedItemsActions 
        selectedItems={selectedItems} 
        onDelete={handleDeleteSelected} 
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-flow-col auto-cols-fr overflow-auto">
          <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
          <TabsTrigger value="low" className="text-xs md:text-sm">Low Stock</TabsTrigger>
          <TabsTrigger value="expiring" className="text-xs md:text-sm">Expiring</TabsTrigger>
          <TabsTrigger value="basecoats" className="hidden md:flex text-xs md:text-sm">Basecoats</TabsTrigger>
          <TabsTrigger value="clearcoats" className="hidden md:flex text-xs md:text-sm">Clearcoats</TabsTrigger>
          <TabsTrigger value="abrasives" className="hidden md:flex text-xs md:text-sm">Abrasives</TabsTrigger>
          {dynamicTabs.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category.toLowerCase()} 
              className="hidden lg:flex text-xs md:text-sm"
            >
              {category}
            </TabsTrigger>
          ))}
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
        
        {dynamicTabs.map((category) => (
          <TabsContent key={category} value={category.toLowerCase()} className="mt-2">
            <InventoryTable
              items={filteredItems}
              selectedItems={selectedItems}
              handleSelectItem={handleSelectItem}
              handleSelectAll={handleSelectAll}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default InventoryTabs;
