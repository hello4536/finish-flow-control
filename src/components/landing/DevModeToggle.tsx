
import React from "react";
import { Button } from "@/components/ui/button";
import { useDevMode } from "@/context/DevModeContext";
import { Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Hidden in production mode
const DevModeToggle = () => {
  // Return null to hide the component in production
  return null;
};

export default DevModeToggle;
