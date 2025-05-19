
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useDevMode } from "@/context/DevModeContext";

export interface JobStats {
  inProgress: number;
  overdue: number;
  completed: number;
  upcoming: number;
}

export const useJobsStatsData = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<JobStats>({
    inProgress: 0,
    overdue: 0,
    completed: 0,
    upcoming: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isDevMode } = useDevMode();

  // Mock data for dev mode
  const mockStats: JobStats = {
    inProgress: 3,
    overdue: 1,
    completed: 1,
    upcoming: 2
  };

  useEffect(() => {
    if (isDevMode) {
      setStats(mockStats);
      setIsLoading(false);
      return;
    }
    fetchJobStats();
  }, [isDevMode]);

  const fetchJobStats = async () => {
    try {
      setIsLoading(true);
      
      // Get current date for comparison
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch jobs counts by status
      const { data: inProgressJobs, error: errorInProgress } = await supabase
        .from("jobs")
        .select("id")
        .eq("status", "in_progress");
        
      const { data: completedJobs, error: errorCompleted } = await supabase
        .from("jobs")
        .select("id")
        .eq("status", "complete");
        
      const { data: upcomingJobs, error: errorUpcoming } = await supabase
        .from("jobs")
        .select("id")
        .eq("status", "upcoming");
        
      // Fetch overdue jobs (in_progress with due_date before today)
      const { data: overdueJobs, error: errorOverdue } = await supabase
        .from("jobs")
        .select("id")
        .eq("status", "in_progress")
        .lt("due_date", today);
      
      if (errorInProgress || errorCompleted || errorUpcoming || errorOverdue) {
        throw new Error("Error fetching job stats");
      }
      
      setStats({
        inProgress: inProgressJobs?.length || 0,
        completed: completedJobs?.length || 0,
        upcoming: upcomingJobs?.length || 0,
        overdue: overdueJobs?.length || 0
      });
    } catch (error) {
      console.error("Error fetching job stats:", error);
      toast({
        title: "Error fetching job statistics",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { stats, isLoading };
};
