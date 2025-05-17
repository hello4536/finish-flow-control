
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

interface Receipt {
  id: string;
  name: string;
  file_url: string;
  company: string;
  amount: number;
  date: string;
  category: string | null;
  notes: string | null;
  type: string;
  size: number;
  created_at: string;
  updated_at: string;
}

interface ReceiptFormData {
  name: string;
  file: File;
  company: string;
  amount: number;
  date: string;
  category?: string;
  notes?: string;
}

export const useResourceReceipts = () => {
  const queryClient = useQueryClient();
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  // Fetch all receipts
  const { data: receipts = [], isLoading } = useQuery({
    queryKey: ['receipts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resource_receipts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error loading receipts',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data as Receipt[];
    },
  });

  // Add a new receipt
  const addReceipt = useMutation({
    mutationFn: async (formData: ReceiptFormData) => {
      try {
        // Upload file first
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('resource_receipts')
          .upload(filePath, formData.file);
        
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        
        // Get file URL
        const { data: { publicUrl } } = supabase.storage
          .from('resource_receipts')
          .getPublicUrl(filePath);
        
        // Save receipt metadata to database
        const receiptData = {
          name: formData.name,
          file_url: publicUrl,
          company: formData.company,
          amount: formData.amount,
          date: formData.date,
          category: formData.category || null,
          notes: formData.notes || null,
          type: formData.file.type,
          size: formData.file.size,
        };
        
        const { error: insertError } = await supabase
          .from('resource_receipts')
          .insert(receiptData);
        
        if (insertError) {
          throw new Error(insertError.message);
        }
        
        return receiptData;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
    },
    onError: (error) => {
      toast({
        title: 'Error saving receipt',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    },
  });
  
  // Delete a receipt
  const deleteReceipt = useMutation({
    mutationFn: async (id: string) => {
      // Find the receipt to get the file URL
      const receipt = receipts.find(r => r.id === id);
      if (!receipt) throw new Error('Receipt not found');
      
      // Delete from database first
      const { error: deleteError } = await supabase
        .from('resource_receipts')
        .delete()
        .eq('id', id);
      
      if (deleteError) {
        throw new Error(deleteError.message);
      }
      
      // Extract filename from URL
      const fileUrl = new URL(receipt.file_url);
      const filePath = fileUrl.pathname.split('/').pop();
      
      if (filePath) {
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('resource_receipts')
          .remove([filePath]);
        
        if (storageError) {
          console.error('Error deleting file:', storageError);
          // We don't throw here as the DB record is already deleted
        }
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receipts'] });
      setSelectedReceipt(null);
    },
    onError: (error) => {
      toast({
        title: 'Error deleting receipt',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    },
  });

  const getCategories = () => {
    const categories = new Set<string>();
    
    receipts.forEach(receipt => {
      if (receipt.category) {
        categories.add(receipt.category);
      }
    });
    
    return Array.from(categories);
  };

  return {
    receipts,
    isLoading,
    addReceipt,
    deleteReceipt,
    selectedReceipt,
    setSelectedReceipt,
    getCategories,
  };
};
