
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Certification } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useCertifications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch certifications
  const { data: certifications = [], isLoading: isCertificationsLoading } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('expiry', { ascending: true });
      
      if (error) {
        toast({
          title: 'Error fetching certifications',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as Certification[];
    },
  });

  // Add certification mutation
  const addCertification = useMutation({
    mutationFn: async (certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('certifications')
        .insert(certification)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast({ 
        title: 'Certification added',
        description: 'Certification has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding certification',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update certification mutation
  const updateCertification = useMutation({
    mutationFn: async ({ id, ...certification }: { id: string } & Omit<Certification, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('certifications')
        .update(certification)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast({ 
        title: 'Certification updated',
        description: 'Certification has been updated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating certification',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Delete certification mutation
  const deleteCertification = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast({ 
        title: 'Certification deleted',
        description: 'Certification has been deleted successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting certification',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  return {
    certifications,
    isCertificationsLoading,
    addCertification,
    updateCertification,
    deleteCertification
  };
};
