
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

export type TaskFormData = {
  title: string;
  description?: string;
  userId: string;
  priority: "low" | "medium" | "high";
  dueTime?: string;
};
