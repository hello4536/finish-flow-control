
import { supabase } from "@/integrations/supabase/client";
import { Task, TaskWithAssignee, TaskFormData } from "./types";
import { format } from "date-fns";
import { User } from "@/hooks/useUserData";

// Map tasks with their assignees
export function mapTasksWithAssignees(
  tasks: Task[],
  users: User[]
): TaskWithAssignee[] {
  // Map users by ID for easy lookup
  const userMap = new Map(users.map((user: User) => [user.id, user]));

  // Transform the data to match our TaskWithAssignee interface
  return tasks.map((task: Task) => ({
    ...task,
    assignee: userMap.get(task.user_id)
  })) as TaskWithAssignee[];
}

// Fetch all tasks
export async function fetchAllTasks() {
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

  return {
    tasks: tasksData as Task[],
    users: usersData as User[]
  };
}

// Create a new task
export async function createTask(taskData: TaskFormData & { dueDate: Date }) {
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

  return {
    task: data as Task,
    assignee: userData as User | undefined
  };
}

// Update task status
export async function updateTaskStatus(taskId: string, status: "pending" | "completed") {
  const { data, error } = await supabase
    .from("daily_tasks")
    .update({ status, updated_at: new Date().toISOString() })
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

  return {
    task: data as Task,
    assignee: userData as User | undefined
  };
}

// Delete a task
export async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from("daily_tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    throw error;
  }

  return true;
}
