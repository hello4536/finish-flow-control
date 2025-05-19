
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export interface Invitation {
  id: string;
  email: string;
  role: string;
  created_at: string;
  expires_at: string;
  token: string;
  accepted: boolean;
}

export function useInvitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { organization } = useAuth();

  useEffect(() => {
    if (organization) {
      fetchInvitations();
    }
  }, [organization]);

  const fetchInvitations = async () => {
    if (!organization) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("organization_id", organization.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      setInvitations(data || []);
    } catch (error) {
      console.error("Error fetching invitations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshInvitations = async () => {
    setIsRefreshing(true);
    await fetchInvitations();
    setIsRefreshing(false);
  };

  const deleteInvitation = async (invitationId: string, email: string) => {
    try {
      const { error } = await supabase
        .from("invitations")
        .delete()
        .eq("id", invitationId);
      
      if (error) throw error;
      
      toast({
        title: "Invitation canceled",
        description: `Invitation to ${email} has been canceled.`,
      });
      
      fetchInvitations();
      return true;
    } catch (error) {
      console.error("Error deleting invitation:", error);
      toast({
        title: "Error",
        description: "Failed to cancel invitation.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    invitations,
    isLoading,
    isRefreshing,
    fetchInvitations,
    refreshInvitations,
    deleteInvitation
  };
}
