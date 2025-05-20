
import React from "react";
import PlanCard from "@/components/subscription/PlanCard";

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

interface SubscriptionPlansProps {
  tiers: SubscriptionTier[];
  organization: any;
  handleSubscribe: (tier: SubscriptionTier) => Promise<void>;
  handleManageSubscription: () => Promise<void>;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  tiers,
  organization,
  handleSubscribe,
  handleManageSubscription,
}) => {
  return (
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
  );
};

export default SubscriptionPlans;
