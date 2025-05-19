
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SubscriptionWarningProps {
  show: boolean;
}

const SubscriptionWarning: React.FC<SubscriptionWarningProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardContent className="pt-6">
        <div className="flex items-center">
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-amber-800">Subscription Required</h4>
            <p className="text-sm text-amber-700">
              Please <a href="/subscription" className="underline">activate your subscription</a> to add team members.
              Admin account costs $49/month, and each employee account costs $10/month.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionWarning;
