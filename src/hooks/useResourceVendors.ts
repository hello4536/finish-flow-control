
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ResourceVendor {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
}

export const useResourceVendors = () => {
  const queryClient = useQueryClient();
  
  // Fetch vendors
  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ['resourceVendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resource_vendors')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        toast({
          title: 'Error fetching vendors',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data.map(vendor => ({
        id: vendor.id,
        name: vendor.name,
        contact: vendor.contact || '',
        phone: vendor.phone || '',
        email: vendor.email || '',
      }));
    },
  });
  
  // Add vendor
  const addVendor = useMutation({
    mutationFn: async (vendor: Omit<ResourceVendor, 'id'>) => {
      const { data, error } = await supabase
        .from('resource_vendors')
        .insert([{
          name: vendor.name,
          contact: vendor.contact || null,
          phone: vendor.phone || null,
          email: vendor.email || null,
        }])
        .select()
        .single();
        
      if (error) {
        toast({
          title: 'Error saving vendor',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return {
        id: data.id,
        name: data.name,
        contact: data.contact || '',
        phone: data.phone || '',
        email: data.email || '',
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceVendors'] });
    },
  });
  
  // Delete vendor
  const deleteVendor = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resource_vendors')
        .delete()
        .eq('id', id);
        
      if (error) {
        toast({
          title: 'Error removing vendor',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceVendors'] });
    },
  });
  
  return {
    vendors,
    isLoading,
    addVendor,
    deleteVendor,
  };
};
