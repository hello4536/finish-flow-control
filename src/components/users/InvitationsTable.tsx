import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
interface Invitation {
  id: string;
  email: string;
  role: string;
  created_at: string;
  expires_at: string;
  token: string;
  accepted: boolean;
}
interface InvitationsTableProps {
  invitations: Invitation[];
  invitationsLoading: boolean;
  formatDate: (dateString: string | null) => string;
  handleDeleteInvitation: (invitationId: string, email: string) => void;
}
const InvitationsTable: React.FC<InvitationsTableProps> = ({
  invitations,
  invitationsLoading,
  formatDate,
  handleDeleteInvitation
}) => {
  return <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-sky-100">Email</TableHead>
            <TableHead className="bg-sky-100">Role</TableHead>
            <TableHead className="bg-sky-100">Invited</TableHead>
            <TableHead className="bg-sky-100">Expires</TableHead>
            <TableHead className="bg-sky-100">Status</TableHead>
            <TableHead className="text-right bg-sky-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitationsLoading ? <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex justify-center items-center">
                  <Loader2 className="h-6 w-6 animate-spin mr-2" />
                  <span className="text-muted-foreground">Loading invitations...</span>
                </div>
              </TableCell>
            </TableRow> : invitations.length === 0 ? <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No pending invitations
              </TableCell>
            </TableRow> : invitations.map(invitation => {
          const isExpired = new Date(invitation.expires_at) < new Date();
          const status = invitation.accepted ? "Accepted" : isExpired ? "Expired" : "Pending";
          return <TableRow key={invitation.id}>
                  <TableCell>{invitation.email}</TableCell>
                  <TableCell>
                    <Badge variant={invitation.role === "admin" ? "default" : "outline"}>
                      {invitation.role === "admin" ? "Admin" : "Employee"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(invitation.created_at)}</TableCell>
                  <TableCell>{formatDate(invitation.expires_at)}</TableCell>
                  <TableCell>
                    <Badge variant={status === "Pending" ? "default" : status === "Accepted" ? "success" : "destructive"}>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!invitation.accepted && !isExpired && <Button variant="ghost" size="sm" onClick={() => handleDeleteInvitation(invitation.id, invitation.email)}>
                        Cancel
                      </Button>}
                  </TableCell>
                </TableRow>;
        })}
        </TableBody>
      </Table>
    </div>;
};
export default InvitationsTable;