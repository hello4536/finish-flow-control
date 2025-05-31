
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Equipment } from '@/types/equipment';
import { mockData, useMockData } from '@/utils/mockData';

export const useEquipment = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const showMockData = useMockData();

  // Mock data query
  const mockQuery = useQuery({
    queryKey: ['mock-equipment'],
    queryFn: async (): Promise<Equipment[]> => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockData.equipment;
    },
    enabled: showMockData
  });

  // Real data query
  const realQuery = useQuery({
    queryKey: ['equipment'],
    queryFn: async (): Promise<Equipment[]> => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !showMockData
  });

  // Use mock or real data based on dev mode
  const { data: equipment = [], isLoading, error } = showMockData ? mockQuery : realQuery;

  const addEquipment = async (newEquipment: Partial<Equipment>) => {
    if (showMockData) {
      toast({
        title: 'Mock Mode',
        description: 'Equipment added to mock data.',
      });
      return;
    }

    try {
      if (!newEquipment.name || !newEquipment.type) {
        throw new Error('Equipment name and type are required');
      }
      
      const { data, error } = await supabase
        .from('equipment')
        .insert({
          name: newEquipment.name,
          type: newEquipment.type,
          brand: newEquipment.brand,
          model: newEquipment.model,
          serial_number: newEquipment.serial_number,
          purchase_date: newEquipment.purchase_date,
          purchase_cost: newEquipment.purchase_cost,
          condition: newEquipment.condition || 'Good',
          status: newEquipment.status || 'Available',
          notes: newEquipment.notes
        })
        .select();

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      return data[0];
    } catch (error: any) {
      console.error('Error adding equipment:', error);
      toast({
        title: 'Error adding equipment',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateEquipment = async (id: string, updates: Partial<Equipment>) => {
    if (showMockData) {
      toast({
        title: 'Mock Mode',
        description: 'Equipment updated in mock data.',
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('equipment')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      return data[0];
    } catch (error: any) {
      console.error('Error updating equipment:', error);
      toast({
        title: 'Error updating equipment',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteEquipment = async (id: string) => {
    if (showMockData) {
      toast({
        title: 'Mock Mode',
        description: 'Equipment deleted from mock data.',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      
      toast({
        title: 'Equipment deleted',
        description: 'The equipment has been deleted successfully.',
      });
    } catch (error: any) {
      console.error('Error deleting equipment:', error);
      toast({
        title: 'Error deleting equipment',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return {
    equipment,
    isLoading,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    refresh: () => queryClient.invalidateQueries({ queryKey: showMockData ? ['mock-equipment'] : ['equipment'] }),
  };
};
