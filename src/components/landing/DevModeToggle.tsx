
import React from "react";
import { Button } from "@/components/ui/button";
import { useDevMode } from "@/context/DevModeContext";
import { Shield, Database } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DevModeToggle = () => {
  const { isDevMode, toggleDevMode, seedDemoData } = useDevMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-orange-500 border-orange-500">
          <Shield size={16} />
          {isDevMode ? "Dev Mode: ON" : "Dev Mode"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Developer Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleDevMode}>
          {isDevMode ? "Disable Developer Mode" : "Enable Developer Mode"}
        </DropdownMenuItem>
        {isDevMode && (
          <DropdownMenuItem onClick={seedDemoData}>
            <Database className="mr-2 h-4 w-4" />
            Populate With Demo Data
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DevModeToggle;
