
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RegulatoryCompliance, Region } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useRegulatoryCompliance = () => {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState<Region>('US');

  // Fetch regulatory compliance data
  const { data: regulatoryCompliance = [], isLoading: isRegulatoryLoading } = useQuery({
    queryKey: ['regulatoryCompliance', selectedRegion],
    queryFn: async () => {
      let query = supabase
        .from('regulatory_compliance')
        .select('*');
      
      if (selectedRegion !== 'All') {
        query = query.eq('region', selectedRegion);
      }
      
      const { data, error } = await query;
      
      if (error) {
        toast({
          title: 'Error fetching regulatory compliance',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as RegulatoryCompliance[];
    },
  });

  return {
    regulatoryCompliance,
    isRegulatoryLoading,
    selectedRegion,
    setSelectedRegion,
  };
};
