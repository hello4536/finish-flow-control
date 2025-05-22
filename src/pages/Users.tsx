import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useUserData, User as UserType } from "@/hooks/useUserData";
import { useAuth } from "@/context/AuthContext";
import { useInvitations } from "@/hooks/useInvitations";
import UsersHeader from "@/components/users/UsersHeader";
import UserTable from "@/components/users/UserTable";
import InvitationsTable from "@/components/users/InvitationsTable";
import EditUserDialog from "@/components/users/EditUserDialog";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import InviteUserForm from "@/components/users/InviteUserForm";
import SubscriptionWarning from "@/components/users/SubscriptionWarning";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
const Users: React.FC = () => {
  const {
    users,
    isLoading,
    updateUser,
    deleteUser,
    refreshUsers
  } = useUserData();
  const {
    invitations,
    isLoading: invitationsLoading,
    isRefreshing: refreshingInvites,
    refreshInvitations,
    deleteInvitation
  } = useInvitations();
  const {
    userRole,
    organization
  } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Format date to readable format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
  };

  // Handle edit user
  const handleEditUser = async (data: any) => {
    if (currentUser) {
      const updatedData = {
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status
      };
      const result = await updateUser(currentUser.id, updatedData);
      if (result) {
        setIsEditDialogOpen(false);
        setCurrentUser(null);
        toast({
          title: "User updated",
          description: `${data.name} has been updated successfully.`
        });
      }
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (currentUser) {
      const success = await deleteUser(currentUser.id);
      if (success) {
        setIsDeleteDialogOpen(false);
        setCurrentUser(null);
        toast({
          title: "User deleted",
          description: `${currentUser.name} has been deleted.`,
          variant: "destructive"
        });
      }
    }
  };

  // Open edit dialog with user data
  const openEditDialog = (user: UserType) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };

  // Check if user is admin
  const isAdmin = userRole?.role === "admin";

  // Check subscription
  const needsSubscription = isAdmin && organization?.subscription_status !== "active";
  return <div className="space-y-6">
      <UsersHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} isAdmin={isAdmin} openInviteDialog={() => setIsInviteDialogOpen(true)} />

      {/* Subscription Warning for Admins */}
      <SubscriptionWarning show={needsSubscription} />

      {/* Users Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">All Team Members</CardTitle>
          <CardDescription>
            Manage user accounts for your organization. Employees cost $10/month per user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable users={users} isLoading={isLoading} isAdmin={isAdmin} searchQuery={searchQuery} openEditDialog={openEditDialog} setCurrentUser={setCurrentUser} setIsDeleteDialogOpen={setIsDeleteDialogOpen} formatDate={formatDate} />
        </CardContent>
      </Card>
      
      {/* Pending Invitations Card */}
      {isAdmin && <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-blue-600">Pending Invitations</CardTitle>
              <CardDescription>
                Users who have been invited but have not yet accepted
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={refreshInvitations} disabled={refreshingInvites} className="bg-blue-600 hover:bg-blue-500 text-white">
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshingInvites ? 'animate-spin' : ''}`} />
              {refreshingInvites ? 'Refreshing' : 'Refresh'}
            </Button>
          </CardHeader>
          <CardContent>
            <InvitationsTable invitations={invitations} invitationsLoading={invitationsLoading} formatDate={formatDate} handleDeleteInvitation={deleteInvitation} />
          </CardContent>
        </Card>}
      
      {/* Edit User Dialog */}
      <EditUserDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} currentUser={currentUser} onSubmit={handleEditUser} />
      
      {/* Delete User Dialog */}
      <DeleteUserDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} currentUser={currentUser} onDelete={handleDeleteUser} />
      
      {/* Invite User Dialog */}
      <InviteUserForm isOpen={isInviteDialogOpen} onClose={() => setIsInviteDialogOpen(false)} onSuccess={refreshInvitations} />
    </div>;
};
export default Users;