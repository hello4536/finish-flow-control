
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  isAdmin: boolean;
  isInactive: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ isAdmin, isInactive }) => {
  if (!isAdmin || !isInactive) return null;
  
  return (
    <Button size="sm" variant="default" className="mr-2" asChild>
      <Link to="/subscription">Activate Subscription</Link>
    </Button>
  );
};

export default SubscriptionButton;
