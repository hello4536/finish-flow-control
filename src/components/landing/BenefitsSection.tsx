
import React from "react";
import { CheckCircle2 } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Transforming Finishing Operations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
            See how Finivi brings efficiency, organization, and control to finishing departments.
          </p>
        </div>
        
        <div className="grid gap-y-16 lg:gap-x-8 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-8">
            {/* Benefit 1 */}
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Increased Efficiency</h3>
                <p className="text-muted-foreground">
                  Streamlined workflows and automation help your team work smarter, reducing time spent on administrative tasks by up to 40%.
                </p>
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Better Compliance</h3>
                <p className="text-muted-foreground">
                  Stay on top of regulatory requirements with built-in compliance tools that help avoid costly penalties and ensure workplace safety.
                </p>
              </div>
            </div>
            
            {/* Benefit 3 */}
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Reduced Waste</h3>
                <p className="text-muted-foreground">
                  Track material usage precisely to minimize waste and optimize inventory levels, cutting material costs significantly.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-8">
            {/* Benefit 4 */}
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Team Coordination</h3>
                <p className="text-muted-foreground">
                  Enhance communication and collaboration between team members with task assignments and progress tracking.
                </p>
              </div>
            </div>
            
            {/* Benefit 5 */}
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Time-Saving Workflows</h3>
                <p className="text-muted-foreground">
                  Predefined workflows and templates save time on repetitive tasks and ensure consistency across projects.
                </p>
              </div>
            </div>
            
            {/* Benefit 6 */}
            <div className="flex gap-4">
              <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Data-Driven Decisions</h3>
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
