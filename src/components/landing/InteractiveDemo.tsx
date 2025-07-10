import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight, CheckCircle2, Clock, DollarSign, Shield } from "lucide-react";

const InteractiveDemo = () => {
  const [activeDemo, setActiveDemo] = useState<'inventory' | 'compliance' | 'scheduling' | null>(null);

  const demoFeatures = [
    {
      id: 'inventory' as const,
      title: 'Material Tracking',
      description: 'Real-time inventory with waste reduction',
      icon: <DollarSign className="h-6 w-6" />,
      benefit: 'Save $1000s monthly',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'compliance' as const,
      title: 'Compliance Automation',
      description: 'Automated regulatory reporting',
      icon: <Shield className="h-6 w-6" />,
      benefit: 'Zero violations',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'scheduling' as const,
      title: 'Smart Scheduling',
      description: 'Optimize booth utilization',
      icon: <Clock className="h-6 w-6" />,
      benefit: '40% faster jobs',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getDemoContent = (demo: string) => {
    switch (demo) {
      case 'inventory':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Clear Coat - Premium</span>
                <span className="text-green-600 font-bold">In Stock: 85%</span>
              </div>
              <div className="bg-green-200 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
              </div>
              <p className="text-sm text-green-700 mt-2">Auto-reorder triggered at 20%</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Primer - Base White</span>
                <span className="text-red-600 font-bold">Low: 15%</span>
              </div>
              <div className="bg-red-200 h-2 rounded-full">
                <div className="bg-red-500 h-2 rounded-full w-1/6"></div>
              </div>
              <p className="text-sm text-red-700 mt-2">⚠️ Order immediately - 2 days remaining</p>
            </div>
          </div>
        );
      case 'compliance':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">EPA VOC Report - Q4 2024</h4>
              <div className="flex items-center text-blue-700">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <span className="text-sm">Auto-generated and submitted</span>
              </div>
              <div className="mt-2 text-xs text-blue-600">Next report: Jan 15, 2025</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Safety Data Sheets</h4>
              <div className="flex items-center text-green-700">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <span className="text-sm">All current - Auto-updated when materials change</span>
              </div>
            </div>
          </div>
        );
      case 'scheduling':
        return (
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-purple-900">Booth A - Job #2024-156</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">In Progress</span>
              </div>
              <div className="text-sm text-purple-700 mt-1">Est. Complete: 2:30 PM</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-900">Booth B - Job #2024-157</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Queued</span>
              </div>
              <div className="text-sm text-blue-700 mt-1">Start: 2:45 PM (Auto-optimized)</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
            <Play className="w-4 h-4 mr-2" />
            Interactive Product Demo
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">See Finivo in action:</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              Click to explore features
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience how Finivo transforms finishing operations with real-time tracking, 
            automated compliance, and intelligent scheduling.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {demoFeatures.map((feature) => (
              <Card
                key={feature.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  activeDemo === feature.id
                    ? 'border-blue-300 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setActiveDemo(activeDemo === feature.id ? null : feature.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{feature.description}</p>
                        <span className="inline-flex items-center text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          {feature.benefit}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className={`h-5 w-5 text-gray-400 transition-transform ${
                      activeDemo === feature.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:sticky lg:top-8">
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Demo Preview</h3>
                  <p className="text-gray-600 text-sm">Click a feature on the left to see it in action</p>
                </div>
                
                {activeDemo ? (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {demoFeatures.find(f => f.id === activeDemo)?.title}
                      </h4>
                    </div>
                    {getDemoContent(activeDemo)}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Select a feature to see the interactive demo</p>
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full">
                    <a href="/auth/signup" className="flex items-center justify-center">
                      Try Full Demo Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;