
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ResourceDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
  url: string;
}

export const useResourceDocuments = () => {
  const queryClient = useQueryClient();
  
  // Fetch documents
  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['resourceDocuments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resource_documents')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        toast({
          title: 'Error fetching documents',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        size: doc.size,
        url: doc.url,
        createdAt: new Date(doc.created_at),
      }));
    },
  });
  
  // Upload document (in a real app, this would handle file uploads to storage)
  const uploadDocument = useMutation({
    mutationFn: async (file: File) => {
      // First upload file to storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resource_documents')
        .upload(fileName, file);
        
      if (uploadError) {
        toast({
          title: 'Error uploading document',
          description: uploadError.message,
          variant: 'destructive',
        });
        throw uploadError;
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('resource_documents')
        .getPublicUrl(fileName);
        
      const fileUrl = publicUrlData.publicUrl;
      
      // Then add entry to the database
      const { data, error } = await supabase
        .from('resource_documents')
        .insert([{
          name: file.name,
          type: file.type,
          size: file.size,
          url: fileUrl,
        }])
        .select()
        .single();
        
      if (error) {
        toast({
          title: 'Error saving document record',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return {
        id: data.id,
        name: data.name,
        type: data.type,
        size: data.size,
        url: data.url,
        createdAt: new Date(data.created_at),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceDocuments'] });
    },
  });
  
  // Delete document
  const deleteDocument = useMutation({
    mutationFn: async (document: ResourceDocument) => {
      // Extract the filename from the URL
      const urlParts = document.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('resource_documents')
        .remove([fileName]);
        
      if (storageError) {
        console.error('Error removing file from storage:', storageError);
        // We'll continue trying to delete the database entry
      }
      
      // Delete from database
      const { error } = await supabase
        .from('resource_documents')
        .delete()
        .eq('id', document.id);
        
      if (error) {
        toast({
          title: 'Error removing document',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      return document.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resourceDocuments'] });
    },
  });
  
  return {
    documents,
    isLoading,
    uploadDocument,
    deleteDocument,
  };
};
