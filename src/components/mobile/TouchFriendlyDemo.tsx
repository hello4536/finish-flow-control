import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, DollarSign, Shield, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

const TouchFriendlyDemo = () => {
  const isMobile = useIsMobile();
  const [activeFeature, setActiveFeature] = useState(0);

  if (!isMobile) return null;

  const features = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Material Tracking",
      benefit: "Save $1000s monthly",
      color: "from-green-500 to-emerald-600",
      demo: (
        <div className="space-y-3">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm">Clear Coat - Premium</span>
              <span className="text-green-600 font-bold text-sm">85% Stock</span>
            </div>
            <div className="bg-green-200 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm">Primer - Base White</span>
              <span className="text-red-600 font-bold text-sm">15% Low</span>
            </div>
            <div className="bg-red-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full w-[15%]"></div>
            </div>
            <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs w-full">
              Auto-Order Now
            </Button>
          </div>
        </div>
      )
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Compliance",
      benefit: "Zero violations",
      color: "from-blue-500 to-blue-600",
      demo: (
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-1 text-sm">EPA VOC Report</h4>
            <div className="flex items-center text-blue-700">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              <span className="text-xs">Auto-generated & submitted</span>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-1 text-sm">Safety Data Sheets</h4>
            <div className="flex items-center text-green-700">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              <span className="text-xs">All current & updated</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Smart Scheduling",
      benefit: "40% faster jobs",
      color: "from-purple-500 to-purple-600",
      demo: (
        <div className="space-y-3">
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-purple-900 text-sm">Booth A - Job #156</span>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">75% Done</span>
            </div>
            <div className="bg-purple-200 h-2 rounded-full">
              <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
            </div>
            <div className="text-xs text-purple-600 mt-1">Est. Complete: 2:30 PM</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-blue-900 text-sm">Booth B - Job #157</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Queued</span>
            </div>
            <div className="text-xs text-blue-600 mt-1">Auto-start: 2:45 PM</div>
          </div>
        </div>
      )
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Analytics",
      benefit: "Data-driven decisions",
      color: "from-orange-500 to-red-600",
      demo: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-900">87%</div>
              <div className="text-xs text-blue-700">Efficiency</div>
            </div>
            <div className="bg-green-50 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-green-900">$12.5K</div>
              <div className="text-xs text-green-700">Savings</div>
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-orange-900 text-sm">Active Jobs</span>
              <span className="text-orange-600 font-bold">7</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-xs text-center">
              <div>
                <div className="font-bold text-purple-600">3</div>
                <div className="text-purple-700">Progress</div>
              </div>
              <div>
                <div className="font-bold text-blue-600">2</div>
                <div className="text-blue-700">Queued</div>
              </div>
              <div>
                <div className="font-bold text-green-600">2</div>
                <div className="text-green-700">Drying</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-gray-900">See Finivo in action:</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Tap to explore features
            </span>
          </h2>
          <p className="text-sm text-gray-600">
            Experience how Finivo transforms finishing operations
          </p>
        </div>

        {/* Touch-friendly feature tabs */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left touch-target ${
                activeFeature === index
                  ? 'border-blue-300 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-2`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block">
                {feature.benefit}
              </p>
            </button>
          ))}
        </div>

        {/* Demo content */}
        <Card className="border-2 border-gray-200 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {features[activeFeature].title}
              </h3>
              <p className="text-sm text-gray-600">Live Demo Preview</p>
            </div>
            
            {features[activeFeature].demo}
          </CardContent>
        </Card>

        {/* CTA */}
        <Button
          asChild
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold h-12"
        >
          <a href="/auth/signup" className="flex items-center justify-center">
            Try Full Demo Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default TouchFriendlyDemo;