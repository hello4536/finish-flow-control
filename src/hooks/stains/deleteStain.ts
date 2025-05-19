
import { supabase } from '@/integrations/supabase/client';

export const deleteStain = async (id: string) => {
  const { error } = await supabase
    .from('stains')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return id;
};
