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
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Finishing Operations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your processes, reduce waste, and improve quality with our comprehensive management system
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/auth">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default BenefitsSection;