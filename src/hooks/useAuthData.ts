
import { useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Organization, UserRole } from "@/types/auth";

export function useAuthData() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    }
  };

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        return;
      }

      setUserRole(data);
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
    }
  };

  const fetchUserOrganization = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("org_members")
        .select("organization_id")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user organization:", error);
        return;
      }

      if (data?.organization_id) {
        const { data: orgData, error: orgError } = await supabase
          .from("organizations")
          .select("*")
          .eq("id", data.organization_id)
          .single();

        if (orgError) {
          console.error("Error fetching organization details:", orgError);
          return;
        }

        setOrganization(orgData);
      }
    } catch (error) {
      console.error("Error in fetchUserOrganization:", error);
    }
  };

  return {
    session,
    setSession,
    user,
    setUser,
    profile,
    setProfile,
    organization, 
    setOrganization,
    userRole,
    setUserRole,
    isLoading,
    setIsLoading,
    fetchUserProfile,
    fetchUserRole,
    fetchUserOrganization,
  };
}
