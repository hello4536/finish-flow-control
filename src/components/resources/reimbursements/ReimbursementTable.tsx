import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useResourceReimbursements, Reimbursement } from '@/hooks/useResourceReimbursements';
const ReimbursementTable = () => {
  const {
    reimbursements,
    isLoading,
    updateReimbursementStatus,
    deleteReimbursement
  } = useResourceReimbursements();
  const handleStatusChange = async (id: string, status: 'pending' | 'approved' | 'paid') => {
    try {
      await updateReimbursementStatus.mutateAsync({
        id,
        status
      });
      toast({
        title: 'Status updated',
        description: `Reimbursement status changed to ${status}.`
      });
    } catch (error) {
      // Error handled in mutation
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reimbursement?')) {
      return;
    }
    try {
      await deleteReimbursement.mutateAsync(id);
      toast({
        title: 'Reimbursement deleted',
        description: 'The reimbursement has been removed successfully.'
      });
    } catch (error) {
      // Error handled in mutation
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Approved</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Paid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  return <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-sky-100">Employee</TableHead>
            <TableHead className="bg-sky-100">Date</TableHead>
            <TableHead className="bg-sky-100">Amount</TableHead>
            <TableHead className="bg-sky-100">Description</TableHead>
            <TableHead className="bg-sky-100">Status</TableHead>
            <TableHead className="text-right bg-sky-100">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? <TableRow>
              <TableCell colSpan={6} className="text-center p-4">
                Loading reimbursements...
              </TableCell>
            </TableRow> : reimbursements.length === 0 ? <TableRow>
              <TableCell colSpan={6} className="text-center p-4">
                No reimbursements found. Add one to get started.
              </TableCell>
            </TableRow> : reimbursements.map(reimbursement => <TableRow key={reimbursement.id}>
                <TableCell className="font-medium">{reimbursement.employee_name}</TableCell>
                <TableCell>{reimbursement.date}</TableCell>
                <TableCell>{formatCurrency(reimbursement.amount)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{reimbursement.description}</TableCell>
                <TableCell>{getStatusBadge(reimbursement.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {reimbursement.status !== 'approved' && reimbursement.status !== 'paid' && <Button variant="outline" size="sm" onClick={() => handleStatusChange(reimbursement.id, 'approved')}>
                        Approve
                      </Button>}
                    {reimbursement.status !== 'paid' && reimbursement.status === 'approved' && <Button variant="outline" size="sm" className="bg-green-50 text-green-700 hover:bg-green-100" onClick={() => handleStatusChange(reimbursement.id, 'paid')}>
                        Mark Paid
                      </Button>}
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(reimbursement.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>)}
        </TableBody>
      </Table>
    </div>;
};
export default ReimbursementTable;