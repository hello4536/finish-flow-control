
import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const sampleWorkflows = [
  {
    workflow_number: "WF-001",
    name: "Standard Wood Finish",
    description: "Our standard finishing process for wooden furniture",
    steps: [
      { id: 1, name: "Sand" },
      { id: 2, name: "Stain" },
      { id: 3, name: "Seal" },
      { id: 4, name: "Dry" },
      { id: 5, name: "QC" }
    ],
    trade: "Wood Finishing",
    active_jobs: 12,
    status: "active"
  },
  {
    workflow_number: "WF-002",
    name: "Antique Restoration",
    description: "Specialized workflow for antique wood restoration",
    steps: [
      { id: 1, name: "Assessment" },
      { id: 2, name: "Cleaning" },
      { id: 3, name: "Repair" },
      { id: 4, name: "Color Matching" },
      { id: 5, name: "Finish Application" },
      { id: 6, name: "Protective Coating" },
      { id: 7, name: "Final Inspection" }
    ],
    trade: "Wood Finishing",
    active_jobs: 3,
    status: "active"
  },
  {
    workflow_number: "WF-003",
    name: "Complete Auto Repaint",
    description: "Full vehicle repaint process from prep to finish",
    steps: [
      { id: 1, name: "Surface Preparation" },
      { id: 2, name: "Priming" },
      { id: 3, name: "Base Coat Application" },
      { id: 4, name: "Clear Coat Application" },
      { id: 5, name: "Drying/Curing" },
      { id: 6, name: "Polishing" },
      { id: 7, name: "Quality Check" },
      { id: 8, name: "Detailing" }
    ],
    trade: "Auto Body",
    active_jobs: 4,
    status: "active"
  },
  {
    workflow_number: "WF-004",
    name: "Interior Wall Paint",
    description: "Standard process for interior wall painting",
    steps: [
      { id: 1, name: "Surface Preparation" },
      { id: 2, name: "Priming" },
      { id: 3, name: "First Coat" },
      { id: 4, name: "Second Coat" }
    ],
    trade: "Interior Paint",
    active_jobs: 7,
    status: "active"
  },
  {
    workflow_number: "WF-005",
    name: "Exterior House Paint",
    description: "Complete workflow for exterior house painting",
    steps: [
      { id: 1, name: "Pressure Washing" },
      { id: 2, name: "Repair Surfaces" },
      { id: 3, name: "Apply Primer" },
      { id: 4, name: "Apply Paint" },
      { id: 5, name: "Quality Inspection" }
    ],
    trade: "Exterior Paint",
    active_jobs: 2,
    status: "active"
  }
];

const WorkflowSeeder: React.FC = () => {
  const { toast } = useToast();

  const seedWorkflows = async () => {
    try {
      const { data, error } = await supabase
        .from("workflows")
        .insert(sampleWorkflows);

      if (error) throw error;
      
      toast({
        title: "Sample workflows created",
        description: `${sampleWorkflows.length} workflows have been added to the database.`,
      });
      
      // Reload the page to fetch the new workflows
      window.location.reload();
      
    } catch (error: any) {
      console.error("Error seeding workflows:", error);
      toast({
        title: "Error creating sample workflows",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={seedWorkflows}
      className="ml-2"
    >
      Seed Sample Workflows
    </Button>
  );
};

export default WorkflowSeeder;
