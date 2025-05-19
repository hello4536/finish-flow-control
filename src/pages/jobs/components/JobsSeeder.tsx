
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface JobsSeederProps {
  onSeed?: () => void;
}

export const seedJobs = async () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const sampleJobs = [
    // Woodworking Jobs
    {
      name: "Mahogany Desk Refinishing",
      status: "in_progress",
      trade: "Wood Finishing",
      job_number: "JOB-1001",
      due_date: nextWeek.toISOString().split('T')[0],
      current_step: "Sanding",
      assigned_to: "Daniel Smith"
    },
    {
      name: "Kitchen Cabinets Restoration",
      status: "upcoming",
      trade: "Wood Finishing",
      job_number: "JOB-1002",
      due_date: nextWeek.toISOString().split('T')[0],
      current_step: null,
      assigned_to: "Emma Johnson"
    },
    {
      name: "Antique Table Repair",
      status: "in_progress",
      trade: "Wood Finishing",
      job_number: "JOB-1003",
      due_date: yesterday.toISOString().split('T')[0],
      current_step: "Repair Damaged Areas",
      assigned_to: "Daniel Smith"
    },
    {
      name: "Outdoor Deck Sealing",
      status: "complete",
      trade: "Wood Finishing",
      job_number: "JOB-1004",
      due_date: yesterday.toISOString().split('T')[0],
      current_step: "Complete",
      assigned_to: "Emma Johnson"
    },
    
    // Auto Body Jobs
    {
      name: "Mercedes S-Class Repaint",
      status: "in_progress",
      trade: "Auto Body",
      job_number: "JOB-2001",
      due_date: tomorrow.toISOString().split('T')[0],
      current_step: "Base Coat",
      assigned_to: "Michael Williams"
    },
    {
      name: "BMW Front Bumper Repair",
      status: "upcoming",
      trade: "Auto Body",
      job_number: "JOB-2002",
      due_date: nextWeek.toISOString().split('T')[0],
      current_step: null,
      assigned_to: "Sarah Davis"
    },
    {
      name: "Truck Door Rust Treatment",
      status: "in_progress",
      trade: "Auto Body",
      job_number: "JOB-2003",
      due_date: yesterday.toISOString().split('T')[0],
      current_step: "Rust Removal",
      assigned_to: "Michael Williams"
    }
  ];

  try {
    // Clear existing jobs to avoid duplicates
    await supabase.from("jobs").delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert jobs
    for (const job of sampleJobs) {
      const { error } = await supabase
        .from("jobs")
        .insert(job);
      
      if (error) throw error;
    }

    return true;
  } catch (error) {
    console.error("Error seeding jobs:", error);
    return false;
  }
};

const JobsSeeder: React.FC<JobsSeederProps> = ({ onSeed }) => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setIsSeeding(true);

    try {
      const success = await seedJobs();

      if (success) {
        toast({
          title: "Sample jobs added",
          description: "Sample jobs have been added successfully.",
        });
        
        if (onSeed) {
          onSeed();
        }
      } else {
        throw new Error("Failed to seed jobs");
      }
    } catch (error) {
      console.error("Error seeding jobs:", error);
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
          Adding Sample Jobs...
        </>
      ) : (
        <>
          <Database className="h-4 w-4" /> Add Sample Jobs
        </>
      )}
    </Button>
  );
};

export default JobsSeeder;
