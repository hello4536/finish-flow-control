
import React from "react";

const SubscriptionFooter: React.FC = () => {
  return (
    <div className="mt-8 text-center text-sm text-muted-foreground">
      <p>
        Admin plan costs $49/month for the first user. Additional employee accounts are $10/month per user.
      </p>
      <p className="mt-2">
        Have questions about our pricing? Contact our support team.
      </p>
    </div>
  );
};

export default SubscriptionFooter;
