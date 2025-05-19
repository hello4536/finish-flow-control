
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Feature {
  text: string;
  included: boolean;
}

interface PlanCardProps {
  title: string;
  price: number;
  description: string;
  features: Feature[];
  isActive?: boolean;
  onSubscribe?: () => void;
  onManage?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  description,
  features,
  isActive = false,
  onSubscribe,
  onManage,
}) => {
  return (
    <Card className={`w-full max-w-md ${isActive ? "border-2 border-green-500 relative" : ""}`}>
      {isActive && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-bl">
          Current Plan
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check 
                className={`mr-2 h-5 w-5 shrink-0 ${feature.included ? "text-green-500" : "text-gray-300"}`} 
              />
              <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button className="w-full" onClick={onManage}>
            Manage Subscription
          </Button>
        ) : (
          <Button className="w-full" onClick={onSubscribe}>
            Subscribe
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
