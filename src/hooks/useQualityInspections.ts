
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QualityInspection } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useQualityInspections = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch quality inspections
  const { data: inspections = [], isLoading: isInspectionsLoading } = useQuery({
    queryKey: ['qualityInspections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        toast({
          title: 'Error fetching inspections',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as QualityInspection[];
    },
  });

  // Add inspection mutation
  const addInspection = useMutation({
    mutationFn: async (inspection: Omit<QualityInspection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .insert(inspection)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({ 
        title: 'Inspection added',
        description: 'Quality inspection has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding inspection',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update inspection mutation
  const updateInspection = useMutation({
    mutationFn: async ({ id, ...inspection }: { id: string } & Omit<QualityInspection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .update(inspection)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({ 
        title: 'Inspection updated',
        description: 'Quality inspection has been updated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating inspection',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Delete inspection mutation
  const deleteInspection = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('quality_inspections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({ 
        title: 'Inspection deleted',
        description: 'Quality inspection has been deleted successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting inspection',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  return {
    inspections,
    isInspectionsLoading,
    addInspection,
    updateInspection,
    deleteInspection
  };
};
