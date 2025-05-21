
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EquipmentStats {
  total: number;
  assigned: number;
  available: number;
  maintenance: number;
  maintenanceDue: number;
}

export const useEquipmentStats = () => {
  const [stats, setStats] = useState<EquipmentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      // Get total count
      const { count: total, error: countError } = await supabase
        .from('equipment')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      // Get available count
      const { count: available, error: availableError } = await supabase
        .from('equipment')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Available');

      if (availableError) throw availableError;

      // Get assigned count
      const { count: assigned, error: assignedError } = await supabase
        .from('equipment')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Assigned');

      if (assignedError) throw assignedError;

      // Get maintenance count
      const { count: maintenance, error: maintenanceError } = await supabase
        .from('equipment')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Maintenance');

      if (maintenanceError) throw maintenanceError;

      // Get maintenance due count from maintenance records
      const { count: maintenanceDue, error: maintenanceDueError } = await supabase
        .from('equipment_maintenance')
        .select('*', { count: 'exact', head: true })
        .gte('next_maintenance_date', new Date().toISOString())
        .lte('next_maintenance_date', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());

      if (maintenanceDueError) throw maintenanceDueError;

      setStats({
        total: total || 0,
        available: available || 0,
        assigned: assigned || 0,
        maintenance: maintenance || 0,
        maintenanceDue: maintenanceDue || 0,
      });
    } catch (error) {
      console.error('Error fetching equipment stats:', error);
      // Set default values in case of error
      setStats({
        total: 0,
        available: 0,
        assigned: 0,
        maintenance: 0,
        maintenanceDue: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Set up real-time subscription for equipment changes
    const equipmentChannel = supabase
      .channel('equipment_stats_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    // Set up real-time subscription for maintenance changes
    const maintenanceChannel = supabase
      .channel('maintenance_stats_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment_maintenance' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(equipmentChannel);
      supabase.removeChannel(maintenanceChannel);
    };
  }, []);

  return {
    stats,
    isLoading,
    refresh: fetchStats,
  };
};
