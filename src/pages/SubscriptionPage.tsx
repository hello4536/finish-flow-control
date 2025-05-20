
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import SubscriptionHeader from "@/components/subscription/SubscriptionHeader";
import SubscriptionDetails from "@/components/subscription/SubscriptionDetails";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import SubscriptionFooter from "@/components/subscription/SubscriptionFooter";
import SubscriptionLoading from "@/components/subscription/SubscriptionLoading";

const SubscriptionPage: React.FC = () => {
  const { organization } = useAuth();
  const {
    isLoading,
    refreshing,
    tiers,
    subscriptionDetails,
    handleSubscribe,
    handleManageSubscription,
    refreshSubscriptionStatus,
    syncSubscription
  } = useSubscription();

  if (isLoading) {
    return <SubscriptionLoading />;
  }

  return (
    <div className="container max-w-6xl py-8">
      <SubscriptionHeader 
        refreshing={refreshing}
        refreshSubscriptionStatus={refreshSubscriptionStatus}
        syncSubscription={syncSubscription}
        hasActiveSubscription={organization?.subscription_status === "active"}
      />

      {organization?.subscription_status === "active" && (
        <SubscriptionDetails
          subscriptionDetails={subscriptionDetails}
          organization={organization}
          handleManageSubscription={handleManageSubscription}
        />
      )}

      <SubscriptionPlans
        tiers={tiers}
        organization={organization}
        handleSubscribe={handleSubscribe}
        handleManageSubscription={handleManageSubscription}
      />

      <SubscriptionFooter />
    </div>
  );
};

export default SubscriptionPage;
