import React from "react";
import { CheckCircle2, ArrowRight, Zap, Shield, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const BenefitsSection = () => {
  const benefits = [{
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    title: "Complete finishing department management",
    description: "Streamline every aspect of your operations"
  }, {
    icon: <Shield className="h-6 w-6 text-green-600" />,
    title: "Formula tracking and version history",
    description: "Never lose a perfect formula again"
  }, {
    icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
    title: "Material inventory optimization",
    description: "Reduce waste and optimize stock levels"
  }, {
    icon: <Users className="h-6 w-6 text-purple-600" />,
    title: "Team coordination and task assignment",
    description: "Keep everyone aligned and productive"
  }];
  return;
};
export default BenefitsSection;