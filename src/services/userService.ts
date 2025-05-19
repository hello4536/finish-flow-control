
import { supabase } from "@/integrations/supabase/client";
import { User, UserCreate, UserUpdate } from "@/types/user";

export async function fetchUsersByOrganization(organizationId: string | undefined) {
  if (!organizationId) {
    return [];
  }
  
  // Get users from the organization
  const { data: members, error: membersError } = await supabase
    .from("org_members")
    .select("user_id")
    .eq("organization_id", organizationId);

  if (membersError) {
    console.error("Error fetching organization members:", membersError);
    return [];
  }
  
  if (members.length === 0) {
    return [];
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
    return [];
  }

  // Fetch roles for these users
  const { data: roles, error: rolesError } = await supabase
    .from("user_roles")
    .select("user_id, role")
    .in("user_id", userIds);

  if (rolesError) {
    console.error("Error fetching roles:", rolesError);
    return [];
  }

  // Fetch users from app_users (this contains email and status)
  const { data: appUsers, error: appUsersError } = await supabase
    .from("app_users")
    .select("*")
    .in("id", userIds);

  if (appUsersError) {
    console.error("Error fetching app_users:", appUsersError);
    return [];
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
  
  return combinedUsers;
}

export async function createUser(organizationId: string | undefined, userData: UserCreate) {
  if (!organizationId) {
    throw new Error("No organization found");
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
      organization_id: organizationId,
      user_id: data.id,
    }]);
  
  if (memberError) throw memberError;
  
  // Add user role
  const { error: roleError } = await supabase
    .from("user_roles")
    .insert({
      user_id: data.id,
      role: userData.role === "admin" ? "admin" : "employee"
    });
  
  if (roleError) throw roleError;
  
  return data.id;
}

export async function updateUserById(userId: string, userData: UserUpdate) {
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
    const roleValue = userData.role === "admin" ? "admin" : "employee";
    
    const { error } = await supabase
      .from("user_roles")
      .update({ role: roleValue })
      .eq("user_id", userId);
    
    if (error) throw error;
  }
  
  return true;
}

export async function deleteUserById(userId: string) {
  // Delete app_user (this will cascade to other tables due to foreign key constraints)
  const { error } = await supabase
    .from("app_users")
    .delete()
    .eq("id", userId);
  
  if (error) throw error;
  
  return true;
}
