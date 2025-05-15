import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Settings, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Header: React.FC = () => {
  return <header className="flex h-16 items-center border-b px-4 py-0 my-0 bg-slate-50">
      <SidebarTrigger className="mr-4 text-primary" />
      
      <div className="flex items-center space-x-4 lg:space-x-6">
        <h1 className="hidden text-xl font-bold md:block">Finish<span className="text-accent">Flow</span></h1>
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px] pl-8" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-primary" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Low Stock Alert</div>
                <div className="text-sm text-muted-foreground">Sherwin-Williams Wood Stain (Dark Walnut) is below minimum threshold</div>
                <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Job Completed</div>
                <div className="text-sm text-muted-foreground">Custom Dining Table - Sand & Stain job has been completed</div>
                <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3">
                <div className="font-medium">Quality Control Required</div>
                <div className="text-sm text-muted-foreground">Cabinet Doors - QC check needed before proceeding to sealing</div>
                <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
};
export default Header;