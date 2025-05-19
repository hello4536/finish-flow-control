
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PPERequirement } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const usePPERequirements = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch PPE requirements data
  const { data: ppeRequirements = [], isLoading: isPPERequirementsLoading } = useQuery({
    queryKey: ['ppeRequirements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ppe_requirements')
        .select('*')
        .order('next_inspection', { ascending: true });

      if (error) {
        toast({
          title: 'Error fetching PPE requirements data',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as PPERequirement[];
    },
  });

  // Add PPE requirement mutation
  const addPPERequirement = useMutation({
    mutationFn: async (requirement: Omit<PPERequirement, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('ppe_requirements')
        .insert(requirement)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ppeRequirements'] });
      toast({ 
        title: 'PPE requirement added',
        description: 'PPE requirement has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding PPE requirement',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update PPE requirement mutation
  const updatePPERequirement = useMutation({
    mutationFn: async ({ id, ...requirement }: { id: string } & Partial<PPERequirement>) => {
      const { data, error } = await supabase
        .from('ppe_requirements')
        .update(requirement)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ppeRequirements'] });
      toast({ 
        title: 'PPE requirement updated',
        description: 'PPE requirement has been updated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating PPE requirement',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Delete PPE requirement mutation
  const deletePPERequirement = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ppe_requirements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ppeRequirements'] });
      toast({ 
        title: 'PPE requirement deleted',
        description: 'PPE requirement has been deleted successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting PPE requirement',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  return {
    ppeRequirements,
    isPPERequirementsLoading,
    addPPERequirement,
    updatePPERequirement,
    deletePPERequirement
  };
};
