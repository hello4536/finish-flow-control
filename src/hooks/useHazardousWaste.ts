
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { HazardousWaste } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useHazardousWaste = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch hazardous waste data from the database
  const { data: hazardousWaste = [], isLoading: isHazardousWasteLoading } = useQuery({
    queryKey: ['hazardousWaste'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hazardous_waste')
        .select('*, materials(name, type)')
        .order('disposal_date', { ascending: false });

      if (error) {
        toast({
          title: 'Error fetching hazardous waste data',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as HazardousWaste[];
    },
  });

  // Add hazardous waste mutation
  const addHazardousWaste = useMutation({
    mutationFn: async (waste: Omit<HazardousWaste, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('hazardous_waste')
        .insert(waste)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hazardousWaste'] });
      toast({ 
        title: 'Hazardous waste record added',
        description: 'Record has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding record',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update hazardous waste mutation
  const updateHazardousWaste = useMutation({
    mutationFn: async ({ id, ...waste }: { id: string } & Partial<HazardousWaste>) => {
      const { data, error } = await supabase
        .from('hazardous_waste')
        .update(waste)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hazardousWaste'] });
      toast({ 
        title: 'Record updated',
        description: 'Hazardous waste record has been updated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating record',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Delete hazardous waste mutation
  const deleteHazardousWaste = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('hazardous_waste')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hazardousWaste'] });
      toast({ 
        title: 'Record deleted',
        description: 'Hazardous waste record has been deleted successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting record',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Helper function to get waste records by material ID
  const getWasteByMaterialId = (materialId: string) => {
    // Fix: using 'material' instead of 'material_id' as indicated by the error message
    return hazardousWaste.filter(waste => waste.material === materialId);
  };

  return {
    hazardousWaste,
    isHazardousWasteLoading,
    addHazardousWaste,
    updateHazardousWaste,
    deleteHazardousWaste,
    getWasteByMaterialId
  };
};
