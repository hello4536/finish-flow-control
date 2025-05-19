
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TaskWithAssignee, TaskFormData } from "./types";
import { 
  fetchAllTasks, 
  mapTasksWithAssignees, 
  createTask, 
  updateTaskStatus, 
  deleteTask 
} from "./taskService";

export function useDailyTasks() {
  const [tasks, setTasks] = useState<TaskWithAssignee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Fetch all tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const { tasks: tasksData, users: usersData } = await fetchAllTasks();
      
      // Transform the data to match our TaskWithAssignee interface
      const transformedTasks = mapTasksWithAssignees(tasksData, usersData);
      setTasks(transformedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description: "Failed to load tasks.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Assign a new task
  const assignTask = async (taskData: TaskFormData & { dueDate: Date }) => {
    try {
      const { task, assignee } = await createTask(taskData);

      const assignedTask = {
        ...task,
        assignee
      } as TaskWithAssignee;

      setTasks((prev) => [assignedTask, ...prev]);

      toast({
        title: "Task Assigned",
        description: "The task has been successfully assigned.",
      });

      return assignedTask;
    } catch (error) {
      console.error("Error assigning task:", error);
      toast({
        title: "Error",
        description: "Failed to assign task.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Mark a task as completed
  const completeTask = async (taskId: string) => {
    try {
      const { task, assignee } = await updateTaskStatus(taskId, "completed");

      const updatedTask = {
        ...task,
        assignee
      } as TaskWithAssignee;

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );

      toast({
        title: "Task Completed",
        description: "The task has been marked as completed.",
      });

      return true;
    } catch (error) {
      console.error("Error completing task:", error);
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Delete a task
  const deleteTaskById = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      toast({
        title: "Task Deleted",
        description: "The task has been deleted successfully.",
      });

      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "daily_tasks",
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { 
    tasks, 
    isLoading, 
    assignTask, 
    completeTask, 
    deleteTask: deleteTaskById,
    fetchTasks 
  };
}
