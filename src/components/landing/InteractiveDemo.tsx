import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight, CheckCircle2, Clock, DollarSign, Shield, TrendingUp, AlertTriangle, Users } from "lucide-react";

const InteractiveDemo = () => {
  const [activeDemo, setActiveDemo] = useState<'inventory' | 'compliance' | 'scheduling' | 'analytics' | null>(null);
  const [animatedValues, setAnimatedValues] = useState({
    inventory: 85,
    lowStock: 15,
    savings: 12500,
    efficiency: 87
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev => ({
        inventory: Math.max(80, Math.min(95, prev.inventory + (Math.random() - 0.5) * 2)),
        lowStock: Math.max(10, Math.min(25, prev.lowStock + (Math.random() - 0.5) * 3)),
        savings: Math.max(10000, Math.min(15000, prev.savings + (Math.random() - 0.5) * 500)),
        efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
    },
    {
      id: 'analytics' as const,
      title: 'Real-time Analytics',
      description: 'Live performance dashboard',
      icon: <TrendingUp className="h-6 w-6" />,
      benefit: 'Data-driven decisions',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getDemoContent = (demo: string) => {
    switch (demo) {
      case 'inventory':
        return (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Clear Coat - Premium</span>
                <span className="text-green-600 font-bold">In Stock: {Math.round(animatedValues.inventory)}%</span>
              </div>
              <div className="bg-green-200 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000" 
                  style={{ width: `${animatedValues.inventory}%` }}
                ></div>
              </div>
              <p className="text-sm text-green-700 mt-2 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Auto-reorder triggered at 20%
              </p>
              <div className="mt-3 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block">
                💰 Cost per gallon: $45.99 • Last order: 5 days ago
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 transition-all duration-300 hover:shadow-md animate-pulse">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Primer - Base White</span>
                <span className="text-red-600 font-bold">Low: {Math.round(animatedValues.lowStock)}%</span>
              </div>
              <div className="bg-red-200 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-1000" 
                  style={{ width: `${animatedValues.lowStock}%` }}
                ></div>
              </div>
              <p className="text-sm text-red-700 mt-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Order immediately - 2 days remaining
              </p>
              <div className="mt-3">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                  Auto-Order Now
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-900">Monthly Savings</span>
                <span className="text-blue-600 font-bold text-lg">${animatedValues.savings.toLocaleString()}</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">From waste reduction & smart ordering</p>
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
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-purple-900">Booth A - Job #2024-156</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">In Progress</span>
              </div>
              <div className="bg-purple-200 h-2 rounded-full mb-2">
                <div className="bg-purple-600 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-sm text-purple-700">
                <span>Est. Complete: 2:30 PM</span>
                <span>75% Done</span>
              </div>
              <div className="mt-2 text-xs text-purple-600">
                👤 Mike Johnson • 🎨 Metallic Silver • 🚗 2023 Honda Civic
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-blue-900">Booth B - Job #2024-157</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full animate-pulse">Queued</span>
              </div>
              <div className="text-sm text-blue-700 mb-2">Start: 2:45 PM (Auto-optimized)</div>
              <div className="text-xs text-blue-600">
                👤 Sarah Wilson • 🎨 Candy Apple Red • 🚗 2022 Ford F-150
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-green-900">Today's Efficiency</span>
                <span className="text-green-600 font-bold">{Math.round(animatedValues.efficiency)}%</span>
              </div>
              <p className="text-xs text-green-700 mt-1">+12% vs last week • AI optimization active</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-900">{Math.round(animatedValues.efficiency)}%</div>
                <div className="text-xs text-blue-700">Shop Efficiency</div>
                <div className="flex items-center text-xs text-blue-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% this week
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-900">${(animatedValues.savings/1000).toFixed(1)}K</div>
                <div className="text-xs text-green-700">Monthly Savings</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% vs goal
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-orange-900">Active Jobs</span>
                <span className="text-orange-600 font-bold">7</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-bold text-purple-600">3</div>
                  <div className="text-purple-700">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">2</div>
                  <div className="text-blue-700">Queued</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">2</div>
                  <div className="text-green-700">Drying</div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
              <div className="flex items-center text-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="font-medium text-sm">2 compliance alerts require attention</span>
              </div>
              <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700 text-white text-xs">
                View Alerts
              </Button>
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