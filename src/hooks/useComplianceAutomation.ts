
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ComplianceReport, AutomationSettings } from '@/types/automation';

export const useComplianceAutomation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch compliance reports
  const { data: complianceReports = [], isLoading: isLoadingReports } = useQuery({
    queryKey: ['compliance-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_reports')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;
      return data as ComplianceReport[];
    },
  });

  // Fetch automation settings
  const { data: automationSettings = [], isLoading: isLoadingSettings } = useQuery({
    queryKey: ['automation-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_automation_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;
      return data as AutomationSettings[];
    },
  });

  // Generate compliance report
  const generateReport = useMutation({
    mutationFn: async ({ reportType, title, dueDate }: { reportType: string; title: string; dueDate: string }) => {
      const { data, error } = await supabase
        .from('compliance_reports')
        .insert([{
          report_type: reportType,
          title,
          due_date: dueDate,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compliance-reports'] });
      toast({
        title: 'Report scheduled',
        description: 'Compliance report has been scheduled for generation.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error scheduling report',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update automation settings
  const updateSettings = useMutation({
    mutationFn: async ({ settingKey, settingValue, enabled }: { settingKey: string; settingValue: Record<string, any>; enabled: boolean }) => {
      const { data, error } = await supabase
        .from('compliance_automation_settings')
        .update({
          setting_value: settingValue,
          enabled: enabled
        })
        .eq('setting_key', settingKey)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation-settings'] });
      toast({
        title: 'Settings updated',
        description: 'Automation settings have been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating settings',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  return {
    complianceReports,
    automationSettings,
    isLoading: isLoadingReports || isLoadingSettings,
    generateReport,
    updateSettings
  };
};
