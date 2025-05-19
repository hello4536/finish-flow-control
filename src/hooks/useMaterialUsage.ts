
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MaterialUsageLog } from '@/types/materials';

export const useMaterialUsage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch material usage logs
  const { data: usageLogs = [], isLoading: isLogsLoading } = useQuery({
    queryKey: ['materialUsageLogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('material_usage_logs')
        .select('*, materials(name, type)')
        .order('used_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error fetching usage logs',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as MaterialUsageLog[];
    },
  });

  // Log material usage
  const logUsage = useMutation({
    mutationFn: async (log: Omit<MaterialUsageLog, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('material_usage_logs')
        .insert(log)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['materialUsageLogs'] });
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      toast({ 
        title: 'Usage logged',
        description: 'Material usage has been logged successfully.'
      });
      return data;
    },
    onError: (error: any) => {
      toast({
        title: 'Error logging usage',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Helper function to get usage logs by material ID
  const getUsageByMaterialId = (materialId: string) => {
    return usageLogs.filter(log => log.material_id === materialId);
  };

  // Calculate total usage for a material
  const calculateTotalUsage = (materialId: string) => {
    const logs = getUsageByMaterialId(materialId);
    return logs.reduce((total, log) => total + Number(log.quantity), 0);
  };

  return {
    usageLogs,
    isLogsLoading,
    logUsage,
    getUsageByMaterialId,
    calculateTotalUsage
  };
};
