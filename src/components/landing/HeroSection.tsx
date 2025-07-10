import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge with ROI focus */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 text-green-800 text-sm font-semibold shadow-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Reduces material waste by 40% • 1000+ finishing shops trust Finivo
          </div>
          
          {/* Pain-point focused headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-gray-900 mb-3">Stop losing money on</span>
            <span className="block bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent my-0 py-[10px]">finishing delays & waste</span>
          </h1>
          
          {/* Value-driven subtitle */}
          <p className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">Meet every deadline, eliminate material waste, and stay compliant</span> with the only finishing management system built specifically for{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              automotive, woodworking, and manufacturing shops.
            </span>
          </p>
          
          {/* Key benefits bar */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              40% less material waste
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Automated compliance tracking
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Real-time job visibility
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Mobile-first design
            </div>
          </div>
          
          {/* CTA buttons with urgency */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 rounded-full px-10 py-4 text-lg font-semibold group hover:scale-105">
              <Link to="/auth/signup" className="flex items-center">
                Start Free Trial • Save $1000s
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-2 border-gray-400 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full px-8 py-4 text-lg group transition-all duration-200 font-semibold">
              <Link to="/features" className="flex items-center">
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                See Live Demo
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators with guarantee */}
          <div className="pt-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/30">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                14-day free trial
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                No credit card required
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                30-day money-back guarantee
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Free migration assistance
              </div>
            </div>
          </div>
          
          {/* Social proof with real results */}
          <div className="pt-8">
            <p className="text-sm text-gray-600 mb-6 font-medium">Trusted by 1000+ finishing shops including:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center opacity-70">
              <div className="text-center">
                <div className="h-12 w-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  AutoBody Pro
                </div>
                <p className="text-xs text-gray-500 mt-1">40% faster turnaround</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-full bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  WoodCraft Elite
                </div>
                <p className="text-xs text-gray-500 mt-1">$50K saved annually</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  Metal Masters
                </div>
                <p className="text-xs text-gray-500 mt-1">Zero compliance issues</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-full bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  Precision Finish
                </div>
                <p className="text-xs text-gray-500 mt-1">30% material savings</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero image/mockup */}
        <div className="relative mt-16 max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl transform rotate-1"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <img src="/lovable-uploads/8e9a6ded-9406-4eeb-8af1-b1e83ca9e786.png" alt="Finivo Dashboard" className="w-full h-auto" />
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 animate-bounce"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl rotate-45 animate-bounce delay-300"></div>
        </div>
      </div>
    </section>;
};
export default HeroSection;