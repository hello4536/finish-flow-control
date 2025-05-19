
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ComplianceIssue } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useComplianceIssues = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch compliance issues
  const { data: complianceIssues = [], isLoading: isComplianceIssuesLoading } = useQuery({
    queryKey: ['complianceIssues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_issues')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        toast({
          title: 'Error fetching compliance issues',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as ComplianceIssue[];
    },
  });

  // Add compliance issue mutation
  const addComplianceIssue = useMutation({
    mutationFn: async (issue: Omit<ComplianceIssue, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('compliance_issues')
        .insert(issue)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complianceIssues'] });
      toast({ 
        title: 'Compliance issue added',
        description: 'Compliance issue has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding compliance issue',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update compliance issue mutation
  const updateComplianceIssue = useMutation({
    mutationFn: async ({ id, ...issue }: { id: string } & Omit<ComplianceIssue, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('compliance_issues')
        .update(issue)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complianceIssues'] });
      toast({ 
        title: 'Compliance issue updated',
        description: 'Compliance issue has been updated successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating compliance issue',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Delete compliance issue mutation
  const deleteComplianceIssue = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('compliance_issues')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complianceIssues'] });
      toast({ 
        title: 'Compliance issue deleted',
        description: 'Compliance issue has been deleted successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting compliance issue',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  return {
    complianceIssues,
    isComplianceIssuesLoading,
    addComplianceIssue,
    updateComplianceIssue,
    deleteComplianceIssue
  };
};
