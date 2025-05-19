
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MaterialsTable from "./MaterialsTable";
import { Material } from "@/types/materials";

interface MaterialsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  filteredMaterials: Material[];
}

const MaterialsTabs: React.FC<MaterialsTabsProps> = ({
  activeTab,
  onTabChange,
  filteredMaterials
}) => {
  return (
    <Tabs value={activeTab} className="w-full" onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="all">All Materials</TabsTrigger>
        <TabsTrigger value="low">Low Stock</TabsTrigger>
        <TabsTrigger value="metal">Metals</TabsTrigger>
        <TabsTrigger value="wood">Wood</TabsTrigger>
        <TabsTrigger value="chemical">Chemicals</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <MaterialsTable materials={filteredMaterials} />
      </TabsContent>
      
      <TabsContent value="low" className="mt-4">
        <MaterialsTable materials={filteredMaterials.filter(m => m.status === "Low Stock" || m.status === "Critical Low")} />
      </TabsContent>
      
      <TabsContent value="metal" className="mt-4">
        <MaterialsTable materials={filteredMaterials.filter(m => m.type === "Metal")} />
      </TabsContent>
      
      <TabsContent value="wood" className="mt-4">
        <MaterialsTable materials={filteredMaterials.filter(m => m.type === "Wood")} />
      </TabsContent>
      
      <TabsContent value="chemical" className="mt-4">
        <MaterialsTable materials={filteredMaterials.filter(m => m.type === "Chemical")} />
      </TabsContent>
    </Tabs>
  );
};

export default MaterialsTabs;
