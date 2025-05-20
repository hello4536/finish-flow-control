
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface SubscriptionDetailsProps {
  subscriptionDetails: {
    admin_seats?: number;
    employee_seats?: number;
  };
  organization: any;
  handleManageSubscription: () => Promise<void>;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  subscriptionDetails,
  organization,
  handleManageSubscription,
}) => {
  if (!organization?.subscription_status === "active") return null;
  
  return (
    <>
      <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md">
        <p className="font-medium text-green-800">
          Your organization has an active subscription until{" "}
          {organization.subscription_end_date && 
            new Date(organization.subscription_end_date).toLocaleDateString()}
        </p>
      </div>
      
      {subscriptionDetails && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Subscription Details</CardTitle>
            <CardDescription>Your subscription seats and billing information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800">Admin Seats</h3>
                <p className="text-2xl font-bold text-blue-900">
                  {subscriptionDetails.admin_seats || 1}
                </p>
                <p className="text-blue-700 text-sm">
                  ${(subscriptionDetails.admin_seats || 1) * 49}/month
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800">Employee Seats</h3>
                <p className="text-2xl font-bold text-blue-900">
                  {subscriptionDetails.employee_seats || 0}
                </p>
                <p className="text-blue-700 text-sm">
                  ${(subscriptionDetails.employee_seats || 0) * 10}/month
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800">Total Monthly Cost</h3>
                <p className="text-2xl font-bold text-blue-900">
                  ${((subscriptionDetails.admin_seats || 1) * 49) + ((subscriptionDetails.employee_seats || 0) * 10)}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-2 bg-white"
                  onClick={handleManageSubscription}
                >
                  Manage Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SubscriptionDetails;
