
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useBookmarks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch all bookmarks
  const fetchBookmarks = async (): Promise<Bookmark[]> => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching bookmarks:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  };
  
  // Query to fetch bookmarks
  const { 
    data: bookmarks = [], 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
  });
  
  // Add a new bookmark
  const addBookmark = useMutation({
    mutationFn: async ({ title, url, notes }: { title: string; url: string; notes?: string }) => {
      const newBookmark = {
        title,
        url,
        category: 'general',  // Default category
        notes
      };
      
      const { data, error } = await supabase
        .from('bookmarks')
        .insert(newBookmark)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Bookmark added',
        description: 'The bookmark has been added to your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to add bookmark: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Delete a bookmark
  const deleteBookmark = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      toast({
        title: 'Bookmark removed',
        description: 'The bookmark has been removed from your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to remove bookmark: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('bookmarks_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return {
    bookmarks,
    isLoading,
    error,
    addBookmark,
    deleteBookmark
  };
};
