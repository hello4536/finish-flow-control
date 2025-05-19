
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  last_login: string | null;
}

export function useUserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { organization } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [organization]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      if (!organization) {
        setUsers([]);
        return;
      }
      
      // Get users from the organization
      const { data: members, error: membersError } = await supabase
        .from("org_members")
        .select("user_id")
        .eq("organization_id", organization.id);

      if (membersError) {
        console.error("Error fetching organization members:", membersError);
        return;
      }
      
      if (members.length === 0) {
        setUsers([]);
        setIsLoading(false);
        return;
      }
      
      // Get user IDs
      const userIds = members.map(member => member.user_id);
      
      // Fetch profiles for these users
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        return;
      }

      // Fetch roles for these users
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("user_id", userIds);

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
        return;
      }

      // Fetch users from app_users (this contains email and status)
      const { data: appUsers, error: appUsersError } = await supabase
        .from("app_users")
        .select("*")
        .in("id", userIds);

      if (appUsersError) {
        console.error("Error fetching app_users:", appUsersError);
        return;
      }

      // Combine the data
      const combinedUsers = userIds.map(userId => {
        const profile = profiles?.find(p => p.id === userId);
        const role = roles?.find(r => r.user_id === userId);
        const appUser = appUsers?.find(u => u.id === userId);
        
        return {
          id: userId,
          name: profile?.full_name || "Unknown",
          email: appUser?.email || "",
          role: role?.role || "employee",
          status: appUser?.status || "active",
          last_login: appUser?.last_login,
        };
      });
      
      setUsers(combinedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (userData: Omit<User, "id">) => {
    try {
      if (!organization) {
        toast({
          title: "Error",
          description: "No organization found",
          variant: "destructive",
        });
        return false;
      }
      
      // Create a new app_user
      const { data, error } = await supabase
        .from("app_users")
        .insert([{
          name: userData.name,
          email: userData.email,
          role: userData.role,
          status: userData.status,
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Add user to the organization
      const { error: memberError } = await supabase
        .from("org_members")
        .insert([{
          organization_id: organization.id,
          user_id: data.id,
        }]);
      
      if (memberError) throw memberError;
      
      // Add user role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert([{
          user_id: data.id,
          role: userData.role,
        }]);
      
      if (roleError) throw roleError;
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add user",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUser = async (userId: string, userData: Partial<User>) => {
    try {
      // Update app_user
      if (userData.name || userData.email || userData.status) {
        const { error } = await supabase
          .from("app_users")
          .update({
            name: userData.name,
            email: userData.email,
            status: userData.status,
          })
          .eq("id", userId);
        
        if (error) throw error;
      }
      
      // Update user role if changed
      if (userData.role) {
        const { error } = await supabase
          .from("user_roles")
          .update({ role: userData.role })
          .eq("user_id", userId);
        
        if (error) throw error;
      }
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      // Delete app_user (this will cascade to other tables due to foreign key constraints)
      const { error } = await supabase
        .from("app_users")
        .delete()
        .eq("id", userId);
      
      if (error) throw error;
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    users,
    isLoading,
    addUser,
    updateUser,
    deleteUser,
    refreshUsers: fetchUsers,
  };
}
