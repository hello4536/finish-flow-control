
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Equipment } from '@/types/equipment';

export const useEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchEquipment = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      
      setEquipment(data || []);
    } catch (error: any) {
      console.error('Error fetching equipment:', error);
      toast({
        title: 'Error fetching equipment',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addEquipment = async (newEquipment: Partial<Equipment>) => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .insert([newEquipment])
        .select();

      if (error) throw error;
      
      setEquipment(prev => [...prev, data[0]]);
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
    try {
      const { data, error } = await supabase
        .from('equipment')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      setEquipment(prev => 
        prev.map(item => (item.id === id ? { ...item, ...data[0] } : item))
      );
      
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
    try {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setEquipment(prev => prev.filter(item => item.id !== id));
      
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

  useEffect(() => {
    fetchEquipment();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('equipment_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment' },
        () => {
          fetchEquipment();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    equipment,
    isLoading,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    refresh: fetchEquipment,
  };
};
