import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MaintenanceRecord } from '@/types/equipment';
import { mockData, useMockData } from '@/utils/mockData';

export const useEquipmentMaintenance = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const showMockData = useMockData();

  // Mock data query
  const mockQuery = useQuery({
    queryKey: ['mock-equipment-maintenance'],
    queryFn: async (): Promise<MaintenanceRecord[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData.equipmentMaintenance;
    },
    enabled: showMockData
  });

  // Real data query (keeping existing logic)
  const realQuery = useQuery({
    queryKey: ['equipment-maintenance'],
    queryFn: async (): Promise<MaintenanceRecord[]> => {
      const { data, error } = await supabase
        .from('equipment_maintenance')
        .select(`
          *,
          equipment:equipment_id(id, name, type)
        `)
        .order('maintenance_date', { ascending: false });

      if (error) throw error;

      const formattedRecords = data.map(record => ({
        id: record.id,
        equipment: {
          id: record.equipment.id,
          name: record.equipment.name,
          type: record.equipment.type
        },
        maintenanceType: record.maintenance_type,
        performedBy: record.performed_by,
        maintenanceDate: record.maintenance_date,
        nextMaintenanceDate: record.next_maintenance_date,
        cost: record.cost,
        notes: record.notes
      }));

      return formattedRecords;
    },
    enabled: !showMockData
  });

  // Use mock or real data based on dev mode
  const { data: maintenanceRecords = [], isLoading, error } = showMockData ? mockQuery : realQuery;

  const addMaintenanceRecord = async (newRecord: Partial<MaintenanceRecord>) => {
    if (showMockData) {
      toast({
        title: 'Mock Mode',
        description: 'Maintenance record added to mock data.',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('equipment_maintenance')
        .insert([{
          equipment_id: newRecord.equipment.id,
          maintenance_type: newRecord.maintenanceType,
          performed_by: newRecord.performedBy,
          maintenance_date: newRecord.maintenanceDate || new Date().toISOString(),
          next_maintenance_date: newRecord.nextMaintenanceDate,
          cost: newRecord.cost,
          notes: newRecord.notes
        }]);

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['equipment-maintenance'] });
      
      toast({
        title: 'Maintenance record added',
        description: 'The maintenance record has been added successfully.',
      });
    } catch (error: any) {
      console.error('Error adding maintenance record:', error);
      toast({
        title: 'Error adding maintenance record',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    maintenanceRecords,
    isLoading,
    addMaintenanceRecord,
    refresh: () => queryClient.invalidateQueries({ queryKey: showMockData ? ['mock-equipment-maintenance'] : ['equipment-maintenance'] }),
  };
};
