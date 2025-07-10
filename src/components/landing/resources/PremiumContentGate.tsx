import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lock, Crown, Star, CheckCircle, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PremiumContentGateProps {
  title: string;
  description: string;
  previewContent: string;
  benefits: string[];
  memberCount: number;
  estimatedTime: string;
  contentType: "masterclass" | "workshop" | "course" | "toolkit";
  price?: number;
  originalPrice?: number;
}

const PremiumContentGate: React.FC<PremiumContentGateProps> = ({
  title,
  description,
  previewContent,
  benefits,
  memberCount,
  estimatedTime,
  contentType,
  price = 0,
  originalPrice
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Access Granted!",
      description: "Check your email for premium content access.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  const getContentTypeIcon = () => {
    switch (contentType) {
      case "masterclass": return <Crown className="w-5 h-5 text-yellow-500" />;
      case "workshop": return <Users className="w-5 h-5 text-blue-500" />;
      case "course": return <Star className="w-5 h-5 text-purple-500" />;
      case "toolkit": return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 border-2 border-amber-200 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getContentTypeIcon()}
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
              Premium {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
            </Badge>
          </div>
          <Lock className="w-5 h-5 text-amber-600" />
        </div>
        <CardTitle className="text-xl text-gray-900">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-700">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Preview Content */}
        <div className="bg-white/80 border border-amber-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Preview:</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{previewContent}</p>
          <div className="mt-3 text-center">
            <div className="inline-flex items-center space-x-2 text-amber-600 font-medium">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Unlock full content below</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-3">What you'll get:</h4>
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4 bg-white/60 rounded-lg p-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {memberCount.toLocaleString()} members
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {estimatedTime}
          </div>
        </div>

        {/* Pricing */}
        {price > 0 && (
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">${price}</span>
              {originalPrice && (
                <span className="text-lg text-gray-500 line-through">${originalPrice}</span>
              )}
            </div>
            {originalPrice && (
              <p className="text-sm text-green-600 font-medium">
                Save ${originalPrice - price}!
              </p>
            )}
          </div>
        )}

        {/* Access Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email to unlock premium content"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-amber-200 focus:border-amber-500"
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : 
             price > 0 ? `Get Premium Access - $${price}` : "Get Free Premium Access"
            }
            <Crown className="w-4 h-4 ml-2" />
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          Join thousands of professionals advancing their finishing skills
        </p>
      </CardContent>
    </Card>
  );
};

export default PremiumContentGate;