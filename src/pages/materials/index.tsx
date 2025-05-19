
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMaterialsData } from "@/hooks/useMaterialsData";
import MaterialsStats from "./components/MaterialsStats";
import AddMaterialDialog from "./components/AddMaterialDialog";
import { supabase } from "@/integrations/supabase/client";
import MaterialsHeader from "./components/MaterialsHeader";
import MaterialsContent from "./components/MaterialsContent";
import SuppliersSection from "./components/SuppliersSection";

const MaterialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const {
    materials,
    suppliers,
    isLoading,
    filterMaterials,
    fetchMaterialsData
  } = useMaterialsData();
  
  const { toast } = useToast();

  // Filter materials based on search term and active tab
  const filteredMaterials = filterMaterials(searchTerm, activeTab);

  const handleSeedData = async () => {
    try {
      // Seed materials
      await supabase.from('materials').insert([{
        name: "Raw Aluminum Sheet",
        type: "Metal",
        quantity: 120,
        unit: "sheets",
        status: "In Stock"
      }, {
        name: "Stainless Steel Plate",
        type: "Metal",
        quantity: 85,
        unit: "plates",
        status: "Low Stock"
      }, {
        name: "Oak Wood Panel",
        type: "Wood",
        quantity: 45,
        unit: "panels",
        status: "In Stock"
      }, {
        name: "Epoxy Resin",
        type: "Chemical",
        quantity: 12,
        unit: "gallons",
        status: "Critical Low"
      }, {
        name: "Maple Veneer",
        type: "Wood",
        quantity: 200,
        unit: "sq ft",
        status: "In Stock"
      }]);

      // Seed suppliers
      const {
        data: suppliersData
      } = await supabase.from('suppliers').insert([{
        name: "MetalWorks Inc.",
        contact: "John Smith",
        phone: "555-1234"
      }, {
        name: "Forest Products Co.",
        contact: "Sarah Johnson",
        phone: "555-5678"
      }, {
        name: "ChemSolutions Ltd.",
        contact: "Michael Brown",
        phone: "555-9012"
      }]).select();

      // Fetch the inserted materials to create relationships
      const {
        data: materialsData
      } = await supabase.from('materials').select('id, name, type');
      if (suppliersData && materialsData) {
        // Create material-supplier relationships
        const metalSupplier = suppliersData.find(s => s.name === "MetalWorks Inc.");
        const woodSupplier = suppliersData.find(s => s.name === "Forest Products Co.");
        const chemicalSupplier = suppliersData.find(s => s.name === "ChemSolutions Ltd.");
        const metalMaterials = materialsData.filter(m => m.type === "Metal");
        const woodMaterials = materialsData.filter(m => m.type === "Wood");
        const chemicalMaterials = materialsData.filter(m => m.type === "Chemical");

        // Create the relationships
        const relationships = [];
        if (metalSupplier) {
          metalMaterials.forEach(material => {
            relationships.push({
              supplier_id: metalSupplier.id,
              material_id: material.id
            });
          });
        }
        if (woodSupplier) {
          woodMaterials.forEach(material => {
            relationships.push({
              supplier_id: woodSupplier.id,
              material_id: material.id
            });
          });
        }
        if (chemicalSupplier) {
          chemicalMaterials.forEach(material => {
            relationships.push({
              supplier_id: chemicalSupplier.id,
              material_id: material.id
            });
          });
        }
        if (relationships.length > 0) {
          await supabase.from('material_suppliers').insert(relationships);
        }
      }
      toast({
        title: "Sample data created",
        description: "The materials database has been populated with sample data."
      });
    } catch (error: any) {
      console.error('Error seeding data:', error);
      toast({
        title: "Error creating sample data",
        description: error.message || "Failed to seed the database",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="text-lg">Loading materials data...</div>
    </div>;
  }

  return (
    <div className="container mx-auto">
      <MaterialsHeader 
        onAddNewClick={() => setAddDialogOpen(true)}
        showSeedButton={materials.length === 0}
        onSeedData={handleSeedData}
      />
      
      <MaterialsStats materials={materials} suppliers={suppliers} />
      
      <MaterialsContent
        searchTerm={searchTerm}
        activeTab={activeTab}
        filteredMaterials={filteredMaterials}
        onSearchChange={setSearchTerm}
        onTabChange={setActiveTab}
      />

      <SuppliersSection suppliers={suppliers} />

      <AddMaterialDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        suppliers={suppliers}
        onSuccess={fetchMaterialsData}
      />
    </div>
  );
};

export default MaterialsPage;
