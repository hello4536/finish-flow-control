
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MaintenanceRecord } from '@/types/equipment';

export const useEquipmentMaintenance = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMaintenanceRecords = async () => {
    setIsLoading(true);
    try {
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

      setMaintenanceRecords(formattedRecords);
    } catch (error: any) {
      console.error('Error fetching maintenance records:', error);
      toast({
        title: 'Error fetching maintenance records',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addMaintenanceRecord = async (newRecord: Partial<MaintenanceRecord>) => {
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
      
      fetchMaintenanceRecords();
      
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

  useEffect(() => {
    fetchMaintenanceRecords();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('maintenance_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment_maintenance' },
        () => {
          fetchMaintenanceRecords();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    maintenanceRecords,
    isLoading,
    addMaintenanceRecord,
    refresh: fetchMaintenanceRecords,
  };
};
