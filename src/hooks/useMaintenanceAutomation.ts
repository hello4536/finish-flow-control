
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MaintenanceSchedule, MaintenanceAlert } from '@/types/automation';

export const useMaintenanceAutomation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch maintenance schedules
  const { data: maintenanceSchedules = [], isLoading: isLoadingSchedules } = useQuery({
    queryKey: ['maintenance-schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('maintenance_schedules')
        .select(`
          *,
          equipment:equipment_id(id, name, type)
        `)
        .order('next_due', { ascending: true });

      if (error) throw error;
      return data as MaintenanceSchedule[];
    },
  });

  // Fetch maintenance alerts
  const { data: maintenanceAlerts = [], isLoading: isLoadingAlerts } = useQuery({
    queryKey: ['maintenance-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('maintenance_alerts')
        .select(`
          *,
          equipment:equipment_id(id, name, type)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as MaintenanceAlert[];
    },
  });

  // Create maintenance schedule
  const createSchedule = useMutation({
    mutationFn: async (schedule: Omit<MaintenanceSchedule, 'id' | 'created_at' | 'updated_at' | 'equipment'>) => {
      const { data, error } = await supabase
        .from('maintenance_schedules')
        .insert(schedule)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-schedules'] });
      toast({
        title: 'Schedule created',
        description: 'Maintenance schedule has been created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating schedule',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Acknowledge alert
  const acknowledgeAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const { data, error } = await supabase
        .from('maintenance_alerts')
        .update({
          status: 'acknowledged',
          acknowledged_at: new Date().toISOString()
        })
        .eq('id', alertId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-alerts'] });
      toast({
        title: 'Alert acknowledged',
        description: 'Maintenance alert has been acknowledged.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error acknowledging alert',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  return {
    maintenanceSchedules,
    maintenanceAlerts,
    isLoading: isLoadingSchedules || isLoadingAlerts,
    createSchedule,
    acknowledgeAlert
  };
};
