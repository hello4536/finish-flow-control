
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 text-center max-w-[800px] mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary-foreground">
            Ready to Transform Your Finishing Department?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-[600px]">
            Join thousands of finishing professionals who use Finivi to streamline operations, reduce waste, and improve efficiency.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 rounded-full">
            <Link to="/auth/signup">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm text-primary-foreground/60">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
