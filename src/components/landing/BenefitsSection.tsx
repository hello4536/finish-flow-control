
import React from "react";
import { CheckCircle2 } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Transforming Finishing Operations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
            See how Finivi brings efficiency, organization, and control to finishing departments.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="lg:w-1/2">
            <img 
              src="https://placehold.co/800x600/e9f0ff/0a2168?text=Efficiency+Dashboard" 
              alt="Efficiency Dashboard" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            {/* Benefit 1 */}
            <div className="flex gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">Increased Efficiency</h3>
                <p className="text-muted-foreground">
                  Streamlined workflows and automation help your team work smarter, reducing time spent on administrative tasks by up to 40%.
                </p>
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">Better Compliance</h3>
                <p className="text-muted-foreground">
                  Stay on top of regulatory requirements with built-in compliance tools that help avoid costly penalties and ensure workplace safety.
                </p>
              </div>
            </div>
            
            {/* Benefit 3 */}
            <div className="flex gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">Reduced Waste</h3>
                <p className="text-muted-foreground">
                  Track material usage precisely to minimize waste and optimize inventory levels, cutting material costs significantly.
                </p>
              </div>
            </div>
            
            {/* Benefit 4 */}
            <div className="flex gap-4 p-4 rounded-lg hover:bg-white/50 transition-colors">
              <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">Data-Driven Decisions</h3>
                <p className="text-muted-foreground">
                  Comprehensive reporting and analytics help you identify bottlenecks, optimize processes, and make informed business decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
