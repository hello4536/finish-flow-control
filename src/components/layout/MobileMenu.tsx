
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const MobileMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/#features">Features</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/woodworking-finishing">Woodworking Finishing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/auto-body-finishing">Auto Body Finishing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/#pricing">Pricing</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
