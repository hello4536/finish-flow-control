
import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LogoLink from "./LogoLink";
import HeaderTabs from "./HeaderTabs";
import MobileMenu from "./MobileMenu";
import SubscriptionButton from "./SubscriptionButton";
import NotificationsDropdown from "./NotificationsDropdown";
import UserProfileMenu from "./UserProfileMenu";

const Header = () => {
  const {
    user,
    profile,
    userRole,
    organization,
    signOut
  } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  return <header className="sticky top-0 z-40 border-b bg-sky-50">
      <div className="container flex h-16 items-center justify-between px-[45px] py-[16px]">
        <div className="flex items-center space-x-4 w-full">
          <LogoLink />
          <HeaderTabs currentPath={currentPath} />
          <MobileMenu />
        </div>
        
        <div className="flex items-center gap-2">
          <SubscriptionButton isAdmin={userRole?.role === "admin"} isInactive={organization?.subscription_status === "inactive"} />
          <NotificationsDropdown />
          <UserProfileMenu user={user} profile={profile} userRole={userRole} organization={organization} signOut={signOut} />
        </div>
      </div>
    </header>;
};

export default Header;
