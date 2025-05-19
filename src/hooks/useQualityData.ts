
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QualityInspection } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useQualityData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch quality inspections
  const { data: inspections = [] } = useQuery({
    queryKey: ['qualityInspections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        toast({
          title: 'Error fetching inspections',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as QualityInspection[];
    },
  });

  // Add inspection mutation
  const addInspection = useMutation({
    mutationFn: async (inspection: Omit<QualityInspection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .insert(inspection)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({ 
        title: 'Inspection added',
        description: 'Quality inspection has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding inspection',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update inspection mutation
  const updateInspection = useMutation({
    mutationFn: async ({ id, ...inspection }: { id: string } & Omit<QualityInspection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .update(inspection)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({ 
        title: 'Inspection updated',
        description: 'Quality inspection has been updated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating inspection',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Delete inspection mutation
  const deleteInspection = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('quality_inspections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({ 
        title: 'Inspection deleted',
        description: 'Quality inspection has been deleted successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting inspection',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update loading state when data is available
  useEffect(() => {
    if (inspections) {
      setIsLoading(false);
    }
  }, [inspections]);

  // Add sample data for testing
  const seedSampleData = async () => {
    try {
      // Sample inspection data
      const sampleInspections = [
        { 
          inspection_id: "INS-001", 
          date: "2025-05-12", 
          product: "Aluminum Frame A-100", 
          inspector: "John Doe", 
          status: "Passed" as const, 
          notes: "All specifications met" 
        },
        { 
          inspection_id: "INS-002", 
          date: "2025-05-11", 
          product: "Steel Beam S-200", 
          inspector: "Jane Smith", 
          status: "Failed" as const, 
          notes: "Dimensional inconsistency" 
        },
        { 
          inspection_id: "INS-003", 
          date: "2025-05-10", 
          product: "Glass Panel G-300", 
          inspector: "Mike Johnson", 
          status: "Passed" as const, 
          notes: "Clarity test passed" 
        },
        { 
          inspection_id: "INS-004", 
          date: "2025-05-09", 
          product: "Plastic Casing P-400", 
          inspector: "Sarah Williams", 
          status: "Pending" as const, 
          notes: "Awaiting final inspection" 
        },
        { 
          inspection_id: "INS-005", 
          date: "2025-05-08", 
          product: "Copper Wire C-500", 
          inspector: "David Brown", 
          status: "Passed" as const, 
          notes: "Conductivity within parameters" 
        }
      ];

      // Insert sample data
      for (const inspection of sampleInspections) {
        await supabase.from('quality_inspections').insert(inspection);
      }

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });

      toast({
        title: 'Sample data added',
        description: 'Sample quality inspection data has been added to the database.',
      });
    } catch (error: any) {
      console.error('Error seeding sample data:', error);
      toast({
        title: 'Error adding sample data',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return {
    inspections,
    isLoading,
    addInspection,
    updateInspection,
    deleteInspection,
    seedSampleData
  };
};
