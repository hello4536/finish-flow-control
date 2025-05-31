
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Job {
  id: string;
  job_number: string;
  name: string;
  status: string;
  trade: string;
  assigned_to?: string;
  current_step?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const useJobsData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  return {
    jobs: data || [],
    isLoading,
    error
  };
};
