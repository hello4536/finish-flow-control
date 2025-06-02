
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";

interface UsersHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAdmin: boolean;
  openInviteDialog: () => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  isAdmin,
  openInviteDialog
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Team Members
        </h1>
        <p className="text-slate-600 mt-2 font-medium">
          Manage user accounts and team access for your organization
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-[280px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search team members..." 
            className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>
        
        {/* Add User Button */}
        {isAdmin && (
          <Button 
            onClick={openInviteDialog} 
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Invite User</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default UsersHeader;
