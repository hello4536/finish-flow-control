import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Star, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadMagnetCTAProps {
  title: string;
  description: string;
  downloadCount: number;
  rating: number;
  estimatedTime: string;
  type?: "guide" | "checklist" | "template" | "calculator";
  premium?: boolean;
}

const LeadMagnetCTA: React.FC<LeadMagnetCTAProps> = ({
  title,
  description,
  downloadCount,
  rating,
  estimatedTime,
  type = "guide",
  premium = false
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
      title: "Download Started!",
      description: "Check your email for the download link.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  const getTypeIcon = () => {
    switch (type) {
      case "guide": return <FileText className="w-5 h-5 text-blue-500" />;
      case "checklist": return <Users className="w-5 h-5 text-green-500" />;
      case "template": return <Download className="w-5 h-5 text-purple-500" />;
      case "calculator": return <Star className="w-5 h-5 text-orange-500" />;
      default: return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getTypeIcon()}
            <Badge variant={premium ? "default" : "secondary"}>
              {premium ? "Premium" : "Free"} {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <CardTitle className="text-xl text-gray-900">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Download className="w-4 h-4 mr-1" />
              {downloadCount.toLocaleString()} downloads
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {estimatedTime}
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email for instant download"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-gray-200 focus:border-blue-500"
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Download ${premium ? "Premium " : ""}${type.charAt(0).toUpperCase() + type.slice(1)}`}
            <Download className="w-4 h-4 ml-2" />
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          {premium ? "Premium content includes bonus materials and expert insights." : "100% free. No spam. Unsubscribe anytime."}
        </p>
      </CardContent>
    </Card>
  );
};

export default LeadMagnetCTA;