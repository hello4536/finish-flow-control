
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import PlanCard from "@/components/subscription/PlanCard";
import { Loader2, RefreshCw } from "lucide-react";

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const SubscriptionPage: React.FC = () => {
  const { user, organization, userRole, checkSubscription } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubscriptionTiers();
    
    // If user is logged in, check subscription status
    if (user) {
      refreshSubscriptionStatus();
    }
  }, [user]);

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
        body: { returnUrl: window.location.href },
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-xl">Loading subscription plans...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground mt-1">
            Choose the right plan for your organization
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-2 sm:mt-0"
          onClick={refreshSubscriptionStatus}
          disabled={refreshing}
        >
          {refreshing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </>
          )}
        </Button>
      </div>

      {organization?.subscription_status === "active" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md">
          <p className="font-medium text-green-800">
            Your organization has an active subscription until{" "}
            {organization.subscription_end_date && 
              new Date(organization.subscription_end_date).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {tiers.map((tier) => {
          const isActive = 
            organization?.subscription_status === "active" &&
            organization?.subscription_tier === tier.id;
            
          return (
            <PlanCard
              key={tier.id}
              title={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features.map((text) => ({ text, included: true }))}
              isActive={isActive}
              onSubscribe={() => handleSubscribe(tier)}
              onManage={handleManageSubscription}
            />
          );
        })}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Admin plan costs $49/month for the first user. Additional employee accounts are $10/month per user.
        </p>
        <p className="mt-2">
          Have questions about our pricing? Contact our support team.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
