
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, UserPlus, User, MoreHorizontal, Edit, Trash2, Loader2, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUserData, User as UserType } from "@/hooks/useUserData";
import { useAuth } from "@/context/AuthContext";
import InviteUserForm from "@/components/users/InviteUserForm";
import { supabase } from "@/integrations/supabase/client";

// Form schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(1, { message: "Role is required." }),
  status: z.enum(["active", "inactive"]),
});

interface Invitation {
  id: string;
  email: string;
  role: string;
  created_at: string;
  expires_at: string;
  token: string;
  accepted: boolean;
}

const Users: React.FC = () => {
  const { users, isLoading, updateUser, deleteUser, refreshUsers } = useUserData();
  const { userRole, organization } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [invitationsLoading, setInvitationsLoading] = useState(false);
  const [refreshingInvites, setRefreshingInvites] = useState(false);
  
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (organization) {
      fetchInvitations();
    }
  }, [organization]);

  const fetchInvitations = async () => {
    if (!organization) return;
    
    setInvitationsLoading(true);
    try {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("organization_id", organization.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      setInvitations(data || []);
    } catch (error) {
      console.error("Error fetching invitations:", error);
    } finally {
      setInvitationsLoading(false);
    }
  };

  const refreshInvitations = async () => {
    setRefreshingInvites(true);
    await fetchInvitations();
    setRefreshingInvites(false);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle edit user
  const handleEditUser = async (data: z.infer<typeof userFormSchema>) => {
    if (currentUser) {
      const updatedData = {
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      };
      
      const result = await updateUser(currentUser.id, updatedData);
      
      if (result) {
        setIsEditDialogOpen(false);
        setCurrentUser(null);
        form.reset();
        toast({
          title: "User updated",
          description: `${data.name} has been updated successfully.`,
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
          variant: "destructive",
        });
      }
    }
  };

  // Handle delete invitation
  const handleDeleteInvitation = async (invitationId: string, email: string) => {
    try {
      const { error } = await supabase
        .from("invitations")
        .delete()
        .eq("id", invitationId);
      
      if (error) throw error;
      
      toast({
        title: "Invitation canceled",
        description: `Invitation to ${email} has been canceled.`,
      });
      
      fetchInvitations();
    } catch (error) {
      console.error("Error deleting invitation:", error);
      toast({
        title: "Error",
        description: "Failed to cancel invitation.",
        variant: "destructive",
      });
    }
  };

  // Open edit dialog with user data
  const openEditDialog = (user: UserType) => {
    setCurrentUser(user);
    form.setValue("name", user.name);
    form.setValue("email", user.email);
    form.setValue("role", user.role);
    form.setValue("status", user.status);
    setIsEditDialogOpen(true);
  };

  // Format date to readable format
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // Check if user is admin
  const isAdmin = userRole?.role === "admin";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Add User Button */}
          {isAdmin && (
            <Button 
              className="gap-1"
              onClick={() => setIsInviteDialogOpen(true)}
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Invite User</span>
            </Button>
          )}
        </div>
      </div>

      {/* Subscription Warning for Admins */}
      {isAdmin && organization?.subscription_status !== "active" && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-amber-800">Subscription Required</h4>
                <p className="text-sm text-amber-700">
                  Please <a href="/subscription" className="underline">activate your subscription</a> to add team members.
                  Admin account costs $49/month, and each employee account costs $10/month.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Card */}
      <Card>
        <CardHeader>
          <CardTitle>All Team Members</CardTitle>
          <CardDescription>
            Manage user accounts for your organization. Employees cost $10/month per user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 6 : 5} className="text-center py-8">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span className="text-muted-foreground">Loading users...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isAdmin ? 6 : 5} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "outline"}>
                          {user.role === "admin" ? "Admin" : "Employee"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "outline"}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.last_login)}</TableCell>
                      {isAdmin && (
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => openEditDialog(user)}
                                className="cursor-pointer"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive cursor-pointer"
                                onClick={() => {
                                  setCurrentUser(user);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Pending Invitations Card */}
      {isAdmin && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Users who have been invited but have not yet accepted
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={refreshInvitations} disabled={refreshingInvites}>
              {refreshingInvites ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Invited</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitationsLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-6 animate-spin mr-2" />
                          <span className="text-muted-foreground">Loading invitations...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : invitations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No pending invitations
                      </TableCell>
                    </TableRow>
                  ) : (
                    invitations.map((invitation) => {
                      const isExpired = new Date(invitation.expires_at) < new Date();
                      const status = invitation.accepted ? "Accepted" : isExpired ? "Expired" : "Pending";
                      
                      return (
                        <TableRow key={invitation.id}>
                          <TableCell>{invitation.email}</TableCell>
                          <TableCell>
                            <Badge variant={invitation.role === "admin" ? "default" : "outline"}>
                              {invitation.role === "admin" ? "Admin" : "Employee"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(invitation.created_at)}</TableCell>
                          <TableCell>{formatDate(invitation.expires_at)}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={status === "Pending" ? "default" : 
                                     status === "Accepted" ? "success" : "destructive"}
                            >
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {!invitation.accepted && !isExpired && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteInvitation(invitation.id, invitation.email)}
                              >
                                Cancel
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="font-medium">{currentUser?.name}</p>
            <p className="text-muted-foreground">{currentUser?.email}</p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite User Dialog */}
      <InviteUserForm
        isOpen={isInviteDialogOpen}
        onClose={() => setIsInviteDialogOpen(false)}
        onSuccess={refreshInvitations}
      />
    </div>
  );
};

export default Users;
