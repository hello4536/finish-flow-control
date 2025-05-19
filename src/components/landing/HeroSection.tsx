import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return <section className="py-20 md:py-28 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-80 rounded-3xl blur-3xl"></div>
        </div>
        <div className="flex flex-col items-center gap-6 text-center max-w-[800px] mx-auto">
          <Badge className="rounded-full px-4 py-1 text-sm bg-accent text-accent-foreground border-none">
            Streamline Your Finishing Operations
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            The Ultimate Finishing <span className="text-primary">Command Center</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
            Comprehensive tools for workflows, materials, inventory, compliance, and more — all in one platform designed for finishing professionals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Button asChild size="lg" className="h-12 px-6 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/auth/signup">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 rounded-full border-primary text-primary hover:bg-primary/10">
              <Link to="#features">
                See Features
              </Link>
            </Button>
          </div>
        </div>
        
        {/* App Screenshot Showcase */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-xl"></div>
          <div className="bg-background border rounded-xl shadow-xl overflow-hidden">
            <div className="h-8 bg-primary flex items-center px-4 border-b">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="p-4">
              <img alt="Finivi Dashboard" className="rounded-lg w-full shadow-md hover:shadow-lg transition-all" src="/lovable-uploads/8e9a6ded-9406-4eeb-8af1-b1e83ca9e786.png" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
