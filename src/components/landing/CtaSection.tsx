
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary-foreground">
              Ready to Transform Your Finishing Department?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-[600px]">
              Join thousands of finishing professionals who use Finivi to streamline operations, reduce waste, and improve efficiency.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 rounded-full">
                <Link to="/auth/signup">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://placehold.co/800x500/fff5e9/f97316?text=Finivi+Dashboard+Preview" 
              alt="Finivi Dashboard Preview" 
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
