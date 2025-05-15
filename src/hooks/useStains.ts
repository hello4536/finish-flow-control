
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export interface Stain {
  id: string;
  name: string;
  brand: string;
  color: string;
  notes?: string;
  created_at: string;
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
    mutationFn: async ({ name, brand, color, notes }: { name: string; brand: string; color: string; notes?: string }) => {
      const newStain = {
        name,
        brand,
        color,
        notes
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
    deleteStain
  };
};
