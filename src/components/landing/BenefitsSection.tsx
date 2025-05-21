
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
    <section id="benefits" className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-16 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-900">
              Why choose Finivi?
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Transform how your finishing department operates
            </h2>
            <p className="text-gray-600 text-lg">
              Finivi brings all your finishing operations together in one place, helping you reduce costs, 
              improve quality, and ensure compliance.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button asChild size="lg" className="rounded-md">
                <Link to="/auth/signup">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl border overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 opacity-80"></div>
              <img 
                src="/lovable-uploads/da2f6cea-e4ce-4d08-9394-e1c66233938b.png" 
                alt="Finivi dashboard preview" 
                className="relative z-10 w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-orange-100 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-100 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
