
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut, CreditCard, Users as UsersIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
  full_name?: string;
}

interface UserProfileMenuProps {
  user: any;
  profile: UserProfile | null;
  userRole: { role: string } | null;
  organization: { subscription_status: string } | null;
  signOut: () => void;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  user,
  profile,
  userRole,
  organization,
  signOut
}) => {
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!profile?.full_name) return "U";
    const names = profile.full_name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return profile.full_name.substring(0, 2).toUpperCase();
  };

  return (
    <>
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
          
          {userRole?.role === "admin" && (
            <>
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
            </>
          )}
          
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
    </>
  );
};

export default UserProfileMenu;
