
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, PackageOpen, Shield, Sparkles } from "lucide-react";

const FeaturesPreviewSection = () => {
  const previewFeatures = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Job Management",
      description: "Track and manage all your finishing projects in one place with real-time updates and team coordination.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <PackageOpen className="h-8 w-8" />,
      title: "Inventory Tracking", 
      description: "Monitor stock levels, track usage, and optimize your material inventory with automated alerts.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Compliance Management",
      description: "Stay compliant with industry regulations and safety standards with automated tracking and reporting.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Quality Control",
      description: "Maintain high standards with comprehensive quality management tools and inspection workflows.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Key Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Everything you need for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              finishing excellence
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Streamline your finishing operations with our comprehensive suite of tools designed by industry experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {previewFeatures.map((feature, index) => (
            <div key={index} className="group relative p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group px-8 py-3 text-lg"
          >
            <Link to="/features" className="flex items-center">
              View All Features
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreviewSection;
