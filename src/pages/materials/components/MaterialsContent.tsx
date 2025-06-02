
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
    <div className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Materials Inventory
          </h2>
          <p className="text-slate-600 mt-1 font-medium">
            Track and manage all materials across your facility
          </p>
        </div>
        <SearchAndFilter searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
      
      <MaterialsTabs 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        materialTypes={materialTypes} 
        hasHazardousMaterials={hasHazardousMaterials} 
      />
      
      <div className="mt-6">
        <MaterialsTable materials={filteredMaterials} onView={handleViewMaterial} />
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
