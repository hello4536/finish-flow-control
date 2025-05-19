
import { supabase } from '@/integrations/supabase/client';
import { UpdateStainParams } from './types';

export const updateStain = async ({
  id,
  ...stainData
}: UpdateStainParams) => {
  const { error } = await supabase
    .from('stains')
    .update(stainData)
    .eq('id', id);
  
  if (error) throw error;
  return { id, ...stainData };
};
