
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Reimbursement {
  id: string;
  employee_name: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'paid';
  description: string;
  created_at: Date;
}

export const useResourceReimbursements = () => {
  const queryClient = useQueryClient();
  
  // Fetch reimbursements
  const { data: reimbursements = [], isLoading } = useQuery({
    queryKey: ['resourceReimbursements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resource_reimbursements')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        toast({
          title: 'Error fetching reimbursements',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data.map(reimbursement => ({
        id: reimbursement.id,
        employee_name: reimbursement.employee_name,
        amount: reimbursement.amount,
        date: reimbursement.date,
        status: reimbursement.status,
        description: reimbursement.description,
        created_at: new Date(reimbursement.created_at),
      }));
    },
  });
  
  // Add reimbursement
  const addReimbursement = useMutation({
    mutationFn: async (reimbursement: Omit<Reimbursement, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('resource_reimbursements')
        .insert([{
          employee_name: reimbursement.employee_name,
          amount: reimbursement.amount,
          date: reimbursement.date,
          status: reimbursement.status,
          description: reimbursement.description,
        }])
        .select()
        .single();
        
      if (error) {
        toast({
          title: 'Error saving reimbursement',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return {
        id: data.id,
        employee_name: data.employee_name,
        amount: data.amount,
        date: data.date,
        status: data.status,
        description: data.description,
        created_at: new Date(data.created_at),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceReimbursements'] });
    },
  });
  
  // Update reimbursement status
  const updateReimbursementStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: 'pending' | 'approved' | 'paid' }) => {
      const { data, error } = await supabase
        .from('resource_reimbursements')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        toast({
          title: 'Error updating reimbursement',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return {
        id: data.id,
        status: data.status,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceReimbursements'] });
    },
  });
  
  // Delete reimbursement
  const deleteReimbursement = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resource_reimbursements')
        .delete()
        .eq('id', id);
        
      if (error) {
        toast({
          title: 'Error removing reimbursement',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceReimbursements'] });
    },
  });
  
  // Get total amount by status
  const getTotalByStatus = (status: 'pending' | 'approved' | 'paid') => {
    return reimbursements
      .filter(r => r.status === status)
      .reduce((sum, r) => sum + Number(r.amount), 0);
  };
  
  return {
    reimbursements,
    isLoading,
    addReimbursement,
    updateReimbursementStatus,
    deleteReimbursement,
    getTotalByStatus,
  };
};
