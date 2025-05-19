
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export interface PaintColor {
  id: string;
  name: string;
  hex_code: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const usePaintColors = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch all paint colors
  const fetchPaintColors = async (): Promise<PaintColor[]> => {
    const { data, error } = await supabase
      .from('paint_colors')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching paint colors:', error);
      throw new Error(error.message);
    }
    
    // Log the data to help with debugging
    console.log('Fetched paint colors:', data);
    return data || [];
  };
  
  // Query to fetch paint colors
  const { 
    data: paintColors = [], 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['paintColors'],
    queryFn: fetchPaintColors,
  });
  
  // Add a new paint color
  const addPaintColor = useMutation({
    mutationFn: async ({ name, hexCode, notes }: { name: string; hexCode: string; notes?: string }) => {
      console.log('Adding paint color:', { name, hexCode, notes });
      
      const newPaintColor = {
        name,
        hex_code: hexCode,
        notes
      };
      
      const { data, error } = await supabase
        .from('paint_colors')
        .insert(newPaintColor)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding paint color:', error);
        throw error;
      }
      
      console.log('Added paint color:', data);
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Paint color added',
        description: 'The paint color has been added to your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['paintColors'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to add paint color: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Delete a paint color
  const deletePaintColor = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting paint color with ID:', id);
      
      const { error } = await supabase
        .from('paint_colors')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting paint color:', error);
        throw error;
      }
      
      console.log('Deleted paint color with ID:', id);
      return id;
    },
    onSuccess: () => {
      toast({
        title: 'Paint color removed',
        description: 'The paint color has been removed from your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['paintColors'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to remove paint color: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('paint_colors_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'paint_colors' },
        () => {
          console.log('Paint colors table changed, refetching data...');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return {
    paintColors,
    isLoading,
    error,
    addPaintColor,
    deletePaintColor
  };
};
