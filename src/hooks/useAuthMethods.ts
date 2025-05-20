
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cleanupAuthState } from "@/utils/authUtils";

export function useAuthMethods(
  setIsLoading: (isLoading: boolean) => void,
  fetchUserProfile: (userId: string) => Promise<void>,
  fetchUserRole: (userId: string) => Promise<void>,
  fetchUserOrganization: (userId: string) => Promise<void>
) {
  const navigate = useNavigate();

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
      // Call the edge function to check subscription status
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) {
        console.error("Error checking subscription:", error);
        return;
      }
      
      return data;
    } catch (error) {
      console.error("Error in checkSubscription:", error);
    }
  };

  return { signUp, signIn, signOut, checkSubscription };
}
