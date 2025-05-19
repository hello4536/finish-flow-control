
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QualityInspection } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useQualityInspections = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Fetch quality inspections
  const { data: inspections = [], isLoading: isInspectionsLoading } = useQuery({
    queryKey: ['qualityInspections', selectedStatus],
    queryFn: async () => {
      let query = supabase.from('quality_inspections').select('*');

      if (selectedStatus) {
        query = query.eq('status', selectedStatus);
      }

      const { data, error } = await query.order('date', { ascending: false });

      if (error) throw error;
      return data as QualityInspection[];
    },
  });

  // Add inspection
  const addInspection = useMutation({
    mutationFn: async (inspectionData: Omit<QualityInspection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .insert(inspectionData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({
        title: "Inspection Added",
        description: "Quality inspection has been successfully recorded.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Adding Inspection",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update inspection
  const updateInspection = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<QualityInspection> & { id: string }) => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({
        title: "Inspection Updated",
        description: "Quality inspection has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Updating Inspection",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete inspection
  const deleteInspection = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('quality_inspections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({
        title: "Inspection Deleted",
        description: "Quality inspection has been successfully deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Deleting Inspection",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    inspections,
    isInspectionsLoading,
    selectedStatus,
    setSelectedStatus,
    addInspection,
    updateInspection,
    deleteInspection,
  };
};
