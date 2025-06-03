
import React from "react";
import { ArrowRight, CheckCircle, Users, Zap } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Set Up Your Team",
      description: "Invite your team members and configure your finishing operations in minutes.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Streamline Workflows",
      description: "Create automated workflows for your finishing processes and quality control.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Track & Optimize",
      description: "Monitor progress, track compliance, and continuously improve your operations.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            How It Works
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Get started in</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              three simple steps
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your finishing operations with our intuitive platform designed for immediate impact
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white mx-auto mb-6 mt-4`}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
