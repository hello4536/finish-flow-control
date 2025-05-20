import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Organization {
  id: string;
  name: string;
  subscription_status: string | null;
  subscription_tier: string | null;
  subscription_end_date: string | null;
}

interface UserRole {
  role: "admin" | "employee";
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  organization: Organization | null;
  userRole: UserRole | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string, orgName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to clean up auth state
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch additional data with timeout to prevent deadlocks
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
            fetchUserRole(currentSession.user.id);
            fetchUserOrganization(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
          setOrganization(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Got existing session:", currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);

      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
        fetchUserRole(currentSession.user.id);
        fetchUserOrganization(currentSession.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  const signUp = async (email: string, password: string, fullName: string, orgName: string) => {
    try {
      setIsLoading(true);
      
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt global sign out first to avoid issues
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      // Create the user account with Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        console.log("User created successfully:", data.user.id);
        
        // Execute SQL directly using service role (bypassing RLS)
        const { error: apiError } = await supabase.functions.invoke('create-organization', {
          body: { 
            userId: data.user.id,
            orgName: orgName
          }
        });

        if (apiError) {
          console.error("Error setting up organization:", apiError);
          throw apiError;
        }

        toast({
          title: "Account created",
          description: "Your account has been created successfully. Please verify your email.",
        });
        
        navigate("/auth/verify");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account.",
        variant: "destructive",
      });
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Failed to sign in.",
        variant: "destructive",
      });
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Clean up auth state
      cleanupAuthState();
      
      await supabase.auth.signOut();
      
      // Clear user data
      setUser(null);
      setProfile(null);
      setUserRole(null);
      setOrganization(null);
      
      // Force page reload for a clean state
      window.location.href = "/auth/signin";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkSubscription = async () => {
    try {
      if (!user) return;
      
      // Call the edge function to check subscription status
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) {
        console.error("Error checking subscription:", error);
        return;
      }
      
      // Refresh organization data to get updated subscription info
      fetchUserOrganization(user.id);
      
      return data;
    } catch (error) {
      console.error("Error in checkSubscription:", error);
    }
  };

  const value = {
    session,
    user,
    profile,
    organization,
    userRole,
    isLoading,
    signUp,
    signIn,
    signOut,
    checkSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
