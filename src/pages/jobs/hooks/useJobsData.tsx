
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useDevMode } from "@/context/DevModeContext";

export interface Job {
  id: string;
  job_number: string;
  name: string;
  current_step: string | null;
  trade: string;
  assigned_to: string | null;
  due_date: string | null;
  status: string;
}

export const useJobsData = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDevMode } = useDevMode();

  // Mock jobs data for dev mode
  const mockJobs: Job[] = [
    {
      id: "1",
      job_number: "WW-2023-001",
      name: "Cherry Table Refinishing",
      current_step: "Stain Application",
      trade: "Woodworking",
      assigned_to: "Thomas Wright",
      due_date: "2025-05-22",
      status: "in_progress"
    }, 
    {
      id: "2",
      job_number: "WW-2023-002",
      name: "Oak Cabinet Restoration",
      current_step: "Surface Preparation",
      trade: "Woodworking",
      assigned_to: "Emily Carpenter",
      due_date: "2025-05-23",
      status: "in_progress"
    }, 
    {
      id: "3",
      job_number: "WW-2023-003",
      name: "Walnut Dining Set Refinish",
      current_step: "Final Coat Polyurethane",
      trade: "Woodworking",
      assigned_to: "Robert Mills",
      due_date: "2025-05-21",
      status: "in_progress"
    }, 
    {
      id: "4",
      job_number: "WW-2023-004",
      name: "Maple Floors Resealing",
      current_step: "Complete",
      trade: "Woodworking",
      assigned_to: "Sarah Turner",
      due_date: "2025-05-18",
      status: "complete"
    }, 
    {
      id: "5",
      job_number: "WW-2023-005",
      name: "Cedar Chest Restoration",
      current_step: "Initial Assessment",
      trade: "Woodworking",
      assigned_to: "James Wood",
      due_date: "2025-05-25",
      status: "upcoming"
    }, 
    {
      id: "6",
      job_number: "WW-2023-006",
      name: "Custom Mahogany Bookshelf",
      current_step: "Client Approval",
      trade: "Woodworking",
      assigned_to: "Thomas Wright",
      due_date: "2025-05-24",
      status: "on_hold"
    }, 
    {
      id: "7",
      job_number: "WW-2023-007",
      name: "Antique Pine Table Repair",
      current_step: "Wood Filler Application",
      trade: "Woodworking",
      assigned_to: "Emily Carpenter",
      due_date: "2025-05-19",
      status: "in_progress"
    }, 
    {
      id: "8",
      job_number: "WW-2023-008",
      name: "Birch Kitchen Countertops",
      current_step: "Sanding",
      trade: "Woodworking",
      assigned_to: "Robert Mills",
      due_date: "2025-05-26",
      status: "upcoming"
    }
  ];

  useEffect(() => {
    if (isDevMode) {
      setJobs(mockJobs);
      setIsLoading(false);
      return;
    }
    fetchJobs();
  }, [isDevMode]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const {
        data,
        error
      } = await supabase.from("jobs").select("*").order("created_at", {
        ascending: false
      });
      if (error) {
        throw error;
      }
      if (data) {
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error fetching jobs",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { jobs, isLoading };
};
