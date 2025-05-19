
import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Getting Started Is Easy
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
            Three simple steps to transform your finishing department operations.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-card rounded-xl border p-6 shadow-sm h-full">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account with a simple registration process. Choose your plan and set up your organization profile.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative">
            <div className="bg-card rounded-xl border p-6 shadow-sm h-full">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">Set Up Your Team</h3>
              <p className="text-muted-foreground">
                Invite team members, assign roles, and customize permissions to match your organizational structure.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative">
            <div className="bg-card rounded-xl border p-6 shadow-sm h-full">
              <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">Manage Operations</h3>
              <p className="text-muted-foreground">
                Start using Finivi to track materials, manage workflows, ensure compliance, and streamline your finishing operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
