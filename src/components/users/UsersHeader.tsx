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
  return <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight text-purple-600">Team Members</h1>
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        
        {/* Add User Button */}
        {isAdmin && <Button className="gap-1" onClick={openInviteDialog}>
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Invite User</span>
          </Button>}
      </div>
    </div>;
};
export default UsersHeader;