
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

export const useResourceLinks = () => {
  const queryClient = useQueryClient();
  
  // Fetch links
  const { data: links = [], isLoading } = useQuery({
    queryKey: ['resourceLinks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resource_links')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        toast({
          title: 'Error fetching links',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data.map(link => ({
        id: link.id,
        title: link.title,
        url: link.url,
        createdAt: new Date(link.created_at),
      }));
    },
  });
  
  // Add link
  const addLink = useMutation({
    mutationFn: async (link: Omit<ResourceLink, 'id' | 'createdAt'>) => {
      const { data, error } = await supabase
        .from('resource_links')
        .insert([{
          title: link.title,
          url: link.url,
        }])
        .select()
        .single();
        
      if (error) {
        toast({
          title: 'Error saving link',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return {
        id: data.id,
        title: data.title,
        url: data.url,
        createdAt: new Date(data.created_at),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceLinks'] });
    },
  });
  
  // Delete link
  const deleteLink = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resource_links')
        .delete()
        .eq('id', id);
        
      if (error) {
        toast({
          title: 'Error removing link',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceLinks'] });
    },
  });
  
  return {
    links,
    isLoading,
    addLink,
    deleteLink,
  };
};
