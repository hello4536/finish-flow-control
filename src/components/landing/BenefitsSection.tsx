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
  return <section id="benefits" className="bg-white py-[66px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-teal-100 border border-green-200/50 text-green-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Proven Results
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-gray-900">Outline your</span>
                <br />
                <span className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  vision
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Document and share your finishing vision with your team. Create comprehensive plans for your department's operations with industry-leading tools.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200 border border-gray-100">
                    {benefit.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>)}
            </div>
            
            <div className="pt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group">
                <Link to="/auth/signup" className="flex items-center">
                  Get started for free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-2xl blur-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white">
              <img src="/lovable-uploads/da2f6cea-e4ce-4d08-9394-e1c66233938b.png" alt="Finivo dashboard preview" className="w-full h-auto" />
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl rotate-45 animate-bounce"></div>
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </section>;
};
export default BenefitsSection;