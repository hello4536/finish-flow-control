import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, ArrowRight, Zap, Award } from "lucide-react";

interface StrategicCTABannerProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: string;
  secondaryCTA?: string;
  urgency?: string;
  socialProof?: {
    userCount: number;
    rating: number;
    testimonial?: string;
  };
  type?: "newsletter" | "course" | "consultation" | "download";
}

const StrategicCTABanner: React.FC<StrategicCTABannerProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  urgency,
  socialProof,
  type = "newsletter"
}) => {
  const getThemeColors = () => {
    switch (type) {
      case "course":
        return {
          bg: "bg-gradient-to-r from-purple-600 to-blue-600",
          badge: "bg-purple-100 text-purple-800",
          icon: Award
        };
      case "consultation":
        return {
          bg: "bg-gradient-to-r from-green-600 to-teal-600", 
          badge: "bg-green-100 text-green-800",
          icon: Users
        };
      case "download":
        return {
          bg: "bg-gradient-to-r from-orange-600 to-red-600",
          badge: "bg-orange-100 text-orange-800", 
          icon: Zap
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-600 to-purple-600",
          badge: "bg-blue-100 text-blue-800",
          icon: Star
        };
    }
  };

  const theme = getThemeColors();
  const IconComponent = theme.icon;

  return (
    <Card className="relative overflow-hidden border-2 border-blue-200 shadow-xl">
      <div className={`absolute inset-0 ${theme.bg} opacity-95`}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      
      <CardContent className="relative z-10 p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center space-x-2 mb-4">
              <IconComponent className="w-5 h-5 text-white" />
              <Badge className={`${theme.badge} font-medium`}>
                {subtitle}
              </Badge>
              {urgency && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 animate-pulse">
                  {urgency}
                </Badge>
              )}
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              {title}
            </h3>
            
            <p className="text-blue-100 text-lg mb-4 max-w-2xl">
              {description}
            </p>

            {socialProof && (
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-blue-100 text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {socialProof.userCount.toLocaleString()}+ professionals
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {socialProof.rating} rating
                  </div>
                </div>
                {socialProof.testimonial && (
                  <div className="italic">
                    "{socialProof.testimonial}"
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 shadow-lg"
            >
              {primaryCTA}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            {secondaryCTA && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3"
              >
                {secondaryCTA}
              </Button>
            )}
          </div>
        </div>

        {/* Progress indicator for urgency */}
        {urgency && (
          <div className="mt-6 bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="bg-yellow-400 h-full w-3/4 rounded-full animate-pulse"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StrategicCTABanner;