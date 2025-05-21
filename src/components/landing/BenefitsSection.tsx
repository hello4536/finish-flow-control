
import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const benefits = [
    "Complete finishing department management",
    "Formula tracking and version history",
    "Material inventory optimization",
    "Regulatory compliance tracking",
    "Team coordination and task assignment",
    "Quality control documentation"
  ];

  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-gray-900">
              Outline your vision
            </h2>
            <p className="text-gray-600 text-lg">
              Document and share your finishing vision with your team. 
              Create comprehensive plans for your department's operations.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full bg-blue-500 hover:bg-blue-600">
                <Link to="/auth/signup">
                  Get started for free
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <img 
                src="/lovable-uploads/da2f6cea-e4ce-4d08-9394-e1c66233938b.png" 
                alt="Finivi dashboard preview" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-100/50 -z-10"></div>
            <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-yellow-100/50 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
