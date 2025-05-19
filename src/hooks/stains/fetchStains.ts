
import { supabase } from '@/integrations/supabase/client';
import { Stain } from './types';

export const fetchStains = async (): Promise<Stain[]> => {
  const { data, error } = await supabase
    .from('stains')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching stains:', error);
    throw new Error(error.message);
  }
  
  // Transform the data to match our Stain interface
  return data?.map(item => ({
    ...item,
    createdAt: item.created_at,
    // Handle potential JSON fields that might be stored as strings
    baseComponents: item.baseComponents ? 
      (typeof item.baseComponents === 'string' ? 
        JSON.parse(item.baseComponents) : item.baseComponents) : [],
    substrateCompatibility: item.substrateCompatibility ? 
      (typeof item.substrateCompatibility === 'string' ? 
        JSON.parse(item.substrateCompatibility) : item.substrateCompatibility) : []
  })) || [];
};
