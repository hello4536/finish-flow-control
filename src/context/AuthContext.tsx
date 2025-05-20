
import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "@/types/auth";
import { useAuthData } from "@/hooks/useAuthData";
import { useAuthMethods } from "@/hooks/useAuthMethods";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    session,
    setSession,
    user,
    setUser,
    profile,
    organization,
    userRole,
    isLoading,
    setIsLoading,
    fetchUserProfile,
    fetchUserRole,
    fetchUserOrganization
  } = useAuthData();

  const { signUp, signIn, signOut, checkSubscription } = useAuthMethods(
    setIsLoading,
    fetchUserProfile,
    fetchUserRole,
    fetchUserOrganization
  );

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
          setUser(null);
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
