
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import { useMaterialsData } from "@/hooks/useMaterialsData";
import MaterialsStats from "./components/MaterialsStats";
import MaterialsTable from "./components/MaterialsTable";
import SuppliersTable from "./components/SuppliersTable";
import AddMaterialDialog from "./components/AddMaterialDialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Materials Management</h1>
        <div className="flex space-x-3">
          {materials.length === 0}
          <Button 
            className="flex items-center gap-2"
            onClick={() => setAddDialogOpen(true)}
          >
            <PlusCircle className="h-5 w-5" />
            Add New Material
          </Button>
        </div>
      </div>
      
      <MaterialsStats materials={materials} suppliers={suppliers} />
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Materials Inventory</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search materials..." className="pl-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Material Suppliers</CardTitle>
          <CardDescription>Current active suppliers providing materials to your facility</CardDescription>
        </CardHeader>
        <CardContent>
          <SuppliersTable suppliers={suppliers} />
        </CardContent>
      </Card>

      <AddMaterialDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        suppliers={suppliers}
        onSuccess={fetchMaterialsData}
      />
    </div>;
};

export default MaterialsPage;
