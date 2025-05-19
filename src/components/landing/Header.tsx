
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">F</span>
          </div>
          <div className="text-xl font-bold">Finivi</div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
            Benefits
          </Link>
          <Link to="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/auth/signin" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
            Sign In
          </Link>
          <Button asChild size="sm" className="h-9">
            <Link to="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
