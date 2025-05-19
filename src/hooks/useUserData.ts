
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import { 
  fetchUsersByOrganization, 
  createUser, 
  updateUserById, 
  deleteUserById 
} from "@/services/userService";

export type { User } from "@/types/user";

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
      const fetchedUsers = await fetchUsersByOrganization(organization?.id);
      setUsers(fetchedUsers);
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

  const addUser = async (userData: Omit<User, "id" | "last_login">) => {
    try {
      if (!organization) {
        toast({
          title: "Error",
          description: "No organization found",
          variant: "destructive",
        });
        return false;
      }
      
      await createUser(organization.id, userData);
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
      await updateUserById(userId, userData);
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
      await deleteUserById(userId);
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
