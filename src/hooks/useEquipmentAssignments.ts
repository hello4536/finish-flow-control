import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EquipmentAssignment } from '@/types/equipment';
import { mockData, useMockData } from '@/utils/mockData';

export const useEquipmentAssignments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const showMockData = useMockData();

  // Mock data query
  const mockQuery = useQuery({
    queryKey: ['mock-equipment-assignments'],
    queryFn: async (): Promise<EquipmentAssignment[]> => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockData.equipmentAssignments;
    },
    enabled: showMockData
  });

  // Real data query (keeping existing logic)
  const realQuery = useQuery({
    queryKey: ['equipment-assignments'],
    queryFn: async (): Promise<EquipmentAssignment[]> => {
      const { data: assignmentData, error } = await supabase
        .from('equipment_assignments')
        .select(`
          id,
          status,
          assigned_date,
          return_date,
          notes,
          equipment:equipment_id(id, name, type),
          assigned_to,
          assigned_by
        `)
        .order('assigned_date', { ascending: false });

      if (error) throw error;

      const formattedAssignments: EquipmentAssignment[] = [];
      
      for (const assignment of assignmentData) {
        const { data: assigneeData } = await supabase
          .from('profiles')
          .select('id, full_name')
          .eq('id', assignment.assigned_to)
          .single();
          
        const { data: assignerData } = await supabase
          .from('profiles')
          .select('id, full_name')
          .eq('id', assignment.assigned_by)
          .single();
          
        formattedAssignments.push({
          id: assignment.id,
          equipment: assignment.equipment,
          assignee: {
            id: assignment.assigned_to,
            name: assigneeData?.full_name || 'Unknown User'
          },
          assigner: {
            id: assignment.assigned_by,
            name: assignerData?.full_name || 'Unknown User'
          },
          assignedDate: assignment.assigned_date,
          returnDate: assignment.return_date,
          status: assignment.status,
          notes: assignment.notes
        });
      }

      return formattedAssignments;
    },
    enabled: !showMockData
  });

  // Use mock or real data based on dev mode
  const { data: assignments = [], isLoading, error } = showMockData ? mockQuery : realQuery;

  const addAssignment = async (newAssignment: Partial<EquipmentAssignment>) => {
    if (showMockData) {
      toast({
        title: 'Mock Mode',
        description: 'Equipment assignment added to mock data.',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('equipment_assignments')
        .insert([{
          equipment_id: newAssignment.equipment.id,
          assigned_to: newAssignment.assignee.id,
          assigned_by: newAssignment.assigner.id,
          assigned_date: newAssignment.assignedDate || new Date().toISOString(),
          return_date: newAssignment.returnDate,
          status: newAssignment.status || 'Active',
          notes: newAssignment.notes
        }]);

      if (error) throw error;
      
      // Update the equipment status to Assigned
      await supabase
        .from('equipment')
        .update({ status: 'Assigned' })
        .eq('id', newAssignment.equipment.id);
      
      queryClient.invalidateQueries({ queryKey: ['equipment-assignments'] });
      
      toast({
        title: 'Equipment assigned',
        description: 'The equipment has been assigned successfully.',
      });
    } catch (error: any) {
      console.error('Error adding assignment:', error);
      toast({
        title: 'Error adding assignment',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateAssignment = async (id: string, updates: Partial<EquipmentAssignment>) => {
    if (showMockData) {
      toast({
        title: 'Mock Mode',
        description: 'Equipment assignment updated in mock data.',
      });
      return;
    }

    try {
      const updateData: Record<string, any> = {};
      
      if (updates.status) updateData.status = updates.status;
      if (updates.returnDate) updateData.return_date = updates.returnDate;
      if (updates.notes) updateData.notes = updates.notes;
      
      const { error } = await supabase
        .from('equipment_assignments')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      // If the status is "Returned", update the equipment status to "Available"
      if (updates.status === 'Returned') {
        const assignment = assignments.find(a => a.id === id);
        if (assignment) {
          await supabase
            .from('equipment')
            .update({ status: 'Available' })
            .eq('id', assignment.equipment.id);
        }
      }
      
      queryClient.invalidateQueries({ queryKey: ['equipment-assignments'] });
      
      toast({
        title: 'Assignment updated',
        description: 'The equipment assignment has been updated successfully.',
      });
    } catch (error: any) {
      console.error('Error updating assignment:', error);
      toast({
        title: 'Error updating assignment',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    assignments,
    isLoading,
    addAssignment,
    updateAssignment,
    refresh: () => queryClient.invalidateQueries({ queryKey: showMockData ? ['mock-equipment-assignments'] : ['equipment-assignments'] }),
  };
};
