
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMaterialsData } from "@/hooks/useMaterialsData";
import MaterialsStats from "./materials/components/MaterialsStats";
import AddMaterialDialog from "./materials/components/AddMaterial";
import MaterialsHeader from "./materials/components/MaterialsHeader";
import MaterialsContent from "./materials/components/MaterialsContent";
import SuppliersSection from "./materials/components/SuppliersSection";
import { useMaterialCompliance } from "@/hooks/useMaterialCompliance";
import { useMaterialUsage } from "@/hooks/useMaterialUsage";
import { useHazardousWaste } from "@/hooks/useHazardousWaste";

const MaterialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const {
    materials,
    suppliers,
    isLoading,
    filterMaterials,
    fetchMaterialsData,
    getHazardousMaterialsCount
  } = useMaterialsData();

  // Load compliance data
  const { materialCompliance, safetyDataSheets } = useMaterialCompliance();
  
  // Load usage data
  const { usageLogs } = useMaterialUsage();
  
  // Load hazardous waste data
  const { hazardousWaste } = useHazardousWaste();
  
  const { toast } = useToast();

  // Filter materials based on search term and active tab
  const filteredMaterials = filterMaterials(searchTerm, activeTab);
  
  // Check if there are hazardous materials
  const hasHazardousMaterials = getHazardousMaterialsCount() > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-lg text-blue-600 font-medium">Loading materials data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <MaterialsHeader 
          onAddNewClick={() => setAddDialogOpen(true)}
        />
        
        <MaterialsStats materials={materials} suppliers={suppliers} />
        
        <MaterialsContent
          searchTerm={searchTerm}
          activeTab={activeTab}
          filteredMaterials={filteredMaterials}
          onSearchChange={setSearchTerm}
          onTabChange={setActiveTab}
          hasHazardousMaterials={hasHazardousMaterials}
        />

        <SuppliersSection suppliers={suppliers} />

        <AddMaterialDialog 
          open={addDialogOpen} 
          onOpenChange={setAddDialogOpen}
          suppliers={suppliers}
          onSuccess={fetchMaterialsData}
        />
      </div>
    </div>
  );
};

export default MaterialsPage;
