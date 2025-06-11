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
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Trusted by 1000+ finishing professionals
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-gray-900 mb-2">Your command center</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">for perfect finishes</span>
          </h1>
          
          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Make smart finishing decisions, align your team, and tell a compelling product story with{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Finivo
            </span>
            . The end-to-end finishing management platform with best practices built-in.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-8 py-3 text-lg group">
              <Link to="/auth/signup" className="flex items-center">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full px-8 py-3 text-lg group transition-all duration-200">
              <Link to="/auth/signin" className="flex items-center">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch demo
              </Link>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-4">Trusted by teams at</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
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