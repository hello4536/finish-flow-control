
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 overflow-hidden relative">
      <div className="container px-4 md:px-6 relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-blue-100/80 blur-3xl"></div>
          <div className="absolute left-1/3 bottom-0 h-[250px] w-[250px] rounded-full bg-orange-100/60 blur-3xl"></div>
        </div>
        
        <div className="max-w-[800px] mx-auto text-center">
          <Badge className="mb-4 inline-block rounded-full px-4 py-1 text-sm bg-blue-100 text-blue-900 border-none">
            The Ultimate Finishing Management Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Make your finishing department{" "}
            <span className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 bg-clip-text text-transparent">
              more efficient
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-[700px] mx-auto">
            Track formulas, jobs, and materials in one clean dashboard with supporting tools 
            for custom workflows, compliance and more. Built by finishers, for finishers.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Button asChild size="lg" className="h-12 px-6 rounded-md bg-blue-900 hover:bg-blue-800 text-white">
              <Link to="/auth/signup">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 rounded-md">
              <Link to="#features">
                See all features
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* App Screenshot */}
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-xl border shadow-2xl overflow-hidden">
              <img 
                src="/lovable-uploads/8e9a6ded-9406-4eeb-8af1-b1e83ca9e786.png" 
                alt="Finivi Dashboard" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-orange-500/10 hidden md:block"></div>
            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-blue-500/10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
