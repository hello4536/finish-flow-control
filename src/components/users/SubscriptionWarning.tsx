
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SubscriptionWarningProps {
  show: boolean;
}

const SubscriptionWarning: React.FC<SubscriptionWarningProps> = ({ show }) => {
  const navigate = useNavigate();
  
  if (!show) return null;
  
  return (
    <Card className="bg-amber-50 border-amber-200 mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start flex-col md:flex-row">
          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="mt-3 md:mt-0 flex-1">
            <h4 className="text-sm font-medium text-amber-800">Subscription Required</h4>
            <p className="text-amber-700 text-sm mb-3">
              Please activate your subscription to add team members.
              Admin account costs $49/month, and each employee account costs $10/month.
            </p>
            <Button 
              variant="secondary"
              className="bg-amber-200 text-amber-900 hover:bg-amber-300 border-amber-300"
              onClick={() => navigate('/subscription')}
              size="sm"
            >
              Activate Subscription
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionWarning;
