
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
  return data?.map(item => {
    // Create a base object with common properties
    const stain: Partial<Stain> = {
      id: item.id,
      name: item.name,
      brand: item.brand,
      color: item.color,
      notes: item.notes,
      createdAt: item.created_at,
      updated_at: item.updated_at
    };

    // Handle baseComponents field if it exists in the database
    if ('baseComponents' in item && item.baseComponents) {
      stain.baseComponents = typeof item.baseComponents === 'string' 
        ? JSON.parse(item.baseComponents) 
        : item.baseComponents;
    }

    // Handle substrateCompatibility field if it exists in the database
    if ('substrateCompatibility' in item && item.substrateCompatibility) {
      stain.substrateCompatibility = typeof item.substrateCompatibility === 'string'
        ? JSON.parse(item.substrateCompatibility)
        : item.substrateCompatibility;
    }

    // Handle other optional fields with type assertions to ensure proper typing
    if ('mixingInstructions' in item) stain.mixingInstructions = item.mixingInstructions as string;
    if ('applicationMethod' in item) stain.applicationMethod = item.applicationMethod as string;
    if ('dryingTime' in item) stain.dryingTime = item.dryingTime as string;
    if ('coatsRecommended' in item) stain.coatsRecommended = item.coatsRecommended as string;
    if ('created_by' in item) stain.createdBy = item.created_by as string;

    return stain as Stain;
  }) || [];
};
