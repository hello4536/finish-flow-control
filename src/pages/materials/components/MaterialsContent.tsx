
import React from "react";
import SearchAndFilter from "./SearchAndFilter";
import MaterialsTabs from "./MaterialsTabs";
import { Material } from "@/types/materials";

interface MaterialsContentProps {
  searchTerm: string;
  activeTab: string;
  filteredMaterials: Material[];
  onSearchChange: (value: string) => void;
  onTabChange: (value: string) => void;
}

const MaterialsContent: React.FC<MaterialsContentProps> = ({
  searchTerm,
  activeTab,
  filteredMaterials,
  onSearchChange,
  onTabChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Materials Inventory</h2>
        <SearchAndFilter 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange} 
        />
      </div>
      
      <MaterialsTabs 
        activeTab={activeTab}
        onTabChange={onTabChange}
        filteredMaterials={filteredMaterials}
      />
    </div>
  );
};

export default MaterialsContent;
