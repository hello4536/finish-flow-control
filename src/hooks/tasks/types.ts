
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

// Simplified assignee type for tasks
export interface TaskAssignee {
  id: string;
  name: string;
}

export interface TaskWithAssignee extends Task {
  assignee?: TaskAssignee;
}

export type TaskFormData = {
  title: string;
  description?: string;
  userId: string;
  priority: "low" | "medium" | "high";
  due_date: string;
  dueTime?: string;
};
