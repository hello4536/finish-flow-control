
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-80 rounded-3xl blur-3xl"></div>
        </div>
        <div className="flex flex-col items-center gap-6 text-center max-w-[800px] mx-auto">
          <Badge className="rounded-full px-4 py-1 text-sm bg-primary/10 text-primary border-none">
            Streamline Your Finishing Operations
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Manage Your Finishing Department <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
            Comprehensive tools for workflows, materials, inventory, compliance, and more — all in one platform designed for finishing professionals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Button asChild size="lg" className="h-12 px-6 rounded-full">
              <Link to="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 rounded-full">
              <Link to="#features">
                See Features
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-xl"></div>
          <div className="bg-background border rounded-xl shadow-xl overflow-hidden">
            <div className="h-8 bg-muted flex items-center px-4 border-b">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="p-4">
              <img 
                src="https://placehold.co/1200x600/f5f7ff/a4aedb?text=Finivi+Dashboard+Preview" 
                alt="Finivi Dashboard" 
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
