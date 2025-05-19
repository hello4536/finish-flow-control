
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

interface WorkflowSeederProps {
  onSeed?: () => void;
}

export const seedWorkflows = async () => {
  const sampleWorkflows = [
    // Woodworking Workflows
    {
      name: "Standard Wood Finish",
      description: "A standard process for finishing wood surfaces",
      trade: "Wood Finishing",
      active_jobs: 0,
      workflow_number: "WF-1001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Preparation", description: "Clean and prepare wood surface", required: true },
        { id: 2, name: "Sanding", description: "220-grit sanding for smoothness", required: true },
        { id: 3, name: "Staining", description: "Apply chosen stain evenly", required: true },
        { id: 4, name: "Sealing", description: "Apply sealant coat", required: true },
        { id: 5, name: "Final Coating", description: "Apply final protective coat", required: true }
      ] as unknown as Json
    },
    {
      name: "Antique Furniture Restoration",
      description: "Process for restoring antique furniture while preserving patina",
      trade: "Wood Finishing",
      active_jobs: 2,
      workflow_number: "WF-1002",
      status: "active",
      steps: [
        { id: 1, name: "Condition Assessment", description: "Evaluate furniture condition", required: true },
        { id: 2, name: "Gentle Cleaning", description: "Remove dirt without damaging patina", required: true },
        { id: 3, name: "Repair Damaged Areas", description: "Fix structural issues", required: true },
        { id: 4, name: "Color Matching", description: "Match existing finishes", required: true },
        { id: 5, name: "Wax Application", description: "Apply protective wax finish", required: true },
        { id: 6, name: "Buffing", description: "Hand buff to desired sheen", required: true }
      ] as unknown as Json
    },
    {
      name: "Outdoor Wood Sealing",
      description: "Weather-resistant finishing for outdoor wooden structures",
      trade: "Wood Finishing",
      active_jobs: 1,
      workflow_number: "WF-1003",
      status: "active",
      steps: [
        { id: 1, name: "Power Washing", description: "Clean surface thoroughly", required: true },
        { id: 2, name: "Repair", description: "Fix cracks and damage", required: true },
        { id: 3, name: "Sanding", description: "Sand smooth with 120-grit", required: true },
        { id: 4, name: "Apply Primer", description: "Weather-resistant primer coat", required: true },
        { id: 5, name: "Apply Sealant", description: "2 coats of UV-resistant sealant", required: true }
      ] as unknown as Json
    },
    
    // Auto Body Workflows
    {
      name: "Luxury Car Paint Process",
      description: "Premium auto body paint process for luxury vehicles",
      trade: "Auto Body",
      active_jobs: 3,
      workflow_number: "WF-2001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Cleaning", description: "Thorough degreasing", required: true },
        { id: 2, name: "Primer Application", description: "Apply high-build primer", required: true },
        { id: 3, name: "Base Coat", description: "Apply color base coat", required: true },
        { id: 4, name: "Clear Coat", description: "Apply premium clear coat", required: true },
        { id: 5, name: "Polishing", description: "Machine polish to mirror finish", required: true }
      ] as unknown as Json
    },
    {
      name: "Collision Repair",
      description: "Complete process for repairing collision damage",
      trade: "Auto Body",
      active_jobs: 2,
      workflow_number: "WF-2002",
      status: "active",
      steps: [
        { id: 1, name: "Damage Assessment", description: "Evaluate extent of damage", required: true },
        { id: 2, name: "Panel Repair/Replacement", description: "Fix or replace damaged panels", required: true },
        { id: 3, name: "Surface Preparation", description: "Sand and clean surfaces", required: true },
        { id: 4, name: "Primer Application", description: "Apply primer to repaired areas", required: true },
        { id: 5, name: "Paint Matching", description: "Computer color matching", required: true },
        { id: 6, name: "Paint Application", description: "Apply matched paint", required: true },
        { id: 7, name: "Clear Coat", description: "Apply protective clear coat", required: true },
        { id: 8, name: "Polishing", description: "Polish to blend with existing finish", required: true }
      ] as unknown as Json
    },
    {
      name: "Rust Remediation",
      description: "Process for treating and preventing rust on auto bodies",
      trade: "Auto Body",
      active_jobs: 0,
      workflow_number: "WF-2003",
      status: "active",
      steps: [
        { id: 1, name: "Rust Assessment", description: "Determine extent of rust damage", required: true },
        { id: 2, name: "Rust Removal", description: "Remove rust via sanding/grinding", required: true },
        { id: 3, name: "Metal Treatment", description: "Apply rust converter", required: true },
        { id: 4, name: "Primer Application", description: "Apply rust-inhibiting primer", required: true },
        { id: 5, name: "Surface Preparation", description: "Sand and clean for painting", required: true },
        { id: 6, name: "Paint Application", description: "Apply matched color paint", required: true },
        { id: 7, name: "Protective Coating", description: "Apply undercoating/sealant", required: true }
      ] as unknown as Json
    },
    
    // Interior Paint Workflows
    {
      name: "Eco-Friendly Interior Paint",
      description: "Low-VOC interior painting process",
      trade: "Interior Paint",
      active_jobs: 1,
      workflow_number: "WF-3001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Preparation", description: "Clean walls and remove fixtures", required: true },
        { id: 2, name: "Patching and Repair", description: "Fix holes and imperfections", required: true },
        { id: 3, name: "Primer Application", description: "Apply eco-friendly primer", required: true },
        { id: 4, name: "First Coat", description: "Apply first coat of low-VOC paint", required: true },
        { id: 5, name: "Second Coat", description: "Apply second coat after drying", required: true }
      ] as unknown as Json
    },
    
    // Exterior Paint Workflows
    {
      name: "Weather-Resistant Exterior Finish",
      description: "Durable exterior paint process for harsh climates",
      trade: "Exterior Paint",
      active_jobs: 2,
      workflow_number: "WF-4001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Cleaning", description: "Remove dirt and mildew", required: true },
        { id: 2, name: "Pressure Washing", description: "Deep clean all surfaces", required: true },
        { id: 3, name: "Repair and Caulking", description: "Fix damaged areas and seal gaps", required: true },
        { id: 4, name: "Primer", description: "Apply weather-resistant primer", required: true },
        { id: 5, name: "Paint Application", description: "Apply 2 coats of exterior paint", required: true }
      ] as unknown as Json
    }
  ];

  try {
    // Clear existing workflows to avoid duplicates
    await supabase.from("workflows").delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert each workflow individually to avoid array issues
    for (const workflow of sampleWorkflows) {
      const { error } = await supabase
        .from("workflows")
        .insert(workflow);
      
      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error("Error seeding workflows:", error);
    return false;
  }
};

const WorkflowSeeder: React.FC<WorkflowSeederProps> = ({ onSeed }) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setIsSeeding(true);

    try {
      const success = await seedWorkflows();

      if (success) {
        toast({
          title: "Sample workflows added",
          description: "Sample workflows have been added successfully.",
        });
        
        if (onSeed) {
          onSeed();
        }
      } else {
        throw new Error("Failed to seed workflows");
      }
    } catch (error) {
      console.error("Error seeding workflows:", error);
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
          Adding Sample Data...
        </>
      ) : (
        <>
          <Database className="h-4 w-4" /> Add Sample Data
        </>
      )}
    </Button>
  );
};

export default WorkflowSeeder;
