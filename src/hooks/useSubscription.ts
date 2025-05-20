
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export function useSubscription() {
  const { user, organization, userRole, checkSubscription } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubscriptionTiers();
    
    // If user is logged in, check subscription status
    if (user) {
      refreshSubscriptionStatus();
    }
  }, [user]);

  // Parse URL query params to check for success message
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("success") === "true") {
      toast({
        title: "Success!",
        description: "Your subscription has been updated successfully.",
      });
      // Remove query param from URL
      navigate(window.location.pathname, { replace: true });
      // Refresh subscription status
      refreshSubscriptionStatus();
    }
  }, []);

  const loadSubscriptionTiers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("subscription_tiers")
        .select("*")
        .order("price", { ascending: true });
      
      if (error) {
        console.error("Error loading subscription tiers:", error);
        toast({
          title: "Error",
          description: "Could not load subscription plans",
          variant: "destructive",
        });
        return;
      }

      setTiers(data?.map(tier => ({
        ...tier,
        features: Array.isArray(tier.features) ? tier.features : JSON.parse(tier.features as unknown as string),
      })) || []);
    } catch (error) {
      console.error("Error loading subscription tiers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSubscriptionStatus = async () => {
    setRefreshing(true);
    try {
      // Get detailed subscription info
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) {
        throw error;
      }
      
      setSubscriptionDetails(data);
      await checkSubscription();
      
      toast({
        title: "Updated",
        description: "Subscription status updated",
      });
    } catch (error) {
      console.error("Error refreshing subscription status:", error);
      toast({
        title: "Error",
        description: "Failed to refresh subscription status",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleSubscribe = async (tier: SubscriptionTier) => {
    try {
      // Only admin can subscribe
      if (userRole?.role !== "admin") {
        toast({
          title: "Permission Denied",
          description: "Only admin users can manage subscriptions",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { returnUrl: window.location.href, tierId: tier.id },
      });

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start subscription process",
        variant: "destructive",
      });
    }
  };

  const handleManageSubscription = async () => {
    try {
      // Only admin can manage subscription
      if (userRole?.role !== "admin") {
        toast({
          title: "Permission Denied", 
          description: "Only admin users can manage subscriptions",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke("customer-portal", {
        body: { returnUrl: window.location.href },
      });

      if (error) {
        throw error;
      }

      // Redirect to Stripe customer portal
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Error opening customer portal:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to open subscription management",
        variant: "destructive",
      });
    }
  };

  const syncSubscription = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke("add-employee", {
        body: { action: "sync" }
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Employee seats synchronized with Stripe",
      });
      
      refreshSubscriptionStatus();
    } catch (error: any) {
      console.error("Error syncing subscription:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sync subscription",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  return {
    isLoading,
    refreshing,
    tiers,
    subscriptionDetails,
    handleSubscribe,
    handleManageSubscription,
    refreshSubscriptionStatus,
    syncSubscription
  };
}
