
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { fetchStains } from './stains/fetchStains';
import { addStain } from './stains/addStain';
import { updateStain } from './stains/updateStain';
import { deleteStain } from './stains/deleteStain';
import { Stain, StainComponent, AddStainParams, UpdateStainParams } from './stains/types';

// Re-export types to maintain backward compatibility
export type { Stain, StainComponent, AddStainParams, UpdateStainParams };

export const useStains = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
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
  const addStainMutation = useMutation({
    mutationFn: addStain,
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
  const updateStainMutation = useMutation({
    mutationFn: updateStain,
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
  const deleteStainMutation = useMutation({
    mutationFn: deleteStain,
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
    addStain: addStainMutation,
    updateStain: updateStainMutation,
    deleteStain: deleteStainMutation
  };
};
