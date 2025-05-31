
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TaskWithAssignee, TaskFormData } from './types';
import { mockData, useMockData } from '@/utils/mockData';

export const useDailyTasks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const showMockData = useMockData();

  // Mock data query
  const mockQuery = useQuery({
    queryKey: ['mock-daily-tasks'],
    queryFn: async (): Promise<TaskWithAssignee[]> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData.dailyTasks;
    },
    enabled: showMockData
  });

  // Real data query
  const realQuery = useQuery({
    queryKey: ['daily-tasks'],
    queryFn: async (): Promise<TaskWithAssignee[]> => {
      const { data, error } = await supabase
        .from('daily_tasks')
        .select(`
          *,
          profiles:user_id(id, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(task => ({
        ...task,
        assignee: task.profiles ? {
          id: task.profiles.id || task.user_id,
          name: task.profiles.full_name || 'Unknown User'
        } : undefined
      }));
    },
    enabled: !showMockData
  });

  // Use mock or real data based on dev mode
  const { data: tasks = [], isLoading, error } = showMockData ? mockQuery : realQuery;

  const addTaskMutation = useMutation({
    mutationFn: async (newTask: TaskFormData) => {
      if (showMockData) {
        // Simulate adding to mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
      }

      const { error } = await supabase
        .from('daily_tasks')
        .insert([{
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          due_date: newTask.due_date,
          due_time: newTask.dueTime,
          user_id: newTask.userId,
          status: 'pending'
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: showMockData ? ['mock-daily-tasks'] : ['daily-tasks'] });
      toast({
        title: 'Task created',
        description: 'The task has been created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<TaskWithAssignee> }) => {
      if (showMockData) {
        // Simulate updating mock data
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
      }

      const { error } = await supabase
        .from('daily_tasks')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: showMockData ? ['mock-daily-tasks'] : ['daily-tasks'] });
      toast({
        title: 'Task updated',
        description: 'The task has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      if (showMockData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
      }

      const { error } = await supabase
        .from('daily_tasks')
        .update({ status: 'completed' })
        .eq('id', taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: showMockData ? ['mock-daily-tasks'] : ['daily-tasks'] });
      toast({
        title: 'Task completed',
        description: 'The task has been marked as completed.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error completing task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      if (showMockData) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return;
      }

      const { error } = await supabase
        .from('daily_tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: showMockData ? ['mock-daily-tasks'] : ['daily-tasks'] });
      toast({
        title: 'Task deleted',
        description: 'The task has been deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error deleting task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTask: addTaskMutation.mutate,
    assignTask: addTaskMutation.mutate, // Alias for addTask
    updateTask: updateTaskMutation.mutate,
    completeTask: completeTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isAddingTask: addTaskMutation.isPending,
    isUpdatingTask: updateTaskMutation.isPending,
  };
};
