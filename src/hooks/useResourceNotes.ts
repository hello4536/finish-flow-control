
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ResourceNote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export const useResourceNotes = () => {
  const queryClient = useQueryClient();
  
  // Fetch notes
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ['resourceNotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resource_notes')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        toast({
          title: 'Error fetching notes',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: new Date(note.created_at),
      }));
    },
  });
  
  // Add note
  const addNote = useMutation({
    mutationFn: async (note: Omit<ResourceNote, 'id' | 'createdAt'>) => {
      const { data, error } = await supabase
        .from('resource_notes')
        .insert([{
          title: note.title,
          content: note.content,
        }])
        .select()
        .single();
        
      if (error) {
        toast({
          title: 'Error saving note',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: new Date(data.created_at),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceNotes'] });
    },
  });
  
  // Delete note
  const deleteNote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resource_notes')
        .delete()
        .eq('id', id);
        
      if (error) {
        toast({
          title: 'Error removing note',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceNotes'] });
    },
  });
  
  return {
    notes,
    isLoading,
    addNote,
    deleteNote,
  };
};
