
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-16 md:pt-24 md:pb-20 overflow-hidden relative bg-white">
      <div className="container px-4 md:px-6 relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-1/3 top-0 h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="absolute left-1/2 bottom-0 h-[250px] w-[250px] rounded-full bg-yellow-100/50 blur-3xl"></div>
          <div className="absolute left-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-blue-100/30 blur-3xl"></div>
        </div>
        
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Build great products with confidence
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-[700px] mx-auto leading-relaxed">
            Make smart finishing decisions, align your team, and tell a compelling product story with Finivi. 
            The end-to-end finishing management platform with best practices built-in.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Button asChild size="lg" className="h-12 px-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
              <Link to="/auth/signup">
                Try for free
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full border-blue-500 text-blue-500 hover:bg-blue-50">
              <Link to="/auth/signin">
                Book a demo
              </Link>
            </Button>
          </div>
          
          {/* App Screenshot */}
          <div className="relative mx-auto max-w-5xl mt-12">
            <div className="rounded-xl border shadow-xl overflow-hidden">
              <img 
                src="/lovable-uploads/8e9a6ded-9406-4eeb-8af1-b1e83ca9e786.png" 
                alt="Finivi Dashboard" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full bg-yellow-400/10 hidden md:block"></div>
            <div className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-blue-500/10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
