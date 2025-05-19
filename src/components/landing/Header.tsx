
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DevModeToggle from "./DevModeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-primary/10">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-xl font-bold text-accent-foreground">F</span>
          </div>
          <div className="text-xl font-bold text-primary">Finivi</div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="#features" className="text-sm font-medium text-primary/80 hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="#benefits" className="text-sm font-medium text-primary/80 hover:text-primary transition-colors">
            Benefits
          </Link>
          <Link to="#pricing" className="text-sm font-medium text-primary/80 hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <DevModeToggle />
          <Link to="/auth/signin" className="text-sm font-medium text-primary/80 hover:text-primary transition-colors hidden sm:block">
            Sign In
          </Link>
          <Button asChild size="sm" className="h-9 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
