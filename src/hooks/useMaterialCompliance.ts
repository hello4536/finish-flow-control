
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MaterialCompliance, SafetyDataSheet } from '@/types/materials';

export const useMaterialCompliance = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch material compliance data
  const { data: materialCompliance = [], isLoading: isComplianceLoading } = useQuery({
    queryKey: ['materialCompliance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('material_compliance')
        .select('*, materials(name), ppe_requirements(equipment, standard)');

      if (error) {
        toast({
          title: 'Error fetching compliance data',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as MaterialCompliance[];
    },
  });

  // Fetch safety data sheets
  const { data: safetyDataSheets = [], isLoading: isSdsLoading } = useQuery({
    queryKey: ['safetyDataSheets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('safety_data_sheets')
        .select('*, materials(name)');

      if (error) {
        toast({
          title: 'Error fetching safety data sheets',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return data as SafetyDataSheet[];
    },
  });

  // Add material compliance record
  const addCompliance = useMutation({
    mutationFn: async (compliance: Omit<MaterialCompliance, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('material_compliance')
        .insert(compliance)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materialCompliance'] });
      toast({ 
        title: 'Compliance record added',
        description: 'Material compliance record has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding compliance record',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Add safety data sheet
  const addSafetyDataSheet = useMutation({
    mutationFn: async (sds: Omit<SafetyDataSheet, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('safety_data_sheets')
        .insert(sds)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['safetyDataSheets'] });
      toast({ 
        title: 'Safety data sheet added',
        description: 'Safety data sheet has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding safety data sheet',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Helper functions
  const getComplianceByMaterialId = (materialId: string) => {
    return materialCompliance.filter(compliance => compliance.material_id === materialId);
  };

  const getSdsByMaterialId = (materialId: string) => {
    return safetyDataSheets.filter(sds => sds.material_id === materialId);
  };

  return {
    materialCompliance,
    safetyDataSheets,
    isComplianceLoading,
    isSdsLoading,
    addCompliance,
    addSafetyDataSheet,
    getComplianceByMaterialId,
    getSdsByMaterialId
  };
};
