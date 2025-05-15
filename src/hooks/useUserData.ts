
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  last_login: string | null;
  created_at?: string;
  updated_at?: string;
}

export function useUserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch users data
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("app_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new user
  const addUser = async (userData: Omit<User, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("app_users")
        .insert([userData])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setUsers((prevUsers) => [...prevUsers, data[0]]);
        return data[0];
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: "Failed to add user.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Update an existing user
  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      const { data, error } = await supabase
        .from("app_users")
        .update(userData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? { ...user, ...data[0] } : user))
        );
        return data[0];
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Delete a user
  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from("app_users")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "app_users",
        },
        (payload) => {
          console.log("Real-time update:", payload);
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { users, isLoading, addUser, updateUser, deleteUser, fetchUsers };
}
