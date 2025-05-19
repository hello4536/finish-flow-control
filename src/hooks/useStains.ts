
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

export interface StainComponent {
  name: string;
  quantity: string;
  unit: string;
}

export interface Stain {
  id: string;
  name: string;
  brand: string;
  color: string;
  notes?: string;
  baseComponents?: StainComponent[];
  mixingInstructions?: string;
  substrateCompatibility?: string[];
  applicationMethod?: string;
  dryingTime?: string;
  coatsRecommended?: string;
  createdBy?: string;
  createdAt: string;
  updated_at: string;
}

export const useStains = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch all stains
  const fetchStains = async (): Promise<Stain[]> => {
    const { data, error } = await supabase
      .from('stains')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching stains:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  };
  
  // Query to fetch stains
  const { 
    data: stains = [], 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['stains'],
    queryFn: fetchStains,
  });
  
  // Add a new stain
  const addStain = useMutation({
    mutationFn: async ({ 
      name, 
      brand, 
      color, 
      notes,
      baseComponents,
      mixingInstructions,
      substrateCompatibility,
      applicationMethod,
      dryingTime,
      coatsRecommended,
      createdBy,
      createdAt
    }: {
      name: string;
      brand: string;
      color: string;
      notes?: string;
      baseComponents?: StainComponent[];
      mixingInstructions?: string;
      substrateCompatibility?: string[];
      applicationMethod?: string;
      dryingTime?: string;
      coatsRecommended?: string;
      createdBy?: string;
      createdAt?: Date;
    }) => {
      const newStain = {
        name,
        brand,
        color,
        notes,
        baseComponents,
        mixingInstructions,
        substrateCompatibility,
        applicationMethod,
        dryingTime,
        coatsRecommended,
        created_by: createdBy,
        created_at: createdAt
      };
      
      const { data, error } = await supabase
        .from('stains')
        .insert(newStain)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Stain added',
        description: 'The stain has been added to your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['stains'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to add stain: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Update a stain
  const updateStain = useMutation({
    mutationFn: async ({
      id,
      ...stainData
    }: Partial<Stain> & { id: string }) => {
      const { error } = await supabase
        .from('stains')
        .update(stainData)
        .eq('id', id);
      
      if (error) throw error;
      return { id, ...stainData };
    },
    onSuccess: () => {
      toast({
        title: 'Stain updated',
        description: 'The stain has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['stains'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update stain: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Delete a stain
  const deleteStain = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('stains')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      toast({
        title: 'Stain removed',
        description: 'The stain has been removed from your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['stains'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to remove stain: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('stains_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stains' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return {
    stains,
    isLoading,
    error,
    addStain,
    updateStain,
    deleteStain
  };
};
