
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { TaskFormData } from "@/components/tasks/TaskAssignmentForm";
import { User } from "@/hooks/useUserData";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  user_id: string;
  due_date: string;
  due_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskWithAssignee extends Task {
  assignee?: User;
}

export function useDailyTasks() {
  const [tasks, setTasks] = useState<TaskWithAssignee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Fetch all tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      // First, fetch all tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from("daily_tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (tasksError) {
        throw tasksError;
      }

      // Then fetch all users to get assignee data
      const { data: usersData, error: usersError } = await supabase
        .from("app_users")
        .select("*");

      if (usersError) {
        throw usersError;
      }

      // Map users by ID for easy lookup
      const userMap = new Map(
        usersData.map((user: User) => [user.id, user])
      );

      // Transform the data to match our TaskWithAssignee interface
      const transformedTasks = tasksData.map((task: Task) => ({
        ...task,
        assignee: userMap.get(task.user_id)
      })) as TaskWithAssignee[];

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
      const { title, description, userId, priority, dueTime, dueDate } = taskData;

      const formattedDate = format(dueDate, "yyyy-MM-dd");

      const newTask = {
        title,
        description: description || null,
        priority,
        status: "pending",
        user_id: userId,
        due_date: formattedDate,
        due_time: dueTime || null,
      };

      const { data, error } = await supabase
        .from("daily_tasks")
        .insert([newTask])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Fetch the assignee data
      const { data: userData, error: userError } = await supabase
        .from("app_users")
        .select("*")
        .eq("id", userId)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
      }

      const assignedTask = {
        ...data,
        assignee: userData || undefined
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
      const { data, error } = await supabase
        .from("daily_tasks")
        .update({ status: "completed", updated_at: new Date().toISOString() })
        .eq("id", taskId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Fetch the assignee data
      const { data: userData, error: userError } = await supabase
        .from("app_users")
        .select("*")
        .eq("id", data.user_id)
        .single();

      if (userError) {
        console.error("Error fetching user data:", userError);
      }

      const updatedTask = {
        ...data,
        assignee: userData || undefined
      } as TaskWithAssignee;

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
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
  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from("daily_tasks")
        .delete()
        .eq("id", taskId);

      if (error) {
        throw error;
      }

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
    deleteTask,
    fetchTasks 
  };
}
