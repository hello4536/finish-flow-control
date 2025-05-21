
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EquipmentAssignment } from '@/types/equipment';

export const useEquipmentAssignments = () => {
  const [assignments, setAssignments] = useState<EquipmentAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const { data: assignmentData, error } = await supabase
        .from('equipment_assignments')
        .select(`
          *,
          equipment:equipment_id(id, name, type),
          assignee:assigned_to(id, name:email),
          assigner:assigned_by(id, name:email)
        `)
        .order('assigned_date', { ascending: false });

      if (error) throw error;

      const formattedAssignments = assignmentData.map(assignment => ({
        id: assignment.id,
        equipment: {
          id: assignment.equipment.id,
          name: assignment.equipment.name,
          type: assignment.equipment.type
        },
        assignee: {
          id: assignment.assignee.id,
          name: assignment.assignee.name
        },
        assigner: {
          id: assignment.assigner.id,
          name: assignment.assigner.name
        },
        assignedDate: assignment.assigned_date,
        returnDate: assignment.return_date,
        status: assignment.status,
        notes: assignment.notes
      }));

      setAssignments(formattedAssignments);
    } catch (error: any) {
      console.error('Error fetching assignments:', error);
      toast({
        title: 'Error fetching assignments',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAssignment = async (newAssignment: Partial<EquipmentAssignment>) => {
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
      
      fetchAssignments();
      
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
      
      fetchAssignments();
      
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

  useEffect(() => {
    fetchAssignments();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('assignment_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'equipment_assignments' },
        () => {
          fetchAssignments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    assignments,
    isLoading,
    addAssignment,
    updateAssignment,
    refresh: fetchAssignments,
  };
};
