
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Users } from "lucide-react";

interface SubscriptionHeaderProps {
  refreshing: boolean;
  refreshSubscriptionStatus: () => Promise<void>;
  syncSubscription?: () => Promise<void>;
  hasActiveSubscription?: boolean;
}

const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({
  refreshing,
  refreshSubscriptionStatus,
  syncSubscription,
  hasActiveSubscription,
}) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <p className="text-muted-foreground mt-1">
          Choose the right plan for your organization
        </p>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        {hasActiveSubscription && syncSubscription && (
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
            onClick={syncSubscription}
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Sync Seats
              </>
            )}
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
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
    </div>
  );
};

export default SubscriptionHeader;
