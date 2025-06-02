
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface JobCostData {
  id: string;
  job_number: string;
  name: string;
  material_cost: number;
  labor_cost: number;
  overhead_cost: number;
  estimated_total: number;
  actual_total: number;
  profit_margin: number;
  hourly_rate: number;
  estimated_hours: number;
}

export const useJobCosting = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch job with costing data
  const fetchJobCosting = (jobId: string) => useQuery({
    queryKey: ['job-costing', jobId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;
      return data as JobCostData;
    },
    enabled: !!jobId
  });

  // Update job costing data
  const updateJobCosting = useMutation({
    mutationFn: async ({ jobId, updates }: { jobId: string; updates: Partial<JobCostData> }) => {
      const { data, error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', jobId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-costing'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job costing updated',
        description: 'Job costing has been updated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating job costing',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Recalculate job costs
  const recalculateJobCosts = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase.rpc('calculate_job_costs', { job_id: jobId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-costing'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Job costs recalculated',
        description: 'Job costs have been recalculated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error recalculating costs',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return {
    fetchJobCosting,
    updateJobCosting,
    recalculateJobCosts
  };
};
