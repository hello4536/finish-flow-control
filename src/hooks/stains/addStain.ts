
import { supabase } from '@/integrations/supabase/client';
import { AddStainParams } from './types';

export const addStain = async ({
  name, 
  brand, 
  color, 
  notes,
  baseComponents,
  mixingInstructions,
  substrateCompatibility,
  applicationMethod,
  dryingTime,
  coatsRecommended,
  createdBy,
  createdAt
}: AddStainParams) => {
  // Ensure baseComponents and substrateCompatibility are properly formatted
  const formattedBaseComponents = baseComponents || [];
  const formattedSubstrateCompatibility = substrateCompatibility || [];

  const newStain = {
    name,
    brand,
    color,
    notes,
    baseComponents: formattedBaseComponents,
    mixingInstructions,
    substrateCompatibility: formattedSubstrateCompatibility,
    applicationMethod,
    dryingTime,
    coatsRecommended,
    created_by: createdBy,
    // Convert Date to ISO string for Supabase
    created_at: createdAt ? createdAt.toISOString() : new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('stains')
    .insert(newStain)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
