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
      // Ensure mock data conforms to the TaskWithAssignee type
      return mockData.dailyTasks.map(task => ({
        ...task,
        priority: task.priority as "low" | "medium" | "high",
        status: task.status as "pending" | "completed"
      }));
    },
    enabled: showMockData
  });

  // Real data query
  const realQuery = useQuery({
    queryKey: ['daily-tasks'],
    queryFn: async (): Promise<TaskWithAssignee[]> => {
      // First get the tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('daily_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (tasksError) throw tasksError;
      if (!tasksData) return [];

      // Then get the profiles for the user_ids in the tasks
      const userIds = [...new Set(tasksData.map(task => task.user_id))];
      
      if (userIds.length === 0) {
        return tasksData.map(task => ({
          ...task,
          priority: task.priority as "low" | "medium" | "high",
          status: task.status as "pending" | "completed",
          assignee: undefined
        }));
      }

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        // Continue without profile data
      }

      // Map tasks with their assignees
      return tasksData.map(task => ({
        ...task,
        priority: task.priority as "low" | "medium" | "high",
        status: task.status as "pending" | "completed",
        assignee: profilesData?.find(profile => profile.id === task.user_id) ? {
          id: profilesData.find(profile => profile.id === task.user_id)!.id,
          name: profilesData.find(profile => profile.id === task.user_id)!.full_name || 'Unknown User'
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
