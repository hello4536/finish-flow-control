import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { User, Settings, LogOut, Bell, CreditCard, Users as UsersIcon, LayoutDashboard, List, Menu, Home } from "lucide-react";
const Header = () => {
  const {
    user,
    profile,
    userRole,
    organization,
    signOut
  } = useAuth();
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Get user initials for avatar
  const getInitials = () => {
    if (!profile?.full_name) return "U";
    const names = profile.full_name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return profile.full_name.substring(0, 2).toUpperCase();
  };
  return <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center">
            <h1 className="text-xl font-bold text-blue-900">
              Fini<span className="text-accent">v</span>i
            </h1>
          </Link>
          
          <Tabs value={currentPath} className="hidden md:block" onValueChange={value => {
          window.location.href = value;
        }}>
            <TabsList className="bg-blue-50">
              <TabsTrigger value="/" className={currentPath === '/' ? 'data-[state=active]' : ''}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </TabsTrigger>
              <TabsTrigger value="/#features" className={currentPath === '/#features' ? 'data-[state=active]' : ''}>
                Features
              </TabsTrigger>
              <TabsTrigger value="/woodworking-finishing" className={currentPath.startsWith('/woodworking-finishing') ? 'data-[state=active]' : ''}>
                Woodworking Finishing
              </TabsTrigger>
              <TabsTrigger value="/auto-body-finishing" className={currentPath.startsWith('/auto-body-finishing') ? 'data-[state=active]' : ''}>
                Auto Body Finishing
              </TabsTrigger>
              <TabsTrigger value="/#pricing" className={currentPath === '/#pricing' ? 'data-[state=active]' : ''}>
                Pricing
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Mobile Menu Dropdown */}
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
        </div>
        
        <div className="flex items-center gap-2">
          {organization?.subscription_status === "inactive" && userRole?.role === "admin" && <Button size="sm" variant="default" className="mr-2" asChild>
              <Link to="/subscription">Activate Subscription</Link>
            </Button>}

          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none" asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="py-4 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem disabled className="opacity-70">
                <User className="mr-2 h-4 w-4" />
                <span>{profile?.full_name || user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="opacity-70 text-xs">
                {userRole?.role === "admin" ? "Administrator" : "Employee"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {userRole?.role === "admin" && <>
                  <DropdownMenuItem asChild>
                    <Link to="/subscription">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Subscription</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/users">
                      <UsersIcon className="mr-2 h-4 w-4" />
                      <span>Team Members</span>
                    </Link>
                  </DropdownMenuItem>
                </>}
              
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => setShowSignOutAlert(true)} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={showSignOutAlert} onOpenChange={setShowSignOutAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out of your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
            signOut();
            setShowSignOutAlert(false);
          }}>
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>;
};
export default Header;