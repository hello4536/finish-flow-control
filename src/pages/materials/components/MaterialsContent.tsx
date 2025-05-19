
import React, { useState } from "react";
import MaterialsTabs from "./MaterialsTabs";
import SearchAndFilter from "./SearchAndFilter";
import MaterialsTable from "./MaterialsTable";
import { Material } from "@/types/materials";
import MaterialDetailView from "./MaterialDetail";

interface MaterialsContentProps {
  searchTerm: string;
  activeTab: string;
  filteredMaterials: Material[];
  onSearchChange: (value: string) => void;
  onTabChange: (value: string) => void;
  hasHazardousMaterials?: boolean;
}

const MaterialsContent: React.FC<MaterialsContentProps> = ({
  searchTerm,
  activeTab,
  filteredMaterials,
  onSearchChange,
  onTabChange,
  hasHazardousMaterials = false
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Get unique material types for tabs
  const materialTypes = React.useMemo(() => {
    const types = new Set<string>();
    filteredMaterials.forEach(material => {
      if (material.type) types.add(material.type);
    });
    return Array.from(types);
  }, [filteredMaterials]);

  const handleViewMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

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
        materialTypes={materialTypes}
        hasHazardousMaterials={hasHazardousMaterials}
      />
      
      <div className="mt-4">
        <MaterialsTable 
          materials={filteredMaterials} 
          onView={handleViewMaterial}
        />
      </div>

      <MaterialDetailView 
        material={selectedMaterial}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default MaterialsContent;
