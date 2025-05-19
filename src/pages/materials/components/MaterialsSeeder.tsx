
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Material, Supplier } from "@/types/materials";

interface MaterialsSeederProps {
  onSeed?: () => void;
}

export const seedMaterials = async () => {
  try {
    // Seed materials
    const materialsToSeed = [
      {
        name: "Raw Aluminum Sheet",
        type: "Metal",
        quantity: 120,
        unit: "sheets",
        status: "In Stock",
        is_hazardous: false
      },
      {
        name: "Stainless Steel Plate",
        type: "Metal",
        quantity: 85,
        unit: "plates",
        status: "Low Stock",
        is_hazardous: false
      },
      {
        name: "Oak Wood Panel",
        type: "Wood",
        quantity: 45,
        unit: "panels",
        status: "In Stock",
        is_hazardous: false
      },
      {
        name: "Epoxy Resin",
        type: "Chemical",
        quantity: 12,
        unit: "gallons",
        status: "Critical Low",
        is_hazardous: true,
        hazard_class: "Class 3 - Flammable",
        disposal_method: "Specialized chemical waste disposal",
        safety_data_sheet_url: "https://example.com/sds/epoxy-resin"
      },
      {
        name: "Maple Veneer",
        type: "Wood",
        quantity: 200,
        unit: "sq ft",
        status: "In Stock",
        is_hazardous: false
      },
      {
        name: "Chrome Plating Solution",
        type: "Chemical",
        quantity: 7,
        unit: "gallons",
        status: "Low Stock",
        is_hazardous: true,
        hazard_class: "Class 8 - Corrosive",
        disposal_method: "Chemical neutralization required"
      },
      // Auto body materials
      {
        name: "Basecoat Paint - Deep Blue Metallic",
        type: "Paint",
        quantity: 15,
        unit: "gallons",
        status: "In Stock",
        is_hazardous: true,
        hazard_class: "Class 3 - Flammable",
        disposal_method: "Licensed waste disposal"
      },
      {
        name: "Clearcoat - High Gloss",
        type: "Paint",
        quantity: 8,
        unit: "gallons",
        status: "In Stock",
        is_hazardous: true,
        hazard_class: "Class 3 - Flammable",
        disposal_method: "Licensed waste disposal"
      },
      {
        name: "Body Filler - Premium",
        type: "Body Repair",
        quantity: 25,
        unit: "kg",
        status: "In Stock",
        is_hazardous: true,
        hazard_class: "Class 4 - Flammable Solid",
        disposal_method: "Specialized disposal"
      },
      {
        name: "Sandpaper - 2000 Grit",
        type: "Abrasive",
        quantity: 150,
        unit: "sheets",
        status: "In Stock",
        is_hazardous: false
      },
      {
        name: "Primer - High Build",
        type: "Paint",
        quantity: 12,
        unit: "gallons",
        status: "In Stock",
        is_hazardous: true,
        hazard_class: "Class 3 - Flammable",
        disposal_method: "Licensed waste disposal"
      },
      {
        name: "Masking Tape - Automotive Grade",
        type: "Consumable",
        quantity: 85,
        unit: "rolls",
        status: "In Stock",
        is_hazardous: false
      }
    ];

    // Clear existing materials to avoid duplicates
    await supabase.from("materials").delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert materials
    for (const material of materialsToSeed) {
      const { error } = await supabase
        .from("materials")
        .insert(material);
      
      if (error) throw error;
    }

    // Seed suppliers
    const suppliersToSeed = [
      {
        name: "MetalWorks Inc.",
        contact: "John Smith",
        phone: "555-1234"
      },
      {
        name: "Forest Products Co.",
        contact: "Sarah Johnson",
        phone: "555-5678"
      },
      {
        name: "ChemSolutions Ltd.",
        contact: "Michael Brown",
        phone: "555-9012"
      },
      {
        name: "Auto Paint Supply",
        contact: "Lisa Chen",
        phone: "555-3456"
      },
      {
        name: "Body Shop Materials",
        contact: "James Wilson",
        phone: "555-7890"
      }
    ];

    // Clear existing suppliers to avoid duplicates
    await supabase.from("suppliers").delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert suppliers and capture their IDs
    const supplierIds: Record<string, string> = {};
    
    for (const supplier of suppliersToSeed) {
      const { data, error } = await supabase
        .from("suppliers")
        .insert(supplier)
        .select();
      
      if (error) throw error;
      if (data && data.length > 0) {
        supplierIds[supplier.name] = data[0].id;
      }
    }

    // Get inserted materials
    const { data: materialsData, error: materialsError } = await supabase
      .from("materials")
      .select('*');
    
    if (materialsError) throw materialsError;
    
    if (materialsData) {
      // Create material-supplier relationships
      const materialSupplierRelations = [];
      
      for (const material of materialsData) {
        let supplierId = "";
        
        // Assign appropriate supplier based on material type
        if (material.type === "Metal") {
          supplierId = supplierIds["MetalWorks Inc."];
        } else if (material.type === "Wood") {
          supplierId = supplierIds["Forest Products Co."];
        } else if (material.type === "Chemical") {
          supplierId = supplierIds["ChemSolutions Ltd."];
        } else if (material.type === "Paint") {
          supplierId = supplierIds["Auto Paint Supply"];
        } else {
          supplierId = supplierIds["Body Shop Materials"];
        }
        
        if (supplierId) {
          materialSupplierRelations.push({
            material_id: material.id,
            supplier_id: supplierId
          });
        }
      }
      
      // Insert material-supplier relationships
      if (materialSupplierRelations.length > 0) {
        await supabase.from("material_suppliers").delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        for (const relation of materialSupplierRelations) {
          const { error } = await supabase
            .from("material_suppliers")
            .insert(relation);
          
          if (error) throw error;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error seeding materials:", error);
    return false;
  }
};

const MaterialsSeeder: React.FC<MaterialsSeederProps> = ({ onSeed }) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setIsSeeding(true);

    try {
      const success = await seedMaterials();

      if (success) {
        toast({
          title: "Sample materials added",
          description: "Sample materials and suppliers have been added successfully.",
        });
        
        if (onSeed) {
          onSeed();
        }
      } else {
        throw new Error("Failed to seed materials");
      }
    } catch (error) {
      console.error("Error seeding materials:", error);
      toast({
        title: "Error adding sample data",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSeed}
      disabled={isSeeding}
      className="gap-2"
    >
      {isSeeding ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Adding Sample Materials...
        </>
      ) : (
        <>
          <Database className="h-4 w-4" /> Add Sample Materials
        </>
      )}
    </Button>
  );
};

export default MaterialsSeeder;
