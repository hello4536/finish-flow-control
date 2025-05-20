
import React from "react";
import { Loader2 } from "lucide-react";

const SubscriptionLoading: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-xl">Loading subscription plans...</span>
    </div>
  );
};

export default SubscriptionLoading;
