
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
    {
      name: "Standard Wood Finish",
      description: "A standard process for finishing wood surfaces",
      trade: "Wood Finishing",
      active_jobs: 0,
      workflow_number: "WF-1001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Preparation" },
        { id: 2, name: "Sanding" },
        { id: 3, name: "Staining" },
        { id: 4, name: "Sealing" },
        { id: 5, name: "Final Coating" }
      ] as unknown as Json
    },
    {
      name: "Luxury Car Paint Process",
      description: "Premium auto body paint process for luxury vehicles",
      trade: "Auto Body",
      active_jobs: 0,
      workflow_number: "WF-2001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Cleaning" },
        { id: 2, name: "Primer Application" },
        { id: 3, name: "Base Coat" },
        { id: 4, name: "Clear Coat" },
        { id: 5, name: "Polishing" }
      ] as unknown as Json
    },
    {
      name: "Eco-Friendly Interior Paint",
      description: "Low-VOC interior painting process",
      trade: "Interior Paint",
      active_jobs: 0,
      workflow_number: "WF-3001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Preparation" },
        { id: 2, name: "Patching and Repair" },
        { id: 3, name: "Primer Application" },
        { id: 4, name: "First Coat" },
        { id: 5, name: "Second Coat" }
      ] as unknown as Json
    },
    {
      name: "Weather-Resistant Exterior Finish",
      description: "Durable exterior paint process for harsh climates",
      trade: "Exterior Paint",
      active_jobs: 0,
      workflow_number: "WF-4001",
      status: "active",
      steps: [
        { id: 1, name: "Surface Cleaning" },
        { id: 2, name: "Pressure Washing" },
        { id: 3, name: "Repair and Caulking" },
        { id: 4, name: "Primer" },
        { id: 5, name: "Paint Application" }
      ] as unknown as Json
    }
  ];

  try {
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
